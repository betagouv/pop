export function findCollection(ref = "") {
  if (typeof ref !== "string") {
    return "";
  }
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
  return link
    .replace(/^<a href="(\/documentation\/memoire\/[^"]+)?.*$/i, "http://www2.culture.gouv.fr$1")
    .replace(/^<a href=([^ ]+)?.*$/i, "$1");
}

// https://schema.org/VisualArtwork
export function schema({
  name,
  created_at,
  artform,
  image,
  description,
  artMedium,
  alternateName,
  creator,
  comment
}) {
  const obj = {};
  obj["@context"] = "http://schema.org";
  obj["@type"] = "VisualArtwork";
  obj["name"] = name;
  obj["alternateName"] = alternateName;
  obj["dateCreated"] = created_at;
  obj["artform"] = artform;
  obj["image"] = image;
  obj["description"] = description;
  obj["creator"] = (creator || []).map(name => {
    return { "@type": "Person", name: name.trim() };
  });
  obj["comment"] = comment;
  obj["artMedium"] = artMedium;
  return JSON.stringify(obj);
}
