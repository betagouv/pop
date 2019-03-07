import nGeoHash from "ngeohash";

export function getPrecision(zoom) {
  let correctedZoom = Math.round(zoom);

  if (correctedZoom < 2) {
    correctedZoom = 2;
  } else if (correctedZoom > 15) {
    correctedZoom = 15;
  }

  const obj = {
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
    9: 4,
    10: 5,
    11: 6,
    12: 6,
    13: 7,
    14: 7,
    15: 8
  };

  console.log("ZOOM MAP", correctedZoom, "ZOOM ES", obj[correctedZoom]);
  return obj[correctedZoom];
}

const idCounter = {};
const uniqueId = (prefix = "$lodash$") => {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  const id = ++idCounter[prefix];
  if (prefix === "$lodash$") {
    return `${id}`;
  }

  return `${prefix + id}`;
};

const mapGeoHashToUniqId = {};
function getGeoHashUniqId(geoHash) {
  // NOT NICE AT ALL, TODO CHECK THE PERF HERE
  if (!mapGeoHashToUniqId.hasOwnProperty(geoHash)) {
    mapGeoHashToUniqId[geoHash] = uniqueId();
  }
  return mapGeoHashToUniqId[geoHash];
}

/*
GeoHash length
Area width x height
1-5,009.4km x 4,992.6km
2-1,252.3km x 624.1km
3-156.5km x 156km
4-39.1km x 19.5km
5-4.9km x 4.9km
6-1.2km x 609.4m
7-152.9m x 152.4m
8-38.2m x 19m
9-4.8m x 4.8m
10-1.2m x 59.5cm
11-14.9cm x 14.9cm
12- 3.7cm x 1.9cm
*/

export function toGeoJson(arr) {
  //const before = window.performance.now();
  const geoJsonFormated = {
    type: "FeatureCollection",
    info: { type: "name", properties: { name: "POP" } },
    features: []
  };

  optimize(arr);
  for (var i = 0; i < arr.length; i++) {
    const item = arr[i];

    const ncoordinates = nGeoHash.decode(item.key);

    let feature = {
      type: "Feature",
      id: getGeoHashUniqId(item.key),
      properties: {
        id: item.key,
        hits: item.top_hits.hits.hits
      },
      geometry: {
        type: "Point",
        coordinates: [ncoordinates.longitude, ncoordinates.latitude]
      }
    };
    if (item.doc_count > 1) {
      feature.properties.count = item.doc_count;
    } else {
      feature.geometry.coordinates = [
        feature.properties.hits[0]._source.POP_COORDONNEES.lon,
        feature.properties.hits[0]._source.POP_COORDONNEES.lat
      ];
    }
    geoJsonFormated.features.push(feature);
  }

  return geoJsonFormated;
}

function optimize(arr) {
  console.log(arr);
  const new
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].key, nGeoHash.neighbors(arr[i].key));
  }
}

export function getESQuery(
  top_left_lat,
  top_left_lon,
  bottom_right_lat,
  bottom_right_lon,
  precision
) {
  const query = `{
    "size": 1,
    "query": {
      "bool": {
        "must": {
            "match": {"POP_CONTIENT_GEOLOCALISATION":"oui"}
        },
        "filter": {
          "geo_bounding_box": {
            "POP_COORDONNEES": {
              "top_left": {
                "lat": "${top_left_lat}",
                "lon": "${top_left_lon}"
              },
              "bottom_right": {
                "lat": "${bottom_right_lat}",
                "lon": "${bottom_right_lon}"
              }
            }
          }
        }
      }
    },
    "aggs": {
      "france": {
        "geohash_grid": {
          "field": "POP_COORDONNEES",
          "precision": ${precision}
        },
        "aggs": {
          "top_hits": {
            "top_hits": {
              "size": ${precision === 8 ? 100 : 1}
            }
          }
        }
      }
    }
  }`;
  return JSON.parse(query);
}
