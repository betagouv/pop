import React from "react";
import { Results } from "react-elasticsearch-pop";
import { pagination } from "../utils";
import CardMosaique from "./CardMosaic";

export default function({ initialValues }) {
  return (
    <div className="mosaic-view">
      <Results
        initialPage={initialValues.get("mosaicPage")}
        id="mosaic"
        items={(data, listRefs, idQuery) =>
          data.map(({ _id, ...rest }) => (
            <CardMosaique key={_id} index={rest._index} searchParams={initialValues} data={rest._source} listRefs={listRefs} idQuery={idQuery} />
          ))
        }
        itemsPerPage={25}
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
      <style jsx global>{`
        .mosaic-view > div {
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          margin-right: -15px;
          margin-left: -15px;
        }
        .mosaic-view > .react-es-results {
          padding-top: 25px;
        }
        .mosaic-view .result-count {
          margin-left: 15px;
          padding-bottom: 5px;
          width: 100%;
        }
        .mosaic-view .react-es-pagination {
          width: 100%;
          margin-left: 15px;
        }
      `}</style>
    </div>
  );
}
