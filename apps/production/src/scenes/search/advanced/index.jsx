import React from "react";
import { Route, Switch } from "react-router-dom";
import AutorCard from "../components/AutorCard";
import EnluminuresCard from "../components/EnluminuresCard";
import JocondeCard from "../components/JocondeCard";
import MemoireCard from "../components/MemoireCard";
import MerimeeCard from "../components/MerimeeCard";
import MnrCard from "../components/MnrCard";
import MuseoCard from "../components/MuseoCard";
import PalissyCard from "../components/PalissyCard";
import "../simple/index.css";
import AdvancedSearch from "./AdvancedSearch";

export default () => {
	return (
		<div>
			<Switch>
				<Route
					path={"/recherche-avancee/palissy"}
					component={() => (
						<AdvancedSearch
							collection="palissy"
							card={(s, _s, id) => (
								<PalissyCard key={id} data={s} />
							)}
						/>
					)}
				/>
				<Route
					path={"/recherche-avancee/merimee"}
					component={() => (
						<AdvancedSearch
							collection="merimee"
							card={(s, _s, id) => (
								<MerimeeCard key={id} data={s} />
							)}
						/>
					)}
				/>
				<Route
					path={"/recherche-avancee/mnr"}
					component={() => (
						<AdvancedSearch
							collection="mnr"
							card={(s, _s, id) => <MnrCard key={id} data={s} />}
						/>
					)}
				/>
				<Route
					path={"/recherche-avancee/joconde"}
					component={() => (
						<AdvancedSearch
							collection="joconde"
							card={(s, _s, id) => (
								<JocondeCard key={id} data={s} />
							)}
						/>
					)}
				/>
				<Route
					path={"/recherche-avancee/memoire"}
					component={() => (
						<AdvancedSearch
							collection="memoire"
							card={(s, _s, id) => (
								<MemoireCard key={id} data={s} />
							)}
						/>
					)}
				/>
				<Route
					path={"/recherche-avancee/museo"}
					component={() => (
						<AdvancedSearch
							collection="museo"
							card={(s, _s, id) => (
								<MuseoCard key={id} data={s} />
							)}
						/>
					)}
				/>
				<Route
					path={"/recherche-avancee/enluminures"}
					component={() => (
						<AdvancedSearch
							collection="enluminures"
							card={(s, _s, id) => (
								<EnluminuresCard key={id} data={s} />
							)}
						/>
					)}
				/>
				<Route
					path={"/recherche-avancee/autor"}
					component={() => (
						<AdvancedSearch
							collection="autor"
							card={(s, _s, id) => (
								<AutorCard key={id} data={s} />
							)}
						/>
					)}
				/>
			</Switch>
		</div>
	);
};
