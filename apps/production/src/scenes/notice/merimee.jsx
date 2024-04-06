import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "reactstrap";
import { reduxForm } from "redux-form";
import Loader from "../../components/Loader";
import { bucket_url, pop_url } from "../../config";
import Merimee from "../../entities/Merimee";
import API from "../../services/api";
import Mapping from "../../services/mapping";
import AccordionHistorique from "./components/AccordionHistorique";
import BackButton from "./components/BackButton";
import DeleteButton from "./components/DeleteButton";
import InputFiles from "./components/InputFiles";
import Comments from "./components/comments";
import Field from "./components/field";
import FieldImages from "./components/fieldImages";
import MapComponent from "./components/map";
import Section from "./components/section";

import "./index.css";

class Notice extends React.Component {
	state = {
		notice: null,
		error: "",
		loading: true,
		editable: true,
		files: [],
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
		const notice = await API.getNotice("merimee", ref);
		if (!notice) {
			this.setState({
				loading: false,
				error: "Cette notice n'existe pas",
			});
			return;
		}
		this.props.initialize(notice);
		//const editable = this.canEdit(notice);
		let editable = false;
		API.canEdit(notice.REF, "", notice.PRODUCTEUR, "merimee").then(
			(result) => {
				editable = result.validate;
				this.setState({ editable: editable });
			},
		);

		this.setState({ loading: false, notice, editable });
	}

	canEdit(notice) {
		if (this.props.group === "admin") {
			return true;
		}
		if (this.props.group === "mh") {
			return (
				["producteur", "administrateur"].includes(this.props.role) &&
				[
					"Monuments Historiques",
					"Architecture",
					"État",
					"Autre",
				].includes(notice.PRODUCTEUR)
			);
		}

		return false;
	}

	async onSubmit(values) {
		const files = [];

		for (let i = 0; i < values.POP_ARRETE_PROTECTION.length; i++) {
			if (typeof values.POP_ARRETE_PROTECTION[i] === "object") {
				const file = values.POP_ARRETE_PROTECTION[i];
				files.push(file);
				values.POP_ARRETE_PROTECTION[i] =
					`merimee/${values.REF}/${file.name}`;
			}
		}

		for (let i = 0; i < values.POP_DOSSIER_PROTECTION.length; i++) {
			if (typeof values.POP_DOSSIER_PROTECTION[i] === "object") {
				const file = values.POP_DOSSIER_PROTECTION[i];
				files.push(file);
				values.POP_DOSSIER_PROTECTION[i] =
					`merimee/${values.REF}/${file.name}`;
			}
		}

		if (typeof values.POP_DOSSIER_VERT === "object") {
			const file = values.POP_DOSSIER_VERT;
			files.push(file);
			values.POP_DOSSIER_VERT = `merimee/${values.REF}/${file.name}`;
		}

		this.setState({ saving: true });
		const notice = new Merimee(values);
		if (notice._errors.length) {
			toastr.error("La modification n'a pas été enregistrée", "", {
				component: () => (
					<div>
						{notice._errors.map((e) => (
							<p>{e}</p>
						))}
					</div>
				),
			});
		} else {
			try {
				await API.updateNotice(
					this.state.notice.REF,
					"merimee",
					values,
					files,
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
			return <div className="error">{this.state.error}</div>;
		}

		const arr = [];
		for (const key in this.state.notice) {
			if (this.state.notice[key]) {
				arr.push(
					<span key={key}>{`${key}:${this.state.notice[key]}`}</span>,
				);
			}
		}

		return (
			<Container className="notice">
				<BackButton left history={this.props.history} />
				<h2 className="main-title">
					{`${this.state.notice.TICO} (${this.state.notice.REF})`}{" "}
					<a
						style={{ fontSize: "small" }}
						target="_blank"
						rel="noreferrer noopener"
						href={`${pop_url}/notice/merimee/${this.state.notice.REF}`}
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
						name="MEMOIRE"
						canOrder={this.state.editable} // We can ordering images only if we have the proper rights on the notice
						canEdit={false} // As image come from memoire, we can't delete or update an image from merimee
						external={true}
						getAbsoluteUrl={(e) => {
							if (!e.url) {
								return "";
							}
							if (e.url.indexOf("memoire/") === 0) {
								return `${bucket_url}${e.url}`;
							}
							return e.url;
						}}
						footer={(e) => {
							return (
								<Link
									to={`/notice/memoire/${e.ref}`}
									target="_blank"
									rel="noopener"
								>
									{e.ref}
								</Link>
							);
						}}
					/>
					<div className="imageLinks">
						<div>
							<span>
								Pour ajouter une image, il faut enregistrer la
								référence {this.state.notice.REF} dans le champ
								LBASE des notices de la base Mémoire :{" "}
							</span>
							<Link
								to={`/recherche-avancee/memoire?qb=%5B%7B%22field%22%3A%22COM.keyword%22%2C%22operator%22%3A%22%2A%22%2C%22value%22%3A%22${this.state.notice.COM}%22%2C%22combinator%22%3A%22AND%22%2C%22index%22%3A0%7D%2C%7B%22field%22%3A%22DPT.keyword%22%2C%22operator%22%3A%22%2A%22%2C%22value%22%3A%22${this.state.notice.DPT}%22%2C%22combinator%22%3A%22AND%22%2C%22index%22%3A1%7D%5D&sortKey=%22REF.keyword%22&sortOrder=%22desc%22`}
								target="_blank"
								rel="noopener"
							>
								Voir les images de la base Mémoire correspondant
								à la même localisation
							</Link>
						</div>
					</div>

					<Section
						title="Références documentaires"
						icon={require("../../assets/law.png")}
						color="#FE997B"
					>
						<Row>
							<Col sm={6}>
								<CustomField name="REF" disabled={true} />
								<CustomField
									name="DOMN"
									disabled={!this.state.editable}
								/>
								<CustomField
									title="N° de renvoi au domaine MH ou au domaine INVENTAIRE (RENV ) :"
									name="RENV"
									createUrl={(e) => `/notice/merimee/${e}`}
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REFO"
									createUrl={(e) => `/notice/palissy/${e}`}
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DENQ"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DBOR"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="NOMS"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DMIS"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DMAJ"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="THEM"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ETUD"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DOSS"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="COPY"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="CONTACT"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>

					<Section
						title="Désignation de l'édifice"
						icon={require("../../assets/law.png")}
						color="#FE997B"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="GENR"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DENO"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PDEN"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="VOCA"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="APPL"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ACTU"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="TICO"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PART"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REFP"
									createUrl={(e) => `/notice/merimee/${e}`}
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PARN"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="COLL"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>

					<Section
						title="Localisation de l'édifice"
						icon={require("../../assets/law.png")}
						color="#FE997B"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="REG"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DPT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DPT_LETTRE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="COM"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="WCOM"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="INSEE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PLOC"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="AIRE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="CANT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="LIEU"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ADRS"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="WADRS"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="EDIF"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REFE"
									createUrl={(e) => `/notice/merimee/${e}`}
									disabled={!this.state.editable}
									footer={(key) => {
										<Link
											to={`/notice/memoire/${key}`}
											target="_blank"
											rel="noopener"
										>
											{key}
										</Link>;
									}}
								/>
								<CustomField
									name="CADA"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ZONE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="COOR"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="COORM"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="POP_COORDONNEES.lat"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="POP_COORDONNEES.lon"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="IMPL"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="HYDR"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>

					<Section
						title="Description de l'édifice"
						icon={require("../../assets/law.png")}
						color="#FE997B"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="MURS"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="TOIT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PLAN"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ETAG"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="VOUT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ELEV"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="COUV"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ESCA"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ENER"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="VERT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DESC"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="TECH"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REPR"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PREP"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DIMS"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="TYPO"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ETAT"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>

					<Section
						title="Historique de l'édifice"
						icon={require("../../assets/law.png")}
						color="#FE997B"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="SCLE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="SCLD"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DATE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="JDAT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="AUTR"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="JATT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PERS"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REMP"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DEPL"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="HIST"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>
					<Section
						title="Protection Monument historique de l'édifice"
						icon={require("../../assets/law.png")}
						color="#FE997B"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="PROT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DPRO"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PPRO"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="APRO"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="MHPP"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="SITE"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="DLAB"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="INTE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PINT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REMA"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="OBS"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ARCHEO"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>

					<Section
						title="Statut juridique de l'édifice"
						icon={require("../../assets/law.png")}
						color="#FE997B"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="STAT"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="PSTA"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="AFFE"
									disabled={!this.state.editable}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="PAFF"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="VISI"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
					</Section>
					<Section
						title="Gestion de la base de données"
						icon={require("../../assets/law.png")}
						color="#FE997B"
					>
						<Row>
							<Col sm={6}>
								<CustomField
									name="IDAGR"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="MICR"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="MFICH"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="VIDEO"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="AUTP"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="IMAGE"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="IMG"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="LBASE2"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="WEB"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DOSADRS"
									disabled={!this.state.editable}
								/>
								<InputFiles
									name="POP_ARRETE_PROTECTION"
									disabled={!this.state.editable}
									{...Mapping.merimee.POP_ARRETE_PROTECTION}
								/>
								<InputFiles
									name="POP_DOSSIER_VERT"
									disabled={!this.state.editable}
									{...Mapping.merimee.POP_DOSSIER_VERT}
								/>
								<InputFiles
									name="POP_DOSSIER_PROTECTION"
									disabled={!this.state.editable}
									{...Mapping.merimee.POP_DOSSIER_PROTECTION}
								/>
							</Col>
							<Col sm={6}>
								<CustomField
									name="DOSURL"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="DOSURLPDF"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="LIENS"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="MOSA"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="WRENV"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ACMH"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="ACURL"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="LMDP"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="RFPA"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="NBOR"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REFJOC"
									createUrl={(e) => `/notice/joconde/${e}`}
									disabled={!this.state.editable}
								/>
								<CustomField
									name="REFMUS"
									createUrl={(e) => `/notice/museo/${e}`}
									disabled={!this.state.editable}
								/>
								<CustomField
									name="LREG"
									disabled={!this.state.editable}
								/>
								<CustomField
									name="LINHA"
									disabled={!this.state.editable}
								/>
							</Col>
						</Row>
						<AccordionHistorique
							historique={this.state.notice.HISTORIQUE || []}
						/>
					</Section>

					<MapComponent notice={this.state.notice} />
					{this.state.editable ? (
						<div className="buttons">
							<BackButton history={this.props.history} />
							<DeleteButton
								noticeType="merimee"
								noticeRef={this.state.notice.REF}
							/>
							<Button color="primary" type="submit">
								Sauvegarder
							</Button>
						</div>
					) : (
						<div />
					)}
				</Form>
			</Container>
		);
	}
}
const CustomField = ({ name, disabled, ...rest }) => {
	return (
		<Field
			key={name}
			name={name}
			disabled={Mapping.merimee[name].generated || disabled}
			{...Mapping.merimee[name]}
			{...rest}
		/>
	);
};

const mapStateToProps = ({ Auth }) => {
	const { role, group } = Auth.user;
	return { role, group };
};

export default connect(
	mapStateToProps,
	{},
)(reduxForm({ form: "notice" })(Notice));
