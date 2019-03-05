import React from "react";
import { Row, Col, Container } from "reactstrap";
import Field from "./Field";
import Title from "./Title";
import amplitudeService from "../services/amplitude";
import FieldImages from "./FieldImages";
import ContactUs from "./ContactUs";
import Map from "./Map";
import { schema, toFieldImages } from "./utils";
import Head from "next/head";
import "./Notice.css";

class Enluminures extends React.Component {
  componentDidMount() {
    amplitudeService.logEvent("notice_open", { base: "enluminures", notice: this.props.notice.REF });
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

    const description = this.getMetaDescription();
    const obj = {
      name: notice.TITR,
      created_at: notice.DATEDEB,
      artform: notice.NOMENC.length ? notice.NOMENC[0] : "",
      image: notice.VIDEO.length ? notice.VIDEO[0] : "",
      description: notice.NOTES,
      artMedium: notice.TYPE.join(", "),
      creator: String(notice.ATTRIB).split(";"),
      comment: notice.NOTEDEC,
      contentLocation: notice.ORIGG
    };
    return (
      <div className="notice">
        <Container>
          <Head>
            <title>{notice.TITR} - {notice.SUJET} - POP`}</title>
            <meta content={description} name="description" />
            <script type="application/ld+json">{schema(obj)}</script>
          </Head>

          <h1 className="heading">{notice.TITR} - {notice.SUJET}</h1>

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
                    "TYPDEC",
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
              <Map notice={notice} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Enluminures;
