import React from "react";
import { Mapping } from "../../../../../shared/src/index"; 
import Card from "../components/MerimeeCard";
import AdvancedSearch from "./AdvancedSearch";

export default class Merimee extends React.Component {
  render() {
    return (
      <AdvancedSearch
        baseName="merimee"
        mapping={Mapping.merimee}
        onData={data => <Card key={data.REF} data={data} />}
      />
    );
  }
}
