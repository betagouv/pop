import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import queryString from "query-string";
import { getNoticeInfo } from "../../src/utils";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import mapping from "../../src/services/mapping";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import LinkedNotices from "../../src/notices/LinkedNotices";
import Title from "../../src/notices/Title";
import FieldImages from "../../src/notices/FieldImages";
import ContactUs from "../../src/notices/ContactUs";
import { schema, getParamsFromUrl, findCollection, highlighting, lastSearch } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";
import BucketButton from "../../src/components/BucketButton";
import Cookies from 'universal-cookie';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MemoirePdf } from "../../src/pdf/pdfNotice/memoirePdf";
import { pop_url } from "../../src/config";

const pushLinkedNotices = (a, d, base) => {
  for (let i = 0; Array.isArray(d) && i < d.length; i++) {
    a.push(API.getNotice(base, d[i]));
    if (a.length > 50) break;
  }
};

export default class extends React.Component {

  state = { display: false, prevLink: undefined, nextLink: undefined }

  contentLocalisation = () => {
    const notice = this.props.notice;
    const dptlettre = notice.DPT_LETTRE ? notice.DPT_LETTRE : notice.DPT;
    const wcom = notice.WCOM ? notice.WCOM : notice.COM;
    const wadrs = notice.WADRS ? notice.WADRS : notice.ADRESSE;
    const array = [notice.PAYS.join(','), notice.REG.join(','), dptlettre.join(','), wcom.join(','), wadrs.join(','), notice.LIEU];
    let content = array.filter((val)=> val.trim() != "").join(", ");
    return content != "" ? content : notice.LOCA;
  }

  static async getInitialProps({ query: { id }, asPath }) {
    const notice = await API.getNotice("memoire", id);
    const collection = notice && await findCollection(notice.LBASE);
    const searchParamsUrl = asPath.substring(asPath.indexOf("?") + 1);
    const searchParams = Object.fromEntries(getParamsFromUrl(asPath));

    let links = [];
    if (collection) {
      const values = await API.getNotice(collection, notice.LBASE);
      links = values.filter(v => v);
    }

    const arr = [];
    if (notice) {
      const { REFJOC, REFMUS } = notice;
      pushLinkedNotices(arr, REFMUS, "museo");
      pushLinkedNotices(arr, REFJOC, "joconde");
    }
    const linkedNotices = (await Promise.all(arr)).filter(l => l);
    links.push(...linkedNotices);

    let listUrl = await Promise.all(notice.LBASE.map(async ref => {
      const collection = await findCollection(ref);
      return { key: ref, ref: ref, url: url(collection, ref) };
    }));

    return { notice, links, listUrl, searchParamsUrl, searchParams };
  }

  photographer() {
    let autp = this.props.notice.AUTP;
    return ((autp && autp.length > 0) && <div style={{ display: "flex", flexDirection: "row" }}>
      {autp.map((photographer, index) => {
        const qs = queryString.stringify({ auteur: JSON.stringify([photographer]) });
        return (<div style={{ display: "flex", flexDirection: "row" }}><a href={`/search/list?${qs}`} target="_blank">{photographer}</a>{index !== (autp.length - 1) ? <div>,&nbsp;</div> : ""}</div>);
      })}
    </div>)
  }

  serie() {
    const serie = this.props.notice.SERIE;
    const links = serie.map((element) => {
      const qs = queryString.stringify({ serie: JSON.stringify([element]) });
      return <a href={`/search/list?${qs}`} target="_blank">{element}</a>
    });
    return serie && <React.Fragment>{links.reduce((a, b) => [a, " ; ", b])}</React.Fragment>;
  }

  expo() {
    const expo = this.props.notice.EXPO;
    const qs = queryString.stringify({ expo: JSON.stringify([expo]) });
    return expo && <a href={`/search/list?${qs}`} target="_blank">{expo}</a>;
  }

  addLinkFieldMultiValue(fieldValues, name){
    const links = fieldValues.map((element) => {
      const qs = queryString.stringify({ name: JSON.stringify([element]) });
      return <a href={`/search/list?${qs}`} target="_blank">{element}</a>
    });
    return fieldValues && <React.Fragment>{links.reduce((a, b) => [a, " ; ", b])}</React.Fragment>;
  }

  addLinkFieldMultiValue(fieldValues, name){
    const links = fieldValues.map((element) => {
      const qs = queryString.stringify({ name: JSON.stringify([element]) });
      return <a href={`/search/list?${qs}`} target="_blank">{element}</a>
    });
    return fieldValues && <React.Fragment>{links.reduce((a, b) => [a, " ; ", b])}</React.Fragment>;
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

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    const { notice } = this.props;

    const { title, images, image_preview, metaDescription } = getNoticeInfo(notice);
    const obj = {
      name: title,
      created_at: notice.DATPV || notice.DMIS,
      artform: "Photograph",
      image: image_preview,
      description: metaDescription,
      contentLocation: notice.LOCA,
      creator: notice.AUTP
    };

    const pdf = MemoirePdf(notice, title, this.props.links);
    const App = () => (
      <div>
        <PDFDownloadLink
          document={pdf}
          fileName={"memoire_" + notice.REF + ".pdf"}
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
              <meta content={metaDescription} name="description" />
              <script type="application/ld+json">{schema(obj)}</script>
              {images.length ? <meta property="og:image" content={image_preview} /> : <meta />}
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
                    <BucketButton base="memoire" reference={notice.REF} />}
                </div>
                {this.state.display && App()}
              </div>
            </div>

            <Row>
              <Col md="8">
                <div className="notice-details">
                  <Title
                    content="Sujet de la photographie"
                    notice={notice}
                    fields={[
                      "LOCA",
                      "INSEE",
                      "ADRESSE",
                      "LIEU",
                      "MCGEO",
                      "EDIF",
                      "OBJT",
                      "TICO",
                      "LEG",
                      "TITRE",
                      "THEATRE",
                      "ROLE",
                      "AUTOEU",
                      "SCLE",
                      "DATOEU",
                      "LIEUORIG",
                      "SERIE",
                      "MCL",
                      "SUJET",
                      "MCPER",
                      "AUTOR",
                      "TIREDE",
                      "LIEUCOR",
                      "COTECOR",
                      "AUTG"
                    ]}
                  />
                  <Title
                    content="Localisation"
                    small={true}
                    notice={notice}
                    fields={["LOCA", "INSEE", "ADRESSE", "LIEU", "MCGEO"]}
                  />
                  <Field title={mapping.memoire.LOCA.label} content={this.contentLocalisation()} />
                  <Field title={mapping.memoire.INSEE.label} content={notice.INSEE} join={' ; '}/>
                  <Field title={notice.ADRESSE != "" ? mapping.memoire.ADRESSE.label : mapping.memoire.LIEU.label} content={notice.ADRESSE != "" ? notice.ADRESSE : notice.LIEU} />
                  <Field title={mapping.memoire.MCGEO.label} content={notice.MCGEO} />
                  <Title
                    content="Identification"
                    small={true}
                    notice={notice}
                    fields={[
                      "EDIF",
                      "OBJT",
                      "TICO",
                      "LEG",
                      "TITRE",
                      "THEATRE",
                      "ROLE",
                      "AUTOEU",
                      "SCLE",
                      "DATOEU",
                      "LIEUORIG",
                      "SERIE",
                      "MCL",
                      "SUJET",
                      "MCPER"
                    ]}
                  />
                  <Field title={mapping.memoire.EDIF.label} content={notice.EDIF} />
                  <Field title={mapping.memoire.OBJT.label} content={notice.OBJT} />
                  <Field title={mapping.memoire.TICO.label} content={notice.TICO} />

                  <Field title={mapping.memoire.LEG.label} content={notice.LEG} separator="#" />
                  <Field title={mapping.memoire.TITRE.label} content={notice.TITRE} />
                  <Field title={mapping.memoire.THEATRE.label} content={notice.THEATRE} />
                  <Field title={mapping.memoire.ROLE.label} content={notice.ROLE} />
                  <Field title={mapping.memoire.AUTOEU.label} content={notice.AUTOEU} join={' ; '}/>
                  <Field title={mapping.memoire.SCLE.label} content={notice.SCLE} join={' ; '}/>
                  <Field title={mapping.memoire.DATOEU.label} content={notice.DATOEU} />
                  <Field title={mapping.memoire.LIEUORIG.label} content={notice.LIEUORIG} />
                  { notice.SERIE.length > 0 ? <Field title={mapping.memoire.SERIE.label} content={this.serie()} /> : null }
                  <Field title={"Mots-clés"} content={[...notice.MCL, notice.SUJET].filter(el => el !== "")} join={' ; '}/>
                  <Field title={mapping.memoire.MCPER.label} content={notice.MCPER} join={' ; '}/>
                  <Title
                    content="Références des documents reproduits"
                    small={true}d
                    notice={notice}
                    fields={["AUTOR", "TIREDE", "LIEUCOR", "COTECOR", "AUTG"]}
                  />
                  <Field title={mapping.memoire.AUTOR.label} content={notice.AUTOR} join={' ; '}/>
                  <Field title={mapping.memoire.TIREDE.label} content={notice.TIREDE} />
                  <Field title={mapping.memoire.LIEUCOR.label} content={notice.LIEUCOR} />
                  <Field title={mapping.memoire.COTECOR.label} content={notice.COTECOR} join={' ; '}/>
                  <Field title={mapping.memoire.AUTG.label} content={notice.AUTG} join={' ; '}/>
                </div>
                { 
                  (this.photographer() || notice.AUTTI.length > 0) 
                  ? <div className="notice-details">
                      <Title content="Auteur" notice={notice} fields={["AUTP", "AUTTI"]} />
                      <Field title={"Photographe ou dessinateur"} content={this.photographer()} />
                      <Field title={mapping.memoire.AUTTI.label} content={notice.AUTTI} />
                    </div> 
                  : ""
                }
                
                <div className="notice-details">
                  <Title
                    content="Description de la photographie"
                    notice={notice}
                    fields={[
                      "TYPDOC",
                      "NUMI",
                      "NUMP",
                      "ANUMP",
                      "NUMAUTP",
                      "NUMTI",
                      "ANUMTI",
                      "REPRO",
                      "NEGPOS",
                      "NUMOR",
                      "ANUMOR",
                      "RENV",
                      "LIEUCTI",
                      "COTECTI",
                      "PRECOR",
                      "ACQU",
                      "DIFF",
                      "ECH",
                      "TECHN",
                      "FORMAT",
                      "TECHTI",
                      "FORMATTI",
                      "TECHOR",
                      "FORMATOR",
                      "MENTIONS",
                      "MENTTI",
                      "SENS",
                      "DATPV",
                      "JDATPV",
                      "DATOR",
                      "EXPO",
                      "PUBLI",
                      "OBS",
                      "OBSTI",
                      "OBSOR"
                    ]}
                  />
                  <Title
                    content="Éléments d’identification"
                    small={true}
                    notice={notice}
                    fields={[
                      "TYPDOC",
                      "NUMI",
                      "NUMP",
                      "ANUMP",
                      "NUMAUTP",
                      "NUMTI",
                      "ANUMTI",
                      "REPRO",
                      "NEGPOS",
                      "NUMOR",
                      "ANUMOR",
                      "RENV",
                      "LIEUCTI",
                      "COTECTI",
                      "PRECOR",
                      "ACQU",
                      "DIFF",
                      "ECH"
                    ]}
                  />
                  <Field title={mapping.memoire.TYPDOC.label} content={notice.TYPDOC} />
                  <Field title={mapping.memoire.NUMI.label} content={notice.NUMI} />
                  <Field title={mapping.memoire.NUMP.label} content={notice.NUMP} />
                  <Field title={mapping.memoire.ANUMP.label} content={notice.ANUMP} />
                  <Field title={mapping.memoire.NUMAUTP.label} content={notice.NUMAUTP} />
                  <Field title={mapping.memoire.NUMTI.label} content={notice.NUMTI} />
                  <Field title={mapping.memoire.ANUMTI.label} content={notice.ANUMTI} />
                  <Field title={mapping.memoire.REPRO.label} content={notice.REPRO} />
                  <Field title={mapping.memoire.NEGPOS.label} content={notice.NEGPOS} />
                  <Field title={mapping.memoire.NUMOR.label} content={notice.NUMOR} />
                  <Field title={mapping.memoire.ANUMOR.label} content={notice.ANUMOR} />
                  <Field title={mapping.memoire.RENV.label} content={notice.RENV} />
                  <Field title={mapping.memoire.LIEUCTI.label} content={notice.LIEUCTI} />
                  <Field title={mapping.memoire.COTECTI.label} content={notice.COTECTI} />
                  <Field title={mapping.memoire.PRECOR.label} content={notice.PRECOR} />
                  <Field title={mapping.memoire.ACQU.label} content={notice.ACQU} />
                  <Field title={mapping.memoire.DIFF.label} content={notice.DIFF} />
                  <Field title={mapping.memoire.ECH.label} content={notice.ECH} />

                  <Title
                    content="Description technique du phototype"
                    small={true}
                    notice={notice}
                    fields={[
                      "TECHN",
                      "FORMAT",
                      "TECHTI",
                      "FORMATTI",
                      "TECHOR",
                      "FORMATOR",
                      "MENTIONS",
                      "MENTTI",
                      "SENS"
                    ]}
                  />
                  <Field title={mapping.memoire.TECHN.label} content={notice.TECHN} />
                  <Field title={mapping.memoire.FORMAT.label} content={notice.FORMAT} />
                  <Field title={mapping.memoire.TECHTI.label} content={notice.TECHTI} />
                  <Field title={mapping.memoire.FORMATTI.label} content={notice.FORMATTI} />
                  <Field title={mapping.memoire.TECHOR.label} content={notice.TECHOR} />
                  <Field title={mapping.memoire.FORMATOR.label} content={notice.FORMATOR} />
                  <Field title={mapping.memoire.MENTIONS.label} content={notice.MENTIONS} />
                  <Field
                    title={mapping.memoire.MENTTI.label}
                    content={notice.MENTTI}
                    separator="#"
                  />
                  <Field title={mapping.memoire.SENS.label} content={notice.SENS} />
                  <Title
                    content="Datation et événements liés à l’image"
                    small={true}
                    notice={notice}
                    fields={["DATPV", "JDATPV", "DATOR", "EXPO", "PUBLI", "OBS", "OBSTI", "OBSOR"]}
                  />
                  <Field title={mapping.memoire.DATPV.label} content={notice.DATPV} />
                  <Field title={mapping.memoire.JDATPV.label} content={notice.JDATPV} />
                  <Field title={mapping.memoire.DATOR.label} content={notice.DATOR} />
                  <Field title={mapping.memoire.EXPO.label} content={this.expo()} />
                  <Field title={mapping.memoire.PUBLI.label} content={notice.PUBLI} separator="#" />
                  <Field title={mapping.memoire.OBS.label} content={notice.OBS} />
                  <Field title={mapping.memoire.OBSTI.label} content={notice.OBSTI} />
                  <Field title={mapping.memoire.OBSOR.label} content={notice.OBSOR} />
                </div>
              </Col>
              <Col md="4">
                <FieldImages images={images} />
                <LinkedNotices links={this.props.links} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.memoire.REF.label} content={notice.REF} />
                    <Field title={mapping.memoire.BASE.label} content={notice.BASE} />
                    <Field title={mapping.memoire.DMIS.label} content={notice.DMIS} />
                    <Field title={mapping.memoire.DMAJ.label} content={notice.DMAJ} />
                    <Field title={mapping.memoire.AUTP.label} content={this.photographer()} />
                    <Field title={mapping.memoire.AUTOR.label} content={notice.AUTOR} />
                    <Field title={mapping.memoire.COPY.label} content={notice.COPY} />
                  </div>
                  <ContactUs contact={notice.CONTACT} REF={notice.REF} base="memoire" />
                </div>
                <SeeMore notice={notice} listUrl={this.props.listUrl} />
              </Col>
            </Row>
          </Container>
        </div>
        <style jsx>{noticeStyle}</style>
      </Layout>
    );
  }
}

function url(collection, ref) {
  switch (collection) {
    case "merimee":
      return `/notice/merimee/${ref}`;
    case "palissy":
      return `/notice/palissy/${ref}`;
  }
}

function link(listUrl) {
  return (
    <React.Fragment>
      {
        listUrl.map(url => {
          return (
            <React.Fragment key={url.ref}>
              <a href={url.url || "#"} target="_blank">{url.ref}</a>
              <br />
            </React.Fragment>
          );
        })
      }
    </React.Fragment>
  );
}

const SeeMore = ({ notice, listUrl }) => {
  if (!notice.LAUTP && !(notice.LBASE && notice.LBASE.length)) {
    return null;
  }

  const elements = [];

  if (notice.LAUTP) {
    elements.push(
      <Field
        title={mapping.memoire.LAUTP.label}
        content={
          <a
            target="_blank"
            rel="noopener"
            href={`http://www2.culture.gouv.fr/public/mistral/autor_fr?ACTION=CHERCHER&FIELD_98=REF&VALUE_98=${notice.LAUTP
              }`}
          >
            {notice.LAUTP}
          </a>
        }
        key="notice.LAUTP"
      />
    );
  }

  if (notice.LBASE && notice.LBASE.length) {
    elements.push(
      <Field title={mapping.memoire.LBASE.label} content={link(listUrl)} key="notice.LBASE" />
    );
  }

  return (
    <div className="sidebar-section info">
      <h2>Voir aussi</h2>
      {elements}
    </div>
  );
};
