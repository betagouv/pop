import React from "react";
import Mapping from "../../../services/Mapping";
import Card from "../components/MnrCard";
import AdvancedSearch from "./AdvancedSearch";

export default class Mnr extends React.Component {
  render() {
    return (
      <AdvancedSearch
        baseName="mnr"
        mapping={Mapping.mnr}
        onData={data => <Card key={data.REF} data={data} />}
      />
    );
  }
}
