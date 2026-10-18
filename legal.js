// PG Manager legal pages: the ONE place to change the contact details and version.
// When your website email is ready, change CONTACT_EMAIL here (and contactEmail in lib/config.dart).
// VERSION must be the same as legalVersion in lib/config.dart (changing it asks everyone to accept again).
var LEGAL = {
  BUSINESS: 'PG Manager',
  CONTACT_NAME: 'Janakiram',
  CONTACT_EMAIL: 'pjvssm@gmail.com',
  CITY: 'Bengaluru, Karnataka, India',
  VERSION: '2026-10-18',
  UPDATED: '18 October 2026'
};
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-legal]').forEach(function (el) {
    var key = el.getAttribute('data-legal');
    el.textContent = LEGAL[key] || '';
    if (key === 'CONTACT_EMAIL' && el.tagName === 'A') el.href = 'mailto:' + LEGAL.CONTACT_EMAIL;
  });
});
