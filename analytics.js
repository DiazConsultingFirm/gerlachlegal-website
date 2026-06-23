// Gerlach Law — Analytics & Event Tracking
// GA4 Measurement ID: Replace GA4_ID below on go-live day
// To activate: replace 'G-XXXXXXXXXX' with the real Measurement ID from Google Analytics

(function () {
  var GA4_ID = 'G-XXXXXXXXXX';
  if (GA4_ID === 'G-XXXXXXXXXX') return; // no-op until ID is set

  var s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
  s.async = true;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_ID);

  // Phone click
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="tel:"]');
    if (a) gtag('event', 'phone_call_click', { phone_number: a.href.replace('tel:', '') });
  });

  // Consultation form submit
  document.addEventListener('submit', function (e) {
    gtag('event', 'consultation_request', { form_id: e.target.id || 'contact_form' });
  });

  // Scroll depth (25 / 50 / 75 / 90)
  var depths = [25, 50, 75, 90], fired = {};
  window.addEventListener('scroll', function () {
    var pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    depths.forEach(function (d) {
      if (pct >= d && !fired[d]) {
        fired[d] = true;
        gtag('event', 'scroll_depth', { depth_percent: d });
      }
    });
  }, { passive: true });
})();
