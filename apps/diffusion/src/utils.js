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

      let metaDescription = "";
      if (notice.LEG) {
        metaDescription = notice.LEG;
      }

      const image_preview = notice.IMG ? `${bucket_url}${notice.IMG}` : "/static/noimage.png";
      const images = notice.IMG ? [{ src: `${bucket_url}${notice.IMG}`, alt: title }] : [];

      return { title, subtitle, metaDescription, logo, image_preview, images };
    }
    case "Musées de france (MUSEO)": {
      let title = notice.NOMOFF || notice.NOMANC || notice.NOMUSAGE;
      title = capitalizeFirstLetter(title);

      let metaDescription = "";

      const image_preview = notice.PHOTO ? `${bucket_url}${notice.PHOTO}` : "/static/noimage.png";
      const images = notice.PHOTO ? [{ src: `${bucket_url}${notice.PHOTO}`, alt: title }] : [];

      return { title, metaDescription, image_preview, images };
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
        localisation.push(departmentText(notice.DPT));
      }
      if (notice.WCOM) {
        localisation.push(notice.WCOM);
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
        localisation.push(departmentText(notice.DPT));
      }
      if (notice.WCOM) {
        localisation.push(notice.WCOM);
      }
      if (notice.WADRS) {
        localisation.push(notice.WADRS);
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

const capitalizeFirstLetter = s => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function departmentText(v) {
  return (
    {
      "01": "Ain",
      "02": "Aisne",
      "03": "Allier",
      "04": "Alpes-de-Haute-Provence",
      "05": "Hautes-Alpes",
      "06": "Alpes-Maritimes",
      "07": "Ardèche",
      "08": "Ardennes",
      "09": "Ariège",
      "10": "Aube",
      "11": "Aude",
      "12": "Aveyron",
      "13": "Bouches-du-Rhône",
      "14": "Calvados",
      "15": "Cantal",
      "16": "Charente",
      "17": "Charente-Maritime",
      "18": "Cher",
      "19": "Corrèze",
      "21": "Côte-d'Or",
      "22": "Côtes-d'Armor",
      "23": "Creuse",
      "24": "Dordogne",
      "25": "Doubs",
      "26": "Drôme",
      "27": "Eure",
      "28": "Eure-et-Loir",
      "29": "Finistère",
      "2A": "Corse-du-Sud",
      "2B": "Haute-Corse",
      "30": "Gard",
      "31": "Haute-Garonne",
      "32": "Gers",
      "33": "Gironde",
      "34": "Hérault",
      "35": "Ille-et-Vilaine",
      "36": "Indre",
      "37": "Indre-et-Loire",
      "38": "Isère",
      "39": "Jura",
      "40": "Landes",
      "41": "Loir-et-Cher",
      "42": "Loire",
      "43": "Haute-Loire",
      "44": "Loire-Atlantique",
      "45": "Loiret",
      "46": "Lot",
      "47": "Lot-et-Garonne",
      "48": "Lozère",
      "49": "Maine-et-Loire",
      "50": "Manche",
      "51": "Marne",
      "52": "Haute-Marne",
      "53": "Mayenne",
      "54": "Meurthe-et-Moselle",
      "55": "Meuse",
      "56": "Morbihan",
      "57": "Moselle",
      "58": "Nièvre",
      "59": "Nord",
      "60": "Oise",
      "61": "Orne",
      "62": "Pas-de-Calais",
      "63": "Puy-de-Dôme",
      "64": "Pyrénées-Atlantiques",
      "65": "Hautes-Pyrénées",
      "66": "Pyrénées-Orientales",
      "67": "Bas-Rhin",
      "68": "Haut-Rhin",
      "69": "Rhône",
      "70": "Haute-Saône",
      "71": "Saône-et-Loire",
      "72": "Sarthe",
      "73": "Savoie",
      "74": "Haute-Savoie",
      "75": "Paris",
      "76": "Seine-Maritime",
      "77": "Seine-et-Marne",
      "78": "Yvelines",
      "79": "Deux-Sèvres",
      "80": "Somme",
      "81": "Tarn",
      "82": "Tarn-et-Garonne",
      "83": "Var",
      "84": "Vaucluse",
      "85": "Vendée",
      "86": "Vienne",
      "87": "Haute-Vienne",
      "88": "Vosges",
      "89": "Yonne",
      "90": "Territoire de Belfort",
      "91": "Essonne",
      "92": "Hauts-de-Seine",
      "93": "Seine-Saint-Denis",
      "94": "Val-de-Marne",
      "95": "Val-d'Oise",
      "971": "Guadeloupe",
      "972": "Martinique",
      "973": "Guyane",
      "974": "La Réunion",
      "975": "Saint-Pierre-et-Miquelon",
      "976": "Mayotte"
    }[v] || v
  );
}
