// PG Manager legal pages: the ONE place to change the contact details and version.
// When your website email is ready, change CONTACT_EMAIL here (and kContactEmail in lib/config.dart).
var LEGAL = {
  CONTACT_NAME: 'Janakiram',
  CONTACT_EMAIL: 'pjvssm@gmail.com',
  VERSION: '2026-10-03',
  UPDATED: '3 October 2026'
};
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-legal]').forEach(function (el) {
    var key = el.getAttribute('data-legal');
    el.textContent = LEGAL[key] || '';
    if (key === 'CONTACT_EMAIL' && el.tagName === 'A') el.href = 'mailto:' + LEGAL.CONTACT_EMAIL;
  });
});
