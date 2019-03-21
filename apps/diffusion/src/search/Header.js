import React from "react";
import queryString from "query-string";
import API from "../services/api";

class Header extends React.Component {
  state = {
    museo: null
  };

  async componentDidMount() {
    const query = queryString.parseUrl(this.props.location).query;
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
      return null;
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
        <style jsx>{`
          .museo-card-sm {
            background-color: #fff;
            border-radius: 5px;
            padding: 25px;
            padding-bottom: 15px;
            box-shadow: 0 2px 4px 1px rgba(189, 189, 189, 0.7);
            margin-bottom: 30px;
          }
          .museo-card-sm h2 {
            font-size: 22px;
          }
        `}</style>
      </div>
    );
  }
}

export default Header;
