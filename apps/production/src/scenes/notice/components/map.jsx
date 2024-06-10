import React from "react";
import MapContainer, {
	Marker,
	Popup,
	AttributionControl,
	Source,
	Layer,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import "./map.css";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useMapStore = create(
	devtools((set) => ({
		popupOpen: false,

		togglePopup: (value) =>
			set(
				(state) => {
					console.log("togglePopup", state.popupOpen);
					return { popupOpen: value };
				},
				false,
				"togglePopup",
			),
	})),
);

function NoticePopup({ lat, lon, TICO, DENO }) {
	const { popupOpen: open, togglePopup } = useMapStore();

	if (!open) return <></>;

	return (
		<Popup
			latitude={lat}
			longitude={lon}
			anchor="top"
			closeOnClick={false}
			closeOnMove={false}
			onClose={() => {
				togglePopup(false);
			}}
		>
			<span>
				{TICO}
				<br />
				{DENO}
			</span>
		</Popup>
	);
}

function NoticeMarker({ lat, lon }) {
	const togglePopup = useMapStore((state) => state.togglePopup);

	return (
		<Marker
			latitude={lat}
			longitude={lon}
			onClick={() => {
				console.log("on click");
				togglePopup(true);
			}}
			anchor="bottom"
			color="#4782c5"
		/>
	);
}

function NoticeGeometry({ notice }) {
	return (
		<Source
			id="notice-polygon"
			type="geojson"
			data={{
				type: "Feature",
				geometry: {
					type: "Polygon",
					coordinates: [
						notice.POP_COORDINATES_POLYGON.coordinates.map(
							(coord) => [coord[1], coord[0]],
						),
					],
				},
			}}
		>
			<Layer
				id="data"
				source="notice-polygon"
				type="fill"
				paint={{
					"fill-color": "purple",
				}}
			/>
		</Source>
	);
}

function isLatitude(lat) {
	return Number.isFinite(lat) && lat !== 0 && Math.abs(lat) <= 90;
}

function isLongitude(lng) {
	return Number.isFinite(lng) && lng !== 0 && Math.abs(lng) <= 180;
}

function isGeometry(notice) {
	if (
		!notice.POP_COORDINATES_POLYGON ||
		!notice.POP_COORDINATES_POLYGON.coordinates ||
		!notice.POP_COORDINATES_POLYGON.coordinates.length
	) {
		return false;
	}
	return true;
}

function getCenter(notice) {
	if (notice.POP_CONTIENT_GEOLOCALISATION !== "oui") {
		return null;
	}

	const { POP_COORDONNEES, POP_COORDINATES_POLYGON } = notice;
	if (
		POP_COORDONNEES &&
		isLatitude(POP_COORDONNEES.lat) &&
		isLongitude(POP_COORDONNEES.lon)
	) {
		return [notice.POP_COORDONNEES.lat, notice.POP_COORDONNEES.lon];
	}

	if (POP_COORDINATES_POLYGON?.coordinates?.length) {
		return POP_COORDINATES_POLYGON.coordinates[0];
	}

	return null;
}

function NoticeMapContent({ notice }) {
	const center = getCenter(notice);

	if (center == null) {
		return <div>Carte non disponible</div>;
	}

	return (
		<div className="leaflet-parent-container">
			<MapContainer
				mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
				initialViewState={{
					latitude: center[0],
					longitude: center[1],
					zoom: 13,
				}}
				attributionControl={false}
			>
				{isGeometry(notice) ? (
					<NoticeGeometry notice={notice} />
				) : (
					<NoticeMarker
						lat={notice.POP_COORDONNEES.lat}
						lon={notice.POP_COORDONNEES.lon}
					/>
				)}

				<NoticePopup
					lat={notice.POP_COORDONNEES.lat}
					lon={notice.POP_COORDONNEES.lon}
					TICO={notice.TICO}
					DENO={notice.DENO}
				/>

				<AttributionControl
					customAttribution={["OpenStreetMap", "Etalab", "MapLibre"]}
				/>
			</MapContainer>
		</div>
	);
}

export default function NoticeMap({ notice }) {
	if (!notice) {
		return <></>;
	}

	return <NoticeMapContent notice={notice} />;
}
