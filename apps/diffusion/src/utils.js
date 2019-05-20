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
      return { title };
    }
    case "memoire": {
      let title = notice.TICO || notice.LEG || `${notice.EDIF || ""} ${notice.OBJ || ""}`.trim();
      title = capitalizeFirstLetter(title);
      return { title };
    }
    case "museo": {
      let title = notice.NOMOFF || notice.NOMANC || notice.NOMUSAGE;
      title = capitalizeFirstLetter(title);
      return { title };
    }
    case "enluminures": {
      const title = `${notice.TITR} - ${notice.SUJET}`;
      title = capitalizeFirstLetter(title);
      return { title };
    }
    case "mnr": {
      const title = notice.TICO || notice.TITR;
      title = capitalizeFirstLetter(title);
      return { title };
    }
    case "palissy": {
      const title = notice.TICO || notice.TITR;
      title = capitalizeFirstLetter(title);
      return { title };
    }
    case "merimee": {
      const title = notice.TICO || notice.TITR;
      title = capitalizeFirstLetter(title);
      return { title };
    }
    default:
      return "";
  }
}

const capitalizeFirstLetter = s => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
