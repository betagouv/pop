import React from "react";
import Link from "next/link";
import { Row, Col, Container } from "reactstrap";
import TextSearch from "./Search";
import AdvancedSearch from "./SearchAdvanced";

class Search extends React.Component {
  renderSearch() {
    if (this.props.mode !== "advanced") {
      return <TextSearch />;
    } else {
      return <AdvancedSearch base={this.props.base} />;
    }
  }

  renderLink() {
    if (this.props.mode !== "advanced") {
      return (
        <Link
          href={"/search?view=list&mode=advanced&base=joconde"}
          as="/advanced-search/list/joconde"
        >
          <a className="search-mode">Recherche avancée</a>
        </Link>
      );
    }
    return (
      <Link href={"/search?view=list&mode=simple"} as="/search/list">
        <a className="search-mode">Recherche simple</a>
      </Link>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={8}>{this.renderSearch()}</Col>
          <Col md={4}>
            <div className="switch-search">{this.renderLink()}</div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Search;
