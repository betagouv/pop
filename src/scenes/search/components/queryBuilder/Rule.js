import React from 'react';
import Autocomplete from 'react-autocomplete';

import {
    ReactiveComponent
} from '@appbaseio/reactivesearch';


export default class RuleComponent extends React.Component {

    state = {
        query: {}
    }

    onUpdate(valueSelected, actionSelected, resultSelected) {
        if (valueSelected) {
            const query = `{"aggs": {"${valueSelected}.keyword": {"terms": {"field": "${valueSelected}.keyword","include" : ".*${resultSelected}.*","order": {"_count": "desc"},"size": 10}}}}`
            this.setState({ query: JSON.parse(query) });
        } else {
            this.setState({ query: {} });
        }
        console.log('ONUPDATE', valueSelected, actionSelected, resultSelected)
    }

    render() {
        return (
            <ReactiveComponent
                componentId={`Rule${this.props.id}`}
                defaultQuery={() => (this.state.query)}
            >
                <Rule id={this.props.id} onRemove={this.props.onRemove} onUpdate={this.onUpdate.bind(this)} />
            </ReactiveComponent>
        )
    }
}

class Rule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSelected: '',
            actionSelected: '',
            resultSelected: '',
        }
    }

    update() {
        const { valueSelected, actionSelected, resultSelected } = this.state;
        this.props.onUpdate(valueSelected, actionSelected, resultSelected)
    }


    render() {
        return (
            <div className='rule'>Rule {this.props.id}
                <ValueSelector
                    value={this.state.valueSelected}
                    onChange={(e) => {
                        this.setState({ valueSelected: e.target.value }, () => { this.update() })
                    }} />
                <ActionElement
                    value={this.state.actionSelected}
                    onChange={(e) => {
                        this.setState({ actionSelected: e.target.value }, () => { this.update() })
                    }} />
                <ValueEditor
                    value={this.state.resultSelected}
                    aggregations={this.props.aggregations}
                    onChange={(e) => {
                        this.setState({ resultSelected: e.target.value }, () => { this.update() })
                    }}
                />
                <button onClick={() => this.props.onRemove(this.props.id)}>X</button>
            </div>
        )

    }
}




class ValueEditor extends React.Component {

    state = {
        focused: false,
        selected: 0
    }

    renderSuggestion() {
        if (this.state.focused && this.props.aggregations && Object.keys(this.props.aggregations).length) {
            const key = Object.keys(this.props.aggregations)[0];
            const options = this.props.aggregations[key].buckets.map(e => (
                <li
                    key={e.key}
                >
                    {e.key}
                </li>
            ));
            return <ul>{options}</ul>
        }
        return <div />
    }

    onSelect(value) {
        this.props.onChange({ target: { value } })
        this.setState({ suggestions: [] })
    }

    onBlur() {
        if (this.props.aggregations && Object.keys(this.props.aggregations).length) {
            const key = Object.keys(this.props.aggregations)[0];
            const value = this.props.aggregations[key].buckets[this.state.selected].key;
            this.props.onChange({ target: { value } })
        }
        this.setState({ focused: false })
    }

    onFocus() {
        this.setState({ focused: true })
    }

    render() {
        return (
            <div>
                <Autocomplete
                    getItemValue={(item) => item.label}
                    items={[
                        { label: 'apple' },
                        { label: 'banana' },
                        { label: 'pear' }
                    ]}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                        </div>
                    }
                    value='value'
                    onChange={(e) => value = e.target.value}
                    onSelect={(val) => value = val}
                    />
                <input
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    className="valueEditor"
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
                {this.renderSuggestion()}
            </div>
        )
    }
}


const ActionElement = ({ onChange, value }) => {
    const choices = ['!==', '=='].map(option => <option key={option} value={option}>{option}</option>)
    return (
        <select className="actionelement" value={value} onChange={onChange}>
            {choices}
        </select>
    )
}

const ValueSelector = ({ onChange, value }) => {
    const choices = [
        'Producteur',
        'DENO',
        'DENQ',
        'COPY',
        'ETUD',
        'AUTP',
        'TICO',
        'GENR',
        'PDEN',
        'VOCA',
        'APPL',
        'ACTU',
        'PART',
        'COLL',
        'REG',
        'DPT',
        'COM',
        'CANT',
        'LIEU',
        'ADRS',
        'EDIF',
        'TOIT'].map(option => <option key={option} value={option}>{option}</option>)
    return (
        <select className="valueselector" value={value} onChange={onChange}>
            {choices}
        </select>
    )
}