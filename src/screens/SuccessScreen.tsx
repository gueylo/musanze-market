import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors, shadow } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

export function SuccessScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}><View style={styles.successIcon}><Text style={styles.check}>✓</Text></View><Text style={styles.title}>Inspection Saved</Text><Text style={styles.body}>The inspection has been added to your records.</Text><Pressable onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Tabs', params: { screen: 'Records' } }] })} style={styles.primary}><Text style={styles.primaryText}>View Records</Text></Pressable><Pressable onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Tabs', params: { screen: 'New Inspection' } }] })} style={styles.secondary}><Text style={styles.secondaryText}>New Inspection</Text></Pressable></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  successIcon: { width: 88, height: 88, borderRadius: 44, backgroundColor: colors.greenLight, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  check: { color: colors.green, fontSize: 48, fontWeight: '900' },
  title: { color: colors.ink, fontWeight: '900', fontSize: 26, textAlign: 'center' },
  body: { color: colors.muted, fontSize: 15, lineHeight: 22, textAlign: 'center', maxWidth: 270, marginTop: 9, marginBottom: 28 },
  primary: { width: '100%', height: 54, borderRadius: 14, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', ...shadow },
  primaryText: { color: colors.white, fontWeight: '900', fontSize: 15 },
  secondary: { width: '100%', height: 54, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginTop: 11 },
  secondaryText: { color: colors.ink, fontWeight: '900', fontSize: 15 },
});
