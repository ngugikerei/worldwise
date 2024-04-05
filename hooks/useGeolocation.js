import { useState } from 'react';

export function useGeoLocation(defaultPosition = null) {
  const [isPostionLoading, setIsLoading] = useState(false);
  const [geolocationPosition, setGeoLocationPosition] =
    useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLocationPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return {
    isPostionLoading,
    error,
    geolocationPosition,
    getPosition,
  };
}
