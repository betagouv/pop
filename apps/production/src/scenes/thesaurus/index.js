import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import Loader from "../../components/Loader";
import api from "../../services/api";

import "./index.css";

export default function ThesaurusComponent() {
	const [loading, setLoading] = useState(true);
	const [lastUpdate, setLastUpdate] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			console.log("fetch thesaurus");
			try {
				const res = await api.getLastThesaurusUpdate();
				setLastUpdate(new Date(res.lastUpdate));
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) {
		return (
			<div className="import-container">
				<Container>
					<Loader />
				</Container>
			</div>
		);
	}

	return (
		<Container className="thesaurus" style={{ marginTop: 12 }}>
			{loading && <Loader />}
			{error != null && <div>{error}</div>}
			{lastUpdate != null && (
				<div>
					Dernière mise à jour:{" "}
					{format(lastUpdate, "PPP", { locale: fr })}
				</div>
			)}
		</Container>
	);
}
