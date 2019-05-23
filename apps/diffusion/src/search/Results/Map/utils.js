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
    14: 8,
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
    obj.hits = arr[i].top_hits.hits.hits;
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
        item.points[0].meta().hits[0]._source.POP_COORDONNEES.lon,
        item.points[0].meta().hits[0]._source.POP_COORDONNEES.lat
      ];
    }

    let feature = {
      type: "Feature",
      id: item.points[0].meta().key,
      properties: {
        id: item.points[0].meta().key
      },
      geometry: {
        type: "Point",
        coordinates: coordinates
      }
    };

    feature.properties.count = item.points.reduce((acc, re) => acc + re.meta().count, 0);
    feature.properties.hits = item.points.reduce((acc, re) => acc.concat(re.meta().hits), []);

    geoJsonFormated.features.push(feature);
  }

  return geoJsonFormated;
}
