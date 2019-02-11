import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

class Tabs extends React.Component {
  render() {
    let activeTab = "";
    if (this.props.location.indexOf("/mosaic") !== -1) {
      activeTab = "mosaic";
    } else if (this.props.location.indexOf("/map") !== -1) {
      activeTab = "map";
    } else {
      activeTab = "list";
    }

    console.log("CCC", this.props.location);

    return (
      <Nav pills>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "list" })}
            onClick={() => this.toggle("list")}
          >
            LISTE
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "map"
            })}
            onClick={() => {
              //   this.toggle("map");
            }}
          >
            CARTE
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "mosaic"
            })}
            onClick={() => {
              //   this.toggle("mosaic");
            }}
          >
            MOSAIQUE
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default Tabs;
