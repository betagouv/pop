import {
	ActiveFilters,
	Elasticsearch,
	Results,
	SearchBox,
	fromUrlQueryString,
	toUrlQueryString,
} from "@popproject/pop-react-elasticsearch";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { es_url } from "../../../config";
import CollapsableFacet from "../components/CollapsableFacet";
import ExportComponent from "../components/ExportComponent";
import Header from "../components/Header";
import Card from "../components/MerimeeCard";
import utils from "../components/utils";

export default function render(props) {
	const initialValues = fromUrlQueryString(
		window.location.search.replace(/^\?/, ""),
	);
	return (
		<Container className="search">
			<Header base="merimee" normalMode={true} />
			<Elasticsearch
				url={`${es_url}/merimee`}
				onChange={(params) => {
					const q = toUrlQueryString(params);
					if (q) {
						window.history.replaceState("x", "y", `?${q}`);
					}
				}}
			>
				<div>
					<SearchBox
						id="main"
						placeholder="Référence, titre de l'édifice, commune, région, adresse, date de protection, description"
						initialValue={initialValues.get("main")}
						customQuery={(value) =>
							utils.customQuery(value, [
								"COM",
								"REG",
								"TICO",
								"DPRO",
								"HIST",
								"DESC",
								"ADRS",
								"EDIF",
							])
						}
						BtnComponent={utils.customSearchBtn}
					/>
					<p>{props.message}</p>
				</div>
				<Row>
					<Col xs="3">
						<CollapsableFacet
							id="denomination"
							initialValue={initialValues.get("denomination")}
							fields={["DENO.keyword"]}
							title="Dénominations"
						/>
						<CollapsableFacet
							id="producteur"
							initialValue={initialValues.get("producteur")}
							fields={["PRODUCTEUR.keyword"]}
							title="Producteur"
						/>
						<CollapsableFacet
							id="auteurs"
							initialValue={initialValues.get("auteurs")}
							fields={["AUTR.keyword"]}
							title="Auteurs"
						/>
						<CollapsableFacet
							id="region"
							initialValue={initialValues.get("region")}
							fields={["REG.keyword"]}
							title="Régions"
						/>
						<CollapsableFacet
							id="departement"
							initialValue={initialValues.get("departement")}
							fields={["DPT.keyword", "DPT_LETTRE.keyword"]}
							title="Départements"
						/>
						<CollapsableFacet
							id="commune"
							initialValue={initialValues.get("commune")}
							fields={["COM.keyword"]}
							title="Communes"
						/>
						<CollapsableFacet
							id="image"
							initialValue={initialValues.get("image")}
							fields={["CONTIENT_IMAGE.keyword"]}
							title="Contient une image"
						/>
						<CollapsableFacet
							id="location"
							initialValue={initialValues.get("location")}
							fields={["POP_CONTIENT_GEOLOCALISATION.keyword"]}
							title="Contient une localisation"
						/>
					</Col>
					<Col xs="9">
						<ActiveFilters id="af" />
						<Results
							initialPage={initialValues.get("resPage")}
							id="res"
							items={(data) =>
								data.map(({ _source, _id }) => (
									<Card key={_id} data={_source} />
								))
							}
							pagination={utils.pagination}
							stats={(total) => (
								<div>
									{total} résultat{total === 1 ? "" : "s"}
								</div>
							)}
						/>
						<ExportComponent
							collection="merimee"
							target="main"
							header={true}
						/>
					</Col>
				</Row>
			</Elasticsearch>
		</Container>
	);
}
