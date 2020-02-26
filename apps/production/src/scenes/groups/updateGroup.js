import React from "react";
import { Button, Modal, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import api from "../../services/api";
import "./createGroup.css";
import ProducteurLine from "./components/ProducteurLine";

class UpdateGroup extends React.Component {
    
    state = {
        modal: false,
        indexMax: this.props.producteurList.length-1,
        label: this.props.label,
        producteurList: this.props.producteurList
    };

    //Au chargement de la page, attribue un index à chaque item
    componentDidMount(){
        this.setState({ producteurList : 
            this.props.producteurList.map((item, index) => {return {index: index, label: item}})
        })
    }

    //Au clic sur le bouton modifier, ouvre la fenêtre modale de modification du groupe
    handleClick = e => {
        e.preventDefault();
        this.setState({ modal: true });
    };

    //Méthode permettant de modifier la base de l'item à l'index key de la liste de base du composant parent
    handleUpdateProducteurs(index, newItem){
        this.setState({ producteurList:
            this.state.producteurList.map(item => 
                {
                    if(item.index === index){
                        item.label = newItem;
                    }
                    return item;
                }
            ) 
        });
    }

    //Ajoute un élément vide à producteurList contenant la liste des producteurs
    async addProducteurLine() {
        //Récupération des listes actuelles dans le state, et de la taille des listes
        let newIndex = this.state.indexMax + 1;
        let newProducteurList = this.state.producteurList;
        let length = this.state.producteurList.length;

        //Ajout d'un élément à chaque liste
        newProducteurList[length] = {index: newIndex, label:""};

        //Update le state avec la liste
        this.setState({indexMax: newIndex});
        this.setState({ producteurList: newProducteurList });
    }

    //Méthode de suppression d'une ligne à l'index renseigné
    deleteProducteurLine(index) {
        this.setState({ producteurList: this.state.producteurList.filter( item => item.index != index) });
    }


    //Méthode créant un nouveau producteur en fonction des valeurs en entrée
    async updateGroup() {
        this.setState({ loading: true });
        let { label, producteurList } = this.state;
        let _id = this.props._id;
        let producteurs = [];

        producteurList.map((item, index) => {
            producteurs[index] = item.label;
        });
        
        try {
            await api.updateGroup({ _id, label, producteurs });
            this.setState({ modal: false });
            toastr.success("Le groupe a été ajouté.");
            this.props.callback();
        } catch (error) {
            this.setState({ error: error.msg });
        }
    }


    renderModal() {
        return (
        <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })}>
            <h3>Ajouter un nouveau groupe</h3>
            <div className="error">{this.state.error}</div>
            <div className="input-container">
                <div>
                    <div>Nom du groupe</div>
                    <Input
                        value={this.state.label}
                        onChange={e => this.setState({ label: e.target.value })}
                    />
                </div>
            </div>
            <div className="input-container">
            <div>Producteur(s) associé(s)</div>
                {this.state.producteurList.map((item) =>
                        <ProducteurLine
                            key={item.index}
                            index={item.index}
                            label={item.label}
                            producteurs={this.props.producteurs}
                            handleUpdateProducteurs={this.handleUpdateProducteurs.bind(this)}
                            deleteProducteurLine={this.deleteProducteurLine.bind(this)}
                        />)}

                <div className="addButton-container">
                    <Button
                        className="addProducteurButton" onClick={() => this.addProducteurLine()}>
                        +
                    </Button>
                </div>
            </div>
            <div className="button-container">
            <Button color="primary" onClick={this.updateGroup.bind(this)}>
                Modifier
            </Button>
            </div>
        </Modal>
        );
    }

    render() {
        return (
            <div>
                {this.renderModal()}
                <a href="#" onClick={this.handleClick}>
                Modifier
                </a>
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
)(UpdateGroup);
