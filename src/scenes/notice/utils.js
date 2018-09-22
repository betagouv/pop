export function findCollection(ref = "") {
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