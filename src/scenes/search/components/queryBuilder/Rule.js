import React from 'react';

import { 
    ReactiveComponent ,
    ReactiveList,
} from '@appbaseio/reactivesearch';


export default class RuleComponent extends React.Component {

    state ={
        query : {}
    }

    onUpdate(valueSelected,actionSelected,resultSelected  ){
        const query = `{"aggs": {"DENO.keyword": {"terms": {"field": "DENO.keyword","order": {"_count": "desc"},"size": 10}}}}`
        this.setState({query : JSON.parse(query)});
    }

    render() {

        console.log('QUERY ', this.state.query)
        return (
             <ReactiveComponent
                componentId="CarSensor"
                defaultQuery={() => ( this.state.query)}
                >   
                    <Rule id={this.props.id} onRemove={this.props.onRemove} onUpdate={this.onUpdate.bind(this)}/>
                </ReactiveComponent>
            )
    }
}



 class Rule extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            valueSelected : '',
            actionSelected : '',
            resultSelected : '',
        }
    }

    update(){

        const { valueSelected , actionSelected, resultSelected} = this.state;
        console.log('UPDTAED', valueSelected , actionSelected, resultSelected);
    }

    render() {

        console.log('this.props.aggregations',this.props.aggregations)
        return (
            <div>Rule {this.props.id}
                <ValueSelector value={this.state.valueSelected} onChange={(e) => { 
                        this.setState({valueSelected:e.target.value}); 
                        this.update()
                    } 
                }/>
                <ActionElement value={this.state.actionSelected} onChange={(e) => { 
                        this.setState({actionSelected:e.target.value}); 
                        this.update()
                    } 
                }/>
                <ValueEditor value={this.state.resultSelected} onChange={(e) => { 
                        this.setState({resultSelected:e.target.value}); 
                        this.update()
                    } 
                }/>
                <button onClick={() => this.props.onRemove(this.props.id)}>X</button>
            </div>
            )
     
    }
}









const ValueEditor =  ({onChange,value, currentValueSelector}) =>{
    return ( 
        <div>
            <input 
                className="valueEditor" 
                value={value} 
                onChange={onChange}
            />
     </div>
 )
}

const ActionElement =  ({onChange,value}) =>{
    const choices = ['!==','=='].map(option => <option key={option} value={option}>{option}</option>)
    return (
        <select className="actionelement" value={value} onChange={onChange}>
            {choices}
        </select>
    )
}

const ValueSelector = ({onChange,value}) =>{
    const choices = ['Producteur','DENO'].map(option => <option key={option} value={option}>{option}</option>)
    return (
        <select className="valueselector" value={value} onChange={onChange}>
            {choices}
        </select>
    )
}