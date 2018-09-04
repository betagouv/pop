import React from 'react';
import Rule from './Rule';


//Fonction pour merger des requetes unitaires
function getQuery(q) {
    let obj = {
        must: [],
        must_not: [],
        should: [],
        should_not: []
    };
    for (let i = 0; i < q.length; i++) {
        const combinator = (i + 1 > q.length - 1) ? "ET" : q[i + 1].combinator
        if (combinator === "ET") {
            obj.must.push(q[i].query);
        } else {
            obj.should.push(q[i].query);
        }
    }

    return obj;
}

export default class RuleGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            queries: []
        }
    }

    onRuleAdd() {
        this.setState({ queries: this.state.queries.concat({ id: this.state.queries.length }) })
    }

    onRemove(id) {
        const queries = this.state.queries.filter(e => e.id !== id)
        this.setState({ queries }, () => this.props.onUpdate(getQuery(queries)));
    }

    onUpdate(obj) {
        const queries = [...this.state.queries.slice(0, obj.id), obj, ...this.state.queries.slice(obj.id + 1),];
        this.setState({ queries }, () => this.props.onUpdate(getQuery(queries)));
    }

    renderChildren() {
        return this.state.queries.map(({ id }) => {
            return <Rule key={id} id={id} onRemove={this.onRemove.bind(this)} onUpdate={this.onUpdate.bind(this)} fields={this.props.fields} />
        });
    }

    render() {
        return (
            <div className='ruleGroup'>
                <button onClick={this.onRuleAdd.bind(this)}>Ajouter une règle</button>
                <button className='closeButton' >X</button>
                {this.renderChildren()}
            </div>
        )
    }
}

