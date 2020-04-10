import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "reactstrap";
import Cookies from 'universal-cookie';

export default class BucketButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {pressed: false}
    }

    //Méthode permettant d'ajouter la notice au panier
    addToBucket(base, ref){

        //Récupération du panier actuel dans les cookies
        const cookies = new Cookies();
        let currentBucket = cookies.get("currentBucket") || [];

        //Si on a bien une ref et une base, on ajoute la notice au panier
        if(base && ref){
            let isAlreadyInBucket = false;
            currentBucket.map( item => {
                if(item.ref === ref && item.base === base){
                    isAlreadyInBucket = true;
                }
            })
            if(!isAlreadyInBucket){
                currentBucket.push({ref: ref, base: base});
                //Transformation de la liste de notice au format json et modification du cookie
                var jsonCurrentBucket = JSON.stringify(currentBucket);
                cookies.set("currentBucket", jsonCurrentBucket, { path: '/', overwrite: true });
            }
            this.setState({pressed : true});
        }    
    }
        //Méthode permettant d'ajouter la notice au panier
        checkInBucket(base, ref){

            //Récupération du panier actuel dans les cookies
            const cookies = new Cookies();
            let currentBucket = cookies.get("currentBucket") || [];
    
            //Si on a bien une ref et une base, on ajoute la notice au panier
            if(base && ref){
                let isAlreadyInBucket = false;
                currentBucket.map( item => {
                    if(item.ref === ref && item.base === base){
                        isAlreadyInBucket = true;
                    }
                })
                if(isAlreadyInBucket){
                    return true;
                }   
            }
            return false
        }

    render() {
        return (
            <div>
                <div>
                    {this.props.removeFromBucket? 
                    <div className="btn btn-outline-danger d-none d-sm-block" onClick={() => this.props.removeFromBucket(this.props.reference)}>
                        <div className="btn-bucket">
                            <div>Supprimer</div>
                            <FontAwesomeIcon 
                                className="icon-bucket"
                                icon="shopping-cart"
                                style={{marginLeft: '8px', fontSize: '20px'}}
                            />
                        </div>
                    </div> :
                    <div className={`btn btn-outline-success d-none d-sm-block ${this.checkInBucket(this.props.base, this.props.reference) ? "pressed" : ""}`} onClick={() => this.addToBucket(this.props.base, this.props.reference)}>
                        <div className="btn-bucket">
                            <div>Ajouter au panier</div>
                            <FontAwesomeIcon 
                                className="icon-bucket"
                                icon="cart-arrow-down"
                                style={{marginLeft: '8px', fontSize: '20px'}}
                            />
                        </div>
                    </div>
                    }
                </div>
                <style jsx>{`
                    .btn-bucket{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-end;
                    }

                    .btn-outline-success:hover{
                        background-color: #28a745;
                        color: #fff;
                        border-color: #28a745;
                    }

                    .btn-outline-success{
                        background-color: #fff;
                        color: #221529;;
                        border-color: #221529;
                    }

                    .pressed{
                        background-color: #fff;
                        color: #28a745;
                        border-color: #28a745;
                    }


                `}</style>
            </div>
        );
    }
}