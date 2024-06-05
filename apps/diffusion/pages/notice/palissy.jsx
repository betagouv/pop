import { PDFDownloadLink } from "@react-pdf/renderer";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import Cookies from "universal-cookie";
import BucketButton from "../../src/components/BucketButton";
import Layout from "../../src/components/Layout";
import { pop_url } from "../../src/config";
import ContactUs from "../../src/notices/ContactUs";
import Field from "../../src/notices/Field";
import FieldImages from "../../src/notices/FieldImages";
import LinkedNotices from "../../src/notices/LinkedNotices";
import MapComponent from "../../src/notices/Map";
import noticeStyle from "../../src/notices/NoticeStyle";
import Title from "../../src/notices/Title";
import {
	findCollection,
	getParamsFromUrl,
	getUrlArchive,
	highlighting,
	lastSearch,
	postFixedLink,
	schema,
} from "../../src/notices/utils";
import { PalissyPdf } from "../../src/pdf/pdfNotice/palissyPdf";
import API from "../../src/services/api";
import EAnalytics from "../../src/services/eurelian";
import mapping from "../../src/services/mapping";
import throw404 from "../../src/services/throw404";
import { generateLinks, getNoticeInfo, trackDownload } from "../../src/utils";
import { bucket_url } from "./../../src/config";

export default class extends React.Component {
	state = { display: false, prevLink: undefined, nextLink: undefined };

	static async getInitialProps({ query: { id }, asPath }) {
		const notice = await API.getNotice("palissy", id);
		const searchParamsUrl = asPath.substring(asPath.indexOf("?") + 1);
		const searchParams = Object.fromEntries(getParamsFromUrl(asPath));

		let arr = [];
		const links = [];

		if (notice) {
			const { RENV, REFP, REFE, REFA, LBASE2, REF } = notice;
			arr = [...RENV, ...REFP, ...REFE, ...REFA, LBASE2].filter(
				(e) => e && e !== REF,
			);
			for (const elem in arr) {
				const collection = await findCollection(arr[elem]);
				const linkedNotice = await API.getNotice(collection, arr[elem]);
				if (linkedNotice != null) {
					links.push(linkedNotice);
				}
			}

			for (let i = 0; i < notice.REFJOC.length; i++) {
				const linkedJoconde = await API.getNotice(
					"joconde",
					notice.REFJOC[i],
				);
				if (linkedJoconde) {
					links.push(linkedJoconde);
				}
			}

			for (let i = 0; i < notice.REFMUS.length; i++) {
				const linkedMuseo = await API.getNotice(
					"museo",
					notice.REFMUS[i],
				);
				if (linkedMuseo) {
					links.push(linkedMuseo);
				}
			}
		}
		return { notice, links, searchParams, searchParamsUrl };
	}

	async componentDidMount() {
		//this.setState({display : true});
		// Tracking Eurelian
		EAnalytics.initialize();
		EAnalytics.track([
			"path",
			`Notice Palissy ${this.props.notice?.REF}`,
			"pagegroup",
			"Patrimoine mobilier (Palissy)",
		]);

		//highlighting
		highlighting(this.props.searchParams.mainSearch);

		//Construction des liens précédents/suivants
		const cookies = new Cookies();
		const listRefs = cookies.get(
			`listRefs-${this.props.searchParams.idQuery}`,
		);
		if (listRefs) {
			const indexOfCurrentNotice = listRefs.indexOf(
				this.props.notice.REF,
			);
			let prevLink = undefined;
			let nextLink = undefined;
			if (indexOfCurrentNotice > 0) {
				const previousCollection = await findCollection(
					listRefs[indexOfCurrentNotice - 1],
				);
				if (previousCollection !== "") {
					prevLink = `notice/${previousCollection}/${
						listRefs[indexOfCurrentNotice - 1]
					}?${this.props.searchParamsUrl}`;
				}
			}
			if (indexOfCurrentNotice < listRefs.length - 1) {
				const nextCollection = await findCollection(
					listRefs[indexOfCurrentNotice + 1],
				);
				if (nextCollection !== "") {
					nextLink = `notice/${nextCollection}/${
						listRefs[indexOfCurrentNotice + 1]
					}?${this.props.searchParamsUrl}`;
				}
			}
			this.setState({ prevLink, nextLink });
		} else {
			!this.state.display && this.setState({ display: true });
		}
	}

	componentDidUpdate() {
		!this.state.display && this.setState({ display: true });
	}

	renderPrevButton() {
		if (this.state.prevLink !== undefined) {
			return (
				<a
					title="Notice précédente"
					href={pop_url + this.state.prevLink}
					className="navButton onPrintHide"
				>
					&lsaquo;
				</a>
			);
		}
		return null;
	}

	renderNextButton() {
		if (this.state.nextLink !== undefined) {
			return (
				<a
					title="Notice suivante"
					href={pop_url + this.state.nextLink}
					className="navButton onPrintHide"
				>
					&rsaquo;
				</a>
			);
		}
		return null;
	}

	fieldImage(notice) {
		const { images } = getNoticeInfo(notice);
		const imageComponents = images
			.map((e) => ({
				src: e.src,
				alt: e.name,
				marq: e.marq,
				footer: (
					<div style={{ marginTop: "5px" }}>
						<div
							style={{ textAlign: "center", fontWeight: "bold" }}
						>
							{e.name}
						</div>
						<div style={{ fontSize: "13px" }}>{e.copy}</div>
						<a
							style={{ fontSize: "13px" }}
							target="_blank"
							rel="noreferrer noopener"
							href={`/notice/memoire/${e.ref}`}
						>
							Voir la notice image
						</a>
					</div>
				),
			}))
			.sort((a, b) => {
				const aMarq = typeof a.marq !== "undefined" ? a.marq : "";
				const bMarq = typeof b.marq !== "undefined" ? b.marq : "";

				if (aMarq !== "" && bMarq === "") {
					return -1;
				}
				if (aMarq === "" && bMarq !== "") {
					return 1;
				}
				if (aMarq === "" && bMarq === "") {
					return 0;
				}
				return Number.parseInt(a.marq) - Number.parseInt(b.marq);
			});

		if (imageComponents.length) {
			return <FieldImages images={imageComponents} />;
		}
	}

	// Display a list of links to authors
	authorsField() {
		return this.props.notice.AUTR && this.props.notice.AUTR.length > 0 ? (
			<React.Fragment>
				{generateLinks(this.props.notice.AUTR, "auteur")}
			</React.Fragment>
		) : null;
	}

	// Display a list of links to etud
	etudeField() {
		return this.props.notice.ETUD && this.props.notice.ETUD.length > 0 ? (
			<React.Fragment>
				{generateLinks(this.props.notice.ETUD.split(";"), "etud")}
			</React.Fragment>
		) : null;
	}

	// Display label by producteur
	getLabel(field) {
		let label = mapping.palissy[field].label;
		if (
			"monuments historiques" ===
			String(this.props.notice.PRODUCTEUR).toLocaleLowerCase()
		) {
			label = mapping.palissy[field].label_mh;
		}
		return label;
	}

	render() {
		if (!this.props.notice) {
			return throw404();
		}
		const notice = this.props.notice;
		const { title, metaDescription, image, localisation } =
			getNoticeInfo(notice);

		const obj = {
			name: title,
			created_at: notice.SCLE.length ? notice.SCLE[0] : "",
			artform: "Architecture",
			image: image,
			description: metaDescription,
			contentLocation: localisation,
			creator: notice.AUTR,
			artMedium: notice.MATR.join(", "),
		};

		const pdf = PalissyPdf(notice, title, localisation, this.props.links);
		const App = () => (
			<div>
				<PDFDownloadLink
					document={pdf}
					fileName={`palissy_${notice.REF}.pdf`}
					style={{
						backgroundColor: "#377d87",
						border: 0,
						color: "#fff",
						maxWidth: "250px",
						width: "100%",
						paddingLeft: "10px",
						paddingRight: "10px",
						paddingTop: "8px",
						paddingBottom: "8px",
						textAlign: "center",
						borderRadius: "5px",
					}}
					onClick={() => trackDownload(`palissy_${notice.REF}.pdf`)}
				>
					{({ blob, url, loading, error }) =>
						loading
							? "Construction du pdf..."
							: "Téléchargement pdf"
					}
				</PDFDownloadLink>
			</div>
		);

		const lastRecherche = lastSearch(
			this.props.searchParams,
			this.props.searchParamsUrl,
			pop_url,
		);

		return (
			<Layout>
				<div className="notice">
					<Container>
						<Head>
							<title>{title}</title>
							<meta
								content={metaDescription}
								name="description"
							/>
							<script type="application/ld+json">
								{schema(obj)}
							</script>
							{image ? (
								<meta property="og:image" content={image} />
							) : (
								<meta />
							)}
						</Head>
						<div>
							<div className="heading heading-center">
								{this.renderPrevButton()}
								<h1 className="heading-title">{notice.TICO}</h1>
								{this.renderNextButton()}
							</div>
						</div>

						<div className="top-container">
							<div className="leftContainer-buttons">
								{lastRecherche !== null && (
									<div className="btn btn-last-search">
										<Link href={lastRecherche}>
											<div className="text-last-search">
												Retour à la recherche
											</div>
										</Link>
									</div>
								)}
							</div>
							<div className="rightContainer-buttons">
								<div className="addBucket onPrintHide desktop-only">
									{this.state.display && (
										<BucketButton
											base="palissy"
											reference={notice.REF}
										/>
									)}
								</div>
								{this.state.display && App()}
							</div>
						</div>

						<Row>
							<Col md="8">
								<div className="notice-details">
									<Title
										content="Désignation"
										notice={notice}
										fields={[
											"DENO",
											"PDEN",
											"NART",
											"APPL",
											"TICO",
										]}
									/>
									<Field
										title={mapping.palissy.DENO.label}
										content={notice.DENO}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.PDEN.label}
										content={notice.PDEN}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.NART.label}
										content={notice.NART}
									/>
									<Field
										title={mapping.palissy.APPL.label}
										content={notice.APPL}
									/>
									<Field
										title={mapping.palissy.TICO.label}
										content={notice.TICO}
									/>
									<Title
										content="Localisation"
										notice={notice}
										fields={[
											"REG",
											"DPT",
											"COM",
											"INSEE",
											"PLOC",
											"AIRE",
											"CANT",
											"LIEU",
											"ADRS",
											"EDIF",
											"REFA",
											"IMPL",
											"EMPL",
											"DEPL",
											"VOLS",
										]}
									/>
									<Field
										title="Localisation"
										content={localisation}
									/>
									<Field
										title={this.getLabel("INSEE")}
										content={notice.INSEE}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.PLOC.label}
										content={notice.PLOC}
									/>
									<Field
										title={mapping.palissy.AIRE.label}
										content={notice.AIRE}
									/>
									<Field
										title={mapping.palissy.CANT.label}
										content={notice.CANT}
									/>
									<Field
										title={mapping.palissy.LIEU.label}
										content={notice.LIEU}
									/>
									<Field
										title={mapping.palissy.ADRS.label}
										content={notice.ADRS}
									/>
									<Field
										title={mapping.palissy.EDIF.label}
										content={notice.EDIF}
									/>
									<Field
										title={mapping.palissy.REFA.label}
										content={notice.REFA}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.IMPL.label}
										content={notice.IMPL}
									/>
									<Field
										title={mapping.palissy.EMPL.label}
										content={notice.EMPL}
									/>
									<Field
										title={mapping.palissy.DEPL.label}
										content={notice.DEPL}
									/>
									<Field
										title={mapping.palissy.VOLS.label}
										content={notice.VOLS}
									/>

									<Title
										content="Description"
										notice={notice}
										fields={[
											"CATE",
											"STRU",
											"MATR",
											"DESC",
											"REPR",
											"PREP",
											"DIMS",
											"PDIM",
											"ETAT",
											"PETA",
											"INSC",
											"PINS",
										]}
									/>
									<Field
										title={mapping.palissy.CATE.label}
										content={notice.CATE}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.STRU.label}
										content={notice.STRU}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.MATR.label}
										content={notice.MATR}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.DESC.label}
										content={notice.DESC}
										separator="£"
										addLink="true"
									/>
									<Field
										title={mapping.palissy.REPR.label}
										content={notice.REPR}
										separator="£"
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.PREP.label}
										content={notice.PREP}
									/>
									<Field
										title={mapping.palissy.DIMS.label}
										content={notice.DIMS}
										separator="£"
									/>
									<Field
										title={mapping.palissy.PDIM.label}
										content={notice.PDIM}
									/>
									<Field
										title={mapping.palissy.ETAT.label}
										content={notice.ETAT}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.PETA.label}
										content={notice.PETA}
									/>
									<Field
										title={mapping.palissy.INSC.label}
										content={notice.INSC}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.PINS.label}
										content={notice.PINS}
									/>
									<Title
										content="Historique"
										notice={notice}
										fields={[
											"AUTR",
											"AFIG",
											"ATEL",
											"REFM",
											"PERS",
											"EXEC",
											"ORIG",
											"STAD",
											"SCLE",
											"DATE",
											"JDAT",
											"HIST",
										]}
									/>
									<Field
										title={mapping.palissy.AUTR.label}
										content={this.authorsField()}
									/>
									<Field
										title={mapping.palissy.AFIG.label}
										content={notice.AFIG}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.ATEL.label}
										content={notice.ATEL}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.REFM.label}
										content={notice.REFM}
									/>
									<Field
										title={mapping.palissy.PERS.label}
										content={notice.PERS}
										separator="£"
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.EXEC.label}
										content={notice.EXEC}
									/>
									<Field
										title={mapping.palissy.ORIG.label}
										content={notice.ORIG}
									/>
									<Field
										title={mapping.palissy.STAD.label}
										content={notice.STAD}
										join={" ; "}
									/>

									<Field
										title={mapping.palissy.SCLE.label}
										content={notice.SCLE}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.DATE.label}
										content={notice.DATE}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.JDAT.label}
										content={notice.JDAT}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.HIST.label}
										content={notice.HIST}
										separator="£"
										addLink="true"
									/>
									<Title
										content="Statut juridique et protection"
										notice={notice}
										fields={[
											"STAT",
											"PROT",
											"DPRO",
											"PPRO",
											"NUMA",
											"NINV",
											"OBS",
											"INTE",
											"PINT",
											"ACQU",
											"EXPO",
											"BIBL",
											"SOUR",
											"PHOTO",
											"PRECISION_JURIDIQUE",
										]}
									/>
									<Field
										title={mapping.palissy.STAT.label}
										content={notice.STAT}
										join={" ; "}
									/>
									<Field
										title={
											mapping.palissy.PRECISION_JURIDIQUE
												.label
										}
										content={notice.PRECISION_JURIDIQUE}
									/>
									<Field
										title={mapping.palissy.PROT.label}
										content={notice.PROT}
									/>
									<Field
										title={mapping.palissy.DPRO.label}
										content={notice.DPRO}
									/>
									<Field
										title={mapping.palissy.PPRO.label}
										content={notice.PPRO}
									/>
									<Field
										title={mapping.palissy.NUMA.label}
										content={notice.NUMA}
									/>
									<Field
										title={mapping.palissy.NINV.label}
										content={notice.NINV}
									/>

									<Field
										title={mapping.palissy.OBS.label}
										content={notice.OBS}
									/>
									<Field
										title={mapping.palissy.INTE.label}
										content={notice.INTE}
									/>
									<Field
										title={mapping.palissy.PINT.label}
										content={notice.PINT}
									/>
									<Field
										title={mapping.palissy.ACQU.label}
										content={notice.ACQU}
									/>
									<Field
										title={mapping.palissy.EXPO.label}
										content={notice.EXPO}
										separator="£"
										addLink="true"
									/>
									<Field
										title={mapping.palissy.BIBL.label}
										content={notice.BIBL}
										separator="£"
										addLink="true"
									/>
									<Field
										title={mapping.palissy.SOUR.label}
										content={notice.SOUR}
										separator="£"
										addLink="true"
									/>
									<Field
										title={mapping.palissy.PHOTO.label}
										content={notice.PHOTO}
									/>

									<Title
										content="Références documentaires"
										notice={notice}
										fields={[
											"ETUD",
											"DOSS",
											"PART",
											"REFP",
											"PARN",
											"PAPP",
											"REFE",
											"DENQ",
											"DBOR",
											"RENP",
											"DOSADRS",
											"IMAGE",
											"WEB",
										]}
									/>
									<Field
										title={mapping.palissy.ETUD.label}
										content={this.etudeField()}
									/>
									<Field
										title={mapping.palissy.DOSS.label}
										content={notice.DOSS}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.PART.label}
										content={notice.PART}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.REFP.label}
										content={notice.REFP}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.PARN.label}
										content={notice.PARN}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.PAPP.label}
										content={notice.PAPP}
									/>
									<Field
										title={mapping.palissy.REFE.label}
										content={notice.REFE}
										join={" ; "}
									/>
									<Field
										title={this.getLabel("DENQ")}
										content={notice.DENQ}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.DBOR.label}
										content={notice.DBOR}
										join={" ; "}
									/>
									<Field
										title={mapping.palissy.RENP.label}
										content={notice.RENP}
										join={" ; "}
									/>

									<Field
										title={mapping.palissy.DOSADRS.label}
										content={notice.DOSADRS}
										separator="£"
									/>
									<Field
										title={mapping.palissy.IMAGE.label}
										content={notice.IMAGE}
									/>
									<Field
										title={this.getLabel("WEB")}
										content={notice.WEB}
									/>
								</div>
							</Col>
							<Col md="4">
								{this.fieldImage(notice)}
								<LinkedNotices links={this.props.links} />
								<div className="sidebar-section info">
									<h2>À propos de la notice</h2>
									<div>
										<Field
											title={mapping.palissy.REF.label}
											content={notice.REF}
										/>
										<Field
											title={mapping.palissy.BASE.label}
											content={notice.BASE}
										/>
										<Field
											title={mapping.palissy.DMIS.label}
											content={notice.DMIS}
										/>
										<Field
											title={mapping.palissy.DMAJ.label}
											content={notice.DMAJ}
										/>
										<Field
											title={mapping.palissy.NOMS.label}
											content={notice.NOMS}
											join={" ; "}
										/>
										<Field
											title={mapping.palissy.COPY.label}
											content={notice.COPY}
										/>
									</div>
									{notice.PRODUCTEUR ===
									"Monuments Historiques" ? (
										<ContactUs
											contact={notice.CONTACT}
											REF={notice.REF}
											base="palissy"
											titleBtn="Signalez une erreur"
										/>
									) : (
										<ContactUs
											contact={notice.CONTACT}
											REF={notice.REF}
											base="palissy"
											titleBtn="Contactez-nous"
										/>
									)}
								</div>
								<SeeMore notice={notice} />
								<MapComponent notice={notice} />
							</Col>
						</Row>
					</Container>
				</div>
				<style jsx>{noticeStyle}</style>
			</Layout>
		);
	}
}

const SeeMore = ({ notice }) => {
	const arr = [];

	if (notice.DOSURL) {
		arr.push(
			<Field
				title={mapping.palissy.DOSURL.label}
				content={
					<Link href={notice.DOSURL}>
						<a
							href={notice.DOSURL}
							target="_blank"
							rel="noreferrer"
						>
							Voir le dossier complet sur le site de la région
						</a>
					</Link>
				}
				key="notice.DOSURL"
			/>,
		);
	}

	if (notice.DOSURLPDF) {
		arr.push(
			<Field
				title={mapping.palissy.DOSURLPDF.label}
				content={
					<Link href={postFixedLink(notice.DOSURLPDF)}>
						<a
							href={postFixedLink(notice.DOSURLPDF)}
							target="_blank"
							rel="noreferrer"
						>
							Voir le dossier d'origine numérisé
						</a>
					</Link>
				}
				key="notice.DOSURLPDF"
			/>,
		);
	}

	if (notice.POP_DOSSIER_VERT) {
		arr.push(
			<Field
				title={mapping.palissy.POP_DOSSIER_VERT.label}
				content={
					<Link href={`${bucket_url}${notice.POP_DOSSIER_VERT}`}>
						<a
							href={`${bucket_url}${notice.POP_DOSSIER_VERT}`}
							target="_blank"
							rel="noreferrer"
						>
							Voir le dossier d'origine numérisé
						</a>
					</Link>
				}
				key="notice.POP_DOSSIER_VERT"
			/>,
		);
	}

	if (notice.POP_ARRETE_PROTECTION && notice.POP_ARRETE_PROTECTION.length) {
		const urls = [];
		for (let i = 0; i < notice.POP_ARRETE_PROTECTION.length; i++) {
			const filename = notice.POP_ARRETE_PROTECTION[i]
				.split(/(\\|\/)/g)
				.pop();
			urls.push(
				<Link
					key={filename}
					href={`${bucket_url}${notice.POP_ARRETE_PROTECTION[i]}`}
				>
					<a
						href={`${bucket_url}${notice.POP_ARRETE_PROTECTION[i]}`}
						target="_blank"
						rel="noreferrer"
					>
						{filename}
					</a>
				</Link>,
			);
		}
		arr.push(
			<Field
				key="notice.POP_ARRETE_PROTECTION"
				title={mapping.palissy.POP_ARRETE_PROTECTION.label}
				content={
					<div style={{ display: "flex", flexDirection: "column" }}>
						{urls}
					</div>
				}
			/>,
		);
	}

	if (notice.POP_DOSSIER_PROTECTION && notice.POP_DOSSIER_PROTECTION.length) {
		const urls = [];
		for (let i = 0; i < notice.POP_DOSSIER_PROTECTION.length; i++) {
			const filename = notice.POP_DOSSIER_PROTECTION[i]
				.split(/(\\|\/)/g)
				.pop();
			urls.push(
				<Link
					key={filename}
					href={`${bucket_url}${notice.POP_DOSSIER_PROTECTION[i]}`}
				>
					<a
						href={`${bucket_url}${notice.POP_DOSSIER_PROTECTION[i]}`}
						target="_blank"
						rel="noreferrer"
					>
						{filename}
					</a>
				</Link>,
			);
		}
		arr.push(
			<Field
				key="notice.POP_DOSSIER_PROTECTION"
				title={mapping.palissy.POP_DOSSIER_PROTECTION.label}
				content={
					<div style={{ display: "flex", flexDirection: "column" }}>
						{urls}
					</div>
				}
			/>,
		);
	}

	if (notice.LIENS && notice.LIENS.length) {
		for (let i = 0; i < notice.LIENS.length; i++) {
			arr.push(
				<Field
					title={mapping.palissy.LIENS.label}
					content={
						<Link href={notice.LIENS[i]}>
							<a
								href={notice.LIENS[i]}
								target="_blank"
								rel="noreferrer"
							>
								{notice.LIENS[i]}
							</a>
						</Link>
					}
					key={`notice.LIENS${i}`}
				/>,
			);
		}
	}

	if (notice.LINHA) {
		if (notice.LINHA.length > 0) {
			arr.push(
				<Field
					title={mapping.merimee.LINHA.label}
					content={
						<Link href={notice.LINHA[0]}>
							<a
								href={notice.LINHA[0]}
								target="_blank"
								rel="noreferrer"
							>
								{notice.LINHA[0]}
							</a>
						</Link>
					}
					key="notice.LINHA_0"
				/>,
			);

			for (let i = 1; i < notice.LINHA.length; i++) {
				arr.push(
					<Field
						content={
							<Link href={notice.LINHA[i]}>
								<a
									href={notice.LINHA[i]}
									target="_blank"
									rel="noreferrer"
								>
									{notice.LINHA[i]}
								</a>
							</Link>
						}
						key={`notice.LINHA_${i}`}
					/>,
				);
			}
		}
	}

	if (notice.LREG) {
		if (notice.LREG.length > 0) {
			arr.push(
				<Field
					title={mapping.merimee.LREG.label}
					content={
						<Link href={notice.LREG[0]}>
							<a
								href={notice.LREG[0]}
								target="_blank"
								rel="noreferrer"
							>
								{notice.LREG[0]}
							</a>
						</Link>
					}
					key="notice.LREG_0"
				/>,
			);

			for (let i = 1; i < notice.LREG.length; i++) {
				arr.push(
					<Field
						content={
							<Link href={notice.LREG[i]}>
								<a
									href={notice.LREG[i]}
									target="_blank"
									rel="noreferrer"
								>
									{notice.LREG[i]}
								</a>
							</Link>
						}
						key={`notice.LREG_${i}`}
					/>,
				);
			}
		}
	}

	if (notice.LMDP) {
		arr.push(
			<Field
				content={
					<Link href={getUrlArchive(notice.REF)}>
						<a
							href={getUrlArchive(notice.REF)}
							target="_blank"
							rel="noreferrer"
						>
							Les archives conservées à la Médiathèque du
							patrimoine et de la photographie
						</a>
					</Link>
				}
				key="mediathek_cible"
			/>,
		);
	}

	if (!arr.length) {
		return null;
	}

	return (
		<div className="sidebar-section info">
			<h2>Voir aussi</h2>
			{arr}
		</div>
	);
};
