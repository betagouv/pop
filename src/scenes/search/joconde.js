import React from "react";
import { Row, Col, Button, ButtonGroup, Container } from "reactstrap";
import { Link } from "react-router-dom";
import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SelectedFilters,
  ReactiveComponent
} from "@appbaseio/reactivesearch";
import { MultiList } from "pop-shared";
import ExportComponent from "./components/export";
import QueryBuilder from "./components/queryBuilder";
import { es_url, bucket_url } from "../../config.js";
import Joconde from "../../entities/Joconde";

const FILTER = [
  "mainSearch",
  "domn",
  "deno",
  "periode",
  "image",
  "tech",
  "loca",
  "autr"
];

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      normalMode: true,
      sortOrder: "asc",
      sortKey: "REF"
    };
  }

  render() {
    return (
      <Container className="search">
        <div className="header">
          <div className="title">Rechercher une Notice</div>
          <div className="buttons">
            <ButtonGroup>
              <Button
                color="primary"
                onClick={() =>
                  this.setState({ normalMode: !this.state.normalMode })
                }
                active={this.state.normalMode}
              >
                Recherche simple
              </Button>
              <Button
                color="primary"
                onClick={() =>
                  this.setState({ normalMode: !this.state.normalMode })
                }
                active={!this.state.normalMode}
              >
                Recherche experte
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <ReactiveBase url={`${es_url}/joconde`} app="joconde">
          {this.state.normalMode ? this.renderNormal() : this.renderAdvanced()}
        </ReactiveBase>
      </Container>
    );
  }

  renderAdvanced() {
    return (
      <div>
        <Row>
          <Col md={9}>
            <QueryBuilder entity={Joconde} componentId="advancedSearch" />
          </Col>
          <Col md={3}>
            <ExportComponent FILTER={["advancedSearch"]} collection="joconde" />
          </Col>
        </Row>
        <div className="text-center my-3">
          Trier par :
          <select
            className="ml-2"
            onChange={e => this.setState({ sortKey: e.target.value })}
          >
            {new Joconde({})._fields
              .filter(e => !["TICO", "TITR"].includes(e))
              .map(e => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
          </select>
          <select
            className="ml-2"
            onChange={e => this.setState({ sortOrder: e.target.value })}
          >
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>
        </div>
        <ReactiveList
          componentId="results"
          react={{ and: ["advancedSearch"] }}
          onResultStats={(total, took) => {
            if (total === 1) {
              return `1 résultat`;
            }
            return `${total} résultats`;
          }}
          onNoResults="Aucun résultat trouvé."
          loader="Préparation de l'affichage des résultats..."
          dataField={`${this.state.sortKey}.keyword`}
          sortBy={this.state.sortOrder}
          URLParams={true}
          size={20}
          onData={data => <Card key={data.REF} data={data} />}
          pagination={true}
        />
      </div>
    );
  }

  renderNormal() {
    return (
      <div>
        <div className="search-and-export-zone">
          <DataSearch
            componentId="mainSearch"
            dataField={["TICO", "INV", "DENO", "REF", "LOCA"]}
            queryFormat="and"
            iconPosition="left"
            className="mainSearch"
            placeholder="Saisissez un titre, une dénomination, une reference ou une localisation"
            URLParams={true}
          />

          <ReactiveComponent
            componentId="export"
            react={{
              and: FILTER
            }}
            defaultQuery={() => ({
              size: 100,
              aggs: {}
            })}
          >
            <ExportComponent FILTER={FILTER} collection="joconde" />
          </ReactiveComponent>
        </div>
        <Row>
          <Col xs="3">
            <MultiList
              componentId="domn"
              dataField="DOMN.keyword"
              title="Domaine"
              className="filters"
              displayCount
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
            <MultiList
              componentId="aptn"
              dataField="APTN.keyword"
              title="Ancien propriétaire"
              className="filters"
              displayCount
              sortByName={true}
              URLParams={true}
              react={{
                and: FILTER
              }}
            />

            <MultiList
              componentId="deno"
              dataField="DENO.keyword"
              title="Dénomination"
              className="filters"
              displayCount
              URLParams={true}
              react={{
                and: FILTER
              }}
            />

            <MultiList
              componentId="periode"
              dataField="PERI.keyword"
              title="Période"
              className="filters"
              displayCount
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
            <MultiList
              componentId="image"
              dataField="CONTIENT_IMAGE.keyword"
              title="Contient une image"
              className="filters"
              displayCount
              URLParams={true}
              react={{
                and: FILTER
              }}
            />

            <MultiList
              componentId="tech"
              dataField="TECH.keyword"
              title="Techniques"
              className="filters"
              displayCount
              URLParams={true}
              react={{
                and: FILTER
              }}
            />

            <MultiList
              componentId="loca"
              dataField="LOCA.keyword"
              title="Localisation"
              className="filters"
              displayCount
              URLParams={true}
              react={{
                and: FILTER
              }}
            />

            <MultiList
              componentId="autr"
              dataField="AUTR.keyword"
              title="Auteurs"
              className="filters"
              displayCount
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
          </Col>
          <Col xs="9">
            <SelectedFilters clearAllLabel="Tout supprimer" />
            <ReactiveList
              componentId="results"
              react={{
                and: FILTER
              }}
              onResultStats={(total, took) => {
                if (total === 1) {
                  return `1 résultat`;
                }
                return `${total} résultats`;
              }}
              onNoResults="Aucun résultat trouvé."
              loader="Préparation de l'affichage des résultats..."
              dataField=""
              URLParams={true}
              size={20}
              onData={data => <Card key={data.REF} data={data} />}
              pagination={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const Card = ({ data }) => {
  const image = data.IMG.length
    ? `${bucket_url}${data.IMG[0]}`
    : require("../../assets/noimage.jpg");
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/notice/joconde/${data.REF}`}
      className="card"
      key={data.REF}
    >
      <img src={image} alt="Lien cassé" />
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>{data.TITR}</h2>
          <span>{data.REF}</span>
        </div>
        <div>
          <p>{data.DOMN.join(", ")}</p>
          <p>{data.DENO.join(", ")}</p>
          <p>{data.AUTR}</p>
          <p>{data.PERI.join(", ")}</p>
          <p>{data.LOCA}</p>
          <p>{data.INV}</p>
        </div>
      </div>
    </Link>
  );
};
