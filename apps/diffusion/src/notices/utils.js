 import API from "../../src/services/api";

// Get collection by ref prefix.
export async function findCollection(ref = "") {
  if (typeof ref !== "string") {
    return "";
  }
  let collection = "";
  let producteurs = [];
  const response = await API.getProducteurs();

  if(response && response.producteurs){
    producteurs = response.producteurs;
  }
  producteurs.map( producteur => {
    producteur.BASE.map( BASE => {
      BASE.prefixes.map( prefix => {
        if(String(ref).startsWith(String(prefix))){
          collection = BASE.base;
        }
      })
    });
  });

  return collection;
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
