import React from "react";
import { Row, Col, Container } from "reactstrap";
import Field from "./components/field";
import Helmet from "../../components/Helmet";
import NotFound from "../../components/NotFound";
import LinkedNotices from "./components/LinkedNotices";
import Title from "./components/title";
import Loader from "../../components/loader";
import Header from "./components/header";
import API from "../../services/api";
import { findCollection } from "./utils";
import ContactUs from "./components/ContactUs";

class Palissy extends React.Component {
  state = {
    notice: null,
    error: "",
    loading: true,
    links: null
  };

  componentDidMount() {
    this.load(this.props.match.params.ref);
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props.match &&
      this.props.match.params.ref !== newProps.match.params.ref
    ) {
      this.load(newProps.match.params.ref);
    }
  }

  load(ref) {
    this.setState({ loading: true });
    API.getNotice("palissy", ref).then(notice => {
      this.setState({ loading: false, notice });

      const { RENV, REFP, REFE, REFA, LBASE2, REF } = notice;
      // RENV -> MERIMEE
      // REFP -> MERIMEE
      // REFE -> MERIMEE
      // REFA -> MERIMEE
      // LBASE2 -> MERIMEE
      const arr = [];
      [...RENV, ...REFP, ...REFE, ...REFA, LBASE2]
        .filter(e => e && e != REF)
        .forEach(e => {
          const collection = findCollection(e);
          arr.push(API.getNotice(collection, e));
        });

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
    });
  }

  getMetaDescription = ()=> {
    const titre =  this.state.notice.TICO || this.state.notice.TITR;
    const auteur = this.state.notice.AUTR? this.state.notice.AUTR.join(' ') : '';
    if(this.state.notice.CATE && this.state.notice.CATE.length === 1) {
      const category = this.state.notice.CATE[0];
      if(category.toLowerCase() === "sculpture") {
        return `Découvrez ${titre}, cette ${category}, réalisée par ${auteur}. Cliquez ici !`;
      }
    }
    return `Découvrez ${titre}, par ${auteur}. Cliquez ici !`;
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    if (!this.state.notice) {
      return <NotFound />;
    }

    const description = this.getMetaDescription();
    return (
      <Container className="notice" fluid>
        <Helmet
            title={`${this.state.notice.TICO || this.state.notice.TITR} - POP`}
            description={description}
        />
        <Row className="top-section">
          <Col>
            <h1 className="heading">{this.state.notice.TICO}</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="9">
            <Header
              notice={this.state.notice}
              externalImages={true}
              images={this.state.notice.MEMOIRE}
            />
            <Row>
              <Col sm="12">
                <div className="notice-details">
                  <Title
                    content="Désignation"
                    notice={this.state.notice}
                    fields={["DENO", "PDEN", "NART", "APPL", "TICO"]}
                  />
                  <Field
                    title="Dénomination :"
                    content={this.state.notice.DENO}
                  />
                  <Field
                    title="Précision sur la dénomination :"
                    content={this.state.notice.PDEN}
                  />
                  <Field title="Numéro :" content={this.state.notice.NART} />
                  <Field
                    title="Appellation et titre :"
                    content={this.state.notice.APPL}
                  />
                  <Field
                    title="Titre courant :"
                    content={this.state.notice.TICO}
                  />
                  <Title
                    content="Localisation"
                    notice={this.state.notice}
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
                  <Field title="Région :" content={this.state.notice.REG} />
                  <Field
                    title="Département :"
                    content={this.state.notice.DPT}
                  />
                  <Field title="Commune :" content={this.state.notice.COM} />
                  <Field
                    title="Numéro INSEE de la commune :"
                    content={this.state.notice.INSEE}
                  />
                  <Field
                    title="Précision sur la localisation :"
                    content={this.state.notice.PLOC}
                  />
                  <Field
                    title="Aire d'étude :"
                    content={this.state.notice.AIRE}
                  />
                  <Field title="Canton :" content={this.state.notice.CANT} />
                  <Field title="Lieu-dit  :" content={this.state.notice.LIEU} />
                  <Field title="Adresse :" content={this.state.notice.ADRS} />
                  <Field
                    title="Edifice de conservation :"
                    content={this.state.notice.EDIF}
                  />
                  <Field
                    title="Référence de l'édifice de conservation :"
                    content={this.state.notice.REFA}
                  />
                  <Field
                    title="Milieu d'implantation :"
                    content={this.state.notice.IMPL}
                  />
                  <Field
                    title="Emplacement de l’œuvre dans l’édifice :"
                    content={this.state.notice.EMPL}
                  />
                  <Field
                    title="Partie déplacée :"
                    content={this.state.notice.DEPL}
                  />
                  <Field title="Vols :" content={this.state.notice.VOLS} />

                  <Title
                    content="Description"
                    notice={this.state.notice}
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
                  <Field
                    title="Catégorie technique :"
                    content={this.state.notice.CATE}
                  />
                  <Field
                    title="Structure et typologie :"
                    content={this.state.notice.STRU}
                  />
                  <Field
                    title="Matériaux et techniques :"
                    content={this.state.notice.MATR}
                  />
                  <Field
                    title="Commentaire description :"
                    content={this.state.notice.DESC}
                    separator="£"
                  />
                  <Field
                    title="Représentation :"
                    content={this.state.notice.REPR}
                    separator="£"
                  />
                  <Field
                    title="Précision sur la représentation :"
                    content={this.state.notice.PREP}
                  />
                  <Field
                    title="Dimensions :"
                    content={this.state.notice.DIMS}
                    separator="£"
                  />
                  <Field
                    title="Précisions sur les dimensions :"
                    content={this.state.notice.PDIM}
                  />
                  <Field
                    title="Etat de conservation :"
                    content={this.state.notice.ETAT}
                  />
                  <Field
                    title="Précisions sur l’état de conservation :"
                    content={this.state.notice.PETA}
                  />
                  <Field
                    title="Inscriptions :"
                    content={this.state.notice.INSC}
                  />
                  <Field
                    title="Précisions sur l’inscription :"
                    content={this.state.notice.PINS}
                  />
                  <Title
                    content="Historique"
                    notice={this.state.notice}
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
                  <Field
                    title="Auteurs de l'oeuvre :"
                    content={this.state.notice.AUTR}
                  />
                  <Field
                    title="Auteur de la source figurée :"
                    content={this.state.notice.AFIG}
                  />
                  <Field title="Atelier :" content={this.state.notice.ATEL} />
                  <Field
                    title="Référence auteur :"
                    content={this.state.notice.REFM}
                  />
                  <Field
                    title="Personnalitées :"
                    content={this.state.notice.PERS}
                  />
                  <Field
                    title="Lieu d’exécution :"
                    content={this.state.notice.EXEC}
                  />
                  <Field
                    title="Lieu de provenance :"
                    content={this.state.notice.ORIG}
                  />
                  <Field
                    title="Stade de création :"
                    content={this.state.notice.STAD}
                  />

                  <Field
                    title="Datation des campagnes principales de construction :"
                    content={this.state.notice.SCLE}
                  />
                  <Field
                    title="Datation en années :"
                    content={this.state.notice.DATE}
                  />
                  <Field
                    title="Justification de la datation :"
                    content={this.state.notice.JDAT}
                  />
                  <Field
                    title="Commentaire historique :"
                    content={this.state.notice.HIST}
                    separator="£"
                  />
                  <Title
                    content="Statut juridique et protection"
                    notice={this.state.notice}
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
                  <Field
                    title="Statut de la propriété :"
                    content={this.state.notice.STAT}
                  />
                  <Field
                    title="Nature de la protection MH :"
                    content={this.state.notice.PROT}
                  />
                  <Field
                    title="Date de protection :"
                    content={this.state.notice.DPRO}
                  />
                  <Field
                    title="Précisions sur la protection MH :"
                    content={this.state.notice.PPRO}
                  />
                  <Field
                    title="Numéro de l’arrêté :"
                    content={this.state.notice.NUMA}
                  />
                  <Field
                    title="Numéro d’inventaire :"
                    content={this.state.notice.NINV}
                  />

                  <Field
                    title="Observations :"
                    content={this.state.notice.OBS}
                  />
                  <Field
                    title="Intérêt de l'oeuvre :"
                    content={this.state.notice.INTE}
                  />
                  <Field
                    title="Intérêt oeuvre :"
                    content={this.state.notice.PINT}
                  />
                  <Field
                    title="Acquisition :"
                    content={this.state.notice.ACQU}
                  />
                  <Field
                    title="Exposition :"
                    content={this.state.notice.EXPO}
                  />
                  <Field
                    title="Bibliographie :"
                    content={this.state.notice.BIBL}
                  />
                  <Field title="Sources :" content={this.state.notice.SOUR} />
                  <Field
                    title="Photographies :"
                    content={this.state.notice.PHOTO}
                  />

                  <Title
                    content="Références documentaires"
                    notice={this.state.notice}
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
                  <Field
                    title="Cadre de l'étude :"
                    content={this.state.notice.ETUD}
                  />
                  <Field title="Dossier :" content={this.state.notice.DOSS} />
                  <Field
                    title="Parties constituantes :"
                    content={this.state.notice.PART}
                  />
                  <Field
                    title="Références des parties constituantes étudiées :"
                    content={this.state.notice.REFP}
                  />
                  <Field
                    title="Parties non étud :"
                    content={this.state.notice.PARN}
                  />
                  <Field
                    title="Préc. appart. :"
                    content={this.state.notice.PAPP}
                  />
                  <Field
                    title="Référence de l'édifice de conservation :"
                    content={this.state.notice.REFE}
                  />
                  <Field
                    title="Date d'enquête :"
                    content={this.state.notice.DENQ}
                  />
                  <Field
                    title="Date de rédaction de la notice :"
                    content={this.state.notice.DBOR}
                  />
                  <Field
                    title="Lexique noms propres :"
                    content={this.state.notice.RENP}
                  />

                  <Field
                    title="Dossier adresse :"
                    content={this.state.notice.DOSADRS}
                    separator="£"
                  />
                  <Field
                    title="Autres liens :"
                    content={this.state.notice.IMAGE}
                  />
                  <Field
                    title="Visite guidé :"
                    content={this.state.notice.WEB}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm="3">
            <LinkedNotices links={this.state.links} />
            <div className="sidebar-section info">
              <h4>A propos de cette notice</h4>
              <hr />
              <div>
                <Field title="Référence :" content={this.state.notice.REF} />
                <Field
                  title="Date de création :"
                  content={this.state.notice.DMIS}
                />
                <Field
                  title="Dernière mise à jour :"
                  content={this.state.notice.DMAJ}
                />
                <Field title="Rédacteur :" content={this.state.notice.NOMS} />
                <Field
                  title="Crédits photographiques : "
                  content={this.state.notice.AUTP}
                />
                <Field title="" content={this.state.notice.COPY} />
              </div>
              <ContactUs
                contact={this.state.notice.CONTACT}
                reference={this.state.notice.REF}
              />
            </div>
            <SeeMore notice={this.state.notice} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const SeeMore = ({ notice }) => {
  const arr = [];

  if (notice.DOSURL) {
    arr.push(
      <li key="notice.DOSURL">
        <a href={notice.DOSURL}>Dossier électronique</a>
      </li>
    );
  }

  if (notice.DOSURLPDF) {
    arr.push(
      <li key="notice.DOSURLPDF">
        <a href={notice.DOSURLPDF}>Dossier pdf</a>
      </li>
    );
  }

  if (notice.LIENS && notice.LIENS.length) {
    for (let i = 0; i < notice.LIENS.length; i++) {
      arr.push(
        <li key={`notice.LIENS${i}`}>
          <a href={notice.LIENS[i]}>LIENS</a>
        </li>
      );
    }
  }

  if (notice.LMDP) {
    arr.push(
      <li key={`mediathek_cible`}>
        <a href="http://www.mediatheque-patrimoine.culture.gouv.fr/pages/bases/mediathek_cible.html">
          Lien vers les archives MH (base Mediathek)
        </a>
      </li>
    );
  }

  //

  if (!arr.length) {
    return <div />;
  }

  return (
    <div className="sidebar-section info">
      <h4>Voir aussi</h4>
      <hr />
      <ul>{arr}</ul>
    </div>
  );
};

export default Palissy;
