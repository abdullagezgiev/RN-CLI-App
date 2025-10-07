import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Shift} from '../context/ShiftContext';

interface ShiftListItemProps {
  shift: Shift;
  onPress: () => void;
}

const ShiftListItem: React.FC<ShiftListItemProps> = ({shift, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        {shift.logo && (
          <Image source={{uri: shift.logo}} style={styles.logo} />
        )}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{shift.companyName}</Text>
          <Text style={styles.workType}>{shift.workTypes}</Text>
        </View>
        <Text style={styles.price}>{shift.priceWorker} ₽</Text>
      </View>
      
      <Text style={styles.address}>{shift.address}</Text>
      
      <View style={styles.details}>
        <Text style={styles.date}>
          {shift.dateStartByCity} • {shift.timeStartByCity} - {shift.timeEndByCity}
        </Text>
        <Text style={styles.workers}>
          {shift.currentWorkers}/{shift.planWorkers} человек
        </Text>
      </View>
      
      <View style={styles.rating}>
        <Text style={styles.ratingText}>
          ★ {shift.customerRating} ({shift.customerFeedbacksCount} отзывов)
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  companyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#333',
  },
  workers: {
    fontSize: 14,
    color: '#333',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#f39c12',
  },
});

export default ShiftListItem;