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

        //ALGO UN PEU CON ....
        let combinator = "ET";
        if (i === 0) {
            if (q.length === 1) {
                combinator = "ET";
            } else {
                combinator = q[1].combinator
            }
        } else {
            combinator = q[i].combinator;
        }

        if (combinator === "ET") {
            obj.must.push(q[i].query);
        } else {
            obj.should.push(q[i].query);
        }
    }

    return obj;
}

/*
{
    "query": {
        "bool": {
            "must": [
                {
                    "term": {"shape": "round"},
                    "bool": {
                        "should": [
                            {"term": {"color": "red"}},
                            {"term": {"color": "blue"}}
                        ]
                    }
                }
            ]
        }
    }
}
*/

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
        let queries = this.state.queries.filter(e => e.id !== id);
        queries = queries.map((q, i) => ({ ...q, id: i }));
        this.setState({ queries }, () => this.props.onUpdate(getQuery(queries)));
    }

    onUpdate(obj) {
        const queries = [...this.state.queries.slice(0, obj.id), obj, ...this.state.queries.slice(obj.id + 1)];
        console.log("onUpdate ", queries)
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
                {this.renderChildren()}
            </div>
        )
    }
}

