import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import { COLORS, VEHICLES_DB } from '../data/mockData';

export default function HomeScreen({ navigation }) {
  const [placa, setPlaca] = useState('');
  const [loading, setLoading] = useState(false);

  function formatPlaca(text) {
    const clean = text.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (clean.length <= 3) return clean;
    return clean.slice(0, 3) + '-' + clean.slice(3, 7);
  }

  function handleChange(text) {
    setPlaca(formatPlaca(text));
  }

  function handleBuscar() {
    const cleaned = placa.replace('-', '').toUpperCase();
    if (cleaned.length < 6) {
      Alert.alert('Placa inválida', 'Digite uma placa válida (ex: ABC-1234)');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const veiculo = VEHICLES_DB[placa] || VEHICLES_DB['ASD-ASDS'];
      navigation.navigate('Vehicle', { veiculo: { ...veiculo, placa: placa || 'ASD-ASDS' } });
    }, 1200);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.container}>

          <View style={styles.iconBox}>
            <Ionicons name="sparkles" size={40} color="#fff" />
          </View>

          <Text style={styles.title}>Encontre seu veículo</Text>
          <Text style={styles.subtitle}>
            Digite a placa para identificar automaticamente o modelo
          </Text>

          <TextInput
            style={styles.input}
            value={placa}
            onChangeText={handleChange}
            placeholder="ABC-1234"
            placeholderTextColor={COLORS.textLight}
            maxLength={8}
            autoCapitalize="characters"
            autoCorrect={false}
            textAlign="center"
            returnKeyType="search"
            onSubmitEditing={handleBuscar}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleBuscar}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <View style={styles.btnContent}>
                <Ionicons name="search" size={20} color="#fff" style={styles.btnIcon} />
                <Text style={styles.buttonText}>Buscar veículo</Text>
              </View>
            )}
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.card,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  iconBox: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 36,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    backgroundColor: COLORS.card,
    letterSpacing: 4,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});