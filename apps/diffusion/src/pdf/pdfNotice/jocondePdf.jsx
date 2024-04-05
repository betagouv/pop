import Field from "../../notices/Field";
import { TextFieldReprPdf } from "../../notices/CustomField";
import mapping from "../../services/mapping";
import { Document, Page, View, Text, Image, Link } from "@react-pdf/renderer";
import { LinkedNoticesPdf } from "../pdfNotice/components/LinkedNoticesPdf";
import { styles } from "../pdfNotice/styles";
import { pdfLinks } from "../../notices/utils";
import { bucket_url } from "../../config";
import isURL from "validator/lib/isURL";
import isEmail from "validator/lib/isEmail";

export function JocondePdf(notice, title, links, museo) {
	return (
		<Document>
			<Page style={styles.page}>
				<Text style={styles.header} fixed>
					{" "}
				</Text>
				{/* M43260 - Prise en cmpte du # pour le retour à la ligne sur le titre de la notice */}
				<Text style={styles.title}>
					{title.replace(/#/g, "\n")}
				</Text>

				<View style={styles.content}>
					<View style={styles.body}>
						{notice.INV ||
						notice.DOMN ||
						notice.DENO ||
						notice.APPL ||
						notice.TITR ||
						notice.AUTR ||
						notice.PAUT ||
						notice.ECOL ||
						notice.ATTR ||
						notice.PERI ||
						notice.MILL ||
						notice.EPOQ ||
						notice.PEOC ||
						notice.TECH ||
						notice.DIMS ||
						notice.INSC ||
						notice.PINS ||
						notice.ONOM ||
						notice.DESC ||
						notice.ETAT ||
						notice.REPR ||
						notice.PREP ||
						notice.DREP ||
						notice.SREP ? (
							<View>
								<Text style={styles.subtitle}>
									Identification du bien culturel
								</Text>
								<Field
									title={mapping.joconde.INV.label}
									content={notice.INV}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.DOMN.label}
									content={pdfLinks(notice.DOMN, "domn")}
									separator="#"
									isPdf={true}
									link={true}
									isLineBreakLink={false}
								/>
								<Field
									title={mapping.joconde.DENO.label}
									content={pdfLinks(notice.DENO, "deno")}
									separator="#"
									isPdf={true}
									link={true}
									isLineBreakLink={false}
								/>
								<Field
									title={mapping.joconde.APPL.label}
									content={notice.APPL}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.TITR.label}
									content={notice.TITR}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.AUTR.label}
									content={pdfLinks(notice.AUTR, "auteur")}
									separator="#"
									isPdf={true}
									link={true}
									isLineBreakLink={false}
								/>
								<Field
									title={mapping.joconde.NSDA.label}
									content={notice.NSDA}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.PAUT.label}
									content={notice.PAUT}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.ECOL.label}
									content={notice.ECOL}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.ATTR.label}
									content={notice.ATTR}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.PERI.label}
									content={pdfLinks(notice.PERI, "periode")}
									separator="#"
									isPdf={true}
									link={true}
									isLineBreakLink={false}
								/>
								<Field
									title={mapping.joconde.MILL.label}
									content={notice.MILL}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.EPOQ.label}
									content={notice.EPOQ}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.PEOC.label}
									content={notice.PEOC}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.TECH.label}
									content={pdfLinks(notice.TECH, "tech")}
									separator="#"
									isPdf={true}
									link={true}
									isLineBreakLink={false}
								/>
								<Field
									title={mapping.joconde.DIMS.label}
									content={notice.DIMS}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.INSC.label}
									content={notice.INSC}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.PINS.label}
									content={notice.PINS}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.ONOM.label}
									content={notice.ONOM}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.DESC.label}
									content={notice.DESC}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.ETAT.label}
									content={notice.ETAT}
									separator="#"
									isPdf={true}
								/>
								<TextFieldReprPdf
									title={mapping.joconde.REPR.label}
									content={notice.REPR}
								/>
								{/* <Field title={mapping.joconde.REPR.label} content={pdfLinks(notice.REPR, "repr")} separator="#" isPdf={true} link={true} isLineBreakLink={false} /> */}
								<Field
									title={mapping.joconde.PREP.label}
									content={notice.PREP}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.DREP.label}
									content={notice.DREP}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.SREP.label}
									content={notice.SREP}
									separator="#"
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.GENE ||
						notice.HIST ||
						notice.LIEUX ||
						notice.PLIEUX ||
						notice.GEOHI ||
						notice.UTIL ||
						notice.PUTI ||
						notice.PERU ||
						notice.MILU ||
						notice.DECV ||
						notice.PDEC ||
						notice.NSDA ? (
							<View>
								<Text style={styles.subtitle}>
									Contexte historique
								</Text>
								<Field
									title={mapping.joconde.GENE.label}
									content={notice.GENE}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.HIST.label}
									content={notice.HIST}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.LIEUX.label}
									content={notice.LIEUX}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.PLIEUX.label}
									content={notice.PLIEUX}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.GEOHI.label}
									content={notice.GEOHI}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.UTIL.label}
									content={pdfLinks(notice.UTIL, "util")}
									separator="#"
									isPdf={true}
									link={true}
									isLineBreakLink={true}
								/>
								<Field
									title={mapping.joconde.PUTI.label}
									content={notice.PUTI}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.PERU.label}
									content={notice.PERU}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.MILU.label}
									content={notice.MILU}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.DECV.label}
									content={notice.DECV}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.PDEC.label}
									content={notice.PDEC}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.NSDA.label}
									content={notice.NSDA}
									separator="#"
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.STAT ||
						notice.DACQ ||
						notice.APTN ||
						notice.DEPO ||
						notice.DDPT ||
						notice.ADPT ||
						notice.LOCA ||
						notice.MANQUANT ||
						notice.MANQUANT_COM ? (
							<View>
								<Text style={styles.subtitle}>
									Informations juridiques
								</Text>
								<Field
									title={mapping.joconde.STAT.label}
									content={notice.STAT}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.DACQ.label}
									content={notice.DACQ}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.APTN.label}
									content={notice.APTN}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.DEPO.label}
									content={notice.DEPO}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.DDPT.label}
									content={notice.DDPT}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.ADPT.label}
									content={notice.ADPT}
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.LOCA.label}
									content={pdfLinks(notice.LOCA, "loca")}
									separator="#"
									isPdf={true}
									link={true}
									isLineBreakLink={false}
								/>
								<Field
									title={mapping.joconde.MANQUANT.label}
									content={notice.MANQUANT}
									separator="#"
									isPdf={true}
								/>
								<Field
									title=""
									content={notice.MANQUANT_COM}
									separator="#"
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.COMM || notice.EXPO || notice.BIBL ? (
							<View>
								<Text style={styles.subtitle}>
									Informations complémentaires
								</Text>
								<Field
									title={mapping.joconde.COMM.label}
									content={notice.COMM}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.EXPO.label}
									content={notice.EXPO}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.joconde.BIBL.label}
									content={notice.BIBL}
									separator="#"
									isPdf={true}
									link={true}
								/>
							</View>
						) : null}
					</View>
					<View style={styles.seeMore}>
						<View>
							<Image
								style={styles.image}
								src={
									`${bucket_url +
									notice.IMG[0]}?${new Date().getTime()}`
								}
							/>
						</View>
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
								title={mapping.joconde.REF.label}
								content={notice.REF}
								separator="#"
								isPdf={true}
							/>
							<Field
								title={mapping.joconde.BASE.label}
								content={notice.BASE}
								separator="#"
								isPdf={true}
							/>
							<Field
								title={mapping.joconde.DMIS.label}
								content={notice.DMIS}
								separator="#"
								isPdf={true}
							/>
							<Field
								title={mapping.joconde.DMAJ.label}
								content={notice.DMAJ}
								separator="#"
								isPdf={true}
							/>
							<Field
								title={mapping.joconde.PHOT.label}
								content={notice.PHOT}
								separator="#"
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
							{notice.LVID ||
							(notice.WWW && notice.WWW.length) ||
							notice.MUSEO ||
							isURL(notice.RETIF) ||
							isEmail(notice.MSGCOM) ? (
								<Text style={styles.subtitle}>Voir aussi</Text>
							) : (
								<></>
							)}
							{notice.LVID ? (
								<Text style={styles.fieldTitle}>
									{mapping.joconde.LVID.label}
								</Text>
							) : (
								<></>
							)}
							{notice.LVID ? (
								<Link
									style={styles.listLinked}
									title={mapping.joconde.LVID.label}
									src={notice.LVID}
									key="notice.LVID"
								>
									<Text>{notice.LVID}</Text>
								</Link>
							) : (
								<></>
							)}

							{notice.WWW && notice.WWW.length > 0 ? (
								<Text style={styles.fieldTitle}>
									{mapping.joconde.WWW.label}
								</Text>
							) : (
								<></>
							)}
							{notice.WWW && notice.WWW.length ? (
								notice.WWW.map((value, index) => {
									return (
										<Link
											style={styles.listLinked}
											src={notice.WWW[index]}
											target="_blank"
											key={notice.WWW[index]}
										>
											<Text>{notice.WWW[index]}</Text>
										</Link>
									);
								})
							) : (
								<></>
							)}

							{notice.MUSEO ? (
								<Text style={styles.fieldTitle}>
									{mapping.joconde.MUSEO.label}
								</Text>
							) : (
								<></>
							)}
							{notice.MUSEO ? (
								<Link
									style={styles.listLinked}
									title={mapping.joconde.MUSEO.label}
									src={`/notice/museo/${notice.MUSEO}`}
									key={notice.MUSEO}
								>
									<Text>
										{museo
											? [
													museo.NOMOFF ||
														museo.NOMUSAGE ||
														museo.ANC,
													museo.VILLE_M ||
														museo.VILLE_AD,
													museo.REF,
												].join(" - ")
											: null}
									</Text>
								</Link>
							) : (
								<></>
							)}

							{isURL(notice.RETIF) ? (
								<Text style={styles.fieldTitle}>
									{mapping.joconde.RETIF.label}
								</Text>
							) : (
								<></>
							)}
							{isURL(notice.RETIF) ? (
								<Link
									style={styles.listLinked}
									title={mapping.joconde.RETIF.label}
									src={notice.RETIF}
									key="notice.RETIF"
								>
									<Text>{notice.RETIF}</Text>
								</Link>
							) : (
								<></>
							)}

							{isEmail(notice.MSGCOM) ? (
								<Text style={styles.fieldTitle}>
									{mapping.joconde.MSGCOM.label}
								</Text>
							) : (
								<></>
							)}
							{isEmail(notice.MSGCOM) ? (
								<Link
									style={styles.listLinked}
									title={mapping.joconde.MSGCOM.label}
									src={`mailto:${notice.MSGCOM}`}
									key="notice.MSGCOM"
								>
									<Text>{`mailto:${notice.MSGCOM}`}</Text>
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
