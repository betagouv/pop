import React from "react";
import { Results } from "react-elasticsearch";
import { pagination } from "../utils";
import CardMosaique from "./CardMosaic";

export default function({ initialValues }) {
  return (
    <Results
    initialPage={initialValues.get("resPage")}
      id="mosaic"
      items={data =>
        data.map(({ _id, ...rest }) => (
          <CardMosaique key={_id} index={rest._index} data={rest._source} />
        ))
      }
      pagination={pagination}
      stats={total => {
        const info = "La mosaïque n'affiche par défaut que les notices avec image.";
        return (
          <div className="result-count">
            {total} résultat{total === 1 ? "" : "s"} <i className="text-muted">{info}</i>
          </div>
        );
      }}
    />
  );
}
