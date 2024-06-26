import queryString from "query-string";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Button, Input, Modal } from "reactstrap";
import api from "../../../services/api";

class Gallery extends Component {
	state = {
		modal: false,
		name: "",
		description: "",
		view: "list",
		error: "",
		image: "",
	};

	async handleClick() {
		const params = queryString.parse(window.location.search);
		const { name, description, view, image } = this.state;
		const { institution, email } = this.props;

		if (!name) {
			this.setState({ error: "Le nom est obligatoire" });
			return;
		}

		params.mode = "advanced";
		params.base = this.props.base;
		params.view = view;

		const obj = {
			params,
			name,
			institution,
			createdBy: email,
			description,
		};

		try {
			await api.createGallery(obj, image);
			this.setState({ modal: false });
			toastr.success(`Gallery ${this.state.name} créée`);
		} catch (e) {
			console.log("errors", e);
		}
	}
	renderModal() {
		return (
			<Modal
				isOpen={this.state.modal}
				toggle={() => this.setState({ modal: !this.state.modal })}
				size="lg"
			>
				<div className="input-container">
					<div>
						<p>
							Vous pouvez sauvegarder votre recherche actuelle.
							Elle sera ensuite accessible dans la section galerie
							et partageable. Cette fonctionnalitée est encore en
							construction ! On est preneurs de retours !
						</p>
						<div style={{ color: "red" }}>{this.state.error}</div>
						<div>Nom</div>
						<Input
							value={this.state.name}
							onChange={(e) =>
								this.setState({ name: e.target.value })
							}
						/>
						<div>Description</div>
						<Input
							type="textarea"
							value={this.state.description}
							onChange={(e) =>
								this.setState({ description: e.target.value })
							}
						/>
						<div>Affichage</div>
						<select
							onChange={(e) =>
								this.setState({ view: e.target.value })
							}
							value={this.state.view}
						>
							<option value="list">Liste</option>
							<option value="map">Carte</option>
							<option value="mosaic">Mosaique</option>
						</select>
						* <div>Illustrer la galerie</div>
						<Dropzone
							onDrop={(acceptedFiles) => {
								this.setState({ image: acceptedFiles[0] });
							}}
						>
							{({ getRootProps, getInputProps }) => (
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									{this.state.image ? (
										<img
											src={URL.createObjectURL(
												this.state.image,
											)}
											style={{
												width: "100%",
												height: "100%",
											}}
										/>
									) : (
										<div>Ajoutez ici une image</div>
									)}
								</div>
							)}
						</Dropzone>
					</div>
					<Button
						color="primary"
						style={{ marginTop: "10px" }}
						onClick={this.handleClick.bind(this)}
					>
						Valider
					</Button>
				</div>
			</Modal>
		);
	}

	render() {
		// Only admin can create gallery.
		if (
			!(
				this.props.role === "administrateur" &&
				this.props.group === "admin"
			)
		) {
			return null;
		}
		return (
			<div>
				{this.renderModal()}
				<Button
					color="primary"
					onClick={() => this.setState({ modal: true })}
				>
					Créer une galerie
				</Button>
			</div>
		);
	}
}

const mapStateToProps = ({ Auth }) => {
	const { institution, email, role, group } = Auth.user;
	return { institution, email, role, group };
};

export default connect(mapStateToProps, {})(Gallery);
