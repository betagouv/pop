import React from "react";
import Head from "next/head";
import { Container } from "reactstrap";
import Layout from "../src/components/Layout";
// import { tag } from "./../src/services/tags";
import EAnalytics from "../src/services/eurelian";

export default class extends React.Component {

  componentDidMount() {
    /*
    tag.sendPage({
      name: `Page Suivi d'audience et vie privée`
    });
    */
    // Tracking Eurelian
    EAnalytics.initialize();
    EAnalytics.track([
      'path', `Page Suivi d'audience et vie privée`,
      'pagegroup', "Page Suivi d'audience et vie privée"
    ]);
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>Suivi d'audience et vie privée - POP</title>
          <meta
            name="description"
            content="Statistiques de la Plateforme Ouverte du Patrimoine POP."
          />
        </Head>
        <Container>
          <div className="tracking">
            <h1 style={{ color: "#19414c", fontWeight: 500, marginTop: "30px", fontSize: "28px" }}>
              Suivi d'audience et vie privée
            </h1>
            <h2>Cookies déposés et opt-out</h2>
            <p>
              Ce site dépose un petit fichier texte (un « cookie ») sur votre ordinateur lorsque
              vous le consultez. Cela nous permet de mesurer le nombre de visites et de comprendre
              quelles sont les pages les plus consultées.
            </p>
            <iframe
              src="https://stats.data.gouv.fr/index.php?module=CoreAdminHome&amp;action=optOut&amp;language=fr"
              style={{ borderWidth: "0px", overflow: "hidden", width: "100%" }}
            />
            <h2>Ce site n’affiche pas de bannière de consentement aux cookies, pourquoi&nbsp;?</h2>
            <p>
              C’est vrai, vous n’avez pas eu à cliquer sur un bloc qui recouvre la moitié de la page
              pour dire que vous êtes d’accord avec le dépôt de cookies — même si vous ne savez pas
              ce que ça veut dire ! Rien d’exceptionnel, pas de passe-droit lié à un{" "}
              <code>.gouv.fr</code>. Nous respectons simplement la loi, qui dit que certains outils
              de suivi d’audience, correctement configurés pour respecter la vie privée, sont
              exemptés d’autorisation préalable. Nous utilisons pour cela{" "}
              <a href="https://matomo.org/">Matomo</a>, un outil{" "}
              <a href="https://matomo.org/free-software/">libre</a>, paramétré pour être en
              conformité avec la{" "}
              <a href="https://www.cnil.fr/fr/solutions-pour-la-mesure-daudience">
                recommandation « Cookies »
              </a>{" "}
              de la <abbr title="Commission Nationale de l'Informatique et des Libertés">CNIL</abbr>
              . Cela signifie que votre adresse IP, par exemple, est anonymisée avant d’être
              enregistrée. Il est donc impossible d’associer vos visites sur ce site à votre
              personne.
            </p>

            <h2>Je contribue à enrichir vos données, puis-je y accéder ?</h2>
            <p>
              Bien sûr ! Les statistiques d’usage de la majorité de nos produits, dont beta.gouv.fr,
              sont disponibles en accès libre sur{" "}
              <a href="https://stats.data.gouv.fr/index.php?module=CoreHome&action=index&idSite=63&period=range&date=previous30&updated=1#?idSite=63&period=range&date=previous30&category=Dashboard_Dashboard&subcategory=1">
                <code>stats.data.gouv.fr</code>
              </a>{"."}
            </p>
            <em>
              Cette page est largement inspirée par{" "}
              <a href="https://beta.gouv.fr/suivi/">celle-ci</a>.
            </em>
          </div>
        </Container>
        <style jsx>{`
          .tracking {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            padding: 15px;
            margin: 50px auto;
            max-width: 800px;
            padding-bottom: 60px;
          }
          .tracking h2 {
            margin-top: 30px;
            font-size: 22px;
          }
        `}</style>
      </Layout>
    );
  }
}
