import React from "react";
import { Results } from "react-elasticsearch";
import { pagination } from "../utils";

import CardList from "./CardList";

export default ({ initialValues }) => (
  <div className="list-view">
    <Results
      itemsPerPage={25}
      initialPage={initialValues.get("resPage")}
      id="res"
      items={data => data.map(({ _id, ...rest }) => <CardList key={_id} data={rest} />)}
      pagination={pagination}
      stats={total => (
        <div>
          {total} résultat{total === 1 ? "" : "s"}
        </div>
      )}
    />
    <style jsx global>{`
      .list-view {
        padding-top: 25px;
        width: 100%;
      }
    `}</style>
  </div>
);
