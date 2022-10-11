 import API from "../../src/services/api";
 import {fromUrlQueryString } from "@popproject/pop-react-elasticsearch";
 import queryString from "query-string";


// Get collection by ref prefix.
export async function findCollection(ref = "") {
  if (typeof ref !== "string") {
    return "";
  }
  let collection = "";
  let producteurs = [];
  const response = await API.getProducteurs();

  //Bases ne contenant pas de prefixes
  let possibleBases = [];

  if(response && response.producteurs){
    producteurs = response.producteurs;
  }
  producteurs.map( producteur => {
    producteur.BASE.map( BASE => {
      possibleBases.push(BASE.base)
      });
  });
  //Pour chaque base n'ayant pas de préfixe, on test si la notice provient d'une de ces bases
  if(collection == "" && possibleBases.length > 0){
    for(let i=0; i<possibleBases.length; i++){
      const notice = await API.getNotice(possibleBases[i], ref);
      if(notice){
        return possibleBases[i];
      }
    }
  }
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

export function pdfLinks(value, name){
  if (!value) {
    return null;
  }
  if (!value || !Array.isArray(value) || !value.length) {
    if (String(value) === value && !String(value) == "") {
      return {url: `https://www.pop.culture.gouv.fr/search/list?${queryString.stringify({ [name]: JSON.stringify([value]) })}`, val: value};
    }
    return null;
  }
  const links = [];
  value.forEach((val) => {
    val.split('#').forEach((el) => {
      links.push(
        {url:`https://www.pop.culture.gouv.fr/search/list?${queryString.stringify({ [name]: JSON.stringify([el]) })}`, val: el}
        );
      });
    });
    console.log(links)
    return links;

};
/*export function pdfLinks(value, name){
  if(value && value!==""){
    if(Array.isArray(value)){
      let links = value.map( val => {
        if(val){
          return {url:`https://www.pop.culture.gouv.fr/search/list?${queryString.stringify({ [name]: JSON.stringify([val]) })}`, val: val};
        }
        else {return null}
      });
      return links;
    }
    else{
      return {url: `https://www.pop.culture.gouv.fr/search/list?${queryString.stringify({ [name]: JSON.stringify([value]) })}`, val: value};
    }
  }
  return null;
};*/

export function highlighting(wholeWord){
  //highlighting
  if(wholeWord){
    const notIncludedTerms = [
      "l'","le","la","les",
      "qu'","que","quoi",
      "n'","ne",
      "d'","de","du","des",
      "c'","ce","ca","ces","cette",
      "jusqu'",
      "quoiqu'",
      "lorsqu'",
      "puisqu'"
    ];
    $("p").highlight(wholeWord);
    wholeWord.split(" ").forEach(word => {if(!notIncludedTerms.includes(String(word))){$("p").highlight(word)}});
  }
}

export function lastSearch(searchParams, searchParamsUrl, pop_url){
  if(searchParams.idQuery){
    let url;
    let view = searchParams.last_view;
    if(searchParams.qb){
      let list = searchParamsUrl.split("qb=");
      url = `${pop_url}advanced-search/${view}/${searchParams.base}?qb=${list[1]}`
    }
    else{
      url = `${pop_url}search/${view}?${searchParamsUrl}`
    }
    return url;
  }
  return null;
}

// Retourne l'url des archives pour les notices qui ont un champ LMDP renseignée
export function getUrlArchive(REF){
  return `https://archives-map.culture.gouv.fr/archive/resultats/simple/lineaire/n:19?RECH_S=${REF}&type=simple`;
}
