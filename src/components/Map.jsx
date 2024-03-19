import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import { map } from 'leaflet';

export default function Map() {
  //useNavigate hook for navigating to form element in map
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([
    -1.197371574164711, 36.95321764162344,
  ]);

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer}>
      {/* use React Leaflet Library to Display Posion on Mao, based on passed co-ordinates */}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
