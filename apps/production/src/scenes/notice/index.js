import React from "react";
import { Route, Switch } from "react-router-dom";
import Autor from "./autor";
import Enluminures from "./enluminures";
import Joconde from "./joconde";
import Memoire from "./memoire";
import Merimee from "./merimee";
import Mnr from "./mnr";
import Museo from "./museo";
import Palissy from "./palissy";

import "./index.css";

export default () => {
	return (
		<div>
			<Switch>
				<Route path={`/notice/merimee/:ref`} component={Merimee} />
				<Route path={`/notice/palissy/:ref`} component={Palissy} />
				<Route path={`/notice/mnr/:ref`} component={Mnr} />
				<Route path={`/notice/joconde/:ref`} component={Joconde} />
				<Route path={`/notice/memoire/:ref`} component={Memoire} />
				<Route path={`/notice/museo/:ref`} component={Museo} />
				<Route path={`/notice/autor/:ref`} component={Autor} />
				<Route
					path={`/notice/enluminures/:ref`}
					component={Enluminures}
				/>
			</Switch>
		</div>
	);
};
