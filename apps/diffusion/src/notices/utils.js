 import API from "../../src/services/api";
 import {fromUrlQueryString } from "react-elasticsearch-pop";
 import queryString from "query-string";


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

export function getParamsFromUrl(url) {
  let initialValues;

  // This whole part is about backward compatibility of old search system.
  // If the URL has a `q[0][combinator]` param, it's the old system, so
  // it must be updated.
  const parsed = queryString.parse(url.substring(url.indexOf("?") + 1));

  if (parsed && parsed["q[0][combinator]"]) {
    const qb = [];
    Object.entries(parsed)
      // Map params from `q[0][combinator]=ET` to `{index: 0, key: combinator, value: ET}`
      .map(([k, value]) => {
        const matches = k.match(/\[([0-9]+)\]\[([a-z]+)\]/i);
        if (matches && matches.length === 3) {
          return { index: Number(matches[1]), key: matches[2], value };
        }
      })
      // Remove empty
      .filter(a => a)
      // Sort by index (0, 1, 2, etc.)
      .sort((a, b) => a.index - b.index)
      // Create a new "qb" param with the current system
      .forEach(e => {
        if (!qb[e.index]) {
          qb.push({ index: e.index });
        }
        switch (e.key) {
          case "combinator":
            qb[e.index].combinator = e.value === "OU" ? "OR" : "AND";
            break;
          case "key":
            qb[e.index].field = `${e.value}.keyword`;
            break;
          case "operator":
            qb[e.index].operator = e.value.replace("<>", "∃").replace("><", "!∃");
            break;
          default:
            qb[e.index][e.key] = e.value;
        }
      });
    // Create a Map with "qb" property (which is the current system).
    initialValues = new Map([["qb", qb]]);
  } else {
    initialValues = fromUrlQueryString(url.substring(url.indexOf("?") + 1));
  }



  return initialValues;
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
