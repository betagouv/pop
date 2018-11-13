import React from "react";
import { Field } from "redux-form";
import { Input } from "reactstrap";
import autosize from "autosize";

import api from "../../../services/api";
import "./fieldInput.css";

class CustomInput extends React.Component {
  state = {
    suggestions: []
  };

  onSelect(e) {
    this.props.input.value = e;
    this.setState({ suggestions: [] });
  }

  componentDidMount() {
    autosize(this.textarea);
  }

  handleInputChange(str) {
    if (!this.props.thesaurus) {
      return;
    }
    if (str) {
      api.getThesaurus(this.props.thesaurus, str).then(values => {
        if (values) {
          const suggestions = values.map(e => ({ id: e.value, text: e.value }));
          this.setState({ suggestions });
        }
      });
    } else {
      this.setState({ suggestions: [] });
    }
  }

  renderSuggestion() {
    if (!this.state.suggestions.length) {
      return <div />;
    }
    const options = this.state.suggestions.map(r => (
      <li key={r.id} onClick={this.onSelect.bind(this, r.text)}>
        {r.text}
      </li>
    ));
    return <ul>{options}</ul>;
  }

  render() {
    if (Array.isArray(this.props.input.value)) {
      return (
        <div>
          Cette donnée est multiple(array) et devrait etre simple(string)
        </div>
      );
    }
    return (
      <div className="input">
        <textarea
          ref={c => (this.textarea = c)}
          {...this.props}
          value={this.props.input.value}
          onChange={e => {
            const str = String(e.target.value).replace("(c)", "©");
            this.handleInputChange();
            this.props.input.onChange(str);
          }}
        />
        {this.renderSuggestion()}
      </div>
    );
  }
}

export default ({ title, ...rest }) => {
  return (
    <div style={styles.container}>
      {title && <div style={styles.title}>{title}</div>}
      <Field component={CustomInput} {...rest} />
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
    minWidth: "100px",
    color: "#5a5a5a",
    fontStyle: "italic"
  }
};
