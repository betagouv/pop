import React from "react";
import Helmet from "../components/Helmet";
import API from "../services/api";
import { Mapping } from "pop-shared";
import Loader from "../components/Loader";
import Map from "./notice/components/map";
import "./Museo.css";
import NotFound from "../components/NotFound";

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
  "ENVIRON"
];

class Museo extends React.Component {
  state = {
    museo: null,
    loading: true
  };

  componentDidMount() {
    const { match } = this.props;
    this.getApiMuseo(match.params.ref);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match && this.props.match.params.ref !== newProps.match.params.ref) {
      this.getApiMuseo(newProps.match.params.ref);
    }
  }

  // Load museo from API.
  async getApiMuseo(ref) {
    this.setState({
      museo: await API.getMuseo(ref),
      loading: false
    });
  }

  // Display property label.
  label = k => {
    if (Mapping.museo[k]) {
      return Mapping.museo[k].label || Mapping.museo[k].description || k;
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
      .filter(([key, _val]) => Mapping.museo[key])
      .filter(([key, _val]) => !hiddenFields.includes(key))
      .map(([key, val]) => {
        return (
          <React.Fragment key={key}>
            <dt>{this.label(key)}</dt>
            <dd>{this.text(key, val)}</dd>
          </React.Fragment>
        );
      });
    return <dl>{dl}</dl>;
  };

  renderMap(loc) {
    if (!loc) {
      return <div />;
    }
    return <Map notice={{ POP_COORDONNEES: { lat: loc.lat, lon: loc.lon } }} />;
  }

  // The main render function.
  render() {
    const { museo, loading } = this.state;
    if (loading) {
      return <Loader />;
    }

    if (!museo) {
      return <NotFound />;
    }
    const title = museo.NOMUSAGE || museo.NOMOFF || museo.ANC;
    return (
      <div className="museo">
        <div className="museo-card">
          <Helmet
            title={`${title} - POP`}
            description="À propos de la Plateforme Ouverte du Patrimoine POP."
          />
          <h1>{title}</h1>
          {this.renderProperties(museo)}
          <div className="museo-map">{this.renderMap(museo.location)}</div>
          <div className="collection">
            <a href={`/search/list/?museo=["${museo.REF}"]`} className="btn btn-secondary">
              Voir les collections du musée
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Museo;
