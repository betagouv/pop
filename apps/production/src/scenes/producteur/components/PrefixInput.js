import React from "react";
import ReactTags from "react-tag-input";

const Tags = ReactTags.WithContext;

export default class PrefixInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            prefixes: this.props.prefixes
        };
        console.log("handle prefixes = " + this.props.handleUpdatePrefixes);
    }
  
    handleDelete(i) {
      const arr = this.state.prefixes;
      const newArr = arr.filter((tag, index) => index !== i);
      this.setState({ prefixes: newArr});
      this.props.handleUpdatePrefixes(this.state.index, newArr);

    }
  
    handleAddition(tag) {
      const arr = this.state.prefixes;
      const newArr = arr.concat(tag.text);
      this.setState({ prefixes: newArr});
      this.props.handleUpdatePrefixes(this.state.index, newArr);

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
      if (!Array.isArray(this.state.prefixes)) {
        return (
          <div>
            {`Les préfixes devrait être une liste mais est un élément unique`}
          </div>
        );
      }
  
      const prefixes = this.state.prefixes;  
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