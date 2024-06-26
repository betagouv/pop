import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import API from "../../services/api";

import Mh from "./MH";
import Enluminures from "./enluminures";
import Home from "./home";
import Inv from "./inv";
import Joconde from "./joconde";
import List from "./list";
import Memoire from "./memoire";
import Mnr from "./mnr";
import Museo from "./museo";

class Import extends React.Component {
	state = {
		authorizedImports: [],
		routes: [],
		error: "",
		loading: true,
	};

	componentDidMount() {
		this.fetchAuthorizedImports();
	}

	fetchAuthorizedImports = async () => {
		this.setState({ loading: true });

		try {
			let allProducteurs = [];
			//On récupère tous les producteurs
			const responseProd = await API.getProducteurs();
			if (responseProd?.producteurs) {
				allProducteurs = responseProd.producteurs;
			}

			//Liste des producteurs rattachés à l'utilisateur
			const userProducteurs = [];
			//Liste des bases rattachées au producteur de l'utilisateur
			const userBases = [];
			//Liste des imports autorisés pour l'utilisateur
			const authorizedImports = [];
			//Liste des routes vers les imports autorisés
			const routes = [];
			let routeJoconde,
				routeMnr,
				routeInv,
				routeMh,
				routeMap,
				routeMuseo,
				routeListe;

			//On récupère le groupe de l'utilisateur pour identifier les bases qu'il peut alimenter
			if (this.props.group !== "admin") {
				const responseGroup = await API.getGroupByLabel(
					String(this.props.group),
				);
				if (responseGroup?.group) {
					const userGroup = responseGroup.group;
					//Pour chaque producteur du groupe, on alimente la liste des producteurs de l'utilisateur
					userGroup.PRODUCTEURS.map((producteur) => {
						userProducteurs.push(producteur);
					});
				}

				allProducteurs.map((producteur) => {
					if (userProducteurs.includes(String(producteur.LABEL))) {
						//On ajoute chaque base rattachée au producteur pour déterminer
						//l'ensemble des bases auxquelles l'utilisateur a accès
						producteur.BASE.map((BASE) => {
							if (!userBases.includes(BASE.base)) {
								userBases.push(BASE.base);
							}
						});
					}
				});
			}

			// Pour chaque import, on identifie si oui ou non l'utilisateur peut l'utiliser
			// à partir de son groupe
			const group = this.props.group;
			const role = this.props.role;
			if (group.toUpperCase() === "JOCONDE" || group === "admin") {
				authorizedImports.push("joconde");
				routeJoconde = (
					<Route
						path={"/import/joconde"}
						component={Joconde}
						key={""}
					/>
				);
				routes.push(routeJoconde);
			}
			if (group.toUpperCase() === "MNR" || group === "admin") {
				authorizedImports.push("mnr");
				routeMnr = (
					<Route
						path={"/import/mnr"}
						component={Mnr}
						key={"/import/mnr"}
					/>
				);
				routes.push(routeMnr);
			}
			if (group.toUpperCase() === "INV" || group === "admin") {
				authorizedImports.push("inv");
				routeInv = (
					<Route
						path={"/import/inv"}
						component={Inv}
						key={"/import/inv"}
					/>
				);
				routes.push(routeInv);
			}
			if (group.toUpperCase() === "MH" || group === "admin") {
				authorizedImports.push("mh");
				routeMh = (
					<Route
						path={"/import/mh"}
						component={Mh}
						key={"/import/mh"}
					/>
				);
				routes.push(routeMh);
			}
			if (group.toUpperCase() === "MEMOIRE" || group === "admin") {
				authorizedImports.push("map");
				routeMap = (
					<Route
						path={"/import/memoire"}
						component={Memoire}
						key={"/import/memoire"}
					/>
				);
				routes.push(routeMap);
			}
			if (group.toUpperCase() === "MUSEO" || group === "admin") {
				authorizedImports.push("museo");
				routeMuseo = (
					<Route
						path={"/import/museo"}
						component={Museo}
						key={"/import/museo"}
					/>
				);
				routes.push(routeMuseo);
			}
			if (group.toUpperCase() === "ENLUMINURES" || group === "admin") {
				authorizedImports.push("enluminures");
				routeMuseo = (
					<Route
						path={"/import/enluminures"}
						component={Enluminures}
						key={"/import/enluminures"}
					/>
				);
				routes.push(routeMuseo);
			}
			if (role === "administrateur" || role === "producteur") {
				routeListe = (
					<Route
						path={"/import/list"}
						component={List}
						key={"/import/list"}
					/>
				);
				routes.push(routeListe);
			}

			this.setState({
				loading: false,
				authorizedImports: authorizedImports,
				routes: routes,
			});
		} catch (error) {
			this.setState({ error: error.msg });
		}
	};

	render() {
		return (
			<div>
				<Switch>
					<Route
						exact
						path={"/import/"}
						render={(props) => (
							<Home
								{...props}
								authorizedImports={this.state.authorizedImports}
							/>
						)}
					/>
					{this.state.routes.map((route) => {
						// biome-ignore lint/correctness: Good
						return route;
					})}
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = ({ Auth }) => {
	return {
		group: Auth.user ? Auth.user.group : "",
		role: Auth.user ? Auth.user.role : "utilisateur",
	};
};

export default connect(mapStateToProps, {})(Import);
