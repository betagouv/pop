import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "reactstrap";
import { reduxForm } from "redux-form";
import Loader from "../../components/Loader";
import { bucket_url, pop_url } from "../../config";
import MuseoEntity from "../../entities/Museo";
import API from "../../services/api";
import Mapping from "../../services/mapping";
import AccordionHistorique from "./components/AccordionHistorique";
import BackButton from "./components/BackButton";
import DeleteButton from "./components/DeleteButton";
import Comments from "./components/comments";
import Field from "./components/field";
import FieldImages from "./components/fieldImages";
import Section from "./components/section";

import "./index.css";

class Museo extends React.Component {
	state = {
		notice: null,
		error: "",
		loading: true,
		imagesFiles: [],
	};

	componentWillMount() {
		this.load(this.props.match.params.ref);
	}

	componentWillReceiveProps(newProps) {
		if (
			this.props.match &&
			this.props.match.params.ref !== newProps.match.params.ref
		) {
			this.load(newProps.match.params.ref);
		}
	}

	async load(ref) {
		this.setState({ loading: true });
		const notice = await API.getNotice("museo", ref);

		if (!notice) {
			this.setState({
				error: `Fiche museo ${ref} introuvable`,
				loading: false,
			});
			return;
		}
		this.props.initialize(notice);
		// As a "producteur", I can edit if "museofile" matches with notice.
		//const editable = this.props.canUpdate && (this.props.user.role === "administrateur" || this.props.user.museofile.includes(notice.REF));
		let editable = false;
		API.canEdit(notice.REF, notice.REF, notice.PRODUCTEUR, "museo").then(
			(result) => {
				editable = result.validate;
				this.setState({ editable: editable });
			},
		);

		this.setState({ loading: false, notice, editable });
	}

	async onSubmit(values) {
		this.setState({ saving: true });
		const notice = new MuseoEntity(values);
		if (notice._errors.length) {
			toastr.error("La modification n'a pas été enregistrée", "", {
				component: () => (
					<div>
						{notice._errors.map((e, idx) => (
							<p key={`notice-error-${idx}`}>{e}</p>
						))}
					</div>
				),
			});
		} else {
			try {
				await API.updateNotice(
					this.state.notice.REF,
					"museo",
					values,
					this.state.imagesFiles,
					"manuel",
				);
				toastr.success(
					"Modification enregistrée",
					"La modification sera visible dans 1 à 5 min en diffusion.",
				);
			} catch (e) {
				toastr.error(
					"La modification n'a pas été enregistrée",
					e.msg || "",
				);
			}
		}
		this.setState({ saving: false });
	}

	render() {
		if (this.state.loading) {
			return <Loader />;
		}

		if (this.state.error) {
			return (
				<div
					className="error"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						paddingTop: "50px",
					}}
				>
					{this.state.error}
				</div>
			);
		}

		return (
			<Container className="notice">
				<BackButton left history={this.props.history} />
				<h2 className="main-title">
					Notice {this.state.notice.REF}{" "}
					<a
						style={{ fontSize: "small" }}
						target="_blank"
						rel="noreferrer noopener"
						href={`${pop_url}/notice/museo/${this.state.notice.REF}`}
					>
						voir en diffusion
					</a>
				</h2>
				<Form
					onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}
					className="main-body"
				>
					<Comments POP_FLAGS={this.state.notice.POP_FLAGS} />
					<FieldImages
						name="PHOTO"
						canOrder={this.state.editable}
						canEdit={this.state.editable}
						createUrlFromName={(e) =>
							`museo/${this.state.notice.REF}/${e}`
						}
						getAbsoluteUrl={(e) => `${bucket_url}${e}`}
						filesToUpload={(imagesFiles) =>
							this.setState({ imagesFiles })
						}
					/>
					<Link
						to={`/recherche-avancee/joconde?qb=%5B%7B%22field%22%3A%22MUSEO.keyword%22%2C%22operator%22%3A%22%3D%3D%3D%22%2C%22value%22%3A%22${this.state.notice.REF}%22%2C%22combinator%22%3A%22AND%22%2C%22index%22%3A0%7D%5D&sortKey=%22REF.keyword%22&sortOrder=%22desc%22`}
					>
						Voir les oeuvres dans la base joconde
					</Link>
					<Section
						title="Nom du musée"
						icon={require("../../assets/info.png")}
						color="#FF7676"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="NOMOFF"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="NOMUSAGE"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="AUTNOM"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>
					<Section
						title="Adresse"
						icon={require("../../assets/info.png")}
						color="#FF7676"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="ADRL1_M"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="LIEU_M"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="CP_M"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="VILLE_M"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DPT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REGION"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
						<Row>
							<Col sm={6}>
								<CustomField
									name="POP_COORDONNEES.lat"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="POP_COORDONNEES.lon"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>
					<Section
						title="Contact"
						icon={require("../../assets/info.png")}
						color="#FF7676"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="TEL_M"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="CONTACT_GENERIQUE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="CONTACT_MUSEO"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="URL_M"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ACCES"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>
					<Section
						title="Collection"
						icon={require("../../assets/info.png")}
						color="#FF7676"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="CATEG"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DOMPAL"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="HIST"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ATOUT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="THEMES"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="ARTISTE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PHARE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="AN_CREAT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="INTERET"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>
					<Section
						title="Appellation/protection"
						icon={require("../../assets/info.png")}
						color="#FF7676"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="LABEL"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PROT-BAT"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="PROT-ESP"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>
					<Section
						title="A propos de la notice"
						icon={require("../../assets/info.png")}
						color="#FF7676"
					>
						<Row>
							<Col sm={6}>
								<CustomField name="REF" disabled={true} />
								<CustomField name="DMIS" disabled={true} />
								<CustomField name="DMAJ" disabled={true} />
								<CustomField
									name="REFMER"
									createUrl={(e) => `/notice/merimee/${e}`}
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REFPAL"
									createUrl={(e) => `/notice/palissy/${e}`}
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="DT_SAISI"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="COPY"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REFMEM"
									createUrl={(e) => `/notice/memoire/${e}`}
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
						<AccordionHistorique
							historique={this.state.notice.HISTORIQUE || []}
						/>
					</Section>
					<div className="buttons">
						<BackButton history={this.props.history} />
						<DeleteButton
							disabled={!this.state.editable}
							noticeType="museo"
							noticeRef={this.state.notice.REF}
						/>
						<Button
							disabled={!this.state.editable}
							color="primary"
							type="submit"
						>
							Sauvegarder
						</Button>
					</div>
				</Form>
			</Container>
		);
	}
}

const CustomField = ({ name, disabled, ...rest }) => {
	if (!Mapping.museo[name]) {
		return null;
	}
	return (
		<Field
			{...Mapping.museo[name]}
			disabled={
				Mapping.museo[name].generated ||
				Mapping.museo[name].deprecated ||
				disabled
			}
			name={name}
			{...rest}
		/>
	);
};

const mapStateToProps = ({ Auth }) => {
	const { role, group, museofile } = Auth.user;
	const canUpdate =
		(Auth.user &&
			role === "administrateur" &&
			(group === "joconde" || group === "museo" || group === "admin")) ||
		(Auth.user &&
			role === "producteur" &&
			(group === "joconde" || group === "museo"));

	return {
		canUpdate,
		user: { museofile, role, group },
	};
};

export default connect(
	mapStateToProps,
	{},
)(reduxForm({ form: "notice" })(Museo));
