// Stops another website from showing this page inside a hidden frame to trick clicks ("clickjacking").
// Used by the policy pages. GitHub Pages cannot send the X-Frame-Options header, and a page's own
// Content-Security-Policy cannot set frame-ancestors, so this small script does the same job.
(function () {
  if (window.top !== window.self) {
    document.documentElement.style.visibility = 'hidden';
    try { window.top.location.replace(window.self.location.href); } catch (e) { /* blocked: page stays hidden */ }
  }
})();
