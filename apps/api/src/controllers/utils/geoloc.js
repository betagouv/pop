const proj4 = require("proj4");

//https://epsg.io/27572
proj4.defs(
  "lambert2deprecated",
  "+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs"
);

//https://epsg.io/27571
proj4.defs(
  "lambert1",
  "+proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=1200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs"
);
//https://epsg.io/27572#
proj4.defs(
  "lambert2",
  "+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs"
);
//https://epsg.io/27573#
proj4.defs(
  "lambert3",
  "+proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.999877499 +x_0=600000 +y_0=3200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs"
);
//https://epsg.io/27574#
proj4.defs(
  "lambert4",
  "+proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.99994471 +x_0=234.358 +y_0=4185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs"
);
//https://epsg.io/2154
proj4.defs(
  "lambert93",
  "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
//https://epsg.io/2990
proj4.defs(
  "gauss laborde",
  "+proj=tmerc +lat_0=-21.11666666666667 +lon_0=55.53333333333333 +k=1 +x_0=50000 +y_0=160000 +ellps=intl +towgs84=94,-948,-1262,0,0,0,0 +units=m +no_defs"
);
//https://epsg.io/32630
proj4.defs("mtu", "+proj=utm +zone=30 +datum=WGS84 +units=m +no_defs");

function isInFrance(lat, lon) {
  const TopRight = [51.54, 10.3];
  const BottomLeft = [41.18, -9.62];
  if (lat < TopRight[0] && lat > BottomLeft[0] && lon < TopRight[1] && lon > BottomLeft[1]) {
    return true;
  }
  return false;
}

function lambertToWGS84(xy, zone) {
  if (!xy) {
    return { lat: 0, lon: 0 };
  }
  if (!zone) {
    return { lat: 0, lon: 0 };
  }

  const coords = xy.split(";").map(e => parseFloat(e.trim()));

  if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
    return { lat: 0, lon: 0, message: "Le format des coordonnées incorrect" };
  }

  switch (zone.toLowerCase()) {
    case "lambert0":
    case "lambert2": {
      let message = "";
      let c = proj4("lambert2", "WGS84", [coords[0], coords[1]]);

      if (!isInFrance(c[1], c[0])) {
        c = proj4("lambert2deprecated", "WGS84", [coords[0], coords[1]]);
        message = "Cette projection lambert 2 est est dépréciée";
      }
      if (!isInFrance(c[1], c[0])) {
        return { lat: 0, lon: 0, message: "La projection utilisée n'est pas correct" };
      }

      return { lat: c[1], lon: c[0], message };
    }
    case "lambert1": {
      const c = proj4("lambert1", "WGS84", [coords[0], coords[1]]);
      if (!isInFrance(c[1], c[0])) {
        return { lat: 0, lon: 0, message: "La projection utilisée n'est pas correct" };
      }
      return { lat: c[1], lon: c[0] };
    }
    case "lambert3": {
      const c = proj4("lambert3", "WGS84", [coords[0], coords[1]]);
      if (!isInFrance(c[1], c[0])) {
        return { lat: 0, lon: 0, message: "La projection utilisée n'est pas correct" };
      }
      return { lat: c[1], lon: c[0] };
    }
    case "lambert4": {
      const c = proj4("lambert4", "WGS84", [coords[0], coords[1]]);
      if (!isInFrance(c[1], c[0])) {
        return { lat: 0, lon: 0, message: "La projection utilisée n'est pas correct" };
      }
      return { lat: c[1], lon: c[0] };
    }
    case "gauss laborde": {
      const c = proj4("gauss laborde", "WGS84", [coords[0], coords[1]]);
      return { lat: c[1], lon: c[0] };
    }
    case "lambert93": {
      const c = proj4("lambert93", "WGS84", [coords[0], coords[1]]);
      if (!isInFrance(c[1], c[0])) {
        return { lat: 0, lon: 0, message: "La projection utilisée n'est pas correct" };
      }
      return { lat: c[1], lon: c[0] };
    }
    case "wgs84":{
      const c = proj4("WGS84", "WGS84", [coords[0], coords[1]]);
      if (!isInFrance(c[1], c[0])) {
        return { lat: 0, lon: 0, message: "La projection utilisée n'est pas correct" };
      }
      return { lat: c[1], lon: c[0] };
    }
    default:
      return { lat: 0, lon: 0, message: "La zone " + zone.toLowerCase() + " est incorrecte" };
  }
}

function convertCOORM(COORM, ZONE) {
  if (COORM) {
    let coords = COORM.split("/");
    const arr = [];
    for (let i = 0; i < coords.length; i++) {
      const obj = lambertToWGS84(coords[i], ZONE);
      if (obj.lat === 0) {
        return { coordinates: null, message: obj.message };
      }
      arr.push([obj.lat, obj.lon]);
    }
    return { coordinates: arr, message: "" };
  }
  return { coordinates: null, message: "" };
}

function getPolygonCentroid(pts) {
  if (!pts) {
    return null;
  }
  var first = pts[0],
    last = pts[pts.length - 1];
  if (first[0] != last[0] || first[1] != last[1]) pts.push(first);
  var twicearea = 0,
    x = 0,
    y = 0,
    nPts = pts.length,
    p1,
    p2,
    f;
  for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
    p1 = pts[i];
    p2 = pts[j];
    f = p1[0] * p2[1] - p2[0] * p1[1];
    twicearea += f;
    x += (p1[0] + p2[0]) * f;
    y += (p1[1] + p2[1]) * f;
  }
  f = twicearea * 3;
  if (f === 0) {
    return [first[0], first[1]];
  }
  return [x / f, y / f];
}

function isLatitude(lat) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}

function isLongitude(lng) {
  return isFinite(lng) && Math.abs(lng) <= 180;
}

function hasCorrectCoordinates(notice) {
  const c = notice.POP_COORDONNEES;
  return (
    c &&
    c.lat &&
    c.lon &&
    Number(c.lat) === c.lat &&
    Number(c.lon) === c.lon &&
    isLatitude(c.lat) &&
    isLongitude(c.lon)
  );
}

function hasCorrectPolygon(notice) {
  const c = notice.POP_COORDINATES_POLYGON;
  if (!c) return false;
  if (c.type !== "Polygon") return false;
  if (!Array.isArray(c.coordinates)) return false;
  if (!c.coordinates.length) return false;
  return true;
}

module.exports = {
  lambertToWGS84,
  convertCOORM,
  getPolygonCentroid,
  hasCorrectCoordinates,
  hasCorrectPolygon,
  isInFrance
};
