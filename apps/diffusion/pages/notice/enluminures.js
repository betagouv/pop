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
import { EnluminuresPdf } from "../pdfNotice/enluminuresPdf";
import { pop_url } from "../../src/config";


export default class extends React.Component {

  state = {display: false, prevLink: undefined, nextLink: undefined}

  static async getInitialProps({ query: { id }, asPath }) {
    const notice = await API.getNotice("enluminures", id);
    const searchParamsUrl = asPath.substring(asPath.indexOf("?") + 1);
    const searchParams = Object.fromEntries(getParamsFromUrl(asPath));

    return { notice, searchParamsUrl, searchParams };
  }

  async componentDidMount(){
    //this.setState({display : true});

    //highlighting
    highlighting(this.props.searchParams.mainSearch);

    //Construction des liens précédents/suivants
    const cookies = new Cookies();
    const listRefs = cookies.get("listRefs-"+this.props.searchParams.idQuery);
    if(listRefs){
      const indexOfCurrentNotice = listRefs.indexOf(this.props.notice.REF);
      let prevLink = undefined;
      let nextLink = undefined;
      if(indexOfCurrentNotice > 0){
        const previousCollection = await findCollection(listRefs[indexOfCurrentNotice - 1]);
        if(previousCollection !== ""){
          prevLink = "notice/" + previousCollection + "/" + listRefs[indexOfCurrentNotice - 1]+"?"+this.props.searchParamsUrl;
        }
      }
      if(indexOfCurrentNotice < listRefs.length - 1){
        const nextCollection = await findCollection(listRefs[indexOfCurrentNotice + 1]);
        if(nextCollection !== ""){
          nextLink = "notice/" + nextCollection + "/" + listRefs[indexOfCurrentNotice + 1]+"?"+this.props.searchParamsUrl;
        }
      }
      this.setState({prevLink, nextLink});
    }
    else{
      this.state.display == false && this.setState({display : true});
    }
  }

  componentDidUpdate(){
    this.state.display == false && this.setState({display : true});
  }

  renderPrevButton(){
    if(this.state.prevLink != undefined){
      return(
          <a title="Notice précédente" href={pop_url + this.state.prevLink} className="navButton onPrintHide">
            &lsaquo;
          </a>
      )
    }
    else {
      return null;
    }
  }

  renderNextButton(){
    if(this.state.nextLink != undefined){
      return(
          <a title="Notice suivante" href={pop_url + this.state.nextLink} className="navButton onPrintHide">
           &rsaquo;
          </a>
      )
    }
    else {
      return null;
    }
  }

  render() {
    const notice = this.props.notice;

    if (!notice) {
      return throw404();
    }

    const { title, images, image_preview, metaDescription } = getNoticeInfo(notice);

    const obj = {
      name: title,
      created_at: notice.DATEDEB,
      artform: Array.isArray(notice.NOMENC) && notice.NOMENC[0] ? notice.NOMENC[0] : "",
      image: image_preview,
      description: notice.NOTES,
      artMedium: Array.isArray(notice.TYPE) ? notice.TYPE.join(", ") : notice.TYPE || "",
      creator: String(notice.ATTRIB).split(";"),
      comment: notice.NOTEDEC,
      contentLocation: notice.ORIGG
    };

    const pdf = EnluminuresPdf(notice, title);
    const App = () => (
      <div>
        <PDFDownloadLink 
          document={pdf} 
          fileName={"enluminures_" + notice.REF + ".pdf"}
          style={{backgroundColor: "#377d87",
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
              <meta content={metaDescription} name="description" />
              <script type="application/ld+json">{schema(obj)}</script>
              {images.length ? <meta property="og:image" content={image_preview} /> : <meta />}
            </Head>

            <div>
              <div className="heading heading-center">
                {this.renderPrevButton()}
                <h1 className="heading-title">{notice.TITR} - {notice.SUJET}</h1>
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
                    <BucketButton base="enluminures" reference={notice.REF} />}
                  </div>
                {this.state.display && App()}
              </div>
            </div>

            <Row>
              <Col md="8">
                <div className="notice-details">
                  <Title
                    content="Identification du bien culturel"
                    notice={notice}
                    fields={[
                      "ATTRIB",
                      "CONTXT",
                      "DATE",
                      "NOMENC",
                      "NOTES",
                      "NOTDEC",
                      "ORIGG",
                      "ORIGH",
                      "POSS",
                      "REFD",
                      "SUJET",
                      "TITR",
                      "TYPDEC"
                    ]}
                  />
                  <Field title={mapping.enluminures.ATTRIB.label} content={notice.ATTRIB} />
                  <Field title={mapping.enluminures.CONTXT.label} content={notice.CONTXT} />
                  <Field title={mapping.enluminures.DATE.label} content={notice.DATE} />
                  <Field title={mapping.enluminures.NOMENC.label} content={notice.NOMENC} />
                  <Field title={mapping.enluminures.NOTES.label} content={notice.NOTES} />
                  <Field title={mapping.enluminures.NOTDEC.label} content={notice.NOTDEC} />
                  <Field title={mapping.enluminures.ORIGG.label} content={notice.ORIGG} />
                  <Field title={mapping.enluminures.ORIGH.label} content={notice.ORIGH} />
                  <Field title={mapping.enluminures.POSS.label} content={notice.POSS} />
                  <Field title={mapping.enluminures.REFD.label} content={notice.REFD} />
                  <Field title={mapping.enluminures.SUJET.label} content={notice.SUJET} />
                  <Field title={mapping.enluminures.TITR.label} content={notice.TITR} />
                  <Field
                    title={mapping.enluminures.TYPDEC.label}
                    content={notice.TYPDEC}
                    separator="/"
                  />
                </div>
              </Col>
              <Col md="4">
                <FieldImages images={images} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.enluminures.REF.label} content={notice.REF} />
                    <Field title={mapping.enluminures.BASE.label} content={notice.BASE} />
                    <Field title={mapping.enluminures.DROIT.label} content={notice.DROIT} />
                    <Field title={mapping.enluminures.ATTRIB.label} content={notice.ATTRIB} />
                    <Field
                      title={mapping.enluminures.COPY.label}
                      content={notice.COPY}
                      separator=";"
                    />
                  </div>
                  <ContactUs contact={notice.CONTACT} REF={notice.REF} base="enluminures" />
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
