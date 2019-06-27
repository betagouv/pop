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
import LinkedNotices from "../../src/notices/LinkedNotices";
import Title from "../../src/notices/Title";
import ContactUs from "../../src/notices/ContactUs";
import FieldImages from "../../src/notices/FieldImages";
import Map from "../../src/notices/Map";
import { schema, findCollection, postFixedLink } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("palissy", id);
    const arr = [];

    if (notice) {
      const { RENV, REFP, REFE, REFA, LBASE2, REF } = notice;
      [...RENV, ...REFP, ...REFE, ...REFA, LBASE2]
        .filter(e => e && e != REF)
        .forEach(e => {
          const collection = findCollection(e);
          arr.push(API.getNotice(collection, e));
        });
    }

    const links = (await Promise.all(arr)).filter(l => l);
    return { notice, links };
  }

  fieldImage(notice) {
    const { images } = getNoticeInfo(notice);
    const imageComponents = images.map(e => ({
      src: e.src,
      alt: e.name,
      footer: (
        <div style={{ marginTop: "5px" }}>
          <div style={{ textAlign: "center", fontWeight: "bold" }}>{e.name}</div>
          <div
            style={{
              fontSize: "13px"
            }}
          >
            {e.copy}
          </div>
          <a
            style={{
              fontSize: "13px"
            }}
            target="_blank"
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

  // Display a list of links to authors
  authors() {
    const authors = this.props.notice.AUTR;
    if (!authors || !Array.isArray(authors) || !authors.length) {
      return null;
    }
    const links = authors
      .map(a => a.trim())
      .map(a => {
        const url = `/search/list?${queryString.stringify({ auteur: JSON.stringify([a]) })}`;
        return (
          <a href={url} key={a}>
            {a}
          </a>
        );
      })
      .reduce((p, c) => [p, " ; ", c]);
    return <React.Fragment>{links}</React.Fragment>;
  }

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    const notice = this.props.notice;
    const { title, metaDescription, image, localisation } = getNoticeInfo(notice);

    const obj = {
      name: title,
      created_at: notice.SCLE.length ? notice.SCLE[0] : "",
      artform: "Architecture",
      image: image,
      description: metaDescription,
      contentLocation: localisation,
      creator: notice.AUTR,
      artMedium: notice.MATR.join(", ")
    };
    return (
      <Layout>
        <div className="notice">
          <Container>
            <Head>
              <title>{title}</title>
              <meta content={metaDescription} name="description" />
              <script type="application/ld+json">{schema(obj)}</script>
              {image ? <meta property="og:image" content={image} /> : <meta />}
            </Head>
            <h1 className="heading">{notice.TICO}</h1>
            <Row>
              <Col md="8">
                <div className="notice-details">
                  <Title
                    content="Désignation"
                    notice={notice}
                    fields={["DENO", "PDEN", "NART", "APPL", "TICO"]}
                  />
                  <Field title={mapping.palissy.DENO.label} content={notice.DENO} />
                  <Field title={mapping.palissy.PDEN.label} content={notice.PDEN} />
                  <Field title={mapping.palissy.NART.label} content={notice.NART} />
                  <Field title={mapping.palissy.APPL.label} content={notice.APPL} />
                  <Field title={mapping.palissy.TICO.label} content={notice.TICO} />
                  <Title
                    content="Localisation"
                    notice={notice}
                    fields={[
                      "REG",
                      "DPT",
                      "COM",
                      "INSEE",
                      "PLOC",
                      "AIRE",
                      "CANT",
                      "LIEU",
                      "ADRS",
                      "EDIF",
                      "REFA",
                      "IMPL",
                      "EMPL",
                      "DEPL",
                      "VOLS"
                    ]}
                  />
                  <Field title={mapping.palissy.REG.label} content={notice.REG} />
                  <Field title={mapping.palissy.DPT.label} content={notice.DPT} />
                  <Field title={mapping.palissy.COM.label} content={notice.COM} />
                  <Field title={mapping.palissy.INSEE.label} content={notice.INSEE} />
                  <Field title={mapping.palissy.PLOC.label} content={notice.PLOC} />
                  <Field title={mapping.palissy.AIRE.label} content={notice.AIRE} />
                  <Field title={mapping.palissy.CANT.label} content={notice.CANT} />
                  <Field title={mapping.palissy.LIEU.label} content={notice.LIEU} />
                  <Field title={mapping.palissy.ADRS.label} content={notice.ADRS} />
                  <Field title={mapping.palissy.EDIF.label} content={notice.EDIF} />
                  <Field title={mapping.palissy.REFA.label} content={notice.REFA} />
                  <Field title={mapping.palissy.IMPL.label} content={notice.IMPL} />
                  <Field title={mapping.palissy.EMPL.label} content={notice.EMPL} />
                  <Field title={mapping.palissy.DEPL.label} content={notice.DEPL} />
                  <Field title={mapping.palissy.VOLS.label} content={notice.VOLS} />

                  <Title
                    content="Description"
                    notice={notice}
                    fields={[
                      "CATE",
                      "STRU",
                      "MATR",
                      "DESC",
                      "REPR",
                      "PREP",
                      "DIMS",
                      "PDIM",
                      "ETAT",
                      "PETA",
                      "INSC",
                      "PINS"
                    ]}
                  />
                  <Field title={mapping.palissy.CATE.label} content={notice.CATE} />
                  <Field title={mapping.palissy.STRU.label} content={notice.STRU} />
                  <Field title={mapping.palissy.MATR.label} content={notice.MATR} />
                  <Field title={mapping.palissy.DESC.label} content={notice.DESC} separator="£" />
                  <Field title={mapping.palissy.REPR.label} content={notice.REPR} separator="£" />
                  <Field title={mapping.palissy.PREP.label} content={notice.PREP} />
                  <Field title={mapping.palissy.DIMS.label} content={notice.DIMS} separator="£" />
                  <Field title={mapping.palissy.PDIM.label} content={notice.PDIM} />
                  <Field title={mapping.palissy.ETAT.label} content={notice.ETAT} />
                  <Field title={mapping.palissy.PETA.label} content={notice.PETA} />
                  <Field title={mapping.palissy.INSC.label} content={notice.INSC} />
                  <Field title={mapping.palissy.PINS.label} content={notice.PINS} />
                  <Title
                    content="Historique"
                    notice={notice}
                    fields={[
                      "AUTR",
                      "AFIG",
                      "ATEL",
                      "REFM",
                      "PERS",
                      "EXEC",
                      "ORIG",
                      "STAD",
                      "SCLE",
                      "DATE",
                      "JDAT",
                      "HIST"
                    ]}
                  />
                  <Field title={mapping.palissy.AUTR.label} content={this.authors()} />
                  <Field title={mapping.palissy.AFIG.label} content={notice.AFIG} />
                  <Field title={mapping.palissy.ATEL.label} content={notice.ATEL} />
                  <Field title={mapping.palissy.REFM.label} content={notice.REFM} />
                  <Field title={mapping.palissy.PERS.label} content={notice.PERS} separator="£" />
                  <Field title={mapping.palissy.EXEC.label} content={notice.EXEC} />
                  <Field title={mapping.palissy.ORIG.label} content={notice.ORIG} />
                  <Field title={mapping.palissy.STAD.label} content={notice.STAD} />

                  <Field title={mapping.palissy.SCLE.label} content={notice.SCLE} />
                  <Field title={mapping.palissy.DATE.label} content={notice.DATE} />
                  <Field title={mapping.palissy.JDAT.label} content={notice.JDAT} />
                  <Field title={mapping.palissy.HIST.label} content={notice.HIST} separator="£" />
                  <Title
                    content="Statut juridique et protection"
                    notice={notice}
                    fields={[
                      "STAT",
                      "PROT",
                      "DPRO",
                      "PPRO",
                      "NUMA",
                      "NINV",
                      "OBS",
                      "INTE",
                      "PINT",
                      "ACQU",
                      "EXPO",
                      "BIBL",
                      "SOUR",
                      "PHOTO"
                    ]}
                  />
                  <Field title={mapping.palissy.STAT.label} content={notice.STAT} />
                  <Field title={mapping.palissy.PROT.label} content={notice.PROT} />
                  <Field title={mapping.palissy.DPRO.label} content={notice.DPRO} />
                  <Field title={mapping.palissy.PPRO.label} content={notice.PPRO} />
                  <Field title={mapping.palissy.NUMA.label} content={notice.NUMA} />
                  <Field title={mapping.palissy.NINV.label} content={notice.NINV} />

                  <Field title={mapping.palissy.OBS.label} content={notice.OBS} />
                  <Field title={mapping.palissy.INTE.label} content={notice.INTE} />
                  <Field title={mapping.palissy.PINT.label} content={notice.PINT} />
                  <Field title={mapping.palissy.ACQU.label} content={notice.ACQU} />
                  <Field title={mapping.palissy.EXPO.label} content={notice.EXPO} />
                  <Field title={mapping.palissy.BIBL.label} content={notice.BIBL} />
                  <Field title={mapping.palissy.SOUR.label} content={notice.SOUR} />
                  <Field title={mapping.palissy.PHOTO.label} content={notice.PHOTO} />

                  <Title
                    content="Références documentaires"
                    notice={notice}
                    fields={[
                      "ETUD",
                      "DOSS",
                      "PART",
                      "REFP",
                      "PARN",
                      "PAPP",
                      "REFE",
                      "DENQ",
                      "DBOR",
                      "RENP",
                      "DOSADRS",
                      "IMAGE",
                      "WEB"
                    ]}
                  />
                  <Field title={mapping.palissy.ETUD.label} content={notice.ETUD} />
                  <Field title={mapping.palissy.DOSS.label} content={notice.DOSS} />
                  <Field title={mapping.palissy.PART.label} content={notice.PART} />
                  <Field title={mapping.palissy.REFP.label} content={notice.REFP} />
                  <Field title={mapping.palissy.PARN.label} content={notice.PARN} />
                  <Field title={mapping.palissy.PAPP.label} content={notice.PAPP} />
                  <Field title={mapping.palissy.REFE.label} content={notice.REFE} />
                  <Field title={mapping.palissy.DENQ.label} content={notice.DENQ} />
                  <Field title={mapping.palissy.DBOR.label} content={notice.DBOR} />
                  <Field title={mapping.palissy.RENP.label} content={notice.RENP} />

                  <Field
                    title={mapping.palissy.DOSADRS.label}
                    content={notice.DOSADRS}
                    separator="£"
                  />
                  <Field title={mapping.palissy.IMAGE.label} content={notice.IMAGE} />
                  <Field title={mapping.palissy.WEB.label} content={notice.WEB} />
                </div>
              </Col>
              <Col md="4">
                {this.fieldImage(notice)}
                <LinkedNotices links={this.props.links} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.palissy.REF.label} content={notice.REF} />
                    <Field title={mapping.palissy.BASE.label} content={notice.BASE} />
                    <Field title={mapping.palissy.DMIS.label} content={notice.DMIS} />
                    <Field title={mapping.palissy.DMAJ.label} content={notice.DMAJ} />
                    <Field title={mapping.palissy.NOMS.label} content={notice.NOMS} />
                    <Field title={mapping.palissy.AUTP.label} content={notice.AUTP} />
                    <Field title={mapping.palissy.COPY.label} content={notice.COPY} />
                  </div>
                  <ContactUs contact={notice.CONTACT} REF={notice.REF} base="palissy" />
                </div>
                <SeeMore notice={notice} />
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

const SeeMore = ({ notice }) => {
  const arr = [];

  if (notice.DOSURL) {
    arr.push(
      <Field
        title={mapping.palissy.DOSURL.label}
        content={<a href={notice.DOSURL}>Télécharger</a>}
        key="notice.DOSURL"
      />
    );
  }

  if (notice.DOSURLPDF) {
    arr.push(
      <Field
        title={mapping.palissy.DOSURLPDF.label}
        content={<a href={postFixedLink(notice.DOSURLPDF)}>Télécharger</a>}
        key="notice.DOSURLPDF"
      />
    );
  }

  if (notice.LIENS && notice.LIENS.length) {
    for (let i = 0; i < notice.LIENS.length; i++) {
      arr.push(
        <Field
          title={mapping.palissy.LIENS.label}
          content={<a href={notice.LIENS[i]}>{notice.LIENS[i]}</a>}
          key={`notice.LIENS${i}`}
        />
      );
    }
  }

  if (notice.LMDP) {
    arr.push(
      <Field
        title={mapping.palissy.LMDP.label}
        content={
          <a href="http://www.mediatheque-patrimoine.culture.gouv.fr/pages/bases/mediathek_cible.html">
            Voir les archives conservées à la Médiathèque de l'architecture et du patrimoine
          </a>
        }
        key="mediathek_cible"
      />
    );
  }

  if (!arr.length) {
    return null;
  }

  return (
    <div className="sidebar-section info">
      <h2>Voir aussi</h2>
      {arr}
    </div>
  );
};
