import Router from "next/router";
import Head from "next/head";
import { Row, Col, Container } from "reactstrap";
import { ReactiveBase } from "@appbaseio/reactivesearch";

import Layout from "../src/components/Layout";

import Header from "../src/search/Header";
import Menu from "../src/search/Menu";
import MobileFilters from "../src/search/MobileFilters";

import Results from "../src/search/Results";
import Search from "../src/search/Search";

import { es_url } from "../src/config";

const BASES = ["merimee", "palissy", "memoire", "joconde", "mnr"].join(",");

import "./search.css";

export default class extends React.Component {
  state = {
    mobile_menu: false,
    search_mode: "normal"
  };

  static async getInitialProps({ asPath, query: { view, mode } }) {
    return { asPath, view, mode };
  }

  componentDidMount() {
    // Router.prefetch("/search/map");
    // Router.prefetch("/search/mosaic");
  }

  handleUrl() {
    // console.log("this.props.asPath", this.props.asPath);
  }

  updateParam(param) {
    console.log(param);
    // Router.push()
  }

  render = () => {
    // this.handleUrl();*
    console.log("view:", this.props.view);
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
                {this.props.mode === "normal" ? (
                  <Menu
                    location={this.props.asPath}
                    mobile_menu={this.state.mobile_menu}
                    closeMenu={() => this.setState({ mobile_menu: false })}
                  />
                ) : (
                  <div />
                )}
                <div className="search-results">
                  <div className="search-container">
                    <Search
                      mode={this.props.mode}
                      location={this.props.asPath}
                      updateParam={this.updateParam.bind(this)}
                    />
                    {this.props.mode === "normal" ? (
                      <MobileFilters mobile_menu={this.state.mobile_menu} />
                    ) : (
                      <div />
                    )}
                  </div>
                  <Results
                    view={this.props.view}
                    location={this.props.asPath}
                    updateParam={this.updateParam.bind(this)}
                  />
                </div>
              </Row>
            </ReactiveBase>
          </Container>
        </div>
      </Layout>
    );
  };
}
