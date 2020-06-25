import Head from "next/head";
import { Row, Container } from "reactstrap";
import { Elasticsearch, toUrlQueryString, fromUrlQueryString } from "react-elasticsearch-pop";
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
import {bases} from "../src/search/Search/SearchAdvanced";
import { replaceSearchRouteWithUrl } from "../src/services/url";

const BASES = ["merimee", "palissy", "memoire", "joconde", "mnr", "museo", "enluminures", "autor"].join(",");

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
    const hasBase = Boolean(this.props.base);
    if (checked) {
      if(hasBase){
        let myBase = this.props.base.split('"')
        if(myBase.length > 3){
          Router.push("/search?view=list&mode=advanced", "/advanced-search/list/");
        }else{
          let key = bases.find(e => e.base === myBase[1]).key;
          Router.push("/advanced-search/list/" + key);
        }
      }
      else{
        Router.push("/search?view=list&mode=advanced", "/advanced-search/list/");
      }
    } else {
      Router.push("/search?view=list&mode=simple", "/search/list");
    }
  };

  handleRadioBaseChange(base){
    const value = base;
    Router.push(value ? `/advanced-search/list/${value}` : "/advanced-search/list");
  }

  render = () => {
    if (!this.props.mode || !this.props.view) {
      return throw404();
    }

    const queryScope = this.props.mode === "simple" ? BASES : this.props.base;
    let initialValues;

    // This whole part is about backward compatibility of old search system.
    // If the URL has a `q[0][combinator]` param, it's the old system, so
    // it must be updated.
    const parsed = queryString.parse(this.props.queryString);
    if (parsed && parsed["q[0][combinator]"]) {
      const qb = [];
      Object.entries(parsed)
        // Map params from `q[0][combinator]=ET` to `{index: 0, key: combinator, value: ET}`
        .map(([k, value]) => {
          const matches = k.match(/\[([0-9]+)\]\[([a-z]+)\]/i);
          if (matches && matches.length === 3) {
            return { index: Number(matches[1]), key: matches[2], value };
          }
        })
        // Remove empty
        .filter(a => a)
        // Sort by index (0, 1, 2, etc.)
        .sort((a, b) => a.index - b.index)
        // Create a new "qb" param with the current system
        .forEach(e => {
          if (!qb[e.index]) {
            qb.push({ index: e.index });
          }
          switch (e.key) {
            case "combinator":
              qb[e.index].combinator = e.value === "OU" ? "OR" : "AND";
              break;
            case "key":
              qb[e.index].field = `${e.value}.keyword`;
              break;
            case "operator":
              qb[e.index].operator = e.value.replace("<>", "∃").replace("><", "!∃");
              break;
            default:
              qb[e.index][e.key] = e.value;
          }
        });
      // Create a Map with "qb" property (which is the current system).
      initialValues = new Map([["qb", qb]]);
    } else {
      initialValues = fromUrlQueryString(this.props.queryString);
    }

    const bases = [
      { key: "joconde", base: "Collections des musées de France (Joconde)", img: "/static/topics/mdf.jpg" },
      { key: "mnr", base: "Récupération artistique (MNR Rose-Valland)", img: "/static/topics/mnr.jpg" },
      { key: "merimee", base: "Patrimoine architectural (Mérimée)", img: "/static/topics/mhr.jpg" },
      { key: "memoire", base: "Photographies (Mémoire)", img: "/static/topics/memoire.jpg" },
      { key: "palissy", base: "Patrimoine mobilier (Palissy)", img: "/static/topics/mobilier.jpg" },
      { key: "enluminures", base: "Enluminures (Enluminures)", img: "/static/topics/enluminures.jpg" },
      { key: "museo", base: "Répertoire des Musées de France (Muséofile)", img: "/static/topics/museo.jpg" },
      { key: "autor", base: "Ressources biographiques (Autor)", img: "/static/topics/autor.jpeg"}
    ];
    
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
              key={`${this.props.mode}-${this.props.view}`}
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



                {this.props.mode === "simple" ? 
                <div className="search-results">
                  <div className={`search-container search-container-simple`}>
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
                  {!(this.props.mode === "advanced" && !this.props.base) ? (
                      <Results
                        mode={this.props.mode}
                        view={this.props.view}
                        base={this.props.base}
                        initialValues={initialValues}
                      />
                    ) : null}
                </div> :

                <div className="search-main-container">
                  {(this.props.base != undefined && this.props.base != "")? 
                    <div className="search-bases-radio-buttons">
                      {bases.map( base => 
                        <div className="radioCard">
                          <div className="radioButtonContainer">
                                <input  className="radioButton" key={base.key} type="radio" value={base.key} checked={this.props.base == base.key ? true : false}
                                        onChange={() => this.handleRadioBaseChange(base.key)}/>
                                <div className="radioName">
                              {base.base}
                            </div>
                          </div>
                        </div>
                      )}
                    </div> : null}

                  <div className={`search-results-advanced${(this.props.base == undefined || this.props.base == "")? "-choice" : ""}`}>
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
                    {!(this.props.mode === "advanced" && !this.props.base) ? (
                      <Results
                        mode={this.props.mode}
                        view={this.props.view}
                        base={this.props.base}
                        initialValues={initialValues}
                      />
                    ) : null}
                  </div>
                </div>}
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

          .search .search-container.search-container-advanced {
            display: flex;
            justify-content: space-between;
            width: 100%;
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

          .search .search-main-container{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            width: -webkit-fill-available;
          }
          .search .search-results-advanced {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            width: 80%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
          }

          .search .search-results-advanced-choice {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 50%;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
          }

          .search-radio-results{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
          }
          .search-bases-radio-buttons {
            background-color: white;
            box-shadow: 0 3px 6px 0 rgba(189,189,189,1);
            border-radius: 5px;
            max-width: 18%;
            margin-left: 20px;
            height: max-content;
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

          .search .result-view-advanced {
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

          ul.react-es-pagination > li > input {
            background: transparent;
            border: none;
            text-align: center;
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
