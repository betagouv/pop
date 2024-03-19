import React, { Children, isValidElement, cloneElement } from "react";
import { Row, Col, Container, Button } from "reactstrap";
import Head from "next/head";
import Link from "next/link";
import isURL from "validator/lib/isURL";
import isEmail from "validator/lib/isEmail";
import queryString from "query-string";
import { getNoticeInfo, trackDownload } from "../../src/utils";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import mapping from "../../src/services/mapping";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import Title from "../../src/notices/Title";
import FieldImages from "../../src/notices/FieldImages";
import ContactUs from "../../src/notices/ContactUs";
import Map from "../../src/notices/Map";
import { schema, getParamsFromUrl, findCollection, highlighting, lastSearch } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";
import BucketButton from "../../src/components/BucketButton";
import Cookies from 'universal-cookie';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { JocondePdf } from "../../src/pdf/pdfNotice/jocondePdf";
import LinkedNotices from "../../src/notices/LinkedNotices";
import { pop_url } from "../../src/config";
import EAnalytics from "../../src/services/eurelian";
import { renderFieldRepr } from '../../src/notices/CustomField';

const pushLinkedNotices = (a, d, base) => {
  for (let i = 0; Array.isArray(d) && i < d.length; i++) {
    a.push(API.getNotice(base, d[i]));
    if (a.length > 65) break;
  }
};

export default class extends React.Component {

  state = { display: false, prevLink: undefined, nextLink: undefined }

  static loadMuseo(m) {
    try {
      return API.getNotice("museo", m);
    } catch (e) { }
    return null;
  }

  static async getInitialProps({ query: { id }, asPath }) {
    const notice = await API.getNotice("joconde", id);
    const museo = notice && notice.MUSEO && (await this.loadMuseo(notice.MUSEO));
    const searchParamsUrl = asPath.substring(asPath.indexOf("?") + 1);
    const searchParams = Object.fromEntries(getParamsFromUrl(asPath));

    const arr = [];
    if (notice) {
      const { REFPAL, REFMEM, REFMER } = notice;
      pushLinkedNotices(arr, REFMEM, "memoire");
      pushLinkedNotices(arr, REFMER, "merimee");
      pushLinkedNotices(arr, REFPAL, "palissy");
    }

    const links = (await Promise.all(arr)).filter(l => l);

    return {
      notice,
      museo,
      searchParams,
      searchParamsUrl,
      links
    };
  }

  async componentDidMount() {
    //this.setState({display : true});
    // Tracking Eurelian
    EAnalytics.initialize();
    EAnalytics.track([
      'path', `Notice Joconde ${this.props.notice?.REF}`,
      'pagegroup', 'Collections des musées de France (Joconde)'
    ])

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

  buildUrl(name, chaine) {
    let url = `/search/list?${queryString.stringify({ [name]: JSON.stringify([chaine]) })}`;
    return <a href={url} key={chaine} target="_blank">{chaine}</a>
  }

  // Crée le lien pour le chap REPR avec la prise en compte du retour à la ligne
  buildLinkRepr(v) {
    const name = "repr";
    let link = this.buildUrl(name, v.replace('#', ''));
    if (v.indexOf('#') > -1) {
      link = <React.Fragment><br /> {link} </React.Fragment>;
    }
    return link;
  }

  intersperseReact(arr, separator) {
    const result = []

    Children.forEach(arr, (child, index) => {
      if (isValidElement(child)) {
        result.push(child)
      } else {
        result.push(createElement('text', { key: `item-${index}` }, child))
      }

      if (index < arr.length - 1) {
        result.push(cloneElement(separator, { key: `separator-${index}` }))
      }
    })

    return result
  }

  linkRepr(value) {
    // Caractères possible dans la valeur renseignée
    const regexPattern = new RegExp(/[(),;:]/g);
    const arrayContent = [];

    for (let i = 0; i < value.length; i++) {
      if (regexPattern.test(value[i])) {
        const arraySplit = value[i].split(/[(),:;]/).filter(e => e != "");
        arraySplit.forEach(v => arrayContent.push(this.buildLinkRepr(v)))

      } else {
        arrayContent.push(this.buildLinkRepr(value[i]));
      }
    }
    const res = this.intersperseReact(arrayContent, <React.Fragment> ; </React.Fragment>)
    return res
  }

  // Display a list of links to authors
  links(value, name) {
    //const author = this.props.notice.AUTR;
    if (!value) {
      return null;
    }
    if (!value || !Array.isArray(value) || !value.length) {
      if (String(value) === value && !String(value) == "") {
        const url = `/search/list?${queryString.stringify({ [name]: JSON.stringify([value]) })}`;
        return <a href={url} target="_blank">{value}</a>;
      }
      return null;
    }
    const links = [];
    value.forEach((val) => {
      if (val.indexOf('#') > -1) {
        if (links.length > 0) {
          links.push(', ')
        }
        val.split('#').forEach((el) => {

          if ('' !== el.trim()) {
            const url = `/search/list?${queryString.stringify({ [name]: JSON.stringify([el]) })}`;

            links.push(
              (
                <div className="div-links">
                  <a href={url} key={el} target="_blank">
                    {el}
                  </a>
                </div>
              )
            );
          }

        });
      } else {
        let url = `/search/list?${queryString.stringify({ [name]: JSON.stringify([val]) })}`;
        if (links.length > 0) {
          links.push(', ')
        }
        links.push(
          <a href={url} key={val} target="_blank">
            {val}
          </a>
        );

      }

    });
    return <React.Fragment>{links}</React.Fragment>;
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

    const { title, image_preview, metaDescription, images } = getNoticeInfo(this.props.notice);
    const notice = this.props.notice;
    const obj = {
      name: title,
      created_at: notice.PERI != null && notice.PERI.length > 0 ? notice.PERI[0] : "",
      artform: notice.DOMN.length ? notice.DOMN[0] : "",
      image: image_preview,
      description: metaDescription,
      artMedium: notice.TECH.join(", "),
      creator: String(notice.AUTR).split(";"),
      comment: notice.COMM,
      contentLocation: notice.LOCA
    };

    let title_component = title;

    // M43260 - Prise en cmpte du # pour le retour à la ligne sur le titre de la notice
    if (typeof title == "string" && title.indexOf('#') > -1) {
      title_component = title.split('#').map((element) => <p>{element}</p>);
    }

    //construction du pdf au format joconde
    //Affichage du bouton de téléchargement du fichier pdf une fois que la page a chargé et que le pdf est construit
    const pdf = JocondePdf(notice, title, this.props.links, this.props.museo);
    const App = () => (
      <div>
        <PDFDownloadLink
          document={pdf}
          fileName={"joconde_" + notice.REF + ".pdf"}
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
          }}
          onClick={() => trackDownload(`joconde_${notice.REF}.pdf`)}>
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
                <h1 className="heading-title">{title_component}</h1>
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
                <div className="addBucket onPrintHide  desktop-only">
                  {this.state.display &&
                    <BucketButton base="joconde" reference={notice.REF} />}
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
                      "INV",
                      "DOMN",
                      "DENO",
                      "APPL",
                      "TITR",
                      "AUTR",
                      "PAUT",
                      "NSDA",
                      "ECOL",
                      "ATTR",
                      "PERI",
                      "MILL",
                      "EPOQ",
                      "PEOC",
                      "TECH",
                      "DIMS",
                      "INSC",
                      "PINS",
                      "ONOM",
                      "DESC",
                      "REPR",
                      "PREP",
                      "DREP",
                      "SREP"
                    ]}
                  />
                  <Field title={mapping.joconde.INV.label} content={notice.INV} separator="#" upper={false} />
                  <Field
                    title={mapping.joconde.DOMN.label}
                    content={this.links(this.props.notice.DOMN, "domn")}
                    separator="#" upper={false}
                  />
                  <Field
                    title={mapping.joconde.DENO.label}
                    content={this.links(this.props.notice.DENO, "deno")}
                    separator="#" upper={false}
                  />
                  <Field title={mapping.joconde.APPL.label} content={notice.APPL} separator="#" upper={false} />
                  <Field title={mapping.joconde.TITR.label} content={notice.TITR} separator="#" upper={false} />
                  <Field
                    title={mapping.joconde.AUTR.label}
                    content={this.links(this.props.notice.AUTR, "auteur")}
                    separator="#" upper={false} />
                  <Field title={mapping.joconde.PAUT.label} content={notice.PAUT} separator="#" upper={false} />
                  <Field title={mapping.joconde.NSDA.label} content={notice.NSDA} separator="#" upper={false} />
                  <Field title={mapping.joconde.ECOL.label} content={notice.ECOL} separator="#" upper={false} />
                  <Field title={mapping.joconde.ATTR.label} content={notice.ATTR} separator="#" upper={false} />
                  <Field
                    title={mapping.joconde.PERI.label}
                    content={this.links(this.props.notice.PERI, "periode")}
                    separator="#" upper={false}
                  />
                  <Field title={mapping.joconde.MILL.label} content={notice.MILL} separator="#" upper={false} />

                  <Field title={mapping.joconde.EPOQ.label} content={notice.EPOQ} separator="#" upper={false} />
                  <Field title={mapping.joconde.PEOC.label} content={notice.PEOC} separator="#" upper={false} />
                  <Field
                    title={mapping.joconde.TECH.label}
                    content={this.links(this.props.notice.TECH, "tech")}
                    separator="#" upper={false}
                  />
                  <Field title={mapping.joconde.DIMS.label} content={notice.DIMS} separator="#" upper={false} />
                  <Field title={mapping.joconde.INSC.label} content={notice.INSC} separator="#" upper={false} />
                  <Field title={mapping.joconde.PINS.label} content={notice.PINS} separator="#" upper={false} />
                  <Field title={mapping.joconde.ONOM.label} content={notice.ONOM} separator="#" upper={false} />
                  <Field title={mapping.joconde.DESC.label} content={notice.DESC} separator="#" addLink="true" upper={false} />
                  {renderFieldRepr(mapping.joconde.REPR.label, this.linkRepr(this.props.notice.REPR))}
                  {/* <Field
                    title={mapping.joconde.REPR.label}
                    content={this.linkRepr(this.props.notice.REPR)}
                    separator="#"
                    upper={false}
                  /> */}
                  <Field title={mapping.joconde.PREP.label} content={notice.PREP} separator="#" upper={false} />
                  <Field title={mapping.joconde.DREP.label} content={notice.DREP} separator="#" upper={false} />
                  <Field title={mapping.joconde.SREP.label} content={notice.SREP} separator="#" upper={false} />
                  <Title
                    content="Contexte historique"
                    notice={notice}
                    fields={[
                      "GENE",
                      "HIST",
                      "LIEUX",
                      "PLIEUX",
                      "GEOHI",
                      "UTIL",
                      "PUTI",
                      "PERU",
                      "MILU",
                      "DECV",
                      "PDEC"
                    ]}
                  />
                  <Field title={mapping.joconde.GENE.label} content={notice.GENE} separator="#" upper={false} />
                  <Field title={mapping.joconde.HIST.label} content={notice.HIST} separator="#" addLink="true" upper={false} />
                  <Field title={mapping.joconde.LIEUX.label} content={notice.LIEUX} separator="#" upper={false} />
                  <Field title={mapping.joconde.PLIEUX.label} content={notice.PLIEUX} separator="#" upper={false} />
                  <Field title={mapping.joconde.GEOHI.label} content={notice.GEOHI} separator="#" upper={false} />
                  <Field
                    title={mapping.joconde.UTIL.label}
                    content={this.links(this.props.notice.UTIL, "util")}
                    separator="#"
                    upper={false}
                  />
                  <Field title={mapping.joconde.PUTI.label} content={notice.PUTI} separator="#" upper={false} />
                  <Field title={mapping.joconde.PERU.label} content={notice.PERU} separator="#" upper={false} />
                  <Field title={mapping.joconde.MILU.label} content={notice.MILU} separator="#" upper={false} />
                  <Field title={mapping.joconde.DECV.label} content={notice.DECV} separator="#" upper={false} />
                  <Field title={mapping.joconde.PDEC.label} content={notice.PDEC} separator="#" upper={false} />
                  <Title
                    content="Informations juridiques"
                    notice={notice}
                    fields={["STAT", "DACQ", "APTN", "DEPO", "DDPT", "ADPT", "LOCA", "MANQUANT", "MANQUANT_COM"]}
                  />
                  <Field title={mapping.joconde.STAT.label} content={notice.STAT} separator="#" upper={false} />
                  <Field title={mapping.joconde.DACQ.label} content={notice.DACQ} separator="#" upper={false} />
                  <Field title={mapping.joconde.APTN.label} content={notice.APTN} separator="#" upper={false} />
                  <Field title={mapping.joconde.DEPO.label} content={notice.DEPO} separator="#" upper={false} />
                  <Field title={mapping.joconde.DDPT.label} content={notice.DDPT} separator="#" upper={false} />
                  <Field title={mapping.joconde.ADPT.label} content={notice.ADPT} separator="#" upper={false} />
                  <Field
                    title={mapping.joconde.LOCA.label}
                    content={this.links(this.props.notice.LOCA, "loca")}
                    separator="#" upper={false}
                  />
                  <Field title={mapping.joconde.MANQUANT.label} content={notice.MANQUANT} separator="#" upper={false} />
                  <Field title="" content={notice.MANQUANT_COM} separator="#" upper={false} />
                  <Title
                    content="Informations complémentaires"
                    notice={notice}
                    fields={["COMM", "EXPO", "BIBL"]}
                  />
                  <Field title={mapping.joconde.COMM.label} content={notice.COMM} separator="#" upper={false} />
                  <Field title={mapping.joconde.EXPO.label} content={notice.EXPO} separator="#" upper={false} />
                  <Field title={mapping.joconde.BIBL.label} content={notice.BIBL} separator="#" upper={false} addLink="true" />
                </div>
              </Col>
              <Col md="4">
                <FieldImages images={images} />
                <LinkedNotices links={this.props.links} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.joconde.REF.label} content={notice.REF} separator="#" upper={false} />
                    <Field title={mapping.joconde.BASE.label} content={notice.BASE} separator="#" upper={false} />
                    <Field title={mapping.joconde.DMIS.label} content={notice.DMIS} separator="#" upper={false} />
                    <Field title={mapping.joconde.DMAJ.label} content={notice.DMAJ} separator="#" upper={false} />
                    <Field title={mapping.joconde.REDA.label} content={notice.REDA} separator="#" upper={false} />
                    <Field title={mapping.joconde.PHOT.label} content={notice.PHOT} separator="#" upper={false} />
                    <Field title={mapping.joconde.DATA.label} content={notice.DATA} separator="#" upper={false} />
                    <Field title={mapping.joconde.LOCA3.label} content={notice.LOCA3} separator="#" upper={false} />
                  </div>

                  <ContactUs contact={notice.CONTACT} REF={notice.REF} base="joconde" />
                </div>

                <SeeMore notice={notice} museo={this.props.museo} />
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

function handleClick(e) {
  e.preventDefault();
  window.open(e.target.href, '_blank');
}

const SeeMore = ({ notice, museo }) => {
  const arr = [];

  if (notice.LVID) {
    arr.push(
      <Field
        title={mapping.joconde.LVID.label}
        content={
          <Link href={notice.LVID}>
            <a target="_blank" rel="noopener" href={notice.LVID}>
              {notice.LVID}
            </a>
          </Link>
        }
        key="notice.LVID"
      />
    );
  }

  if (notice.WWW) {
    if (notice.WWW.length > 0) {
      arr.push(
        <Field
          title={mapping.joconde.WWW.label}
          content={
            <Link href={notice.WWW[0]}>
              <a href={notice.WWW[0]} target="_blank">{notice.WWW[0]}</a>
            </Link>
          }
          key="notice.WWW"
        />
      );

      for (let i = 1; i < notice.WWW.length; i++) {
        arr.push(
          <Field
            content={
              <Link href={notice.WWW[i]}>
                <a href={notice.WWW[i]} target="_blank">{notice.WWW[i]}</a>
              </Link>
            }
            key="notice.WWW"
          />
        );
      }
    }
  }

  if (notice.MUSEO) {
    const text = museo
      ? [
        museo.NOMOFF || museo.NOMUSAGE || museo.ANC,
        museo.VILLE_M || museo.VILLE_AD,
        museo.REF
      ].join(" - ")
      : notice.MUSEO;
    arr.push(
      <Field
        title={mapping.joconde.MUSEO.label}
        content={
          <Link href={`/notice/museo/${notice.MUSEO}`}>
            <a href={`/notice/museo/${notice.MUSEO}`} target="_blank">{text}</a>
          </Link>
        }
        key="notice.MUSEO"
      />
    );
  }

  if (isURL(notice.RETIF)) {
    arr.push(
      <Field
        title={mapping.joconde.RETIF.label}
        content={
          <Link href={notice.RETIF}>
            <a href={notice.RETIF} target="_blank">INHA</a>
          </Link>
        }
        key="notice.RETIF"
      />
    );
  }

  if (isEmail(notice.MSGCOM)) {
    arr.push(
      <Field
        title={mapping.joconde.MSGCOM.label}
        content={
          <Link href={notice.RETIF}>
            <a href={`mailto:${notice.MSGCOM}`} onClick={handleClick}>
              Demande de photographie et/ou de conditions d'utilisation
            </a>
          </Link>
        }
        key="notice.MSGCOM"
      />
    );
  }

  if (!arr.length) {
    return null;
  }

  return (
    <div className="sidebar-section info">
      <h2>Voir aussi</h2>
      <div>{arr}</div>
    </div>
  );
};
