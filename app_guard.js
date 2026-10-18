// PG Manager page guard (kept as a separate file so the app's security policy stays unchanged).
// 1. Stops other websites from showing PG Manager inside a hidden frame to trick clicks ("clickjacking").
// 2. Shows a one-time notice that the app uses only essential browser storage (no ads, no tracking).
(function () {
  if (window.top !== window.self) {
    document.documentElement.style.visibility = 'hidden';
    try { window.top.location.replace(window.self.location.href); } catch (e) { /* blocked: page stays hidden */ }
    return;
  }
  var KEY = 'pgm_notice_ok';
  function seen() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return true; } }
  function remember() { try { localStorage.setItem(KEY, '1'); } catch (e) {} }
  function show() {
    if (seen() || document.getElementById('pgm-notice')) return;
    var bar = document.createElement('div');
    bar.id = 'pgm-notice';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie notice');
    bar.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483000;max-width:620px;margin:0 auto;' +
      'background:#1D2B24;color:#fff;border-radius:14px;padding:12px 14px;display:flex;gap:12px;align-items:center;' +
      'flex-wrap:wrap;box-shadow:0 8px 24px rgba(0,0,0,.25);font:14px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';
    var txt = document.createElement('span');
    txt.style.cssText = 'flex:1 1 260px';
    txt.appendChild(document.createTextNode('PG Manager uses only essential browser storage to keep you logged in. No ads, no tracking. '));
    var a = document.createElement('a');
    a.href = 'cookies.html';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Cookie Policy';
    a.style.cssText = 'color:#F2C14E;text-decoration:underline';
    txt.appendChild(a);
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'OK, got it';
    btn.style.cssText = 'min-height:44px;padding:0 18px;border:0;border-radius:10px;background:#F2C14E;color:#1D2B24;' +
      'font:600 15px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;cursor:pointer';
    btn.onclick = function () { remember(); bar.remove(); };
    bar.appendChild(txt);
    bar.appendChild(btn);
    // keep taps on the notice away from the app underneath
    ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'wheel'].forEach(function (t) {
      bar.addEventListener(t, function (e) { e.stopPropagation(); }, { passive: true });
    });
    document.body.appendChild(bar);
  }
  function later() { setTimeout(show, 2500); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', later); else later();
})();
