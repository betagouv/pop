import React from "react";
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
import utils from "../search/components/utils";
import CollapsableFacet from "../search/components/CollapsableFacet";
import "./index.css";

import { es_url, bucket_url } from "../../config.js";

// TODO: fix
class Gallery extends React.Component {
  render() {
    // Only admin can view galleries.
    if (!(this.props.role === "administrateur" && this.props.group === "admin")) {
      return <Redirect to="/recherche" />;
    }
    const initialValues = fromUrlQueryString(window.location.search.replace(/^\?/, ""));
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
          <div>
            <SearchBox
              id="main"
              placeholder="Saisissez un nom ou un email"
              initialValue={initialValues.get("main")}
              customQuery={value => utils.customQuery(value, ["name", "createdBy"])}
            />
          </div>
          <Row>
            <Col xs="3">
              <CollapsableFacet
                initialCollapsed={false}
                id="institution"
                initialValue={initialValues.get("institution")}
                fields={["institution.keyword"]}
                title="Institutions"
              />
              <CollapsableFacet
                initialCollapsed={false}
                id="email"
                initialValue={initialValues.get("email")}
                fields={["createdBy.keyword"]}
                title="Créé par"
              />
            </Col>
            <Col xs="9">
              <ActiveFilters id="af" />
              <Results
                initialPage={initialValues.get("resPage")}
                id="res"
                item={(source, _score, id) => <Card key={id} data={source} />}
                pagination={utils.pagination}
              />
            </Col>
          </Row>
        </Elasticsearch>
      </div>
    );
  }
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
            <a target="_blank" href={`https://www.pop.culture.gouv.fr/gallery/${data._id}`}>
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
