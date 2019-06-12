import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
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
import { toFieldImages, schema } from "../../src/notices/utils";
import { findCollection } from "../../src/notices/utils";
import noticeStyle from "../../src/notices/NoticeStyle";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("memoire", id);
    const collection = notice && findCollection(notice.LBASE);
    let links = [];
    if (collection) {
      const values = await API.getNotice(collection, notice.LBASE);
      links = values.filter(v => v);
    }
    return { notice, links };
  }

  fieldImage(notice) {
    const images = toFieldImages([notice.IMG]);
    if (images.length) {
      return (
        <FieldImages
          reference={notice.REF}
          base="memoire"
          images={images}
          disabled
          name={notice.TICO}
          external={true}
        />
      );
    }
  }

  photographer() {
    const autp = this.props.notice.AUTP;
    return autp && <a href={`/search/list?auteur=["${autp}"]`}>{autp}</a>;
  }

  serie() {
    const serie = this.props.notice.SERIE;
    return serie && <a href={`/search/list?serie=["${serie}"]`}>{serie}</a>;
  }

  publi() {
    const publi = this.props.notice.PUBLI;
    return publi && <a href={`/search/list?publi=["${publi}"]`}>{publi}</a>;
  }

  expo() {
    const expo = this.props.notice.EXPO;
    return expo && <a href={`/search/list?expo=["${expo}"]`}>{expo}</a>;
  }

  render() {
    if (!this.props.notice) {
      return throw404();
    }
    const { notice } = this.props;

    const { title, image, metaDescription } = getNoticeInfo(notice);
    const obj = {
      name: title,
      created_at: notice.DATPV || notice.DMIS,
      artform: "Photograph",
      image: image,
      description: metaDescription,
      contentLocation: notice.LOCA,
      creator: [notice.AUTP]
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
            <h1 className="heading">{title}</h1>
            <Row>
              <Col md="8">
                <div className="notice-details">
                  <Title
                    content="1. Sujet de la photographie"
                    notice={notice}
                    fields={[
                      "LOCA",
                      "INSEE",
                      "ADRESSE",
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
                    fields={["LOCA", "INSEE", "ADRESSE", "MCGEO"]}
                  />
                  <Field title={mapping.memoire.LOCA.label} content={notice.LOCA} />
                  <Field title={mapping.memoire.INSEE.label} content={notice.INSEE} />
                  <Field title={mapping.memoire.ADRESSE.label} content={notice.ADRESSE} />
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
                  <Field title={mapping.memoire.AUTOEU.label} content={notice.AUTOEU} />
                  <Field title={mapping.memoire.SCLE.label} content={notice.SCLE} />
                  <Field title={mapping.memoire.DATOEU.label} content={notice.DATOEU} />
                  <Field title={mapping.memoire.LIEUORIG.label} content={notice.LIEUORIG} />
                  <Field title={mapping.memoire.SERIE.label} content={this.serie()} />
                  <Field title={"Mots-clés"} content={notice.MCL + " " + notice.SUJET} />
                  <Field title={mapping.memoire.MCPER.label} content={notice.MCPER} />
                  <Title
                    content="Références des documents reproduits"
                    small={true}
                    notice={notice}
                    fields={["AUTOR", "TIREDE", "LIEUCOR", "COTECOR", "AUTG"]}
                  />
                  <Field title={mapping.memoire.AUTOR.label} content={notice.AUTOR} />
                  <Field title={mapping.memoire.TIREDE.label} content={notice.TIREDE} />
                  <Field title={mapping.memoire.LIEUCOR.label} content={notice.LIEUCOR} />
                  <Field title={mapping.memoire.COTECOR.label} content={notice.COTECOR} />
                  <Field title={mapping.memoire.AUTG.label} content={notice.AUTG} />
                </div>
                <div className="notice-details">
                  <Title content="2. Auteur" notice={notice} fields={["AUTP", "AUTTI"]} />
                  <Field title={"Photographe ou dessinateur"} content={this.photographer()} />
                  <Field title={mapping.memoire.AUTTI.label} content={notice.AUTTI} />
                </div>
                <div className="notice-details">
                  <Title
                    content="3. Description de la photographie"
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
                      "NUMG",
                      "NUMOR",
                      "ANUMOR",
                      "RENV",
                      "LIEUCTI",
                      "COTECTI",
                      "PRECOR",
                      "ACQU",
                      "DIFF",
                      "ECH",
                      "TECH",
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
                      "NUMG",
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
                  <Field title={mapping.memoire.NUMG.label} content={notice.NUMG} />
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
                      "TECH",
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
                  <Field title={mapping.memoire.TECH.label} content={notice.TECH} />
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
                  <Field title={mapping.memoire.PUBLI.label} content={this.publi()} separator="#" />
                  <Field title={mapping.memoire.OBS.label} content={notice.OBS} />
                  <Field title={mapping.memoire.OBSTI.label} content={notice.OBSTI} />
                  <Field title={mapping.memoire.OBSOR.label} content={notice.OBSOR} />
                </div>
              </Col>
              <Col md="4">
                {this.fieldImage(notice)}
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
                <SeeMore notice={notice} />
              </Col>
            </Row>
          </Container>
        </div>
        <style jsx>{noticeStyle}</style>
      </Layout>
    );
  }
}

function url(ref) {
  switch (ref.substring(0, 2)) {
    case "EA":
    case "PA":
    case "IA":
      return `/notice/merimee/${ref}`;
    case "IM":
    case "PM":
      return `/notice/palissy/${ref}`;
  }
}

function link(data) {
  return (
    <React.Fragment>
      {data.map(d => {
        return (
          <React.Fragment key={d}>
            <a href={url(d) || "#"}>{d}</a>
            <br />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

const SeeMore = ({ notice }) => {
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
            href={`http://www2.culture.gouv.fr/public/mistral/autor_fr?ACTION=CHERCHER&FIELD_98=REF&VALUE_98=${
              notice.LAUTP
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
      <Field title={mapping.memoire.LBASE.label} content={link(notice.LBASE)} key="notice.LBASE" />
    );
  }

  return (
    <div className="sidebar-section info">
      <h2>Voir aussi</h2>
      {elements}
    </div>
  );
};
