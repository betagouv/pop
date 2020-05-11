import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { LinkedNoticesPdf } from "../pdfNotice/components/LinkedNoticesPdf";
import { styles } from "../pdfNotice/styles";
import { pdfLinks } from "../../src/notices/utils";

export function MerimeePdf(notice, title, links){
  return(
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.content}>
          <View style={styles.body}>
            {(notice.DENO || notice.GENR || notice.PDEN || notice.VOCA || notice.APPL || notice.ACTU || notice.TICO) ?
            <View>
                <Text style={styles.subtitle} >Désignation</Text>
                <Field title={mapping.merimee.DENO.label} content={notice.DENO} separator="#" isPdf={true} />
                <Field title={mapping.merimee.GENR.label} content={notice.GENR} separator="#" isPdf={true} />
                <Field title={mapping.merimee.PDEN.label} content={notice.PDEN} separator="#" isPdf={true} />
                <Field title={mapping.merimee.VOCA.label} content={notice.VOCA} separator="#" isPdf={true} />
                <Field title={mapping.merimee.APPL.label} content={notice.APPL} separator="#" isPdf={true} />
                <Field title={mapping.merimee.ACTU.label} content={notice.ACTU} separator="#" isPdf={true} />
                <Field title={mapping.merimee.TICO.label} content={notice.TICO} separator="#" isPdf={true} />
            </View> : null}
            
            {(notice.REG || notice.DPT || notice.COM || notice.PLOC || notice.AIRE || notice.CANT || notice.LIEU || notice.ADRS ||
              notice.CADA || notice.IMPL || notice.HYDR || notice.PARN || notice.EDIF || notice.REFE || notice.COLL) ?
            <View>
                <Text style={styles.subtitle} >Localisation</Text>
                <Field title={mapping.merimee.PLOC.label} content={notice.PLOC}  isPdf={true} />
                <Field title={mapping.merimee.AIRE.label} content={notice.AIRE}  isPdf={true} />
                <Field title={mapping.merimee.CANT.label} content={notice.CANT}  isPdf={true} />
                <Field title={mapping.merimee.LIEU.label} content={notice.LIEU}  isPdf={true} />
                <Field title={mapping.merimee.ADRS.label} content={notice.ADRS}  isPdf={true} />
                <Field title={mapping.merimee.CADA.label} content={notice.CADA}  isPdf={true} />
                <Field title={mapping.merimee.IMPL.label} content={notice.IMPL}  isPdf={true} />
                <Field title={mapping.merimee.HYDR.label} content={notice.HYDR}  isPdf={true} />
                <Field title={mapping.merimee.PARN.label} content={notice.PARN}  isPdf={true} />
                <Field title={mapping.merimee.EDIF.label} content={notice.EDIF}  isPdf={true} />
                <Field title={mapping.merimee.REFE.label} content={notice.REFE}  isPdf={true} />
                <Field title={mapping.merimee.COLL.label} content={notice.COLL}  isPdf={true} />
            </View> : null}

            {(notice.SCLE || notice.SCLD || notice.DATE || notice.JDAT || notice.AUTR || notice.REFM || notice.JATT || notice.PERS || notice.REMP || notice.DEPL || notice.HIST) ?
            <View>
                <Text style={styles.subtitle} >Historique</Text>
                <Field title={mapping.merimee.SCLE.label} content={notice.SCLE} isPdf={true} />
                <Field title={mapping.merimee.SCLD.label} content={notice.SCLD} isPdf={true} />
                <Field title={mapping.merimee.DATE.label} content={notice.DATE} isPdf={true} />
                <Field title={mapping.merimee.JDAT.label} content={notice.JDAT} isPdf={true} />
                <Field title={mapping.merimee.AUTR.label} content={notice.AUTR} isPdf={true} link={true}/>
                <Field title={mapping.merimee.REFM.label} content={notice.REFM} isPdf={true} />
                <Field title={mapping.merimee.JATT.label} content={notice.JATT} isPdf={true} />
                <Field title={mapping.merimee.PERS.label} content={notice.PERS} isPdf={true} separator="£" />
                <Field title={mapping.merimee.REMP.label} content={notice.REMP} isPdf={true} />
                <Field title={mapping.merimee.DEPL.label} content={notice.DEPL} isPdf={true} />
                <Field title={mapping.merimee.HIST.label} content={notice.HIST} isPdf={true} separator="£" />
            </View> : null}

            {(notice.MURS || notice.TOIT || notice.PLAN || notice.ETAG || notice.VOUT || notice.ELEV || notice.COUV || notice.ESCA ||
              notice.ENER || notice.VERT || notice.DESC || notice.TECH || notice.REPR || notice.PREP || notice.DIMS || notice.TYPO || notice.ETAT) ? 
            <View>
              <Text style={styles.subtitle} >Description</Text>
                  <Field title={mapping.merimee.MURS.label} content={notice.MURS} isPdf={true} />
                  <Field title={mapping.merimee.TOIT.label} content={notice.TOIT} isPdf={true} />
                  <Field title={mapping.merimee.PLAN.label} content={notice.PLAN} isPdf={true} />
                  <Field title={mapping.merimee.ETAG.label} content={notice.ETAG} isPdf={true} />
                  <Field title={mapping.merimee.VOUT.label} content={notice.VOUT} isPdf={true} />
                  <Field title={mapping.merimee.ELEV.label} content={notice.ELEV} isPdf={true} />
                  <Field title={mapping.merimee.COUV.label} content={notice.COUV} isPdf={true} />
                  <Field title="Emplacement, forme et structure de l’escalier" content={notice.ESCA} isPdf={true}/>
                  <Field title={mapping.merimee.ENER.label} content={notice.ENER} isPdf={true} />
                  <Field title={mapping.merimee.VERT.label} content={notice.VERT} isPdf={true} />
                  <Field title={mapping.merimee.DESC.label} content={notice.DESC} isPdf={true} separator="£" />
                  <Field title="Technique du décor des immeubles par nature" content={notice.TECH} isPdf={true} />
                  <Field title={mapping.merimee.REPR.label} content={notice.REPR} isPdf={true}/>
                  <Field title={mapping.merimee.PREP.label} content={notice.PREP} isPdf={true}/>
                  <Field title={mapping.merimee.DIMS.label} content={notice.DIMS} isPdf={true}/>
                  <Field title={mapping.merimee.TYPO.label} content={notice.TYPO} isPdf={true}/>
                  <Field title={mapping.merimee.ETAT.label} content={notice.ETAT} isPdf={true}/>
            </View>
            : null}

            {(notice.PROT || notice.DPRO || notice.PPRO || notice.APRO || notice.MHPP || notice.REFO ||
              notice.SITE || notice.INTE || notice.PINT || notice.REMA || notice.DLAB || notice.OBS) ? 
            <View>
                <Text style={styles.subtitle} >Protection</Text>
                <Field title={mapping.merimee.PROT.label} content={notice.PROT}  isPdf={true} />
                <Field title={mapping.merimee.DPRO.label} content={notice.DPRO}  isPdf={true} />
                <Field title={mapping.merimee.PPRO.label} content={notice.PPRO}  isPdf={true} />
                <Field title={mapping.merimee.APRO.label} content={notice.APRO}  isPdf={true} />
                <Field title={mapping.merimee.MHPP.label} content={notice.MHPP}  isPdf={true} />
                <Field title={mapping.merimee.REFO.label} content={notice.REFO}  isPdf={true} />
                <Field title={mapping.merimee.SITE.label} content={notice.SITE}  isPdf={true} />
                <Field title={mapping.merimee.INTE.label} content={notice.INTE}  isPdf={true} />
                <Field title={mapping.merimee.PINT.label} content={notice.PINT}  isPdf={true} />
                <Field title={mapping.merimee.REMA.label} content={notice.REMA}  isPdf={true} />
                <Field title={mapping.merimee.DLAB.label} content={notice.DLAB}  isPdf={true} />
                <Field title={mapping.merimee.OBS.label} content={notice.OBS}  isPdf={true} />
            </View>
            : null}

            {(notice.STAT || notice.PSTA || notice.AFFE || notice.PAFF || notice.VISI) ? 
            <View>
                <Text style={styles.subtitle} >Statut juridique</Text>
                <Field title={mapping.merimee.STAT.label} content={notice.STAT} isPdf={true} />
                <Field title={mapping.merimee.PSTA.label} content={notice.PSTA} isPdf={true} />
                <Field title={mapping.merimee.AFFE.label} content={notice.AFFE} isPdf={true} />
                <Field title={mapping.merimee.PAFF.label} content={notice.PAFF} isPdf={true} />
                <Field title={mapping.merimee.VISI.label} content={notice.VISI} isPdf={true} />
            </View>
            : null}

            {(notice.DENQ || notice.COPY || notice.DBOR || notice.NOMS || notice.ETUD || notice.DOSS || notice.REFIM || notice.WEB || notice.ARCHEO || notice.DOSADRS) ? 
            <View>
                <Text style={styles.subtitle} >Références documentaires</Text>
                <Field title={mapping.merimee.DENQ.label} content={notice.DENQ} isPdf={true} />
                <Field title={mapping.merimee.COPY.label} content={notice.COPY} isPdf={true} />
                <Field title={mapping.merimee.DBOR.label} content={notice.DBOR} isPdf={true} />
                <Field title="Noms des rédacteurs de la notice et du dossier" content={notice.NOMS} isPdf={true} />
                <Field title={mapping.merimee.ETUD.label} content={notice.ETUD} isPdf={true} />
                <Field title={mapping.merimee.DOSS.label} content={notice.DOSS} isPdf={true} />
                <Field title={mapping.merimee.REFIM.label} content={notice.REFIM} isPdf={true} />
                <Field title={mapping.merimee.WEB.label} content={notice.WEB} isPdf={true} />
                <Field title={mapping.merimee.ARCHEO.label} content={notice.ARCHEO} isPdf={true} />
                <Field title={mapping.merimee.DOSADRS.label} content={notice.DOSADRS} isPdf={true} separator="£" />
            </View>
            : null}
          </View>
          <View style={styles.seeMore}>
            { notice.MEMOIRE.length > 0 ?
            <View>
              <Image style={styles.image}
                src={"https://s3.eu-west-3.amazonaws.com/pop-phototeque-staging/" + notice.MEMOIRE[0].url}
              />
            </View> : null}
            
            {links.length > 0 ?
            <View style={styles.linkedNoticesContainer}>
              <Text style={styles.subtitle}>Notices liées</Text>
              <View>
                {links.length > 0 ?
                    links.map( link => {
                      return LinkedNoticesPdf(link);
                    }) : null}
              </View>
            </View>
            : null}

            <View style={styles.aPropos}>
                <Text  style={styles.subtitle} >À propos de la notice</Text>
                <Field title={mapping.merimee.REF.label} content={notice.REF}  isPdf={true} separator="#"/>
                <Field title={mapping.merimee.BASE.label} content={notice.BASE} isPdf={true}/>
                <Field title={mapping.merimee.DMIS.label} content={notice.DMIS} isPdf={true}/>
                <Field title={mapping.merimee.DMAJ.label} content={notice.DMAJ} isPdf={true}/>
                <Field title={mapping.merimee.NOMS.label} content={notice.NOMS} isPdf={true}/>
                <Field title={mapping.merimee.COPY.label} content={notice.COPY} isPdf={true}/>
                <Field title={"Contactez-nous"} content={notice.CONTACT}  isPdf={true} separator="#"/>
            </View>
          </View>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
)}
