import { View, Text, ScrollView, StyleSheet, Image, Linking } from 'react-native'
import React from 'react'
import { Shift } from './ShiftContext';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    ShiftDetails: {shift: Shift};
};

type ShiftDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ShiftDetails'>;

interface Props {
    route: ShiftDetailsScreenRouteProp;
}

const ShiftDetailsScreen: React.FC<any> = ({route}) => {
    const {shift} = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                {/* Заголовок */}
                <View style={styles.header}>
                    {shift.logo && (
                        <Image source={{uri: shift.logo}} style={styles.logo}/>
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

                {/* Кнопка действия */}
                <View style={styles.actionSection}>
                    <Text
                      style={styles.actionButton}
                      onPress={() => Linking.openURL('tel:+79999999999')}  
                    >
                        📞 Позвонить для записи    
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  actionSection: {
    marginTop: 10,
  },
  actionButton: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
  },
});

export default ShiftDetailsScreen;