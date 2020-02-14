import React from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Input, Row, Col } from "reactstrap";
import PrefixInput from "./PrefixInput";


export default class ProducteurBaseLine extends React.Component {  
    constructor(props){
        super(props);
        this.state = {
            BASE : this.props.baseList[this.props.index].base
        }
    }


    setBase(key, newBase){
        this.props.handleUpdateBase(this.props.index, newBase);
        this.setState({BASE: newBase});
    }

    render() {
        let bases = [
            "",
            "autor",
            "enluminures",
            "joconde",
            "memoire",
            "merimee",
            "mnr",
            "museo",
            "palissy"
        ];
        bases = bases.map(e => <option key={e}>{e}</option>);

        return (
            <div className="inline-fields">
                Base
                <Input
                    type="select"
                    value={this.state.BASE}
                    onChange={(e => this.setBase(this.props.index, e.target.value) )}>
                    {bases}
                </Input>
                Préfixe(s)
                <PrefixInput key={0} index={this.props.index} prefixes={this.props.baseList[this.props.index].prefixes} handleUpdatePrefixes={this.props.handleUpdatePrefixes}/>
            </div>
            );
    }
  }