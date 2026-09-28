import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { GROUP_CODE, marketImages } from '../data';
import { useInspections } from '../InspectionContext';
import { colors, shadow } from '../theme';
import { RootStackParamList } from '../types';
import { formatDate } from './ReviewScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'InspectionDetails'>;

export function InspectionDetailsScreen({ navigation, route }: Props) {
  const { getInspection } = useInspections();
  const inspection = getInspection(route.params.inspectionId);

  if (!inspection) return <SafeAreaView style={styles.safe}><View style={styles.missing}><Text style={styles.title}>Inspection not found</Text><Pressable onPress={() => navigation.goBack()} style={styles.primary}><Text style={styles.primaryText}>Go Back</Text></Pressable></View></SafeAreaView>;

  const riskStyle = inspection.riskLevel === 'High' ? styles.high : inspection.riskLevel === 'Medium' ? styles.medium : styles.low;
  const source = inspection.imageUri ? { uri: inspection.imageUri } : marketImages[inspection.imageKey || 'marketInterior'];
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content}><View style={styles.header}><Pressable onPress={() => navigation.goBack()} hitSlop={12}><Text style={styles.back}>‹</Text></Pressable><View style={styles.headerText}><Text style={styles.brand}>MUSANZE MARKET</Text><Text style={styles.code}>{GROUP_CODE}</Text></View><View style={styles.headerSpacer} /></View><Text style={styles.title}>Inspection Details</Text><Text style={styles.subtitle}>{inspection.vendorAlias} • {inspection.stallCode}</Text><Image source={source} style={styles.evidence} /><View style={styles.card}><DetailRow label="Vendor Alias" value={inspection.vendorAlias} /><DetailRow label="Stall Code" value={inspection.stallCode} /><DetailRow label="Category" value={inspection.category} /><DetailRow label="Contact Number" value={inspection.contactNumber} /><DetailRow label="Risk Level" value={inspection.riskLevel} valueStyle={riskStyle} /><DetailRow label="Consent" value="Confirmed  ✓" valueStyle={styles.confirmed} /><DetailRow label="Recorded" value={formatDate(new Date(inspection.timestamp))} /><DetailRow label="Group Code" value={GROUP_CODE} /></View><Pressable onPress={() => navigation.goBack()} style={styles.secondary}><Text style={styles.secondaryText}>←  Back to Records</Text></Pressable></ScrollView></SafeAreaView>;
}

function DetailRow({ label, value, valueStyle }: { label: string; value: string; valueStyle?: object }) { return <View style={styles.row}><Text style={styles.label}>{label}</Text><Text style={[styles.value, valueStyle]}>{value}</Text></View>; }

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
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5, marginBottom: 17 },
  evidence: { height: 200, width: '100%', borderRadius: 15, backgroundColor: colors.white, marginBottom: 18 },
  noEvidence: { height: 140, borderRadius: 15, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  noEvidenceIcon: { color: colors.softText, fontSize: 34 },
  noEvidenceText: { color: colors.muted, marginTop: 7, fontSize: 13 },
  card: { backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: 15, borderWidth: 1, borderColor: colors.border, ...shadow },
  row: { minHeight: 43, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border },
  label: { color: colors.muted, fontSize: 13, flex: 1 },
  value: { color: colors.ink, fontSize: 13, fontWeight: '800', textAlign: 'right', flex: 1.5 },
  low: { color: colors.green, backgroundColor: colors.greenLight, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, overflow: 'hidden' },
  medium: { color: colors.amber, backgroundColor: colors.amberLight, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, overflow: 'hidden' },
  high: { color: colors.danger, backgroundColor: colors.dangerLight, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, overflow: 'hidden' },
  confirmed: { color: colors.green },
  secondary: { height: 52, borderRadius: 13, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  secondaryText: { color: colors.ink, fontWeight: '900' },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  primary: { marginTop: 18, height: 52, paddingHorizontal: 32, borderRadius: 13, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: colors.white, fontWeight: '900' },
});
