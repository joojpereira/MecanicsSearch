import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import { COLORS } from '../data/mockData';

export default function VehicleScreen({ route, navigation }) {
  const { veiculo } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader showBack onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>

        {/* Card azul - Veículo identificado */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="checkmark-circle" size={18} color="#fff" />
            <Text style={styles.cardHeaderText}>Veículo identificado</Text>
          </View>

          <View style={styles.cardBody}>
            <View style={styles.carIconBox}>
              <Ionicons name="car-outline" size={32} color="#fff" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.marca}>{veiculo.marca}</Text>
              <Text style={styles.modelo}>{veiculo.modelo} {veiculo.combustivel}</Text>
            </View>
          </View>

          <View style={styles.placaBadge}>
            <Text style={styles.placaText}>{veiculo.placa}</Text>
          </View>
        </View>

        {/* Especificações */}
        <View style={styles.specsCard}>
          <Text style={styles.specsTitle}>Especificações</Text>
          <View style={styles.specsGrid}>

            <View style={styles.specItem}>
              <Ionicons name="calendar-outline" size={22} color={COLORS.textSecondary} />
              <View style={styles.specTexts}>
                <Text style={styles.specLabel}>Ano</Text>
                <Text style={styles.specValue}>{veiculo.ano}</Text>
              </View>
            </View>

            <View style={styles.specItem}>
              <Ionicons name="speedometer-outline" size={22} color={COLORS.textSecondary} />
              <View style={styles.specTexts}>
                <Text style={styles.specLabel}>Motor</Text>
                <Text style={styles.specValue}>{veiculo.motor}</Text>
              </View>
            </View>

            <View style={styles.specItem}>
              <Ionicons name="flame-outline" size={22} color={COLORS.textSecondary} />
              <View style={styles.specTexts}>
                <Text style={styles.specLabel}>Combustível</Text>
                <Text style={styles.specValue}>{veiculo.combustivel}</Text>
              </View>
            </View>

            <View style={styles.specItem}>
              <Ionicons name="ellipse-outline" size={22} color={COLORS.textSecondary} />
              <View style={styles.specTexts}>
                <Text style={styles.specLabel}>Cor</Text>
                <Text style={styles.specValue}>{veiculo.cor}</Text>
              </View>
            </View>

          </View>
        </View>

        {/* Botão */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Parts', { veiculo })}
        >
          <Text style={styles.buttonText}>Ver peças compatíveis</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 20,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  cardHeaderText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 14,
  },
  carIconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  marca: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  modelo: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.85,
    marginTop: 2,
  },
  placaBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  placaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 2,
  },
  specsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
  },
  specsTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    gap: 10,
  },
  specTexts: {
    flex: 1,
  },
  specLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  specValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    colorText: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
