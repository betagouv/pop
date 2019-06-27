import React, { Component } from "react";
import ReactTags from "react-tag-input";
const Tags = ReactTags.WithContext;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: props.value,
      str: ""
    };
  }

  handleDelete(i) {
    const arr = this.state.arr.filter((tag, index) => index !== i);
    this.setState({ arr });
    this.props.onChange(arr);
  }

  handleAddition(tag) {
    const arr = this.state.arr.concat(tag.text);
    this.setState({ arr });
    this.props.onChange(arr);
  }

  handleInputBlur() {
    if (this.state.str) {
      this.handleAddition({ text: this.state.str });
    }
  }

  handleInputChange(str) {
    console.log("handleInputChange", str);
    this.setState({ str });
  }

  render() {
    return (
      <div>
        <Tags
          tags={this.state.arr.map(text => ({ id: text, text }))}
          handleDelete={this.handleDelete.bind(this)}
          handleAddition={this.handleAddition.bind(this)}
          handleInputChange={this.handleInputChange.bind(this)}
          handleInputBlur={this.handleInputBlur.bind(this)}
          placeholder={this.props.placeholder}
          autocomplete={0}
          autofocus={false}
        />
        <small className="text-muted">
          Appuyez sur « entrée » pour ajouter un nouveau code Muséo
        </small>
      </div>
    );
  }
}

export default index;
