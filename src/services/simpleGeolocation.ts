export const getSimpleLocation = () => {
  return Promise.resolve({
    lat: 55.7558,
    lon: 37.6173,
  });
};

export const requestSimpleLocationPermission = () => {
  return Promise.resolve(true);
};