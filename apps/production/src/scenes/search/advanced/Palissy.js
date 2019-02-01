import React from "react";
import { Mapping } from "../../../../../shared/src/index"; 
import Card from "../components/PalissyCard";
import AdvancedSearch from "./AdvancedSearch";

export default class Palissy extends React.Component {
  render() {
    return (
      <AdvancedSearch
        baseName="palissy"
        mapping={Mapping.palissy}
        onData={data => <Card key={data.REF} data={data} />}
      />
    );
  }
}
