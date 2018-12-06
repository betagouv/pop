import React from "react";
import PropTypes from "prop-types";

export default class ContextProvider extends React.Component {
  static childContextTypes = {
    insertCss: PropTypes.func
  };
  getChildContext() {
    return { ...this.props.context };
  }

  render() {
    return React.cloneElement(this.props.children, { ...this.props });
  }
}
