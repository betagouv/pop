import React from 'react';

export default class Rule extends React.Component {
    render() {
        return (
            <div>Rule {this.props.id}
                <ValueSelector />
                <ActionElement/>
                <ValueEditor />
                <button onClick={() => this.props.onRemove(this.props.id)}>X</button>
            </div>
            )
    // }

    // onFieldChanged = (value) => {
    //     this.onElementChanged('field', value);
    // }

    // onOperatorChanged = (value) => {
    //     this.onElementChanged('operator', value);
    // }

    // onValueChanged = (value) => {
    //     this.onElementChanged('value', value);
    // }

    // onElementChanged = (property, value) => {
    //     const {id, schema: {onPropChange}} = this.props;

    //     onPropChange(property, value, id);
    // }

    // removeRule = (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     this.props.schema.onRuleRemove(this.props.id, this.props.parentId);
    // }


    }
}

const ValueEditor = (props) =>{
    return ( <input className="valueEditor" onChange={() => console.log('CHANGE')}/> )
}

const ActionElement = (props) =>{
    const choices = ['!==','=='].map(option => <option key={option} value={option}>{option}</option>)
    return (
        <select className="actionelement" onChange={() => console.log('CHANGE')}>
            {choices}
        </select>
    )
}

const ValueSelector = (props) =>{
    const choices = ['firstname','lastnam'].map(option => <option key={option} value={option}>{option}</option>)
    return (
        <select className="valueselector" onChange={() => console.log('CHANGE')}>
            {choices}
        </select>
    )
}