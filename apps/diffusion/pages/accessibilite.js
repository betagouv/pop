import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Container } from "reactstrap";
import Layout from "../src/components/Layout";
import queryString from "query-string";
import { pop_url } from "../src/config";
import EAnalytics from "../src/services/eurelian";

const toReactiveSearchParams = (params) => {
	return Object.assign(
		...Object.entries(params).map(([k, v]) => ({ [k]: JSON.stringify(v) })),
	);
};

function getUriJeuDePaume() {
	const params = {
		base: ["Rose Valland (MNR-Jeu de Paume)"],
		producteur: ["Jeu de Paume sous l'Occupation"],
	};

	return `${pop_url}search/mosaic?${queryString.stringify(
		toReactiveSearchParams(params),
	)}`;
}

export default class extends React.Component {
	componentDidMount() {
		// Tracking Eurelian
		EAnalytics.initialize();
		EAnalytics.track([
			"path",
			`Page déclaration accessibilité`,
			"pagegroup",
			"Page déclaration accessibilité",
		]);
	}

	render() {
		return (
			<Layout>
				<Head>
					<title>POP, déclaration d’accessibilité</title>
					<meta
						name="description"
						content="Déclaration d’accessibilité de la Plateforme Ouverte du Patrimoine POP."
					/>
				</Head>
				<Container>
					<div className="accessibilite">
						<h1>Déclaration d’accessibilité</h1>
						<p>
							<em>Établie le 19 janvier 2024.</em>
						</p>
						<p>
							<span>Ministère de la Culture</span> s’engage à
							rendre son service accessible, conformément à
							l’article 47 de la loi n° 2005-102 du 11 février
							2005.
						</p>
						<p>
							À cette fin, nous mettons en œuvre la stratégie et
							les actions suivantes&nbsp;:{" "}
							<a href="https://www.culture.gouv.fr/Accessibilite/Schema-pluriannuel-d-accessibilite-numerique">
								schéma pluriannuel d’accessibilité numérique
							</a>
							.
						</p>
						<p>
							Cette déclaration d’accessibilité s’applique à{" "}
							<strong>
								POP (Plateforme Ouverte du Patrimoine)
							</strong>
							.
						</p>
						<p>
							De plus, un travail de refonte du site de diffusion
							est actuellement engagé et devrait voir le jour fin
							2024. Cette refonte sera conçue dans le respect des
							normes d'accessibilité.
						</p>
						<h2>État de conformité</h2>
						<p>
							<strong>
								POP (Plateforme Ouverte du Patrimoine)
							</strong>{" "}
							est
							<strong> non conforme</strong> avec le{" "}
							<abbr title="Référentiel général d’amélioration de l’accessibilité">
								RGAA
							</abbr>
							. <span>Le site n’a encore pas été audité.</span>
						</p>

						<h2>Amélioration et contact</h2>
						<p>
							Si vous n’arrivez pas à accéder à un contenu ou à un
							service, vous pouvez contacter le responsable de{" "}
							<span>POP (Plateforme Ouverte du Patrimoine)</span>{" "}
							pour être orienté vers une alternative accessible ou
							obtenir le contenu sous une autre forme.
						</p>
						<ul className="basic-information feedback h-card">
							<li>
								E-mail&nbsp;:{" "}
								<a href="mailto:pop@culture.gouv.fr">
									pop@culture.gouv.fr
								</a>
							</li>

							<li>
								<a href="https://framaforms.org/ameliorez-pop-1663925372">
									Formulaire de contact
								</a>
							</li>
						</ul>
						<p>
							Nous essayons de répondre dans les{" "}
							<span>2 jours ouvrés</span>.
						</p>
						<h2>Voie de recours</h2>
						<p>
							Cette procédure est à utiliser dans le cas
							suivant&nbsp;: vous avez signalé au responsable du
							site internet un défaut d’accessibilité qui vous
							empêche d’accéder à un contenu ou à un des services
							du portail et vous n’avez pas obtenu de réponse
							satisfaisante.
						</p>
						<p>Vous pouvez&nbsp;:</p>
						<ul>
							<li>
								Écrire un message au{" "}
								<a href="https://formulaire.defenseurdesdroits.fr/">
									Défenseur des droits
								</a>
							</li>
							<li>
								Contacter{" "}
								<a href="https://www.defenseurdesdroits.fr/saisir/delegues">
									le délégué du Défenseur des droits dans
									votre région
								</a>
							</li>
							<li>
								Envoyer un courrier par la poste (gratuit, ne
								pas mettre de timbre)&nbsp;:
								<br />
								Défenseur des droits
								<br />
								Libre réponse 71120 75342 Paris CEDEX 07
							</li>
						</ul>
					</div>
				</Container>
				<style jsx>{`
                    .accessibilite {
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
	}
}
