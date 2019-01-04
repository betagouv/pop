import React from "react";
import Helmet from "../../components/Helmet";
import API from "../../services/api";
import { Mapping } from "pop-shared";
import Loader from "../../components/loader";
import Map from "../notice/components/map";
import "./index.css";

class Museo extends React.Component {
  state = {
    museo: null
  };

  componentDidMount() {
    const { match } = this.props;
    this.getApiMuseo(match.params.ref);
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props.match &&
      this.props.match.params.ref !== newProps.match.params.ref
    ) {
      this.getApiMuseo(newProps.match.params.ref);
    }
  }

  // Load museo from API.
  async getApiMuseo(ref) {
    this.setState({
      museo: await API.getMuseo(ref)
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
    if (key === "URL_M") {
      const link = val.indexOf("://") === -1 ? "http://" + val : val;
      return (
        <a href={link} target="_blank">
          {val}
        </a>
      );
    } else if (val.match(/#/)) {
      const list = val.split("#").map(v => <li>{this.removeUglyChars(v)}</li>);
      return <ul>{list}</ul>;
    }
    return this.removeUglyChars(val);
  };

  // Remove HTML entities and other pollution.
  removeUglyChars = text => {
    return text
      .replace(/&amp;lt;(?:\/?)(?:b|i)&amp;gt;/g, "")
      .replace(/^ -/, "")
      .replace(/&quot;/g, '"')
      .replace(
        /&amp;lt;A HREF.*?&amp;gt;Joconde&amp;lt;\/A&amp;gt;/g,
        "Joconde"
      );
  };

  // Render all properties.
  renderProperties = museo => {
    const dl = Object.entries(museo)
      .filter(([_key, val]) => val)
      .filter(([key, _val]) => !["_id", "location", "VIDEO"].includes(key))
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
    const { museo } = this.state;
    if (!museo) {
      return <Loader />;
    }
    const title = museo.NOMUSAGE || museo.NOMOFF || museo.ANC;
    return (
      <div className="museo">
        <Helmet
          title={`${title} - POP`}
          description="À propos de la Plateforme Ouverte du Patrimoine POP."
        />
        <h1>{title}</h1>
        {this.renderProperties(museo)}
        <div className="museo-map">{this.renderMap(museo.location)}</div>
      </div>
    );
  }
}

export default Museo;
