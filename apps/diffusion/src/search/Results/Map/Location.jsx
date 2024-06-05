import React, { Component } from "react";
import { throttle, isEmpty } from "lodash";
import api from "../../../services/api";

class Location extends Component {
	state = {
		loaded: false,
		query: "",
		searchResults: [],
	};

	async searchPlaces(query) {
		const data = await api.searchPlaces(query);
		console.log(data);
		this.setState({ searchResults: data.features });
	}

	async onChangeQuery(query) {
		this.setState({ query });
		throttle(async () => this.searchPlaces(query), 500)();
	}

	async goToPlace(place) {
		this.props.setPosition(place.geometry.coordinates);
		this.setState({ query: "", searchResults: [] });
	}

	render() {
		return (
			this.props.ready && (
				<div>
					<div className="location">
						<div>
							<input
								id="query-input"
								type="text"
								value={this.state.query}
								onChange={(ev) =>
									this.onChangeQuery(ev.target.value)
								}
								placeholder="Entrez une ville ou une adresse"
							/>
						</div>
						<div
							className="location-target-icon"
							onClick={() => {
								navigator.geolocation.getCurrentPosition(
									(location) => {
										this.props.setPosition([
											location.coords.longitude,
											location.coords.latitude,
										]);
									},
								);
							}}
						/>
						<div
							className="location-home-icon"
							onClick={() => {
								this.props.setPosition(
									[2.515597, 46.856731],
									5,
									false,
								);
							}}
						/>

						{!isEmpty(this.state.query) && (
							<div className="location-search-results">
								{this.state.searchResults.map((result) => (
									<button
										type="button"
										key={result.id}
										className="location-search-results-result"
										onClick={() => this.goToPlace(result)}
									>
										{result.properties.label}
									</button>
								))}

								{this.state.searchResults.length === 0 && (
									<div>Pas de résultats</div>
								)}
							</div>
						)}
					</div>
				</div>
			)
		);
	}
}

export default Location;
