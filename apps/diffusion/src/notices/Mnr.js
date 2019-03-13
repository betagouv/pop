import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import Field from "./Field";
import ContactUs from "./ContactUs";
import FieldImages from "./FieldImages";
import amplitudeService from "../services/amplitude";
import { schema, toFieldImages } from "./utils";
import "./Notice.css";

class Mnr extends React.Component {
  componentDidMount() {
    amplitudeService.logEvent("notice_open", { base: "mnr", notice: this.props.notice.REF });
  }
  getMetaDescription = () => {
    const titre = this.props.notice.TICO || this.props.notice.TITR || "";
    const auteur = this.props.notice.AUTR ? this.props.notice.AUTR.join(" ") : "";
    if (this.props.notice.DOMN && this.props.notice.DOMN.length === 1) {
      const category = this.props.notice.DOMN[0];
      if (category.toLowerCase() === "peinture") {
        return `Découvrez ${titre}, cette ${category}, réalisée par ${auteur}.`;
      }
    }
    return `Découvrez ${titre}, par ${auteur}.`;
  };

  fieldImage(notice) {
    const images = toFieldImages(notice.VIDEO);
    if (images.length) {
      return (
        <FieldImages
          reference={notice.REF}
          base="mnr"
          images={images}
          disabled
          name={notice.TICO || notice.TITR}
          external={false}
        />
      );
    }
  }

  domain() {
    const domain = this.props.notice.DOMN;
    if (!domain || !Array.isArray(domain)) {
      return null;
    }
    const links = domain
      .map(d => (
        <a href={`/search/list?domn=["${d}"]`} key={d}>
          {d}
        </a>
      ))
      .reduce((p, c) => [p, ", ", c]);
    return <React.Fragment>{links}</React.Fragment>;
  }

  render() {
    const notice = this.props.notice;

    const description = this.getMetaDescription();
    const obj = {
      name: notice.TITR,
      created_at: notice.SCLE.length ? notice.SCLE[0] : "",
      artform: notice.DOM,
      image: notice.VIDEO.length
        ? `https://s3.eu-west-3.amazonaws.com/pop-phototeque/${notice.VIDEO[0]}`
        : "",
      description: notice.DESC,
      artMedium: notice.TECH.join(", "),
      creator: notice.AUTR,
      comment: notice.HIST,
      contentLocation: notice.LOCA
    };
    return (
      <div className="notice">
        <Container>
          <Head>
            <title>{`${notice.TICO || notice.TITR || ""} - ${
              notice.AUTR ? notice.AUTR.join(" ") : ""
            } - POP`}</title>
            <meta content={description} name="description" />
            <script type="application/ld+json">{schema(obj)}</script>
          </Head>

          <h1 className="heading">{notice.TICO || notice.TITR}</h1>
          {this.fieldImage(notice)}
          <Row>
            <Col className="image" md="8">
              <div className="notice-details">
                <Field title="N°Inventaire" content={notice.INV} join=" ; " />
                <Field
                  title="Domaine (catégorie du bien)"
                  separator="#"
                  content={this.domain()}
                  join=" ; "
                />
                <Field title="Auteur" content={notice.AUTR} separator="#" join=" ; " />
                <Field title="Precisions auteur" content={notice.PAUT} separator="#" join=" ; " />
                <Field
                  title="Anciennes attributions"
                  content={notice.ATTR}
                  join=" ; "
                  separator="#"
                />
                <Field
                  title="Ancienne attribution"
                  separator="#"
                  content={notice.AATT}
                  join=" ; "
                />
                <Field title="Ecole" content={notice.ECOL} separator="#" join=" ; " />
                <Field title="Titre" separator="#" content={notice.TITR} join=" ; " />
                <Field title="Ancien titre" separator="#" content={notice.ATIT} join=" ; " />
                <Field title="Précision titre" separator="#" content={notice.PTIT} join=" ; " />
                <Field title="Autre titre" separator="#" content={notice.AUTI} join=" ; " />
                <Field title="Dénomination" separator="#" content={notice.DENO} join=" ; " />
                <Field title="Millénaire" separator="#" content={notice.MILL} join=" ; " />
                <Field title="Siècle" separator="#" content={notice.SCLE} join=" ; " />
                <Field title="Style" separator="#" content={notice.STYL} join=" ; " />
                <Field title="Technique" separator="#" content={notice.TECH} join=" ; " />
                <Field title="Dimensions" separator="#" content={notice.DIMS} join=" ; " />
                <Field title="Description" content={notice.DESC} join=" ; " separator="#" />
                <Field title="Inscriptions" content={notice.INSC} join=" ; " separator="#" />
                <Field title="Genèse" content={notice.GENE} separator="#" join=" ; " />
                <Field title="Historique" content={notice.HIST} separator="#" join=" ; " />
                <Field title="Provenance" separator="#" content={notice.PROV} join=" ; " />
                <Field title="Commentaire" content={notice.COMM} separator="#" join=" ; " />
                <Field title="Catégorie" separator="#" content={notice.CATE} join=" ; " />
                <Field title="Observations" content={notice.OBSE} separator="#" join=" ; " />
                <Field title="Autres numéros" content={notice.NUMS} separator="#" join=" ; " />
                <Field title="Marquages" content={notice.MARQ} separator="#" join=" ; " />
                <Field title="Localisation" separator="#" content={notice.LOCA} join=" ; " />
                <Field
                  title="Etablissement affectataire qui existe dans d’autres bases"
                  content={notice.AFFE}
                  separator="#"
                  join=" ; "
                />
                <Field title="Expositions" separator="#" content={notice.EXPO} join=" ; " />
                <Field title="Bibliographie" separator="#" content={notice.BIBL} join=" ; " />
                <Field title="Notes" separator="#" content={notice.NOTE} join=" ; " />
                <Field title="Résumé" separator="#" content={notice.RESUME} join=" ; " />
                <Field
                  title="Etat de conservation"
                  separator="#"
                  content={notice.ETAT}
                  join=" ; "
                />
                <Field
                  title="OEuvres liées, ensemble"
                  separator="#"
                  content={notice.SUITE}
                  join=" ; "
                />
                <Field title="Représentation" separator="#" content={notice.REPR} join=" ; " />
                <Field
                  title="Sujet de la représentation (source littéraire ou musicale)"
                  content={notice.SREP}
                  join=" ; "
                  separator="#"
                />
                <Field
                  title="Précisions sur la représentation."
                  separator="#"
                  content={notice.PREP}
                  join=" ; "
                />
                <Field
                  title="Date de la représentation"
                  separator="#"
                  content={notice.DREP}
                  join=" ; "
                />
                <Field title="Date mise à jour" separator="#" content={notice.DMAJ} join=" ; " />

                <Field
                  title="Droits de copie photo"
                  content={notice.PHOT}
                  separator="#"
                  join=" ; "
                />
              </div>
            </Col>
            <Col md="4">
              <div className="sidebar-section info">
                <h2>À propos de la notice</h2>
                <div>
                  <Field title="Référence" content={notice.REF} />
                  <Field title="Dernière mise à jour" content={notice.DMAJ} />
                  <Field title="Rédacteur" separator="#" content={notice.NOMS} join=" ; " />
                  <Field
                    title="Crédits photographiques"
                    separator="#"
                    content={notice.AUTP}
                    join=" ; "
                  />
                </div>
                <ContactUs
                  contact={notice.CONTACT || "francoise.gaborit@culture.gouv.fr"}
                  REF={notice.REF}
                  base="mnr"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Mnr;
