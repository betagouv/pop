import React from "react";
import { Link } from "react-router-dom";
import mdf from "../../../assets/musee-de-france.png";
import { bucket_url } from "../../../config;
import utils from "./utils";
const castToArray = utils.castToArray;

export default ({ data }) => {
	const image =
		data.IMG != null && data.IMG.length > 0
			? `${bucket_url}${data.IMG[0]}`
			: require("../../../assets/noimage.jpg");

	const loca = joinData([data.VILLE_M, data.NOMOFF]);
	return (
		<Link
			style={{ textDecoration: "none" }}
			to={`/notice/joconde/${data.REF}`}
			className="card"
			key={data.REF}
		>
			<img src={image} alt="Lien cassé" />
			<div className="content">
				<div style={{ display: "flex" }}>
					<h2>{data.TITR}</h2>
					<span>{data.REF}</span>
				</div>
				<div>
					<p>{castToArray(data.DOMN).join(", ")}</p>
					<p>{castToArray(data.DENO).join(", ")}</p>
					<p>{castToArray(data.AUTR).join(" ; ")}</p>
					<p>{castToArray(data.PERI).join(", ")}</p>
					<p>{loca}</p>
					<p>{data.INV}</p>
					<img src={mdf} className="producteur" />
				</div>
			</div>
		</Link>
	);
};

// (witch can be strings, array, array in arrays, etc.)
function withoutEmptyStrings(data) {
	return data
		.map(
			(x) =>
				x &&
				(Array.isArray(x) ? x.join(", ").trim() : String(x).trim()),
		)
		.filter((x) => x);
}
// Takes `[["foo", "bar"], ["foo"], "bar"]`, returns "foo, bar ; foo ; bar"
function joinData(data) {
	return withoutEmptyStrings(data).join(" ; ");
}
