import { ActiveFilters } from "@popproject/pop-react-elasticsearch";
import React from "react";
import { Badge } from "reactstrap";

const MobileFilters = ({ openMenu }) => (
	<div className="filter_mobile_menu" onClick={openMenu}>
		<ActiveFilters
			id="af"
			items={(activeFilters) => (
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<img src="/static/filter.png" />
					<Badge color="secondary">{activeFilters.length}</Badge>
				</div>
			)}
		/>
	</div>
);

export default MobileFilters;
