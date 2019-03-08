import nGeoHash from "ngeohash";

export function getPrecision(zoom) {
  let correctedZoom = Math.round(zoom);

  if (correctedZoom < 2) {
    correctedZoom = 2;
  } else if (correctedZoom > 15) {
    correctedZoom = 15;
  }

  const obj = {
    2: 2,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
    9: 5,
    10: 5,
    11: 6,
    12: 6,
    13: 7,
    14: 7,
    15: 8
  };

  return obj[correctedZoom];
}

export function toGeoJson(arr) {
  //const before = window.performance.now();
  const geoJsonFormated = {
    type: "FeatureCollection",
    info: { type: "name", properties: { name: "POP" } },
    features: []
  };

  var clusterMaker = require("./clusters");
  clusterMaker.k(20);
  clusterMaker.iterations(3);
  const data = [];
  for (let i = 0; i < arr.length; i++) {
    const obj = {};
    const ncoordinates = nGeoHash.decode(arr[i].key);
    obj.coordinates = [ncoordinates.latitude, ncoordinates.longitude];
    obj.count = arr[i].doc_count;
    obj.hits = arr[i].top_hits.hits.hits[0];
    obj.key = arr[i].key;
    data.push(obj);
  }

  if (!data.length) {
    return geoJsonFormated;
  }
  clusterMaker.data(data);
  const clusters = clusterMaker.clusters();
  for (var i = 0; i < clusters.length; i++) {
    const item = clusters[i];

    if (!item.points.length) {
      continue;
    }

    let coordinates = [item.centroid[1], item.centroid[0]];
    if (item.points.length == 1 && item.points[0].meta().count == 1) {
      coordinates = [
        item.points[0].meta().hits._source.POP_COORDONNEES.lon,
        item.points[0].meta().hits._source.POP_COORDONNEES.lat
      ];
    }

    let feature = {
      type: "Feature",
      id: item.points[0].meta().hits._source.REF,
      properties: {
        id: item.points[0].meta().hits._source.REF,
        hits: [item.points[0].meta().hits]
      },
      geometry: {
        type: "Point",
        coordinates: coordinates
      }
    };

    feature.properties.count = item.points.reduce((acc, re) => acc + re.meta().count, 0);

    geoJsonFormated.features.push(feature);
  }

  return geoJsonFormated;
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
