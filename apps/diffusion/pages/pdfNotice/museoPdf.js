import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { LinkedNoticesPdf } from "../pdfNotice/components/LinkedNoticesPdf";
import { styles } from "../pdfNotice/styles";
import { pdfLinks } from "../../src/notices/utils";
import { bucket_url } from "../../src/config";

export function MuseoPdf(notice, title, links){
  return(
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header} fixed>
          {" "}
        </Text>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.content}>
          <View style={styles.body}>
            {(notice.NOMOFF || notice.NOMUSAGE || notice.NOMANC) ?
            <View>
                <Text style={styles.subtitle} >Nom du musée</Text>
                <Field title={mapping.museo.NOMOFF.label} content={notice.NOMOFF} isPdf={true} />
                <Field title={mapping.museo.NOMUSAGE.label} content={notice.NOMUSAGE} isPdf={true} />
                <Field title={mapping.museo.NOMANC.label} content={notice.NOMANC} isPdf={true} />
            </View> : null}
            
            {(notice.ADRL_1 || notice.LIEU_M || notice.CP_M || notice.VILLE_M || notice.DPT || notice.REGION) ? 
            <View>
                <Text style={styles.subtitle} >Adresse</Text>
                <Field title={mapping.museo.ADRL1_M.label} content={notice.ADRL1_M} isPdf={true} />
                <Field title={mapping.museo.LIEU_M.label} content={notice.LIEU_M} isPdf={true} />
                <Field title={mapping.museo.CP_M.label} content={notice.CP_M} isPdf={true} />
                <Field title={mapping.museo.VILLE_M.label} content={notice.VILLE_M} isPdf={true} />
                <Field title={mapping.museo.DPT.label} content={notice.DPT} isPdf={true} />
                <Field title={mapping.museo.REGION.label} content={notice.REGION} isPdf={true} />
            </View>
            : null}

            {(notice.TEL_M || notice.CONTACT_GENERIQUE || notice.URL_M || notice.ACCES || notice.LABEL) ? 
            <View>
                <Text style={styles.subtitle} >Contact Biographique</Text>
                <Field title={mapping.museo.TEL_M.label} content={notice.TEL_M} isPdf={true} />
                <Field title={mapping.museo.CONTACT_GENERIQUE.label} content={notice.CONTACT_GENERIQUE} isPdf={true} />
                <Field title={mapping.museo.URL_M.label} content={"https://" + notice.URL_M} isPdf={true} link={true} />
                <Field title={mapping.museo.ACCES.label} content={notice.ACCES} isPdf={true} />
            </View>
            : null}

            {(notice.CATEG || notice.DOMPAL || notice.HIST || notice.ATOUT || notice.THEMES ||
              notice.ARTISTE || notice.PHARE || notice.AN_CREAT || notice.INTERET) ? 
            <View>
                <Text style={styles.subtitle} >Collection</Text>
                <Field title={mapping.museo.CATEG.label} content={notice.CATEG} isPdf={true} />
                <Field title={mapping.museo.DOMPAL.label} content={notice.DOMPAL} isPdf={true} />
                <Field title={mapping.museo.HIST.label} content={notice.HIST} isPdf={true} />
                <Field title={mapping.museo.ATOUT.label} content={notice.ATOUT} isPdf={true} />
                <Field title={mapping.museo.THEMES.label} content={notice.THEMES} isPdf={true} />
                <Field title={mapping.museo.ARTISTE.label} content={notice.ARTISTE} isPdf={true} />
                <Field title={mapping.museo.PHARE.label} content={notice.PHARE} isPdf={true} />
                <Field title={mapping.museo.AN_CREAT.label} content={notice.AN_CREAT} isPdf={true} />
                <Field title={mapping.museo.INTERET.label} content={notice.INTERET} isPdf={true} />
                <Field title={mapping.museo["PROT-BAT"].label} content={notice["PROT-BAT"]} isPdf={true} />
                <Field title={mapping.museo["PROT-ESP"].label} content={notice["PROT-ESP"]} isPdf={true} />
            </View>
            : null}
          </View>
          <View style={styles.seeMore}>
            { notice.PHOTO ?
            <View>
              <Image style={styles.image}
                src={bucket_url + notice.PHOTO + "?" + (new Date()).getTime()}
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
                <Field title={mapping.museo.REF.label} content={notice.REF} isPdf={true} />
                <Field title={mapping.museo.BASE.label} content={notice.BASE} isPdf={true} />
                <Field title={mapping.museo.COPY.label} content={notice.COPY} isPdf={true} />
                <Field title={mapping.museo.DT_SAISI.label} content={notice.DT_SAISI} isPdf={true} />
                <Field title={"Contactez-nous"} content={notice.CONTACT_GENERIQUE} isPdf={true} />
            </View>
          </View>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
)}
