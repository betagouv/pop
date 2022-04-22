import React, { useState, useEffect } from "react";
import {
  Elasticsearch,
  SearchBox,
  Results,
  toUrlQueryString,
  fromUrlQueryString,
  ActiveFilters
} from "react-elasticsearch-pop";
import { Row, Col } from "reactstrap";
import CollapsableFacet from "../search/components/CollapsableFacet";
import utils from "./utils.js";
import "./list.css";
import { es_url, bucket_url, pop_url } from "../../config.js";

export default function List() {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  const sortKey = "importedAt";
  const [sortOrder, setSortOrder] = useState(initialValues.get("sortOrder") || "desc");
  const [sortQuery, setSortQuery] = useState([{ [sortKey]: { order: sortOrder } }]);

  useEffect(() => {
    setSortQuery([{ [sortKey]: { order: sortOrder } }]);
  }, [sortKey, sortOrder]);
  return (
    <div className="list-import">
      <Elasticsearch
        url={`${es_url}/import`}
        onChange={params => {
          const q = toUrlQueryString(params);
          if (q) {
            window.history.replaceState("x", "y", `?${q}`);
          }
        }}
      >
        <Row>
          <Col md="3">
            <SearchBox
              id="main"
              placeholder="Saisissez une notice, une adresse email ou une institution"
              initialValue={initialValues.get("main")}
              fields={["institution", "email", "notices"]}
            />
            <ActiveFilters id="af" />
            <CollapsableFacet
              id="institution"
              initialValue={initialValues.get("institution")}
              fields={["institution.keyword"]}
              title="Institutions"
            />
            <CollapsableFacet
              id="email"
              initialValue={initialValues.get("email")}
              fields={["email.keyword"]}
              title="Email"
            />
            <CollapsableFacet
              id="notices"
              initialValue={initialValues.get("notices")}
              fields={["notices.keyword"]}
              title="Notices"
            />
          </Col>
          <Col md="9">
            <Results
              sort={sortQuery}
              initialPage={initialValues.get("resPage")}
              id="res"
              itemsPerPage={20}
              items={data =>
                data.map(({ _source, _id }) => <Card key={_id} id={_id} data={_source} />)
              }
              stats={total => (
                <div>
                  {total} résultat{total === 1 ? "" : "s"}
                  <select
                    className="ml-2"
                    onChange={e => setSortOrder(e.target.value)}
                    value={sortOrder}
                  >
                    <option value="desc">Les plus récents en premier</option>
                    <option value="asc">Les plus anciens en premier</option>
                  </select>
                </div>
              )}
            />
          </Col>
        </Row>
      </Elasticsearch>
    </div>
  );
}

const Card = ({ data, id }) => {
  const preview_url = `${pop_url}/search/list?import=["${id}"]`;

  const details_url = `${bucket_url}import/${id}/import.csv`;

  return (
    <div className="import-card col-6">
      <div className="card">
        <Row>
          <Col md="8" className="content">
            <div className="title">{`Import le ${utils.formatDate(
              new Date(data.importedAt)
            )} par ${data.email || "inconnu"} (${data.institution})`}</div>
            <div className="title">
              {`Vous pouvez consultez le résultat de l'import ici : `}
              <a href={preview_url} target="_blank" rel="noopener">
                Voir en diffusion
              </a>
            </div>
            <div className="title">
              {`Vous pouvez consultez le détail de l'import ici : `}
              <a href={details_url} target="_blank" rel="noopener">
                Fichier de détail
              </a>
            </div>
          </Col>
          <Col md="4">
            <div>{`Notices créées : ${data.created}`}</div>
            <div>{`Notices mises à jour : ${data.updated}`}</div>
            <div>{`Notices rejetées à l'import : ${data.rejected}`}</div>
            <div>{`Notices inchangées à import : ${data.unChanged}`}</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
