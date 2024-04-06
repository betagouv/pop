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
import Card from "../components/AutorCard";
import CollapsableFacet from "../components/CollapsableFacet";
import ExportComponent from "../components/ExportComponent";
import Header from "../components/Header";
import utils from "../components/utils";

export default function render(props) {
	const initialValues = fromUrlQueryString(
		window.location.search.replace(/^\?/, ""),
	);
	return (
		<Container className="search">
			<Header base="autor" normalMode={true} />
			<Elasticsearch
				url={`${es_url}/autor`}
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
							utils.customQuery(value, ["NAME", "REF"])
						}
						BtnComponent={utils.customSearchBtn}
					/>
					<p>{props.message}</p>
				</div>
				<Row>
					<Col xs="3">
						<CollapsableFacet
							id="fonc"
							initialValue={initialValues.get("fonc")}
							fields={["FONC.keyword"]}
							title="Fonction"
						/>
						<CollapsableFacet
							id="typid"
							initialValue={initialValues.get("typid")}
							fields={["TYPID.keyword"]}
							title="Type"
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
						<ExportComponent collection="autor" target="main" />
					</Col>
				</Row>
			</Elasticsearch>
		</Container>
	);
}
