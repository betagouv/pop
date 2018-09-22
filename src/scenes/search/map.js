import React from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';

export default class MapComponent extends React.Component {
    render() {
        return (
            <div className='leaflet-container'>
                <Map center={[48.374428, 1.521518]} zoom={15}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                </Map>
            </div >
        );
    }
}