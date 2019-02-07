import React from "react";
import API from "../services/api";
import "./MuseoCard.css";

class MuseoCard extends React.Component {
  state = {
    museo: null
  };

  async componentDidMount() {
    try {
      this.setState({
        museo: await API.getMuseo(this.props.museo)
      });
    } catch (e) {}
  }

  render() {
    const museo = this.state.museo;
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

export default MuseoCard;
