import React from "react";
import { Row, Col, Container } from "reactstrap";

import Field from "./Field";
import LinkedNotices from "./LinkedNotices";
import Title from "./Title";
import ContactUs from "./ContactUs";
import FieldImages from "./FieldImages";

import API from "../../services/api";
import Helmet from "../../components/Helmet";
import NotFound from "../../components/NotFound";
import Loader from "../../components/Loader";

import { postFixedLink, schema, toFieldImages, findCollection } from "./utils";

class Palissy extends React.Component {
  state = {
    notice: null,
    loading: true,
    links: null
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

  getMetaDescription = () => {
    const titre = this.state.notice.TICO || this.state.notice.TITR || "";
    const auteur = this.state.notice.AUTR ? this.state.notice.AUTR.join(" ") : "";
    if (this.state.notice.CATE && this.state.notice.CATE.length === 1) {
      const category = this.state.notice.CATE[0];
      if (category.toLowerCase() === "sculpture") {
        return `Découvrez ${titre}, cette ${category}, réalisée par ${auteur}. Cliquez ici !`;
      }
    }
    return `Découvrez ${titre}, par ${auteur}. Cliquez ici !`;
  };

  fieldImage(notice) {
    const images = toFieldImages(notice.MEMOIRE);
    if (images.length) {
      return (
        <FieldImages images={images} disabled name={notice.TICO || notice.TITR} external={true} />
      );
    }
  }

  // Display a list of links to authors
  authors() {
    const authors = this.state.notice.AUTR;
    if (!authors || !Array.isArray(authors) || !authors.length) {
      return <div />;
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

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    const notice = this.state.notice;

    if (!notice) {
      return <NotFound />;
    }

    const description = this.getMetaDescription();

    const obj = {
      name: notice.TICO,
      created_at: notice.SCLE.length ? notice.SCLE[0] : "",
      artform: "Architecture",
      image: notice.MEMOIRE.length ? notice.MEMOIRE[0].url : "",
      description: notice.LEG,
      contentLocation: notice.LOCA,
      creator: notice.AUTR,
      artMedium: notice.MATR.join(", ")
    };

    return (
      <div className="notice">
        <Container>
          <Helmet
            title={`${notice.TICO || notice.TITR || ""} - POP`}
            description={description}
            schema={schema(obj)}
          />

          <h1 className="heading">{notice.TICO}</h1>

          {this.fieldImage(notice)}

          <Row>
            <Col md="8">
              <div className="notice-details">
                <Title
                  content="Désignation"
                  notice={notice}
                  fields={["DENO", "PDEN", "NART", "APPL", "TICO"]}
                />
                <Field title="Dénomination" content={notice.DENO} />
                <Field title="Précision sur la dénomination" content={notice.PDEN} />
                <Field title="Numéro" content={notice.NART} />
                <Field title="Appellation et titre" content={notice.APPL} />
                <Field title="Titre courant" content={notice.TICO} />
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
                <Field title="Région" content={notice.REG} />
                <Field title="Département" content={notice.DPT} />
                <Field title="Commune" content={notice.COM} />
                <Field title="Numéro INSEE de la commune" content={notice.INSEE} />
                <Field title="Précision sur la localisation" content={notice.PLOC} />
                <Field title="Aire d'étude" content={notice.AIRE} />
                <Field title="Canton" content={notice.CANT} />
                <Field title="Lieu-dit " content={notice.LIEU} />
                <Field title="Adresse" content={notice.ADRS} />
                <Field title="Edifice de conservation" content={notice.EDIF} />
                <Field title="Référence de l'édifice de conservation" content={notice.REFA} />
                <Field title="Milieu d'implantation" content={notice.IMPL} />
                <Field title="Emplacement de l’œuvre dans l’édifice" content={notice.EMPL} />
                <Field title="Partie déplacée" content={notice.DEPL} />
                <Field title="Vols" content={notice.VOLS} />

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
                <Field title="Catégorie technique" content={notice.CATE} />
                <Field title="Structure et typologie" content={notice.STRU} />
                <Field title="Matériaux et techniques" content={notice.MATR} />
                <Field title="Commentaire description" content={notice.DESC} separator="£" />
                <Field title="Représentation" content={notice.REPR} separator="£" />
                <Field title="Précision sur la représentation" content={notice.PREP} />
                <Field title="Dimensions" content={notice.DIMS} separator="£" />
                <Field title="Précisions sur les dimensions" content={notice.PDIM} />
                <Field title="Etat de conservation" content={notice.ETAT} />
                <Field title="Précisions sur l’état de conservation" content={notice.PETA} />
                <Field title="Inscriptions" content={notice.INSC} />
                <Field title="Précisions sur l’inscription" content={notice.PINS} />
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
                <Field title="Auteurs de l'oeuvre" content={this.authors()} />
                <Field title="Auteur de la source figurée" content={notice.AFIG} />
                <Field title="Atelier" content={notice.ATEL} />
                <Field title="Référence auteur" content={notice.REFM} />
                <Field title="Personnalitées" content={notice.PERS} separator="£" />
                <Field title="Lieu d’exécution" content={notice.EXEC} />
                <Field title="Lieu de provenance" content={notice.ORIG} />
                <Field title="Stade de création" content={notice.STAD} />

                <Field
                  title="Datation des campagnes principales de construction"
                  content={notice.SCLE}
                />
                <Field title="Datation en années" content={notice.DATE} />
                <Field title="Justification de la datation" content={notice.JDAT} />
                <Field title="Commentaire historique" content={notice.HIST} separator="£" />
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
                <Field title="Statut de la propriété" content={notice.STAT} />
                <Field title="Nature de la protection MH" content={notice.PROT} />
                <Field title="Date de protection" content={notice.DPRO} />
                <Field title="Précisions sur la protection MH" content={notice.PPRO} />
                <Field title="Numéro de l’arrêté" content={notice.NUMA} />
                <Field title="Numéro d’inventaire" content={notice.NINV} />

                <Field title="Observations" content={notice.OBS} />
                <Field title="Intérêt de l'oeuvre" content={notice.INTE} />
                <Field title="Intérêt oeuvre" content={notice.PINT} />
                <Field title="Acquisition" content={notice.ACQU} />
                <Field title="Exposition" content={notice.EXPO} />
                <Field title="Bibliographie" content={notice.BIBL} />
                <Field title="Sources" content={notice.SOUR} />
                <Field title="Photographies" content={notice.PHOTO} />

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
                <Field title="Cadre de l'étude" content={notice.ETUD} />
                <Field title="Dossier" content={notice.DOSS} />
                <Field title="Parties constituantes" content={notice.PART} />
                <Field
                  title="Références des parties constituantes étudiées"
                  content={notice.REFP}
                />
                <Field title="Parties non étud" content={notice.PARN} />
                <Field title="Préc. appart." content={notice.PAPP} />
                <Field title="Référence de l'édifice de conservation" content={notice.REFE} />
                <Field title="Date d'enquête" content={notice.DENQ} />
                <Field title="Date de rédaction de la notice" content={notice.DBOR} />
                <Field title="Lexique noms propres" content={notice.RENP} />

                <Field title="Dossier adresse" content={notice.DOSADRS} separator="£" />
                <Field title="Autres liens" content={notice.IMAGE} />
                <Field title="Visite guidé" content={notice.WEB} />
              </div>
            </Col>
            <Col md="4">
              <LinkedNotices links={this.state.links} />
              <div className="sidebar-section info">
                <h2>À propos de la notice</h2>
                <div>
                  <Field title="Référence" content={notice.REF} />
                  <Field title="Date de création" content={notice.DMIS} />
                  <Field title="Dernière mise à jour" content={notice.DMAJ} />
                  <Field title="Rédacteur" content={notice.NOMS} />
                  <Field title="Crédits photographiques" content={notice.AUTP} />
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
  const arr = [];

  if (notice.DOSURL) {
    arr.push(
      <Field
        title="Dossier électronique"
        content={<a href={notice.DOSURL}>Télécharger</a>}
        key="notice.DOSURL"
      />
    );
  }

  if (notice.DOSURLPDF) {
    arr.push(
      <Field
        title="Dossier PDF"
        content={<a href={postFixedLink(notice.DOSURLPDF)}>Télécharger</a>}
        key="notice.LVID"
      />
    );
  }

  if (notice.LIENS && notice.LIENS.length) {
    for (let i = 0; i < notice.LIENS.length; i++) {
      arr.push(
        <Field
          title="Liens"
          content={<a href={notice.LIENS[i]}>{notice.LIENS[i]}</a>}
          key={`notice.LIENS${i}`}
        />
      );
    }
  }

  if (notice.LMDP) {
    arr.push(
      <Field
        title="Lien vers les archives MH"
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
    return <div />;
  }

  return (
    <div className="sidebar-section info">
      <h2>Voir aussi</h2>
      {arr}
    </div>
  );
};

export default Palissy;
