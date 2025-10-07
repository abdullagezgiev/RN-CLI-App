export const fetchShifts = async (lat: number, lon: number) => {
  try {
    // Временно используем хардкод координат вместо геолокации
    const response = await fetch(
      `https://mobile.handswork.pro/api/shifts?lat=${lat}&lon=${lon}`,
    );
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch shifts');
  }
};