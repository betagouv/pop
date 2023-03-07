import React from "react";
import { Results } from "@popproject/pop-react-elasticsearch";
import { pagination } from "../utils";

import CardList from "./CardList";

export default ({ initialValues, setNbreResult }) => (
  <div className="list-view">
    <Results
      itemsPerPage={25}
      initialPage={initialValues.get("resPage")}
      id="res"
      items={(data, listRefs, idQuery) => data.map(({ _id, ...rest }) => <CardList key={_id} data={rest} searchParams={initialValues} listRefs={listRefs} idQuery={idQuery}/>)}
      pagination={pagination}
      stats={total => {
          setNbreResult(total);
          return (
            <div>
              {total} résultat{total === 1 ? "" : "s"}
            </div>
          )
        }
      }
    />
    <style jsx global>{`
      .list-view {
        width: 100%;
      }
    `}</style>
  </div>
);
