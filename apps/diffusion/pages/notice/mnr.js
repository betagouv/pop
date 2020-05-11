import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import queryString from "query-string";
import { getNoticeInfo } from "../../src/utils";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import mapping from "../../src/services/mapping";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import ContactUs from "../../src/notices/ContactUs";
import FieldImages from "../../src/notices/FieldImages";
import { schema, getParamsFromUrl, findCollection } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";
import { bucket_url } from "../../src/config";
import BucketButton from "../../src/components/BucketButton";
import Cookies from 'universal-cookie';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MnrPdf } from "../pdfNotice/mnrPdf";
import { pop_url } from "../../src/config";

export default class extends React.Component {

  state = {display: false, prevLink: undefined, nextLink: undefined}


  static async getInitialProps({ query: { id }, asPath }) {
    const notice = await API.getNotice("mnr", id);
    const searchParamsUrl = asPath.substring(asPath.indexOf("?") + 1);
    const searchParams = Object.fromEntries(getParamsFromUrl(asPath));

    return { notice, searchParamsUrl, searchParams };
  }

  fieldImage(notice) {
    const { title } = getNoticeInfo(notice);

    const images = notice.VIDEO.map((e, i) => ({
      src: `${bucket_url}${e}`,
      alt: `${title}_${i}`
    }));

    if (images && images.length) {
      return;
    }
  }

  async componentDidMount(){
    this.setState({display : true});

    //highlighting
    if(this.props.searchParams.mainSearch){
      this.props.searchParams.mainSearch.split(" ").forEach(word => $("p").highlight(word));
    }

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

  domain() {
    const domain = this.props.notice.DOMN;
    if (!domain || !Array.isArray(domain)) {
      return null;
    }

    const links = domain
      .map(d => {
        const url = `/search/list?${queryString.stringify({ domn: JSON.stringify([d]) })}`;
        return (
          <a href={url} key={d}>
            {d}
          </a>
        );
      })
      .reduce((p, c) => {
        if (!p) {
          return [c];
        }
        return [p, ", ", c];
      }, "");

    return <React.Fragment>{links}</React.Fragment>;
  }

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    const notice = this.props.notice;

    const { title, images, metaDescription, image_preview } = getNoticeInfo(notice);

    const obj = {
      name: notice.TITR,
      created_at: notice.SCLE.length ? notice.SCLE[0] : "",
      artform: notice.DOM,
      image: image_preview,
      description: metaDescription,
      artMedium: notice.TECH.join(", "),
      creator: notice.AUTR,
      comment: notice.HIST,
      contentLocation: notice.LOCA
    };

    const pdf = MnrPdf(notice, title);
    const App = () => (
      <div>
        <PDFDownloadLink 
          document={pdf} 
          fileName={"mnr_" + notice.REF + ".pdf"}
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
                <h1 className="heading-title">{notice.TICO || notice.TITR}</h1>
                {this.renderNextButton()}
              </div>
            </div>

            <div className="top-container">
              <div className="addBucket onPrintHide">
                {this.state.display &&
                  <BucketButton base="mnr" reference={notice.REF} />}
              </div>
              {this.state.display && App()}
            </div>

            <Row>
              <Col className="image" md="8">
                <div className="notice-details">
                  <Field title={mapping.mnr.INV.label} content={notice.INV} join=" ; " />
                  <Field
                    title={mapping.mnr.DOMN.label}
                    separator="#"
                    content={this.domain()}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.AUTR.label}
                    content={notice.AUTR}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.PAUT.label}
                    content={notice.PAUT}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.ATTR.label}
                    content={notice.ATTR}
                    join=" ; "
                    separator="#"
                  />
                  <Field
                    title={mapping.mnr.AATT.label}
                    separator="#"
                    content={notice.AATT}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.ECOL.label}
                    content={notice.ECOL}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.TITR.label}
                    separator="#"
                    content={notice.TITR}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.ATIT.label}
                    separator="#"
                    content={notice.ATIT}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.PTIT.label}
                    separator="#"
                    content={notice.PTIT}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.AUTI.label}
                    separator="#"
                    content={notice.AUTI}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.DENO.label}
                    separator="#"
                    content={notice.DENO}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.MILL.label}
                    separator="#"
                    content={notice.MILL}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.SCLE.label}
                    separator="#"
                    content={notice.SCLE}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.STYL.label}
                    separator="#"
                    content={notice.STYL}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.TECH.label}
                    separator="#"
                    content={notice.TECH}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.DIMS.label}
                    separator="#"
                    content={notice.DIMS}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.DESC.label}
                    content={notice.DESC}
                    join=" ; "
                    separator="#"
                  />
                  <Field
                    title={mapping.mnr.INSC.label}
                    content={notice.INSC}
                    join=" ; "
                    separator="#"
                  />
                  <Field
                    title={mapping.mnr.GENE.label}
                    content={notice.GENE}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.HIST.label}
                    content={notice.HIST}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.PROV.label}
                    separator="#"
                    content={notice.PROV}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.COMM.label}
                    content={notice.COMM}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.CATE.label}
                    separator="#"
                    content={notice.CATE}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.OBSE.label}
                    content={notice.OBSE}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.NUMS.label}
                    content={notice.NUMS}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.MARQ.label}
                    content={notice.MARQ}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.LOCA.label}
                    separator="#"
                    content={notice.LOCA}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.AFFE.label}
                    content={notice.AFFE}
                    separator="#"
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.EXPO.label}
                    separator="#"
                    content={notice.EXPO}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.BIBL.label}
                    separator="#"
                    content={notice.BIBL}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.NOTE.label}
                    separator="#"
                    content={notice.NOTE}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.RESUME.label}
                    separator="#"
                    content={notice.RESUME}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.ETAT.label}
                    separator="#"
                    content={notice.ETAT}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.SUITE.label}
                    separator="#"
                    content={notice.SUITE}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.REPR.label}
                    separator="#"
                    content={notice.REPR}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.SREP.label}
                    content={notice.SREP}
                    join=" ; "
                    separator="#"
                  />
                  <Field
                    title={mapping.mnr.PREP.label}
                    separator="#"
                    content={notice.PREP}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.DREP.label}
                    separator="#"
                    content={notice.DREP}
                    join=" ; "
                  />
                  <Field
                    title={mapping.mnr.DMAJ.label}
                    separator="#"
                    content={notice.DMAJ}
                    join=" ; "
                  />

                  <Field
                    title={mapping.mnr.PHOT.label}
                    content={notice.PHOT}
                    separator="#"
                    join=" ; "
                  />
                </div>
              </Col>
              <Col md="4">
                <FieldImages images={images} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.mnr.REF.label} content={notice.REF} />
                    <Field title={mapping.mnr.BASE.label} content={notice.BASE} />
                    <Field title={mapping.mnr.DMAJ.label} content={notice.DMAJ} />
                  </div>
                  <ContactUs
                    contact={notice.CONTACT || "francoise.gaborit@culture.gouv.fr"}
                    REF={notice.REF}
                    base="mnr"
                  />
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
