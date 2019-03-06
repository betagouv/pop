import React from "react";
import Mapping from "../../../services/Mapping";
import Card from "../components/EnluminuresCard";
import AdvancedSearch from "./AdvancedSearch";

export default class Enluminures extends React.Component {
  render() {
    return (
      <AdvancedSearch
        baseName="enluminures"
        mapping={Mapping.enluminures}
        autocomplete={true}
        displayLabel={true}
        onData={data => <Card key={data.REF} data={data} />}
      />
    );
  }
}
