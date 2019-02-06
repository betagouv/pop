import React from "react";
import Mapping from "../../../services/Mapping";
import Card from "../components/MuseoCard";
import AdvancedSearch from "./AdvancedSearch";

export default class Museo extends React.Component {
  render() {
    return (
      <AdvancedSearch
        baseName="museo"
        mapping={Mapping.museo}
        displayLabel={true}
        onData={data => <Card key={data.REF} data={data} />}
      />
    );
  }
}
