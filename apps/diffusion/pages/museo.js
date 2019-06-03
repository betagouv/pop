import React from "react";
import API from "../src/services/api";
import mapping from "../src/services/mapping";
import Map from "../src/notices/Map";
import Layout from "../src/components/Layout";
import Head from "next/head";
import Link from "next/link";
import throw404 from "../src/services/throw404";

const hiddenFields = [
  "_id",
  "location",
  "VIDEO",
  "URL_M2",
  "FAX_M",
  "ANNEXE",
  "SERVICES",
  "ACTIV",
  "EQUIP",
  "OBS_TOUR",
  "ENVIRON",
  "POP_COMMENTAIRES"
];

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    try {
      const museo = await API.getMuseo(id);
      return { museo };
    } catch (e) {}
    return { museo: null };
  }

  // Display property label.
  label = k => {
    if (mapping.museo[k]) {
      return mapping.museo[k].label || mapping.museo[k].description || k;
    }
    return k;
  };

  // Transform sh*ty text to readable text.
  text = (key, val) => {
    if (key === "URL_M" || key === "URL_M2") {
      const link = val.indexOf("://") === -1 ? "http://" + val : val;
      return (
        <a href={link} target="_blank">
          {val}
        </a>
      );
    } else if (val.match(/#/)) {
      const list = val
        .split("#")
        .filter(v => v)
        .map((v, i) => <li key={i}>{this.removeUglyChars(v)}</li>);
      return <ul>{list}</ul>;
    }
    return this.removeUglyChars(val);
  };

  // Remove HTML entities and other pollution.
  removeUglyChars = text => {
    return text
      .replace(/&amp;lt;(?:\/?)(?:b|i)&amp;gt;|<(?:\/?)(?:b|i)>/g, "")
      .replace(/^ -/, "")
      .replace(/&quot;/g, '"')
      .replace(
        /&amp;lt;A HREF.*?&amp;gt;Joconde&amp;lt;\/A&amp;gt;|<A HREF.*?>Joconde<\/A>/g,
        "Joconde"
      );
  };

  // Render all properties.
  renderProperties = museo => {
    const dl = Object.entries(museo)
      .filter(([_key, val]) => val)
      .filter(([key, _val]) => mapping.museo[key])
      .filter(([key, _val]) => !hiddenFields.includes(key))
      .map(([key, val]) => {
        return (
          <React.Fragment key={key}>
            <dt>{this.label(key)}</dt>
            <dd>{this.text(key, Array.isArray(val) ? val.join("#") : val )}</dd>
          </React.Fragment>
        );
      });
    return <dl>{dl}</dl>;
  };

  renderMap(loc) {
    if (!loc) {
      return null;
    }
    return <Map notice={{ POP_COORDONNEES: { lat: loc.lat, lon: loc.lon } }} />;
  }

  renderCta(museo) {
    return (
      <Link href={`/search/list?museo=["${museo.REF}"]`}>
        <a className="btn btn-secondary">Voir les collections du musée</a>
      </Link>
    );
  }

  // The main render function.
  render() {
    if (!this.props.museo) {
      return throw404();
    }

    const { museo } = this.props;
    const title = [
      museo.NOMUSAGE || museo.NOMOFF || museo.ANC,
      museo.VILLE_M || museo.VILLE_AD
    ].join(" - ");

    return (
      <Layout>
        <div className="museo">
          <div className="museo-card">
            <Head>
              <title>{`${title} - POP`}</title>
            </Head>

            <h1>{title}</h1>
            <div className="collection">{this.renderCta(museo)}</div>
            {this.renderProperties(museo)}
            <div className="museo-map">{this.renderMap(museo.location)}</div>
            <div className="collection collection-bottom">{this.renderCta(museo)}</div>
          </div>
        </div>
        <style jsx>{`
          .museo {
            display: flex;
            justify-content: start;
            align-items: "center";
            flex-direction: column;
            padding-bottom: 60px;
          }

          .museo .museo-card {
            margin: 50px auto;
            max-width: 800px;
            padding: 30px 25px 30px 25px;
          }

          @media screen and (min-width: 800px) {
            .museo {
              background-color: #e5edef;
            }
            .museo .museo-card {
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 2px 4px 1px rgba(189, 189, 189, 0.7);
            }
          }

          .museo h1 {
            color: #025d59;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .museo dl > dt {
            color: #025d59;
            margin-top: 15px;
          }

          .museo-map {
            margin-top: 25px;
          }
          .museo .collection.collection-bottom {
            text-align: center;
            margin-top: 25px;
          }

          .museo .collection a {
            color: #fff;
            background-color: #377d87;
            border-color: #377d87;
          }

          .museo .collection a:hover {
            color: #fff;
            background-color: #28565e;
            border-color: #1e4147;
          }
        `}</style>
      </Layout>
    );
  }
}
