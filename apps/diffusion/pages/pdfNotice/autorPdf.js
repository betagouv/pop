import Field from "../../src/notices/Field";
import mapping from "../../src/services/mapping";
import queryString from "query-string";
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { styles } from "../pdfNotice/styles";

export function AutorPdf(notice, title, datesLieus, datesActivites, referenceArk){
  return(
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.content}>
          <View style={styles.body}>
            {(notice.NOM || notice.PREN || notice.PNOM || notice.TYPID || notice.ALIAS ||
              notice.INI || notice.REJET || notice.NATIO || datesLieus) ?
            <View>
                <Text style={styles.subtitle} >Identification</Text>
                <Field title={mapping.autor.NOM} content={notice.NOM} separator="#" isPdf={true} />
                <Field title={mapping.autor.PREN} content={notice.PREN} separator="#" isPdf={true} />
                <Field title={mapping.autor.PNOM} content={notice.PNOM} separator="#" isPdf={true} />
                <Field title={mapping.autor.TYPID} content={notice.TYPID} separator="#" isPdf={true} />
                <Field title={mapping.autor.ALIAS} content={notice.ALIAS} separator="#" isPdf={true} />
                <Field title={mapping.autor.INI} content={notice.INI} separator="#" isPdf={true} />
                <Field title={mapping.autor.REJET} content={notice.REJET} separator="#" isPdf={true} />
                <Field title={mapping.autor.NATIO} content={notice.NATIO} separator="#" isPdf={true} />
                <Field title="Dates (lieus) d’existence" content={datesLieus} separator="#" isPdf={true} />
            </View> : null}
            
            {(notice.FONC || datesActivites || notice.LRELA || notice.FORM || notice.OEUVR || notice.SYMB ||
              notice.INS || notice.GAR || notice.PREF || notice.BIF) ? 
            <View>
              <Text style={styles.subtitle} >Fonctions et activités</Text>
              <Field title={mapping.autor.FONC.label} content={notice.FONC} separator="#" isPdf={true} />
              <Field title="Dates – lieu d’activités" content={datesActivites} separator="#" isPdf={true} />
              <Field title={mapping.autor.LRELA.label} content={notice.LRELA} separator="#" isPdf={true} />
              <Field title={mapping.autor.FORM.label} content={notice.FORM} separator="#" isPdf={true} />
              <Field title={mapping.autor.OEUVR.label} content={notice.OEUVR} separator="#" isPdf={true} />
              <Field title={mapping.autor.SYMB.label} content={notice.SYMB} separator="#" isPdf={true} />
              <Field title={mapping.autor.INS.label} content={notice.INS} separator="#" isPdf={true} />
              <Field title={mapping.autor.GAR.label} content={notice.GAR} separator="#" isPdf={true} />
              <Field title={mapping.autor.PREF.label} content={notice.PREF} separator="#" isPdf={true} />
              <Field title={mapping.autor.BIF.label} content={notice.BIF} separator="#" isPdf={true} />
            </View>
            : null}

            {(notice.BIO || notice.OBS) ? 
            <View>
              <Text style={styles.subtitle} >Commentaire Biographique</Text>
              <Field title={mapping.autor.BIO.label} content={notice.BIO} separator="#" isPdf={true} />
              <Field title={mapping.autor.OBS.label} content={notice.OBS} separator="#" isPdf={true} />
            </View>
            : null}

            {(notice.SOURCES || notice.BIBLIO || notice.PUBLI || notice.EXPO || notice.ISNI_VERIFIEE) ? 
            <View>
              <Text style={styles.subtitle} >Ressources documentaires</Text>
              <Field title={mapping.autor.SOURCES.label} content={notice.SOURCES} separator="#" isPdf={true} />
              <Field title={mapping.autor.BIBLIO.label} content={notice.BIBLIO} separator="#" isPdf={true} />
              <Field title={mapping.autor.PUBLI.label} content={notice.PUBLI} separator="#" isPdf={true} />
              <Field title={mapping.autor.EXPO.label} content={notice.EXPO} separator="#" isPdf={true} />
              <Field title={mapping.autor.ISNI_VERIFIEE.label} content={referenceArk} separator="#" isPdf={true} />
            </View>
            : null}
          </View>
          <View style={styles.seeMore}>
            { notice.MEMOIRE.length > 0 ?
            <View>
              <Image style={styles.image}
                src={"https://s3.eu-west-3.amazonaws.com/pop-phototeque-staging/" + notice.MEMOIRE[0]}
              />
            </View> : null}

            <View style={styles.aPropos}>
              <Text  style={styles.subtitle} >À propos de la notice</Text>
              <Field title={mapping.autor.REF.label} content={notice.REF} separator="#" isPdf={true} />
              <Field title={mapping.autor.BASE.label} content={notice.BASE} separator="#" isPdf={true} />
              <Field title={"Contactez-nous"} content={notice.CONTACT} separator="#" isPdf={true} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
)}

function pdfLinks(value, name){
    if(value && value!==""){
      if(Array.isArray(value)){
        let links = value.map( val => {
          return {url:`https://www.pop.culture.gouv.fr/search/list?${queryString.stringify({ [name]: JSON.stringify([val]) })}`, val: val};
        });
        return links;
      }
      else{
        return {url: `https://www.pop.culture.gouv.fr/search/list?${queryString.stringify({ [name]: JSON.stringify([value]) })}`, val: value};
      }
    }
    return null;
};