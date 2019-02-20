function fixLink(link) {
  return link
    .replace(/^.*AffUrl\('(.*?)'\).*$/, "$1")
    .replace(/^<a href="(\/documentation\/memoire\/[^"]+)?.*$/i, "http://www2.culture.gouv.fr$1")
    .replace(/^<a href=([^ ]+)?.*$/i, "$1");
}

module.exports = {
  fixLink
};
