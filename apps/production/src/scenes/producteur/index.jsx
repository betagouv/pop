import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Table } from "reactstrap";
import api from "../../services/api";

import UpdateProducteur from "./UpdateProducteur";
import CreateProducteur from "./createProducteur";
import "./index.css";

class Producteur extends React.Component {
	state = { producteurs: [], loading: true };

	fetchProducteurs = async () => {
		this.setState({ loading: true });
		try {
			const response = await api.getProducteurs();
			this.setState({
				producteurs: response.producteurs || [],
				loading: false,
			});
		} catch (e) {
			//To complete
		}
	};

	componentWillMount() {
		this.fetchProducteurs();
	}

	renderProducteurs() {
		return (
			<Table>
				<thead>
					<tr>
						<th>Nom</th>
						<th>Base</th>
					</tr>
				</thead>
				<tbody>
					{this.state.producteurs.map((producteur) => {
						const _id = producteur._id;
						const label = producteur.LABEL;
						const bases = producteur.BASE;

						return (
							<tr key={_id}>
								<td>{label}</td>

								<td>
									<ul
										style={{
											listStyle: "none",
											paddingLeft: 0,
										}}
									>
										{bases.map((item) => {
											const { base, prefixes } = item;
											return (
												<li key={`${_id}-${base}`}>
													{base +
														(prefixes.length > 0
															? ` (${prefixes.map(
																	(
																		itemPrefix,
																	) => {
																		return ` ${itemPrefix}`;
																	},
																)} )`
															: "")}
												</li>
											);
										})}
									</ul>
								</td>
								<td>
									<UpdateProducteur
										label={label}
										baseList={bases}
										_id={_id}
										callback={this.fetchProducteurs}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	}

	render() {
		if (this.props.role !== "administrateur") {
			return <Redirect to="/recherche" />;
		}
		return (
			<div className="producteur">
				<CreateProducteur callback={this.fetchProducteurs} />
				<div className="producteurList">{this.renderProducteurs()}</div>
			</div>
		);
	}
}

const mapStateToProps = ({ Auth }) => {
	return { role: Auth.user ? Auth.user.role : "" };
};

export default connect(mapStateToProps, {})(Producteur);
