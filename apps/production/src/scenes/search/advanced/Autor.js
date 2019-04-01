import React from "react";
import Mapping from "../../../services/Mapping";
import Card from "../components/AutorCard";
import AdvancedSearch from "./AdvancedSearch";

export default class Autor extends React.Component {
  render() {
    console.log(Mapping.autor)
    return (
      <AdvancedSearch
        baseName="autor"
        mapping={Mapping.autor}
        autocomplete={true}
        displayLabel={true}
        onData={data => <Card key={data.REF} data={data} />}
      />
    );
  }
}
