import { Facet } from "@popproject/pop-react-elasticsearch";
import React, { useState } from "react";
import utils from "../components/utils";

export default function CollapsableFacet({ initialCollapsed, title, ...rest }) {
	initialCollapsed = initialCollapsed !== undefined ? initialCollapsed : true;
	initialCollapsed = !(rest.initialValue?.length);
	const [collapsed, setCollapsed] = useState(initialCollapsed);

	function FacetWrapper() {
		if (!collapsed) {
			return (
				<Facet
					{...rest}
					seeMore="Voir plus…"
					filterValueModifier={(v) => `.*${utils.toFrenchRegex(v)}.*`}
					placeholder={"Filtrer…"}
					itemsPerBlock={10}
				/>
			);
		}
		return <div />;
	}
	return (
		<div className="collapsable-facet">
			<div
				className="collapsable-facet-title"
				onClick={() => setCollapsed(!collapsed)}
			>
				{title}
				<button>⌄</button>
			</div>
			{FacetWrapper()}
		</div>
	);
}
