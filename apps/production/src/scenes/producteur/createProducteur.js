import React from "react";
import { Button, Modal, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import ReactTags from "react-tag-input";
import api from "../../services/api";
import "./createProducteur.css";
import ProducteurBaseLine from "./components/ProducteurBaseLine";
import PrefixInput from "./components/PrefixInput";

const Tags = ReactTags.WithContext;

class CreateProducteur extends React.Component {
    
    state = {
        modal: false,
        indexMax: 0,
        LABEL: "",
        baseList:   [{
                        index: 0,
                        base: "",
                        prefixes:[]
                    }]
    };

    //Méthode permettant de modifier la base de l'item à l'index key de la liste de base du composant parent
    handleUpdateBase(index, newItem){
        console.log("index updated = " + index);
        this.setState({ baseList:
            this.state.baseList.map(item => 
                {
                    if(item.index === index){
                        item.base = newItem.base;
                        item.prefixes = newItem.prefixes;
                    }
                    return item;
                }
            ) 
        });
    }
    

    //Méthode créant un nouveau producteur en fonction des valeurs en entrée
    async createProducteur() {
        this.setState({ loading: true });
        let { LABEL, baseList } = this.state;
        let BASE = baseList;
        try {
            await api.createProducteur({ LABEL, BASE });
            this.setState({ modal: false });
            toastr.success("Le producteur a été ajouté.");
            this.props.callback();
        } catch (error) {
            this.setState({ error: error.msg });
        }
    }

    //Ajoute un élément vide à baseList contenant la liste des bases et leurs préfixes, et un component à la liste
    async addBaseLine() {
        //Récupération des listes actuelles dans le state, et de la taille des listes
        let newIndex = this.state.indexMax + 1;
        console.log("indexMax = " + newIndex);
        let newBaseList = this.state.baseList;
        let length = this.state.baseList.length;

        //Ajout d'un élément à chaque liste
        let newItem = { index: newIndex, base: "", prefixes:[] };
        newBaseList[length] = newItem;

        //Update le state avec la liste
        this.setState({indexMax: newIndex});
        this.setState({ baseList: newBaseList });
    }

    //Méthode de suppression d'une ligne à l'index renseigné
    deleteBaseLine(index) {
        this.setState({ baseList: this.state.baseList.filter( item => item.index != index) });
    }


    renderModal() {
        return (
        <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })}>
            <h3>Ajouter un nouveau producteur</h3>
            <div className="error">{this.state.error}</div>
            <div className="input-container">
                <div>
                    <div>Nom du producteur</div>
                    <Input
                        value={this.state.LABEL}
                        onChange={e => this.setState({ LABEL: e.target.value })}
                    />
                </div>
            </div>
            <div className="input-container">
                <div>
                    {this.state.baseList.map((item) =>
                            <ProducteurBaseLine
                                key={item.index}
                                index={item.index}
                                BASE={item.base}
                                prefixes={item.prefixes}
                                handleUpdateBase={this.handleUpdateBase.bind(this)}
                                deleteBaseLine={this.deleteBaseLine.bind(this)}
                            />)}
                </div>

                <div className="addButton-container">
                    <Button
                        className="addBaseButton" onClick={() => this.addBaseLine()}>
                        +
                    </Button>
                </div>
            </div>
            <div className="button-container">
            <Button color="primary" onClick={this.createProducteur.bind(this)}>
                Créer
            </Button>
            </div>
        </Modal>
        );
    }

  render() {
        return (
            <div className="createProducteur">
                {this.renderModal()}
                <Button className="button" color="primary" onClick={() => this.setState({ modal: true })}>
                Créer un nouveau producteur
                </Button>
            </div>
        );
  }
}

const mapStateToProps = ({ Auth }) => {
  return {
    group: Auth.user ? Auth.user.group : "",
    role: Auth.user ? Auth.user.role : "utilisateur"
  };
};

export default connect(
  mapStateToProps,
  {}
)(CreateProducteur);
