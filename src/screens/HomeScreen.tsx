import React, { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MarketCard } from '../components/MarketCard';
import { marketZones, SHOW_EMPTY_STATE, GROUP_CODE } from '../data';
import { colors, shadow } from '../theme';
export function HomeScreen({ navigation }: BottomTabScreenProps<TabParamList, 'Home'>) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const visibleZones = useMemo(() => marketZones.filter((zone) => {
    const text = `${zone.name} ${zone.category}`.toLowerCase();
    return text.includes(search.toLowerCase().trim()) && (status === 'All' || zone.status === status);
  }), [search, status]);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={SHOW_EMPTY_STATE ? [] : visibleZones}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        numColumns={2}
        columnWrapperStyle={visibleZones.length > 0 && !SHOW_EMPTY_STATE ? styles.column : undefined}
        ListHeaderComponent={<>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.brand}>MUSANZE MARKET</Text>
              <Text style={styles.code}>{GROUP_CODE}</Text>
            </View>
          </View>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.title}>Market Zones & Stalls</Text>
              <Text style={styles.subtitle}>Assigned locations for today</Text>
            </View>
            <View style={styles.count}><Text style={styles.countNumber}>{marketZones.length}</Text><Text style={styles.countLabel}>zones</Text></View>
          </View>
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput value={search} onChangeText={setSearch} placeholder="Search zones or stalls..." placeholderTextColor={colors.softText} style={styles.searchInput} />
            </View>
            <Pressable onPress={() => Alert.alert('Filter zones', 'Choose a status', ['All', 'Pending', 'Inspected', 'In Progress'].map(value => ({ text: value, onPress: () => setStatus(value) })))} style={styles.filterButton} accessibilityLabel="Filter zones"><Text style={styles.filterText}>☷</Text></Pressable>
          </View>
        </>}
        renderItem={({ item }) => <MarketCard {...item} onPress={() => navigation.navigate('New Inspection')} />}
        ListEmptyComponent={<View style={styles.emptyState}>
          <View style={styles.emptyIcon}><Text style={styles.emptyIconText}>⌕</Text></View>
          <Text style={styles.emptyTitle}>No zones or stalls found</Text>
          <Text style={styles.emptyBody}>Try a different search term or clear your filters.</Text>
          {(search.length > 0 || status !== 'All') && <Pressable onPress={() => { setSearch(''); setStatus('All'); }} style={styles.clearButton}><Text style={styles.clearText}>Clear search and filters</Text></Pressable>}
        </View>}
        ListFooterComponent={<View style={styles.footerSpace} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 10, paddingTop: 10 },
  column: { justifyContent: 'space-between' },
  header: { alignItems: 'center', justifyContent: 'center', marginHorizontal: -10, marginTop: -10, paddingHorizontal: 18, paddingVertical: 12, marginBottom: 18, backgroundColor: colors.green },
  headerText: { alignItems: 'center' },
  brand: { color: colors.white, fontWeight: '900', fontSize: 18, letterSpacing: 0.4 },
  code: { color: '#164F47', fontSize: 10, fontWeight: '900', letterSpacing: 0.8, marginTop: 2 },
  heroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  title: { color: colors.ink, fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5 },
  count: { backgroundColor: colors.greenLight, borderRadius: 14, paddingHorizontal: 13, paddingVertical: 8, alignItems: 'center' },
  countNumber: { color: colors.green, fontWeight: '900', fontSize: 18 },
  countLabel: { color: colors.green, fontSize: 10, fontWeight: '700' },
  searchRow: { flexDirection: 'row', marginBottom: 18 },
  searchBox: { flex: 1, height: 48, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  searchIcon: { color: colors.muted, fontSize: 25, marginRight: 8, marginTop: -5 },
  searchInput: { flex: 1, color: colors.ink, fontSize: 14 },
  filterButton: { width: 48, height: 48, marginLeft: 9, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  filterText: { color: colors.green, fontSize: 23 },
  emptyState: { minHeight: 330, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  emptyIcon: { width: 76, height: 76, borderRadius: 38, backgroundColor: colors.greenLight, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  emptyIconText: { fontSize: 38, color: colors.green },
  emptyTitle: { color: colors.ink, fontSize: 18, fontWeight: '800', textAlign: 'center' },
  emptyBody: { color: colors.muted, textAlign: 'center', lineHeight: 21, marginTop: 8 },
  clearButton: { marginTop: 16, paddingHorizontal: 15, paddingVertical: 9, borderRadius: 10, backgroundColor: colors.greenLight },
  clearText: { color: colors.green, fontWeight: '800' },
  footerSpace: { height: 18 },
});
