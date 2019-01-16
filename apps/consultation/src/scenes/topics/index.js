import React from "react";
import TopicCard from "../../components/TopicCard";
import { Row, Col, Container } from "reactstrap";
import { bucket_url } from "../../config";
import "./index.css";

const cultureUrl = "http://www2.culture.gouv.fr/Wave/image/";
const memoireImg = uri => `${cultureUrl}memoire/${uri}`;
const jocondeImg = uri => `${bucket_url}joconde/${uri}`;

export default () => (
  <div className="topics-view">
    <Container>
      <h2>Explorer par thématique</h2>
      <h3>Photographie</h3>
      <Row>
        <Col lg="3" md="6">
          <TopicCard
            img={memoireImg("2010/sap57_u031897vj_p.jpg")}
            txt="Studio Harcourt"
            url={{
              base: ["Photographies (Mémoire)"],
              auteur: ["Harcourt (studio)"]
            }}
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img={memoireImg("1763/mhr91_20096630631nuca_p.jpg")}
            txt="Josette Clier"
            url={{
              base: ["Photographies (Mémoire)"],
              auteur: ["Clier, Josette"]
            }}
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img={memoireImg("0129/sap01_na23818917r_t.jpg")}
            txt="Atelier Nadar"
            url={{
              base: ["Photographies (Mémoire)"],
              auteur: ["Nadar (atelier)"]
            }}
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img={memoireImg("1575/mhr93_04133996za_p.jpg")}
            txt="Odile de Pierrefeu"
            url={{
              base: ["Photographies (Mémoire)"],
              auteur: ["de Pierrefeu, Odile"]
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
            url={{
              base: ["Collections des musées de France (Joconde)"],
              tech: ["peinture à l'huile"],
              peri: ["4e quart 18e siècle"]
            }}
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img={jocondeImg("06650002010/0000670.jpg")}
            txt="Les dessins d'Eugène Delacroix"
            url={{
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
            url={{
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
            url={{
              base: ["Collections des musées de France (Joconde)"],
              mainSearch: "mucha"
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
            url={{
              base: ["Collections des musées de France (Joconde)"],
              domn: ["Asie orientale", "Asie du sud-est", "Asie Orientale"]
            }}
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img={jocondeImg("00000074608/rimg0445.jpg")}
            txt="Venise"
            url={{
              base: ["Collections des musées de France (Joconde)"],
              mainSearch: "venise"
            }}
          />
        </Col>
      </Row>
    </Container>
  </div>
);
