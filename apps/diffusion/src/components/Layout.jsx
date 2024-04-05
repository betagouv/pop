import React from "react";
import Link from "next/link";
import { Container, Alert } from "reactstrap";
import Package from "../../package.json";
import Cookies from "universal-cookie";
import API from "../../src/services/api";

const message_maintenance =
	"Une opération de maintenance est en cours. Elle peut fausser l’affichage des résultats. Nous vous présentons nos excuses pour la gêne occasionnée. L’opération devrait être finie le 12 avril 2022";

export default class Layout extends React.Component {
	state = { maintenance: "FALSE" };

	async getNbNoticesInBucket() {
		//Récupération du panier actuel dans les cookies
		const cookies = new Cookies();
		const currentBucket = cookies.get("currentBucket") || [];
		this.setState({ countBucket: currentBucket.length });
		return currentBucket.length;
	}

	constructor(props) {
		super(props);
		this.state = {
			countBucket: 0,
		};
		this.isMaintenanceSite();
	}

	componentDidMount() {
		this.getNbNoticesInBucket();
	}

	async isMaintenanceSite() {
		const response = await API.getMaintenance();
		this.setState({ maintenance: response.maintenance });
	}

	render() {
		const { children } = this.props;
		return (
			<React.Fragment>
				<div className="header desktop-only">
					<Container className="NavContainer">
						<Link href="/">
							<a className="logo">
								<img
									src="/static/logo_MC.jpg"
									alt="Logo"
									className="md"
								/>
							</a>
						</Link>
						<h3 className="Title">
							POP : la plateforme ouverte du patrimoine
						</h3>
						<div className="right-container">
							<div className="linkBucket">
								<Link href="/bucket">
									<a className="btn btn-outline-danger onPrintHide">
										<div className="btn-bucket">
											<div id="nbBucket">
												{this.state.countBucket !== 0
													? `Consulter mon panier ( ${this.state.countBucket} )`
													: "Panier vide"}{" "}
											</div>
										</div>
									</a>
								</Link>
							</div>
							{
								<div>
									<a
										href="https://framaforms.org/ameliorez-pop-1663925372"
										className="btn btn-outline-danger onPrintHide"
										target="_blank"
										rel="noreferrer noopener"
									>
										Améliorez POP !
									</a>
								</div>
							}
						</div>
					</Container>
					<Alert
						style={{ marginBottom: "0px", textAlign: "center" }}
						color="warning"
						isOpen={this.state.maintenance === "TRUE"}
					>
						{message_maintenance}
					</Alert>
				</div>
				<div className="header mobile-only">
					<div className="header-mobile-up">
						<Link href="/">
							<a className="logo">
								<img
									src="/static/logo_MC.jpg"
									alt="Logo"
									className="md"
								/>
							</a>
						</Link>

						<div className="header-buttons-wrapper">
							<div className="button-list">
								<a
									href="https://framaforms.org/ameliorez-pop-1663925372"
									target="_blank"
									rel="noreferrer noopener"
								>
									<img src="/static/questionnaire.svg" />
								</a>
								<Link href="/bucket">
									<img src="/static/shopping-cart-2.svg" />
								</Link>
							</div>
						</div>
						<div className="mobile-separator" />
					</div>
					<div className="header-mobile-down">
						<h2>POP</h2>
						<h3>Plateforme ouverte du patrimoine</h3>
					</div>
					<div className="header-mobile-down" />
				</div>
				{children}
				<div className="footer">
					<ul className="list-inline">
						<li className="list-inline-item">
							<Link href="/apropos">
								<a>À propos</a>
							</Link>
						</li>
						<li className="list-inline-item">
							<Link href="/opendata">
								<a>Télécharger les bases</a>
							</Link>
						</li>
						<li className="list-inline-item">
							<a
								href={"mailto:pop@culture.gouv.fr"}
								target="_blank"
								rel="noreferrer noopener"
							>
								Nous contacter
							</a>
						</li>
						<li className="list-inline-item">
							<Link href="/tracking">
								<a>Suivi d'audience et vie privée</a>
							</Link>
						</li>
						<li className="list-inline-item">
							<span className="footer-item">
								Accessibilité : non conforme
							</span>
							<Link href="/accessibilite">
								<a>Déclaration d’accessibilité</a>
							</Link>
						</li>
					</ul>
					<div className="version">Pop version {Package.version}</div>
				</div>
				<style jsx>{`
          .header {
            box-shadow: 0 2px 6px 0 rgb(189, 189, 189);
            position: relative;
          }

          .header :global(.NavContainer) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: white;
            width: 100%;
            max-width: 100% !important;
            padding: 5px 15px;
          }

          .header .right-container {
            display: flex;
            align-items: center;
          }

          .header .right-container .btn {
            color: #c43a2f;
            margin-right: 25px;
          }

          .header .right-container .btn:hover {
            background-color: #c43a2f;
            color: #fff;
          }
          #beta {
            position: absolute;
            width: 120px;
            height: 110px;
            right: 0;
            top: 0;
            display: flex;
            overflow: hidden;
          }

          {/* BYpass bad heading in notice page */}
          .heading.heading-center {
            width: 100% !important;
          }

          #beta > div {
            position: absolute;
            right: -31.75%;
            top: 10%;
            width: 100%;
            background-color: #c43a2f;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(45deg);
          }

          #beta > div > span {
            display: inline-block;
            color: white;
            text-align: center;
            font-size: 0.9em;
            font-weight: 700;
            padding-top: 3px;
            padding-bottom: 3px;
          }

          .logo {
            display: flex;
            align-items: center;
          }
          .logo:hover,
          .logo:visited,
          .logo:focus,
          .logo:active {
            text-decoration: none;
          }
          .logo img {
            width: 247px;
            object-fit: contain;
          }
          .logo h1 {
            font-size: 28px;
            font-weight: 400;
            font-family: "Nexa", sans-serif;
            color: #777;
            margin: 0;
          }


          {/* ==================================
          Utilities  
          ================================== */}
          :global(.mobile-only){
            display: none !important;
          }
          :global(.desktop-only) {
            display: flex !important;
          }

          .btn-bucket{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
          }

          .company-title {
            margin-right: 30px;
          }
          .company-title span {
            display: block;
            font-size: 22px;
            line-height: 1;
            color: #003f48;
          }
          .company-title span:first-letter {
            font-weight: 700;
          }

          .footer {
            width: 100%;
            line-height: 60px;
            background-color: #f5f5f5;
            display: flex;
            justify-content: flex;
            box-shadow: 0 -2px 6px 0 rgba(189, 189, 189, 0.2);
          }

          .footer a:hover {
            text-decoration: underline;
          }
          .footer a, .footer .footer-item {
            text-decoration: none;
            padding-left: 20px;
            color: #003f48;
            font-weight: 300;
            font-size: 14px;
          }

          .version {
            margin-left: auto;
            margin-right: 20px;
            text-decoration: none;
            color: #003f48;
            font-weight: 300;
            font-size: 14px;
          }

          #betagouv {
            background-color: white;
            height: 32px;
            border-radius: 5px;
          }

          {/* ==================================
          Mobile breakpoint 
          ================================== */}
          @media screen and (max-width: 767px) {
            .header {
              background-color: white;
              display: box;
              padding: 6px 12px;

              .header-mobile-up {
                position: relative;
                height: 77px;
              }
              .mobile-separator {
                display: block;
                position: absolute;
                bottom: 8px;
                height: 1px;
                width: 100%;
                background-color:#E5E5E5;
              }


              .header-buttons-wrapper {
                  position: absolute;
                  right: 0px;
                  top: 0px;
                  padding: 26px 12px;

                  height: 100%;
              }

              .header-mobile-down h2 {
                font-size: 1rem;
                font-weight: 600;
              }
              .header-mobile-down h3 {
                font-size: 0.75rem;
              }


              .button-list img:first-child {
                margin-right: 15px;
              }

              .logo img {
                height: 69px;
                width: 120px;
              }
              .logo h1 {
                font-size: 20px;
              }
            }


            {/* ==================================
            Mobile utilities
            ================================== */}
            :global(.mobile-only){
              display: block !important;
            }
            :global(.desktop-only) {
              display: none !important;
            }
          }
          @media screen and (max-width: 767px) {
            .company-title span {
              font-size: 16px;
            }
            .company-title {
              margin-right: 15px;
              min-width: 82px;
            }
          }

          @media screen and (max-width: 590px) {
            .footer a,
            .footer a:hover {
              line-height: 20px;
              margin-top: 10px;
            }
          }

          @media screen and (min-width: 589px) {
            .footer {
              position: absolute;
              bottom: 0;
              height: 60px;
            }
          }
          @media print {
            .footer,
            .header {
              display: none;
            }
            .row,
            .notice {
              display: block !important;
            }
          }
          .Title {
            text-align: center;
          }
        `}</style>
			</React.Fragment>
		);
	}
}
