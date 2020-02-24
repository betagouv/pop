import React from "react";
import { Button, Input } from "reactstrap";


export default class ProducteurLine extends React.Component {  
    constructor(props){
        super(props);
        this.state = {}
    }


    setProducteur(index, producteur){
        this.props.handleUpdateProducteurs(index, producteur);
    }

    render() {
        let prods = [<option key={""}>{""}</option>]
        prods.push(this.props.producteurs.map(e => <option key={e.LABEL}>{e.LABEL}</option>));

        return (
            <div className="inline-container">
                <Input
                    className="select-producteur"
                    type="select"
                    value={this.props.label}
                    onChange={(e => this.setProducteur(this.props.index, e.target.value) )}>
                    {prods}
                </Input>
                <Button
                    className="deleteProducteurButton" onClick={() => this.props.deleteProducteurLine(this.props.index)}>
                    -
                </Button>
            </div>
            );
    }
  }