import React from "react";
import { Mapping } from "pop-shared";
import Card from "../components/MemoireCard";
import AdvancedSearch from "./AdvancedSearch";

export default class Memoire extends React.Component {
  render() {
    return (
      <AdvancedSearch
        baseName="memoire"
        mapping={Mapping.memoire}
        onData={data => <Card key={data.REF} data={data} />}
      />
    );
  }
}
