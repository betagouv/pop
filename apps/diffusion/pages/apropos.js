import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Container } from "reactstrap";
import Layout from "../src/components/Layout";
// import { tag } from "./../src/services/tags";
import queryString from "query-string";
import { pop_url } from '../src/config';
import EAnalytics from "../src/services/eurelian";

const toReactiveSearchParams = params => {
  return Object.assign(...Object.entries(params).map(([k, v]) => ({ [k]: JSON.stringify(v) })));
};

function getUriJeuDePaume(){
  const params={
    base: ["Rose Valland (MNR-Jeu de Paume)"],
    producteur: ["Jeu de Paume sous l'Occupation"]
  }

  return `${pop_url}search/mosaic?${queryString.stringify(toReactiveSearchParams(params))}`;
}

export default class extends React.Component {

  componentDidMount() {
    /*
    tag.sendPage({
      name: 'Page À propos'
    });
    */
    // Tracking Eurelian
    EAnalytics.initialize();
    EAnalytics.track([
      'path', `Page à propos`,
      'pagegroup', 'Page à propos'
    ]);
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>POP, en savoir plus.</title>
          <meta
            name="description"
            content="À propos de la Plateforme Ouverte du Patrimoine POP."
          />
        </Head>
        <Container>
          <div className="apropos">
            <h2 style={{ color: "#19414c", fontWeight: 500, marginTop: "30px", fontSize: "28px" }}>
                POP, un outil au service de la connaissance du patrimoine français
            </h2>
            <br/>
            <p>
            « Rendre accessibles les œuvres capitales de l’humanité, et d’abord de la France, au plus
            grand nombre possible de Français » et « assurer la plus vaste audience à notre
            patrimoine culturel » : telle sont les missions assignées par André Malraux au nouveau
            ministère chargé de la Culture lors de sa création, en 1959.
            </p>

            <p>
            Dès les années 1970, le ministère a traduit ces missions fondamentales en élaborant,
            grâce au logiciel de recherche documentaire Mistral, des bases informatiques réunissant
            des données patrimoniales : c’est alors qu’apparurent les bases Joconde (1975) pour les
            musées, puis Mérimée (1978) et Palissy (1989) pour les services des Monuments
            historiques et de l’Inventaire général.
            </p>

            <p>
            Mises en ligne dans les années 1990, ces bases ont acquis une véritable notoriété. Mais,
            en 2018-2019, l’obsolescence du logiciel qui les soutenait a conduit à en proposer une
            nouvelle présentation, sous la forme d’une « Plate-forme ouverte du Patrimoine », ou
            POP.
            </p>

            <p>
            Les internautes trouveront sur POP plus de trois millions de notices patrimoniales,
            décrivant des œuvres d’art, des édifices, des photographies. POP a vocation à s’enrichir
            régulièrement par la mise à jour et l’illustration des notices existantes et par le versement
            de nouvelles notices.
            </p>

            <p>
            <b>Joconde</b> est le catalogue collectif des collections des musées de France. <b>Muséofile</b>, qui
            lui est lié, est le répertoire des institutions bénéficiant de l’appellation « musée de
            France ».
            </p>

            <p>
                <b>Mérimée</b> recense des édifices relevant de deux catégories :
            </p>
            <ul>
                <li>des édifices protégés au titre des Monuments historiques, qu’ils soient « classés » ou « inscrits ».</li>
                <li>des édifices étudiés par les services régionaux de l’Inventaire.</li>
            </ul>

            <p>
                <b>Palissy</b> recense des objets relevant de deux catégories :
            </p>
            <ul>
                <li>des objets protégés au titre des Monuments historiques, « classés » ou « inscrits ».</li>
                <li>des objets étudiés par les services régionaux de l’Inventaire.</li>
            </ul>
            <p>
            La base <b>Rose-Valland (MNR-Jeu de Paume) </b> est le catalogue en ligne des biens MNR (« Musées nationaux Récupération ») 
            qui ont été récupérés en Allemagne à la fin de la dernière guerre, et confiés à la garde des musées nationaux en attente de l’identification de leurs légitimes propriétaires. 
            Dans une proportion difficile à déterminer, ils sont susceptibles d’avoir fait l’objet de spoliations avérées ou présumées. 
            Les données sur ces biens sont exclusivement publiées sur la base nationale Rose Valland (MNR-Jeu de Paume), 
            alimentée par la <a href="https://www.culture.gouv.fr/Nous-connaitre/Organisation/Le-secretariat-general/Mission-de-recherche-et-de-restitution-des-biens-culturels-spolies-entre-1933-et-1945/Biens-culturels-MNR-et-Base-Rose-Valland-MNR-Jeu-de-Paume" target="_blank">
            Mission de recherche et de restitution des biens culturels spoliés entre 1933 et 1945</a>.<br/>
            Cette base contient également les données concernant les œuvres exposées sous l’Occupation par l'Einsatzstab Reichsleiter Rosenberg (ERR) au <a href="https://www.culture.gouv.fr/Nous-connaitre/Organisation/Le-secretariat-general/Mission-de-recherche-et-de-restitution-des-biens-culturels-spolies-entre-1933-et-1945/Recherche-de-provenance-outils-et-methode/Photographies-prises-au-Jeu-de-Paume-pendant-l-Occupation" target="_blank">musée du Jeu de Paume</a>, 
            lieu de stockage et d’exposition des œuvres spoliées avant leur départ pour l’Allemagne. Les vues générales présentées dans les notices <a target="_blank" href={getUriJeuDePaume()}>Jeu de Paume sous l’Occupation</a> correspondent à quatorze négatifs conservés aux Archives du ministère des Affaires étrangères (FR-MAE Centre des archives diplomatiques de La Courneuve, 20160007AC/7). 
            Les clichés ont été optimisés grâce à une numérisation spécifique des détails. Ils ont été ensuite mis en relation avec le plan des deux niveaux du <a href="https://www.culture.gouv.fr/Nous-connaitre/Organisation/Le-secretariat-general/Mission-de-recherche-et-de-restitution-des-biens-culturels-spolies-entre-1933-et-1945/Recherche-de-provenance-outils-et-methode/Photographies-prises-au-Jeu-de-Paume-pendant-l-Occupation" target="_blank">Jeu de Paume</a>. 
            232 œuvres sont visibles sur ces 14 clichés.
            </p>
            <p>
            <b >Mémoire</b> regroupe les collections de photographies conservées par des services centraux
            (Médiathèque du patrimoine et de la photographie), déconcentrés (Conservations régionales 
            des Monuments historiques) ou décentralisés (Services régionaux de l’Inventaire) du
            ministère de la Culture. Dans la mesure du possible, ces images illustrent les notices des
            bases <em>Mérimée</em> et <em>Palissy</em>.
            </p>

            <p>
            <b >Enluminures</b>  propose la consultation gratuite de plus de 100 000 reproductions numériques 
            d’enluminures et d’éléments de décor provenant de plus de 8 000 manuscrits médiévaux ou incunables peints 
            conservés dans une centaine de bibliothèques municipales françaises, dans des musées, des services d’archives, etc. 
            La base Enluminures est produite par le service du Livre et de la lecture (ministère de la Culture) en lien avec l'Institut de recherche et d'histoire des textes (CNRS).
            </p>

            <p>
            Par sa plate-forme de production, POP permet aux professionnels des services culturels
            de constituer et de maintenir un réservoir d’informations fiables, à travers des outils
            interopérables et simples d’utilisation. 
            </p>

            <p>
            Par sa plate-forme de diffusion, POP permet la libre consultation de l’ensemble des
            ressources textuelles et photographiques ainsi que leur réutilisation par d’autres
            applications grâce à un partage, total ou partiel, en open data.
            </p>

            <p>
            Les données de POP sont accessibles à la fois depuis le site pop.culture.gouv.fr et depuis
            la plateforme data.gouv.fr, dans l’optique de valoriser le patrimoine par l’intermédiaire de
            services tiers, comme des services de cartographie, d’excursions, de tourisme, de visites
            culturelles virtuelles…
            </p>
            <br />

            <h2 style={{ color: "#19414c", fontWeight: 500, marginTop: "30px", fontSize: "28px" }}>
            Aides à la recherche
            </h2>
            <br />

            <p>
                <b>Palissy et Mérimée (Monuments historiques) :</b>
            </p>
            <ul>
                <li>
                  aide pour une
                  <Link href={'https://pop-general.s3.eu-west-3.amazonaws.com/2022_Aide_POP_MH.pdf'} >
                    <a target="_blank" style={{ marginLeft: "5px" }}>recherche simple</a>
                  </Link>
                </li>
                <li>
                  aide pour une
                  <Link href={'https://pop-general.s3.eu-west-3.amazonaws.com/2022_Aide_POP_MH_complexe.pdf'}>
                  <a target="_blank" style={{ marginLeft: "5px" }}>recherche complexe</a>
                  </Link>
                </li>
            </ul>

            <h2 style={{ color: "#19414c", fontWeight: 500, marginTop: "30px", fontSize: "28px" }}>
            Les versions des navigateurs compatibles avec POP
            </h2>
            <br/>

            <p>
            La liste suivante correspond aux navigateurs compatibles avec l'application POP :
            </p>
            <ul>
                <li><b>Chrome :</b> à partir de la version 49.</li>
                <li><b>Firefox :</b> à partir de la version 50.</li>
                <li><b>Internet Explorer :</b> à partir de la version 9.</li>
                <li><b>Safari :</b> à partir de la version 10.</li>
            </ul>
          </div>
        </Container>
        <style jsx>{`
          .apropos {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            padding: 15px;
            margin: 50px auto;
            max-width: 800px;
            padding-bottom: 60px;
          }
          .apropos h2 {
            margin-top: 30px;
            font-size: 22px;
          }
        `}</style>
      </Layout>
    );
  }
}
