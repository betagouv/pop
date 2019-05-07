import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Home from "./home";
import Mh from "./MH";
import Joconde from "./joconde";
import Mnr from "./mnr";
import Inv from "./inv";
import Memoire from "./memoire";
import List from "./list";

class Import extends React.Component {
  render() {
    if (
      this.props.location.pathname !== `/import/list` &&
      this.props.group &&
      this.props.group !== "admin" &&
      this.props.location.pathname !== `/import/${this.props.group}`
    ) {
      return <Redirect to={`/import/${this.props.group}`} />;
    }
    return (
      <div>
        <Switch>
          <Route path={`/import/`} exact component={Home} />
          <Route path={`/import/memoire`} component={Memoire} />
          <Route path={`/import/mnr`} component={Mnr} />
          <Route path={`/import/joconde`} component={Joconde} />
          <Route path={`/import/mh`} component={Mh} />
          <Route path={`/import/inv`} component={Inv} />
          <Route path={`/import/list`} component={List} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => {
  return { group: Auth.user ? Auth.user.group : "" };
};

export default connect(
  mapStateToProps,
  {}
)(Import);
