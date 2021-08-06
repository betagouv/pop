import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { LinkedNoticesPdf } from "../pdfNotice/components/LinkedNoticesPdf";
import { styles } from "../pdfNotice/styles";
import { pdfLinks } from "../../src/notices/utils";
import { bucket_url } from "../../src/config";

export function MemoirePdf(notice, title, links){
  return(
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header} fixed>
          {" "}
        </Text>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.content}>
          <View style={styles.body}>
            {(notice.LOCA || notice.INSEE || notice.ADRESSE || notice.LIEU || notice.MCGEO) ?
            <View>
               <Text style={styles.subtitle} > 1. Sujet de la photographie</Text>
                <Text style={styles.subtitle} >Localisation</Text>
                <Field title={mapping.memoire.LOCA.label} content={notice.LOCA} separator="#" isPdf={true} />
                <Field title={mapping.memoire.INSEE.label} content={notice.INSEE} separator="#" isPdf={true} />
                <Field title={notice.ADRESSE != "" ? mapping.memoire.ADRESSE.label : mapping.memoire.LIEU.label} content={notice.ADRESSE != "" ? notice.ADRESSE : notice.LIEU} separator="#" isPdf={true} />
                <Field title={mapping.memoire.MCGEO.label} content={notice.MCGEO} separator="#" isPdf={true} />
            </View> : null}
            
            {(notice.EDIF || notice.OBJT || notice.TICO || notice.LEG || notice.TITRE || notice.THEATRE || notice.ROLE || notice.AUTOEU || notice.SCLE ||
              notice.DATOEU || notice.LIEUORIG || notice.SERIE || notice.MCL || notice.SUJET || notice.MCPER) ? 
            <View>
                <Text style={styles.subtitle} >Identification</Text>
                <Field title={mapping.memoire.EDIF.label} content={notice.EDIF} separator="#" isPdf={true} />
                <Field title={mapping.memoire.OBJT.label} content={notice.OBJT} separator="#" isPdf={true} />
                <Field title={mapping.memoire.TICO.label} content={notice.TICO} separator="#" isPdf={true} />
                <Field title={mapping.memoire.LEG.label} content={notice.LEG} separator="#" isPdf={true} />
                <Field title={mapping.memoire.TITRE.label} content={notice.TITRE} separator="#" isPdf={true} />
                <Field title={mapping.memoire.THEATRE.label} content={notice.THEATRE} separator="#" isPdf={true} />
                <Field title={mapping.memoire.ROLE.label} content={notice.ROLE} separator="#" isPdf={true} />
                <Field title={mapping.memoire.AUTOEU.label} content={notice.AUTOEU} separator="#" isPdf={true} />
                <Field title={mapping.memoire.SCLE.label} content={notice.SCLE} separator="#" isPdf={true} />
                <Field title={mapping.memoire.DATOEU.label} content={notice.DATOEU} separator="#" isPdf={true} />
                <Field title={mapping.memoire.LIEUORIG.label} content={notice.LIEUORIG} separator="#" isPdf={true} />
                <Field title={mapping.memoire.SERIE.label} content={pdfLinks(notice.SERIE, "serie")} separator="#" isPdf={true} link={true}/>
                <Field title="Mots-clés" content={notice.MCL + " " + notice.SUJET} separator="#" isPdf={true} />
                <Field title={mapping.memoire.MCPER.label} content={notice.MCPER} separator="#" isPdf={true} />
            </View>
            : null}

            {(notice.AUTOR || notice.TIREDE || notice.LIEUCOR || notice.COTECOR || notice.AUTG) ? 
            <View>
              <Text style={styles.subtitle} >Références des documents reproduits</Text>
              <Field title={mapping.memoire.AUTOR.label} content={notice.AUTOR} separator="#" isPdf={true} />
              <Field title={mapping.memoire.TIREDE.label} content={notice.TIREDE} separator="#" isPdf={true} />
              <Field title={mapping.memoire.LIEUCOR.label} content={notice.LIEUCOR} separator="#" isPdf={true} />
              <Field title={mapping.memoire.COTECOR.label} content={notice.COTECOR} separator="#" isPdf={true} />
              <Field title={mapping.memoire.AUTG.label} content={notice.AUTG} separator="#" isPdf={true} />
            </View>
            : null}

            {(notice.AUTP || notice.AUTTI) ? 
            <View>
              <Text style={styles.subtitle} >2. Auteur</Text>
              <Field title="Photographe ou dessinateur" content={pdfLinks(notice.AUTP, "auteur")} separator="#" isPdf={true} link={true} />
              <Field title={mapping.memoire.AUTTI.label} content={notice.AUTTI} separator="#" isPdf={true} />
            </View>
            : null}


            {(notice.TYPDOC || notice.NUMI || notice.NUMP || notice.ANUMP || notice.NUMAUTP || notice.NUMTI || notice.ANUMTI || notice.REPRO ||
              notice.REPRO || notice.NEGPOS || notice.NUMOR || notice.ANUMOR || notice.RENV || notice.LIEUCTI || notice.COTECTI || notice.PRECOR ||
              notice.ACQU || notice.DIFF || notice.ECH) ? 
            <View>
              <Text style={styles.subtitle} >3. Description de la photographie</Text>
              <Text style={styles.subtitle} >Éléments d’identification</Text>
              <Field title={mapping.memoire.TYPDOC.label} content={notice.TYPDOC} separator="#" isPdf={true} />
              <Field title={mapping.memoire.NUMI.label} content={notice.NUMI} separator="#" isPdf={true} />
              <Field title={mapping.memoire.NUMP.label} content={notice.NUMP} separator="#" isPdf={true} />
              <Field title={mapping.memoire.ANUMP.label} content={notice.ANUMP} separator="#" isPdf={true} />
              <Field title={mapping.memoire.NUMAUTP.label} content={notice.NUMAUTP} separator="#" isPdf={true} />
              <Field title={mapping.memoire.NUMTI.label} content={notice.NUMTI} separator="#" isPdf={true} />
              <Field title={mapping.memoire.ANUMTI.label} content={notice.ANUMTI} separator="#" isPdf={true} />
              <Field title={mapping.memoire.REPRO.label} content={notice.REPRO} separator="#" isPdf={true} />
              <Field title={mapping.memoire.NEGPOS.label} content={notice.NEGPOS} separator="#" isPdf={true} />
              <Field title={mapping.memoire.NUMOR.label} content={notice.NUMOR} separator="#" isPdf={true} />
              <Field title={mapping.memoire.ANUMOR.label} content={notice.ANUMOR} separator="#" isPdf={true} />
              <Field title={mapping.memoire.RENV.label} content={notice.RENV} separator="#" isPdf={true} />
              <Field title={mapping.memoire.LIEUCTI.label} content={notice.LIEUCTI} separator="#" isPdf={true} />
              <Field title={mapping.memoire.COTECTI.label} content={notice.COTECTI} separator="#" isPdf={true} />
              <Field title={mapping.memoire.PRECOR.label} content={notice.PRECOR} separator="#" isPdf={true} />
              <Field title={mapping.memoire.ACQU.label} content={notice.ACQU} separator="#" isPdf={true} />
              <Field title={mapping.memoire.DIFF.label} content={notice.DIFF} separator="#" isPdf={true} />
              <Field title={mapping.memoire.ECH.label} content={notice.ECH} separator="#" isPdf={true} />
            </View>
            : null}

            {(notice.TECH || notice.FORMAT || notice.TECHTI || notice.FORMATTI || notice.TECHOR ||
              notice.FORMATOR || notice.MENTIONS || notice.MENTTI || notice.SENS) ? 
            <View>
              <Text style={styles.subtitle} >Description technique du phototype</Text>
              <Field title={mapping.memoire.TECH.label} content={notice.TECH} separator="#" isPdf={true} />
              <Field title={mapping.memoire.FORMAT.label} content={notice.FORMAT} separator="#" isPdf={true} />
              <Field title={mapping.memoire.TECHTI.label} content={notice.TECHTI} separator="#" isPdf={true} />
              <Field title={mapping.memoire.FORMATTI.label} content={notice.FORMATTI} separator="#" isPdf={true} />
              <Field title={mapping.memoire.TECHOR.label} content={notice.TECHOR} separator="#" isPdf={true} />
              <Field title={mapping.memoire.FORMATOR.label} content={notice.FORMATOR} separator="#" isPdf={true} />
              <Field title={mapping.memoire.MENTIONS.label} content={notice.MENTIONS} separator="#" isPdf={true} />
              <Field title={mapping.memoire.MENTTI.label} content={notice.MENTTI} separator="#" isPdf={true} />
              <Field title={mapping.memoire.SENS.label} content={notice.SENS} separator="#" isPdf={true} />
            </View>
            : null}

            {(notice.DATPV || notice.JDATPV || notice.DATOR || notice.EXPO ||
              notice.PUBLI || notice.OBS || notice.OBSTI || notice.OBSOR) ? 
            <View>
              <Text style={styles.subtitle} >Datation et événements liés à l’image</Text>
              <Field title={mapping.memoire.DATPV.label} content={notice.DATPV} separator="#" isPdf={true} />
              <Field title={mapping.memoire.JDATPV.label} content={notice.JDATPV} separator="#" isPdf={true} />
              <Field title={mapping.memoire.DATOR.label} content={notice.DATOR} separator="#" isPdf={true} />
              <Field title={mapping.memoire.EXPO.label} content={pdfLinks(notice.EXPO, "expo")} separator="#" isPdf={true} link={true} />
              <Field title={mapping.memoire.PUBLI.label} content={notice.PUBLI} separator="#" isPdf={true} />
              <Field title={mapping.memoire.OBS.label} content={notice.OBS} separator="#" isPdf={true} />
              <Field title={mapping.memoire.OBSTI.label} content={notice.OBSTI} separator="#" isPdf={true} />
              <Field title={mapping.memoire.OBSOR.label} content={notice.OBSOR} separator="#" isPdf={true} />
            </View>
            : null}
          </View>

          
          <View style={styles.seeMore}>
            { notice.IMG ?
            <View>
              <Image style={styles.image}
                src={bucket_url + notice.IMG + "?" + (new Date()).getTime()}
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
              <Field title={mapping.memoire.REF.label} content={notice.REF} separator="#" isPdf={true} />
              <Field title={mapping.memoire.BASE.label} content={notice.BASE} separator="#" isPdf={true} />
              <Field title={mapping.memoire.DMIS.label} content={notice.DMIS} separator="#" isPdf={true} />
              <Field title={mapping.memoire.DMAJ.label} content={notice.DMAJ} separator="#" isPdf={true} />
              <Field title={mapping.memoire.AUTP.label} content={pdfLinks(notice.AUTP, "auteur")} separator="#" isPdf={true} link={true} />
              <Field title={mapping.memoire.AUTOR.label} content={notice.AUTOR} separator="#" isPdf={true} />
              <Field title={mapping.memoire.COPY.label} content={notice.COPY} separator="#" isPdf={true} />
              <Field title={"Contactez-nous"} content={notice.CONTACT} separator="#" isPdf={true} />
            </View>
            <View style={styles.voirAussi}>
                  {
                  (notice.LAUTP) ?
                  <Text  style={styles.subtitle} >Voir aussi</Text>
                  : <></>
                  }
                  {
                  (notice.LAUTP) ? 
                  <Text style={styles.fieldTitle}>{mapping.memoire.LAUTP.label}</Text>
                  : <></>
                  }
                  {
                  (notice.LAUTP) ? 
                  <Link
                  style={styles.listLinked}
                  title={mapping.memoire.LAUTP.label}
                  src={`http://www2.culture.gouv.fr/public/mistral/autor_fr?ACTION=CHERCHER&FIELD_98=REF&VALUE_98=${notice.LAUTP}`}
                  target="_blank"
                  key="notice.LAUTP">{notice.LAUTP}</Link>
                  : <></>
                  }
            </View>
          </View>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
)}
