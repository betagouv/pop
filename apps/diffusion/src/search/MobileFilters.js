import React from "react";

import { Badge } from "reactstrap";
import { SelectedFilters } from "@appbaseio/reactivesearch";

const MobileFilters = ({ openMenu }) => (
  <div className="filter_mobile_menu" onClick={openMenu}>
    <SelectedFilters
      render={props => {
        let selectedValues = {};
        selectedValues = props.selectedValues;
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <img src="/static/filter.png" />
            <Badge color="secondary">
              {Object.keys(selectedValues).reduce((acc, current) => {
                return selectedValues[current].value !== "" ? acc + 1 : acc;
              }, 0)}
            </Badge>
          </div>
        );
      }}
    />
  </div>
);

export default MobileFilters;
