import React from "react";
import queryString from "query-string";
import API from "../services/api";
import "./Header.css";

class Header extends React.Component {
  state = {
    museo: null
  };

  async componentDidMount() {
    const query = queryString.parseUrl(this.props.location).query;
    console.log("query");
    if (query && query.museo && query.museo) {
      const museos = JSON.parse(query.museo);
      if (museos.length) {
        const museo = await API.getMuseo(museos[0]);
        this.setState({ museo });
      }
    }
  }

  render() {
    const { museo } = this.state;
    if (!museo) {
      return <div />;
    }
    const title = museo.NOMUSAGE || museo.NOMOFF || museo.ANC;
    return (
      <div className="museo-card-sm">
        <h2>
          {title} - {museo.VILLE_M}
        </h2>
        <p>
          {museo.ATOUT && museo.ATOUT.replace(/#/g, " ; ")} -{" "}
          <a href={`/museo/${museo.REF}`}>En savoir plus...</a>
        </p>
      </div>
    );
  }
}

export default Header;
