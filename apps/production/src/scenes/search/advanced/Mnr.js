import React from "react";
import Card from "../components/MnrCard";
import AdvancedSearch from "./AdvancedSearch";

export default class Mnr extends React.Component {
  render() {
    return (
      <AdvancedSearch
        baseName="mnr"
        onData={data => <Card key={data.REF} data={data} />}
      />
    );
  }
}
