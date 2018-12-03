const fs = require("fs");
const AWS = require("aws-sdk");
const { s3Bucket } = require("./../config.js");
const { capture } = require("./../sentry.js");

const proj4 = require('proj4')


//https://epsg.io/27572
proj4.defs("lambert0", "+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs");
//https://epsg.io/27571
proj4.defs("lambert1", "+proj=lcc +lat_1=49.50000000000001 +lat_0=49.50000000000001 +lon_0=0 +k_0=0.999877341 +x_0=600000 +y_0=1200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs");
//https://epsg.io/27572#
proj4.defs("lambert2", "+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs");
//https://epsg.io/27573#
proj4.defs("lambert3", "+proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.999877499 +x_0=600000 +y_0=3200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs");
//https://epsg.io/27574#
proj4.defs("lambert4", "+proj=lcc +lat_1=42.16500000000001 +lat_0=42.16500000000001 +lon_0=0 +k_0=0.99994471 +x_0=234.358 +y_0=4185861.369 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs");
//https://epsg.io/2154
proj4.defs("lambert93", "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
//https://epsg.io/2990
proj4.defs("gauss laborde", "+proj=tmerc +lat_0=-21.11666666666667 +lon_0=55.53333333333333 +k=1 +x_0=50000 +y_0=160000 +ellps=intl +towgs84=94,-948,-1262,0,0,0,0 +units=m +no_defs");
//https://epsg.io/32630
proj4.defs("mtu", "+proj=utm +zone=30 +datum=WGS84 +units=m +no_defs");

function lambertToWGS84(xy, zone) {
  if (!xy) {
    return { lat: 0, lon: 0 };
  }
  if (!zone) {
    return { lat: 0, lon: 0 };
  }

  const coords = xy.split(";").map(e => parseFloat(e.trim()));

  if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
    console.log("GEOLOC", REF, "GEOLOC is not properly formated", xy);
    return { lat: 0, lon: 0 };
  }

  switch (zone.toLowerCase()) {
    case "lambert0": {
      const c = proj4("lambert0", "WGS84", [coords[0], coords[1]]);
      return { lat: c[1], lon: c[0] };
    }
    case "lambert1": {
      const c = proj4("lambert1", "WGS84", [coords[0], coords[1]]);
      return { lat: c[1], lon: c[0] };
    }
    case "lambert2": {
      const c = proj4("lambert2", "WGS84", [coords[0], coords[1]]);
      return { lat: c[1], lon: c[0] };
    }
    case "lambert3": {
      const c = proj4("lambert3", "WGS84", [coords[0], coords[1]]);
      return { lat: c[1], lon: c[0] };
    }
    case "lambert4": {
      const c = proj4("lambert4", "WGS84", [coords[0], coords[1]]);
      return { lat: c[1], lon: c[0] };
    }
    case "gauss laborde": {
      const c = proj4("gauss laborde", "WGS84", [coords[0], coords[1]]);
      return { lat: c[1], lon: c[0] };
    }
    case "lambert93": {
      const c = proj4("lambert93", "WGS84", [coords[0], coords[1]]);
      return { lat: c[1], lon: c[0] };
    }
    default:
      console.log("GEOLOC", REF, `Cant find zone ${zone} `, xy);
      return { lat: 0, lon: 0 };
  }
}

// Surement pas besoin de l'écrire sur le disque ...
function uploadFile(path, file) {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(file.path);
    const params = {
      Bucket: s3Bucket,
      Key: path,
      Body: data,
      ContentType: file.mimetype,
      ACL: "public-read"
    };

    s3.putObject(params, err => {
      fs.unlinkSync(file.path);
      if (err) {
        console.log(err);
        reject(new Error());
      } else {
        resolve();
      }
    });
  });
}

function deleteFile(path) {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    s3.deleteObject(
      {
        Bucket: s3Bucket,
        Key: path
      },
      err => {
        if (err) {
          console.log(err);
          reject(new Error());
        } else {
          resolve();
        }
      }
    );
  });
}

function getNewId(object, prefix, dpt) {
  return new Promise((resolve, reject) => {
    var q = object
      .findOne({
        REF: { $regex: new RegExp("^" + prefix + dpt) }
      })
      .sort({
        REF: -1
      });
    q.exec((error, doc) => {
      if (error) {
        reject(error);
      }
      if (doc) {
        const ref = doc.REF.substring((prefix + dpt).length);
        const newId = addZeros(parseInt(ref) + 1, ref.length);
        resolve(prefix + dpt + newId);
      } else {
        const ln = 10 - (prefix + dpt).length;
        const newId = addZeros(1, ln);
        resolve(prefix + dpt + newId);
      }
    });
  });
}

function checkESIndex(doc) {
  doc.on("es-indexed", (err, res) => {
    if (err) capture(err);
  });
}

function updateNotice(collection, REF, notice) {
  return new Promise((resolve, reject) => {
    collection.findOneAndUpdate(
      { REF },
      notice,
      {
        upsert: true,
        new: true
      },
      (err, doc) => {
        if (err) {
          reject();
          return;
        }
        checkESIndex(doc);
        resolve(doc);
      }
    );
  });
}

function addZeros(v, zeros) {
  return new Array(zeros)
    .concat([v])
    .join("0")
    .slice(-zeros);
}

function formattedNow() {
  const now = new Date();
  return (formattedNow =
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2));
}

function enrichBeforeSave(notice) {
  notice.CONTIENT_IMAGE =
    notice.MEMOIRE && notice.MEMOIRE.length ? "oui" : "non";
  if (notice.COOR && notice.ZONE) {
    notice.POP_COORDONNEES = lambertToWGS84(notice.COOR, notice.ZONE);
  }
  notice.POP_CONTIENT_GEOLOCALISATION =
    notice.POP_COORDONNEES &&
    notice.POP_COORDONNEES.lat &&
    notice.POP_COORDONNEES.lat !== 0
      ? "oui"
      : "non";
}


module.exports = {
  uploadFile,
  deleteFile,
  formattedNow,
  getNewId,
  checkESIndex,
  updateNotice,
  enrichBeforeSave
};
