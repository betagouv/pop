import Head from "next/head";
import Slider from "react-slick";
import React from "react";
import { Button, Input, Container } from "reactstrap";
import Router from "next/router";
import Layout from "../src/components/Layout";
import { pushSearchRoute } from "../src/services/url";
import logEvent from "../src/services/amplitude";
import TopicCard from "../src/topics/TopicCard";
import { bucket_url } from "../src/config";

const cultureUrl = "https://s3.eu-west-3.amazonaws.com/pop-phototeque/";
const memoireImg = uri => `${cultureUrl}memoire/${uri}`;
const jocondeImg = uri => `${bucket_url}joconde/${uri}`;

export default class extends React.Component {
  componentDidMount() {
    logEvent("home_open");
    Router.prefetch("/search");
  }

  constructor(props) {
    super(props);
    this.gotoSearch = this.gotoSearch.bind(this);
  }

  gotoSearch() {
    const mainSearch = document.getElementById("main-search").value;
    logEvent("home_search", { value: mainSearch });
    pushSearchRoute({ mode: "simple", view: "list", params: { mainSearch } }).then(() =>
      window.scrollTo(0, 0)
    );
  }

  render() {
    const settings = {
      speed: 500,
      slidesToShow: 4,
      lazyLoad: true,
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 2 } },
        { breakpoint: 550, settings: { slidesToShow: 1 } }
      ]
    };

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
          <div className="home-search">
            <h1>
              La plateforme POP regroupe les contenus numériques du patrimoine français afin de les
              rendre accessibles et consultables au plus grand nombre
            </h1>
            <Input
              id="main-search"
              placeholder="Recherchez parmi plus de 3 millions de documents"
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.gotoSearch();
                }
              }}
            />
            <Button onClick={this.gotoSearch}>Rechercher</Button>
          </div>
          <div className="topics-view">
            <Container>
              <h3>Parcourir</h3>
              <Slider {...settings}>
                <TopicCard
                  img="/static/topics/dessins.jpg"
                  txt="Dessins"
                  params={{
                    domn: ["dessin"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/archeo.jpg"
                  txt="Archéologie"
                  params={{
                    domn: ["archéologie"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/labelxx.jpg"
                  txt="Label Patrimoine du XXe"
                  params={{
                    domn: ["Label XXe"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/mnr_recuperation_artistique.jpg"
                  txt="Récupération artistique"
                  params={{
                    base: ["Récupération artistique (MNR Rose-Valland)"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/image_1.jpg"
                  txt="Musées de France"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/image_2.jpg"
                  txt="Photographies Memoire"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/sculpture.jpg"
                  txt="Sculpture"
                  params={{
                    domn: ["sculpture"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/viedomestique.jpg"
                  txt="Objets de vie domestique"
                  params={{
                    domn: ["vie domestique"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/estampes.jpg"
                  txt="Estampes"
                  params={{
                    domn: ["estampe"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/costumeetaccess.jpg"
                  txt="Costumes et accessoires"
                  params={{
                    domn: ["costume - accessoires du costume"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/architecture-3363159_960_720.jpg"
                  txt="Architecture"
                  params={{
                    domn: ["architecture"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/Soultzmatt_StSebastien52.JPG"
                  txt="Patrimoine mobilier"
                  params={{
                    base: ["Patrimoine mobilier (Palissy)"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/Museo_Correr_Enluminure_15ème_siècle_03032015.jpg"
                  txt="Enluminures"
                  params={{
                    base: ["Enluminures (Enluminures)"],
                    image: ["oui"]
                  }}
                />
                <TopicCard
                  img="/static/topics/mhr91_20103003086za_p.jpg"
                  txt="Patrimoine architectural"
                  params={{
                    base: ["Patrimoine architectural (Mérimée)"],
                    image: ["oui"]
                  }}
                />
              </Slider>
              <h3>Photographie</h3>
              <Slider {...settings}>
                <TopicCard
                  img="/static/topics/kertesz.jpg"
                  txt="André Kertész"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    auteur: ["Kertész, André", "Kertész, André (1894-1985)"]
                  }}
                />
                <TopicCard
                  img="/static/topics/ronis.jpg"
                  txt="Willy Ronis"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    auteur: ["Ronis, Willy (1910-2009)"]
                  }}
                />

                <TopicCard
                  img="/static/topics/nadar.jpg"
                  txt="Atelier Nadar"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    auteur: ["Nadar (atelier)"]
                  }}
                />
                <TopicCard
                  img="/static/topics/levin.jpg"
                  txt="Sam Lévin"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    auteur: ["Lévin, Sam", "Studio Lévin"]
                  }}
                />
                <TopicCard
                  img="/static/topics/harcourt.jpg"
                  txt="Studio Harcourt"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    auteur: ["Harcourt (studio)"]
                  }}
                />
              </Slider>

              <h3>Peinture et dessin</h3>
              <Slider {...settings}>
                <TopicCard
                  img="/static/topics/huile.jpg"
                  txt="Peinture à l'huile à la fin du XVIIIème siècle"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    tech: ["peinture à l'huile"],
                    periode: ["4e quart 18e siècle"]
                  }}
                />
                <TopicCard
                  img="/static/topics/delacroix.jpg"
                  txt="Les dessins d'Eugène Delacroix"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    domn: ["dessin"],
                    auteur: ["DELACROIX Eugène"]
                  }}
                />
                <TopicCard
                  img="/static/topics/moreau.jpg"
                  txt="Peinture sur bois de Gustave Moreau"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    tech: ["bois"],
                    auteur: ["MOREAU Gustave"]
                  }}
                />
                <TopicCard
                  img="/static/topics/mucha.jpg"
                  txt="Esquisses et affiches - Alphonse Mucha"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    mainSearch: "mucha"
                  }}
                />
                <TopicCard
                  img="/static/topics/maar.jpg"
                  txt="Portraits de Dora Maar par Picasso"
                  params={{
                    mainSearch: '"dora maar"'
                  }}
                />
                <TopicCard
                  img="/static/topics/toulouse-lautrec.jpg"
                  txt="Peintures de Toulouse-Lautrec"
                  params={{
                    mainSearch: '"toulouse-lautrec"',
                    domn: ["peinture"]
                  }}
                />
              </Slider>

              <h3>Mode</h3>
              <Slider {...settings}>
                <TopicCard
                  img="/static/topics/lagerfeld.jpg"
                  txt="Karl Lagerfeld"
                  params={{
                    mainSearch: "Lagerfeld"
                  }}
                />
                <TopicCard
                  img="/static/topics/balmain.jpg"
                  txt="Pierre Balmain"
                  params={{
                    mainSearch: "Balmain"
                  }}
                />
                <TopicCard
                  img="/static/topics/schiaparelli.jpg"
                  txt="Elsa Schiaparelli"
                  params={{
                    mainSearch: "Schiaparelli"
                  }}
                />
                <TopicCard
                  img="/static/topics/chanel.jpg"
                  txt="Coco Chanel"
                  params={{
                    mainSearch: '"Coco Chanel"'
                  }}
                />
              </Slider>

              <h3>Voyages</h3>
              <Slider {...settings}>
                <TopicCard
                  img="/static/topics/asie.jpg"
                  txt="Asie orientale"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    domn: ["Asie orientale", "Asie du sud-est", "Asie Orientale"]
                  }}
                />
                <TopicCard
                  img="/static/topics/venise.jpg"
                  txt="Venise"
                  params={{
                    mainSearch: "venise"
                  }}
                />
                <TopicCard
                  img="/static/topics/japon.jpg"
                  txt="Japon"
                  params={{
                    mainSearch: "Japon"
                  }}
                />
                <TopicCard
                  img="/static/topics/egypte.jpg"
                  txt="Egypte"
                  params={{
                    mainSearch: "Egypte"
                  }}
                />
                <TopicCard
                  img="/static/topics/australie.jpg"
                  txt="Australie"
                  params={{
                    mainSearch: "Australie"
                  }}
                />
                <TopicCard
                  img="/static/topics/dakar.jpg"
                  txt="Dakar"
                  params={{
                    mainSearch: "Dakar"
                  }}
                />
                <TopicCard
                  img="/static/topics/liban.jpg"
                  txt="Liban"
                  params={{
                    mainSearch: "Liban",
                    base: [
                      "Photographies (Mémoire)",
                      "Enluminures (Enluminures)",
                      "Collections des musées de France (Joconde)"
                    ]
                  }}
                />
              </Slider>

              <h3>Artistes femme</h3>
              <Slider {...settings}>
                <TopicCard
                  img="/static/topics/bonheur.jpg"
                  txt="Rosa Bonheur"
                  params={{
                    auteur: [
                      "BONHEUR Marie Rosalie, BONHEUR Rosa (dite)",
                      "BONHEUR Marie Rosalie ; BONHEUR Rosa (dite)",
                      "BONHEUR Rosa (dessinateur)"
                    ]
                  }}
                />
                <TopicCard
                  img="/static/topics/gerard.jpg"
                  txt="Marguerite Gérard"
                  params={{
                    auteur: ["GERARD Marguerite (peintre)", "GERARD Marguerite"]
                  }}
                />
                <TopicCard
                  img="/static/topics/nicolas.jpg"
                  txt="Marie Nicolas"
                  params={{
                    auteur: ["NICOLAS Marie"]
                  }}
                />
                <TopicCard
                  img="/static/topics/vigee.jpg"
                  txt="Élisabeth Vigée Le Brun"
                  params={{
                    auteur: ["VIGEE-LE BRUN Elisabeth Louise"]
                  }}
                />
                <TopicCard
                  img="/static/topics/morisot.jpg"
                  txt="Berthe Morisot"
                  params={{
                    auteur: [
                      "MANET Berthe, MORISOT Berthe (née)",
                      "MORISOT Berthe",
                      "MORISOT Berthe (dessinateur)"
                    ]
                  }}
                />
              </Slider>
            </Container>
          </div>
        </div>
        <style jsx global>{`
          .home {
            height: 100%;
          }
          .home .home-search {
            max-width: 880px;
            margin: 0 auto;
            padding: 25px 15px;
            text-align: center;
          }
          .home .home-search h1 {
            text-align: center;
            color: #19414c;
            margin-bottom: 24px;
            margin-top: 30px;
            font-weight: 400;
            font-size: 20px;
          }
          .home .home-search input::placeholder {
            color: #bbb;
          }
          .home .home-search #main-search {
            font-weight: 400;
            font-size: 18px;
            border: 0;
            border-radius: 5px;
            box-shadow: 0 2px 2px 0 rgba(215, 215, 215, 0.5);
            background-image: url(/static/search.png);
            background-repeat: no-repeat;
            background-position: 1% center;
            padding-left: 40px;
            background-size: 20px;
            color: #19414c;
          }
          .home .home-search button {
            margin-top: 20px;
            background-color: #377d87;
            border-color: #377d87;
          }
          .home .home-search button:hover {
            margin-top: 20px;
            background-color: #28565e;
            border-color: #1e4147;
          }
          @media screen and (max-width: 767px) {
            .home .home-search input::placeholder {
              font-size: 14px;
            }
          }
          .topics-view {
            display: flex;
            justify-content: start;
            align-items: "center";
            flex-direction: column;
            padding-bottom: 60px;
          }
          @media screen and (max-width: 767px) {
            .topics-view {
              margin-left: 20px;
              margin-right: 20px;
            }
          }
          .topics-view h3 {
            margin-top: 20px;
            color: #19414c;
            font-weight: 600;
            font-size: 26px;
            margin-bottom: 20px;
            margin-bottom: 20px;
          }
          .slick-next:before,
          .slick-prev:before {
            color: #377d87;
          }
        `}</style>
      </Layout>
    );
  }
}
