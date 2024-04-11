import styles from './Map.module.css';
//React hooks
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

//Custom Hooks
import { useCities } from '../../contexts/CitiesContext';
import { useGeoLocation } from '../../hooks/useGeolocation';
import { useUrlPosition } from '../../hooks/useUrlPostion';

//React Components
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import Button from './Button';

export default function Map() {
  //useNavigate hook for navigating to form element in map

  const { cities } = useCities();

  const { isPostionLoading, error, geolocationPosition, getPosition } =
    useGeoLocation();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  //Sync your mapPosition state variable to lat,lng variables
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isPostionLoading ? 'Loading...' : '  Use my location'}
        </Button>
      )}
      {/* use React Leaflet Library to  Display Posion on Map, based on passed co-ordinates */}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

//move map to currently seleected city
function ChangeCenter({ position }) {
  //useMap hook gets current instance of map being displayed, from Leaflet
  const map = useMap();
  map.setView(position);
  return null;
}

//Open form when map is clicked
function DetectClick() {
  const navigate = useNavigate();

  // useMapEvents defines different properties fro different map events, takes callback
  useMapEvents({
    click: (e) => {
      //query for getting lat and lng from clicked postion on map
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
