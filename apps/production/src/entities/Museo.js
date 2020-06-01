import Notice from "./Notice";

export default class Museo extends Notice {
  constructor(body) {
    super(body, "museo");
  }
  validate(body) {
    super.validate(body);
    // Every controls errors are *warnings* for now.
    if(body["POP_COORDONNEES.lat"] || body["POP_COORDONNEES.lon"]){
      const regex = /^[0-9]*[.]?[0-9]*$/;
      const lat = body["POP_COORDONNEES.lat"];
      const lon = body["POP_COORDONNEES.lon"];
      if(!lat.match(regex) || !lon.match(regex)){
        this._errors.push(
          `Les champs POP_COORDONNEES.lat et POP_COORDONNEES.lon doivent être au format numérique xx.xxxxxx`
        );
      }
    }
  }
}

