import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import isURL from "validator/lib/isURL";
import isEmail from "validator/lib/isEmail";

import { getNoticeInfo } from "../../src/utils";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import mapping from "../../src/services/mapping";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import Title from "../../src/notices/Title";
import FieldImages from "../../src/notices/FieldImages";
import ContactUs from "../../src/notices/ContactUs";
import Map from "../../src/notices/Map";
import { schema, toFieldImages } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";

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
      if (String(value) === value) {
        return <a href={`/search/list?${name}=["${value}"]`}>{value}</a>;
      }
      return null;
    }
    const links = value
      .map(d => (
        <a href={`/search/list?${name}=["${d}"]`} key={d}>
          {d}
        </a>
      ))
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
        .map(a => (
          <a href={`/search/list?auteur=${JSON.stringify([a, author])}`} key={a}>
            {a}
          </a>
        ))
        .reduce((p, c) => [p, " ; ", c]);
      return <React.Fragment>{links}</React.Fragment>;
    }
    return <a href={`/search/list?auteur=["${author}"]`}>{author}</a>;
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

                  <Field title={mapping.joconde.INV.label} content={notice.INV} />
                  <Field
                    title={mapping.joconde.DOMN.label}
                    content={this.links(this.props.notice.DOMN, "domn")}
                  />
                  <Field
                    title={mapping.joconde.DENO.label}
                    content={this.links(this.props.notice.DENO, "deno")}
                  />
                  <Field title={mapping.joconde.APPL.label} content={notice.APPL} />
                  <Field title={mapping.joconde.TITR.label} content={notice.TITR} />
                  <Field title={mapping.joconde.AUTR.label} content={this.author()} />
                  <Field title={mapping.joconde.PAUT.label} content={notice.PAUT} separator="#" />
                  <Field title={mapping.joconde.ECOL.label} content={notice.ECOL} />
                  <Field title={mapping.joconde.ATTR.label} content={notice.ATTR} />
                  <Field
                    title={mapping.joconde.PERI.label}
                    content={this.links(this.props.notice.PERI, "periode")}
                  />
                  <Field title={mapping.joconde.MILL.label} content={notice.MILL} />

                  <Field title={mapping.joconde.EPOQ.label} content={notice.EPOQ} />
                  <Field title={mapping.joconde.PEOC.label} content={notice.PEOC} />
                  <Field
                    title={mapping.joconde.TECH.label}
                    content={this.links(this.props.notice.TECH, "tech")}
                  />
                  <Field title={mapping.joconde.DIMS.label} content={notice.DIMS} />
                  <Field title={mapping.joconde.INSC.label} content={notice.INSC} />
                  <Field title={mapping.joconde.PINS.label} content={notice.PINS} />
                  <Field title={mapping.joconde.ONOM.label} content={notice.ONOM} />
                  <Field title={mapping.joconde.DESC.label} content={notice.DESC} />
                  <Field title={mapping.joconde.ETAT.label} content={notice.ETAT} />
                  <Field
                    title={mapping.joconde.REPR.label}
                    content={this.links(this.props.notice.REPR, "repr")}
                    separator="#"
                  />
                  <Field title={mapping.joconde.PREP.label} content={notice.PREP} />
                  <Field title={mapping.joconde.DREP.label} content={notice.DREP} separator="#" />
                  <Field title={mapping.joconde.SREP.label} content={notice.SREP} />
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
                  <Field title={mapping.joconde.GENE.label} content={notice.GENE} />
                  <Field title={mapping.joconde.HIST.label} content={notice.HIST} />
                  <Field title={mapping.joconde.LIEUX.label} content={notice.LIEUX} />
                  <Field title={mapping.joconde.PLIEUX.label} content={notice.PLIEUX} />
                  <Field title={mapping.joconde.GEOHI.label} content={notice.GEOHI} />
                  <Field
                    title={mapping.joconde.UTIL.label}
                    content={this.links(this.props.notice.UTIL, "util")}
                  />
                  <Field title={mapping.joconde.PUTI.label} content={notice.PUTI} />
                  <Field title={mapping.joconde.PERU.label} content={notice.PERU} />
                  <Field title={mapping.joconde.MILU.label} content={notice.MILU} />
                  <Field title={mapping.joconde.DECV.label} content={notice.DECV} />
                  <Field title={mapping.joconde.PDEC.label} content={notice.PDEC} />
                  <Field title={mapping.joconde.NSDA.label} content={notice.NSDA} />
                  <Title
                    content="Informations juridiques"
                    notice={notice}
                    fields={["STAT", "DACQ", "APTN", "DEPO", "DDPT", "ADPT", "LOCA"]}
                  />
                  <Field title={mapping.joconde.STAT.label} content={notice.STAT} />
                  <Field title={mapping.joconde.DACQ.label} content={notice.DACQ} />
                  <Field title={mapping.joconde.APTN.label} content={notice.APTN} separator="#" />
                  <Field title={mapping.joconde.DEPO.label} content={notice.DEPO} />
                  <Field title={mapping.joconde.DDPT.label} content={notice.DDPT} />

                  <Field title={mapping.joconde.ADPT.label} content={notice.ADPT} />
                  <Field
                    title={mapping.joconde.LOCA.label}
                    content={this.links(this.props.notice.LOCA, "ou")}
                  />
                  <Title
                    content="Informations complémentaires"
                    notice={notice}
                    fields={["COMM", "EXPO", "BIBL"]}
                  />
                  <Field title={mapping.joconde.COMM.label} content={notice.COMM} separator="#" />
                  <Field title={mapping.joconde.EXPO.label} content={notice.EXPO} />
                  <Field title={mapping.joconde.BIBL.label} content={notice.BIBL} separator="#" />
                </div>
              </Col>
              <Col md="4">
                <FieldImages images={images} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.joconde.REF.label} content={notice.REF} />
                    <Field title={mapping.joconde.BASE.label} content={notice.BASE} />
                    <Field title={mapping.joconde.DMIS.label} content={notice.DMIS} />
                    <Field title={mapping.joconde.DMAJ.label} content={notice.DMAJ} />
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
          <a target="_blank" href={notice.LVID}>
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
