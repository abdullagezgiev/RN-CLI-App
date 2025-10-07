// src/screens/ShiftListScreen.tsx
import React, {useEffect} from 'react';
import {
  View,Text,FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import {useShift} from '../context/ShiftContext';
import ShiftListItem from '../context/ShiftListItem';
import {fetchShifts} from '../services/api';
import {useNavigation} from '@react-navigation/native';

const ShiftListScreen: React.FC = () => {
  const {state, dispatch} = useShift();
  const navigation = useNavigation();

  useEffect(() => {
    loadShifts();
  }, []);

  const loadShifts = async () => {
    try {
      dispatch({type: 'SET_LOADING', payload: true});
      
      // Используем координаты по умолчанию (Москва)
      const shifts = await fetchShifts(55.7558, 37.6173);
      
      dispatch({type: 'SET_SHIFTS', payload: shifts});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Ошибка загрузки смен'});
      Alert.alert('Ошибка', 'Не удалось загрузить список смен');
    }
  };

  const handleShiftPress = (shift: any) => {
    navigation.navigate('ShiftDetails', {shift});
  };

  if (state.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Загрузка смен...</Text>
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{state.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Доступные смены</Text>
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
            <Text style={styles.emptyText}>Нет доступных смен</Text>
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
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ShiftListScreen;

