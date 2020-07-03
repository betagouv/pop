import React from "react";
import { Button, Modal, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

import api from "../../services/api";
import "./createProducteur.css";
import ProducteurBaseLine from "./components/ProducteurBaseLine";

class UpdateProducteur extends React.Component {
  state = {
    modal: false,
    indexMax: this.props.baseList.length - 1,
    label: this.props.label,
    baseList: this.props.baseList
  };

  componentDidMount(){
    this.setState({ baseList : 
      this.state.baseList.map((item, index) => 
        {
          item.index = index;
          return item;
        }
      )    
    })
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({ modal: true });
  };

  //Méthode permettant de modifier la base de l'item à l'index key de la liste de base du composant parent
  handleUpdateBase(index, newItem){
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

  //Ajoute un élément vide à baseList contenant la liste des bases et leurs préfixes, et un component à la liste
  async addBaseLine() {
    //Récupération des listes actuelles dans le state, et de la taille des listes
    let newIndex = this.state.indexMax + 1;
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

  //Méthode permettant de modifier un producteur existant
  async updateProducteur() {
    let _id = this.props._id;
    this.setState({ loading: true });
    let { label, baseList } = this.state;
    let base = baseList;
    try {
        await api.updateProducteur({_id, label, base });
        this.setState({ modal: false });
        toastr.success("Le producteur a été modifié.");
        this.props.callback();
    } catch (error) {
        this.setState({ error: error.msg });
    }
  }

  renderModal() {
    return (
      <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })}>
        <h3>Modifier un producteur</h3>
        <div className="error">{this.state.error}</div>
        <div className="input-container">
          <div>
            <div>Nom du producteur</div>
            <Input
              value={this.state.label}
              onChange={e => this.setState({ label: e.target.value })}
            />
          </div>
        </div>
        <div className="input-container">
          <div>
            {this.state.baseList.map((item) =>
                <ProducteurBaseLine
                    key={item.index}
                    index={item.index}
                    base={item.base}
                    prefixes={item.prefixes}
                    handleUpdateBase={this.handleUpdateBase.bind(this)}
                    deleteBaseLine={this.deleteBaseLine.bind(this)}
                />
              )}
          </div>

          <div className="addButton-container">
            <Button
              className="addBaseButton" onClick={() => this.addBaseLine()}>
              +
            </Button>
          </div>
        </div>
        <div className="button-container">
          <Button color="primary" onClick={this.updateProducteur.bind(this)}>
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
    authUserGroup: Auth.user.group,
    authUserRole: Auth.user.role
  };
};

export default connect(
  mapStateToProps,
  {}
)(UpdateProducteur);
