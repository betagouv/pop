import Link from "next/link";
import React from "react";
import { Button } from "reactstrap";
import Cookies from "universal-cookie";

export default class MobileBucketButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pressed: false };
		// TODO delete
		console.log("Log-MobileBucketButton.js");
		console.log(this.props.link);
	}

	//Méthode permettant d'ajouter la notice au panier
	addToBucket(base, ref) {
		//Récupération du panier actuel dans les cookies
		const cookies = new Cookies();
		const currentBucket = cookies.get("currentBucket") || [];

		//Si on a bien une ref et une base, on ajoute la notice au panier
		if (base && ref) {
			let isAlreadyInBucket = false;
			currentBucket.map((item) => {
				if (item.ref === ref && item.base === base) {
					isAlreadyInBucket = true;
				}
			});
			if (currentBucket.length >= 50) {
				alert(
					"Le panier de notices ne peut contenir que 50 notices maximum.",
				);
			} else if (!isAlreadyInBucket) {
				currentBucket.push({ ref: ref, base: base });
				document.getElementById("nbBucket").innerHTML =
					"Consulter mon panier ( " + currentBucket.length + " )";
				//Transformation de la liste de notice au format json et modification du cookie
				var jsonCurrentBucket = JSON.stringify(currentBucket);
				cookies.set("currentBucket", jsonCurrentBucket, {
					path: "/",
					overwrite: true,
				});
			}
			this.setState({ pressed: true });
		}
	}

	/**
	 * Method o remove a
	 * @param {string} base
	 * @param {string} ref
	 */
	removeFromBucket(base, ref) {
		//Récupération du panier actuel dans les cookies
		const cookies = new Cookies();
		const currentBucket = cookies.get("currentBucket") || [];

		//Si on a bien une ref et une base, on ajoute la notice au panier
		if (base && ref) {
			for (let i = 0; i < currentBucket.length; i++) {
				if (
					currentBucket[i].ref === ref &&
					currentBucket[i].base === base
				) {
					// remove this index from bucket list
					const elementDeleted = currentBucket.splice(i, 1);
					console.log("We deleted this element,", elementDeleted);
				}
			}

			// Transformation de la liste de notice au format json et modification du cookie
			var jsonCurrentBucket = JSON.stringify(currentBucket);
			cookies.set("currentBucket", jsonCurrentBucket, {
				path: "/",
				overwrite: true,
			});
			this.setState({ pressed: true });
		}
	}

	//Méthode permettant vérifier si la notice est dans le panier
	checkInBucket(base, ref) {
		//Récupération du panier actuel dans les cookies
		const cookies = new Cookies();
		const currentBucket = cookies.get("currentBucket") || [];

		//Si on a bien une ref et une base, return true
		if (base && ref) {
			let isAlreadyInBucket = false;
			currentBucket.map((item) => {
				if (item.ref === ref && item.base === base) {
					isAlreadyInBucket = true;
				}
			});
			if (isAlreadyInBucket) {
				return true;
			}
		}
		return false;
	}

	render() {
		return (
			<div className="btn-container">
				<div
					className="btn btn-outline-second onPrintHide"
					onClick={() =>
						this.props.removeFromBucket(this.props.reference)
					}
				>
					<div className="btn-bucket-second">
						<Link href={this.props.link} key={this.props.reference}>
							<div>Afficher la notice</div>
						</Link>
					</div>
				</div>
				<div className="btn-separator"></div>
				{this.props.removeFromBucket ? (
					<div
						className="btn btn-outline-success util-pos-relat"
						onClick={() =>
							this.removeFromBucket(
								this.props.base,
								this.props.reference,
							)
						}
					>
						<div className="btn-bucket cross-after">
							<div>Retirer du panier</div>
						</div>
					</div>
				) : this.checkInBucket(
						this.props.base,
						this.props.reference,
					) ? (
					<div
						className="btn btn-outline-success util-pos-relat"
						onClick={() =>
							this.removeFromBucket(
								this.props.base,
								this.props.reference,
							)
						}
					>
						<div className="btn-bucket cross-after">
							<div>Retirer du panier</div>
						</div>
					</div>
				) : (
					<div
						className={`btn btn-outline-success d-sm-block`}
						onClick={() =>
							this.addToBucket(
								this.props.base,
								this.props.reference,
							)
						}
					>
						<div className="btn-bucket">
							<div>Ajouter au panier</div>
						</div>
					</div>
				)}

				<style jsx>{`
                    .btn-bucket{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        width: fill-content;
                    }

                    .btn-outline-success{
                        background-color: #fff;
                        color: #221529;;
                        border-color: #221529;
                    }

                    .pressed{
                        background-color: #fff;
                        color: #28a745;
                        border-color: #28a745;
                    }

                    .util-pos-relat {
                        position:relative;
                    }

                    {/* ==================================
                    Mobile breakpoint 
                    ================================== */}
                    @media screen and (max-width: 767px) {
                        .btn-container {
                            display:flex;
                        }
                        .btn-outline-success{
                            border-color: #377c87;
                        }

                        .btn-bucket {
                            color: #377c87;
                        }

                        .btn-outline-second {
                            border-color: #377c87;
                            background-color: #377c87; 
                        }

                        .btn-separator {
                            width: 2%;
                        }

                        .btn-bucket-second {
                            color: white;
                        }

                        .btn {
                            width: 48%;
                        }

                        .cross-after:after {
                            display: block;
                            /* height: 100%; */
                            right: 31px;
                            position: absolute;
                            height: 24px;
                            font-family: sans-serif;
                            content: "x";
                        }

                    }


                `}</style>
			</div>
		);
	}
}
