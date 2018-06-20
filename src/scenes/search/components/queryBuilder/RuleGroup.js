import React from 'react';
import Rule from './Rule';

export default class RuleGroup extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            schema : [],
            count : 0,
        }

    }

    onRuleAdd(rule, parentId) { 
        const count = ++this.state.count;
        const newRule = {type:'rule', id : count};
        this.setState({count, schema :  this.state.schema.concat(newRule)})
    }

    onGroupAdd(group, parentId) {
        const count = ++this.state.count;
        const newGroup = {type:'group', id : count, schema : []};
        this.setState({count, schema : this.state.schema.concat(newGroup)})
    }

    onRemove(id) {  
        const schema = this.state.schema.filter(e => e.id !== id)
        this.setState({schema})
    }

    updateQuery(){
        console.log('update')
    }

    renderChildren(){
        console.log(this.state.schema)
        return this.state.schema.map(({type,id}) => {
            if(type === 'rule'){
                return <Rule id={id} onRemove={this.onRemove.bind(this) }/>
            }else{
                return <RuleGroup id={id} onRemove={this.onRemove.bind(this) }/>
            }
        });
    }

    render() {
        console.log('this.props.aggregations',this.props.aggregations)
        return (
            <div>
                <Combinator />
                <button onClick={this.onRuleAdd.bind(this)}>Add Rule</button>
                <button onClick={this.onGroupAdd.bind(this)}>Add Group</button>
                <button>X</button>
                {this.renderChildren()}
            </div>
        )
    }
}


const Combinator = (props) =>{
    const choices = ['AND','OR'].map(option => <option key={option} value={option}>{option}</option>)
    return (
        <select className="combinator" onChange={() => console.log('CHANGE')}>
            {choices}
        </select>
    )
}