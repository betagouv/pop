
const proj4 = require('proj4')


//https://epsg.io/3107
proj4.defs("lambert0", "+proj=lcc +lat_1=-28 +lat_2=-36 +lat_0=-32 +lon_0=135 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
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


module.exports = function getWGS84(xy, zone, REF) {

  //  console.log('GOT1', xy, zone)

  if (!xy) {
    return null
  }

  if (!zone) {
    console.log(`${REF} has no zone (${xy})`);
    return null
  }
  const coords = xy.split(';').map((e) => parseFloat(e.trim()));

  if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
    console.log(`${REF} is not properly formated (${xy})`);
    return null
  }

  switch (zone.toLowerCase()) {
    case 'lambert0': {
      const c = proj4('lambert0', 'WGS84', [coords[0], coords[1]]);
      return [c[1], c[0]];
      // return { lat: c[0], lon: c[1] }
    }
    case 'lambert1': {
      const c = proj4('lambert1', 'WGS84', [coords[0], coords[1]]);
      return [c[1], c[0]];
      // return { lat: c[0], lon: c[1] }
    }
    case 'lambert2': {
      const c = proj4('lambert2', 'WGS84', [coords[0], coords[1]]);
      return [c[1], c[0]];
      // return { lat: c[0], lon: c[1] }
    }
    case 'lambert3': {
      const c = proj4('lambert3', 'WGS84', [coords[0], coords[1]]);
      return [c[1], c[0]];
      // return { lat: c[0], lon: c[1] }
    }
    case 'lambert4': {
      const c = proj4('lambert4', 'WGS84', [coords[0], coords[1]]);
      return [c[1], c[0]];
      // return { lat: c[0], lon: c[1] }
    }
    case 'mtu':
    case 'utm': {
      console.log(`${REF} Cant read zone utm of (${xy})`);
      return null
      // const c = proj4('mtu', 'WGS84', [coords[0], coords[1]]);
      // return [c[1], c[0]];
      // return { lat: c[0], lon: c[1] }
    }
    case 'gauss laborde': {
      const c = proj4('gauss laborde', 'WGS84', [coords[0], coords[1]]);
      return [c[1], c[0]];
      // return { lat: c[0], lon: c[1] }
    }
    case 'lambert93': {
      const c = proj4('lambert93', 'WGS84', [coords[0], coords[1]]);
      return [c[1], c[0]];
      // return { lat: c[0], lon: c[1] }
    }
    default:
      console.log(`${REF} Cant find zone ${zone} of (${xy}) `);
      return null
  }
}


