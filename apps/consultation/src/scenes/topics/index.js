import React from "react";
import TopicCard from "../../components/TopicCard";
import { Row, Col, Container } from "reactstrap";
import "./index.css";

export default () => (
  <div className="topics-view">
    <Container>
      <h2>Explorer par thématique</h2>
      <h3>Photographie</h3>
      <Row>
        <Col lg="3" md="6">
          <TopicCard
            img="http://www2.culture.gouv.fr/Wave/image/memoire/2010/sap57_u031897vj_p.jpg"
            txt="Studio Harcourt"
            url={
              '/search/list?base=%5B"Photographies+%28Mémoire%29"%5D&auteur=%5B"Harcourt+%28studio%29"%5D'
            }
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img="http://www2.culture.gouv.fr/Wave/image/memoire/1763/mhr91_20096630631nuca_p.jpg"
            txt="Josette Clier"
            url={
              '/search/list?base=%5B"Photographies+%28Mémoire%29"%5D&auteur=%5B"Clier%2C+Josette"%5D'
            }
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img="http://www2.culture.gouv.fr/Wave/image/memoire/0129/sap01_na23818917r_t.jpg"
            txt="Atelier Nadar"
            url={
              '/search/list?base=%5B"Photographies+%28Mémoire%29"%5D&auteur=%5B"Nadar+%28atelier%29"%5D'
            }
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img="http://www2.culture.gouv.fr/Wave/image/memoire/1575/mhr93_04133996za_p.jpg"
            txt="Odile de Pierrefeu"
            url={
              '/search/list?base=%5B"Photographies+%28Mémoire%29"%5D&auteur=%5B"de+Pierrefeu%2C+Odile"%5D'
            }
          />
        </Col>
      </Row>

      <h3>Peinture</h3>
      <Row>
        <Col lg="3" md="6">
          <TopicCard
            img="https://s3.eu-west-3.amazonaws.com/pop-phototeque-staging/joconde/000PE000824/88ee1903.jpg"
            txt="Peinture à l'huile à la fin du XVIIIème siècle"
            url={
              'search/list?base=%5B%22Collections+des+mus%C3%A9es+de+France+%28Joconde%29%22%5D&mainSearch=%22%22&tech=%5B%22peinture+%C3%A0+l%27huile%22%5D&periode=%5B%224e+quart+18e+si%C3%A8cle%22%5D&image=%5B"oui"%5D'
            }
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img="https://s3.eu-west-3.amazonaws.com/pop-phototeque-staging/joconde/M0759001165/e05073.jpg"
            txt="Collections d'Asie orientale"
            url={
              "/search/list?base=%5B%22Collections+des+mus%C3%A9es+de+France+%28Joconde%29%22%5D&mainSearch=%22%22&results=1&image=%5B%22oui%22%5D&domn=%5B%22Asie+orientale%22%2C%22Asie+du+sud-est%22%2C%22Asie+Orientale%22%5D"
            }
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img="https://s3.eu-west-3.amazonaws.com/pop-phototeque-staging/joconde/06650002010/0000670.jpg"
            txt="Les dessins d'Eugène Delacroix"
            url={
              "/search/list?base=%5B%22Collections+des+mus%C3%A9es+de+France+%28Joconde%29%22%5D&mainSearch=%22%22&results=1&auteur=%5B%22DELACROIX+Eug%C3%A8ne%22%5D"
            }
          />
        </Col>
        <Col lg="3" md="6">
          <TopicCard
            img="https://s3.eu-west-3.amazonaws.com/pop-phototeque-staging/joconde/50410000424/94-002348.jpg"
            txt="Peinture sur bois de Gustave Moreau"
            url={
              "/search/list?base=%5B%22Collections+des+mus%C3%A9es+de+France+%28Joconde%29%22%5D&mainSearch=%22%22&auteur=%5B%22MOREAU+Gustave%22%5D&tech=%5B%22bois%22%5D"
            }
          />
        </Col>
      </Row>
    </Container>
  </div>
);

// http://localhost:8080/search/list?base=%5B%22Collections+des+mus%C3%A9es+de+France+%28Joconde%29%22%5D&mainSearch=%22%22&periode=%5B%224e+quart+18e+si%C3%A8cle%22%5D&tech=%5B%22peinture+%C3%A0+l%27huile%22%5D
