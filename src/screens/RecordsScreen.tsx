import React, { useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { useInspections } from '../InspectionContext';
import { GROUP_CODE, marketImages } from '../data';
import { colors, shadow } from '../theme';
import { Inspection, TabParamList } from '../types';
import { formatDate } from './ReviewScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

type Props = BottomTabScreenProps<TabParamList, 'Records'>;
type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function RecordsScreen({}: Props) {
  const { inspections } = useInspections();
  const navigation = useNavigation<Navigation>();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Low Risk', 'Medium', 'High'];
  const filtered = useMemo(() => inspections.filter((item) => filter === 'All' || (filter === 'Low Risk' ? item.riskLevel === 'Low' : item.riskLevel === filter)), [filter, inspections]);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<><View style={styles.header}><View style={styles.headerText}><Text style={styles.brand}>MUSANZE MARKET</Text><Text style={styles.code}>{GROUP_CODE}</Text></View></View><View style={styles.headingRow}><View><Text style={styles.title}>Records</Text><Text style={styles.subtitle}>{inspections.length} inspections saved in this session</Text></View><Text style={styles.archive}>▣</Text></View><View style={styles.filters}>{filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterActive]}><Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text></Pressable>)}</View></>}
        renderItem={({ item }) => <RecordCard item={item} onPress={() => navigation.navigate('InspectionDetails', { inspectionId: item.id })} />}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyIcon}>▣</Text><Text style={styles.emptyTitle}>No matching records</Text><Text style={styles.emptyText}>Try another filter or save a new inspection.</Text></View>}
        ListFooterComponent={<View style={{ height: 25 }} />}
      />
    </SafeAreaView>
  );
}

function RecordCard({ item, onPress }: { item: Inspection; onPress: () => void }) {
  const riskStyle = item.riskLevel === 'High' ? styles.high : item.riskLevel === 'Medium' ? styles.medium : styles.low;
  const source = item.imageUri ? { uri: item.imageUri } : marketImages[item.imageKey || 'marketInterior'];
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.record, pressed && { opacity: 0.75 }]}><Image source={source} style={styles.recordImage} /><View style={styles.recordInfo}><Text style={styles.vendor}>{item.vendorAlias}</Text><Text style={styles.recordSub}>{item.stallCode}  •  {item.category}</Text><View style={styles.recordBottom}><Text style={[styles.risk, riskStyle]}>{item.riskLevel}</Text><Text style={styles.date}>{formatDate(new Date(item.timestamp))}</Text></View></View><Text style={styles.chevron}>›</Text></Pressable>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 18, paddingTop: 10 },
  header: { alignItems: 'center', justifyContent: 'center', marginHorizontal: -18, marginTop: -10, paddingHorizontal: 18, paddingVertical: 12, marginBottom: 20, backgroundColor: colors.green },
  headerText: { alignItems: 'center' },
  brand: { color: colors.white, fontWeight: '900', fontSize: 18, letterSpacing: 0.4 },
  code: { color: '#164F47', fontSize: 10, fontWeight: '900', letterSpacing: 0.8, marginTop: 2 },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  title: { color: colors.ink, fontSize: 24, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 5 },
  archive: { color: colors.green, fontSize: 31 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  filter: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, borderRadius: 99, paddingHorizontal: 11, paddingVertical: 8, marginRight: 7, marginBottom: 7 },
  filterActive: { backgroundColor: colors.green, borderColor: colors.green },
  filterText: { color: colors.muted, fontWeight: '700', fontSize: 12 },
  filterTextActive: { color: colors.white },
  record: { minHeight: 94, borderRadius: 15, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, padding: 11, flexDirection: 'row', alignItems: 'center', marginBottom: 10, ...shadow },
  recordImage: { width: 58, height: 58, borderRadius: 9, backgroundColor: '#263440', marginRight: 12 },
  recordInfo: { flex: 1 },
  vendor: { color: colors.ink, fontWeight: '900', fontSize: 14 },
  recordSub: { color: colors.muted, fontSize: 12, marginTop: 4 },
  recordBottom: { flexDirection: 'row', alignItems: 'center', marginTop: 7 },
  risk: { fontSize: 11, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 99, overflow: 'hidden' },
  low: { color: colors.green, backgroundColor: colors.greenLight },
  medium: { color: colors.amber, backgroundColor: colors.amberLight },
  high: { color: colors.danger, backgroundColor: colors.dangerLight },
  date: { color: colors.muted, fontSize: 11, marginLeft: 8 },
  chevron: { color: colors.ink, fontSize: 27, marginLeft: 8 },
  empty: { alignItems: 'center', justifyContent: 'center', minHeight: 260, padding: 24 },
  emptyIcon: { color: colors.green, fontSize: 40, marginBottom: 14 },
  emptyTitle: { color: colors.ink, fontWeight: '900', fontSize: 18 },
  emptyText: { color: colors.muted, textAlign: 'center', marginTop: 7 },
});
