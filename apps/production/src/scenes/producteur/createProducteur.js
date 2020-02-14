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
        LABEL: "",
        baseList:   [{
                        base: "",
                        prefixes:[]
                    }],
        componentBaseList: [<ProducteurBaseLine key={0} index={0} baseList={ [{ base: "", prefixes:[] }] } handleUpdateBase={this.handleUpdateBase.bind(this)} handleUpdatePrefixes={this.handleUpdatePrefixes.bind(this)}/>]

    };

    //Méthode permettant de modifier la base de l'item à l'index key de la liste de base du composant parent
    handleUpdateBase(key, newBase){
        let newBaseList = this.state.baseList;
        newBaseList[key].base = newBase;
        this.setState({ baseList: newBaseList });
    }
    
    //Méthode permettant de modifier les prefixes de l'item à l'index key de la liste de base du composant parent
    handleUpdatePrefixes(key, newPrefixes){
        let newBaseList = this.state.baseList;
        newBaseList[key].prefixes = newPrefixes;
        this.setState({ baseList: newBaseList });
    }

    //Méthode créant un nouveau producteur en fonction des valeurs en entrée
    async createProducteur() {
        this.setState({ loading: true });
        let { LABEL, BASE } = this.state;
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
        let newComponentBaseList = this.state.componentBaseList;
        let newBaseList = this.state.baseList;
        let length = newComponentBaseList.length;

        //Ajout d'un élément à chaque liste
        let newItem =  { base: "", prefixes:[] };
        newBaseList[length] = newItem;
        newComponentBaseList[length] = <ProducteurBaseLine key={length} index={length} baseList={newBaseList} handleUpdateBase={this.handleUpdateBase.bind(this)} handleUpdatePrefixes={this.handleUpdatePrefixes.bind(this)} />;
        

        //Update le state avec chaque liste
        this.setState({ componentBaseList: newComponentBaseList });
        this.setState({ baseList: newBaseList });
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
                    {this.state.componentBaseList.map(e =>
                        <div>{e}</div>
                     )}
                </div>

                <Button
                    className="addBaseButton" onClick={() => this.addBaseLine()}>
                    +
                </Button>
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
