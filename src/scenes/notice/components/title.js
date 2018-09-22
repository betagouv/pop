import React from 'react';

export default class Title extends React.Component {
  render() {
    const hasVisibleFields = !!this.props.fields.filter(
      f =>
        Array.isArray(this.props.notice[f])
          ? this.props.notice[f].length
          : this.props.notice[f]
    ).length;
    if (hasVisibleFields) {
      return this.props.h5 ? (
        <h5>{this.props.content}</h5>
      ) : (
        <h4>{this.props.content}</h4>
      );
    }
    return <div />;
  }
}
