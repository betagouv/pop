import { bucket_url } from "./config";

/*
On a du faire cette fonction "utils.getInformations" pour gérer les principales informations des notices dissiminées dans l'app et qui nécessitait du traitement "fastidieux"
*/

export function getInformations(notice) {
  const type = notice._type;

  switch (type) {
    case "joconde": {
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

      const image = getImageUrl(notice);
      return { title, subtitle, image };
    }
    case "memoire": {
      let title = notice.TICO || notice.LEG || `${notice.EDIF || ""} ${notice.OBJ || ""}`.trim();
      title = capitalizeFirstLetter(title);

      let logo = "";
      if (notice.PRODUCTEUR === "CRMH") {
        logo = "/static/mh.png";
      } else if (notice.PRODUCTEUR === "SAP") {
        logo = "/static/map.png";
      }

      const subtitle = notice.TECH;

      const image = getImageUrl(notice);
      return { title, subtitle, logo, image };
    }
    case "museo": {
      let title = notice.NOMOFF || notice.NOMANC || notice.NOMUSAGE;
      title = capitalizeFirstLetter(title);

      const image = getImageUrl(notice);
      return { title, image };
    }
    case "enluminures": {
      let title = `${notice.TITR} - ${notice.SUJET}`;
      title = capitalizeFirstLetter(title);

      const subtitle = notice.SUJET;

      const image = getImageUrl(notice);
      return { title, subtitle, image };
    }
    case "mnr": {
      let title = notice.TICO || notice.TITR;
      title = capitalizeFirstLetter(title);

      const subtitle = notice.DENO ? notice.DENO.join(", ") : "";

      const image = getImageUrl(notice);
      return { title, subtitle, image };
    }
    case "palissy": {
      let title = notice.TICO || notice.TITR;
      title = capitalizeFirstLetter(title);

      let logo = "";
      if (notice.PRODUCTEUR === "Inventaire") {
        logo = "/static/inventaire.jpg";
      } else if (notice.PRODUCTEUR === "Monuments Historiques") {
        logo = "/static/mh.png";
      }

      const subtitle = notice.DENO ? notice.DENO.join(", ") : "";

      const image = getImageUrl(notice);
      return { title, subtitle, logo, image };
    }
    case "merimee": {
      let title = notice.TICO || notice.TITR;
      title = capitalizeFirstLetter(title);

      let logo = "";
      if (notice.PRODUCTEUR === "Inventaire") {
        logo = "/static/inventaire.jpg";
      } else if (notice.PRODUCTEUR === "Monuments Historiques") {
        logo = "/static/mh.png";
      }

      const subtitle = notice.DENO ? notice.DENO.join(", ") : "";

      const image = getImageUrl(notice);
      return { title, subtitle, logo, image };
    }
    default:
      return {};
  }
}

export function getImageUrl(notice) {
  if (notice.MEMOIRE && notice.MEMOIRE.length) {
    const img = notice.MEMOIRE[0] && notice.MEMOIRE[0].url;
    if (img) {
      if (img.match(/^http/)) {
        return img;
      } else {
        return `${bucket_url}${img}`;
      }
    }
  } else {
    const imgProp = notice.IMG || notice.VIDEO;
    if (imgProp && imgProp.length) {
      const img = typeof imgProp === "string" ? imgProp : imgProp[0];
      if (img) {
        if (img.match(/^http/)) {
          return img;
        } else {
          return `${bucket_url}${img}`;
        }
      }
    }
  }
  return "/static/noimage.png";
}

const capitalizeFirstLetter = s => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
