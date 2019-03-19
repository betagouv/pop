import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import API from "../../src/services/api";
import throw404 from "../../src/services/throw404";
import logEvent from "../../src/services/amplitude";
import Layout from "../../src/components/Layout";
import Field from "../../src/notices/Field";
import Title from "../../src/notices/Title";
import FieldImages from "../../src/notices/FieldImages";
import ContactUs from "../../src/notices/ContactUs";
import { schema, toFieldImages } from "../../src/notices/utils";
import "../../src/notices/Notice.css";

export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const notice = await API.getNotice("enluminures", id);
    return { notice };
  }

  componentDidMount() {
    logEvent("notice_open", { base: "enluminures", notice: this.props.notice.REF });
  }

  getMetaDescription = () => {
    const titre = this.props.notice.SUJET || this.props.notice.TITR || "";
    const auteur = this.props.notice.ATTRIB || "";
    return `Découvrez ${titre}, par ${auteur}.`;
  };

  fieldImage(notice) {
    const images = toFieldImages(notice.VIDEO);
    if (images.length) {
      return (
        <FieldImages
          reference={notice.REF}
          base="enluminures"
          images={images}
          disabled
          name={notice.TITR}
          external={true}
        />
      );
    }
  }

  render() {
    const notice = this.props.notice;

    if (!notice) {
      return throw404();
    }

    const description = this.getMetaDescription();
    const obj = {
      name: notice.TITR,
      created_at: notice.DATEDEB,
      artform: Array.isArray(notice.NOMENC) && notice.NOMENC[0] ? notice.NOMENC[0] : "",
      image: Array.isArray(notice.VIDEO) && notice.VIDEO[0] ? notice.VIDEO[0] : "",
      description: notice.NOTES,
      artMedium: Array.isArray(notice.TYPE) ? notice.TYPE.join(", ") : notice.TYPE || "",
      creator: String(notice.ATTRIB).split(";"),
      comment: notice.NOTEDEC,
      contentLocation: notice.ORIGG
    };
    return (
      <Layout>
        <div className="notice">
          <Container>
            <Head>
              <title>
                {notice.TITR} - {notice.SUJET} - POP`}
              </title>
              <meta content={description} name="description" />
              <script type="application/ld+json">{schema(obj)}</script>
            </Head>

            <h1 className="heading">
              {notice.TITR} - {notice.SUJET}
            </h1>

            {this.fieldImage(notice)}
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
                  <Field title="Attribution" content={notice.ATTRIB} />
                  <Field title="Contexte" content={notice.CONTXT} />
                  <Field title="Datation" content={notice.DATE} />
                  <Field title="Domaine" content={notice.NOMENC} />
                  <Field title="Notes manuscrit" content={notice.NOTES} />
                  <Field title="Remarques sur le décors" content={notice.NOTDEC} />
                  <Field title="Origine géographique" content={notice.ORIGG} />
                  <Field title="Origine historique" content={notice.ORIGH} />
                  <Field title="Possesseur" content={notice.POSS} />
                  <Field title="Cote" content={notice.REFD} />
                  <Field title="Titre de l'enluminure / Sujet" content={notice.SUJET} />
                  <Field title="Titre de l'ouvrage" content={notice.TITR} />
                  <Field title="Typologie du décors" content={notice.TYPDEC} separator="/" />
                </div>
              </Col>
              <Col md="4">
                <div className="sidebar-section info">
                  <h2>À propos de la notice</h2>
                  <div>
                    <Field title="Référence" content={notice.REF} />
                    <Field title="Crédits photographiques" content={notice.DROIT} />
                    <Field title="Auteur de l'oeuvre ou de l'original" content={notice.ATTRIB} />
                    <Field title="Copyright notice" content={notice.COPY} separator=";" />
                  </div>
                  <ContactUs contact={notice.CONTACT} REF={notice.REF} base="enluminures" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
    );
  }
}
