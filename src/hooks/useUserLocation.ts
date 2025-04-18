import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export function useUserLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission not granted');
        return;
      }

      const current = await Location.getCurrentPositionAsync({});
      setLocation(current);
    })();
  }, []);

  return { location, error };
}
