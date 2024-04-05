import React from "react";
import { Button } from "reactstrap";
import Cookies from "universal-cookie";

export default class BucketButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pressed: false };
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
					`Consulter mon panier ( ${currentBucket.length} )`;
				//Transformation de la liste de notice au format json et modification du cookie
				const jsonCurrentBucket = JSON.stringify(currentBucket);
				cookies.set("currentBucket", jsonCurrentBucket, {
					path: "/",
					overwrite: true,
				});
			}
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
			<div>
				<div>
					{this.props.removeFromBucket ? (
						<div
							className="btn btn-outline-danger onPrintHide"
							onClick={() =>
								this.props.removeFromBucket(
									this.props.reference,
								)
							}
						>
							<div className="btn-bucket">
								<div>Supprimer</div>
							</div>
						</div>
					) : this.checkInBucket(
							this.props.base,
							this.props.reference,
						) ? (
						<div />
					) : (
						<div
							className={"btn btn-outline-success d-sm-block"}
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
				</div>
				<style jsx>{`
                    .btn-bucket{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: flex-end;
                        width: fill-content;
                    }

                    .btn-outline-success:hover{
                        background-color: #28a745;
                        color: #fff;
                        border-color: #28a745;
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


                    {/* ==================================
                    Mobile breakpoint 
                    ================================== */}
                    @media screen and (max-width: 767px) {
                        .btn-outline-success{
                            border-color: #377c87;
                        }

                        .btn-bucket {
                            color: #377c87;
                        }

                    }


                `}</style>
			</div>
		);
	}
}
