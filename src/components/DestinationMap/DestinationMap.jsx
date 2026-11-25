
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from 'react-leaflet';

import { MapPin } from 'lucide-react';

import 'leaflet/dist/leaflet.css';
import './DestinationMap.css';

const DestinationMap = ({ name, latitude, longitude }) => {
    const lat = Number(latitude);
    const lon = Number(longitude);

    const hasValidCoordinates =
        latitude !== '' &&
        longitude !== '' &&
        latitude !== null &&
        longitude !== null &&
        Number.isFinite(lat) &&
        Number.isFinite(lon) &&
        lat >= -90 &&
        lat <= 90 &&
        lon >= -180 &&
        lon <= 180;

    if (!hasValidCoordinates) {
        return (
            <section className="destination-map-section">
                <div className="destination-map-header">
                    <span className="destination-map-label">
                        LOCATION
                    </span>

                    <h2>Explore {name} on the Map</h2>

                    <p>
                        Map information is currently unavailable
                        for this destination.
                    </p>
                </div>

                <div className="destination-map-container">
                    <div className="destination-map-error">
                        <MapPin size={35} />
                        <p>Location coordinates are unavailable.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="destination-map-section">
            <div className="destination-map-header">
                <span className="destination-map-label">
                    LOCATION
                </span>

                <h2>Explore {name} on the Map</h2>

                <p>
                    Explore the geographical location of {name}.
                    You can zoom in, zoom out and move around the map.
                </p>
            </div>

            <div className="destination-map-container">
                <MapContainer
                    center={[lat, lon]}
                    zoom={12}
                    scrollWheelZoom={true}
                    className="destination-leaflet-map"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[lat, lon]}>
                        <Popup>
                            <strong>{name}</strong>
                            <br />
                            Explore this destination!
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </section>
    );
};

export default DestinationMap;
