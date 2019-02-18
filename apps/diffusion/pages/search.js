import Head from "next/head";
import { Row, Container } from "reactstrap";
import { ReactiveBase } from "@appbaseio/reactivesearch";
import Layout from "../src/components/Layout";
import Header from "../src/search/Header";
import Menu from "../src/search/Menu";
import MobileFilters from "../src/search/MobileFilters";
import Results from "../src/search/Results";
import Search from "../src/search/Search";
import { es_url } from "../src/config";
import queryString from "query-string";

const BASES = ["merimee", "palissy", "memoire", "joconde", "mnr"].join(",");

import "./search.css";
import throw404 from "../src/services/throw404";

export default class extends React.Component {
  state = {
    mobile_menu: false
  };

  static async getInitialProps({ asPath, query }) {

    console.log("query",query)
    return {
      asPath,
      queryString: queryString.stringify(query),
      view: query.view,
      mode: query.mode,
      base: "merimee"
    };
  }

  render = () => {
    if (!this.props.mode || !this.props.view) {
      return throw404();
    }

    const queryScope = this.props.mode === "simple" ? BASES : this.props.base || "joconde";

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
            <ReactiveBase url={`${es_url}`} app={queryScope}>
              <Row className="search-row">
                {this.props.mode === "simple" ? (
                  <Menu
                    location={this.props.queryString}
                    mobile_menu={this.state.mobile_menu}
                    closeMenu={() => this.setState({ mobile_menu: false })}
                    view={this.props.view}
                  />
                ) : (
                  <div />
                )}
                <div className="search-results">
                  <div className={`search-container search-container-${this.props.mode}`}>
                    <Search
                      mode={this.props.mode}
                      location={this.props.asPath}
                      base={this.props.base}
                    />
                    {this.props.mode === "simple" ? (
                      <MobileFilters
                        openMenu={() => this.setState({ mobile_menu: "mobile_open" })}
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                  <Results
                    mode={this.props.mode}
                    view={this.props.view}
                    location={this.props.asPath}
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
