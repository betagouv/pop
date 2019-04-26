import React from "react";
import { Field } from "redux-form";
import ReactTags from "react-tag-input";
import { Input, Tooltip } from "reactstrap";
import autosize from "autosize";

import api from "../../../services/api";
import "./field.css";

const Tags = ReactTags.WithContext;

class TagsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };
  }

  handleDelete(i) {
    const arr = this.props.input.value;
    const newArr = arr.filter((tag, index) => index !== i);
    this.props.input.onChange(newArr);
  }

  handleAddition(tag) {
    const arr = this.props.input.value;
    const newArr = arr.concat(tag.text);
    this.props.input.onChange(newArr);
  }

  handleInputChange(str) {
    if (str && this.props.thesaurus) {
      api
        .getThesaurus(this.props.thesaurus, str)
        .then(values => {
          if (values) {
            const suggestions = values.map(e => ({
              id: e.value,
              text: e.value
            }));
            this.setState({ suggestions });
          }
        })
        .catch(e => {
          console.log("ERROR", error);
        });
    }
  }

  render() {
    if (!Array.isArray(this.props.input.value)) {
      return (
        <div>
          {`${this.props.input.name} devrait être multiple mais est : ${JSON.stringify(
            this.props.input.value
          )}`}{" "}
        </div>
      );
    }

    const { value } = this.props.input;

    return (
      <div>
        <Tags
          tags={
            value
              ? value.map(e => {
                  if (this.props.createUrl) {
                    const url = this.props.createUrl(e);
                    return {
                      id: e,
                      text: (
                        <a href={url} target="_blank">
                          {e}
                        </a>
                      )
                    };
                  }
                  return { id: e, text: e };
                })
              : []
          }
          suggestions={this.state.suggestions}
          handleDelete={this.handleDelete.bind(this)}
          handleAddition={this.handleAddition.bind(this)}
          handleInputChange={this.handleInputChange.bind(this)}
          autocomplete={0}
          placeholder="Ajouter une nouvelle entrée"
          autofocus={false}
          readOnly={this.props.disabled}
        />
      </div>
    );
  }
}

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

  async handleInputChange(str) {
    if (!this.props.thesaurus) {
      return;
    }
    if (str) {
      const values = await api.getThesaurus(this.props.thesaurus, str);
      if (values) {
        const suggestions = values.map(e => ({ id: e.value, text: e.value }));
        this.setState({ suggestions });
      }
    } else {
      if (this.state.suggestions.length) {
        this.setState({ suggestions: [] });
      }
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
      return <div>Cette donnée est multiple(array) et devrait etre simple(string)</div>;
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

export default class AbstractField extends React.Component {
  state = {
    tooltipOpen: false
  };
  render() {
    const { label, type, name, description, generated, deprecated, ...rest } = this.props;
    let desc = description || "En attente de description";

    let Comp = <div />;
    if (type === "String" || type === "Number") {
      Comp = <Field component={CustomInput} name={name} {...rest} />;
    } else if (type === "Array") {
      Comp = <Field component={TagsInput} name={name} {...rest} />;
    } else {
      Comp = <div />;
    }
    return (
      <div className="field">
        {(label || name) && (
          <div id={`Tooltip_${name.replace(".", "")}`}>{label ? `${label} (${name})` : name}</div>
        )}
        <Tooltip
          placement="right"
          isOpen={this.state.tooltipOpen}
          target={`Tooltip_${name.replace(".", "")}`}
          toggle={() =>
            this.setState({
              tooltipOpen: !this.state.tooltipOpen
            })
          }
        >
          {desc}
          {generated ? (
            <div>
              <br />
              Ce champ est généré et n'est pas modifiable.
            </div>
          ) : (
            ""
          )}
          {deprecated ? (
            <div>
              <br />
              Ce champ est déprécié.
            </div>
          ) : (
            ""
          )}
        </Tooltip>
        {Comp}
      </div>
    );
  }
}
