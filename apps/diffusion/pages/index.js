import Head from "next/head";
import Slider from "react-slick";
import React from "react";
import Link from "next/link";
import { Button, Input, Container, Row, Col, Card, CardTitle, CardBody } from "reactstrap";
import Router from "next/router";
import Layout from "../src/components/Layout";
import { pushSearchRoute } from "../src/services/url";
import logEvent from "../src/services/amplitude";
import TopicCard from "../src/topics/TopicCard";

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
          <div className="home-search-background">
            <div className="home-search">
              <h1>
                La plateforme POP regroupe les contenus numériques du patrimoine français afin de
                les rendre accessibles et consultables au plus grand nombre
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
          </div>
          <div className="topics-view">
            <Container>
              <h2>Les bases actuellement dans POP</h2>
              <Slider {...settings} slidesToShow={5} className="bases">
                <TopicCard
                  img="/static/topics/mdf.jpg"
                  txt={
                    <div>
                      Musées de France
                      <p>Base Joconde</p>
                    </div>
                  }
                  params={{
                    base: ["Collections des musées de France (Joconde)"]
                  }}
                />
                <TopicCard
                  img="/static/topics/mhr.jpg"
                  txt={
                    <div>
                      Patrimoine architectural
                      <p>Base Mérimée</p>
                    </div>
                  }
                  params={{
                    base: ["Patrimoine architectural (Mérimée)"]
                  }}
                />
                <TopicCard
                  img="/static/topics/memoire.jpg"
                  txt={
                    <div>
                      Photographies
                      <p>Base Mémoire</p>
                    </div>
                  }
                  params={{
                    base: ["Photographies (Mémoire)"]
                  }}
                />
                <TopicCard
                  img="/static/topics/mobilier.jpg"
                  txt={
                    <div>
                      Patrimoine mobilier
                      <p>Base Palissy</p>
                    </div>
                  }
                  params={{
                    base: ["Patrimoine mobilier (Palissy)"]
                  }}
                />
                <TopicCard
                  img="/static/topics/mnr.jpg"
                  txt={
                    <div>
                      Récupération artistique
                      <p>Base MNR Rose-Valland</p>
                    </div>
                  }
                  params={{
                    base: ["Récupération artistique (MNR Rose-Valland)"]
                  }}
                />
                <TopicCard
                  img="/static/topics/enluminures.jpg"
                  txt={
                    <div>
                      Enluminures
                      <p>Base Enluminures</p>
                    </div>
                  }
                  params={{
                    base: ["Enluminures (Enluminures)"]
                  }}
                />
              </Slider>
              <h2>A la une</h2>
              <Row className="focus">
                <Col md={6}>
                  <Link href={"/notice/merimee/PA00086250"} as={"/notice/merimee/PA00086250"}>
                    <a style={{ textDecoration: "none" }}>
                      <Card>
                        <img
                          src={"/static/topics/notredame.jpg"}
                          alt="Notre-Dame de Paris"
                          className="card-img"
                          height="220"
                        />
                        <CardBody>
                          <CardTitle>Notre-Dame de Paris</CardTitle>
                        </CardBody>
                      </Card>
                    </a>
                  </Link>
                </Col>
                <Col md={6}>
                  L'île de la Cité est occupée depuis le 4ème siècle par un ensemble épiscopal (deux
                  basiliques, un baptistère, et la résidence de l'évêque). Au 12ème siècle, l'évêque
                  Maurice de Sully recompose l'ensemble et construit une cathédrale plus grande avec
                  dégagement d'un parvis à l'ouest. Les travaux commencent en 1160 par le choeur. La
                  cathédrale mesure 127 mètres de long, 40 mètres de large et 33 mètres de haut.
                  Elle se compose d'une nef de cinq vaisseaux, d'un transept non saillant et d'un
                  choeur à double déambulatoire. L'agrandissement des fenêtres hautes fait
                  disparaître les rosaces des combles des tribunes. Début de la construction des
                  tours en 1210. Construction des chapelles du milieu du 13e au début du 14ème
                  siècle. Au 18ème siècle, Soufflot fait détruire le trumeau et une partie du tympan
                  de la porte centrale de la façade occidentale pour faciliter les processions. Au
                  19ème siècle Viollet-le-Duc et Lassus entâment les travaux de restauration.
                  <br />
                  <br />
                  <div
                    style={{
                      textAlign: "right"
                    }}
                  >
                    Source : Mérimée, notice{" "}
                    <Link href={`/notice/merimee/PA00086250`}>
                      <a className="">PA00086250</a>
                    </Link>
                  </div>
                  <br /> <br />
                  <Link
                    href={`/search/mosaic?image=%5B%22oui%22%5D&mainSearch=%22%5C%22cath%C3%A9drale%20Notre-Dame%5C%22%20Paris%22`}
                  >
                    <a className="">Voir l'ensemble des ressources POP sur Notre-Dame</a>
                  </Link>
                </Col>
              </Row>
              <h2>Accès thématiques</h2>
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
          .home .home-search-background {
            background: rgba(0, 0, 0, 0.65) url("/static/background.png");
            background-repeat: no-repeat;
            background-size: cover;
            padding-top: 70px;
            padding-bottom: 70px;
          }
          .home .home-search {
            max-width: 880px;
            margin: 0 auto;
            padding: 10px 15px;
            text-align: center;
            background-color: #e5edefcf;
            border-radius: 5px;
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
            color: #e5edef;
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

          .bases .card-img {
            height: 150px !important;
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
          .focus {
            border-style: solid;
            border-width: 1px;
            padding: 20px;
            margin: 0px;
            border-color: #377d87;
            border-radius: 5px;
          }

          .focus .card-title {
            font-weight: 700;
            padding-top: 10px;
            text-align: center;
            font-size: 18px;
            color: #025d59;
          }

          .focus .card {
            transition: 0.3s;
            padding: 20px;
          }

          .focus .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          }

          .focus .card-img {
            height: 400px !important;
            object-fit: contain;
          }
          .topics-view h2 {
            margin-top: 20px;
            color: #19414c;
            font-weight: 600;
            font-size: 21px;
            margin-bottom: 20px;
            margin-bottom: 20px;
          }
          .topics-view h3 {
            margin-top: 20px;
            color: #19414c;
            font-weight: 600;
            font-size: 17px;
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
