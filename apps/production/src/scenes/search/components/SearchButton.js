import { Button } from "reactstrap";
import React from "react";
import SearchIcon from "../../../assets/icon-search.png";

export default function SearchButton() {
  return (
    <Button color="primary">
      <img src={SearchIcon} alt="rechercher" />
    </Button>
  );
}
