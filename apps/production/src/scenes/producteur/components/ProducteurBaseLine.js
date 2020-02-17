import React from "react";
import { Button, Input } from "reactstrap";
import PrefixInput from "./PrefixInput";


export default class ProducteurBaseLine extends React.Component {  
    constructor(props){
        super(props);
        this.state = {}
    }


    setBase(index, base){
        const prefixes = this.props.prefixes;
        const newItem = {base, prefixes};
        this.props.handleUpdateBase(index, newItem);
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
            <div className="base-prefixes-fields">
                Base
                <div className="inline-container">
                    <Input
                        className="select-base"
                        type="select"
                        value={this.props.base}
                        onChange={(e => this.setBase(this.props.index, e.target.value) )}>
                        {bases}
                    </Input>
                    <Button
                        className="deleteBaseButton" onClick={() => this.props.deleteBaseLine(this.props.index)}>
                        -
                    </Button>
                </div>

                Préfixe(s)
                <PrefixInput key={0} index={this.props.index} base={this.props.base} prefixes={this.props.prefixes} handleUpdateBase={this.props.handleUpdateBase}/>
            </div>
            );
    }
  }