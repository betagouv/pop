import React from "react";
import ReactTags from "react-tag-input";

const Tags = ReactTags.WithContext;

export default class PrefixInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  
    handleDelete(i) {
      const arr = this.props.prefixes;
      const prefixes = arr.filter((tag, index) => index !== i);

      const base = this.props.base;
      const newItem = {base, prefixes};
      this.props.handleUpdateBase(this.props.index, newItem);
    }
  
    handleAddition(tag) {
      const arr = this.props.prefixes;
      const prefixes = arr.concat(tag.text);

      const base = this.props.base;
      const newItem = {base, prefixes};
      this.props.handleUpdateBase(this.props.index, newItem);
    }
  
    render() {
      if (!Array.isArray(this.props.prefixes)) {
        return (
          <div>
            {`Les préfixes devrait être une liste mais est un élément unique`}
          </div>
        );
      }
  
      const prefixes = this.props.prefixes;  
      return (
        <div>
          <Tags
            tags={
                prefixes? prefixes.map(e => {
                    return { 
                        id: e,
                        text: e
                    };
                })
                : []
            }
            handleDelete={this.handleDelete.bind(this)}
            handleAddition={this.handleAddition.bind(this)}
            autocomplete={0}
            placeholder="Ajouter une nouvelle entrée"
            autofocus={false}
            readOnly={this.props.disabled}
          />
        </div>
      );
    }
  }