import React, { useEffect, useState } from "react";
import { CustomWidget, msearch } from "react-elasticsearch";
import Map from "./Map";
import { es_url } from "../../../config";

function esQuery(
  queries,
  top_left_lat = "51.176170858351554",
  top_left_lon = "-8.899197921908097",
  bottom_right_lat = "42.15965270115598",
  bottom_right_lon = "13.93039192184051",
  precision = 3
) {
  return {
    size: 1,
    query: {
      bool: {
        must: [...queries, { match: { POP_CONTIENT_GEOLOCALISATION: "oui" } }],
        filter: {
          geo_bounding_box: {
            POP_COORDONNEES: {
              top_left: { lat: top_left_lat, lon: top_left_lon },
              bottom_right: { lat: bottom_right_lat, lon: bottom_right_lon }
            }
          }
        }
      }
    },
    aggs: {
      france: {
        geohash_grid: { field: "POP_COORDONNEES", precision },
        aggs: { top_hits: { top_hits: { size: `${precision === 8 ? 100 : 1}` } } }
      }
    }
  };
}

function MyComponent({ ctx }) {
  const actualQuery = esQuery(
    [...ctx.widgets].filter(([_k, v]) => v.query).map(([_k, v]) => v.query)
  );
  const [query, setQuery] = useState(actualQuery);
  const [aggregations, setAggregations] = useState(null);
  useEffect(() => {
    setQuery(actualQuery);
  }, [JSON.stringify(actualQuery)]);
  useEffect(() => {
    async function fetchData() {
      const res = await msearch(`${es_url}merimee,palissy,memoire,joconde,mnr,enluminures`, [
        { id: "map", query }
      ]);
      setAggregations(res.responses[0].aggregations);
    }
    fetchData();
  }, [JSON.stringify(query)]);
  function onChange(top_left_lat, top_left_lon, bottom_right_lat, bottom_right_lon, precision) {
    setQuery(
      esQuery(
        [...ctx.widgets].filter(([_k, v]) => v.query).map(([_k, v]) => v.query),
        top_left_lat,
        top_left_lon,
        bottom_right_lat,
        bottom_right_lon,
        precision
      )
    );
  }
  return (
    <>
      <Map onChange={onChange} aggregations={aggregations} />
    </>
  );
}

export default function ReactiveMapWrapper() {
  return (
    <CustomWidget>
      <MyComponent />
    </CustomWidget>
  );
}
