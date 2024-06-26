import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Button, Col, Input, Modal, Row } from "reactstrap";

import Tags from "../../components/Tags";
import api from "../../services/api";
import "./createUser.css";

class UpdateUser extends React.Component {
	state = {
		modal: false,
		email: this.props.user.email,
		prenom: this.props.user.prenom,
		nom: this.props.user.nom,
		institution: this.props.user.institution,
		group: this.props.user.group,
		role: this.props.user.role,
		museofile: this.props.user.museofile,
		isBloqued: this.props.user.isBloqued,
		isFormChanged: false,
		loading: false,
		error: "",
	};

	handleClick = (e) => {
		e.preventDefault();
		this.setState({ modal: true });
	};

	async updateUser() {
		try {
			this.setState({ loading: true });
			const {
				group,
				email,
				role,
				institution,
				prenom,
				nom,
				museofile,
				isBloqued,
			} = this.state;
			await api.updateUser({
				email,
				nom,
				prenom,
				institution,
				group,
				role,
				museofile,
				isBloqued,
			});
			this.setState({ modal: false, error: "", isFormChanged: false });
			toastr.success("Les informations ont été enregistrées.");
			this.props.callback();
		} catch (error) {
			this.setState({ error: error.msg });
		}
	}

	async deleteUser() {
		try {
			this.setState({ loading: true });
			const confirmText =
				"Vous êtes sur le point de supprimer cet utilisateur. Souhaitez-vous continuer ?";
			const toastrConfirmOptions = {
				onOk: async () => {
					await api.deleteUser(this.state.email);
					this.setState({
						modal: false,
						error: "",
						isFormChanged: false,
					});
					toastr.success("L'utilisateur a été supprimé");
					this.props.callback();
				},
			};
			toastr.confirm(confirmText, toastrConfirmOptions);
		} catch (error) {
			this.setState({ error: error.msg });
		}
	}

	museofile() {
		const { group, role } = this.state;
		if (
			!(
				(group === "joconde" || group === "museo") &&
				role === "producteur"
			)
		) {
			return <div />;
		}
		return (
			<div className="input-container">
				<div>
					Code Musée<em className="text-muted"> - MUSEOFILE</em>
				</div>
				<Tags
					onChange={(museofile) => this.setState({ museofile })}
					value={this.state.museofile}
					placeholder="Exemple : M5043"
				/>
			</div>
		);
	}

	renderModal() {
		let groups = [];

		if (this.props.authUserGroup === "admin") {
			//On ajoute le groupe admin et les autres groups de la bdd
			groups.push("admin");
			this.props.baseGroups.map((group) => {
				groups.push(group.LABEL);
			});
		} else {
			groups.push(this.props.authUserGroup);
		}
		groups = groups.map((e) => <option key={e}>{e}</option>);

		let roles = [];
		if (this.props.authUserRole === "administrateur") {
			roles = roles.concat([
				"administrateur",
				"producteur",
				"utilisateur",
			]);
		}

		roles = roles.map((e) => <option key={e}>{e}</option>);

		const { prenom, nom, institution, group, role, email, isBloqued } =
			this.state;

		return (
			<Modal
				isOpen={this.state.modal}
				toggle={() => this.setState({ modal: !this.state.modal })}
			>
				<h3>
					Modifier {prenom} {nom}
				</h3>
				<div className="error">{this.state.error}</div>
				<div className="input-container">
					<div>
						<div>Email</div>
						<Input value={email} disabled />
					</div>
				</div>
				<Row>
					<Col sm="6">
						<div className="input-container">
							<div>Prénom</div>
							<Input
								value={prenom}
								onChange={(e) =>
									this.setState({ prenom: e.target.value })
								}
							/>
						</div>
					</Col>
					<Col sm="6">
						<div className="input-container">
							<div>Nom</div>
							<Input
								value={nom}
								onChange={(e) =>
									this.setState({ nom: e.target.value })
								}
							/>
						</div>
					</Col>
				</Row>
				<div className="input-container">
					<div>Institution</div>
					<Input
						value={institution}
						onChange={(e) =>
							this.setState({ institution: e.target.value })
						}
					/>
				</div>
				<Row>
					<Col sm="6">
						<div className="input-container">
							<div>Groupe</div>
							<Input
								type="select"
								value={group}
								onChange={(e) =>
									this.setState({ group: e.target.value })
								}
							>
								{groups}
							</Input>
						</div>
					</Col>
					<Col sm="6">
						<div className="input-container">
							<div>Rôle</div>
							<Input
								type="select"
								value={role}
								onChange={(e) =>
									this.setState({ role: e.target.value })
								}
							>
								{roles}
							</Input>
						</div>
					</Col>
				</Row>
				{this.museofile()}
				<div className="input-container">
					<span>Compte bloqué</span>
					<Input
						type="checkbox"
						checked={isBloqued}
						onClick={(e) =>
							this.setState({
								isBloqued: !isBloqued,
								isFormChanged: true,
							})
						}
						disabled={!isBloqued && !this.state.isFormChanged}
						style={{
							marginTop: "0.10rem",
							marginLeft: "0.75rem",
							width: "1.25rem",
							height: "1.25rem",
						}}
					/>
				</div>
				<div className="button-container">
					<Button
						color="primary"
						onClick={this.updateUser.bind(this)}
					>
						Enregistrer les modifications
					</Button>
					<Button
						color="danger"
						className="ml-3"
						onClick={this.deleteUser.bind(this)}
					>
						Supprimer
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
		authUserRole: Auth.user.role,
	};
};

export default connect(mapStateToProps, {})(UpdateUser);
