import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import {useShift} from '../context/ShiftContext';
import ShiftListItem from '../context/ShiftListItem';
import {fetchShifts} from '../services/api';
import {requestLocationPermission, getCurrentPosition} from '../services/geolacation';
import {useNavigation} from '@react-navigation/native';

const ShiftListScreen: React.FC = () => {
  const {state, dispatch} = useShift();
  const navigation = useNavigation();
  const [locationEnabled, setLocationEnabled] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      setLocationEnabled(hasPermission);
      
      if (hasPermission) {
        await loadShiftsWithLocation();
      }
    } catch (error) {
      console.error('Location permission error:', error);
      // Если геолокация не работает, используем координаты по умолчанию
      await loadShiftsWithDefaultLocation();
    }
  };

  const loadShiftsWithLocation = async () => {
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      
      const position = await getCurrentPosition();
      const shifts = await fetchShifts(position.lat, position.lon);
      
      dispatch({type: 'SET_SHIFTS', payload: shifts});
    } catch (error) {
      console.error('Location error:', error);
      // Если геолокация не сработала, используем координаты по умолчанию
      await loadShiftsWithDefaultLocation();
    }
  };

  const loadShiftsWithDefaultLocation = async () => {
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      // Координаты Москвы по умолчанию
      const shifts = await fetchShifts(55.7558, 37.6173);
      dispatch({type: 'SET_SHIFTS', payload: shifts});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Ошибка загрузки смен'});
      Alert.alert('Ошибка', 'Не удалось загрузить список смен');
    }
  };

  const handleRetryLocation = async () => {
    setLocationEnabled(false);
    await checkLocationPermission();
  };

  const handleShiftPress = (shift: any) => {
    navigation.navigate('ShiftDetails', {shift});
  };

  if (!locationEnabled && !state.loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.locationText}>
          Для показа смен поблизости нужен доступ к геолокации
        </Text>
        <Button title="Разрешить геолокацию" onPress={handleRetryLocation} />
        <Button title="Показать смены в Москве" onPress={loadShiftsWithDefaultLocation} />
      </View>
    );
  }

  if (state.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>
          {locationEnabled ? 'Ищем смены поблизости...' : 'Загрузка смен...'}
        </Text>
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{state.error}</Text>
        <Button title="Попробовать снова" onPress={loadShiftsWithDefaultLocation} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {locationEnabled ? 'Смены поблизости' : 'Доступные смены'}
        </Text>
        <Text style={styles.shiftCount}>
          Найдено: {state.shifts.length} смен
        </Text>
      </View>
      
      <FlatList
        data={state.shifts}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({item}) => (
          <ShiftListItem shift={item} onPress={() => handleShiftPress(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>Нет доступных смен в вашем районе</Text>
            <Button title="Показать смены в Москве" onPress={loadShiftsWithDefaultLocation} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  shiftCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default ShiftListScreen;

