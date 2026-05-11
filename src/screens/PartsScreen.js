import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../components/AppHeader';
import { COLORS } from '../data/mockData';

// ─────────────────────────────────────────────
// TODO: substituir por dados reais do banco/API
// ─────────────────────────────────────────────
const MOCK_PARTS = [
  {
    id: '1',
    nome: 'Filtro de Óleo Mann W...',
    marca: 'Mann Filter',
    codigo: 'W719/30',
    preco: 45.9,
    mercados: 5,
  },
  {
    id: '2',
    nome: 'Filtro de Ar Condicion...',
    marca: 'Mahle',
    codigo: 'LA443',
    preco: 52.9,
    mercados: 3,
  },
];
// ─────────────────────────────────────────────

export default function PartsScreen({ route, navigation }) {
  // TODO: receber veiculo via route.params quando integrar navegação
  const veiculo = route?.params?.veiculo || {
    marca: 'Volkswagen',
    modelo: 'Gol 1.0 Flex',
    placa: 'ASD-ASDS',
  };

  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);

  // TODO: integrar com IA e banco de dados aqui
  const pecasFiltradas = MOCK_PARTS.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.marca.toLowerCase().includes(busca.toLowerCase())
  );

  function renderPeca({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardIcon}>
          <Ionicons name="cube-outline" size={28} color={COLORS.textSecondary} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardNome} numberOfLines={1}>{item.nome}</Text>
          <Text style={styles.cardMarca}>{item.marca} • {item.codigo}</Text>
          <Text style={styles.cardPreco}>A partir de R$ {item.preco.toFixed(2)}</Text>
          <View style={styles.cardFooter}>
            <Ionicons name="storefront-outline" size={13} color={COLORS.textSecondary} />
            <Text style={styles.cardMercados}>{item.mercados} mercados</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.compararBtn}>
          <Text style={styles.compararText}>Comparar</Text>
          <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader showBack onBack={() => navigation.goBack()} />

      <View style={styles.container}>

        {/* Barra de busca */}
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar peça..."
            placeholderTextColor={COLORS.textLight}
            autoCorrect={false}
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Info do veículo */}
        <View style={styles.veiculoInfo}>
          <View>
            <Text style={styles.veiculoLabel}>Buscando peças para</Text>
            <Text style={styles.veiculoNome}>{veiculo.marca} {veiculo.modelo}</Text>
          </View>
          <View style={styles.placaBadge}>
            <Text style={styles.placaText}>{veiculo.placa}</Text>
          </View>
        </View>

        {/* Contador */}
        {loading ? (
          <ActivityIndicator color={COLORS.primary} style={{ marginVertical: 12 }} />
        ) : (
          <Text style={styles.contador}>{pecasFiltradas.length} peças encontradas</Text>
        )}

        {/* Lista de peças */}
        <FlatList
          data={pecasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={renderPeca}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="search-outline" size={40} color={COLORS.textLight} />
              <Text style={styles.emptyText}>Nenhuma peça encontrada</Text>
            </View>
          }
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // Search
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
  },

  // Veículo info
  veiculoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  veiculoLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  veiculoNome: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  placaBadge: {
    backgroundColor: COLORS.background,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  placaText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 1,
  },

  // Contador
  contador: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },

  // Lista
  lista: {
    gap: 10,
    paddingBottom: 24,
  },

  // Card de peça
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  cardIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  cardNome: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  cardMarca: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  cardPreco: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  cardMercados: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  // Comparar
  compararBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  compararText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },

  // Empty
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
});
