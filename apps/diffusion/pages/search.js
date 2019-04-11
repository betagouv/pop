import Head from "next/head";
import { Row, Container } from "reactstrap";
import { ReactiveBase } from "@appbaseio/reactivesearch";
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

    console.log("query", query);
    const qs = queryString.stringify(rest);
    return { asPath, queryString: qs, view, mode, base: query.base, query };
  }

  handleSwitchChange(checked) {
    if (checked) {
      Router.push("/search?view=list&mode=advanced&base=joconde", "/advanced-search/list/joconde");
    } else {
      Router.push("/search?view=list&mode=simple", "/search/list");
    }
  }

  render = () => {
    if (
      !this.props.mode ||
      !this.props.view ||
      (this.props.mode === "advanced" && !this.props.base)
    ) {
      return throw404();
    }

    const queryScope = this.props.mode === "simple" ? BASES : this.props.base;

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
            <ReactiveBase
              url={`${es_url}`}
              app={queryScope}
              setSearchParams={url => {
                const { mode, view, base } = this.props;
                replaceSearchRouteWithUrl({ mode, view, base, url });
              }}
            >
              <Row className="search-row">
                {this.props.mode === "simple" ? (
                  <div className={`search-sidebar ${this.state.mobile_menu || ""}`}>
                    <Menu
                      location={this.props.queryString}
                      closeMenu={() => this.setState({ mobile_menu: false })}
                    />
                  </div>
                ) : null}
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
                    ) : null}
                  </div>
                  <Results
                    mode={this.props.mode}
                    view={this.props.view}
                    base={this.props.base}
                    location={this.props.asPath}
                  />
                </div>
              </Row>
            </ReactiveBase>
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

          .search .search-container.search-container-simple {
            display: flex;
            justify-content: space-between;
          }

          .search .list-view {
            width: 100%;
          }
          .search .mosaique-view > div {
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
            padding-top: 4px;
          }
          .search .list-view .result-count {
            padding-left: 5px;
            padding-bottom: 0px;
          }

          .search .mosaique-view .result-count {
            padding-left: 15px;
            padding-bottom: 0px;
          }

          .search .view {
            padding-top: 25px;
          }

          .search .search-map {
            padding-top: 50px !important;
          }

          .search .advanced {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
          }

          .search .advanced-search select {
          }

          .search .advanced-search .advanced-search-title {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .search .search-row {
            justify-content: center;
          }

          .search .result-view {
            width: 100%;
            padding-top: 10px;
          }

          .search .search-filters-sidebar {
            background-color: #fff;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
          }

          .search .advanced-search {
          }

          .search .advanced-search .collection {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            font-size: 18px;
            color: #2a282b;
          }

          .search .advanced-search select,
          .search .advanced-search input {
            background-color: #f8f8f8;
            border-radius: 5px;
            box-shadow: 1px 2px 2px 0 rgba(197, 197, 197, 0.5);
            max-height: 325px;
            margin: 10p;
            height: 40px;
            font-size: 16px;
            border-style: none;
            font-weight: normal;
            color: black;
            font-weight: 600;
            font-size: 15px;
          }

          .search .advanced-search .ruleGroup {
            margin-left: 0px;
          }

          .search .advanced-search .collection select {
            margin-left: 20px;
            margin-right: 20px;
          }

          .search .search-filters-sidebar h4,
          .search .search-filters-sidebar .selected-filters h2 {
            color: #19414c;
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 15px;
            text-align: center;
          }
          .search .search-filters-sidebar .selected-filters a {
            color: #19414c;
            font-weight: 400;
            font-size: 16px;
            width: 100%;
            margin-bottom: 5px;
            justify-content: space-between;
            background-color: transparent;
            box-shadow: 1px 2px 2px 0 rgba(197, 197, 197, 0.5);
            border: 1px solid #d7d3d3;
            border-radius: 5px;
          }
          .search .search-filters-sidebar .selected-filters a:last-child {
            background-color: #377d87;
            border: 0;
            color: #fff;
            margin: 5px auto 25px;
            padding: 5px 3px 1px;
            display: block;
            width: 150px;
            text-align: center;
            font-size: 14px;
          }
          .search .filters + label {
            font-weight: 400;
            font-size: 20px;
            color: #19414c;
          }

          .search .mainSearch {
            width: 100%;
            margin-right: 20px;
          }
          .search .mainSearch input {
            font-weight: 400;
            font-size: 18px;
            border: 0;
            border-radius: 5px;
            box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
            background-image: url(/static/search.png);
            background-repeat: no-repeat;
            background-position: 1% center;
            padding-left: 40px;
            background-size: 22px;
            color: #19414c;
          }
          .search .mainSearch input::placeholder {
            color: #777;
            font-weight: 400;
            font-size: 18px;
          }

          .search .search-sidebar {
            flex: 0 0 25%;
            max-width: 25%;
            position: relative;
            width: 100%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
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

          .search #mainSearch-downshift-input {
            height: 50px;
          }

          .search .buttons {
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
          }

          .search .search-and-export-zone {
            display: flex;
          }

          .search .search-and-export-zone .button {
            width: 235px;
          }

          .search .nav-pills {
            box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
            position: absolute;
            right: 15px;
          }
          .search .nav-pills .nav-link {
            background-color: #fff;
            color: #777;
            border-radius: 0;
            cursor: pointer;
            font-weight: 400;
            font-size: 20px;
            height: 42px;
            padding-top: 7px;
          }

          .search .nav-pills .nav-item {
            flex-grow: 1;
            text-align: center;
          }
          .search .nav-pills .nav-item .active {
            background-color: #377d87;
            color: #fff;
          }
          .search .nav-pills .nav-item:first-child .nav-link {
            border-radius: 0.25rem;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .search .nav-pills .nav-item:last-child .nav-link {
            border-radius: 0.25rem;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
          .search .nav-pills .nav-link.active:hover {
            color: #fff;
          }

          .search label::before {
            border-radius: 0px !important;
            min-width: 16px !important;
          }

          .search .active input:checked + label::after {
            border-color: #377d87 !important;
          }

          .search #aboutSearch {
            display: none;
          }

          .search .active input:checked + label::before,
          .search .active input:hover + label::before,
          .css-yljddh:hover + label::before {
            border-color: #377d87 !important;
          }

          .search .map {
            margin-top: 10px;
            border-radius: 5px;
          }

          .search .mapboxgl-map {
            border-radius: 5px;
            box-shadow: 1px 2px 2px 0 rgba(197, 197, 197, 0.5);
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
            .search .list-view .result-count {
              visibility: hidden;
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
            .search .mainSearch input::placeholder {
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
        `}</style>
      </Layout>
    );
  };
}
