import React from "react";
import Head from "next/head";
import { Container } from "reactstrap";
import Layout from "../src/components/Layout";

export default class extends React.Component {
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
            <h1 style={{ color: "#19414c", fontWeight: 500, marginTop: "30px", fontSize: "28px" }}>
                POP, un outil au service de la connaissance du patrimoine français
            </h1>
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
            <b >MNR-Rose Valland</b> est le catalogue en ligne des biens MNR (« Musées nationaux
            Récupération ») qui ont été récupérés en Allemagne à la fin de la dernière guerre, et
            confiés à la garde des musées nationaux en attente de l’identification de leur légitimes
            propriétaires. Dans une proportion difficile à déterminer, ils sont susceptibles d’avoir fait
            l’objet de spoliations avérées ou présumées. Les données sur ces biens sont
            exclusivement publiées sur la base nationale MNR-Rose Valland, alimentée par la
            Mission de recherche et de restitution des biens culturels spoliés entre 1933 et 1945.
            </p>

            <p>
            <b >Mémoire</b> regroupe les collections de photographies conservées par des services centraux
            (Médiathèque de l’architecture et du patrimoine), déconcentrés (Conservations régionales 
            des Monuments historiques) ou décentralisés (Services régionaux de l’Inventaire) du
            ministère de la Culture. Dans la mesure du possible, ces images illustrent les notices des
            bases <em>Mérimée</em> et <em>Palissy</em>.
            </p>

            <p>
            <b >Enluminures</b> propose des reproductions numériques d’enluminures et d’éléments de
            décor de manuscrits médiévaux conservés dans une centaine de bibliothèques
            municipales françaises.
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

            <h1 style={{ color: "#19414c", fontWeight: 500, marginTop: "30px", fontSize: "28px" }}>
            Les versions des navigateurs compatibles avec POP
            </h1>
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
