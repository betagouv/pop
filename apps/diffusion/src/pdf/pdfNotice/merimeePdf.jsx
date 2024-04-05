import Field from "../../notices/Field";
import mapping from "../../services/mapping";
import { Document, Page, View, Text, Image, Link } from "@react-pdf/renderer";
import { LinkedNoticesPdf } from "../pdfNotice/components/LinkedNoticesPdf";
import { styles } from "../pdfNotice/styles";
import { bucket_url } from "../../config";
import { postFixedLink, getUrlArchive } from "../../notices/utils";

export function MerimeePdf(notice, title, localisation, links) {
	const arr = [];

	/**  if (notice.DOSURL) {
     arr.push(
       <Field
         title={mapping.merimee.DOSURL.label}
         content={<a href={notice.DOSURL}>Voir le dossier complet sur le site de la région</a>}
         key="notice.DOSURL"
       />
     );
   }
 
   if (notice.DOSURLPDF) {
     arr.push(
       <Field
         title={mapping.merimee.DOSURLPDF.label}
         content={<a href={postFixedLink(notice.DOSURLPDF)}>Voir le dossier d'origine numérisé</a>}
         key="notice.DOSURLPDF"
       />
     );
   }
 
   if (notice.POP_DOSSIER_VERT) {
     arr.push(
       <Field
         title={mapping.palissy.POP_DOSSIER_VERT.label}
         content={
           <a href={`${bucket_url}${notice.POP_DOSSIER_VERT}`}>Voir le dossier d'origine numérisé</a>
         }
         key="notice.POP_DOSSIER_VERT"
       />
     );
   }
 
   if (notice.POP_ARRETE_PROTECTION && notice.POP_ARRETE_PROTECTION.length) {
     const urls = [];
     for (let i = 0; i < notice.POP_ARRETE_PROTECTION.length; i++) {
       const filename = notice.POP_ARRETE_PROTECTION[i].split(/(\\|\/)/g).pop();
       urls.push(
         <a key={filename} href={`${bucket_url}${notice.POP_ARRETE_PROTECTION[i]}`}>
           {filename}
         </a>
       );
     }
     arr.push(
       <Field
         key="notice.POP_ARRETE_PROTECTION"
         title={mapping.merimee.POP_ARRETE_PROTECTION.label}
         content={<div style={{ display: "flex", flexDirection: "column" }}>{urls}</div>}
       />
     );
   }
 
   if (notice.POP_DOSSIER_PROTECTION && notice.POP_DOSSIER_PROTECTION.length) {
     const urls = [];
     for (let i = 0; i < notice.POP_DOSSIER_PROTECTION.length; i++) {
       const filename = notice.POP_DOSSIER_PROTECTION[i].split(/(\\|\/)/g).pop();
       urls.push(
         <a key={filename} href={`${bucket_url}${notice.POP_DOSSIER_PROTECTION[i]}`}>
           {filename}
         </a>
       );
     }
     arr.push(
       <Field
         key="notice.POP_DOSSIER_PROTECTION"
         title={mapping.merimee.POP_DOSSIER_PROTECTION.label}
         content={<div style={{ display: "flex", flexDirection: "column" }}>{urls}</div>}
       />
     );
   }
 
   if (notice.LIENS && notice.LIENS.length) {
     for (let i = 0; i < notice.LIENS.length; i++) {
       arr.push(
         <Field
           title={mapping.merimee.LIENS.label}
           content={<a href={notice.LIENS[i]}>{notice.LIENS[i]}</a>}
           key={`notice.LIENS${i}`}
         />
       );
     }
   }
 
   if (notice.LINHA) {
     if(notice.LINHA.length>0){
       arr.push(
         <Field
           title={mapping.merimee.LINHA.label}
           content={<a href={notice.LINHA[0]}>{notice.LINHA[0]}</a>}
           key="notice.LINHA_0"
         />
       );
 
       for(let i=1; i<notice.LINHA.length; i++){
         arr.push(
           <Field
             content={<a href={notice.LINHA[i]}>{notice.LINHA[i]}</a>}
             key={"notice.LINHA_"+i}
           />
           );
       }      
     }
   }
 
   if (notice.LREG) {
     if(notice.LREG.length>0){
       arr.push(
         <Field
           title={mapping.merimee.LREG.label}
           content={<a href={notice.LREG[0]}>{notice.LREG[0]}</a>}
           key="notice.LREG_0"
         />
       );
 
       for(let i=1; i<notice.LREG.length; i++){
         arr.push(
           <Field
             content={<a href={notice.LREG[i]}>{notice.LREG[i]}</a>}
             key={"notice.LREG_"+i}
           />
           );
       }      
     }
   }
 
   if (notice.LMDP) {
     arr.push(
       <Field
         content={
           <a href={getUrlArchive(notice.REF)} target="_blank">
             Les archives conservées à la Médiathèque de l'architecture et du patrimoine
           </a>
         }
         key="mediathek_cible"
       />
     );
   } */
	return (
		<Document>
			<Page style={styles.page}>
				<Text style={styles.header} fixed>
					{" "}
				</Text>
				<Text style={styles.title}>{title}</Text>

				<View style={styles.content}>
					<View style={styles.body}>
						{notice.DENO ||
						notice.GENR ||
						notice.PDEN ||
						notice.VOCA ||
						notice.APPL ||
						notice.ACTU ||
						notice.TICO ? (
							<View>
								<Text style={styles.subtitle}>Désignation</Text>
								<Field
									title={mapping.merimee.DENO.label}
									content={notice.DENO}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.GENR.label}
									content={notice.GENR}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.PDEN.label}
									content={notice.PDEN}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.VOCA.label}
									content={notice.VOCA}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.APPL.label}
									content={notice.APPL}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.ACTU.label}
									content={notice.ACTU}
									separator="#"
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.TICO.label}
									content={notice.TICO}
									separator="#"
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.REG ||
						notice.DPT ||
						notice.COM ||
						notice.PLOC ||
						notice.AIRE ||
						notice.CANT ||
						notice.LIEU ||
						notice.ADRS ||
						notice.CADA ||
						notice.IMPL ||
						notice.HYDR ||
						notice.PARN ||
						notice.EDIF ||
						notice.REFE ||
						notice.COLL ? (
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
									title={mapping.merimee.PLOC.label}
									content={notice.PLOC}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.AIRE.label}
									content={notice.AIRE}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.CANT.label}
									content={notice.CANT}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.LIEU.label}
									content={notice.LIEU}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.ADRS.label}
									content={notice.ADRS}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.CADA.label}
									content={notice.CADA}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.IMPL.label}
									content={notice.IMPL}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.HYDR.label}
									content={notice.HYDR}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.PARN.label}
									content={notice.PARN}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.EDIF.label}
									content={notice.EDIF}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.REFE.label}
									content={notice.REFE}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.COLL.label}
									content={notice.COLL}
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.SCLE ||
						notice.SCLD ||
						notice.DATE ||
						notice.JDAT ||
						notice.AUTR ||
						notice.REFM ||
						notice.JATT ||
						notice.PERS ||
						notice.REMP ||
						notice.DEPL ||
						notice.HIST ? (
							<View>
								<Text style={styles.subtitle}>Historique</Text>
								<Field
									title={mapping.merimee.SCLE.label}
									content={notice.SCLE}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.SCLD.label}
									content={notice.SCLD}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.DATE.label}
									content={notice.DATE}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.JDAT.label}
									content={notice.JDAT}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.AUTR.label}
									content={notice.AUTR}
									isPdf={true}
									link={true}
								/>
								<Field
									title={mapping.merimee.REFM.label}
									content={notice.REFM}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.JATT.label}
									content={notice.JATT}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.PERS.label}
									content={notice.PERS}
									isPdf={true}
									separator="£"
								/>
								<Field
									title={mapping.merimee.REMP.label}
									content={notice.REMP}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.DEPL.label}
									content={notice.DEPL}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.HIST.label}
									content={notice.HIST}
									isPdf={true}
									separator="£"
								/>
							</View>
						) : null}

						{notice.MURS ||
						notice.TOIT ||
						notice.PLAN ||
						notice.ETAG ||
						notice.VOUT ||
						notice.ELEV ||
						notice.COUV ||
						notice.ESCA ||
						notice.ENER ||
						notice.VERT ||
						notice.DESC ||
						notice.TECH ||
						notice.REPR ||
						notice.PREP ||
						notice.DIMS ||
						notice.TYPO ||
						notice.ETAT ? (
							<View>
								<Text style={styles.subtitle}>Description</Text>
								<Field
									title={mapping.merimee.MURS.label}
									content={notice.MURS}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.TOIT.label}
									content={notice.TOIT}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.PLAN.label}
									content={notice.PLAN}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.ETAG.label}
									content={notice.ETAG}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.VOUT.label}
									content={notice.VOUT}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.ELEV.label}
									content={notice.ELEV}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.COUV.label}
									content={notice.COUV}
									isPdf={true}
								/>
								<Field
									title="Emplacement, forme et structure de l’escalier"
									content={notice.ESCA}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.ENER.label}
									content={notice.ENER}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.VERT.label}
									content={notice.VERT}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.DESC.label}
									content={notice.DESC}
									isPdf={true}
									separator="£"
								/>
								<Field
									title="Technique du décor des immeubles par nature"
									content={notice.TECH}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.REPR.label}
									content={notice.REPR}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.PREP.label}
									content={notice.PREP}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.DIMS.label}
									content={notice.DIMS}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.TYPO.label}
									content={notice.TYPO}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.ETAT.label}
									content={notice.ETAT}
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.PROT ||
						notice.DPRO ||
						notice.PPRO ||
						notice.APRO ||
						notice.MHPP ||
						notice.REFO ||
						notice.SITE ||
						notice.INTE ||
						notice.PINT ||
						notice.REMA ||
						notice.DLAB ||
						notice.OBS ? (
							<View>
								<Text style={styles.subtitle}>Protection</Text>
								<Field
									title={mapping.merimee.PROT.label}
									content={notice.PROT}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.DPRO.label}
									content={notice.DPRO}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.PPRO.label}
									content={notice.PPRO}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.APRO.label}
									content={notice.APRO}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.MHPP.label}
									content={notice.MHPP}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.REFO.label}
									content={notice.REFO}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.SITE.label}
									content={notice.SITE}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.INTE.label}
									content={notice.INTE}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.PINT.label}
									content={notice.PINT}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.REMA.label}
									content={notice.REMA}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.DLAB.label}
									content={notice.DLAB}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.OBS.label}
									content={notice.OBS}
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.STAT ||
						notice.PSTA ||
						notice.AFFE ||
						notice.PAFF ||
						notice.VISI ? (
							<View>
								<Text style={styles.subtitle}>
									Statut juridique
								</Text>
								<Field
									title={mapping.merimee.STAT.label}
									content={notice.STAT}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.PSTA.label}
									content={notice.PSTA}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.AFFE.label}
									content={notice.AFFE}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.PAFF.label}
									content={notice.PAFF}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.VISI.label}
									content={notice.VISI}
									isPdf={true}
								/>
							</View>
						) : null}

						{notice.DENQ ||
						notice.COPY ||
						notice.DBOR ||
						notice.NOMS ||
						notice.ETUD ||
						notice.DOSS ||
						notice.REFIM ||
						notice.WEB ||
						notice.ARCHEO ||
						notice.DOSADRS ? (
							<View>
								<Text style={styles.subtitle}>
									Références documentaires
								</Text>
								<Field
									title={mapping.merimee.DENQ.label}
									content={notice.DENQ}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.COPY.label}
									content={notice.COPY}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.DBOR.label}
									content={notice.DBOR}
									isPdf={true}
								/>
								<Field
									title="Noms des rédacteurs de la notice et du dossier"
									content={notice.NOMS}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.ETUD.label}
									content={notice.ETUD}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.DOSS.label}
									content={notice.DOSS}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.REFIM.label}
									content={notice.REFIM}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.WEB.label}
									content={notice.WEB}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.ARCHEO.label}
									content={notice.ARCHEO}
									isPdf={true}
								/>
								<Field
									title={mapping.merimee.DOSADRS.label}
									content={notice.DOSADRS}
									isPdf={true}
									separator="£"
								/>
							</View>
						) : null}
					</View>
					<View style={styles.seeMore}>
						{notice.MEMOIRE.length > 0 && notice.MEMOIRE[0].url ? (
							<View>
								<Image
									style={styles.image}
									src={
										`${bucket_url +
										notice.MEMOIRE[0].url}?${new Date().getTime()}`
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
								title={mapping.merimee.REF.label}
								content={notice.REF}
								isPdf={true}
								separator="#"
							/>
							<Field
								title={mapping.merimee.BASE.label}
								content={notice.BASE}
								isPdf={true}
							/>
							<Field
								title={mapping.merimee.DMIS.label}
								content={notice.DMIS}
								isPdf={true}
							/>
							<Field
								title={mapping.merimee.DMAJ.label}
								content={notice.DMAJ}
								isPdf={true}
							/>
							<Field
								title={mapping.merimee.NOMS.label}
								content={notice.NOMS}
								isPdf={true}
							/>
							<Field
								title={mapping.merimee.COPY.label}
								content={notice.COPY}
								isPdf={true}
							/>
							<Field
								title={"Contactez-nous"}
								content={notice.CONTACT}
								isPdf={true}
								separator="#"
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
									<Text>{notice.DOSURL}</Text>
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
										{postFixedLink(notice.DOSURLPDF)}
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
									<Text>{`${bucket_url}${notice.POP_DOSSIER_VERT}`}</Text>
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
												<Text>
													{notice.POP_ARRETE_PROTECTION[
														index
													]
														.split(/(\\|\/)/g)
														.pop()}
												</Text>
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
												<Text>
													{notice.POP_DOSSIER_PROTECTION[
														index
													]
														.split(/(\\|\/)/g)
														.pop()}
												</Text>
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
							{notice.LINHA && notice.LINHA.length > 0 ? (
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
