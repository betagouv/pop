import React from "react";

class Title extends React.Component {
  render() {
    const { fields, notice, content, small } = this.props;
    const hasVisibleFields = !!fields.filter(f =>
      Array.isArray(notice[f]) ? notice[f].length : notice[f]
    ).length;
    if (hasVisibleFields) {
      return small ? <h2 className="small">{content}</h2> : <h2>{content}</h2>;
    }
    return <div />;
  }
}

export default Title;
