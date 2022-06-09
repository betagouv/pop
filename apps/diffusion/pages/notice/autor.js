import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import mapping from "../../src/services/mapping";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import Title from "../../src/notices/Title";
import FieldImages from "../../src/notices/FieldImages";
import ContactUs from "../../src/notices/ContactUs";
import { schema, getParamsFromUrl, findCollection, highlighting, lastSearch } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";
import { getNoticeInfo } from "../../src/utils";
import BucketButton from "../../src/components/BucketButton";
import Cookies from 'universal-cookie';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AutorPdf } from "../../src/pdf/pdfNotice/autorPdf";
import { pop_url } from "../../src/config";

export default class extends React.Component {

  state = { display: false, prevLink: undefined, nextLink: undefined }

  static async getInitialProps({ query: { id }, asPath }) {
    const notice = await API.getNotice("autor", id);
    const searchParamsUrl = asPath.substring(asPath.indexOf("?") + 1);
    const searchParams = Object.fromEntries(getParamsFromUrl(asPath));

    return { notice, searchParamsUrl, searchParams };
  }

  async componentDidMount() {
    //this.setState({display : true});

    //highlighting
    highlighting(this.props.searchParams.mainSearch);

    //Construction des liens précédents/suivants
    const cookies = new Cookies();
    const listRefs = cookies.get("listRefs-" + this.props.searchParams.idQuery);
    if (listRefs) {
      const indexOfCurrentNotice = listRefs.indexOf(this.props.notice.REF);
      let prevLink = undefined;
      let nextLink = undefined;
      if (indexOfCurrentNotice > 0) {
        const previousCollection = await findCollection(listRefs[indexOfCurrentNotice - 1]);
        if (previousCollection !== "") {
          prevLink = "notice/" + previousCollection + "/" + listRefs[indexOfCurrentNotice - 1] + "?" + this.props.searchParamsUrl;
        }
      }
      if (indexOfCurrentNotice < listRefs.length - 1) {
        const nextCollection = await findCollection(listRefs[indexOfCurrentNotice + 1]);
        if (nextCollection !== "") {
          nextLink = "notice/" + nextCollection + "/" + listRefs[indexOfCurrentNotice + 1] + "?" + this.props.searchParamsUrl;
        }
      }
      this.setState({ prevLink, nextLink });
    }
    else {
      this.state.display == false && this.setState({ display: true });
    }
  }

  componentDidUpdate() {
    this.state.display == false && this.setState({ display: true });
  }

  renderPrevButton() {
    if (this.state.prevLink != undefined) {
      return (
        <a title="Notice précédente" href={pop_url + this.state.prevLink} className="navButton onPrintHide">
          &lsaquo;
        </a>
      )
    }
    else {
      return null;
    }
  }

  renderNextButton() {
    if (this.state.nextLink != undefined) {
      return (
        <a title="Notice suivante" href={pop_url + this.state.nextLink} className="navButton onPrintHide">
          &rsaquo;
        </a>
      )
    }
    else {
      return null;
    }
  }

  fieldImage(notice) {
    const { images } = getNoticeInfo(notice);
    const imageComponents = images.map(e => ({
      src: e.src,
      alt: e.name,
      footer: (
        <div style={{ marginTop: "5px" }}>
          <div style={{ textAlign: "center", fontWeight: "bold" }}>{e.name}</div>
          <div style={{ fontSize: "13px" }}>{e.copy}</div>
          <a
            style={{ fontSize: "13px" }}
            target="_blank"
            rel="noopener"
            href={`/notice/memoire/${e.ref}`}
          >
            Voir la notice image
          </a>
        </div>
      )
    }));

    if (imageComponents.length) {
      return <FieldImages images={imageComponents} />;
    }
  }

  render() {
    const notice = this.props.notice;

    if (!notice) {
      return throw404();
    }

    const { title, images, datesLieus, referenceArk } = getNoticeInfo(notice);

    //construction du pdf au format joconde
    //Affichage du bouton de téléchargement du fichier pdf une fois que la page a chargé et que le pdf est construit
    const pdf = AutorPdf(notice, title, datesLieus, referenceArk);
    const App = () => (
      <div>
        <PDFDownloadLink
          document={pdf}
          fileName={"autor_" + notice.REF + ".pdf"}
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
            borderRadius: "5px"
          }}>
          {({ blob, url, loading, error }) => (loading ? 'Construction du pdf...' : 'Téléchargement pdf')}
        </PDFDownloadLink>
      </div>
    )

    const lastRecherche = lastSearch(this.props.searchParams, this.props.searchParamsUrl, pop_url);

    return (
      <Layout>
        <div className="notice">
          <Container>
            <Head>
              <title>{title}</title>
            </Head>

            <div>
              <div className="heading heading-center">
                {this.renderPrevButton()}
                <h1 className="heading-title">{title}</h1>
                {this.renderNextButton()}
              </div>
            </div>

            <div className="top-container">
              <div className="leftContainer-buttons">
                {lastRecherche !== null &&
                  <div className="btn btn-last-search">
                    <Link href={lastRecherche}>
                      <div className="text-last-search">
                        Retour à la recherche
                      </div>
                    </Link>
                  </div>}
              </div>
              <div className="rightContainer-buttons">
                <div className="addBucket onPrintHide">
                  {this.state.display &&
                    <BucketButton base="autor" reference={notice.REF} />}
                </div>
                {this.state.display && App()}
              </div>
            </div>

            <Row>
              <Col md="8">
                <div className="notice-details">
                  <Title
                    content="Identification"
                    notice={notice}
                    fields={[
                      "NOM", "PREN", "PNOM", "TYPID", "ALIAS", "INI", "REJET", "NAT", "DNAISS", "DMORT"
                    ]}
                  />
                  <Field title={mapping.autor.NOM.label} content={notice.NOM} separator="#" />
                  <Field title={mapping.autor.PREN.label} content={notice.PREN} separator="#" />
                  <Field title={mapping.autor.PNOM.label} content={notice.PNOM} separator="#" />
                  <Field title={mapping.autor.TYPID.label} content={notice.TYPID} separator="#" />
                  <Field title={mapping.autor.ALIAS.label} content={notice.ALIAS} separator="#" />
                  <Field title={mapping.autor.INI.label} content={notice.INI} separator="#" />
                  <Field title={mapping.autor.REJET.label} content={notice.REJET} separator="#" />
                  <Field title={mapping.autor.NATIO.label} content={notice.NATIO} separator="#" />
                  <Field title="Dates (lieus) d’existence" content={datesLieus} separator="#" />

                  <Title
                    content="Fonctions et activités"
                    notice={notice}
                    fields={[
                      "FONC", "SCLE", "DATES", "AUTORLOCA", "LOCACT", "ADRS", "LRELA", "FORM", "OEUVR", "SYMB", "INS", "GAR", "PREF", "BIF"
                    ]}
                  />
                  <Field title={mapping.autor.FONC.label} content={notice.FONC} separator="#" />
                  <Field title={mapping.autor.LOCACT.label} content={notice.LOCACT} separator="#" />
                  <Field title={mapping.autor.DATES.label} content={notice.DATES} separator="#" />
                  <Field title={mapping.autor.LRELA.label} content={notice.LRELA} separator="#" />
                  <Field title={mapping.autor.FORM.label} content={notice.FORM} separator="#" />
                  <Field title={mapping.autor.OEUVR.label} content={notice.OEUVR} separator="#" addLink={true}/>
                  <Field title={mapping.autor.SYMB.label} content={notice.SYMB} separator="#" />
                  <Field title={mapping.autor.INS.label} content={notice.INS} separator="#" />
                  <Field title={mapping.autor.GAR.label} content={notice.GAR} separator="#" />
                  <Field title={mapping.autor.PREF.label} content={notice.PREF} separator="#" />
                  <Field title={mapping.autor.BIF.label} content={notice.BIF} separator="#" />

                  <Title
                    content="Commentaire Biographique"
                    notice={notice}
                    fields={[
                      "BIO", "OBS"
                    ]}
                  />
                  <Field title={mapping.autor.BIO.label} content={notice.BIO} separator="#" />
                  <Field title={mapping.autor.OBS.label} content={notice.OBS} separator="#" />

                  <Title
                    content="Ressources documentaires"
                    notice={notice}
                    fields={[
                      "SOURCES", "BIBLIO", "PUBLI", "EXPO", "ISNI_VERIFIEE", "ARK"
                    ]}
                  />
                  <Field title={mapping.autor.SOURCES.label} content={notice.SOURCES} separator="#" addLink={true}/>
                  <Field title={mapping.autor.BIBLIO.label} content={notice.BIBLIO} separator="#" addLink={true} />
                  <Field title={mapping.autor.PUBLI.label} content={notice.PUBLI} separator="#" addLink={true}/>
                  <Field title={mapping.autor.EXPO.label} content={notice.EXPO} separator="#" addLink={true}/>
                  <Field title={mapping.autor.ISNI_VERIFIEE.label} content={referenceArk} separator="#" />

                </div>
              </Col>
              <Col md="4">
                {this.fieldImage(notice)}
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.autor.REF.label} content={notice.REF} />
                    <Field title={mapping.autor.BASE.label} content={notice.BASE} />
                  </div>
                  <ContactUs contact={notice.CONTACT} REF={notice.REF} base="autor" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <style jsx>{noticeStyle}</style>
      </Layout>
    );
  }
}
