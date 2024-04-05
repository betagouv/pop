import React from "react";
import { Route, Switch } from "react-router-dom";

import Autor from "./Autor";
import Enluminures from "./Enluminures";
import Home from "./Home";
import Joconde from "./Joconde";
import Memoire from "./Memoire";
import Merimee from "./Merimee";
import Mnr from "./Mnr";
import Museo from "./Museo";
import Palissy from "./Palissy";

import "../search.css";
import "./index.css";

const search_message = "Cliquez sur la loupe pour lancer la recherche";

export default () => {
	return (
		<div>
			<Switch>
				<Route path={`/recherche/`} exact component={Home} />
				<Route
					path={`/recherche/merimee`}
					component={() => <Merimee message={search_message} />}
				/>
				<Route
					path={`/recherche/palissy`}
					component={() => <Palissy message={search_message} />}
				/>
				<Route
					path={`/recherche/mnr`}
					component={() => <Mnr message={search_message} />}
				/>
				<Route
					path={`/recherche/joconde`}
					component={() => <Joconde message={search_message} />}
				/>
				<Route
					path={`/recherche/memoire`}
					component={() => <Memoire message={search_message} />}
				/>
				<Route
					path={`/recherche/museo`}
					component={() => <Museo message={search_message} />}
				/>
				<Route
					path={`/recherche/autor`}
					component={() => <Autor message={search_message} />}
				/>
				<Route
					path={`/recherche/enluminures`}
					component={() => <Enluminures message={search_message} />}
				/>
			</Switch>
		</div>
	);
};
