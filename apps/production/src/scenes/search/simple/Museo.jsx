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
import { es_url } from "../../../config;
import CollapsableFacet from "../components/CollapsableFacet";
import ExportComponent from "../components/ExportComponent";
import Header from "../components/Header";
import Card from "../components/MuseoCard";
import utils from "../components/utils";

export default function render(props) {
	const initialValues = fromUrlQueryString(
		window.location.search.replace(/^\?/, ""),
	);
	return (
		<Container className="search">
			<Header base="museo" normalMode={true} />
			<Elasticsearch
				url={`${es_url}/museo`}
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
						placeholder="Saisissez un nom ou une référence"
						initialValue={initialValues.get("main")}
						customQuery={(value) =>
							utils.customQuery(value, ["NOMOFF", "REF"])
						}
						BtnComponent={utils.customSearchBtn}
					/>
					<p>{props.message}</p>
				</div>
				<Row>
					<Col xs="3">
						<CollapsableFacet
							id="nom"
							initialValue={initialValues.get("nom")}
							fields={["NOMOFF.keyword", "NOMUSAGE.keyword"]}
							title="Nom du musée"
						/>

						<CollapsableFacet
							id="dpt"
							initialValue={initialValues.get("dpt")}
							fields={["DPT.keyword", "DPT_LETTRE.keyword"]}
							title="Département"
						/>
						<CollapsableFacet
							id="ville"
							initialValue={initialValues.get("ville")}
							fields={["VILLE_M.keyword"]}
							title="Ville"
						/>
						<CollapsableFacet
							id="dompal"
							initialValue={initialValues.get("dompal")}
							fields={["DOMPAL.keyword"]}
							title="Thématiques principales"
						/>
						<CollapsableFacet
							id="cate"
							initialValue={initialValues.get("cate")}
							fields={["CATEG.keyword"]}
							title="Catégorie du musée"
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
							collection="museo"
							target="main"
							header={false}
						/>
					</Col>
				</Row>
			</Elasticsearch>
		</Container>
	);
}
