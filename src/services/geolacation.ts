import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const result = await Geolocation.requestAuthorization('whenInUse');
    return result === 'granted';
  } catch (error) {
    console.error('Location permission error:', error);
    return false;
  }
};

export const getCurrentPosition = (): Promise<{lat: number; lon: number}> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  });
};