if (window.location.hostname !== "localhost") {
  window._paq = window._paq || [];
  _paq.push(["setDomains", ["*.pop.beta.gouv", "*.pop.culture.gouv.fr", "*.production.pop.beta.gouv.fr", "pop-next.now.sh"]]);
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
  (function() {
    var u = "//stats.data.gouv.fr/";
    _paq.push(["setTrackerUrl", u + "piwik.php"]);
    _paq.push(["setSiteId", "63"]);
    var d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.type = "text/javascript";
    g.async = true;
    g.defer = true;
    g.src = u + "piwik.js";
    s.parentNode.insertBefore(g, s);
  })();
}
