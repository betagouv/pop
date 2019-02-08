import React from "react";
import { Row, Col, Container } from "reactstrap";
import { ReactiveBase, ReactiveList } from "@appbaseio/reactivesearch";
import ExportComponent from "../components/export";
import { QueryBuilder } from "../../../../../shared/dist/index";
import { es_url } from "../../../config.js";
import Header from "../components/Header";
import Mapping from "../../../services/Mapping";
import { history } from "../../../redux/store";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOrder: "asc",
      sortKey: "REF"
    };
  }

  render() {
    const { baseName, onData } = this.props;
    return (
      <Container className="search">
        <Header base={baseName} normalMode={false} />
        <ReactiveBase url={`${es_url}/${baseName}`} app={baseName}>
          <div>
            <Row>
              <Col md={12}>
                <QueryBuilder
                  collection={baseName}
                  componentId="advancedSearch"
                  history={history}
                  displayLabel={this.props.displayLabel || false}
                  autocomplete={this.props.autocomplete || false}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <ExportComponent FILTER={["advancedSearch"]} collection={baseName} autocomplete />
              </Col>
            </Row>
            <div className="text-center my-3">
              Trier par :
              <select className="ml-2" onChange={e => this.setState({ sortKey: e.target.value })}>
                {Object.keys(Mapping[baseName])
                  .filter(e => !["TICO", "TITR"].includes(e))
                  .map(e => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
              </select>
              <select className="ml-2" onChange={e => this.setState({ sortOrder: e.target.value })}>
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
              onData={onData}
              pagination={true}
            />
          </div>
        </ReactiveBase>
      </Container>
    );
  }
}
