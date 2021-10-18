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
import Title from "../../src/notices/Title";
import Link from "next/link";
import ContactUs from "../../src/notices/ContactUs";
import FieldImages from "../../src/notices/FieldImages";
import { schema, getParamsFromUrl, findCollection, highlighting, lastSearch } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";
import BucketButton from "../../src/components/BucketButton";
import Cookies from 'universal-cookie';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MuseoPdf } from "../pdfNotice/museoPdf";
import LinkedNotices from "../../src/notices/LinkedNotices";
import { pop_url } from "../../src/config";
import Map from "../../src/notices/Map";

const pushLinkedNotices = (a, d, base) => {
  for (let i = 0; Array.isArray(d) && i < d.length; i++) {
    a.push(API.getNotice(base, d[i]));
    if (a.length > 50) break;
  }
};  
export default class extends React.Component {

  state = {display: false, prevLink: undefined, nextLink: undefined}
 
  static async getInitialProps({ query: { id }, asPath }) {
    const notice = await API.getNotice("museo", id);
    const searchParamsUrl = asPath.substring(asPath.indexOf("?") + 1);
    const searchParams = Object.fromEntries(getParamsFromUrl(asPath));
    const arr = [];

    let hideButton = false;
    const noticesLiees = await API.getMuseoCollection(notice.REF);

    if(noticesLiees == 0){
      hideButton = true;
    }
    
    if (notice) {
      const { REFMEM, REFMER, REFPAL } = notice;
      pushLinkedNotices(arr, REFMEM, "memoire");
      pushLinkedNotices(arr, REFMER, "merimee");
      pushLinkedNotices(arr, REFPAL, "palissy");
    }

    const links = (await Promise.all(arr)).filter(l => l);

    return { notice, links, searchParamsUrl, searchParams, hideButton };
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
    const { notice } = this.props;
    if (!notice) {
      return throw404();
    }

    const { title, images, image_preview, metaDescription } = getNoticeInfo(notice);

    const obj = {
      name: title,
      image: image_preview,
      description: metaDescription
    };

    const pdf = MuseoPdf(notice, title, this.props.links);
    const App = () => (
      <div>
        <PDFDownloadLink 
          document={pdf} 
          fileName={"museo_" + notice.REF + ".pdf"}
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
              {images.length ? <meta property="og:image" content={images[0].src} /> : <meta />}
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
                    <BucketButton base="museo" reference={notice.REF} />}
                  </div>
                {this.state.display && App()}
              </div>
            </div>

            <Row>
              <Col className="image" md="8">
                <div className="notice-details">
                  <Title
                    content="Nom du musée"
                    notice={notice}
                    fields={["NOMOFF", "NOMUSAGE", "AUTNOM"]}
                  />
                  <Field title={mapping.museo.NOMOFF.label} content={notice.NOMOFF} upper={false}/>
                  <Field title={mapping.museo.NOMUSAGE.label} content={notice.NOMUSAGE} />
                  <Field title={mapping.museo.AUTNOM.label} content={notice.AUTNOM} />
                  <Title
                    content="Adresse"
                    notice={notice}
                    fields={["ADRL1_M", "LIEU_M", "CP_M", "VILLE_M", "VILLE_M", "DPT", "REGION"]}
                  />
                  <Field title={mapping.museo.ADRL1_M.label} content={notice.ADRL1_M} />
                  <Field title={mapping.museo.LIEU_M.label} content={notice.LIEU_M} />
                  <Field title={mapping.museo.CP_M.label} content={notice.CP_M} />
                  <Field title={mapping.museo.VILLE_M.label} content={notice.VILLE_M} />
                  <Field title={mapping.museo.DPT.label} content={notice.DPT} />
                  <Field title={mapping.museo.REGION.label} content={notice.REGION} />
                  
                  <Title
                    content="Contact"
                    notice={notice}
                    fields={["TEL_M", "CONTACT_GENERIQUE", "URL_M", "ACCES"]}
                  />
                  <Field title={mapping.museo.TEL_M.label} content={notice.TEL_M} />
                  <Field title={mapping.museo.CONTACT_GENERIQUE.label} content={notice.CONTACT_GENERIQUE} upper={false}/>
                  <Field
                    title={mapping.museo.URL_M.label}
                    content={<a href={"https://" + notice.URL_M} target="_blank">{notice.URL_M}</a>}
                    key="notice.URL_M"
                  />
                  <Field title={mapping.museo.ACCES.label} content={notice.ACCES} />
				  <Title
                    content="Appellation/Protection"
                    notice={notice}
                    fields={["LABEL"]}
                  />
                  <Field title={mapping.museo.LABEL.label} content={notice.LABEL} />

                  <Title
                    content="Collection"
                    notice={notice}
                    fields={[
                      "CATEG",
                      "DOMPAL",
                      "HIST",
                      "ATOUT",
                      "THEMES",
                      "ARTISTE",
                      "PHARE",
                      "AN_CREAT",
                      "INTERET"
                    ]}
                  />
                  <Field title={mapping.museo.CATEG.label} content={notice.CATEG} />
                  <Field title={mapping.museo.DOMPAL.label} content={notice.DOMPAL} />
                  <Field title={mapping.museo.HIST.label} content={notice.HIST} />
                  <Field title={mapping.museo.ATOUT.label} content={notice.ATOUT} />
                  <Field title={mapping.museo.THEMES.label} content={notice.THEMES} />
                  <Field title={mapping.museo.ARTISTE.label} content={notice.ARTISTE} />
                  <Field title={mapping.museo.PHARE.label} content={notice.PHARE} />
                  <Field title={mapping.museo.AN_CREAT.label} content={notice.AN_CREAT} />
                  <Field title={mapping.museo.INTERET.label} content={notice.INTERET} />
                  <Field title={mapping.museo["PROT-BAT"].label} content={notice["PROT-BAT"]} />
                  <Field title={mapping.museo["PROT-ESP"].label} content={notice["PROT-ESP"]} />
                </div>
              </Col>
              <Col md="4">
                <FieldImages images={images} />
                <LinkedNotices links={this.props.links} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.museo.REF.label} content={notice.REF} />
                    <Field title={mapping.museo.BASE.label} content={notice.BASE} />
                    <Field title={mapping.museo.COPY.label} content={notice.COPY} />
					<Field title={mapping.museo.DT_SAISI.label} content={notice.DT_SAISI} />
                  </div>
                  <ContactUs contact={notice.CONTACT_GENERIQUE} REF={notice.REF} base="museo" />
                </div>
                <div className="onPrintHide" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Link
                    href={`/search/list?${queryString.stringify({
                      museo: JSON.stringify([notice.REF])
                    })}`}
                  >
                    <a className="btn btn-secondary" style={{ backgroundColor: "#C43A2F" }} hidden={ this.props.hideButton }>
                      Voir les collections du musée
                    </a>
                  </Link>
                </div>
                <Map notice={notice} />
              </Col>
            </Row>
          </Container>
        </div>
        <style jsx>{noticeStyle}</style>
      </Layout>
    );
  }
}
