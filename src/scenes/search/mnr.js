import React from "react";
import { Row, Col, Container, ButtonGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";

import {
  ReactiveBase,
  DataSearch,
  ReactiveList,
  SelectedFilters,
  ReactiveComponent
} from "@appbaseio/reactivesearch";

import QueryBuilder from "./components/queryBuilder";
import { MultiList } from "pop-shared";

import ExportComponent from "./components/export";

import Mnr from "../../entities/mnr";

import { es_url, bucket_url } from "../../config.js";

const FILTER = [
  "mainSearch",
  "prov",
  "cate",
  "tech",
  "contientimage",
  "dmaj",
  "affe",
  "loca",
  "peri",
  "autr",
  "domn"
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

  renderAdvanced() {
    return (
      <div>
        <Row>
          <Col md={9}>
            <QueryBuilder entity={Mnr} componentId="advancedSearch" />
          </Col>
          <Col md={3}>
            <ExportComponent FILTER={["advancedSearch"]} collection="mnr" />
          </Col>
        </Row>
        <div className="text-center my-3">
          Trier par :
          <select
            className="ml-2"
            onChange={e => this.setState({ sortKey: e.target.value })}
          >
            {new Mnr({})._fields
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
          react={{ and: "advancedSearch" }}
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
            dataField={["REF", "INV", "AUTR", "ATTR", "TITR", "AFFE", "LOCA"]}
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
            <ExportComponent FILTER={FILTER} collection="mnr" />
          </ReactiveComponent>
        </div>
        <Row>
          <Col xs="3">
            <MultiList
              componentId="domn"
              dataField="DOMN.keyword"
              title="Domaine"
              displayCount
              className="filters"
              showSearch={true}
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
            <MultiList
              componentId="cate"
              dataField="CATE.keyword"
              title="Catégorie"
              displayCount
              className="filters"
              showSearch={true}
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
            <MultiList
              componentId="prov"
              dataField="PROV.keyword"
              title="Provenance"
              className="filters"
              displayCount
              showSearch={true}
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
            <MultiList
              componentId="autr"
              dataField="AUTR.keyword"
              title="Auteur"
              className="filters"
              displayCount
              showSearch={true}
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
            <MultiList
              componentId="peri"
              dataField="PERI.keyword"
              title="Période"
              className="filters"
              displayCount
              showSearch={true}
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
            <MultiList
              componentId="tech"
              dataField="TECH.keyword"
              title="Technique"
              className="filters"
              displayCount
              showSearch={true}
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
              showSearch={true}
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
            <MultiList
              componentId="affe"
              dataField="AFFE.keyword"
              title="Etablissement affectataire"
              className="filters"
              displayCount
              showSearch={true}
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
            <MultiList
              componentId="dmaj"
              dataField="DMAJ.keyword"
              title="Date de mise à jour"
              className="filters"
              displayCount
              showSearch={true}
              URLParams={true}
              react={{
                and: FILTER
              }}
            />
            <MultiList
              componentId="contientimage"
              dataField="CONTIENT_IMAGE.keyword"
              title="Contient une image"
              className="filters"
              displayCount
              showSearch={true}
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
        <ReactiveBase url={`${es_url}/mnr`} app="mnr">
          {this.state.normalMode ? this.renderNormal() : this.renderAdvanced()}
        </ReactiveBase>
      </Container>
    );
  }
}

const Card = ({ data }) => {
  const image = data.VIDEO.length
    ? `${bucket_url}${data.VIDEO[0]}`
    : require("../../assets/noimage.jpg");
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/notice/mnr/${data.REF}`}
      className="card"
      key={data.REF}
    >
      <img src={image} alt="Lien cassé" />
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>{data.TITR}</h2>
          <span>{data.INV}</span>
        </div>
        <div>
          <p>{data.DOMN}</p>
          <p>{data.DENO}</p>
          <p>{data.LOCA}</p>
          <p>{data.AUTR}</p>
        </div>
      </div>
    </Link>
  );
};
