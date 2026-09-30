import React, { useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { GROUP_CODE, marketImages } from '../data';
import { useInspections } from '../InspectionContext';
import { colors, shadow } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

export function ReviewScreen({ navigation, route }: Props) {
  const { saveInspection } = useInspections();
  const { draft } = route.params;
  const saved = useRef(false);
  const [timestamp] = useState(() => new Date().toISOString());

  const save = () => {
    if (saved.current || !draft.imageUri) return;
    saved.current = true;
    saveInspection({ ...draft, timestamp });
    navigation.reset({ index: 0, routes: [{ name: 'Success' }] });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}><Pressable onPress={() => navigation.goBack()} hitSlop={12}><Text style={styles.back}>‹</Text></Pressable><View style={styles.headerText}><Text style={styles.brand}>MUSANZE MARKET</Text><Text style={styles.code}>{GROUP_CODE}</Text></View><View style={styles.headerSpacer} /></View>
        <Text style={styles.title}>Review Inspection</Text>
        <Text style={styles.subtitle}>Confirm the details before saving</Text>

        <View style={styles.card}>
          <SummaryRow label="Vendor Alias" value={draft.vendorAlias} />
          <SummaryRow label="Stall Code" value={draft.stallCode} />
          <SummaryRow label="Category" value={draft.category} />
          <SummaryRow label="Contact Number" value={draft.contactNumber} />
          <SummaryRow label="Risk Level" value={draft.riskLevel} valueStyle={draft.riskLevel === 'High' ? styles.high : draft.riskLevel === 'Medium' ? styles.medium : styles.low} />
          <SummaryRow label="Consent" value="Confirmed" valueStyle={styles.confirmed} />
        </View>

        <Text style={styles.sectionTitle}>Evidence</Text>
        {draft.imageUri ? <Image source={{ uri: draft.imageUri }} style={styles.evidence} /> : <Text style={styles.noEvidenceText}>No evidence attached. Go back to add a photo.</Text>}

        <View style={styles.metaCard}><SummaryRow label="Recorded" value={formatDate(new Date(timestamp))} /><SummaryRow label="Group Code" value={GROUP_CODE} /></View>
        <Pressable onPress={save} style={({ pressed }) => [styles.saveButton, pressed && { opacity: 0.8 }]}><Text style={styles.saveText}>Save Inspection  ✓</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value, valueStyle }: { label: string; value: string; valueStyle?: object }) {
  return <View style={styles.summaryRow}><Text style={styles.summaryLabel}>{label}</Text><Text style={[styles.summaryValue, valueStyle]}>{value}</Text></View>;
}

export function formatDate(date: Date) {
  return date.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 25 },
  header: { flexDirection: 'row', alignItems: 'center', marginHorizontal: -18, marginTop: -10, paddingHorizontal: 18, paddingVertical: 12, marginBottom: 20, backgroundColor: colors.green },
  back: { color: colors.white, fontSize: 35, lineHeight: 31, width: 28 },
  headerText: { flex: 1, alignItems: 'center' },
  brand: { color: colors.white, fontWeight: '900', fontSize: 16, letterSpacing: 0.3 },
  code: { color: '#164F47', fontSize: 9, fontWeight: '900', letterSpacing: 0.8, marginTop: 2 },
  headerSpacer: { width: 28 },
  title: { color: colors.ink, fontSize: 24, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5, marginBottom: 18 },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 15, borderWidth: 1, borderColor: colors.border, ...shadow },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 36, borderBottomWidth: 1, borderBottomColor: colors.border },
  summaryLabel: { color: colors.muted, fontSize: 13, flex: 1 },
  summaryValue: { color: colors.ink, fontSize: 13, fontWeight: '800', textAlign: 'right', flex: 1.4 },
  low: { color: colors.green, backgroundColor: colors.greenLight, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, overflow: 'hidden' },
  medium: { color: colors.amber, backgroundColor: colors.amberLight, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, overflow: 'hidden' },
  high: { color: colors.danger, backgroundColor: colors.dangerLight, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, overflow: 'hidden' },
  confirmed: { color: colors.green, fontWeight: '900' },
  sectionTitle: { color: colors.ink, fontSize: 16, fontWeight: '900', marginTop: 20, marginBottom: 9 },
  evidence: { width: '100%', height: 190, borderRadius: 14, backgroundColor: colors.white },
  noEvidence: { height: 120, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  noEvidenceIcon: { fontSize: 30, color: colors.softText },
  noEvidenceText: { color: colors.muted, fontSize: 13, marginTop: 6 },
  metaCard: { backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: 15, marginTop: 17, borderWidth: 1, borderColor: colors.border },
  saveButton: { height: 54, borderRadius: 14, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', marginTop: 18, ...shadow },
  saveText: { color: colors.white, fontWeight: '900', fontSize: 15 },
});
