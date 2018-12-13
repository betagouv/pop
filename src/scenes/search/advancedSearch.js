import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";

export default ({}) => {
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
};
