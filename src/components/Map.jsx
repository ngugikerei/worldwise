import styles from './Map.module.css';

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCities } from '../../contexts/CitiesContext';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import Button from './Button';
import { useGeoLocation } from '../../hooks/useGeolocation';
import { useUrlPosition } from '../../hooks/useUrlPostion';

export default function Map() {
  //useNavigate hook for navigating to form element in map
  const navigate = useNavigate();
  const { cities } = useCities();

  const { isPostionLoading, error, geolocationPosition, getPosition } =
    useGeoLocation();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const mapLat = searchParams.get('lat');
  // const mapLng = searchParams.get('lng');

  const { lat, lng } = useUrlPosition();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

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
      {/* use React Leaflet Library to Display Posion on Mao, based on passed co-ordinates */}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {}

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
      </MapContainer>
    </div>
  );
}
