import React from "react";
import TopicCard from "../src/topics/TopicCard";
import { Row, Col, Container } from "reactstrap";
import { bucket_url } from "../src/config";
import Head from "next/head";
import Layout from "../src/components/Layout";
import "./topics.css";

const cultureUrl = "http://www2.culture.gouv.fr/Wave/image/";
const memoireImg = uri => `${cultureUrl}memoire/${uri}`;
const jocondeImg = uri => `${bucket_url}joconde/${uri}`;

export default () => (
  <Layout>
    <div className="topics-view">
      <Head>
        <title>Explorer par thématique - POP</title>
        <meta
          content="Recherche par thématique de la Plateforme Ouverte du Patrimoine."
          type="description"
        />
      </Head>

      <Container>
        <h2>Explorer par thématique</h2>
        <h3>Photographie</h3>
        <Row>
          <Col lg="3" md="6">
            <TopicCard
              img={memoireImg("2010/sap57_u031897vj_p.jpg")}
              txt="Studio Harcourt"
              params={{
                base: ["Photographies (Mémoire)"],
                auteur: ["Harcourt (studio)"]
              }}
            />
          </Col>
          <Col lg="3" md="6">
            <TopicCard
              img={memoireImg("/2709/sap56_72l002380_p.jpg")}
              txt="André Kertész"
              params={{
                base: ["Photographies (Mémoire)"],
                auteur: [
                  "Kertész, André",
                  "KERTESZ André (dit), KERTESZ Andor (patronyme)",
                  "Kertész, André (photographe, 1894-1985)",
                  "Kertész, André - Donation André Kertész, Ministère de la culture (France), Médiathèque de l'architecture et du patrimoine, diffusion restreinte"
                ]
              }}
            />
          </Col>
          <Col lg="3" md="6">
            <TopicCard
              img={memoireImg("1997/sap58_76l000305_p.jpg")}
              txt="Sam Lévin"
              params={{
                base: ["Photographies (Mémoire)"],
                auteur: ["Lévin, Sam", "Studio Lévin"]
              }}
            />
          </Col>
          <Col lg="3" md="6">
            <TopicCard
              img={memoireImg("0129/sap01_na23818917r_t.jpg")}
              txt="Atelier Nadar"
              params={{
                base: ["Photographies (Mémoire)"],
                auteur: ["Nadar (atelier)"]
              }}
            />
          </Col>
        </Row>

        <h3>Peinture et dessin</h3>
        <Row>
          <Col lg="3" md="6">
            <TopicCard
              img={jocondeImg("000PE000824/88ee1903.jpg")}
              txt="Peinture à l'huile à la fin du XVIIIème siècle"
              params={{
                base: ["Collections des musées de France (Joconde)"],
                tech: ["peinture à l'huile"],
                periode: ["4e quart 18e siècle"]
              }}
            />
          </Col>
          <Col lg="3" md="6">
            <TopicCard
              img={jocondeImg("06650002010/0000670.jpg")}
              txt="Les dessins d'Eugène Delacroix"
              params={{
                base: ["Collections des musées de France (Joconde)"],
                domn: ["dessin"],
                auteur: ["DELACROIX Eugène"]
              }}
            />
          </Col>
          <Col lg="3" md="6">
            <TopicCard
              img={jocondeImg("50410000424/94-002348.jpg")}
              txt="Peinture sur bois de Gustave Moreau"
              params={{
                base: ["Collections des musées de France (Joconde)"],
                tech: ["bois"],
                auteur: ["MOREAU Gustave"]
              }}
            />
          </Col>

          <Col lg="3" md="6">
            <TopicCard
              img={jocondeImg("11040000242/24013-4.jpg")}
              txt="Esquisses et affiches - Alphonse Mucha"
              params={{
                base: ["Collections des musées de France (Joconde)"],
                mainSearch: "mucha"
              }}
            />
          </Col>
        </Row>

        <h3>Mode</h3>
        <Row>
          <Col lg="3" md="6">
            <TopicCard
              img={memoireImg("1614/sap51_9126t0130_p.jpg")}
              txt="Karl Lagerfeld"
              params={{
                mainSearch: "Lagerfeld"
              }}
            />
          </Col>

          <Col lg="3" md="6">
            <TopicCard
              img={memoireImg("1286/sap53_71l00735_p.jpg")}
              txt="Pierre Balmain"
              params={{
                mainSearch: "Balmain"
              }}
            />
          </Col>
          <Col lg="3" md="6">
            <TopicCard
              img={memoireImg("1288/sap53_71l02648_p.jpg")}
              txt="Elsa Schiaparelli"
              params={{
                mainSearch: "Schiaparelli"
              }}
            />
          </Col>
          <Col lg="3" md="6">
            <TopicCard
              img={memoireImg("1287/sap53_71l01246_p.jpg")}
              txt="Coco Chanel"
              params={{
                mainSearch: "\"Coco Chanel\""
              }}
            />
          </Col>
        </Row>

        <h3>Voyages</h3>
        <Row>
          <Col lg="3" md="6">
            <TopicCard
              img={jocondeImg("M0759001165/e05073.jpg")}
              txt="Asie orientale"
              params={{
                base: ["Collections des musées de France (Joconde)"],
                domn: ["Asie orientale", "Asie du sud-est", "Asie Orientale"]
              }}
            />
          </Col>
          <Col lg="3" md="6">
            <TopicCard
              img={jocondeImg("00000074608/rimg0445.jpg")}
              txt="Venise"
              params={{
                mainSearch: "venise"
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  </Layout>
);
