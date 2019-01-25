import React from "react";
import { Row, Col, Container } from "reactstrap";
import LinkedNotices from "./LinkedNotices";

import Field from "./Field";
import Title from "./Title";
import FieldImages from "./FieldImages";
import ContactUs from "./ContactUs";
import Map from "./Map";
import { schema, toFieldImages, hasCoordinates } from "./utils";

import API from "../../services/api";
import Loader from "../../components/Loader";
import Helmet from "../../components/Helmet";
import NotFound from "../../components/NotFound";

class Joconde extends React.Component {
  state = {
    notice: null,
    loading: true,
    links: []
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
    API.getNotice("joconde", ref).then(notice => {
      this.setState({
        loading: false,
        notice
      });
    });
  }

  getMetaDescription = () => {
    const titre = this.state.notice.TICO || this.state.notice.TITR || "";
    const auteur = this.state.notice.AUTR ? this.state.notice.AUTR : "";
    if (this.state.notice.DOMN && this.state.notice.DOMN.length === 1) {
      const category = this.state.notice.DOMN[0];
      if (category.toLowerCase() === "peinture") {
        return `Découvrez ${titre}, cette ${category}, réalisée par ${auteur}. Cliquez ici !`;
      }
    }
    return `Découvrez ${titre}, par ${auteur}. Cliquez ici !`;
  };

  fieldImage(notice) {
    const images = toFieldImages(notice.IMG);
    if (images.length) {
      return (
        <FieldImages images={images} disabled name={notice.TICO || notice.TITR} external={false} />
      );
    }
  }

  // Display a list of links to authors
  author() {
    const author = this.state.notice.AUTR;
    if (!author) {
      return <div />;
    }
    // Split authors and create links to both single author and all authors.
    if (author.match(/;/)) {
      const links = author
        .split(";")
        .map(a => a.trim())
        .map(a => (
          <a href={`/search/list?auteur=${JSON.stringify([a, author])}`} key={a}>
            {a}
          </a>
        ))
        .reduce((p, c) => [p, " ; ", c]);
      return <React.Fragment>{links}</React.Fragment>;
    }
    return <a href={`/search/list?auteur=["${author}"]`}>{author}</a>;
  }

  // Display a list of links to domains
  domain() {
    const domain = this.state.notice.DOMN;
    if (!domain || !Array.isArray(domain)) {
      return <div />;
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

  period() {
    const period = this.state.notice.PERI;
    if (!period || !Array.isArray(period)) {
      return <div />;
    }
    const links = period
      .map(p => (
        <a href={`/search/list?periode=["${p}"]`} key={p}>
          {p}
        </a>
      ))
      .reduce((p, c) => [p, ", ", c]);
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
      name: notice.TITR,
      created_at: notice.PERI.length ? notice.PERI[0] : "",
      artform: notice.DOMN.length ? notice.DOMN[0] : "",
      image: notice.IMG.length
        ? `https://s3.eu-west-3.amazonaws.com/pop-phototeque/${notice.IMG[0]}`
        : "",
      description: notice.DESC,
      artMedium: notice.TECH.join(", "),
      creator: String(notice.AUTR).split(";"),
      comment: notice.COMM,
      contentLocation: notice.LOCA
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
                  content="Identification du bien culturel"
                  notice={notice}
                  fields={[
                    "INV",
                    "DOMN",
                    "DENO",
                    "APPL",
                    "TITR",
                    "AUTR",
                    "PAUT",
                    "ECOL",
                    "ATTR",
                    "PERI",
                    "MILL",
                    "EPOQ",
                    "PEOC",
                    "TECH",
                    "DIMS",
                    "INSC",
                    "PINS",
                    "ONOM",
                    "DESC",
                    "ETAT",
                    "REPR",
                    "PREP",
                    "DREP",
                    "SREP"
                  ]}
                />

                <Field
                  title="N°Inventaire, ancien(s) numéros(s), autres numéros, N° de dépôt"
                  content={notice.INV}
                />
                <Field title="Domaine (catégorie du bien)" content={this.domain()} />
                <Field title="Dénomination du bien" content={notice.DENO} />
                <Field title="Appellation" content={notice.APPL} />
                <Field title="Titre" content={notice.TITR} />
                <Field title="Auteur / exécutant / collecteur" content={this.author()} />
                <Field title="Précisions / auteur / exécutant / collecteur" content={notice.PAUT} />
                <Field title="Ecole" content={notice.ECOL} />
                <Field title="Anciennes attributions" content={notice.ATTR} />
                <Field title="Période de création / exécution" content={this.period()} />
                <Field title="Millésime de création / exécution" content={notice.MILL} />

                <Field title="Epoque / style / mouvement" content={notice.EPOQ} />
                <Field title="Période de l’original copié" content={notice.PEOC} />
                <Field title="Matériaux et techniques" content={notice.TECH} />
                <Field title="Mesures" content={notice.DIMS} />
                <Field title="Inscriptions" content={notice.INSC} />
                <Field title="Précisions sur les inscriptions" content={notice.PINS} />
                <Field title="Onomastique" content={notice.ONOM} />
                <Field title="Description" content={notice.DESC} />
                <Field title="Etat du bien" content={notice.ETAT} />
                <Field title="Sujet représenté" content={notice.REPR} separator="#" />
                <Field title="Précisions sur le sujet représenté" content={notice.PREP} />
                <Field title="Date de la représentation" content={notice.DREP} />
                <Field title="Source de la représentation" content={notice.SREP} />
                <Title
                  content="Contexte historique"
                  notice={notice}
                  fields={[
                    "GENE",
                    "HIST",
                    "LIEUX",
                    "PLIEUX",
                    "GEOHI",
                    "UTIL",
                    "PUTI",
                    "PERU",
                    "MILU",
                    "DECV",
                    "PDEC",
                    "NSDA"
                  ]}
                />
                <Field title="Genèse" content={notice.GENE} />
                <Field title="Historique – Objets associés" content={notice.HIST} />
                <Field
                  title="Lieu de création / d’exécution / d’utilisation"
                  content={notice.LIEUX}
                />
                <Field
                  title="Précisions sur le lieu de création / d’exécution / d’utilisation"
                  content={notice.PLIEUX}
                />
                <Field title="Géographie historique" content={notice.GEOHI} />
                <Field title="Utilisation / Destination" content={notice.UTIL} />
                <Field title="Précisions sur l’utilisation" content={notice.PUTI} />
                <Field title="Période d’utilisation" content={notice.PERU} />
                <Field title="Millésime d’utilisation" content={notice.MILU} />
                <Field title="Découverte / collecte" content={notice.DECV} />
                <Field
                  title="Précisions sur la découverte / collecte / récolte"
                  content={notice.PDEC}
                />
                <Field title="Numéro de site" content={notice.NSDA} />
                <Title
                  content="Informations juridiques"
                  notice={notice}
                  fields={["STAT", "DACQ", "APTN", "DEPO", "DDPT", "ADPT", "LOCA"]}
                />
                <Field title="Statut juridique" content={notice.STAT} />
                <Field title="Date d’acquisition" content={notice.DACQ} />
                <Field title="Ancienne appartenance" content={notice.APTN} separator="#" />
                <Field title="Dépôt / établissement dépositaire" content={notice.DEPO} />
                <Field title="Date de dépôt / changement d’affectation" content={notice.DDPT} />

                <Field title="Ancien dépôt / changement d’affectation" content={notice.ADPT} />
                <Field title="Localisation" content={notice.LOCA} />
                <Title
                  content="Informations complémentaires"
                  notice={notice}
                  fields={["COMM", "EXPO", "BIBL"]}
                />
                <Field title="Commentaires" content={notice.COMM} separator="#" />
                <Field title="Exposition" content={notice.EXPO} />
                <Field title="Bibliographie" content={notice.BIBL} separator="#" />
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
                  <Field title="Crédits photographiques" content={notice.AUTP} />
                  <Field title="Auteur de l'oeuvre ou de l'original" content={notice.AUTOR} />
                  <Field title="Droits photographiques" content={notice.PHOT} separator="#" />
                  <Field title="" content={notice.COPY} />
                </div>

                <ContactUs contact={notice.CONTACT} reference={notice.REF} />
              </div>

              <SeeMore notice={notice} />

              {hasCoordinates(notice.POP_COORDONNEES) ? <Map notice={notice} /> : <div />}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const SeeMore = ({ notice }) => {
  const arr = [];

  if (notice.LVID) {
    arr.push(<Field title="Lien Vidéo" content={notice.LVID} key="notice.LVID" />);
  }

  if (notice.WWW) {
    arr.push(
      <Field
        title="Site complémentaire"
        content={<a href={notice.WWW}>{notice.WWW}</a>}
        key="notice.WWW"
      />
    );
  }

  if (notice.MUSEO) {
    arr.push(
      <Field
        title="Fiche musée"
        content={<a href={`/museo/${notice.MUSEO}`}>{notice.MUSEO}</a>}
        key="notice.MUSEO"
      />
    );
  }

  if (!arr.length) {
    return <div />;
  }

  return (
    <div className="sidebar-section info">
      <h2>Voir aussi</h2>
      <div>{arr}</div>
    </div>
  );
};

export default Joconde;
