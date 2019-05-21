import Head from "next/head";
import { Row, Container } from "reactstrap";
import { Elasticsearch, toUrlQueryString, fromUrlQueryString } from "react-elasticsearch";
import Switch from "react-switch";
import Router from "next/router";
import Layout from "../src/components/Layout";
import Header from "../src/search/Header";
import Menu from "../src/search/Menu";
import Permalink from "../src/search/Permalink";
import MobileFilters from "../src/search/MobileFilters";
import Results from "../src/search/Results";
import Search from "../src/search/Search";
import { es_url } from "../src/config";
import queryString from "query-string";
import { replaceSearchRouteWithUrl } from "../src/services/url";

const BASES = ["merimee", "palissy", "memoire", "joconde", "mnr", "enluminures"].join(",");

import throw404 from "../src/services/throw404";

export default class extends React.Component {
  state = {
    mobile_menu: false
  };

  static async getInitialProps({ asPath, query }) {
    const { view, mode, ...rest } = query;
    const qs = queryString.stringify(rest);
    return { asPath, queryString: qs, view, mode, base: query.base, query };
  }

  handleSwitchChange = checked => {
    if (checked) {
      Router.push("/search?view=list&mode=advanced&base=joconde", "/advanced-search/list/joconde");
    } else {
      Router.push("/search?view=list&mode=simple", "/search/list");
    }
  };

  render = () => {
    if (
      !this.props.mode ||
      !this.props.view ||
      (this.props.mode === "advanced" && !this.props.base)
    ) {
      return throw404();
    }

    const queryScope = this.props.mode === "simple" ? BASES : this.props.base;
    const initialValues = fromUrlQueryString(this.props.queryString);

    return (
      <Layout>
        <div className="search">
          <Head>
            <title>Recherche - POP</title>
            <meta
              name="description"
              content="Rechercher des œuvres, des monuments, ou tout autre bien culturel dans la base de donnée du ministère de la culture française."
            />
          </Head>
          <Container fluid style={{ maxWidth: 1860 }}>
            <label className="react-switch">
              <Switch onChange={this.handleSwitchChange} checked={this.props.mode !== "simple"} />
              <span>Recherche avancée</span>
            </label>
            <Permalink query={this.props.query} />
            <h1 className="title">Votre recherche</h1>
            <Header location={this.props.asPath} />
            <Elasticsearch
              url={`${es_url}${queryScope}`}
              onChange={params => {
                const { mode, view, base } = this.props;
                replaceSearchRouteWithUrl({
                  mode,
                  view,
                  base,
                  url: `?${toUrlQueryString(params)}`
                });
              }}
            >
              <Row className="search-row">
                {this.props.mode === "simple" ? (
                  <div className={`search-sidebar ${this.state.mobile_menu || ""}`}>
                    <Menu
                      closeMenu={() => this.setState({ mobile_menu: false })}
                      initialValues={initialValues}
                    />
                  </div>
                ) : null}
                <div className="search-results">
                  <div className={`search-container search-container-${this.props.mode}`}>
                    <Search
                      mode={this.props.mode}
                      base={this.props.base}
                      initialValues={initialValues}
                    />
                    {this.props.mode === "simple" ? (
                      <MobileFilters
                        openMenu={() => this.setState({ mobile_menu: "mobile_open" })}
                      />
                    ) : null}
                  </div>
                  <Results
                    mode={this.props.mode}
                    view={this.props.view}
                    base={this.props.base}
                    initialValues={initialValues}
                  />
                </div>
              </Row>
            </Elasticsearch>
          </Container>
        </div>
        <style jsx global>{`
          .search {
            display: flex;
            height: 100%;
            min-height: 85vh;
            padding: 20px 0;
            margin-bottom: 60px;
          }

          .search .title {
            text-align: center;
            font-weight: 700;
            font-size: 26px;
            color: #19414c;
            margin-bottom: 20px;
          }

          .search .search-container {
            background-color: #fff;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
          }

          .search .view {
            padding-top: 25px;
          }

          .search .search-container.search-container-simple {
            display: flex;
            justify-content: space-between;
          }
          

          .search .search-results {
            flex: 0 0 75%;
            max-width: 75%;
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
          }

          .search .search-sidebar .close_mobile_menu,
          .search .filter_mobile_menu {
            display: none;
          }

          .search .search-icon {
            display: none;
          }
          .search .react-switch {
            position: absolute;
            right: 70px;
          }

          .search .react-switch > span {
            display: inline-block;
            position: relative;
            top: -8px;
            margin-left: 7px;
          }
          .search .search-map {
            padding-top: 50px !important;
          }

          .search .result-view {
            width: 100%;
            padding-top: 10px;
          }

          .search .search-row {
            justify-content: center;
          }
          @media screen and (max-width: 767px) {
            .search .search-sidebar {
              position: fixed;
              left: 0;
              top: 0;
              height: 100%;
              background: #fff;
              width: 100%;
              z-index: 1000;
              transform: translateX(-100%);
              overflow-y: auto;
              transition: all 0.4s;
              flex: 0 0 100%;
              max-width: 100%;
            }
            .search .filter_mobile_menu {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .search .filter_mobile_menu img {
              width: 20px;
              margin: 5px;
            }

            .search .search-sidebar .close_mobile_menu {
              visibility: visible;
              display: flex;
              justify-content: flex-end;
              font-weight: bold;
              font-size: 25px;
              margin-bottom: 30px;
            }

            .search #mainSearch-downshift-input {
              height: 40px;
              padding-left: 30px;
            }

            .search .mobile_open {
              transform: translateX(0);
            }
            .react-es-searchbox input::placeholder {
              font-size: 14px;
            }
            .search .search-results {
              flex: 0 0 100%;
              max-width: 100%;
            }
            .search .react-switch {
              display: none;
            }
          }

          .collapsable-facet {
            background-color: #f8f8f8;
            border-radius: 5px;
            box-shadow: 1px 2px 2px 0 rgba(197, 197, 197, 0.5);
            margin-bottom: 20px;
            padding: 10px;
            font-size: 14px;
            font-weight: normal;
            color: black;
            cursor: pointer;
          }

          .collapsable-facet-title {
            font-weight: 700;
            font-size: 16px;
          }
          .collapsable-facet-title > button,
          ul.react-es-pagination > li > button {
            border: none;
            background: transparent;
            outline: none;
            font-size: 16px;
            font-weight: bold;
          }

          .collapsable-facet-title > button:focus {
            outline: none;
          }

          ul.react-es-pagination > li.react-es-pagination-active-page {
            background: #0062cc;
          }
          ul.react-es-pagination > li.react-es-pagination-active-page > button {
            color: white;
          }

          .collapsable-facet-title > button {
            float: right;
            color: #8999ae;
            transform: scale(1.5, 1);
          }

          .react-es-facet {
            border-top: 1px solid rgb(203, 203, 203);
            margin-top: 10px;
          }

          .react-es-facet > input[type="text"] {
            margin-top: 10px;
            padding: 5px;
            height: 30px;
            margin-bottom: 5px;
            border: 1px solid #d7d3d3;
            width: 100%;
            border-radius: 5px;
          }

          .react-es-facet > label {
            display: block;
            margin-bottom: 5px;
          }

          .react-es-facet > label > input[type="checkbox"] {
            margin-right: 5px;
          }
          .react-es-facet > button {
            border: none;
            background: transparent;
            text-align: center;
            width: 100%;
          }

          ul.react-es-pagination > li {
            background-color: #fafafa;
            margin: 5px 7px 5px 0;
            padding: 5px 7px;
            border: 1px solid #ddd;
            border-radius: 2px;
            box-shadow: 1px 2px 2px 0 rgba(197, 197, 197, 0.5);
          }
          ul.react-es-pagination {
            list-style: none;
            padding: 0;
          }
          ul.react-es-pagination {
            margin-top: 15px;
          }
          ul.react-es-pagination > li {
            display: inline;
          }
          .react-es-searchbox input {
            border: 0;
            border-radius: 5px;
            box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
            background-size: 22px;
            width: 100%;
            padding: 7px;
            color: #19414c;
            background-image: url(/static/search.png);
            background-repeat: no-repeat;
            background-position: 1% center;
            padding-left: 40px;
            background-color: #fafafa;
            color: #19414c;
          }
          .react-es-searchbox {
            width: 100%;
            margin-right: 20px;
          }
        `}</style>
      </Layout>
    );
  };
}
