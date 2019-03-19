import Head from "next/head";
import Layout from "../src/components/Layout";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import { Tooltip, Button, Input } from "reactstrap";
import Router from "next/router";
import { pushSearchRoute } from "../src/services/url";
import "./index.css";

const bases = [
  {
    name: "palissy",
    title: "Patrimoine mobilier (Palissy)",
    description: `Base de données du patrimoine mobilier français
    (hors des collections des musées) de la Préhistoire
    à nos jours. Cette base coproduite est mise à jour
    régulièrement par l’Inventaire général du patrimoine
    culturel (218 000 notices notices en 2018) à partir de
    ses études et par la Médiathèque de l’architecture
    et du patrimoine (167 000 notices) à partir des arrêtés
    et décrets de classement et partiellement encore
    de ceux d’inscription.`
  },
  {
    name: "merimee",
    title: "Patrimoine architectural (Mérimée)",
    description: `Base de données du patrimoine monumental français
    de la Préhistoire à nos jours.
    Cette base coproduite est mise à jour régulièrement
    par l’Inventaire général du patrimoine culturel
    (215 000 notices en 2018) à partir de ses études et par la
    Médiathèque de l’architecture et du patrimoine (45 000
    notices) à partir des arrêtés et décrets de classement et
    d’inscription.`
  },
  {
    name: "memoire",
    title: "Photographies (Mémoire)",
    description: `Base de données des fonds graphiques et photographiques
    illustrant le patrimoine français et des collections
    photographiques.
    Cette base coproduite est mise à jour régulièrement par
    l’Inventaire général du patrimoine culturel (570000 notices
    en 2018), la Médiathèque de l’architecture et du patrimoine
    (790 000 notices), les conservations régionales des
    Monuments historiques (160 000), les services territoriaux
    de l’architecture et du patrimoine (2 500), les services de
    l’Archéologie (122 000), les conservations des antiquités et
    objets d’art (25 000).
    Les images de la base Mémoire illustrent les notices des
    bases Mérimée et Palissy.`
  },
  {
    name: "joconde",
    title: "Collections des musées de France (Joconde)",
    description: `La base Joconde est le catalogue collectif des collections
    des musées de France, fruit d’un partenariat entre le service
    des musées de France et les musées participants. Riche de
    près de 600 000 notices, pour la plupart illustrées, cette
    base est le résultat d’une étude patiente, systématique et
    approfondie des collections exposées ou en réserves par
    les personnels scientifiques des musées qui permet de
    rendre compte de la diversité des collections françaises
    (archéologie, beaux-arts, ethnologie, histoire, sciences et
    techniques…).`
  },
  {
    name: "mnr",
    title: "Récupération artistique (MNR Rose-Valland)",
    description: `A la fin de la dernière guerre, de nombreuses œuvres
    récupérées en Allemagne ont été renvoyées en France
    parce que certains indices (archives, inscriptions, etc.)
    laissaient penser qu’elles en provenaient. La plupart
    d’entre elles ont été rapidement restituées à leurs
    propriétaires spoliés par les Nazis. D’autres furent
    vendues par les Domaines, tandis que d’autres étaient
    confiées à la garde des musées nationaux. La base MNR-
    Rose Valland répertorie les quelques 2000 œuvres d’art
    dont les propriétaires légitimes n’ont pas encore pu être
    identifiés. Ses œuvres n’appartiennent pas à l’État qui n’en
    est que détenteur provisoire. Elles ne font donc pas partie
    des collections publiques des musées de France et ces
    œuvres ne sont pas répertoriées dans la base Joconde des
    collections nationales.`
  },
  {
    name: "enluminures",
    title: "Enluminures (Enluminures)",
    description: `Coproduite par le Service du livre et de la lecture 
    et l'Institut de recherche et d'histoire des textes (CNRS), liés 
    par un programme conjoint depuis 1979, la base Enluminures propose 
    la consultation gratuite de plus de 120 000 images, sous forme de 
    vignette et de plein écran, reproductions numériques des enluminures 
    et éléments de décor de plus de 5 000 manuscrits médiévaux conservés 
    dans une centaine de bibliothèques municipales françaises.`
  }
];

export default class extends React.Component {
  componentDidMount() {
    Router.prefetch("/search");
  }
  constructor(props) {
    super(props);
    this.state = {
      selected: bases.map(b => b.title)
    };
    this.toggle = this.toggle.bind(this);
    this.gotoSearch = this.gotoSearch.bind(this);
  }

  gotoSearch() {
    const searchValue = document.getElementById("main-search").value;
    const selected = this.state.selected;

    pushSearchRoute({
      mode: "simple",
      view: "list",
      params: {
        mainSearch: searchValue,
        base: selected.length === bases.length || selected.length === 0 ? "" : selected
      }
    }).then(() => window.scrollTo(0, 0));
  }

  renderBanner() {
    const images = [
      {
        id: 1,
        text: "Anthony Quinn et Gina Lollobrigida dans Notre-Dame de Paris de Jean Delannoy.",
        author: "Voinquel, Raymond (photographe), 1956.",
        source: "Médiathèque de l'architecture et du patrimoine."
      },
      {
        id: 2,
        text: "Couples de cinéma: Brigitte Bardot et Alain Delon.",
        author: "Lévin, Sam (photographe), 1958.",
        source: "Médiathèque de l'architecture et du patrimoine, base Mémoire."
      },
      {
        id: 3,
        text: 'Cathédrale Notre-Dame, "Les poules grégoriennes".',
        author: "Abbé Thinot (photographe), avant 1914.",
        source: "Médiathèque de l'architecture et du patrimoine, base Mémoire."
      },
      {
        id: 5,
        text: "Promenade de bord de mer.",
        author: "Manuel de Rugy (photographe).",
        source: "Inventaire général - région Normandie, base Mémoire."
      },
      {
        id: 6,
        text: "Biscuiterie Jeannette. Détail de la doseuse pondérale à pesées associative.",
        author: "Manuel de Rugy (photographe).",
        source: "Inventaire général - région Normandie, base Mémoire."
      },
      {
        id: 7,
        text: "Rue du Gros Horloge et la cathédrale.",
        author: "Denis Couchaux (photographe).",
        source: "Inventaire général - région Normandie, base Mémoire."
      },
      {
        id: 8,
        text: 'Masque "cara grande" de la population Tapirapé, XXe siècle.',
        author: "Amérique du Sud.",
        source: "Museum d'histoire naturelle de Toulouse."
      }
    ].map(e => (
      <div key={e.id} className="img-item">
        {" "}
        <img
          className="image-banner"
          src={`/static/banner/${e.id}.jpg`}
          alt={`${e.text} ${e.author} ${e.source}`}
          title={`${e.text} ${e.author} ${e.source}`}
        />
      </div>
    ));
    const settings = {
      dots: false,
      infinite: true,
      autoplaySpeed: 5000,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return <Slider {...settings}>{images}</Slider>;
  }

  toggle(event) {
    const name = event.target.name;
    const selected = this.state.selected;
    if (name === "all" && selected.length === bases.length) {
      this.setState({ selected: [] });
    } else if (name === "all") {
      this.setState({ selected: bases.map(b => b.title) });
    } else if (selected.includes(name)) {
      this.setState({ selected: selected.filter(item => item !== name) });
    } else {
      this.setState({ selected: [...selected, name] });
    }
  }
  areas() {
    return bases.map(({ name, title, description }) => {
      return (
        <li key={name}>
          <label>
            <input
              type="checkbox"
              name={title}
              checked={this.state.selected.includes(title)}
              onChange={this.toggle}
            />
            <strong />
            {title}
          </label>
          <Tooltip
            placement="top"
            isOpen={this.state.tooltipOpen === name}
            target={name}
            toggle={() => {
              this.setState({
                tooltipOpen: this.state.tooltipOpen ? null : name
              });
            }}
          >
            {description}
          </Tooltip>
          <span id={name} className="info">
            i
          </span>
        </li>
      );
    });
  }

  render() {
    return (
      <Layout>
        <div className="home">
          <Head>
            <title>POP - Plateforme Ouverte du Patrimoine - Ministère de la Culture</title>
            <meta
              name="description"
              content="POP propose de faire des données patrimoniales un bien commun, en rendant accessibles et consultables plus de 3 millions de contenus numériques du patrimoine français."
            />
          </Head>
          {this.renderBanner()}
          <div className="home-search">
            <h1>
              La plateforme POP regroupe les contenus numériques du patrimoine français afin de les
              rendre accessibles et consultables au plus grand nombre
            </h1>
            <Input
              id="main-search"
              placeholder="Recherchez sur tous les champs des bases indiquées ci-dessous"
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.gotoSearch();
                }
              }}
            />
            <Button onClick={this.gotoSearch} disabled={this.state.selected.length === 0}>
              Rechercher
            </Button>
            <div className="search-areas">
              <div>
                <p>Sur quels domaines porte votre recherche ?</p>
                <ul className="list-unstyled">
                  <li>
                    <label>
                      <input
                        type="checkbox"
                        checked={this.state.selected.length === 6}
                        name="all"
                        onChange={this.toggle}
                      />
                      <strong />
                      Tous les domaines
                    </label>
                  </li>
                  {this.areas()}
                </ul>
              </div>
            </div>
            <p>
              Découvrir le patrimoine français à travers l'
              <Link prefetch href="/topics">
                <a>affichage thématique</a>
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    );
  }
}
