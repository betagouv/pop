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

      const subtitle = notice.TECH;

      const metaDescription = capitalizeFirstLetter(memoireMetaDescription(notice));

      const image_preview = notice.IMG ? `${bucket_url}${notice.IMG}` : "/static/noimage.png";
      const images = notice.IMG ? [{ src: `${bucket_url}${notice.IMG}`, alt: title }] : [];

      return { title, subtitle, metaDescription, logo, image_preview, images };
    }
    case "Musées de france (MUSEO)": {
      let title = notice.NOMOFF || notice.NOMANC || notice.NOMUSAGE;
      title = capitalizeFirstLetter(title);

      const subtitle = ""
      if(notice.DOMPAL){
        subtitle = notice.DOMPAL.join(", ");
      }

      let localisations = [];
      if (notice.VILLE-M) {
        localisations.push(notice.VILLE-M);
      }
      if (notice.DPT) {
        localisations.push(notice.DPT);
      }
      if (notice.VILLE-M) {
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
        alt: `${title}_${i}`
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
      if (notice.REG) {
        localisation.push(notice.REG);
      }
      if (notice.DPT) {
        if (notice.DPT_LETTRE) {
          localisation.push(`${notice.DPT_LETTRE} (${notice.DPT})`);
        } else {
          localisation.push(notice.DPT);
        }
      }

      //Si WCOM existe, on affiche WCOM, sinon on affiche COM (s'il existe)
      if (notice.WCOM || notice.COM) {
        if (notice.WCOM){
          localisation.push(notice.WCOM);
        }
        else {
          localisation.push(notice.COM);
        }
      }

      //Si WADRS existe, on affiche WADRS, sinon on affiche ADRS (s'il existe)
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
        return { src, alt: `${title}_${i}`, ref: e.ref, copy: e.copy, name: e.name };
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
      }

      const subtitle = notice.DENO ? notice.DENO.join(", ") : "";

      let localisation = [];
      if (notice.REG) {
        localisation.push(notice.REG);
      }
      if (notice.DPT) {
        if (notice.DPT_LETTRE) {
          localisation.push(`${notice.DPT_LETTRE} (${notice.DPT})`);
        } else {
          localisation.push(notice.DPT);
        }
      }

      //Si WCOM existe, on affiche WCOM, sinon on affiche COM s'il existe
      if (notice.WCOM || notice.COM) {
        if (notice.WCOM){
          localisation.push(notice.WCOM);
        }
        else {
          localisation.push(notice.COM);
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
        return { src, alt: `${title}_${i}`, ref: e.ref, copy: e.copy, name: e.name };
      });

      const image_preview = notice.MEMOIRE.filter(e => e.url).length
        ? `${bucket_url}${notice.MEMOIRE.filter(e => e.url)[0].url}`
        : "/static/noimage.png";

      return { title, subtitle, metaDescription, logo, image_preview, images, localisation };
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
    String(n.AUTP)
      .split(/[;.]/)[0]
      .replace(/\(.*\)/, "")
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
