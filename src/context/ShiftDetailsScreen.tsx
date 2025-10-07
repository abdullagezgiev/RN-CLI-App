import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';

interface Props {
  shift: any;
  onBack: () => void;
}

const ShiftDetailsScreen: React.FC<Props> = ({shift, onBack}) => {
  if (!shift) {
    return (
      <View style={styles.centered}>
        <Text>Данные о смене не найдены</Text>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Назад к списку</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Назад к списку</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          {/* Заголовок */}
          <View style={styles.header}>
            {shift.logo && (
              <Image source={{uri: shift.logo}} style={styles.logo} />
            )}
            <View style={styles.titleContainer}>
              <Text style={styles.companyName}>{shift.companyName}</Text>
              <Text style={styles.workType}>{shift.workTypes}</Text>
            </View>
            <Text style={styles.price}>{shift.priceWorker} ₽</Text>
          </View>

          {/* Адрес */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Адрес</Text>
            <Text style={styles.sectionContent}>{shift.address}</Text>
          </View>

          {/* Дата и время */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Дата и время</Text>
            <Text style={styles.sectionContent}>
              {shift.dateStartByCity}
            </Text>
            <Text style={styles.sectionContent}>
              {shift.timeStartByCity} - {shift.timeEndByCity}
            </Text>
          </View>

          {/* Участники */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Участники</Text>
            <Text style={styles.sectionContent}>
              Набрано: {shift.currentWorkers} из {shift.planWorkers} человек
            </Text>
          </View>

          {/* Рейтинг и отзывы */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Рейтинг нанимателя</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>
                ★ {shift.customerRating}/5
              </Text>
              <Text style={styles.reviews}>
                ({shift.customerFeedbacksCount} отзывов)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  workType: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12',
    marginRight: 8,
  },
  reviews: {
    fontSize: 16,
    color: '#666',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ShiftDetailsScreen;