import React from "react";
import { Row, Col, Container } from "reactstrap";

import Link from "next/link";
import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";
import { QueryBuilder } from "pop-shared";
import Head from "next/head";

import Menu from "./Menu";
import MobileFilters from "./MobileFilters";
import Tabs from "./Tabs";

import Header from "./Header.js";

import { es_url } from "../config.js";
import "./Search.css";

const BASES = ["merimee", "palissy", "memoire", "joconde", "mnr"].join(",");

class Search extends React.Component {
  state = {
    mobile_menu: "mobile_close"
  };

  render() {
    return (
      <div className="search">
        <Head>
          <title>Recherche - POP</title>
          <meta
            name="description"
            content="Effectuer une recherche sur POP. Découvrez le moteur de cherche qui vous aidera à trouver facilement ce que vous recherchez sur POP."
          />
        </Head>
        <Container fluid style={{ maxWidth: 1860 }}>
          <h1 className="title">Votre recherche</h1>
          <Header location={this.props.location} />
          <ReactiveBase url={`${es_url}`} app={BASES}>
            <Menu location={this.props.location} mobile_menu={this.state.mobile_menu} />
            <Row className="search-row">
              <Col sm={6}>
                <MobileFilters mobile_menu={this.state.mobile_menu} />
              </Col>
              <Col sm={2} className="advanced">
                <Link prefetch href={this.props.advanced ? "/search/list" : "/advancedsearch/list"}>
                  <a>{this.props.advanced ? "Recherche normale" : "Recherche avancée"}</a>
                </Link>
              </Col>
              <Col sm={4}>
                <Tabs location={this.props.location} />
              </Col>
            </Row>
          </ReactiveBase>
        </Container>
      </div>
    );
  }
}

export default Search;
