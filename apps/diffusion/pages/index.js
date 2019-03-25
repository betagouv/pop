import Head from "next/head";
import Slider from "react-slick";
import Layout from "../src/components/Layout";
import React from "react";
import { Button, Input, Container } from "reactstrap";
import Router from "next/router";
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
        { breakpoint: 768, settings: { slidesToShow: 1 } }
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
              placeholder="Recherchez dans plus de 3 millions de documents"
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
              <h3>Photographie</h3>
              <Slider {...settings}>
                <TopicCard
                  img={memoireImg("APU031897VJ/sap57_u031897vj_p.jpg")}
                  txt="Studio Harcourt"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    auteur: ["Harcourt (studio)"]
                  }}
                />
                <TopicCard
                  img={memoireImg("AP72L002380/sap56_72l002380_p.jpg")}
                  txt="André Kertész"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    auteur: [
                      "Kertész, André",
                      "Kertész, André (1894-1985)",
                    ]
                  }}
                />
                <TopicCard
                  img={memoireImg("AP9135T000426/9135t000426.jpg")}
                  txt="Willy Ronis"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    auteur: ["Ronis, Willy (1910-2009)"]
                  }}
                />
               
                <TopicCard
                  img={memoireImg("APNADAR025736/sap01_na23702023g_t.jpg")}
                  txt="Atelier Nadar"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    auteur: ["Nadar (atelier)"]
                  }}
                />
                 <TopicCard
                  img={memoireImg("AP76L000305/sap58_76l000305_p.jpg")}
                  txt="Sam Lévin"
                  params={{
                    base: ["Photographies (Mémoire)"],
                    auteur: ["Lévin, Sam", "Studio Lévin"]
                  }}
                />
              </Slider>

              <h3>Peinture et dessin</h3>
              <Slider {...settings}>
                <TopicCard
                  img={jocondeImg("000PE000824/88ee1903.jpg")}
                  txt="Peinture à l'huile à la fin du XVIIIème siècle"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    tech: ["peinture à l'huile"],
                    periode: ["4e quart 18e siècle"]
                  }}
                />

                <TopicCard
                  img={jocondeImg("06650002010/0000670.jpg")}
                  txt="Les dessins d'Eugène Delacroix"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    domn: ["dessin"],
                    auteur: ["DELACROIX Eugène"]
                  }}
                />

                <TopicCard
                  img={jocondeImg("50410000424/94-002348.jpg")}
                  txt="Peinture sur bois de Gustave Moreau"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    tech: ["bois"],
                    auteur: ["MOREAU Gustave"]
                  }}
                />

                <TopicCard
                  img={jocondeImg("11040000242/24013-4.jpg")}
                  txt="Esquisses et affiches - Alphonse Mucha"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    mainSearch: "mucha"
                  }}
                />
              </Slider>
              <h3>Mode</h3>
              <Slider {...settings}>
                <TopicCard
                  img={memoireImg("AP9126T0130/sap51_9126t0130_p.jpg")}
                  txt="Karl Lagerfeld"
                  params={{
                    mainSearch: "Lagerfeld"
                  }}
                />

                <TopicCard
                  img={memoireImg("AP71L00735/sap53_71l00735_p.jpg")}
                  txt="Pierre Balmain"
                  params={{
                    mainSearch: "Balmain"
                  }}
                />

                <TopicCard
                  img={memoireImg("AP71L02648/sap53_71l02648_p.jpg")}
                  txt="Elsa Schiaparelli"
                  params={{
                    mainSearch: "Schiaparelli"
                  }}
                />

                <TopicCard
                  img={memoireImg("AP71L01246/sap53_71l01246_p.jpg")}
                  txt="Coco Chanel"
                  params={{
                    mainSearch: '"Coco Chanel"'
                  }}
                />
              </Slider>

              <h3>Voyages</h3>
              <Slider {...settings}>
                <TopicCard
                  img={jocondeImg("M0759001165/e05073.jpg")}
                  txt="Asie orientale"
                  params={{
                    base: ["Collections des musées de France (Joconde)"],
                    domn: ["Asie orientale", "Asie du sud-est", "Asie Orientale"]
                  }}
                />

                <TopicCard
                  img={jocondeImg("00000074608/rimg0445.jpg")}
                  txt="Venise"
                  params={{
                    mainSearch: "venise"
                  }}
                />

                <TopicCard
                  img={jocondeImg("5002E008037/atpico041160.jpg")}
                  txt="Japon"
                  params={{
                    mainSearch: "Japon",
                    image: "oui"
                  }}
                />

                <TopicCard
                  img={jocondeImg("07010003109/0001554.jpg")}
                  txt="Egypte"
                  params={{
                    mainSearch: "Egypte",
                    image: "oui"
                  }}
                />
              </Slider>
              <h3>Artistes femme</h3>
              <Slider {...settings}>
                <TopicCard
                  img={jocondeImg("000PE019139/99-002556.jpg")}
                  txt="Rosa Bonheur"
                  params={{
                    auteur: [
                      "BONHEUR Marie Rosalie, BONHEUR Rosa (dite)",
                      "BONHEUR Marie Rosalie ; BONHEUR Rosa (dite)",
                      "BONHEUR Rosa (dessinateur)"
                    ],
                    image: "oui"
                  }}
                />

                <TopicCard
                  img={jocondeImg("06770000315/0001106.jpg")}
                  txt="Marguerite Gérard"
                  params={{
                    auteur: ["GERARD Marguerite (peintre)", "GERARD Marguerite"],
                    image: "oui"
                  }}
                />

                <TopicCard
                  img={jocondeImg("01720000823/0002031.jpg")}
                  txt="Marie Nicolas"
                  params={{
                    auteur: ["NICOLAS Marie"],
                    image: "oui"
                  }}
                />

                <TopicCard
                  img={jocondeImg("000PE002885/15-523297.jpg")}
                  txt="Élisabeth Vigée Le Brun"
                  params={{
                    auteur: ["VIGEE-LE BRUN Elisabeth Louise"],
                    image: "oui"
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
