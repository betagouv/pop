import { Document, Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { bucket_url } from "../../config";
import Field from "../../notices/Field";
import { getUrlArchive, pdfLinks, postFixedLink } from "../../notices/utils";
import mapping from "../../services/mapping";
import { LinkedNoticesPdf } from "./components/LinkedNoticesPdf";
import { styles } from "./styles";

export function PalissyPdf(notice, title, localisation, links) {
	return (
		<Document>
			<Page style={styles.page}>
				<Text style={styles.header} fixed>
					{" "}
				</Text>
				<Text style={styles.title}>{notice.TICO}</Text>

				<View style={styles.content}>
					<View style={styles.body}>
						{notice.DENO ||
						notice.PDEN ||
						notice.NART ||
						notice.APPL ||
						notice.TICO ? (
							<View>
								<Text style={styles.subtitle}>Désignation</Text>
								<Field
									title={mapping.palissy.DENO.label}
									content={notice.DENO}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PDEN.label}
									content={notice.PDEN}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.NART.label}
									content={notice.NART}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.APPL.label}
									content={notice.APPL}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.TICO.label}
									content={notice.TICO}
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.REG ||
						notice.DPT ||
						notice.COM ||
						notice.INSEE ||
						notice.PLOC ||
						notice.AIRE ||
						notice.CANT ||
						notice.LIEU ||
						notice.ADRS ||
						notice.EDIF ||
						notice.REFA ||
						notice.IMPL ||
						notice.EMPL ||
						notice.DEPL ||
						notice.VOLS ? (
							<View>
								<Text style={styles.subtitle}>
									Localisation
								</Text>
								<Field
									title="Localisation"
									content={localisation}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.INSEE.label}
									content={notice.INSEE}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PLOC.label}
									content={notice.PLOC}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.AIRE.label}
									content={notice.AIRE}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.CANT.label}
									content={notice.CANT}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.LIEU.label}
									content={notice.LIEU}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.ADRS.label}
									content={notice.ADRS}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.EDIF.label}
									content={notice.EDIF}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.REFA.label}
									content={notice.REFA}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.IMPL.label}
									content={notice.IMPL}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.EMPL.label}
									content={notice.EMPL}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.DEPL.label}
									content={notice.DEPL}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.VOLS.label}
									content={notice.VOLS}
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.CATE ||
						notice.STRU ||
						notice.MATR ||
						notice.DESC ||
						notice.REPR ||
						notice.PREP ||
						notice.DIMS ||
						notice.PDIM ||
						notice.ETAT ||
						notice.PETA ||
						notice.INSC ||
						notice.PINS ? (
							<View>
								<Text style={styles.subtitle}>Description</Text>
								<Field
									title={mapping.palissy.CATE.label}
									content={notice.CATE}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.STRU.label}
									content={notice.STRU}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.MATR.label}
									content={notice.MATR}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.DESC.label}
									content={notice.DESC}
									isPdf={true}
									separator="£"
								/>
								<Field
									title={mapping.palissy.REPR.label}
									content={notice.REPR}
									isPdf={true}
									separator="£"
								/>
								<Field
									title={mapping.palissy.PREP.label}
									content={notice.PREP}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.DIMS.label}
									content={notice.DIMS}
									isPdf={true}
									separator="£"
								/>
								<Field
									title={mapping.palissy.PDIM.label}
									content={notice.PDIM}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.ETAT.label}
									content={notice.ETAT}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PETA.label}
									content={notice.PETA}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.INSC.label}
									content={notice.INSC}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PINS.label}
									content={notice.PINS}
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.AUTR ||
						notice.AFIG ||
						notice.ATEL ||
						notice.REFM ||
						notice.PERS ||
						notice.EXEC ||
						notice.ORIG ||
						notice.STAD ||
						notice.SCLE ||
						notice.DATE ||
						notice.JDAT ||
						notice.HIST ? (
							<View>
								<Text style={styles.subtitle}>Historique</Text>
								<Field
									title={mapping.palissy.AUTR.label}
									content={notice.AUTR}
									isPdf={true}
									link={true}
								/>
								<Field
									title={mapping.palissy.AFIG.label}
									content={notice.AFIG}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.ATEL.label}
									content={notice.ATEL}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.REFM.label}
									content={notice.REFM}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PERS.label}
									content={notice.PERS}
									isPdf={true}
									separator="£"
								/>
								<Field
									title={mapping.palissy.EXEC.label}
									content={notice.EXEC}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.ORIG.label}
									content={notice.ORIG}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.STAD.label}
									content={notice.STAD}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.SCLE.label}
									content={notice.SCLE}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.DATE.label}
									content={notice.DATE}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.JDAT.label}
									content={notice.JDAT}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.HIST.label}
									content={notice.HIST}
									isPdf={true}
									separator="£"
								/>
							</View>
						) : null}

						{notice.STAT ||
						notice.PROT ||
						notice.DPRO ||
						notice.PPRO ||
						notice.NUMA ||
						notice.NINV ||
						notice.OBS ||
						notice.INTE ||
						notice.PINT ||
						notice.ACQU ||
						notice.EXPO ||
						notice.BIBL ||
						notice.SOUR ||
						notice.PHOTO ? (
							<View>
								<Text style={styles.subtitle}>
									Statut juridique et protection
								</Text>
								<Field
									title={mapping.palissy.STAT.label}
									content={notice.STAT}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PROT.label}
									content={notice.PROT}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.DPRO.label}
									content={notice.DPRO}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PPRO.label}
									content={notice.PPRO}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.NUMA.label}
									content={notice.NUMA}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.NINV.label}
									content={notice.NINV}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.OBS.label}
									content={notice.OBS}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.INTE.label}
									content={notice.INTE}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PINT.label}
									content={notice.PINT}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.ACQU.label}
									content={notice.ACQU}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.EXPO.label}
									content={notice.EXPO}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.BIBL.label}
									content={notice.BIBL}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.SOUR.label}
									content={notice.SOUR}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PHOTO.label}
									content={notice.PHOTO}
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.ETUD ||
						notice.DOSS ||
						notice.PART ||
						notice.REFP ||
						notice.PARN ||
						notice.PAPP ||
						notice.REFE ||
						notice.DENQ ||
						notice.DBOR ||
						notice.RENP ||
						notice.DOSADRS ||
						notice.IMAGE ||
						notice.WEB ? (
							<View>
								<Text style={styles.subtitle}>
									Références documentaires
								</Text>
								<Field
									title={mapping.palissy.ETUD.label}
									content={notice.ETUD}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.DOSS.label}
									content={notice.DOSS}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PART.label}
									content={notice.PART}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.REFP.label}
									content={notice.REFP}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PARN.label}
									content={notice.PARN}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.PAPP.label}
									content={notice.PAPP}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.REFE.label}
									content={notice.REFE}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.DENQ.label}
									content={notice.DENQ}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.DBOR.label}
									content={notice.DBOR}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.RENP.label}
									content={notice.RENP}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.DOSADRS.label}
									content={notice.DOSADRS}
									separator="£"
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.IMAGE.label}
									content={notice.IMAGE}
									isPdf={true}
								/>
								<Field
									title={mapping.palissy.WEB.label}
									content={notice.WEB}
									isPdf={true}
								/>
							</View>
						) : null}
					</View>
					<View style={styles.seeMore}>
						{notice.MEMOIRE.length > 0 && notice.MEMOIRE[0].url ? (
							<View>
								<Image
									style={styles.image}
									src={`${
										bucket_url + notice.MEMOIRE[0].url
									}?${new Date().getTime()}`}
								/>
							</View>
						) : null}

						{links.length > 0 ? (
							<View style={styles.linkedNoticesContainer}>
								<Text style={styles.subtitle}>
									Notices liées
								</Text>
								<View>
									{links.length > 0
										? links.map((link) => {
												return LinkedNoticesPdf(link);
											})
										: null}
								</View>
							</View>
						) : null}

						<View style={styles.aPropos}>
							<Text style={styles.subtitle}>
								À propos de la notice
							</Text>
							<Field
								title={mapping.palissy.REF.label}
								content={notice.REF}
								isPdf={true}
							/>
							<Field
								title={mapping.palissy.BASE.label}
								content={notice.BASE}
								isPdf={true}
							/>
							<Field
								title={mapping.palissy.DMIS.label}
								content={notice.DMIS}
								isPdf={true}
							/>
							<Field
								title={mapping.palissy.DMAJ.label}
								content={notice.DMAJ}
								isPdf={true}
							/>
							<Field
								title={mapping.palissy.NOMS.label}
								content={notice.NOMS}
								isPdf={true}
							/>
							<Field
								title={mapping.palissy.COPY.label}
								content={notice.COPY}
								isPdf={true}
							/>
							<Field
								title={"Contactez-nous"}
								content={notice.CONTACT}
								separator="#"
								isPdf={true}
							/>
						</View>
						<View style={styles.voirAussi}>
							{notice.DOSURL ||
							notice.DOSURLPDF ||
							notice.POP_DOSSIER_VERT ||
							(notice.POP_ARRETE_PROTECTION &&
								notice.POP_ARRETE_PROTECTION.length) ||
							(notice.POP_DOSSIER_PROTECTION &&
								notice.POP_DOSSIER_PROTECTION.length) ||
							(notice.LIENS && notice.LIENS.length) ||
							(notice.LINHA && notice.LINHA.length) ||
							(notice.LREG && notice.LREG.length) ||
							notice.LMDP ? (
								<Text style={styles.subtitle}>Voir aussi</Text>
							) : (
								<></>
							)}

							{notice.DOSURL ? (
								<Text style={styles.fieldTitle}>
									{mapping.merimee.DOSURL.label}
								</Text>
							) : (
								<></>
							)}
							{notice.DOSURL ? (
								<Link
									style={styles.listLinked}
									title={mapping.merimee.DOSURL.label}
									src={notice.DOSURL}
									key="notice.DOSURL"
								>
									<Text>
										Voir le dossier complet sur le site de
										la région
									</Text>
								</Link>
							) : (
								<></>
							)}

							{notice.DOSURLPDF ? (
								<Text style={styles.fieldTitle}>
									{mapping.merimee.DOSURLPDF.label}
								</Text>
							) : (
								<></>
							)}
							{notice.DOSURLPDF ? (
								<Link
									style={styles.listLinked}
									title={mapping.merimee.DOSURLPDF.label}
									src={postFixedLink(notice.DOSURLPDF)}
									key="notice.DOSURLPDF"
								>
									<Text>
										Voir le dossier d'origine numérisé
									</Text>
								</Link>
							) : (
								<></>
							)}

							{notice.POP_DOSSIER_VERT ? (
								<Text style={styles.fieldTitle}>
									{mapping.palissy.POP_DOSSIER_VERT.label}
								</Text>
							) : (
								<></>
							)}
							{notice.POP_DOSSIER_VERT ? (
								<Link
									style={styles.listLinked}
									title={
										mapping.palissy.POP_DOSSIER_VERT.label
									}
									src={`${bucket_url}${notice.POP_DOSSIER_VERT}`}
									key="notice.POP_DOSSIER_VERT"
								>
									<Text>
										Voir le dossier d'origine numérisé
									</Text>
								</Link>
							) : (
								<></>
							)}

							{notice.POP_ARRETE_PROTECTION &&
							notice.POP_ARRETE_PROTECTION.length > 0 ? (
								<Text style={styles.fieldTitle}>
									{
										mapping.merimee.POP_ARRETE_PROTECTION
											.label
									}
								</Text>
							) : (
								<></>
							)}
							{notice.POP_ARRETE_PROTECTION &&
							notice.POP_ARRETE_PROTECTION.length > 0 ? (
								notice.POP_ARRETE_PROTECTION.map(
									(value, index) => {
										return (
											<Link
												style={styles.listLinked}
												src={`${bucket_url}${notice.POP_ARRETE_PROTECTION[index]}`}
												target="_blank"
												key={notice.POP_ARRETE_PROTECTION[
													index
												]
													.split(/(\\|\/)/g)
													.pop()}
											>
												<Text>{`${notice.POP_ARRETE_PROTECTION[index]}`}</Text>
											</Link>
										);
									},
								)
							) : (
								<></>
							)}

							{notice.POP_DOSSIER_PROTECTION &&
							notice.POP_DOSSIER_PROTECTION.length > 0 ? (
								<Text style={styles.fieldTitle}>
									{
										mapping.merimee.POP_DOSSIER_PROTECTION
											.label
									}
								</Text>
							) : (
								<></>
							)}
							{notice.POP_DOSSIER_PROTECTION &&
							notice.POP_DOSSIER_PROTECTION.length > 0 ? (
								notice.POP_DOSSIER_PROTECTION.map(
									(value, index) => {
										return (
											<Link
												style={styles.listLinked}
												src={`${bucket_url}${notice.POP_DOSSIER_PROTECTION[index]}`}
												target="_blank"
												key="notice.POP_DOSSIER_PROTECTION"
											>
												<Text>{`${notice.POP_DOSSIER_PROTECTION[index]}`}</Text>
											</Link>
										);
									},
								)
							) : (
								<></>
							)}

							{notice.LIENS && notice.LIENS.length > 0 ? (
								<Text style={styles.fieldTitle}>
									{mapping.merimee.LIENS.label}
								</Text>
							) : (
								<></>
							)}
							{notice.LIENS && notice.LIENS.length > 0 ? (
								notice.LIENS.map((value, index) => {
									return (
										<Link
											style={styles.listLinked}
											src={notice.LIENS[index]}
											target="_blank"
											key={`notice.LIENS${index}`}
										>
											<Text>{notice.LIENS[index]}</Text>
										</Link>
									);
								})
							) : (
								<></>
							)}

							{notice.LINHA && notice.LINHA.length > 0 ? (
								<Text style={styles.fieldTitle}>
									{mapping.merimee.LINHA.label}
								</Text>
							) : (
								<></>
							)}
							{notice.LINHA && notice.LINHA.length ? (
								notice.LINHA.map((value, index) => {
									return (
										<Link
											style={styles.listLinked}
											src={notice.LINHA[index]}
											target="_blank"
											key={`notice.LINHA_${index}`}
										>
											<Text>{notice.LINHA[index]}</Text>
										</Link>
									);
								})
							) : (
								<></>
							)}

							{notice.LREG && notice.LREG.length > 0 ? (
								<Text style={styles.fieldTitle}>
									{mapping.merimee.LREG.label}
								</Text>
							) : (
								<></>
							)}
							{notice.LREG && notice.LREG.length > 0 ? (
								notice.LREG.map((value, index) => {
									return (
										<Link
											style={styles.listLinked}
											src={notice.LREG[index]}
											target="_blank"
											key={`notice.LREG_${index}`}
										>
											<Text>{notice.LREG[index]}</Text>
										</Link>
									);
								})
							) : (
								<></>
							)}

							{notice.LMDP ? (
								<Link
									style={styles.listLinked}
									src={getUrlArchive(notice.REF)}
									target="_blank"
									key="mediathek_cible"
								>
									<Text>{getUrlArchive(notice.REF)}</Text>
								</Link>
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
