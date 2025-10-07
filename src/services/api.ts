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

// Моковые данные для тестирования, если API не доступно
const mockShifts = [
  {
    id: '1',
    logo: 'https://via.placeholder.com/60',
    address: 'ул. Тверская, 12',
    companyName: 'Ресторан "Вкусно и Точка"',
    dateStartByCity: '2024-10-08',
    timeStartByCity: '09:00',
    timeEndByCity: '18:00',
    currentWorkers: 3,
    planWorkers: 5,
    workTypes: 'Официант',
    priceWorker: 2500,
    customerFeedbacksCount: 45,
    customerRating: 4.7,
  },
  {
    id: '2',
    logo: 'https://via.placeholder.com/60',
    address: 'пр. Мира, 25',
    companyName: 'Кофейня "Утро"',
    dateStartByCity: '2024-10-09',
    timeStartByCity: '08:00',
    timeEndByCity: '17:00',
    currentWorkers: 2,
    planWorkers: 4,
    workTypes: 'Бариста',
    priceWorker: 2000,
    customerFeedbacksCount: 32,
    customerRating: 4.5,
  },
  {
    id: '3',
    logo: 'https://via.placeholder.com/60',
    address: 'ул. Арбат, 44',
    companyName: 'Магазин "Сувениры"',
    dateStartByCity: '2024-10-10',
    timeStartByCity: '10:00',
    timeEndByCity: '19:00',
    currentWorkers: 1,
    planWorkers: 3,
    workTypes: 'Продавец-консультант',
    priceWorker: 1800,
    customerFeedbacksCount: 28,
    customerRating: 4.3,
  },
];

export const fetchShifts = async (lat: number, lon: number) => {
  try {
    console.log('Fetching shifts for coordinates:', lat, lon);
    
    // Пробуем реальный API
    const response = await fetch(
      `https://mobile.handswork.pro/api/shifts?lat=${lat}&lon=${lon}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    
    if (response.ok) {
      const data = await response.json();
      console.log('API response:', data);
      return data;
    } else {
      // Если API не доступно, используем моковые данные
      console.log('API not available, using mock data');
      return mockShifts;
    }
  } catch (error) {
    console.log('API error, using mock data:', error);
    // Возвращаем моковые данные при ошибке
    return mockShifts;
  }
};