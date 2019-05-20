import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import logEvent from "../../src/services/amplitude";
import mapping from "../../src/services/mapping";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import LinkedNotices from "../../src/notices/LinkedNotices";
import Title from "../../src/notices/Title";
import ContactUs from "../../src/notices/ContactUs";
import FieldImages from "../../src/notices/FieldImages";
import Map from "../../src/notices/Map";
import { postFixedLink, schema, toFieldImages } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";

const pushLinkedNotices = (a, d, base) => {
  for (let i = 0; Array.isArray(d) && i < d.length; i++) {
    a.push(API.getNotice(base, d[i]));
    if (a.length > 50) break;
  }
};

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("merimee", id);
    const arr = [];

    if (notice) {
      const { RENV, REFP, REFE, REFO } = notice;
      pushLinkedNotices(arr, RENV, "merimee");
      pushLinkedNotices(arr, REFP, "merimee");
      pushLinkedNotices(arr, REFE, "merimee");
      pushLinkedNotices(arr, REFO, "palissy");
    }

    const links = (await Promise.all(arr)).filter(l => l);
    return { notice, links };
  }

  componentDidMount() {
    logEvent("notice_open", { base: "merimee", notice: this.props.notice.REF });
  }

  getMetaDescription = () => {
    const titre = this.props.notice.TICO || this.props.notice.TITR || "";
    const datation = this.props.notice.SCLE ? this.props.notice.SCLE.join(" ") : "";
    if (this.props.notice.DENO && this.props.notice.DENO.length === 1) {
      const category = this.props.notice.DENO[0];
      if (category.toLowerCase() === "église") {
        return `Découvrez ${titre}, cette ${category} du ${datation}.`;
      }
    }
    return `Découvrez ${titre}, du ${datation}.`;
  };

  fieldImage(notice) {
    const images = toFieldImages(notice.MEMOIRE);
    if (images && images.length) {
      return (
        <FieldImages
          reference={notice.REF}
          base="merimee"
          images={images}
          disabled
          name={notice.TICO || notice.TITR}
          external={false}
        />
      );
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
      .map(a => (
        <a href={`/search/list?auteur=["${a}"]`} key={a}>
          {a}
        </a>
      ))
      .reduce((p, c) => [p, " ; ", c]);
    return <React.Fragment>{links}</React.Fragment>;
  }

  render() {}

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    const notice = this.props.notice;
    const description = this.getMetaDescription();

    const obj = {
      name: notice.TICO,
      created_at: notice.SCLE && notice.SCLE.length ? notice.SCLE[0] : "",
      artform: "Architecture",
      image:
        notice.MEMOIRE && notice.MEMOIRE.length && notice.MEMOIRE[0] ? notice.MEMOIRE[0].url : "",
      description: notice.LEG,
      contentLocation: notice.LOCA,
      creator: notice.AUTR
    };
    return (
      <Layout>
        <div className="notice">
          <Container>
            <Head>
              <title>{`${notice.TICO || notice.TITR || ""} - POP`}</title>
              <meta content={description} name="description" />
              <script type="application/ld+json">{schema(obj)}</script>
              {notice.MEMOIRE && notice.MEMOIRE.length && notice.MEMOIRE[0] ? (
                <meta property="og:image" content={notice.MEMOIRE[0].url} />
              ) : (
                <meta />
              )}
            </Head>
            <h1 className="heading">{notice.TICO}</h1>

            {this.fieldImage(notice)}
            <Row>
              <Col md="8">
                <div className="notice-details">
                  <Title
                    content="Désignation"
                    notice={notice}
                    fields={["DENO", "GENR", "PDEN", "VOCA", "APPL", "ACTU", "TICO"]}
                  />
                  <Field title={mapping.merimee.DENO.label} content={notice.DENO} />
                  <Field title={mapping.merimee.GENR.label} content={notice.GENR} />
                  <Field title={mapping.merimee.PDEN.label} content={notice.PDEN} />
                  <Field title={mapping.merimee.VOCA.label} content={notice.VOCA} />
                  <Field title={mapping.merimee.APPL.label} content={notice.APPL} />
                  <Field title={mapping.merimee.ACTU.label} content={notice.ACTU} />
                  <Field title={mapping.merimee.TICO.label} content={notice.TICO} />
                  <Title
                    content="Localisation"
                    notice={notice}
                    fields={[
                      "REG",
                      "DPT",
                      "COM",
                      "PLOC",
                      "AIRE",
                      "CANT",
                      "LIEU",
                      "ADRS",
                      "CADA",
                      "IMPL",
                      "HYDR",
                      "PARN",
                      "EDIF",
                      "REFE",
                      "COLL"
                    ]}
                  />
                  <Field
                    title="Localisation"
                    content={notice.REG + " " + notice.DPT + " " + notice.COM}
                  />
                  <Field title={mapping.merimee.PLOC.label} content={notice.PLOC} />
                  <Field title={mapping.merimee.AIRE.label} content={notice.AIRE} />
                  <Field title={mapping.merimee.CANT.label} content={notice.CANT} />
                  <Field title={mapping.merimee.LIEU.label} content={notice.LIEU} />
                  <Field title={mapping.merimee.ADRS.label} content={notice.ADRS} />
                  <Field title={mapping.merimee.CADA.label} content={notice.CADA} />
                  <Field title={mapping.merimee.IMPL.label} content={notice.IMPL} />
                  <Field title={mapping.merimee.HYDR.label} content={notice.HYDR} />
                  <Field title={mapping.merimee.PARN.label} content={notice.PARN} />
                  <Field title={mapping.merimee.EDIF.label} content={notice.EDIF} />
                  <Field title={mapping.merimee.REFE.label} content={notice.REFE} />
                  <Field title={mapping.merimee.COLL.label} content={notice.COLL} />
                  <Title
                    content="Historique"
                    notice={notice}
                    fields={[
                      "SCLE",
                      "SCLD",
                      "DATE",
                      "JDAT",
                      "AUTR",
                      "REFM",
                      "JATT",
                      "PERS",
                      "REMP",
                      "DEPL",
                      "HIST"
                    ]}
                  />
                  <Field title={mapping.merimee.SCLE.label} content={notice.SCLE} />
                  <Field title={mapping.merimee.SCLD.label} content={notice.SCLD} />
                  <Field title={mapping.merimee.DATE.label} content={notice.DATE} />
                  <Field title={mapping.merimee.JDAT.label} content={notice.JDAT} />
                  <Field title={mapping.merimee.AUTR.label} content={this.authors()} />
                  <Field title={mapping.merimee.REFM.label} content={notice.REFM} />
                  <Field title={mapping.merimee.JATT.label} content={notice.JATT} />
                  <Field title={mapping.merimee.PERS.label} content={notice.PERS} separator="£" />
                  <Field title={mapping.merimee.REMP.label} content={notice.REMP} />
                  <Field title={mapping.merimee.DEPL.label} content={notice.DEPL} />
                  <Field title={mapping.merimee.HIST.label} content={notice.HIST} separator="£" />
                  <Title
                    content="Description"
                    notice={notice}
                    fields={[
                      "MURS",
                      "TOIT",
                      "PLAN",
                      "ETAG",
                      "VOUT",
                      "ELEV",
                      "COUV",
                      "ESCA",
                      "ENER",
                      "VERT",
                      "DESC",
                      "TECH",
                      "REPR",
                      "PREP",
                      "DIMS",
                      "TYPO",
                      "ETAT"
                    ]}
                  />
                  <Field title={mapping.merimee.MURS.label} content={notice.MURS} />
                  <Field title={mapping.merimee.TOIT.label} content={notice.TOIT} />
                  <Field title={mapping.merimee.PLAN.label} content={notice.PLAN} />
                  <Field title={mapping.merimee.ETAG.label} content={notice.ETAG} />
                  <Field title={mapping.merimee.VOUT.label} content={notice.VOUT} />
                  <Field title={mapping.merimee.ELEV.label} content={notice.ELEV} />
                  <Field title={mapping.merimee.COUV.label} content={notice.COUV} />
                  <Field
                    title="Emplacement, forme et structure de l’escalier"
                    content={notice.ESCA}
                  />
                  <Field title={mapping.merimee.ENER.label} content={notice.ENER} />
                  <Field title={mapping.merimee.VERT.label} content={notice.VERT} />
                  <Field title={mapping.merimee.DESC.label} content={notice.DESC} separator="£" />
                  <Field
                    title="Technique du décor des immeubles par nature"
                    content={notice.TECH}
                  />
                  <Field title={mapping.merimee.REPR.label} content={notice.REPR} />
                  <Field title={mapping.merimee.PREP.label} content={notice.PREP} />
                  <Field title={mapping.merimee.DIMS.label} content={notice.DIMS} />
                  <Field title={mapping.merimee.TYPO.label} content={notice.TYPO} />
                  <Field title={mapping.merimee.ETAT.label} content={notice.ETAT} />
                  <Title
                    content="Protection"
                    notice={notice}
                    fields={[
                      "PROT",
                      "DPRO",
                      "PPRO",
                      "APRO",
                      "MHPP",
                      "REFO",
                      "SITE",
                      "INTE",
                      "PINT",
                      "REMA",
                      "DLAB",
                      "OBS"
                    ]}
                  />
                  <Field title={mapping.merimee.PROT.label} content={notice.PROT} />
                  <Field title={mapping.merimee.DPRO.label} content={notice.DPRO} />
                  <Field title={mapping.merimee.PPRO.label} content={notice.PPRO} />
                  <Field title={mapping.merimee.APRO.label} content={notice.APRO} />
                  <Field title={mapping.merimee.MHPP.label} content={notice.MHPP} />
                  <Field
                    title="Référence aux objects conservés dans l'édifice"
                    content={notice.REFO}
                  />
                  <Field title={mapping.merimee.SITE.label} content={notice.SITE} />
                  <Field title={mapping.merimee.INTE.label} content={notice.INTE} />
                  <Field title={mapping.merimee.PINT.label} content={notice.PINT} />
                  <Field title={mapping.merimee.REMA.label} content={notice.REMA} />
                  <Field title={mapping.merimee.DLAB.label} content={notice.DLAB} />
                  <Field title={mapping.merimee.OBS.label} content={notice.OBS} />
                  <Title
                    content="Statut juridique"
                    notice={notice}
                    fields={["STAT", "PSTA", "AFFE", "PAFF", "VISI"]}
                  />
                  <Field title={mapping.merimee.STAT.label} content={notice.STAT} />
                  <Field title={mapping.merimee.PSTA.label} content={notice.PSTA} />
                  <Field title={mapping.merimee.AFFE.label} content={notice.AFFE} />
                  <Field title={mapping.merimee.PAFF.label} content={notice.PAFF} />
                  <Field title={mapping.merimee.VISI.label} content={notice.VISI} />
                  <Title
                    content="Références documentaires"
                    notice={notice}
                    fields={[
                      "DENQ",
                      "COPY",
                      "DBOR",
                      "NOMS",
                      "ETUD",
                      "DOSS",
                      "REFIM",
                      "WEB",
                      "ARCHEO",
                      "DOSADRS"
                    ]}
                  />
                  <Field title={mapping.merimee.DENQ.label} content={notice.DENQ} />
                  <Field title={mapping.merimee.COPY.label} content={notice.COPY} />
                  <Field title={mapping.merimee.DBOR.label} content={notice.DBOR} />
                  <Field
                    title="Noms des rédacteurs de la notice et du dossier"
                    content={notice.NOMS}
                  />
                  <Field title={mapping.merimee.ETUD.label} content={notice.ETUD} />
                  <Field title={mapping.merimee.DOSS.label} content={notice.DOSS} />
                  <Field title={mapping.merimee.REFIM.label} content={notice.REFIM} />
                  <Field title={mapping.merimee.WEB.label} content={notice.WEB} />
                  <Field title={mapping.merimee.ARCHEO.label} content={notice.ARCHEO} />
                  <Field
                    title={mapping.merimee.DOSADRS.label}
                    content={notice.DOSADRS}
                    separator="£"
                  />
                </div>
              </Col>
              <Col sm="4">
                <LinkedNotices links={this.props.links} />
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title={mapping.merimee.REF.label} content={notice.REF} />
                    <Field title={mapping.merimee.BASE.label} content={notice.BASE} />
                    <Field title={mapping.merimee.DMIS.label} content={notice.DMIS} />
                    <Field title={mapping.merimee.DMAJ.label} content={notice.DMAJ} />
                    <Field title={mapping.merimee.NOMS.label} content={notice.NOMS} />
                    <Field title={mapping.merimee.AUTP.label} content={notice.AUTP} />
                    <Field title={mapping.merimee.COPY.label} content={notice.COPY} />
                  </div>
                  <ContactUs contact={notice.CONTACT} REF={notice.REF} base="merimee" />
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
        title={mapping.merimee.DOSURL.label}
        content={<a href={notice.DOSURL}>Télécharger</a>}
        key="notice.DOSURL"
      />
    );
  }

  if (notice.DOSURLPDF) {
    arr.push(
      <Field
        title={mapping.merimee.DOSURLPDF.label}
        content={<a href={postFixedLink(notice.DOSURLPDF)}>Télécharger</a>}
        key="notice.DOSURLPDF"
      />
    );
  }

  if (notice.LIENS && notice.LIENS.length) {
    for (let i = 0; i < notice.LIENS.length; i++) {
      arr.push(
        <Field
          title={mapping.merimee.LIENS.label}
          content={<a href={notice.LIENS[i]}>{notice.LIENS[i]}</a>}
          key={`notice.LIENS${i}`}
        />
      );
    }
  }

  if (notice.LMDP) {
    arr.push(
      <Field
        title={mapping.merimee.LMDP.label}
        content={
          <a href="http://www.mediatheque-patrimoine.culture.gouv.fr/pages/bases/mediathek_cible.html">
            Base Mediathek
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
