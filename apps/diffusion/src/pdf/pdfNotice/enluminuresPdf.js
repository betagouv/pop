import Field from "../../notices/Field";
import mapping from "../../services/mapping";
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { styles } from "../pdfNotice/styles";
import { bucket_url } from "../../config";

export function EnluminuresPdf(notice, title) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header} fixed>
          {" "}
        </Text>
        <Text style={styles.title}>{notice.TITR + " - " + notice.SUJET}</Text>

        <View style={styles.content}>
          <View style={styles.body}>
            {(notice.ATTRIB || notice.CONTXT || notice.DATE || notice.NOMENC || notice.NOTES || notice.NOTDEC ||
              notice.ORIGG || notice.ORIGH || notice.POSS || notice.REFD || notice.SUJET || notice.TITR || notice.TYPDEC) ?
              <View>
                <Text style={styles.subtitle} >Identification du bien culturel</Text>
                <Field title={mapping.enluminures.ATTRIB.label} content={notice.ATTRIB} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.CONTXT.label} content={notice.CONTXT} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.DATE.label} content={notice.DATE} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.NOMENC.label} content={notice.NOMENC} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.NOTES.label} content={notice.NOTES} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.NOTDEC.label} content={notice.NOTDEC} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.ORIGG.label} content={notice.ORIGG} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.POSS.label} content={notice.POSS} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.REFD.label} content={notice.REFD} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.SUJET.label} content={notice.SUJET} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.TITR.label} content={notice.TITR} separator="#" isPdf={true} />
                <Field title={mapping.enluminures.TYPDEC.label} content={notice.TYPDEC} separator="/" isPdf={true} />
              </View> : null}
          </View>
          <View style={styles.seeMore}>
            {notice.VIDEO.length > 0 ?
              <View>
                <Image style={styles.image}
                  src={bucket_url + notice.VIDEO[0] + "?" + (new Date()).getTime()}
                />
              </View> : null}

            <View style={styles.aPropos}>
              <Text style={styles.subtitle} >À propos de la notice</Text>
              <Field title={mapping.enluminures.REF.label} content={notice.REF} separator="#" isPdf={true} />
              <Field title={mapping.enluminures.BASE.label} content={notice.BASE} separator="#" isPdf={true} />
              <Field title={mapping.enluminures.DROIT.label} content={notice.DROIT} separator="#" isPdf={true} />
              <Field title={mapping.enluminures.ATTRIB.label} content={notice.ATTRIB} separator="#" isPdf={true} />
              <Field title={mapping.enluminures.COPY.label} content={notice.COPY} separator="#" isPdf={true} />
              <Field title={"Contactez-nous"} content={notice.CONTACT} separator=";" isPdf={true} />
            </View>
          </View>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  )
}
