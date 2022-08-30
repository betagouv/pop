import React from "react";
import { Field } from "redux-form";
import ReactTags from "react-tag-input";
import { UncontrolledTooltip } from "reactstrap";
import autosize from "autosize";
import api from "../../../services/api";
import "./field.css";

const Tags = ReactTags.WithContext;

class TagsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { suggestions: [] };
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

    if (str && this.props.idthesaurus) {
      api
        .autocompleteThesaurus(this.props.idthesaurus, str)
        .then(response => {
          if (response) {
            const values = JSON.parse(response.body);
            const suggestions = values.map(e => ({
              id: e.label,
              text: e.label,
              isAltLabel: e.isAltLabel
            }))
            .filter( val => !val.isAltLabel);
            this.setState({ suggestions });
          }
        })
        .catch(e => {
          console.log("ERROR", e);
        });
    } else if (str && this.props.thesaurus) {
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
    } else if (str && this.props.input.name === "TYPID") {
      //Ticket 35635
      const values = ["collectivité", "organisation", "personne", "famille", "autre"]
      const suggestions = values.map(e => ({
        id: e,
        text: e
      }));
      this.setState({ suggestions });
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
                      <a href={url} target="_blank" rel="noopener">
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

class TextInput extends React.Component {
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
    console.log(this.props, str);

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
    return <ul style={{ position: "absolute", zIndex: 1000 }}>{options}</ul>;
  }

  render() {
    if (Array.isArray(this.props.input.value)) {
      return <div>Cette donnée est multiple(array) et devrait être simple(string)</div>;
    }
    return (
      <div className="input">
        <textarea
          ref={c => (this.textarea = c)}
          {...this.props}
          value={this.props.input.value}
          onChange={e => {
            const str = String(e.target.value).replace("(c)", "©");
            this.handleInputChange(str);
            this.props.input.onChange(str);
          }}
        />
        {this.renderSuggestion()}
      </div>
    );
  }
}

const TooltipComp = ({ deprecated, generated, description, name, hidedescriptionifempty }) => {
  const content = [];
  if (description) {
    content.push(<div>{description}</div>);
  } else if (!hidedescriptionifempty) {
    content.push(<div>En attente de description</div>);
  }

  if (generated) {
    content.push(<div>Ce champ est généré et n'est pas modifiable.</div>);
  }
  if (deprecated) {
    content.push(<div>Ce champ est déprécié.</div>);
  }

  return (
    <UncontrolledTooltip placement="top" target={`Tooltip_${name.replace(".", "")}`}>
      {content}
    </UncontrolledTooltip>
  );
};

export default class AbstractField extends React.Component {
  render() {
    const { label, type, name, description, generated, deprecated, hidedescriptionifempty, ...rest } = this.props;

    let Child = <div />;
    if (type === "String" || type === "Number") {
      Child = <Field component={TextInput} name={name} {...rest} />;
    } else if (type === "Array") {
      Child = <Field component={TagsInput} name={name} {...rest} />;
    } else {
      Child = <div />;
    }

    const title = label ? `${label} (${name})` : name;

    //Permet de ne pas afficher le bloc de description si besoin 
    if (!description && !generated && !deprecated && this.props.hidedescriptionifempty) {
      return (
        <div className="field">
          {title && <div id={`Tooltip_${name.replace(".", "")}`}>{title}</div>}
          {Child}
        </div>
      );
    }
    else {
      return (
        <div className="field">
          {title && <div id={`Tooltip_${name.replace(".", "")}`}>{title}</div>}
          <TooltipComp
            deprecated={deprecated}
            description={description}
            generated={generated}
            name={name}
            hidedescriptionifempty={hidedescriptionifempty}
          />
          {Child}
        </div>
      );
    }

  }
}
