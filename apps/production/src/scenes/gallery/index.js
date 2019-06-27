import React, { useState, useEffect } from "react";
import {
  Elasticsearch,
  SearchBox,
  Results,
  toUrlQueryString,
  fromUrlQueryString,
  ActiveFilters
} from "react-elasticsearch";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import CollapsableFacet from "../search/components/CollapsableFacet";
import { es_url, bucket_url } from "../../config.js";
import "./index.css";

function Gallery({ role, group }) {
  const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
  const sortKey = "createdAt";
  const [sortOrder, setSortOrder] = useState(initialValues.get("sortOrder") || "desc");
  const [sortQuery, setSortQuery] = useState([{ [sortKey]: { order: sortOrder } }]);

  useEffect(() => {
    setSortQuery([{ [sortKey]: { order: sortOrder } }]);
  }, [sortKey, sortOrder]);
  // Only admin can view galleries.
  if (!(role === "administrateur" && group === "admin")) {
    return <Redirect to="/recherche" />;
  }
  return (
    <div className="list-gallery">
      <Elasticsearch
        url={`${es_url}/gallery`}
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
              placeholder="Saisissez un nom ou un email"
              initialValue={initialValues.get("main")}
              fields={["name", "email", "notices"]}
            />
            <ActiveFilters id="af" />
            <CollapsableFacet
              id="institution"
              initialValue={initialValues.get("institution")}
              fields={["institution.keyword"]}
              title="Institutions"
            />
            <CollapsableFacet
              id="createdBy"
              initialValue={initialValues.get("createdBy")}
              fields={["createdBy.keyword"]}
              title="Créé par"
            />
          </Col>
          <Col md="9">
            <Results
              sort={sortQuery}
              initialPage={initialValues.get("resPage")}
              id="res"
              itemsPerPage={20}
              items={data => data.map(({ _source, _id }) => <Card key={_id} data={_source} />)}
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

const Card = ({ data }) => {
  return (
    <div className="gallery-card col-6">
      <div className="card">
        <img src={`${bucket_url}${data.image}`} />
        <div className="container" style={{ maxWidth: "475px" }}>
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <div>{data.createdBy}</div>
          <div className="institution">{data.institution}</div>
          <div>
            <a target="_blank" rel="noopener" href={`https://www.pop.culture.gouv.fr/gallery/${data._id}`}>
              {`https://www.pop.culture.gouv.fr/gallery/${data._id}`}
            </a>
          </div>
          <div>{`Créé par ${data.createdBy} le ${new Date(data.createdAt).toLocaleString()}`}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ Auth }) => {
  const { role, group } = Auth.user;
  return { role, group };
};

export default connect(
  mapStateToProps,
  {}
)(Gallery);
