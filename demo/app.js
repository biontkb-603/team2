// 마냉이 데모: 해시 라우팅(#/경로) 기반의 한 페이지 앱. 서버·빌드 없이 index.html만 열면 된다.
// 화면과 동작은 app/ (Vite 앱)의 현재 상태(UI 단계)와 같고, 데이터는 data.js 의 고정 값이다.
(function () {
  'use strict';
  var D = window.DATA;

  /* ---------- 작은 도우미 ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var byId = function (id) { return D.recipes.filter(function (r) { return r.id === id; })[0]; };
  var pick = function (ids) { return ids.map(byId).filter(Boolean); };

  function seen(key) { try { return sessionStorage.getItem(key) === '1'; } catch (e) { return false; } }
  function markSeen(key) { try { sessionStorage.setItem(key, '1'); } catch (e) { /* 저장 불가 환경이면 기억만 못 한다 */ } }

  /* ---------- D-day 규칙 (유통기한 3일 이내 = 임박) ---------- */
  var EXPIRING_DAYS = 3;
  var isSoon = function (d) { return d <= EXPIRING_DAYS; };
  function ddayInfo(d) {
    if (d < 0) return { tone: 'expired', label: '기한 지남' };
    if (d === 0) return { tone: 'danger', label: '오늘까지' };
    return { tone: isSoon(d) ? 'danger' : 'ok', label: 'D-' + d };
  }
  function remainingLabel(d) {
    if (d < 0) return '기한 지남';
    if (d === 0) return '오늘까지';
    return d + '일 남음';
  }

  /* ---------- 쇼핑몰 검색 주소 ---------- */
  var MALL_LINKS = {
    coupang: ['https://www.coupang.com', 'https://www.coupang.com/np/search?q='],
    naver: ['https://shopping.naver.com', 'https://search.shopping.naver.com/search/all?query='],
    kurly: ['https://www.kurly.com', 'https://www.kurly.com/search?sword='],
    emart: ['https://emart.ssg.com', 'https://emart.ssg.com/search.ssg?query='],
  };
  function mallUrl(id, keyword) {
    var l = MALL_LINKS[id];
    var q = keyword.trim();
    return q ? l[1] + encodeURIComponent(q) : l[0];
  }

  /* ---------- 아이콘 ---------- */
  function svg(size, body, extra) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + ((extra && extra.sw) || 1.8) +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + ((extra && extra.fill) ? ' style="fill:' + extra.fill + '"' : '') + '>' + body + '</svg>';
  }
  var P = {
    home: '<path d="M3.5 11 12 3.8 20.5 11"/><path d="M5.5 9.8V20h13V9.8"/><path d="M10 20v-5.5h4V20"/>',
    fridge: '<rect x="6" y="2.8" width="12" height="18.4" rx="2.4"/><path d="M6 10.5h12"/><path d="M9.5 6v1.8M9.5 13v2.6"/>',
    heart: '<path d="M12 20.2S3.6 15 3.6 9.1A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8.4 1.9C20.4 15 12 20.2 12 20.2Z"/>',
    cart: '<path d="M2.8 3.8h2.6l2.1 11.2h10.2l2-8.2H6.2"/><circle cx="9.3" cy="19.4" r="1.2"/><circle cx="16.6" cy="19.4" r="1.2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.8-4 3.7-6 7.5-6s6.7 2 7.5 6"/>',
    chevR: '<path d="m9 5 7 7-7 7"/>',
    chevD: '<path d="m5 9 7 7 7-7"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M2.5 12S6 5.5 12 5.5c1.6 0 3 .5 4.2 1.2M21.5 12S18 18.5 12 18.5c-1.6 0-3-.5-4.2-1.2"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="M4 4l16 16"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.4 4 5.5 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.5-4-9s1.4-6.6 4-9Z"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
    bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15L6 16.5Z"/><path d="M10 21h4"/>',
    warn: '<path d="M12 3.5 21.5 20h-19L12 3.5Z"/><path d="M12 10v4.5M12 17.4v.1"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    camera: '<path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.3-2h6l1.3 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z"/><circle cx="12" cy="13" r="3.4"/>',
    bowl: '<path d="M3.5 12.5h17a8.5 8.5 0 0 1-8.5 8 8.5 8.5 0 0 1-8.5-8Z"/><path d="M8.5 4.5c-.8 1.2.8 2.2 0 3.4M12 3.5c-.8 1.2.8 2.2 0 3.4M15.5 4.5c-.8 1.2.8 2.2 0 3.4"/>',
    gear: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    back: '<path d="m15 5-7 7 7 7"/>',
  };
  var icon = function (name, size, extra) { return svg(size || 24, P[name], extra); };
  var checkCircle = '<svg class="ok" width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="13" fill="currentColor"/><path d="m7.5 13.3 3.8 3.8 7.2-7.6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- 화면 안 상태 (새로고침하면 처음으로) ---------- */
  var state = {
    fridgeFilter: '전체',
    recFilter: '전체',
    favs: D.favoriteRecipeIds.slice(),
    detailTab: 'recipe',
    openNotice: null,
    noti: Object.assign({}, D.notificationDefaults),
    add: { place: '냉장', amount: 1, unit: '개', name: '', date: '' },
    keyword: '',
    dialog: null,
  };

  /* ---------- 공통 조각 ---------- */
  function backBtn(fallback, round) {
    return '<button type="button" class="back' + (round ? ' round' : '') + '" data-act="back" data-fallback="' + fallback + '" aria-label="뒤로 가기">' + icon('back', 24, { sw: 2 }) + '</button>';
  }
  function topbar(title, back, right) {
    return '<header class="topbar">' + (back ? backBtn(back) : '') + '<h1 class="truncate">' + title + '</h1>' + (right ? '<div class="right">' + right + '</div>' : '') + '</header>';
  }
  var soonBtn = function (label, name, size) {
    return '<button type="button" class="icon-btn" data-act="soon" aria-label="' + label + '">' + icon(name, size || 24) + '</button>';
  };
  function badge(missing) {
    return missing === 0 ? '<span class="badge enough">재료 충분</span>' : '<span class="badge short">재료 ' + missing + '개 부족</span>';
  }
  function chips(items, current, act, label) {
    return '<div class="chips" role="group" aria-label="' + label + '">' + items.map(function (it) {
      return '<button type="button" class="chip' + (it.value === current ? ' on' : '') + '" data-act="' + act + '" data-value="' + it.value + '" aria-pressed="' + (it.value === current) + '">' + it.label + '</button>';
    }).join('') + '</div>';
  }
  function heartBtn(id, name, cls) {
    var fav = state.favs.indexOf(id) >= 0;
    return '<button type="button" class="heart" data-act="fav" data-id="' + id + '" aria-pressed="' + fav + '" aria-label="' + esc(name) + (fav ? ' 찜 해제' : ' 찜하기') + '">' +
      icon('heart', cls || 18, { fill: fav ? 'currentColor' : 'none' }) + '</button>';
  }
  function choice(label, selected, act, value, cls) {
    return '<button type="button" class="choice' + (selected ? ' on' : '') + ' ' + (cls || '') + '" data-act="' + act + '" data-value="' + value + '" aria-pressed="' + selected + '">' + label + '</button>';
  }
  function switchBtn(label, checked, key, disabled) {
    return '<button type="button" class="switch" role="switch" aria-checked="' + checked + '" aria-label="' + label + '" data-act="noti" data-key="' + key + '"' + (disabled ? ' disabled' : '') + '></button>';
  }

  /* ---------- 화면들 ---------- */
  var views = {};

  // 1. 로그인
  views.login = function () {
    var sns = [['카카오톡', 'kakao'], ['네이버', 'naver'], ['페이스북', 'facebook'], ['애플', 'apple']];
    return '<form class="login" data-submit="home">' +
      '<button type="button" class="globe" data-act="soon" aria-label="언어 설정">' + icon('globe', 22) + '</button>' +
      '<img class="logo" src="assets/logo.png" alt="마냉이 마이 냉장고" />' +
      '<div class="fields">' +
        '<div class="input-box filled"><span class="lead">' + icon('user', 22) + '</span><input placeholder="아이디를 입력해주세요" autocomplete="username" aria-label="아이디" /></div>' +
        '<div class="input-box filled"><span class="lead">' + icon('lock', 22) + '</span><input type="password" placeholder="비밀번호를 입력해주세요" autocomplete="current-password" aria-label="비밀번호" />' +
          '<button type="button" class="eye" data-act="eye" aria-label="비밀번호 보기">' + icon('eyeOff', 22) + '</button></div>' +
      '</div>' +
      '<button type="submit" class="btn full">로그인</button>' +
      '<div class="links"><button type="button" data-act="soon">아이디 찾기</button><i></i><button type="button" data-act="soon">비밀번호 찾기</button><i></i><a href="#/signup">회원가입</a></div>' +
      '<p class="sns-title">SNS 간편 로그인</p>' +
      '<div class="sns">' + sns.map(function (s) {
        return '<button type="button" data-act="home" aria-label="' + s[0] + '로 로그인"><img src="assets/sns-' + s[1] + '.png" alt="" /></button>';
      }).join('') + '</div></form>';
  };

  // 2·3. 회원가입 1단계
  views.signup = function () {
    return '<form class="signup" data-submit="/signup/account">' + backBtn('/login') +
      '<h1>회원가입</h1><div class="bar"></div><div class="form">' +
        '<div><label class="field-label" for="s-name">이름</label><div class="input-box lg"><input id="s-name" autocomplete="name" /></div></div>' +
        '<div class="inline"><div class="grow"><label class="field-label" for="s-tel">전화번호</label><div class="input-box lg"><input id="s-tel" type="tel" inputmode="numeric" autocomplete="tel" /></div></div>' +
          '<button type="button" class="btn md" style="width:120px">인증번호 받기</button></div>' +
        '<div><label class="field-label" for="birth">생년월일</label><div class="birth"><input id="birth" class="b1" inputmode="numeric" maxlength="6" aria-label="생년월일 6자리" />' +
          '<span class="dash">-</span><input class="b2" inputmode="numeric" maxlength="1" aria-label="주민번호 뒷자리 첫 자리" /><span class="stars">******</span></div></div>' +
        '<div class="inline"><div class="grow"><label class="field-label" for="s-code">인증번호</label><div class="input-box lg"><input id="s-code" inputmode="numeric" maxlength="6" /><span class="trail">03:00</span></div></div>' +
          '<button type="button" class="btn md tint" style="width:70px">확인</button></div>' +
      '</div><div class="submit"><button type="submit" class="btn full">다음</button></div></form>';
  };

  // 4·5. 회원가입 2단계
  views.signupAccount = function () {
    var pw = function (id, label, ac) {
      return '<div><label class="field-label" for="' + id + '">' + label + '</label><div class="input-box"><input id="' + id + '" type="password" autocomplete="' + ac + '" /></div></div>';
    };
    return '<form class="signup" data-submit="home">' + backBtn('/signup') +
      '<h1>회원가입</h1><div class="bar"></div><div class="form">' +
        '<div><label class="field-label" for="a-id">아이디</label><div class="input-box"><input id="a-id" autocomplete="username" /></div></div>' +
        pw('a-pw', '비밀번호', 'new-password') + pw('a-pw2', '비밀번호 확인', 'new-password') +
      '</div><div class="submit"><button type="submit" class="btn full">완료하기</button></div></form>';
  };

  // 6·7. 홈
  views.home = function () {
    var soon = D.ingredients.filter(function (i) { return isSoon(i.daysLeft); }).sort(function (a, b) { return a.daysLeft - b.daysLeft; });
    return '<div class="home"><header><span class="brand">마냉이</span>' + soonBtn('알림', 'bell', 26) + '</header>' +
      '<h1>안녕하세요!<br>오늘도 마냉이와 함께<br>맛있는 하루 보내세요!</h1>' +
      '<a class="fridge-card" href="#/fridge/status"><span class="ico">' + icon('fridge', 26) + '</span><span class="txt"><span class="t1">냉장고 현황</span><span class="t2">총 ' + D.ingredients.length + '가지 식재료</span></span><span class="chev">' + icon('chevR', 20) + '</span></a>' +
      '<section class="soon" aria-label="유통기한 임박"><div class="head">' + icon('warn') + '<span class="txt"><span class="t1">유통기한 임박</span><span class="t2">3일 이내</span></span><span class="count">' + soon.length + '</span></div>' +
        (soon.length ? '<ul>' + soon.slice(0, 3).map(function (i) {
          return '<li><span class="tile lg">' + esc(i.name.charAt(0)) + '</span><span class="name">' + esc(i.name) + '</span><span class="left">' + remainingLabel(i.daysLeft) + '</span></li>';
        }).join('') + '</ul>' : '<p class="empty-note">임박한 재료가 없어요</p>') + '</section>' +
      '<div class="sec-head"><h2>오늘의 추천</h2><a href="#/recommend">더보기 &gt;</a></div>' +
      '<ul class="today-grid">' + pick(D.todayRecipeIds).map(function (r) {
        return '<li><a href="#/recommend/' + r.id + '"><img src="assets/food.jpg" alt="" /><span class="info"><span class="nm truncate">' + esc(r.name) + '</span><span class="ds">' + (r.missing === 0 ? '보유 재료로 가능' : '재료 ' + r.missing + '개 부족') + '</span></span></a></li>';
      }).join('') + '</ul></div>';
  };

  // 8. 냉장고 현황
  var PLACES = [['냉장', 'c-fridge'], ['냉동', 'c-freezer'], ['실온', 'c-room']];
  var countPlace = function (p) { return D.ingredients.filter(function (i) { return i.place === p; }).length; };
  views.fridgeStatus = function () {
    var total = D.ingredients.length;
    var soon = D.ingredients.filter(function (i) { return isSoon(i.daysLeft); }).length;
    return '<div class="page">' + topbar('냉장고 현황', '/') + '<div class="status-body">' +
      '<section class="sum"><p class="t1">지금 냉장고에 있는 식재료</p><p class="t2">' + total + '가지</p></section>' +
      '<section class="card"><h2>보관 위치별</h2><div class="meter" role="img" aria-label="보관 위치별 개수 비율">' +
        PLACES.map(function (p) { return countPlace(p[0]) ? '<span class="' + p[1] + '" style="flex-grow:' + countPlace(p[0]) + '"></span>' : ''; }).join('') + '</div>' +
        '<ul class="legend">' + PLACES.map(function (p) { return '<li><span class="dot ' + p[1] + '"></span><span class="nm">' + p[0] + '</span><b>' + countPlace(p[0]) + '</b></li>'; }).join('') + '</ul></section>' +
      '<section class="card exp"><h2>유통기한</h2><div class="exp-grid"><div class="d"><p class="l">' + EXPIRING_DAYS + '일 이내 임박</p><p class="n">' + soon + '개</p></div>' +
        '<div class="o"><p class="l">여유 있음</p><p class="n">' + (total - soon) + '개</p></div></div></section></div>' +
      '<div class="bottom-pad"><a class="btn full" href="#/fridge">식재료 목록 보기</a></div></div>';
  };

  // 9. 식재료 목록
  views.fridge = function () {
    var f = state.fridgeFilter;
    var all = ['전체', '냉장', '냉동', '실온'];
    var count = function (x) { return x === '전체' ? D.ingredients.length : countPlace(x); };
    var rows = f === '전체' ? D.ingredients : D.ingredients.filter(function (i) { return i.place === f; });
    return '<div class="page">' + topbar('냉장고', '/fridge/status', soonBtn('식재료 검색', 'search')) +
      chips(all.map(function (x) { return { value: x, label: x + ' ' + count(x) }; }), f, 'fridgeFilter', '보관 위치') +
      (rows.length ? '<ul class="list">' + rows.map(function (i) {
        var d = ddayInfo(i.daysLeft);
        return '<li><div class="row"><span class="tile">' + esc(i.name.charAt(0)) + '</span><span class="body"><span class="title truncate">' + esc(i.name) + '</span><span class="sub truncate">' + i.amount + esc(i.unit) + ' · ' + i.place + '</span></span><span class="badge ' + d.tone + '">' + d.label + '</span></div></li>';
      }).join('') + '</ul>' : '<p class="empty-page">등록된 식재료가 없어요. 아래 버튼으로 추가해 보세요.</p>') +
      '<div class="float-add"><a class="btn full" href="#/fridge/add">' + icon('plus', 20) + '식재료 추가</a></div></div>';
  };

  function addTabs(current) {
    return '<div class="add-tabs"><a class="choice' + (current === 'manual' ? ' on' : '') + '" data-act="replace" data-to="/fridge/add" style="display:flex;align-items:center;justify-content:center">직접 입력</a>' +
      '<a class="choice' + (current === 'photo' ? ' on' : '') + '" data-act="replace" data-to="/fridge/add/photo" style="display:flex;align-items:center;justify-content:center">사진으로 등록</a></div>';
  }

  // 10. 식재료 추가 — 직접 입력 (지금은 입력과 이동만 되고 목록에 실제로 추가하지는 않는다)
  views.add = function () {
    var a = state.add;
    return '<form class="page" data-submit="/fridge">' + topbar('식재료 추가', '/fridge') + addTabs('manual') +
      '<div class="add-form">' +
        '<div><label class="field-label" for="add-name">식재료 이름</label><div class="input-box"><input id="add-name" data-bind="name" autocomplete="off" value="' + esc(a.name) + '" /></div></div>' +
        '<div><p class="field-label">보관 위치</p><div class="three">' + ['냉장', '냉동', '실온'].map(function (p) { return choice(p, a.place === p, 'addPlace', p); }).join('') + '</div></div>' +
        '<div><p class="field-label">수량</p><div class="qty"><div class="stepper"><button type="button" data-act="qty" data-d="-1" aria-label="수량 줄이기">' + icon('minus', 22) + '</button><b aria-live="polite">' + a.amount + '</b>' +
          '<button type="button" data-act="qty" data-d="1" aria-label="수량 늘리기">' + icon('plus', 22) + '</button></div>' +
          '<div class="units">' + ['개', '팩', 'g'].map(function (u) { return choice(u, a.unit === u, 'addUnit', u); }).join('') + '</div></div></div>' +
        '<div><label class="field-label" for="add-date">유통기한</label><div class="input-box"><input id="add-date" type="date" data-bind="date" value="' + esc(a.date) + '" /></div></div>' +
      '</div><div class="sticky-bar" style="padding:13px 25px 29px"><button type="submit" class="btn full">추가하기</button></div></form>';
  };

  // 11. 사진으로 등록 (사진 인식은 범위 밖이라 안내만)
  views.addPhoto = function () {
    return '<div class="page">' + topbar('사진으로 등록', '/fridge') + addTabs('photo') +
      '<div class="photo-box"><span style="color:var(--primary)">' + icon('camera', 60, { sw: 1.4 }) + '</span><p class="t1">식재료를 찍어 주세요</p><p class="t2">AI가 사진 속 식재료를 알아보고<br>이름과 수량을 채워 드려요</p></div>' +
      '<div class="photo-actions"><button type="button" class="btn full" data-act="soon">사진 촬영하기</button><button type="button" class="btn full outline" data-act="soon">앨범에서 선택하기</button></div></div>';
  };

  // 12. 요리 추천
  var recMatch = function (r, f) { return f === '보유 재료로 가능' ? r.missing === 0 : f === '유통기한 임박 재료' ? r.usesExpiring : true; };
  views.recommend = function () {
    var f = state.recFilter;
    var today = pick(D.todayRecipeIds).filter(function (r) { return recMatch(r, f); });
    var now = pick(D.nowRecipeIds).filter(function (r) { return recMatch(r, f); });
    var out = '<div class="page" style="padding-bottom:24px">' + topbar('요리 추천', null, soonBtn('레시피 검색', 'search')) +
      chips(['전체', '보유 재료로 가능', '유통기한 임박 재료'].map(function (x) { return { value: x, label: x }; }), f, 'recFilter', '추천 종류');
    if (today.length) {
      out += '<section aria-label="오늘의 추천"><h2 class="sec-title" style="margin-top:16px">오늘의 추천</h2><ul class="rec-grid">' + today.map(function (r) {
        return '<li><a href="#/recommend/' + r.id + '"><span class="pic">' + icon('bowl', 44, { sw: 1.4 }) + '</span><span class="info"><span class="nm truncate">' + esc(r.name) + '</span><span class="ds truncate">' + r.reason + '</span></span></a>' + heartBtn(r.id, r.name) + '</li>';
      }).join('') + '</ul></section>';
    }
    if (now.length) {
      out += '<section aria-label="지금 만들기 좋은 요리"><h2 class="sec-title" style="margin-top:22px">지금 만들기 좋은 요리</h2><ul class="now-list">' + now.map(function (r) {
        return '<li><a href="#/recommend/' + r.id + '"><span class="pic">' + icon('bowl', 26, { sw: 1.6 }) + '</span><span class="body"><span class="nm truncate">' + esc(r.name) + '</span><span class="ds truncate">' + r.minutes + '분 · ' + r.reason + '</span></span>' + badge(r.missing) + '</a></li>';
      }).join('') + '</ul></section>';
    }
    if (!today.length && !now.length) out += '<p class="empty-page">조건에 맞는 요리가 없어요.</p>';
    return out + '</div>';
  };

  // 13. 레시피 상세
  views.recipe = function (p) {
    var r = byId(p.id);
    if (!r) { location.replace('#/recommend'); return ''; }
    var banner = r.missing === 0
      ? '<p class="banner">' + checkCircle + '지금 보유한 재료로 만들 수 있어요</p>'
      : '<p class="banner warn">' + icon('warn') + '재료가 ' + r.missing + '개 부족해요</p>';
    var tab = state.detailTab;
    return '<div class="page"><div class="detail-hero">' + backBtn('/recommend', true) + heartBtn(r.id, r.name, 22) + icon('bowl', 62, { sw: 1.4 }) + '</div>' +
      '<div class="detail"><h1>' + esc(r.name) + '</h1><ul class="meta"><li>' + r.minutes + '분</li><li>' + r.level + '</li><li>' + r.servings + '인분</li></ul>' + banner +
      '<h2>필요한 재료</h2><ul class="need">' + r.ingredients.map(function (i) {
        return '<li><span class="tile lg">' + esc(i[0].charAt(0)) + '</span><span class="nm">' + esc(i[0]) + '</span><span class="am">' + esc(i[1]) + '</span></li>';
      }).join('') + '</ul>' +
      '<div class="tabs" role="tablist">' + [['recipe', '레시피'], ['info', '재료 정보']].map(function (t) {
        return '<button type="button" role="tab" class="' + (tab === t[0] ? 'on' : '') + '" aria-selected="' + (tab === t[0]) + '" data-act="detailTab" data-value="' + t[0] + '">' + t[1] + '</button>';
      }).join('') + '</div>' +
      (tab === 'recipe'
        ? '<ol class="steps">' + r.steps.map(function (s, n) { return '<li><span class="no">' + (n + 1) + '</span><span class="tx">' + esc(s) + '</span></li>'; }).join('') + '</ol>'
        : '<ul class="info-list">' + r.ingredients.map(function (i) { return '<li><span>' + esc(i[0]) + '</span><span>' + esc(i[1]) + '</span></li>'; }).join('') + '</ul>') +
      '</div><div class="sticky-bar"><button type="button" class="btn full" data-act="soon">요리 시작하기</button></div></div>';
  };

  // 14. 장보기 (가격 비교·장바구니는 안내만, 쇼핑몰 검색 바로가기만 제공)
  views.shopping = function () {
    return '<div class="page">' + topbar('장보기', null, soonBtn('장바구니', 'cart')) +
      '<h2 class="sec-title" style="margin-top:-3px">쇼핑몰 바로가기</h2>' +
      '<ul class="malls">' + D.malls.map(function (m) {
        return '<li><a data-mall="' + m.id + '" href="' + mallUrl(m.id, state.keyword) + '" target="_blank" rel="noopener noreferrer"><span class="ic">' + m.initial + '</span><span class="nm">' + m.name + '</span></a></li>';
      }).join('') + '</ul>' +
      '<h2 class="sec-title" style="margin-top:25px">가격 비교</h2>' +
      '<div class="search">' + icon('search', 22) + '<input id="keyword" aria-label="재료 이름 검색" value="' + esc(state.keyword) + '" /></div>' +
      '<p class="hint">재료 이름을 입력하고 쇼핑몰을 누르면 검색 페이지로 이동해요.</p>' +
      '<div class="sticky-bar cart"><button type="button" class="disabled-btn" aria-disabled="true" data-act="soon">장바구니에 담기</button></div></div>';
  };

  // 17. 마이페이지
  views.mypage = function () {
    var menu = [['찜한 레시피', '#/mypage/favorites'], ['냉장고 연동 관리'], ['알림 설정', '#/mypage/notifications'], ['공지사항', '#/mypage/notices'], ['커뮤니티']];
    return '<div class="page my" style="padding:0">' + topbar('마이페이지', null, soonBtn('설정', 'gear', 26)) + '<div style="padding:0 21px 32px">' +
      '<button type="button" class="profile" data-act="soon"><span class="av">' + icon('user', 30) + '</span><span class="txt"><span class="t1">' + D.user.name + '님</span><span class="t2">오늘도 맛있는 하루 보내세요</span></span><span class="chev">' + icon('chevR', 20) + '</span></button>' +
      '<button type="button" class="taste" data-act="soon"><span class="h">내 취향 알려주기' + icon('chevR', 20) + '</span>' +
        '<span class="d">좋아하는 음식, 싫어하는 음식, 나이대를 알려 주시면 AI가 나에게 맞는 요리를 추천해 드려요</span>' +
        '<span class="cs">' + ['나이대', '좋아하는 음식', '싫어하는 음식', '매운 정도'].map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</span></button>' +
      '<ul class="menu">' + menu.map(function (m) {
        var inner = m[0] + '<span class="chev">' + icon('chevR', 20) + '</span>';
        return '<li>' + (m[1] ? '<a href="' + m[1] + '">' + inner + '</a>' : '<button type="button" data-act="soon">' + inner + '</button>') + '</li>';
      }).join('') + '</ul>' +
      '<button type="button" class="logout" data-act="dialog" data-value="logout">로그아웃</button></div></div>';
  };

  // 20. 찜한 레시피
  views.favorites = function () {
    var list = pick(state.favs);
    return '<div class="page" style="padding-bottom:24px">' + topbar('찜한 레시피', '/mypage') + '<p class="sub-count">총 ' + list.length + '개</p>' +
      (list.length ? '<ul class="fav-list">' + list.map(function (r) {
        return '<li><a href="#/recommend/' + r.id + '"><span class="pic">' + icon('bowl', 62, { sw: 1.3 }) + '</span><span class="info"><span class="nm">' + esc(r.name) + '</span><span class="ds">' + r.minutes + '분 · ' + r.reason + '</span><span class="bd">' + badge(r.missing) + '</span></span></a>' + heartBtn(r.id, r.name) + '</li>';
      }).join('') + '</ul>' : '<p class="empty-page" style="padding:80px 0">아직 찜한 레시피가 없어요.</p>') + '</div>';
  };

  // 22. 알림 설정
  var NOTI = [
    ['냉장고', [['expiring', '유통기한 임박', '3일 이내로 남은 식재료를 알려 드려요'], ['shortage', '식재료 부족', '자주 쓰는 식재료가 떨어지면 알려 드려요']]],
    ['추천 · 장보기', [['todayRecipe', '오늘의 추천 요리', '냉장고 재료로 만들 수 있는 요리를 알려 드려요'], ['priceChange', '가격 변동', '찜한 식재료 가격이 내리면 알려 드려요']]],
    ['서비스', [['notice', '공지사항', '중요한 소식을 알려 드려요'], ['event', '이벤트 · 혜택', '할인과 이벤트 소식을 알려 드려요']]],
  ];
  views.notifications = function () {
    var n = state.noti, off = !n.all;
    return '<div class="page">' + topbar('알림 설정', '/mypage') + '<div class="noti">' +
      '<div class="all"><div><p class="t1">전체 알림</p><p class="t2">끄면 모든 알림을 받지 않아요</p></div>' + switchBtn('전체 알림', n.all, 'all', false) + '</div>' +
      NOTI.map(function (sec) {
        return '<section aria-label="' + sec[0] + '"><h2>' + sec[0] + '</h2><ul class="group' + (off ? ' off' : '') + '">' + sec[1].map(function (it) {
          return '<li><div><p class="lb">' + it[1] + '</p><p class="ds">' + it[2] + '</p></div>' + switchBtn(it[1], n[it[0]] && !off, it[0], off) + '</li>';
        }).join('') + '</ul></section>';
      }).join('') +
      '<section aria-label="알림 시간"><h2>알림 시간</h2><button type="button" class="time' + (off ? ' off' : '') + '" data-act="soon"><span>알림 받을 시간</span><span>오전 9:00' + icon('chevR', 18) + '</span></button></section>' +
      '</div></div>';
  };

  // 23. 공지사항
  views.notices = function () {
    return '<div class="page" style="padding-bottom:24px">' + topbar('공지사항', '/mypage') + '<ul class="notices">' + D.notices.map(function (n) {
      var open = state.openNotice === n.id;
      return '<li class="notice' + (open ? ' open' : '') + '"><button type="button" data-act="notice" data-id="' + n.id + '" aria-expanded="' + open + '"><span>' +
        (n.isNew ? '<span class="new">NEW</span>' : '') + '<span class="nt">' + esc(n.title) + '</span><span class="nd">' + n.date + '</span></span><span class="chev">' + icon('chevD', 22) + '</span></button>' +
        (open ? '<p class="nb">' + esc(n.body) + '</p>' : '') + '</li>';
    }).join('') + '</ul></div>';
  };

  /* ---------- 라우트 표 (app/src/screens.ts 와 같은 구성) ---------- */
  var TABS = [['/', '홈', 'home'], ['/fridge', '냉장고', 'fridge'], ['/recommend', '추천', 'heart'], ['/shopping', '장보기', 'cart'], ['/mypage', '마이페이지', 'user']];
  var ROUTES = [
    ['/login', 'login', false], ['/signup', 'signup', false], ['/signup/account', 'signupAccount', false],
    ['/', 'home', true], ['/fridge/status', 'fridgeStatus', false], ['/fridge', 'fridge', true],
    ['/fridge/add', 'add', false], ['/fridge/add/photo', 'addPhoto', false],
    ['/recommend', 'recommend', true], ['/recommend/:id', 'recipe', false],
    ['/shopping', 'shopping', true], ['/mypage', 'mypage', true], ['/mypage/favorites', 'favorites', true],
    ['/mypage/notifications', 'notifications', false], ['/mypage/notices', 'notices', false],
  ];
  function match(path) {
    for (var i = 0; i < ROUTES.length; i++) {
      var pat = ROUTES[i][0].split('/'), seg = path.split('/');
      if (pat.length !== seg.length) continue;
      var params = {}, ok = true;
      for (var j = 0; j < pat.length; j++) {
        if (pat[j].charAt(0) === ':') params[pat[j].slice(1)] = decodeURIComponent(seg[j]);
        else if (pat[j] !== seg[j]) { ok = false; break; }
      }
      if (ok) return { view: ROUTES[i][1], tab: ROUTES[i][2], params: params };
    }
    return null;
  }

  /* ---------- 그리기 ---------- */
  var currentPath = null;
  function currentRoute() {
    var path = (location.hash.slice(1) || '/').replace(/\/+$/, '') || '/';
    return { path: path, route: match(path) };
  }

  function render(scrollTop) {
    var cur = currentRoute();
    if (!cur.route) { location.replace('#/'); return; }
    var main = $('main');
    var keep = main.scrollTop;
    main.innerHTML = views[cur.route.view](cur.route.params);
    main.scrollTop = scrollTop ? 0 : keep;
    var tabbar = $('tabbar');
    tabbar.hidden = !cur.route.tab;
    tabbar.innerHTML = TABS.map(function (t) {
      var on = t[0] === '/' ? cur.path === '/' : cur.path === t[0] || cur.path.indexOf(t[0] + '/') === 0;
      return '<a href="#' + t[0] + '" class="' + (on ? 'on' : '') + '"' + (on ? ' aria-current="page"' : '') + '>' + icon(t[2]) + t[1] + '</a>';
    }).join('');
    document.title = '마냉이';
  }

  function renderOverlay() {
    var o = $('overlay');
    if (state.dialog === 'fridgeLink') {
      o.innerHTML = '<div class="dim" data-act="dialogCancel"><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-t">' +
        '<div class="top"><span class="icon-circle">' + icon('fridge', 56, { sw: 1.6 }) + '</span><h2 id="dlg-t">냉장고 연동하기</h2><p class="desc">연동하면 냉장고 속 식재료를<br>자동으로 관리해 드려요</p></div>' +
        '<div class="actions"><button type="button" data-act="dialogCancel">그만 보기</button><button type="button" data-act="dialogOk">연동하러 가기</button></div></div></div>';
    } else if (state.dialog === 'logout') {
      o.innerHTML = '<div class="dim compact" data-act="dialogCancel"><div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-t">' +
        '<div class="top"><h2 id="dlg-t">로그아웃을 진행할까요?</h2></div>' +
        '<div class="actions"><button type="button" data-act="dialogCancel">취소</button><button type="button" data-act="dialogOk">예</button></div></div></div>';
    } else {
      o.innerHTML = '';
    }
  }

  var toastTimer;
  function toast(msg) {
    var t = $('toast');
    t.innerHTML = '<div class="toast">' + esc(msg) + '</div>';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.innerHTML = ''; }, 2000);
  }
  var soon = function () { toast('곧 지원 예정이에요'); };

  /* ---------- 이동 ---------- */
  // 기록 위치(idx)를 history.state에 적어 둔다. idx가 0이면 앱 안에서 돌아갈 곳이 없으므로 "<"는 정해 둔 경로로 간다.
  var idx = 0, replacing = false;
  try { history.replaceState({ i: 0 }, ''); } catch (e) { /* 막힌 환경에서는 "<"가 항상 정해 둔 경로로 간다 */ }
  function go(path, replace) {
    if (replace) { replacing = true; location.replace('#' + path); }
    else location.hash = path;
  }
  window.addEventListener('hashchange', function () {
    var s = history.state;
    try {
      if (s && typeof s.i === 'number') idx = s.i; // 뒤로/앞으로 가기
      else { if (!replacing) idx++; history.replaceState({ i: idx }, ''); } // 새로 연 화면
    } catch (e) { /* 위와 같음 */ }
    replacing = false;
    var cur = currentRoute();
    state.dialog = cur.path === '/' && !seen('mynaengi.fridgeLinkPopup') ? 'fridgeLink' : null;
    renderOverlay();
    render(true);
  });
  function goBack(fallback) {
    if (idx > 0) history.back(); else go(fallback, true);
  }
  function closeDialog() {
    if (state.dialog === 'fridgeLink') markSeen('mynaengi.fridgeLinkPopup');
    state.dialog = null;
    renderOverlay();
  }

  /* ---------- 이벤트 ---------- */
  var ACTIONS = {
    soon: soon,
    home: function () { go('/'); },
    back: function (el) { goBack(el.getAttribute('data-fallback')); },
    replace: function (el) { go(el.getAttribute('data-to'), true); },
    eye: function (el) {
      var input = el.parentNode.querySelector('input');
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      el.innerHTML = icon(show ? 'eye' : 'eyeOff', 22);
      el.setAttribute('aria-label', show ? '비밀번호 숨기기' : '비밀번호 보기');
    },
    fridgeFilter: function (el) { state.fridgeFilter = el.getAttribute('data-value'); render(); },
    recFilter: function (el) { state.recFilter = el.getAttribute('data-value'); render(); },
    fav: function (el) {
      var id = el.getAttribute('data-id'), i = state.favs.indexOf(id);
      if (i >= 0) state.favs.splice(i, 1); else state.favs.push(id);
      render();
    },
    detailTab: function (el) { state.detailTab = el.getAttribute('data-value'); render(); },
    addPlace: function (el) { state.add.place = el.getAttribute('data-value'); render(); },
    addUnit: function (el) { state.add.unit = el.getAttribute('data-value'); render(); },
    qty: function (el) { state.add.amount = Math.max(1, state.add.amount + Number(el.getAttribute('data-d'))); render(); },
    notice: function (el) { var id = el.getAttribute('data-id'); state.openNotice = state.openNotice === id ? null : id; render(); },
    noti: function (el) {
      var k = el.getAttribute('data-key');
      state.noti[k] = !state.noti[k];
      render();
    },
    dialog: function (el) { state.dialog = el.getAttribute('data-value'); renderOverlay(); },
    dialogCancel: function (el, e) {
      // 팝업 상자 안쪽을 눌렀을 때(배경이 아닌 곳)는 닫지 않는다.
      if (el.classList.contains('dim') && e.target !== el) return;
      closeDialog();
    },
    dialogOk: function () {
      var which = state.dialog;
      closeDialog();
      if (which === 'fridgeLink') soon();
      else if (which === 'logout') go('/login', true);
    },
  };

  $('frame').addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el || !ACTIONS[el.getAttribute('data-act')]) return;
    // 팝업 배경(.dim)은 배경 자체를 눌렀을 때만 반응한다.
    if (el.classList.contains('dim') && e.target !== el) return;
    if (el.tagName === 'A') e.preventDefault();
    ACTIONS[el.getAttribute('data-act')](el, e);
  });

  $('frame').addEventListener('submit', function (e) {
    var form = e.target.closest('[data-submit]');
    if (!form) return;
    e.preventDefault();
    var to = form.getAttribute('data-submit');
    go(to === 'home' ? '/' : to);
  });

  $('frame').addEventListener('input', function (e) {
    var t = e.target;
    if (t.id === 'keyword') {
      state.keyword = t.value;
      var links = document.querySelectorAll('[data-mall]');
      for (var i = 0; i < links.length; i++) links[i].href = mallUrl(links[i].getAttribute('data-mall'), state.keyword);
    } else if (t.getAttribute('data-bind')) {
      state.add[t.getAttribute('data-bind')] = t.value;
    } else if (t.id === 'birth' && t.value.length === 6) {
      var next = t.parentNode.querySelector('.b2');
      if (next) next.focus();
    }
  });

  window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.dialog) closeDialog(); });

  /* ---------- 시작: 첫 화면은 홈(앱과 같음) ---------- */
  state.dialog = currentRoute().path === '/' && !seen('mynaengi.fridgeLinkPopup') ? 'fridgeLink' : null;
  renderOverlay();
  render(true);
})();
