import React from "react";
import { Mapping } from "pop-shared";
import Card from "../components/JocondeCard";
import AdvancedSearch from "./AdvancedSearch";

export default class Joconde extends React.Component {
  render() {
    return (
      <AdvancedSearch
        baseName="joconde"
        displayLabel={true}
        mapping={Mapping.joconde}
        onData={data => <Card key={data.REF} data={data} />}
      />
    );
  }
}
