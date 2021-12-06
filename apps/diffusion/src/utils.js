import Cookies from 'universal-cookie';
import { bucket_url } from "./config";

export function getNoticeInfo(notice) {
  const base = notice.BASE;
  switch (base) {
    case "Collections des musées de France (Joconde)": {
      let title = "";
      if (notice.TITR) {
        title = notice.TITR;
      } else if ((notice.DENO || []).length) {
        title = notice.DENO.join(", ");
      } else {
        title = (notice.DOMN || []).join(", ");
      }
      title = capitalizeFirstLetter(title);

      const subtitle = !notice.TITR && notice.DENO ? "" : notice.DENO.join(", ");

      const metaDescription = capitalizeFirstLetter(jocondeMetaDescription(notice));
      const images = notice.IMG.map((e, i) => {
        const src = e ? `${bucket_url}${e}` : "/static/noimage.png";
        return { src, alt: `${title}_${i}` };
      });

      const image_preview = images.length ? images[0].src : "/static/noimage.png";

      return { title, subtitle, metaDescription, image_preview, images };
    }

    case "Photographies (Mémoire)": {
      let title = notice.TICO || notice.LEG || `${notice.EDIF || ""} ${notice.OBJ || ""}`.trim();
      title = capitalizeFirstLetter(title);

      let logo = "";
      if (notice.PRODUCTEUR === "CRMH") {
        logo = "/static/mh.png";
      } else if (notice.PRODUCTEUR === "MAP") {
        logo = "/static/map.png";
      } else if (notice.PRODUCTEUR === "INV") {
        logo = "/static/inventaire.jpg";
      }

      const subtitle = notice.TECHN;

      const metaDescription = capitalizeFirstLetter(memoireMetaDescription(notice));

      const image_preview = notice.IMG ? `${bucket_url}${notice.IMG}` : "/static/noimage.png";
      const images = notice.IMG ? [{ src: `${bucket_url}${notice.IMG}`, alt: title }] : [];

      return { title, subtitle, metaDescription, logo, image_preview, images };
    }
    case "Répertoire des Musées de France (Muséofile)": {
      let title = notice.NOMOFF || notice.AUTNOM || notice.NOMUSAGE;
      title = capitalizeFirstLetter(title);

      let subtitle = "";
      if(notice.DOMPAL){
        subtitle = notice.DOMPAL.join(", ");
      }

      let localisations = [];
      if (notice.VILLE_M) {
        localisations.push(notice.VILLE_M);
      }
      if (notice.DPT) {
        localisations.push(notice.DPT);
      }
      if (notice.REGION) {
        localisations.push(notice.REGION);
      }
      let localisation = localisations.join(", ");

      let metaDescription = "";

      const image_preview = notice.PHOTO ? `${bucket_url}${notice.PHOTO}` : "/static/noimage.png";
      const images = notice.PHOTO ? [{ src: `${bucket_url}${notice.PHOTO}`, alt: title }] : [];

      return { title, subtitle, metaDescription, image_preview, images, localisation };
    }
    case "Enluminures (Enluminures)": {
      let title = `${notice.TITR} - ${notice.SUJET}`;
      title = capitalizeFirstLetter(title);

      const subtitle = notice.SUJET;

      let metaDescription = "";

      const image_preview = notice.VIDEO.length
        ? `${bucket_url}${notice.VIDEO[0]}`
        : "/static/noimage.png";

      const images = notice.VIDEO.map((e, i) => ({
        src: `${bucket_url}${e}`,
        alt: `${title}_${i}`
      }));

      return { title, subtitle, metaDescription, images, image_preview };
    }
    case "Récupération artistique (MNR Rose-Valland)": {
      let title = notice.TICO || notice.TITR;
      title = capitalizeFirstLetter(title);

      const subtitle = notice.DENO ? notice.DENO.join(", ") : "";

      let metaDescription = "";

      const image_preview = notice.VIDEO.length
        ? `${bucket_url}${notice.VIDEO[0]}`
        : "/static/noimage.png";

      const images = notice.VIDEO.map((e, i) => ({
        src: `${bucket_url}${e}`,
        alt: e
      }));

      return { title, subtitle, image_preview, metaDescription, images };
    }
    case "Patrimoine mobilier (Palissy)": {
      let title = notice.TICO || notice.TITR;
      title = capitalizeFirstLetter(title);

      let logo = "";
      if (notice.PRODUCTEUR === "Inventaire") {
        logo = "/static/inventaire.jpg";
      } else if (notice.PRODUCTEUR === "Monuments Historiques") {
        logo = "/static/mh.png";
      }

      let metaDescription = "";

      const subtitle = notice.DENO ? notice.DENO.join(", ") : "";

      let localisation = [];
      if (Array.isArray(notice.REG) && notice.REG.length > 0) {
        for(let i=0; i<notice.REG.length; i++){
          localisation.push(notice.REG[i]);
        }
      }
      if (Array.isArray(notice.DPT) && notice.DPT.length > 0) {
        if (Array.isArray(notice.DPT_LETTRE) && notice.DPT_LETTRE.length > 0) {
          for(let i=0; i<notice.DPT_LETTRE.length; i++){
            localisation.push(`${notice.DPT_LETTRE[i]} (${notice.DPT[i]})`);
          }
        } else {
          for(let i=0; i<notice.DPT.length; i++){
            localisation.push(notice.DPT[i]);
          }
        }
      }

      //Si WCOM existe, on affiche WCOM, sinon on affiche COM s'il existe
      if ((Array.isArray(notice.WCOM) && notice.WCOM.length > 0) || (Array.isArray(notice.COM) && notice.COM.length > 0)) {
        if (Array.isArray(notice.WCOM) && notice.WCOM.length > 0){
          for(let i=0; i<notice.WCOM.length; i++){
            localisation.push(notice.WCOM[i]);
          }
        }
        else {
          for(let i=0; i<notice.COM.length; i++){
           localisation.push(notice.COM[i]);
          }
        }
      }

      //Si WADRS existe, on affiche WADRS, sinon on affiche ADRS s'il existe
      if (notice.WADRS || notice.ADRS) {
        if (notice.WADRS){
          localisation.push(notice.WADRS);
        }
        else {
          localisation.push(notice.ADRS);
        }
      }

      if (notice.EDIF) {
        localisation.push(notice.EDIF);
      }

      localisation = localisation.join(" ; ");

      const images = notice.MEMOIRE.map((e, i) => {
        const src = e.url ? `${bucket_url}${e.url}` : "/static/noimage.png";
        return { src, alt: `${title}_${i}`, ref: e.ref, copy: e.copy, name: e.name, marq: e.marq };
      });

      const image_preview = notice.MEMOIRE.filter(e => e.url).length
        ? `${bucket_url}${notice.MEMOIRE.filter(e => e.url)[0].url}`
        : "/static/noimage.png";

      return { title, subtitle, metaDescription, logo, localisation, images, image_preview };
    }
    case "Patrimoine architectural (Mérimée)": {
      let title = notice.TICO || "";
      title = capitalizeFirstLetter(title);

      let logo = "";
      if (notice.PRODUCTEUR === "Inventaire") {
        logo = "/static/inventaire.jpg";
      } else if (notice.PRODUCTEUR === "Monuments Historiques") {
        logo = "/static/mh.png";
      } else if (notice.PRODUCTEUR === "Label Maisons des illustres") {
        logo = "/static/logoMDI.png";
      } else if (notice.PRODUCTEUR === "Label Jardin remarquable") {
        logo = "/static/JR.S.jpg";
      } else if (notice.PRODUCTEUR === "Label Architecture contemporaine remarquable") {
        logo = "/static/ACR_Logotype_Noir.png";
      }

      const subtitle = notice.DENO ? notice.DENO.join(", ") : "";
      
      let localisation = [];
      if (Array.isArray(notice.REG) && notice.REG.length > 0) {
        for(let i=0; i<notice.REG.length; i++){
          localisation.push(notice.REG[i]);
        }
      }
      if (Array.isArray(notice.DPT) && notice.DPT.length > 0) {
        if (Array.isArray(notice.DPT_LETTRE) && notice.DPT_LETTRE.length > 0) {
          for(let i=0; i<notice.DPT_LETTRE.length; i++){
            localisation.push(`${notice.DPT_LETTRE[i]} (${notice.DPT[i]})`);
          }
        } else {
          for(let i=0; i<notice.DPT.length; i++){
            localisation.push(notice.DPT[i]);
          }
        }
      }

      //Si WCOM existe, on affiche WCOM, sinon on affiche COM s'il existe
      if ((Array.isArray(notice.WCOM) && notice.WCOM.length > 0) || (Array.isArray(notice.COM) && notice.COM.length > 0)) {
        if (Array.isArray(notice.WCOM) && notice.WCOM.length > 0){
          for(let i=0; i<notice.WCOM.length; i++){
            localisation.push(notice.WCOM[i]);
          }
        }
        else {
          for(let i=0; i<notice.COM.length; i++){
            localisation.push(notice.COM[i]);
          }
        }
      }

      //Si WADRS existe, on affiche WADRS, sinon on affiche ADRS s'il existe
      if (notice.WADRS || notice.ADRS) {
        if (notice.WADRS){
          localisation.push(notice.WADRS);
        }
        else {
          localisation.push(notice.ADRS);
        }
      }

      localisation = localisation.join(" ; ");
      let metaDescription = "";

      const images = notice.MEMOIRE.map((e, i) => {
        const src = e.url ? `${bucket_url}${e.url}` : "/static/noimage.png";
        return { src, alt: `${title}_${i}`, ref: e.ref, copy: e.copy, name: e.name, marq: e.marq };
      });

      const image_preview = notice.MEMOIRE.filter(e => e.url).length
        ? `${bucket_url}${notice.MEMOIRE.filter(e => e.url)[0].url}`
        : "/static/noimage.png";

      return { title, subtitle, metaDescription, logo, image_preview, images, localisation };
    }
    case "Ressources biographiques (Autor)": {
      let title = 
      (notice.NOMPRENOM ? notice.NOMPRENOM : 
        ( (notice.PREN ? notice.PREN : " ") 
          +(notice.NOM ? notice.NOM : "")
        )
      );
      let logo = "";
      if (notice.PRODUCTEUR === "Inventaire") {
        logo = "/static/inventaire.jpg";
      } else if (notice.PRODUCTEUR === "Monuments Historiques") {
        logo = "/static/mh.png";
      } else if (notice.PRODUCTEUR === "Label Maison des Illustres") {
        logo = "/static/logoMDI.png";
      }
      else{
        logo = notice.PRODUCTEUR;
      }

      const images = notice.MEMOIRE.map((e, i) => {
        const src = e.url ? `${bucket_url}${e.url}` : "/static/noimage.png";
        return { src, alt: `${e.name}_${i}`, ref: e.ref, copy: e.copy, name: e.name };
      });

      const image_preview = notice.MEMOIRE.filter(e => e.url).length
        ? `${bucket_url}${notice.MEMOIRE.filter(e => e.url)[0].url}`
        : "/static/noimage.png";

      const nom =  (notice.NOMPRENOM? notice.NOMPRENOM : (notice.PREN + " " + notice.NOM)) + (notice.ALIAS!="" ? (" - " + notice.ALIAS) : "");

      //Description
      let life = "";
      if(notice.DNAISS && notice.DMORT){
        life = " (" + notice.DNAISS + " - " + notice.DMORT + ")";
      }
      else if(notice.DNAISS && !notice.DMORT){
        life = " (" + notice.DNAISS + ")";
      }
      const description = notice.INI + life;

      //Date d'activité
      let activite = "";
      if(notice.DATES || LOCACT){
        activite = " - (dates d'activité : " + notice.DATES + ((notice.DATES && notice.LOCACT)? (" - " + notice.LOCACT) : "");
      }

      //Fonction
      let isOrfevre = false;
      let fonction = "";
      notice.FONC.map( (fonc, index) => {
        if(fonc == "Orfèvre"){
          isOrfevre = true;
        }
        fonction += ( index==0? fonc : (", " + fonc) )
      });

      //Symbole
      let symbole = isOrfevre? notice.SYMB : "";

      //Dates et lieus d'existence
      let datesLieus = "";
      datesLieus += ( notice.DNAISS ? (notice.DNAISS + (notice.LNAISS? (" ("+notice.LNAISS+") ") : "") ) : "" );
      datesLieus += (notice.DNAISS && notice.DMORT ? " - " : "");
      datesLieus += ( notice.DMORT ? (notice.DMORT + (notice.LMORT? (" ("+notice.LMORT+") ") : "") ) : "");

      //Référence ISNI : ISNI_VERIFIEE / Lien ark : ARK
      let referenceArk = "";
      referenceArk += notice.ISNI_VERIFIEE ? notice.ISNI_VERIFIEE : "";
      referenceArk += ((notice.ISNI_VERIFIEE? " / " : "") + ( notice.ARK ? ( "Lien ARK : " + notice.ARK) : "")); 

      return { title, images, image_preview, logo, nom, description, fonction, symbole, datesLieus, referenceArk };
    }
    default:
      return {};
  }
}

function jocondeMetaDescription(n) {
  const museum = n.NOMOFF || n.LOCA;
  const cleanAutor =
    n.AUTR &&
    String(n.AUTR)
      .split(/[;.]/)[0]
      .replace(/\(.*\)/, "")
      .replace("anonyme", "")
      .trim();
  const cleanRepr = n.REPR && String(n.REPR).replace(/\(.*\)/, "");
  if (n.DESC && cleanAutor && n.DESC.length < 100) {
    return `${n.DESC} par ${cleanAutor}`;
  } else if (cleanRepr && museum && n.TECH && n.TECH.length) {
    if (cleanAutor) {
      return `${cleanRepr} par ${cleanAutor} (${n.TECH[0]}) - ${museum}`;
    } else {
      return `${cleanRepr} (${n.TECH[0]}) - ${museum}`;
    }
  } else if (n.TITR && cleanAutor && museum) {
    return `${cleanAutor} : ${n.TITR} - ${museum}`;
  } else if (n.DESC.length >= 100 && cleanAutor) {
    return `${cleanAutor} : ${String(n.DESC).split(/[;.]/)[0]}`;
  } else if (n.DESC.length < 150 && cleanAutor) {
    return n.DESC;
  } else if (n.TICO) {
    return museum ? `${n.TICO} - ${museum}` : n.TICO;
  }
  return "";
}

function memoireMetaDescription(n) {
  const cleanAutor =
    n.AUTP &&
    String(n.AUTP.join(', '))
      .trim();
  if (n.EDIF && n.LEG && n.COM) {
    return `${n.EDIF} à ${n.COM} - ${n.LEG}${cleanAutor ? ` - Photo : ${cleanAutor}` : ""}`;
  } else if (n.LEG && n.LIEUCOR) {
    return `${n.LEG} - ${n.LIEUCOR}${cleanAutor ? ` - Photo : ${cleanAutor}` : ""}`;
  } else if (n.LEG) {
    return `${n.LEG}${cleanAutor ? ` - Photo : ${cleanAutor}` : ""}`;
  } else if (n.OBJT) {
    return `${n.OBJT}${cleanAutor ? ` - Photo : ${cleanAutor}` : ""}`;
  }
  return "";
}

const capitalizeFirstLetter = s => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function saveListRef (listRefs, searchParams, removeFromBucket){
  //Si la props removeFromBucket existe, c'est qu'on est dans le panier et qu'on n'enregistre pas de recherche
  if(!removeFromBucket){
    const cookies = new Cookies();
    const encodedListRefs = JSON.stringify(listRefs);

    // Suppression du cookie de la recherche précédente
    Object.keys(cookies.getAll())
    .filter(key => key.startsWith("listRefs-"))
    .forEach(name => {cookies.remove(name, {path: '/'})});

    cookies.set("listRefs-"+searchParams.get("idQuery"), encodedListRefs, {path: '/', overwrite: true});
  }
}

/**
 * Ajout de l'exclusion des champs dans la requête E-S
 */
export function addFilterFields(){
  (function(send) {

    XMLHttpRequest.prototype.send = function(data) {
      let transformData = false;

      if(data){
        let newReq = data.split('\n').filter( val => val !== "").map((val) => {
          let obj = JSON.parse(val);
     
          if(Object.keys(obj).includes('query')){
            obj._source = {
              "excludes": listeNonDiffusable()
            }
            transformData = true;
          }
          return JSON.stringify(obj);
        }).join('\n');
  
        if(transformData){
          data = newReq + '\n';
        }
      }
      
      send.call(this, data);
    };

  })(XMLHttpRequest.prototype.send);
}

/**
 * Retourne les champs non diffusable pour Palissy
 * @returns array
 */
export function listeNonDiffusable(){
  return ['ADRS2','COM2', 'EDIF2', 'EMPL2', 'INSEE2', 'LBASE2'];
}
