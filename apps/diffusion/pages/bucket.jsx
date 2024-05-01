import { PDFDownloadLink } from "@react-pdf/renderer";
import Head from "next/head";
import React from "react";
import { Button } from "reactstrap";
import Cookies from "universal-cookie";
import Layout from "../src/components/Layout";
import { BucketPdf } from "../src/pdf/pdfNoticeAbregees/BucketPdf";
import {
	Autor,
	Enluminures,
	Joconde,
	Memoire,
	Merimee,
	Mnr,
	Museo,
	Palissy,
} from "../src/search/Results/CardList";
import API from "../src/services/api";
import EAnalytics from "../src/services/eurelian";
import { trackDownload } from "../src/utils";

export default class Bucket extends React.Component {
	state = {
		bucket: [],
		loading: true,
		display: false,
		dataLayer: ["path", "Consulter le panier", "pagegroup", "Panier"],
	};

	//Méthode permettant de supprimer du panier
	removeFromBucket = (ref) => {
		//Récupération du panier actuel dans les cookies
		const cookies = new Cookies();
		let currentBucket = cookies.get("currentBucket") || [];
		//Filtre en fonction de la notice que l'on veut enlever
		currentBucket = currentBucket.filter((item) => {
			return item.ref !== ref;
		});

		//Transformation de la liste de notice au format json et modification du cookie
		//Ainsi que le state contenant la liste des notices
		const jsonCurrentBucket = JSON.stringify(currentBucket);
		cookies.set("currentBucket", jsonCurrentBucket, {
			path: "/",
			overwrite: true,
		});
		this.setState({
			bucket: this.state.bucket.filter((notice) => {
				return notice.REF !== ref;
			}),
		});
	};

	componentDidMount() {
		this.fillBucket();
		this.setState({ display: true });

		// Tracking Eurelian
		EAnalytics.initialize();
		EAnalytics.track(this.state.dataLayer);
	}

	fillBucket = async () => {
		const cookies = new Cookies();
		const bucket = cookies.get("currentBucket");
		try {
			const newBucket = await Promise.all(
				bucket.map(async (item) => {
					const notice = await API.getNotice(item.base, item.ref);
					return notice;
				}),
			);
			this.setState({ bucket: newBucket });
		} catch (e) {
			return [];
		}
	};

	displayCard(notice) {
		if (notice) {
			switch (notice.collection) {
				case "joconde":
					return (
						<Joconde
							data={notice}
							removeFromBucket={this.removeFromBucket}
						/>
					);
				case "memoire":
					return (
						<Memoire
							data={notice}
							removeFromBucket={this.removeFromBucket}
						/>
					);
				case "palissy":
					return (
						<Palissy
							data={notice}
							removeFromBucket={this.removeFromBucket}
						/>
					);
				case "merimee":
					return (
						<Merimee
							data={notice}
							removeFromBucket={this.removeFromBucket}
						/>
					);
				case "museo":
					return (
						<Museo
							data={notice}
							removeFromBucket={this.removeFromBucket}
						/>
					);
				case "mnr":
					return (
						<Mnr
							data={notice}
							removeFromBucket={this.removeFromBucket}
						/>
					);
				case "enluminures":
					return (
						<Enluminures
							data={notice}
							removeFromBucket={this.removeFromBucket}
						/>
					);
				case "autor":
					return (
						<Autor
							data={notice}
							removeFromBucket={this.removeFromBucket}
						/>
					);
				default:
					return null;
			}
		}
	}

	//Détermine le nom du fichier téléchargé pour le pdf
	PdfFileName() {
		const today = new Date();
		const month = today.getMonth() + 1 === 13 ? 1 : today.getMonth() + 1;
		const data =
			// biome-ignore lint/style/useTemplate: <explanation>
			today.getFullYear() +
			"-" +
			(month < 10 ? "0" : "") +
			month.toString() +
			"-" +
			(today.getDate() < 10 ? "0" : "") +
			today.getDate();

		return `panier_de_notices_${data}.pdf`;
	}

	//Vide le panier de notices
	EmptyBucket() {
		const cookies = new Cookies();
		let currentBucket = cookies.get("currentBucket");
		// Obliger d'imiter la méthode de removebucket sinon les champs n'existent pas
		//Filtre en fonction de la notice que l'on veut enlever
		currentBucket = currentBucket.filter((item) => {
			return item.ref === null;
		});

		//Transformation de la liste de notice au format json et modification du cookie
		//Ainsi que le state contenant la liste des notices
		const jsonCurrentBucket = JSON.stringify(currentBucket);
		cookies.set("currentBucket", jsonCurrentBucket, {
			path: "/",
			overwrite: true,
		});
		this.setState({
			bucket: this.state.bucket.filter((notice) => {
				return notice.REF === null;
			}),
		});
	}

	render() {
		const formatedDate = new Intl.DateTimeFormat("en-GB")
			.format(new Date())
			.replace("/", "_");
		let blocIndex = 0;

		const listOfNotices = this.state.bucket;
		const blocList = [];
		let tempList = [];

		listOfNotices.map((notice, index) => {
			tempList.push(notice);

			//multiple = x % y;
			const multiple = (index + 1) % 7;
			if (
				(multiple === 0 && index !== 0) ||
				listOfNotices.length === index + 1
			) {
				//x is a multiple of y
				blocList.push({ list: tempList, bloc: blocIndex });
				tempList = [];
				blocIndex++;
			}
		});

		const pdf = BucketPdf(this.state.bucket);
		const PDFLink = () => (
			<div>
				<PDFDownloadLink
					className="btn btn-secondary"
					document={pdf}
					fileName={this.PdfFileName()}
					style={{
						backgroundColor: "#377d87",
						border: 0,
						color: "#fff",
						maxWidth: "250px",
						width: "100%",
						height: "31px",
						paddingLeft: "10px",
						paddingRight: "10px",
						paddingTop: "5px",
						paddingBottom: "5px",
						textAlign: "center",
						borderRadius: "5px",
					}}
					onClick={() => trackDownload(this.PdfFileName())}
				>
					{({ blob, url, loading, error }) =>
						loading
							? "Construction du pdf..."
							: "Télécharger le panier"
					}
				</PDFDownloadLink>
			</div>
		);

		const EmptyBucketButton = () => (
			<div>
				<Button
					style={{
						backgroundColor: "transparent",
						border: "1px solid #377d87",
						color: "#377d87",
						maxWidth: "250px",
						height: "31px",
						width: "100%",
						lineHeight: "0px",
						textAlign: "center",
						borderRadius: "5px",
					}}
					onClick={() => this.EmptyBucket()}
				>
					Vider le panier
				</Button>
			</div>
		);

		return (
			<div className="bucketList">
				<Layout>
					<div className="home">
						<Head>
							<title>Panier de notices</title>
						</Head>
					</div>
					<div className="bucketContainer">
						<h1 className="bucketTitle">Panier de notices</h1>
						<div className="notices">
							<div className="download-container">
								{this.state.bucket.length > 0 &&
								this.state.display
									? EmptyBucketButton()
									: ""}

								{this.state.bucket.length > 0 &&
								this.state.display
									? PDFLink()
									: ""}
							</div>
							<div className="notice-number">
								{this.state.bucket.length === 0
									? "Aucune notice dans le panier"
									: `${this.state.bucket.length} résultat${
											this.state.bucket.length > 1
												? "s"
												: ""
										}`}
							</div>

							{/* {this.state.bucket.map( notice, index =>
                <div>
                  {this.displayCard(notice)}
                </div>
              )} */}

							{blocList.map((item) => (
								<div
									key={`bloc_${item.bloc}`}
									id={`bloc_${item.bloc}`}
									className="notices-wrapper"
								>
									{item.list.map((notice) =>
										this.displayCard(notice),
									)}
								</div>
							))}
						</div>
					</div>
				</Layout>

				<style jsx global>{`
            .home {
              height: 100%;
            }

            .bucketContainer{
              display: flex;
              align-items: center;
              flex-direction: column;
              padding-top: 20px;
            }

            .bucketTitle{
              display: flex;
              justify-content: center;
              font-size: 30px;
            }

            .download-container {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              padding-right: 20px;
              padding-left: 20px;
            }

            .notices {
              display: flex;
              flex-direction: column;
              align-content: center;
              padding-top: 30px;
              width: 80%;
            }
            .list-card {
              display: flex;
              justify-content: center;
              width: 100%;
            }
    
            .list-card .list-card-container {
              display: flex;
              flex-direction: row;
              transition: 0.3s;
              height: 110px;
              overflow: hidden;
              background-color: white;
              height: auto;
              margin: 7px 0px 7px 0px;
              border-radius: 5px;
              width: 100%;
              justify-content: space-between;
            }
    
            .list-card .list-card-container:hover {
              box-shadow: 0 3px 6px 0 rgba(189, 189, 189, 1);
            }
    
            .list-card .content {
              padding: 15px 30px 10px 0;
              overflow: hidden;
              width: 100%;
              position: relative;
            }
            .list-card .thumbnail {
              width: 290px;
              margin-right: 30px;
              background-color: #f8f8f8;
              display: flex;
              justify-content: center;
              align-items: center;
              padding-left: 10px;
            }
    
            .list-card img {
              width: 100%;
              height: 200px;
              object-fit: contain;
            }
    
            .list-card img.no-img {
              width: 190px;
              height: 140px;
            }
    
            .list-card .content .categories {
              font-size: 18px;
              color: #808d9e;
              font-weight: 300;
              margin-bottom: 10px;
            }
    
            .list-card h2 {
              font-weight: 600;
              font-size: 18px;
              color: #2a282b;
              margin-bottom: 0;
            }
    
            .list-card span {
              font-weight: 400;
              font-size: 16px;
              color: #19414c;
              margin-left: auto;
              text-align: right;
            }
    
            .list-card p {
              color: #2a282b;
              font-weight: 400;
              font-size: 16px;
              margin-bottom: 5px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
    
            .list-card .base {
              float: right;
            }
    
            .list-card img.producteur {
              width: 50px;
              height: auto;
              right: 7px;
              bottom: 7px;
            }
            .list-card img.producteur.mh {
              width: 100px;
            }

            .leftContent{
              display: flex;
              width: 80%;
            }
    
            .cardTextContent{
              display: flex;
              flex-direction: column;
              width: 80%;
            }
    
            .rightContent{
              display: flex;
              flex-direction: column;
              margin-right: 8px;
              margin-top: 8px;
              align-items: flex-end;
              justify-content: space-around;
            }
            .notice-number {
                padding-left: 22px;
                margin-bottom: 2px;
            }
            {/* ==================================
            Mobile breakpoint 
            ================================== */}
            @media screen and (max-width: 767px) {
              .bucketTitle {
                color: #19414C;
                font-size: 26px;
                font-weight: 700;
                margin-bottom:24px;
              }

              .notices {
                width: 100%;
                padding: 0 15px;
              }

              .notices-wrapper {
                display: flex;
                flex-direction: column;
              }

              .download-container {
                align-items: center;
                margin-bottom: 24px;
              }

              .list-card {
                width: 100%;
              }

              .list-card .thumbnail {
                width: 150px;
                margin-right: 10px;
              }

              .list-card img.no-img {
                width: 80px;
                height: 80px;
              }
              .list-card h2 {
                font-size: 15px;
              }
              .list-card p,
              .list-card span {
                font-size: 11px;
              }
              .notices .btn {
                font-size: 0.8em;
              }
              .notices .list-card-container-mobile {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 16px;
                gap: 16px;
                background: #FFFFFF;
                border-radius: 8px;
                width: 100%;

                margin-bottom: 12px;
                
                .list-card-title {
                  margin-bottom:16px;
                }

                .list-card-header {
                  position:relative;
                  display:flex;
                  justify-content: space-between;
                  width: 100%;
                  margin-bottom:16px;

                  .list-card-thumbnail {
                    height: 80px;
                    width: 80px;
                    display: flex;
                    overflow: hidden;
                    justify-content: center;
                    align-items: center;
                  }
                  .list-card-thumbnail img {
                      object-fit: fill;
                      height: auto;
                  }
                }
              }
            }            
          `}</style>
			</div>
		);
	}
}
