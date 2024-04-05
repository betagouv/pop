import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import ReactTags from "react-tag-input";
import { Button, Col, Input, Modal, Row } from "reactstrap";
import api from "../../services/api";
import ProducteurBaseLine from "./components/ProducteurBaseLine";
import "./createProducteur.css";

class CreateProducteur extends React.Component {
	state = {
		modal: false,
		indexMax: 0,
		label: "",
		baseList: [
			{
				index: 0,
				base: "",
				prefixes: [],
			},
		],
	};

	componentDidMount() {
		this.setState({
			baseList: [
				{
					index: 0,
					base: "",
					prefixes: [],
				},
			],
		});
	}

	//Méthode permettant de modifier la base de l'item à l'index key de la liste de base du composant parent
	handleUpdateBase(index, newItem) {
		this.setState({
			baseList: this.state.baseList.map((item) => {
				if (item.index === index) {
					item.base = newItem.base;
					item.prefixes = newItem.prefixes;
				}
				return item;
			}),
		});
	}

	//Méthode créant un nouveau producteur en fonction des valeurs en entrée
	async createProducteur() {
		this.setState({ loading: true });
		const { label, baseList } = this.state;
		const base = baseList;
		try {
			await api.createProducteur({ label, base });
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
		const newIndex = this.state.indexMax + 1;
		const newBaseList = this.state.baseList;
		const length = this.state.baseList.length;

		//Ajout d'un élément à chaque liste
		const newItem = { index: newIndex, base: "", prefixes: [] };
		newBaseList[length] = newItem;

		//Update le state avec la liste
		this.setState({ indexMax: newIndex });
		this.setState({ baseList: newBaseList });
	}

	//Méthode de suppression d'une ligne à l'index renseigné
	deleteBaseLine(index) {
		this.setState({
			baseList: this.state.baseList.filter((item) => item.index != index),
		});
	}

	renderModal() {
		return (
			<Modal
				isOpen={this.state.modal}
				toggle={() => this.setState({ modal: !this.state.modal })}
			>
				<h3>Ajouter un nouveau producteur</h3>
				<div className="error">{this.state.error}</div>
				<div className="input-container">
					<div>
						<div>Nom du producteur</div>
						<Input
							value={this.state.label}
							onChange={(e) =>
								this.setState({ label: e.target.value })
							}
						/>
					</div>
				</div>
				<div className="input-container">
					<div>
						{this.state.baseList.map((item) => (
							<ProducteurBaseLine
								key={item.index}
								index={item.index}
								base={item.base}
								prefixes={item.prefixes}
								handleUpdateBase={this.handleUpdateBase.bind(
									this,
								)}
								deleteBaseLine={this.deleteBaseLine.bind(this)}
							/>
						))}
					</div>

					<div className="addButton-container">
						<Button
							className="addBaseButton"
							onClick={() => this.addBaseLine()}
						>
							+
						</Button>
					</div>
				</div>
				<div className="button-container">
					<Button
						color="primary"
						onClick={this.createProducteur.bind(this)}
					>
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
				<Button
					className="button"
					color="primary"
					onClick={() => this.setState({ modal: true })}
				>
					Créer un nouveau producteur
				</Button>
			</div>
		);
	}
}

const mapStateToProps = ({ Auth }) => {
	return {
		group: Auth.user ? Auth.user.group : "",
		role: Auth.user ? Auth.user.role : "utilisateur",
	};
};

export default connect(mapStateToProps, {})(CreateProducteur);
