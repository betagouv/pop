import React from "react";
import { Link } from "react-router-dom";
import acr from "../../../assets/ACR_Logotype_Noir.png";
import jr from "../../../assets/JR.S.jpg";
import inv from "../../../assets/inventaire.jpg";
import mdi from "../../../assets/logoMDI.png";
import mh from "../../../assets/mh.png";
import { bucket_url } from "../../../config.js";

import utils from "./utils";

function getMemoireImage(memoire) {
	if (!memoire || !memoire.length || !memoire[0].url) {
		return require("../../../assets/noimage.jpg");
	}
	let image = memoire[0].url;

	image = image.indexOf("www") === -1 ? `${bucket_url}${image}` : image;
	return image;
}

export default ({ data }) => {
	const image = getMemoireImage(data.MEMOIRE);

	const productorImage = (p) => {
		if (p === "Inventaire") {
			return <img src={inv} className="producteur" />;
		}if (p === "Monuments Historiques") {
			return <img src={mh} className="producteur mh" />;
		}if (p === "Label Maisons des illustres") {
			return <img src={mdi} className="producteur mdi" />;
		}if (p === "Label Jardin remarquable") {
			return <img src={jr} className="producteur jr" />;
		}if (p === "Label Architecture contemporaine remarquable") {
			return <img src={acr} className="producteur acr" />;
		}
		return <div />;
	};

	const line3 = [];
	if (data.AUTR?.length) {
		line3.push(data.AUTR.join(", "));
	}
	if (data.SCLE?.length) {
		line3.push(data.SCLE.join(", "));
	}

	const line4 = [];
	if (data.STAT) {
		line4.push(data.STAT);
	}
	if (data.DPRO) {
		line4.push(data.DPRO);
	}

	return (
		<Link
			style={{ textDecoration: "none" }}
			to={`/notice/merimee/${data.REF}`}
			className="card"
			key={data.REF}
		>
			<img src={image} alt="Lien cassé" />
			<div className="content">
				<div style={{ display: "flex" }}>
					<h2>{data.TICO}</h2>
					<span>{data.REF}</span>
				</div>
				<div>
					<p>{utils.generateLoca(data)}</p>
					<p>{line3.join(" ; ")}</p>
					<p>{line4.join(" ; ")}</p>
					{productorImage(data.PRODUCTEUR)}
				</div>
			</div>
		</Link>
	);
};
