"""시안 이미지와 앱 캡처를 나란히 붙여 눈으로 비교하는 보조 도구 (Pillow 필요: pip3 install pillow).

사용법 (app/ 에서):
  python3 e2e/compare.py e2e/.out/ls.png 09 e2e/.out/side-09.png
    앱 캡처 | 시안 화면 번호 | 저장할 파일   → 왼쪽이 시안(design/screen-09.png), 오른쪽이 앱

캡처는 점검 스크립트가 e2e/.out/ 에 저장한다(408x880 기준이라 시안과 크기가 같다).
"""
import sys
from pathlib import Path

from PIL import Image

app_png, screen_no, out_png = sys.argv[1:4]
design = Path(__file__).resolve().parents[2] / "design" / f"screen-{int(screen_no):02d}.png"
a = Image.open(app_png).convert("RGB")
b = Image.open(design).convert("RGB")
w, h = min(a.width, b.width), min(a.height, b.height)
side = Image.new("RGB", (w * 2 + 10, h), "white")
side.paste(b.crop((0, 0, w, h)), (0, 0))
side.paste(a.crop((0, 0, w, h)), (w + 10, 0))
side.save(out_png)
print(f"저장: {out_png} (왼쪽 시안 {design.name}, 오른쪽 앱)")
