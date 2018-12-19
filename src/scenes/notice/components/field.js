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
          {`${
            this.props.input.name
          } devrait être multiple mais est : ${JSON.stringify(
            this.props.input.value
          )}`}{" "}
        </div>
      );
    }

    return (
      <div>
        <Tags
          tags={
            this.props.input.value
              ? this.props.input.value.map(e => {
                  /* this is a little bit dirty. 
                It Was not suposed to have to build url in a tag component. 
                I hate put business logic inside generic componenent. 
                I also know they dont like the tag component 
                So it could come inside small refactor */

                  if (this.props.input.name === "LBASE") {
                    const prefix = e.substring(0, 2);
                    let url = "";
                    switch (prefix) {
                      case "EA":
                      case "PA":
                      case "IA":
                        url = `/notice/merimee/${e}`;
                        break;
                      case "IM":
                      case "PM":
                        url = `/notice/palissy/${e}`;
                        break;
                      default:
                        url = "";
                    }
                    return {
                      id: e,
                      text: <a href={url} target="_blank">{e}</a>
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

export default class AbstractField extends React.Component {
  state = {
    tooltipOpen: false
  };
  render() {
    const { label, type, name, description, ...rest } = this.props;

    let desc = description || "En attente de description" + "\n";

    let Comp = <div />;
    if (type === "String") {
      Comp = <Field component={CustomInput} name={name} {...rest} />;
    } else if (type === "Array") {
      Comp = <Field component={TagsInput} name={name} {...rest} />;
    }
    return (
      <div className="field">
        {(label || name) && (
          <div id={`Tooltip_${name}`}>
            {label ? `${label} (${name})` : name}
          </div>
        )}
        <Tooltip
          placement="right"
          isOpen={this.state.tooltipOpen}
          target={`Tooltip_${name}`}
          toggle={() =>
            this.setState({
              tooltipOpen: !this.state.tooltipOpen
            })
          }
        >
          {desc}
        </Tooltip>
        {Comp}
      </div>
    );
  }
}
