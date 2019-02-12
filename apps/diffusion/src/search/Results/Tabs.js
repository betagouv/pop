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

    return (
      <Nav pills>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === "list" })} onClick={() => {}}>
            LISTE
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "map"
            })}
            onClick={() => {}}
          >
            CARTE
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "mosaic"
            })}
            onClick={() => {}}
          >
            MOSAIQUE
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default Tabs;
