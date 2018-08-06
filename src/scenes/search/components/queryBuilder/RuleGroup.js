import React from 'react';
import Rule from './Rule';

export default class RuleGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schema: [],
            query: {},
            count: 0,
            type: 'AND'
        }
    }

    onRuleAdd() {
        const count = ++this.state.count;
        const newRule = { type: 'rule', id: this.props.id + count };
        this.setState({ count, schema: this.state.schema.concat(newRule) })
    }

    onGroupAdd() {
        const count = ++this.state.count;
        const newGroup = { type: 'group', id: this.props.id + count, schema: [] };
        this.setState({ count, schema: this.state.schema.concat(newGroup) })
    }

    onRemove(id) {
        const schema = this.state.schema.filter(e => e.id !== id)
        const query = this.state.query;
        delete query[id];

        this.setState({ schema, query }, () => this.props.onUpdate(query));
    }

    onUpdate({ id, valueSelected, actionSelected, resultSelected }) {
        const query = this.state.query;
        query[id] = { valueSelected, actionSelected, resultSelected }
        query.type = this.state.type;
        this.setState({ query }, () => this.props.onUpdate(query));
    }

    renderChildren() {
        return this.state.schema.map(({ type, id }) => {
            if (type === 'rule') {
                return <Rule key={id} id={id} onRemove={this.onRemove.bind(this)} onUpdate={this.onUpdate.bind(this)} fields={this.props.fields} />
            } else {
                return <RuleGroup key={id} id={id} onRemove={this.onRemove.bind(this)} onUpdate={this.onUpdate.bind(this)} fields={this.props.fields} />
            }
        });
    }

    render() {
        return (
            <div className='ruleGroup'>
                <Combinator value={this.state.type} onChange={(e) => this.setState({ type: e.target.value })} />
                <button onClick={this.onRuleAdd.bind(this)}>Ajouter une règle</button>
                {/* <button onClick={this.onGroupAdd.bind(this)}>Ajouter un groupe</button> */}
                <button className='closeButton' >X</button>
                {this.renderChildren()}
            </div>
        )
    }
}


const Combinator = (props) => {
    const choices = ['AND', 'OR'].map(option => <option key={option} value={option}>{option}</option>)
    return (
        <select selected="AND" value={props.value} className="combinator" onChange={props.onChange.bind(this)}>
            {choices}
        </select>
    )
}