export function findCollection(ref = "") {
  const prefix = ref.substring(0, 2);
  switch (prefix) {
    case "EA":
    case "PA":
    case "IA":
      return "merimee";
    case "IM":
    case "PM":
      return "palissy";
    default:
      return "";
  }
}

// Sometimes, links are f***ed up. We try to post-fix them.
export function postFixedLink(link) {
  return link.replace(
    /^<a href="(\/documentation\/memoire\/[^"]+)?.*$/i,
    "http://www2.culture.gouv.fr$1"
  );
}
