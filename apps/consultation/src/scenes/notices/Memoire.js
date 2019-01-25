import React from "react";
import { Row, Col, Container } from "reactstrap";

import Field from "./Field";
import LinkedNotices from "./LinkedNotices";
import Title from "./Title";
import FieldImages from "./FieldImages";
import ContactUs from "./ContactUs";
import { findCollection, toFieldImages } from "./utils";

import Loader from "../../components/Loader";
import API from "../../services/api";
import NotFound from "../../components/NotFound";
import Helmet from "../../components/Helmet";

const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1);

class Memoire extends React.Component {
  state = {
    notice: null,
    links: null,
    loading: true
  };

  componentDidMount() {
    const { match } = this.props;
    this.load(match.params.ref);
  }

  componentWillReceiveProps(newProps) {
    const { match } = this.props;
    if (match && match.params.ref !== newProps.match.params.ref) {
      this.load(newProps.match.params.ref);
    }
  }

  load(ref) {
    this.setState({ loading: true });
    API.getNotice("memoire", ref).then(notice => {
      const arr = [];
      const collection = findCollection(notice.LBASE);
      if (collection) {
        arr.push(API.getNotice(collection, notice.LBASE));
      } else {
        console.log("Cant get notice of ", notice.LBASE);
      }
      Promise.all(arr).then(values => {
        const links = [];
        for (let i = 0; i < values.length; i++) {
          if (!values[i]) {
            console.log("IMPOSSIBLE DE CHARGER LA NOTICE");
          } else {
            links.push(values[i]);
          }
        }
        this.setState({ links });
      });
      this.setState({ loading: false, notice });
    });
  }

  rawTitle() {
    const notice = this.state.notice;
    return notice.TICO || notice.TITR || notice.EDIF || notice.LEG || "";
  }

  pageTitle() {
    const title = `${this.rawTitle()} - POP`;
    return capitalizeFirstLetter(title);
  }

  metaDescription = () => {
    const author = this.state.notice.AUTP;
    if (author) {
      return capitalizeFirstLetter(`${this.rawTitle()}, par ${author}`);
    }
    return capitalizeFirstLetter(this.rawTitle());
  };

  fieldImage(notice) {
    const images = toFieldImages([notice.IMG]);
    if (images.length) {
      return <FieldImages images={images} disabled name={notice.TICO} external={true} />;
    }
  }

  photographer() {
    const autp = this.state.notice.AUTP;
    return autp && <a href={`/search/list?auteur=["${autp}"]`}>{autp}</a>;
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    const notice = this.state.notice;

    if (!notice) {
      return <NotFound />;
    }

    return (
      <div className="notice">
        <Container>
          <Helmet title={this.pageTitle()} description={this.metaDescription()} />
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

                <Field title="Légende" content={notice.LEG} />
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
                <Field title="Mentions tirage" content={notice.MENTTI} />
                <Field title="Orientation du phototype" content={notice.SENS} />
                <Title
                  content="Datation et événements liés à l’image"
                  small={true}
                  notice={notice}
                  fields={["DATPV", "JDATPV", "DATOR", "PUBLI", "OBS", "OBSTI", "OBSOR"]}
                />
                <Field title="Date prise vue" content={notice.DATPV} />
                <Field title="Précision sur la date de prise de vue" content={notice.JDATPV} />
                <Field title="Date de l'original" content={notice.DATOR} />
                <Field title="Référence de publication de l’image" content={notice.PUBLI} />
                <Field title="Observations" content={notice.OBS} />
                <Field title="Observations sur le tirage" content={notice.OBSTI} />
                <Field title="Observations sur l’original" content={notice.OBSOR} />
              </div>
            </Col>
            <Col md="4">
              <LinkedNotices links={this.state.links} />
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
                <ContactUs contact={notice.CONTACT} reference={notice.REF} />
              </div>
              <SeeMore notice={notice} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const SeeMore = ({ notice }) => {
  if (!notice.LAUTP) {
    return <div />;
  }

  return (
    <div className="sidebar-section info">
      <h2>Voir aussi</h2>
      <Field
        title="Lien vers la base Autor"
        content={
          <a href="http://www.mediatheque-patrimoine.culture.gouv.fr/pages/bases/autor_cible.html">
            {notice.LAUTP}
          </a>
        }
        key="notice.LAUTP"
      />
    </div>
  );
};

export default Memoire;
