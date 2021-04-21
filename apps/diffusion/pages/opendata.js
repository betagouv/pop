import React from "react";
import Head from "next/head";
import Layout from "../src/components/Layout";

export default () => (
  <Layout>
    <div className="opendata-view">
      <Head>
        <title>À propos, OpenData - POP</title>
        <meta name="description" content="À propos de la Plateforme Ouverte du Patrimoine POP." />
      </Head>
      <div>
        La plateforme POP vise à rendre accessible au public l’ensemble des informations d’intérêt
        collectées, vérifiées et/ou produites par le Ministère de la Culture à travers ses services
        centraux, territoriaux et ses partenaires. A ce jour la plateforme regroupe les informations
        relatives :
        <br />
        <br />• aux collections des musées de France (base Joconde) ;
        <br />• au patrimoine architectural, protégé et non-protégé (base Mérimée) ;
        <br />• au patrimoine mobilier, protégé et non-protégé (base Palissy) ;
        <br />• aux fonds photographiques reçus, conservés et/ou constitués par le Ministère (base Mémoire) ;
        <br />• aux œuvres spoliées en dépôt temporaire dans les musées (base MNR) ;
        <br />• aux ressources biographiques et identifications des auteurs (base Autor) ;
        <br />
         <br />
        <br />
        Les informations consultables sur la plateforme POP, ce comprenant les informations
        textuelles et multimédia, sont pour partie soumises, expressément ou supposément, au droit
        d’auteur et ne peuvent à ce titre être diffusées ou réutilisées par des tiers sans
        l’autorisation préalable de l’auteur ou des ayants droit.
        <br />
         <br />
        Dans un souci de clarté et de simplicité pour les ré-utilisateurs, les informations
        publiques au sens du code des relations entre le public et l’Administration, regroupées au sein de la plateforme POP, 
        sont téléchargeables sur <a href="https://data.culture.gouv.fr" target="_blank">https://data.culture.gouv.fr</a>
        <br />
         <br />
        S’agissant desdites informations publiques, le lecteur dispose d’un droit non exclusif et
        gratuit de libre « réutilisation » à des fins commerciales ou non, dans le monde entier et
        pour une durée illimitée, à condition que ces informations soient librement communicables au
        sens de l'article L.213-1 du Code du patrimoine et qu'elles n'aient pas été communiquées par
        autorisation ou par dérogation.
        <br />
         <br />
        Dans le cas où le ré-utilisateur souhaiterait faire usage d’informations soumises au droit
        d’auteur, notamment disponibles sur l’interface de diffusion mais pas en téléchargement au lien mentionné ci-dessous, 
        le ré-utilisateur doit obtenir les autorisations nécessaires auprès des auteurs et ayants droit.
        <br />
         <br />
        Similairement certaines des informations diffusées sur la plateforme POP peuvent comporter
        des données à caractère personnel pour lesquelles les ré-utilisateurs sont tenus au respect
        de <a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000038528420/" target="_blank">la loi Informatique et Libertés</a>.
        <br />
         <br />
        Le lecteur est donc tenu au respect des droits d'auteur attachés aux documents, des droits
        attachés aux personnes visées dans les documents, notamment en recourant à des procédés
        d'anonymisation des éléments permettant de les identifier ; ainsi qu'au respect de
        l'intégrité des informations, en veillant à ce que la teneur et la portée des informations
        ne soient pas altérées par des retraitements (modification des informations, insertion de
        commentaires sans que ceux-ci puissent être clairement distingués du contenu de
        l'administration, coupes altérant le sens du texte ou des informations).
        <br />
        Il doit accompagner chaque rediffusion des informations de l'indication précise de l'origine
        et du lieu de conservation du document, date, référence, l'auteur et du titre du document
        s'il y a lieu.  <br />
        Le non-respect de ces règles expose le ré-utilisateur aux sanctions prévues à l'article L.
        326-1 du CRPA et, en cas de non-respect des règles relatives à la réutilisation de données à
        caractère personnel, aux articles 45 et suivants de la loi n° 78-17 du 6 janvier 1978
        relative à l'informatique, aux fichiers et aux libertés.
        <br />
         <br />
        Pour toute demande d’information, réclamation ou demande de retrait du site de diffusion,
        vous pouvez adresser votre demande au service responsable à l’aide de l’onglet
        « Contactez-nous » présent sur chaque notice. <br />
        <br />
      </div>
      <h5>Les bases suivantes sont disponibles en OpenData&nbsp;:</h5>
      <br />
      <ul>
        <li>
          <a href="https://data.culture.gouv.fr/explore/dataset/base-joconde-extrait/" target="_blank">Joconde</a>,
          collections des musées de France
        </li>
        <li>
          <a href="https://data.culture.gouv.fr/explore/dataset/liste-des-objets-mobiliers-propriete-publique-classes-au-titre-des-monuments-/" target="_blank">
            Palissy MH
          </a>
          , patrimoine mobilier
        </li>
        <li>
          <a href="https://data.culture.gouv.fr/explore/dataset/liste-des-immeubles-proteges-au-titre-des-monuments-historiques/table/" target="_blank">
            Mérimée MH
          </a>
          , patrimoine architectural
        </li>
        <li>
          <a href="https://data.culture.gouv.fr/explore/dataset/musees-de-france-base-museofile/information/" target="_blank">
            Muséofile
          </a>
          , répertoire des musées de France
        </li>
        <li>
          <a href="https://data.culture.gouv.fr/explore/dataset/base-autor-ressources-biographiques-et-identification-des-auteurs/information/" target="_blank">
            Autor
          </a>
          , ressources biographiques et identification des auteurs
        </li>
      </ul>
    </div>
    <style jsx>{`
      .opendata-view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        padding: 15px;
        margin: 50px auto;
        max-width: 800px;
      }
    `}</style>
  </Layout>
);
