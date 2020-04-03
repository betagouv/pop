import React from "react";
import { Row, Col, Container, Button } from "reactstrap";
import Head from "next/head";
import isURL from "validator/lib/isURL";
import isEmail from "validator/lib/isEmail";
import queryString from "query-string";
import { getNoticeInfo, printPdf } from "../../src/utils";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import mapping from "../../src/services/mapping";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import Title from "../../src/notices/Title";
import FieldImages from "../../src/notices/FieldImages";
import ContactUs from "../../src/notices/ContactUs";
import Map from "../../src/notices/Map";
import { schema } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";
import BucketButton from "../../src/components/BucketButton";

export default class extends React.Component {
  static loadMuseo(m) {
    try {
      return API.getNotice("museo", m);
    } catch (e) {}
    return null;
  }
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("joconde", id);
    const museo = notice && notice.MUSEO && (await this.loadMuseo(notice.MUSEO));
    return {
      notice,
      museo
    };
  }

  links(value, name) {
    if (!value || !Array.isArray(value) || !value.length) {
      if (String(value) === value && !String(value)=="") {
        const url = `/search/list?${queryString.stringify({ [name]: JSON.stringify([value]) })}`;
        return <a href={url}>{value}</a>;
      }
      return null;
    }
    const links = value
      .map(d => {
        const url = `/search/list?${queryString.stringify({ [name]: JSON.stringify([d]) })}`;
        return (
          <a href={url} key={d}>
            {d}
          </a>
        );
      })
      .reduce((p, c) => [p, ", ", c]);
      return <React.Fragment>{links}</React.Fragment>;
  }

  // Display a list of links to authors
  author() {
    const author = this.props.notice.AUTR;
    if (!author) {
      return null;
    }
    // Split authors and create links to both single author and all authors.
    if (author.match(/;/)) {
      const links = author
        .split(";")
        .map(a => a.trim())
        .map(a => {
          const url = `/search/list?${queryString.stringify({
            auteur: JSON.stringify([a, author])
          })}`;
          return (
            <a href={url} key={a}>
              {a}
            </a>
          );
        })
        .reduce((p, c) => [p, " ; ", c]);
      return <React.Fragment>{links}</React.Fragment>;
    }
    const url = `/search/list?${queryString.stringify({ auteur: JSON.stringify([author]) })}`;
    return <a href={url}>{author}</a>;
  }

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    const { title, image_preview, metaDescription, images } = getNoticeInfo(this.props.notice);
    const notice = this.props.notice;
    const obj = {
      name: title,
      created_at: notice.PERI.length ? notice.PERI[0] : "",
      artform: notice.DOMN.length ? notice.DOMN[0] : "",
      image: image_preview,
      description: metaDescription,
      artMedium: notice.TECH.join(", "),
      creator: String(notice.AUTR).split(";"),
      comment: notice.COMM,
      contentLocation: notice.LOCA
    };

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

            <h1 className="heading">{title}</h1>
            <div className="top-container">
              <div className="addBucket">
                <BucketButton base="joconde" reference={notice.REF} />
              </div>
              <div className="printPdfBtn" onClick={() => printPdf("joconde_" + notice.REF)}>
              Imprimer la notice
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
                      "ETAT",
                      "REPR",
                      "PREP",
                      "DREP",
                      "SREP"
                    ]}
                  />
                  <Field title={mapping.joconde.INV.label} content={notice.INV} separator="#" />
                  <Field
                    title={mapping.joconde.DOMN.label}
                    content={this.links(this.props.notice.DOMN, "domn")}
                    separator="#" 
                  />
                  <Field
                    title={mapping.joconde.DENO.label}
                    content={this.links(this.props.notice.DENO, "deno")}
                    separator="#" 
                  />
                  <Field title={mapping.joconde.APPL.label} content={notice.APPL} separator="#" />
                  <Field title={mapping.joconde.TITR.label} content={notice.TITR} separator="#" />
                  <Field title={mapping.joconde.AUTR.label} content={this.author()} separator="#" />
                  <Field title={mapping.joconde.PAUT.label} content={notice.PAUT} separator="#" />
                  <Field title={mapping.joconde.ECOL.label} content={notice.ECOL} separator="#" />
                  <Field title={mapping.joconde.ATTR.label} content={notice.ATTR} separator="#" />
                  <Field
                    title={mapping.joconde.PERI.label}
                    content={this.links(this.props.notice.PERI, "periode")}
                    separator="#"
                  />
                  <Field title={mapping.joconde.MILL.label} content={notice.MILL} separator="#" />

                  <Field title={mapping.joconde.EPOQ.label} content={notice.EPOQ} separator="#" />
                  <Field title={mapping.joconde.PEOC.label} content={notice.PEOC} separator="#" />
                  <Field
                    title={mapping.joconde.TECH.label}
                    content={this.links(this.props.notice.TECH, "tech")}
                    separator="#"
                  />
                  <Field title={mapping.joconde.DIMS.label} content={notice.DIMS} separator="#" />
                  <Field title={mapping.joconde.INSC.label} content={notice.INSC} separator="#" />
                  <Field title={mapping.joconde.PINS.label} content={notice.PINS} separator="#" />
                  <Field title={mapping.joconde.ONOM.label} content={notice.ONOM} separator="#" />
                  <Field title={mapping.joconde.DESC.label} content={notice.DESC} separator="#" />
                  <Field title={mapping.joconde.ETAT.label} content={notice.ETAT} separator="#" />
                  <Field
                    title={mapping.joconde.REPR.label}
                    content={this.links(this.props.notice.REPR, "repr")}
                    separator="#"
                  />
                  <Field title={mapping.joconde.PREP.label} content={notice.PREP} separator="#" />
                  <Field title={mapping.joconde.DREP.label} content={notice.DREP} separator="#" />
                  <Field title={mapping.joconde.SREP.label} content={notice.SREP} separator="#" />
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
                      "PDEC",
                      "NSDA"
                    ]}
                  />
                  <Field title={mapping.joconde.GENE.label} content={notice.GENE} separator="#" />
                  <Field title={mapping.joconde.HIST.label} content={notice.HIST} separator="#" />
                  <Field title={mapping.joconde.LIEUX.label} content={notice.LIEUX} separator="#" />
                  <Field title={mapping.joconde.PLIEUX.label} content={notice.PLIEUX} separator="#" />
                  <Field title={mapping.joconde.GEOHI.label} content={notice.GEOHI} separator="#" />
                  <Field
                    title={mapping.joconde.UTIL.label}
                    content={this.links(this.props.notice.UTIL, "util")}
                    separator="#"
                  />
                  <Field title={mapping.joconde.PUTI.label} content={notice.PUTI} separator="#" />
                  <Field title={mapping.joconde.PERU.label} content={notice.PERU} separator="#" />
                  <Field title={mapping.joconde.MILU.label} content={notice.MILU} separator="#" />
                  <Field title={mapping.joconde.DECV.label} content={notice.DECV} separator="#" />
                  <Field title={mapping.joconde.PDEC.label} content={notice.PDEC} separator="#" />
                  <Field title={mapping.joconde.NSDA.label} content={notice.NSDA} separator="#" />
                  <Title
                    content="Informations juridiques"
                    notice={notice}
                    fields={["STAT", "DACQ", "APTN", "DEPO", "DDPT", "ADPT", "LOCA"]}
                  />
                  <Field title={mapping.joconde.STAT.label} content={notice.STAT} separator="#" />
                  <Field title={mapping.joconde.DACQ.label} content={notice.DACQ} separator="#" />
                  <Field title={mapping.joconde.APTN.label} content={notice.APTN} separator="#" />
                  <Field title={mapping.joconde.DEPO.label} content={notice.DEPO} separator="#" />
                  <Field title={mapping.joconde.DDPT.label} content={notice.DDPT} separator="#" />

                  <Field title={mapping.joconde.ADPT.label} content={notice.ADPT} />
                  <Field
                    title={mapping.joconde.LOCA.label}
                    content={this.links(this.props.notice.LOCA, "loca")}
                    separator="#"
                  />
                  <Field title={mapping.joconde.MANQUANT.label} content={notice.MANQUANT} separator="#" />
                  <Field title="" content={notice.MANQUANT_COM} separator="#" />
                  <Title
                    content="Informations complémentaires"
                    notice={notice}
                    fields={["COMM", "EXPO", "BIBL"]}
                  />
                  <Field title={mapping.joconde.COMM.label} content={notice.COMM} separator="#" />
                  <Field title={mapping.joconde.EXPO.label} content={notice.EXPO} separator="#" />
                  <Field title={mapping.joconde.BIBL.label} content={notice.BIBL} separator="#" />
                </div>
              </Col>
              <Col md="4">
                <FieldImages images={images} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.joconde.REF.label} content={notice.REF} separator="#" />
                    <Field title={mapping.joconde.BASE.label} content={notice.BASE} separator="#" />
                    <Field title={mapping.joconde.DMIS.label} content={notice.DMIS} separator="#" />
                    <Field title={mapping.joconde.DMAJ.label} content={notice.DMAJ} separator="#" />
                    <Field title={mapping.joconde.PHOT.label} content={notice.PHOT} separator="#" />
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

const SeeMore = ({ notice, museo }) => {
  const arr = [];

  if (notice.LVID) {
    arr.push(
      <Field
        title={mapping.joconde.LVID.label}
        content={
          <a target="_blank" rel="noopener" href={notice.LVID}>
            {notice.LVID}
          </a>
        }
        key="notice.LVID"
      />
    );
  }

  if (notice.WWW) {
    arr.push(
      <Field
        title={mapping.joconde.WWW.label}
        content={<a href={notice.WWW}>{notice.WWW}</a>}
        key="notice.WWW"
      />
    );
  }

  if (notice.MUSEO) {
    const text = museo
      ? [
          museo.NOMUSAGE || museo.NOMOFF || museo.ANC,
          museo.VILLE_M || museo.VILLE_AD,
          museo.REF
        ].join(" - ")
      : notice.MUSEO;
    arr.push(
      <Field
        title={mapping.joconde.MUSEO.label}
        content={<a href={`/notice/museo/${notice.MUSEO}`}>{text}</a>}
        key="notice.MUSEO"
      />
    );
  }

  if (isURL(notice.RETIF)) {
    arr.push(
      <Field
        title={mapping.joconde.RETIF.label}
        content={<a href={notice.RETIF}>INHA</a>}
        key="notice.RETIF"
      />
    );
  }

  if (isEmail(notice.MSGCOM)) {
    arr.push(
      <Field
        title={mapping.joconde.MSGCOM.label}
        content={
          <a href={`mailto:${notice.MSGCOM}`}>
            Demande de photographie et/ou de conditions d'utilisation
          </a>
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
