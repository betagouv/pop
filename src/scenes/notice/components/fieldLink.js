import React from "react";
import { Field } from "redux-form";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import "./fieldLink.css";

class NoticeField extends React.Component {
  state = {
    modal: false,
    input: "hey"
  };

  renderNotices() {
    if (Array.isArray(this.props.input.value)) {
      const notices = this.props.input.value.map(value => {
        return (
          <Col m={3} key={value}>
            <Link to={this.props.url + value}>{value}</Link>
          </Col>
        );
      });
      // notices.push(<Col m={3} key='new' ><div className='notice-new' key='notice' onClick={() => { this.setState({ modal: true }) }}>Ajouter une notice</div> </Col>)
      return notices;
    } else {
      return <div>Ce champs devrait être multiple</div>;
    }
  }

  render() {
    return (
      <Row className="field-link">
        {/* {this.renderModal()} */}
        {this.renderNotices()}
      </Row>
    );
  }
}

export default ({ title, ...rest }) => {
  return (
    <div style={styles.container}>
      {title && <div style={styles.title}>{title}</div>}
      <Field component={NoticeField} {...rest} />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start"
  },
  title: {
    paddingRight: "15px",
    whiteSpace: "nowrap",
    minWidth: "100px",
    color: "#5a5a5a",
    fontStyle: "italic"
  }
};
