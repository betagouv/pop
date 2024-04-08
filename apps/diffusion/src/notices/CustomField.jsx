import { Link, Text, View } from "@react-pdf/renderer";
import queryString from "query-string";
import React from "react";
import { styles } from "../pdf/pdfNotice/styles";

export function renderFieldRepr(title, str) {
	return (
		<div id={title} className="field">
			<h3>{title}</h3>

			{str}

			<style jsx global>{`
            .field {
              padding-bottom: 10px;
            }
  
            .field p {
              font-weight: normal;
              font-size: 1rem;
              word-wrap: break-word;
              white-space: pre-line;
              margin-bottom: 0px;
              text-align: justify;
            }
  
            .field h3 {
              font-size: 1rem;
              font-weight: 700;
              line-height: 1.5;
              color: #19414cd0;
              text-align: left;
              padding-right: 7px;
              margin-bottom: 3px;
            }
          `}</style>
		</div>
	);
}

// Champ REPR pour les PDFS
export function TextFieldReprPdf(value) {
	const pattern = /[(),;:]/g; // pattern des caractères séparateurs (ancienne version maintenue pour gérer les cas présent en base de données)
	const cleanPattern = /[(),:]/g; // Pattern pour supprimer les caractères séparateurs de l'affichage
	const regExp = new RegExp(pattern);

	// Mise en forme des valeurs au format string
	let strValue = "";
	if (Array.isArray(value.content)) {
		strValue = value.content.map((el) => el.trim()).join(";");
	} else {
		return null;
	}

	const links = [];
	// Préparation des object urls pour la création des liens
	value.content.forEach((v) => {
		// Si la valeur contient des caractères séparateur
		if (regExp.test(v)) {
			v.split(pattern).forEach((vs) => {
				vs = vs.trim();
				if ("" !== vs) {
					links.push(prepareLinksRepr(vs));
				}
			});
			// Suppression des caractères séparateurs dans la chaine.
			strValue = strValue.replace(cleanPattern, ";");
		} else {
			links.push(prepareLinksRepr(v.trim()));
		}
	});

	const objVal = {};

	// Création des liens pour chaque valeur
	if (Array.isArray(links)) {
		links.forEach((item, index) => {
			if (item?.val && item.val.trim() !== "") {
				objVal[item.val.replace("#", "").trim()] = (
					<View style={styles.listReprLinked} debug={true}>
						<Link
							style={styles.listReprLinked}
							key={`repr-${index}`}
							src={item.url ? item.url : item}
							debug={true}
						>
							<a href={item.url} target="_blank" rel="noreferrer">
								{<Text>{item.val.trim()}</Text>}
							</a>
						</Link>
						<Text>&nbsp;; </Text>
					</View>
				);
			}
		});
	}

	// Découpage de la chaine pour la gestion du retour à la ligne
	const splitValue = strValue
		.split("#")
		.map((el) => el.trim())
		.filter((el) => el !== "");

	const renderField = splitValue.map((v) => {
		const values = [];
		v.split(";").forEach((el) => {
			el = el.trim();
			if (el && el !== "") {
				values.push(objVal[el]);
			}
		});

		if (values.length > 0) {
			return <Text>{values}</Text>;
		}
	});

	return (
		<View style={styles.listReprLinked}>
			<Text style={styles.fieldTitle}>{`${value.title} : `}</Text>
			{renderField}
		</View>
	);
}

function prepareLinksRepr(value) {
	const name = "repr";
	value = value.replace("#", ""); // Suppression du caractère # pour l'affichage, celui-ci indique le retour à la ligne
	return {
		url: `https://www.pop.culture.gouv.fr/search/list?${queryString.stringify(
			{ [name]: JSON.stringify([value]) },
		)}`,
		val: value,
	};
}
