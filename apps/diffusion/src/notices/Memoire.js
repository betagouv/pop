import React from "react";
import { Row, Col, Container } from "reactstrap";
import Head from "next/head";
import Field from "./Field";
import LinkedNotices from "./LinkedNotices";
import Title from "./Title";
import FieldImages from "./FieldImages";
import ContactUs from "./ContactUs";
import { toFieldImages, schema } from "./utils";

import "./Notice.css";

const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1);

class Memoire extends React.Component {
  rawTitle() {
    const notice = this.props.notice;
    return notice.TICO || notice.LEG || `${notice.EDIF || ""} ${notice.OBJ || ""}`.trim();
  }

  pageTitle() {
    const title = `${this.rawTitle()} - POP`;
    return capitalizeFirstLetter(title);
  }

  metaDescription = () => {
    const author = this.props.notice.AUTP;
    if (author) {
      return capitalizeFirstLetter(`${this.rawTitle()}, par ${author}`);
    }
    return capitalizeFirstLetter(this.rawTitle());
  };

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

  render() {
    const { notice } = this.props;
    const obj = {
      name: this.rawTitle(),
      created_at: notice.DATPV || notice.DMIS,
      artform: "Photograph",
      image: notice.IMG ? `https://s3.eu-west-3.amazonaws.com/pop-phototeque/${notice.IMG}` : "",
      description: notice.LEG,
      contentLocation: notice.LOCA,
      creator: [notice.AUTP]
    };

    return (
      <div className="notice">
        <Container>
          <Head>
            <title>{this.pageTitle()}</title>
            <meta content={this.metaDescription()} name="description" />
            <script type="application/ld+json">{schema(obj)}</script>
          </Head>
          <h1 className="heading">{this.rawTitle()}</h1>
          {this.fieldImage(notice)}
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
                <Field title="Localisation" content={notice.LOCA} />
                <Field title="Code INSEE" content={notice.INSEE} />
                <Field title="Adresse:" content={notice.ADRESSE} />
                <Field title="Nom géographique" content={notice.MCGEO} />
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
                <Field title="Nom édifice" content={notice.EDIF} />
                <Field title="Nom objet" content={notice.OBJT} />
                <Field title="Titre du dossier" content={notice.TICO} />

                <Field title="Légende" content={notice.LEG} separator="#" />
                <Field title="Titre" content={notice.TITRE} />
                <Field title="Nom de théâtre" content={notice.THEATRE} />
                <Field title="Rôle joué" content={notice.ROLE} />
                <Field title="Auteur de l’œuvre" content={notice.AUTOEU} />
                <Field title="Siècle de l’œuvre" content={notice.SCLE} />
                <Field title="Date de l’œuvre" content={notice.DATOEU} />
                <Field title="Lieu d’origine de l’élément réemployé" content={notice.LIEUORIG} />
                <Field title="Titre de la série" content={notice.SERIE} />
                <Field title="Mots-clés" content={notice.MCL + " " + notice.SUJET} />
                <Field title="Identité de la personne photographiée" content={notice.MCPER} />
                <Title
                  content="Références des documents reproduits"
                  small={true}
                  notice={notice}
                  fields={["AUTOR", "TIREDE", "LIEUCOR", "COTECOR", "AUTG"]}
                />
                <Field title="Auteur du document original" content={notice.AUTOR} />
                <Field title="Référence bibliographique ou documentaire" content={notice.TIREDE} />
                <Field title="Lieu de conservation" content={notice.LIEUCOR} />
                <Field title="Cote de conservation" content={notice.COTECOR} />
                <Field title="Auteur de la gravure" content={notice.AUTG} />
              </div>
              <div className="notice-details">
                <Title content="2. Auteur" notice={notice} fields={["AUTP", "AUTTI"]} />
                <Field title="Photographe ou dessinateur" content={this.photographer()} />
                <Field title="Auteur du tirage" content={notice.AUTTI} />
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
                <Field title="Catégorie de phototype" content={notice.TYPDOC} />

                <Field title="Numéro du phototype" content={notice.NUMI} />
                <Field title="Numéro du négatif" content={notice.NUMP} />
                <Field title="Ancien numéro du négatif" content={notice.ANUMP} />
                <Field title="Numéro donné par le photographe" content={notice.NUMAUTP} />
                <Field title="Numéro du tirage" content={notice.NUMTI} />
                <Field title="Ancien numéro du tirage" content={notice.ANUMTI} />
                <Field title="Numéro de reproduction" content={notice.REPRO} />
                <Field title="Numéro de la gravure" content={notice.NUMG} />
                <Field title="Numéro de l’original" content={notice.NUMOR} />
                <Field title="Ancien numéro de l’original" content={notice.ANUMOR} />
                <Field title="Phototype(s) en relation" content={notice.RENV} />
                <Field title="Lieu de conservation du tirage" content={notice.LIEUCTI} />
                <Field title="Cote de conservation du tirage" content={notice.COTECTI} />
                <Field
                  title="Précisions sur la conservation de l’original"
                  content={notice.PRECOR}
                />
                <Field title="Modalité d’entrée" content={notice.ACQU} />
                <Field title="Droits de diffusion" content={notice.DIFF} />
                <Field title="Échelle du graphique" content={notice.ECH} />
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
                <Field title="Description technique du négatif" content={notice.TECH} />
                <Field title="Format du négatif" content={notice.FORMAT} />
                <Field title="Description technique du tirage" content={notice.TECHTI} />
                <Field title="Format du tirage" content={notice.FORMATTI} />
                <Field title="Description technique de l’original" content={notice.TECHOR} />
                <Field title="Format de l'original" content={notice.FORMATOR} />
                <Field title="Annotations présentes sur le négatif" content={notice.MENTIONS} />
                <Field title="Mentions tirage" content={notice.MENTTI} separator="#" />
                <Field title="Orientation du phototype" content={notice.SENS} />
                <Title
                  content="Datation et événements liés à l’image"
                  small={true}
                  notice={notice}
                  fields={["DATPV", "JDATPV", "DATOR", "EXPO", "PUBLI", "OBS", "OBSTI", "OBSOR"]}
                />
                <Field title="Date prise vue" content={notice.DATPV} />
                <Field title="Précision sur la date de prise de vue" content={notice.JDATPV} />
                <Field title="Date de l'original" content={notice.DATOR} />
                <Field title="Référence d’exposition de l’image" content={notice.EXPO} />
                <Field
                  title="Référence de publication de l’image"
                  content={notice.PUBLI}
                  separator="#"
                />
                <Field title="Observations" content={notice.OBS} />
                <Field title="Observations sur le tirage" content={notice.OBSTI} />
                <Field title="Observations sur l’original" content={notice.OBSOR} />
              </div>
            </Col>
            <Col md="4">
              <LinkedNotices links={this.props.links} />
              <div className="sidebar-section info">
                <h2>À propos de la notice</h2>
                <div>
                  <Field title="Référence" content={notice.REF} />
                  <Field title="Date de création" content={notice.DMIS} />
                  <Field title="Date de modification" content={notice.DMAJ} />
                  <Field title="Crédits photographiques" content={this.photographer()} />
                  <Field title="Auteur de l'oeuvre ou de l'original" content={notice.AUTOR} />
                  <Field title="" content={notice.COPY} />
                </div>
                <ContactUs contact={notice.CONTACT} REF={notice.REF} base="memoire" />
              </div>
              <SeeMore notice={notice} />
            </Col>
          </Row>
        </Container>
      </div>
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
    <ul>
      {data.map(d => {
        return (
          <li>
            <a href={url(d) || "#"}>{d}</a>
          </li>
        );
      })}
    </ul>
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
        title="Lien vers la base Autor"
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
      <Field title="Notices associées" content={link(notice.LBASE)} key="notice.LBASE" />
    );
  }

  return (
    <div className="sidebar-section info">
      <h2>Voir aussi</h2>
      {elements}
    </div>
  );
};

export default Memoire;
