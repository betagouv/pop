import React from "react";
import { Link } from "react-router-dom";
import mdf from "../../../assets/musee-de-france.png";
import { bucket_url } from "../../../config";

export default ({ data }) => {
	const image = data.PHOTO
		? `${bucket_url}${data.PHOTO}`
		: require("../../../assets/noimage.jpg");
	const LogoComponent =
		"MUSEE" === data.PRODUCTEUR ? (
			<img src={mdf} className="producteur" />
		) : (
			<div />
		);

	return (
		<Link
			style={{ textDecoration: "none" }}
			className="card"
			to={`/notice/museo/${data.REF}`}
		>
			<img src={image} alt="Lien cassé" />
			<div className="content">
				<div style={{ display: "flex" }}>
					<h2>{data.NOMUSAGE || data.NOMOFF}</h2>
					<span>{data.REF}</span>
				</div>
				<div>
					<p>
						{data.VILLE_M} ({data.DPT}, {data.REGION})
					</p>
					<p>{data.CATEG}</p>
					<p>
						{Array.isArray(data.DOMPAL)
							? data.DOMPAL.join(" ; ")
							: data.DOMPAL}
					</p>
					{LogoComponent}
				</div>
			</div>
		</Link>
	);
};
