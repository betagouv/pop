import { bucket_url } from "./config";

/*
On a du faire cette fonction "utils.getNoticeInfo" pour gérer les principales informations des notices dissiminées dans l'app et qui nécessitait du traitement "fastidieux"
*/

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

      let metaDescription = "";
      if (notice.REPR) {
        metaDescription = notice.REPR;
      }

      const image = getImageUrl(notice);
      return { title, subtitle, metaDescription, image };
    }
    case "Photographies (Mémoire)": {
      let title = notice.TICO || notice.LEG || `${notice.EDIF || ""} ${notice.OBJ || ""}`.trim();
      title = capitalizeFirstLetter(title);

      let logo = "";
      if (notice.PRODUCTEUR === "CRMH") {
        logo = "/static/mh.png";
      } else if (notice.PRODUCTEUR === "SAP") {
        logo = "/static/map.png";
      }

      const subtitle = notice.TECH;

      let metaDescription = "";
      if (notice.LEG) {
        metaDescription = notice.LEG;
      }

      const image = getImageUrl(notice);
      return { title, subtitle, metaDescription, logo, image };
    }
    case "Musées de france (MUSEO)": {
      let title = notice.NOMOFF || notice.NOMANC || notice.NOMUSAGE;
      title = capitalizeFirstLetter(title);

      let metaDescription = "";

      const image = getImageUrl(notice);
      return { title, metaDescription, image };
    }
    case "Enluminures (Enluminures)": {
      let title = `${notice.TITR} - ${notice.SUJET}`;
      title = capitalizeFirstLetter(title);

      const subtitle = notice.SUJET;

      let metaDescription = "";

      const image = getImageUrl(notice);
      return { title, subtitle, metaDescription, image };
    }
    case "Récupération artistique (MNR Rose-Valland)": {
      let title = notice.TICO || notice.TITR;
      title = capitalizeFirstLetter(title);

      const subtitle = notice.DENO ? notice.DENO.join(", ") : "";

      let metaDescription = "";

      const image = getImageUrl(notice);
      return { title, subtitle, metaDescription, image };
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

      const image = getImageUrl(notice);
      return { title, subtitle, metaDescription, logo, image };
    }
    case "Patrimoine architectural (Mérimée)": {
      let title = notice.TICO || notice.TITR;
      title = capitalizeFirstLetter(title);

      let logo = "";
      if (notice.PRODUCTEUR === "Inventaire") {
        logo = "/static/inventaire.jpg";
      } else if (notice.PRODUCTEUR === "Monuments Historiques") {
        logo = "/static/mh.png";
      }

      const subtitle = notice.DENO ? notice.DENO.join(", ") : "";

      let metaDescription = "";
      /*
          const titre = this.props.notice.TICO || this.props.notice.TITR || "";
    const datation = this.props.notice.SCLE ? this.props.notice.SCLE.join(" ") : "";
    if (this.props.notice.DENO && this.props.notice.DENO.length === 1) {
      const category = this.props.notice.DENO[0];
      if (category.toLowerCase() === "église") {
        return `Découvrez ${titre}, cette ${category} du ${datation}.`;
      }
    }
    return `Découvrez ${titre}, du ${datation}.`;
    */

      const image = getImageUrl(notice);
      return { title, subtitle, metaDescription, logo, image };
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
