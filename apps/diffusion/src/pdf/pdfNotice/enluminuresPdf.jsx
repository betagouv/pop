import Field from "../../notices/Field";
import mapping from "../../services/mapping";
import { Document, Page, View, Text, Image, Link } from "@react-pdf/renderer";
import { styles } from "../pdfNotice/styles";
import { bucket_url } from "../../config";
import { getNoticeInfo } from "../../utils";

export function EnluminuresPdf(notice, title, typeNotice, links) {
	return (
		<Document>
			<Page style={styles.page}>
				<Text style={styles.header} fixed>
					{" "}
				</Text>
				<Text style={styles.title}>
					{notice.TITR + " - " + notice.SUJET}
				</Text>

				<View style={styles.content}>
					<View style={styles.body}>
						{"INI-D" == typeNotice
							? renderPdfNoticesINID(notice)
							: "INI-CM" == typeNotice
								? renderPdfNoticesINICM(notice)
								: renderPdfNoticesOthers(notice)}
					</View>
					<View style={styles.seeMore}>
						{notice.VIDEO.length > 0 ? (
							<View>
								<Image
									style={styles.image}
									src={
										bucket_url +
										notice.VIDEO[0] +
										"?" +
										new Date().getTime()
									}
								/>
							</View>
						) : null}

						{links.length > 0 ? (
							<View style={styles.linkedNoticesContainer}>
								<Text style={styles.subtitle}>
									Notices liées
								</Text>
								<View>
									{links.length > 0 ? (
										<View className="sidebar-section links">
											<View>
												{links.map((link) => {
													return renderLinkPdf(link);
												})}
											</View>
										</View>
									) : null}
								</View>
							</View>
						) : null}

						<View style={styles.aPropos}>
							<Text style={styles.subtitle}>
								À propos de la notice
							</Text>
							{"INI-D" == typeNotice || "INI-CM" == typeNotice
								? renderPdfSideBarNotices(notice)
								: renderPdfSideBarOthersNotices(notice)}
							<Field
								title={"Contactez-nous"}
								content={notice.CONTACT}
								separator=";"
								isPdf={true}
							/>
						</View>

						<View style={styles.voirAussi}>
							{notice.LIENS && notice.LIENS.length > 0 ? (
								<View>
									<Text style={styles.subtitle}>
										Voir aussi
									</Text>
									<Text style={styles.fieldTitle}>
										{mapping.enluminures.LIENS.label}
									</Text>
									<Link
										style={styles.listLinked}
										src={notice.LIENS[0]}
									>
										<a
											href={notice.LIENS[0]}
											target="_blank" rel="noreferrer"
										>
											<Text>
												Voir la notice de la base
												Initiale
											</Text>
										</a>
									</Link>
									{notice.LIENS.map((lien, i) => {
										if (i > 0) {
											return (
												<Link
													style={styles.listLinked}
													src={lien}
												>
													<a
														href={lien}
														target="_blank" rel="noreferrer"
													>
														<Text>
															Voir la notice de la
															base Initiale
														</Text>
													</a>
												</Link>
											);
										}
									})}
								</View>
							) : (
								<></>
							)}
						</View>
					</View>
				</View>
				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) =>
						`${pageNumber} / ${totalPages}`
					}
					fixed
				/>
			</Page>
		</Document>
	);
}

const renderLinkPdf = (notice) => {
	const { title, image_preview } = getNoticeInfo(notice);
	return (
		<Link
			style={styles.linkEnluminures}
			src={
				"https://www.pop.culture.gouv.fr/notice/" +
				notice.collection +
				"/" +
				notice.REF
			}
		>
			<a>
				<View style={styles.linkedNotice} className="content">
					{image_preview && (
						<Image
							src={image_preview}
							style={styles.linkedNoticeImage}
						/>
					)}
					<View style={styles.linkedNoticeDetails}>
						<Text style={styles.categoryEnluminures}>
							{notice.collection}
						</Text>
						<Text style={styles.linkedNoticeTitle}>{title}</Text>
						<Text style={styles.linkedNoticeContent}>
							{notice.DENO}
						</Text>
						<Text style={styles.linkedNoticeContent}>
							{notice.DOMN}
						</Text>
						<Text style={styles.linkedNoticeContent}>
							{notice.AUTR}
						</Text>
					</View>
				</View>
			</a>
		</Link>
	);
};

const renderPdfNoticesINICM = (notice) => {
	return (
		<View>
			{notice.TITR ||
			notice.AUTR ||
			notice.AUTS ||
			notice.LANGOUV ||
			notice.DATE ||
			notice.ORIGG ||
			notice.TYPCOD ||
			notice.DIMS ||
			notice.NOTES ||
			notice.POSS ||
			notice.NOMENC ? (
				<View>
					<Text style={styles.subtitle}>
						Identification du manuscrit ou de l’incunable
					</Text>
					<Field
						title={mapping.enluminures.TITR.label_inicm}
						content={notice.TITR}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.AUTR.label_inicm}
						content={notice.AUTR}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.AUTS.label_inicm}
						content={notice.AUTS}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.LANGOUV.label_inicm}
						content={notice.LANGOUV}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.DATE.label_inicm}
						content={notice.DATE}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.ORIGG.label_inicm}
						content={notice.ORIGG}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.TYPCOD.label_inicm}
						content={notice.TYPCOD}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.DIMS.label_inicm}
						content={notice.DIMS}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.NOTES.label_inicm}
						content={notice.NOTES}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.POSS.label_inicm}
						content={notice.POSS}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.NOMENC.label_inicm}
						content={notice.NOMENC}
						separator="#"
						isPdf={true}
					/>
				</View>
			) : null}

			{notice.TYPDEC ? (
				<View>
					<Text style={styles.subtitle}>Décors</Text>
					<Field
						title={mapping.enluminures.TYPDEC.label_inicm}
						content={notice.TYPDEC}
						separator="#"
						isPdf={true}
					/>
				</View>
			) : null}

			{notice.ETAB || notice.REFD || notice.FOLIOS ? (
				<View>
					<Text style={styles.subtitle}>
						Localisation du manuscrit
					</Text>
					<Field
						title={mapping.enluminures.ETAB.label_inicm}
						content={notice.ETAB}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.REFD.label_inicm}
						content={notice.REFD}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.FOLIOS.label_inicm}
						content={notice.FOLIOS}
						separator="#"
						isPdf={true}
					/>
				</View>
			) : null}
		</View>
	);
};

const renderPdfNoticesINID = (notice) => {
	return (
		<>
			<View>
				{notice.SUJET ||
				notice.ATTRIB ||
				notice.CONTXT ||
				notice.DATE ||
				notice.NOTEDEC ||
				notice.TYPE ||
				notice.DIMS ||
				notice.NOTES ? (
					<View>
						<Text style={styles.subtitle}>Enluminure</Text>
						<Field
							title={mapping.enluminures.SUJET.label_inid}
							content={notice.SUJET}
							separator="#"
							isPdf={true}
						/>
						<Field
							title={mapping.enluminures.ATTRIB.label_inid}
							content={notice.ATTRIB}
							separator="#"
							isPdf={true}
						/>
						<Field
							title={mapping.enluminures.CONTXT.label_inid}
							content={notice.CONTXT}
							separator="#"
							isPdf={true}
						/>
						<Field
							title={mapping.enluminures.DATE.label_inid}
							content={notice.DATE}
							separator="#"
							isPdf={true}
						/>
						<Field
							title={mapping.enluminures.NOTDEC.label_inid}
							content={notice.NOTDEC}
							separator="#"
							isPdf={true}
						/>
						<Field
							title={mapping.enluminures.TYPE.label_inid}
							content={notice.TYPE}
							separator="#"
							isPdf={true}
						/>
						<Field
							title={mapping.enluminures.DIMS.label_inid}
							content={notice.DIMS}
							separator="#"
							isPdf={true}
						/>
						<Field
							title={mapping.enluminures.NOTES.label_inid}
							content={notice.NOTES}
							separator="#"
							isPdf={true}
						/>
					</View>
				) : null}

				{notice.TITR || notice.ETAB || notice.REFD || notice.FOLIOS ? (
					<View>
						<Text style={styles.subtitle}>
							Manuscrit ou incunable
						</Text>
						<Field
							title={mapping.enluminures.TITR.label_inid}
							content={notice.TITR}
							separator="#"
							isPdf={true}
						/>
						<Field
							title={mapping.enluminures.ETAB.label_inid}
							content={notice.ETAB}
							separator="#"
							isPdf={true}
						/>
						<Field
							title={mapping.enluminures.REFD.label_inid}
							content={notice.REFD}
							separator="#"
							isPdf={true}
						/>
						<Field
							title={mapping.enluminures.FOLIOS.label_inid}
							content={notice.FOLIOS}
							separator="#"
							isPdf={true}
						/>
					</View>
				) : null}
			</View>
		</>
	);
};

const renderPdfNoticesOthers = (notice) => {
	return (
		<>
			{notice.ATTRIB ||
			notice.CONTXT ||
			notice.DATE ||
			notice.NOMENC ||
			notice.NOTES ||
			notice.NOTDEC ||
			notice.ORIGG ||
			notice.ORIGH ||
			notice.POSS ||
			notice.REFD ||
			notice.SUJET ||
			notice.TITR ||
			notice.TYPDEC ? (
				<View>
					<Text style={styles.subtitle}>
						Identification du bien culturel
					</Text>
					<Field
						title={mapping.enluminures.ATTRIB.label}
						content={notice.ATTRIB}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.CONTXT.label}
						content={notice.CONTXT}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.DATE.label}
						content={notice.DATE}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.NOMENC.label}
						content={notice.NOMENC}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.NOTES.label}
						content={notice.NOTES}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.NOTDEC.label}
						content={notice.NOTDEC}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.ORIGG.label}
						content={notice.ORIGG}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.POSS.label}
						content={notice.POSS}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.REFD.label}
						content={notice.REFD}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.SUJET.label}
						content={notice.SUJET}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.TITR.label}
						content={notice.TITR}
						separator="#"
						isPdf={true}
					/>
					<Field
						title={mapping.enluminures.TYPDEC.label}
						content={notice.TYPDEC}
						separator="/"
						isPdf={true}
					/>
				</View>
			) : null}
		</>
	);
};

const renderPdfSideBarNotices = (notice) => {
	return (
		<>
			<Field
				title={mapping.enluminures.REF.label}
				content={notice.REF}
				separator="#"
				isPdf={true}
			/>
			<Field
				title={mapping.enluminures.BASE.label}
				content={notice.BASE}
				separator="#"
				isPdf={true}
			/>
			<Field
				title="Crédits photographiques"
				content="Cliché IRHT ; droits collectivité, CNRS et MCC"
				separator="#"
				isPdf={true}
			/>
			<Field
				title="Copyright notice"
				content="© Institut de recherche et d'histoire des textes - CNRS"
				separator="#"
				isPdf={true}
			/>
		</>
	);
};

const renderPdfSideBarOthersNotices = (notice) => {
	return (
		<>
			<Field
				title={mapping.enluminures.REF.label}
				content={notice.REF}
				separator="#"
				isPdf={true}
			/>
			<Field
				title={mapping.enluminures.BASE.label}
				content={notice.BASE}
				separator="#"
				isPdf={true}
			/>
			<Field
				title={mapping.enluminures.DROIT.label}
				content={notice.DROIT}
				separator="#"
				isPdf={true}
			/>
			<Field
				title={mapping.enluminures.ATTRIB.label}
				content={notice.ATTRIB}
				separator="#"
				isPdf={true}
			/>
			<Field
				title={mapping.enluminures.COPY.label}
				content={notice.COPY}
				separator="#"
				isPdf={true}
			/>
		</>
	);
};
