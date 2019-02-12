import Head from "next/head";
import { Row, Col, Container } from "reactstrap";
import { ReactiveBase } from "@appbaseio/reactivesearch";
import Link from "next/link";
import Router from "next/router";

import { es_url } from "../../src/config";

import Layout from "../../src/components/Layout";
import Header from "../../src/search/Header";
import Menu from "../../src/search/Menu";
import Tabs from "../../src/search/Results/Tabs";
import SearchAdvanced from "../../src/search/SearchAdvanced";
import MobileFilters from "../../src/search/MobileFilters";

import List from "../../src/search/List";

import "../../src/search/Search.css";

const BASES = ["merimee", "palissy", "memoire", "joconde", "mnr"].join(",");

export default class extends React.Component {
  state = {
    mobile_menu: false
  };
  static async getInitialProps({ asPath }) {
    return { asPath };
  }

  componentDidMount() {
    Router.prefetch("/search/map");
    Router.prefetch("/search/mosaic");
  }

  render = () => {
    return (
      <Layout>
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
            <Header location={this.props.asPath} />
            <ReactiveBase url={`${es_url}`} app={BASES}>
              <Row className="search-row">
                <div className="search-results">
                  <Row className="search-row">
                    <Col sm={10}>
                      <SearchAdvanced location={this.props.asPath} />
                      <MobileFilters mobile_menu={this.state.mobile_menu} />
                    </Col>
                    <Col sm={2} className="advanced">
                      <Link prefetch href={"/search/list"}>
                        <a>Recherche simple</a>
                      </Link>
                    </Col>
                    <Col sm={4}>
                      <Tabs location={this.props.asPath} />
                    </Col>
                  </Row>
                  <Row className="search">
                    <List />
                  </Row>
                </div>
              </Row>
            </ReactiveBase>
          </Container>
        </div>
      </Layout>
    );
  };
}
