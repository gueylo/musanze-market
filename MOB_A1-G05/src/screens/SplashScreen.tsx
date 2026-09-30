import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { marketImages } from '../data';
import { colors } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Tabs'), 900);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={marketImages.volcano} style={styles.screen} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.logo}><Text style={styles.logoText}>✦</Text></View>
        <Text style={styles.title}>MUSANZE{`\n`}MARKET</Text>
        <Text style={styles.subtitle}>Field Inspection Prototype</Text>
        <View style={styles.bottom}><Text style={styles.bottomTitle}>Healthy Markets{`\n`}Safer Communities</Text></View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(3, 42, 63, 0.55)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  logo: { width: 76, height: 76, borderRadius: 22, backgroundColor: '#7FFFD4', alignItems: 'center', justifyContent: 'center', marginBottom: 19 },
  logoText: { color: colors.white, fontWeight: '900', fontSize: 38 },
  title: { color: colors.ink, fontWeight: '900', fontSize: 29, textAlign: 'center', lineHeight: 33 },
  subtitle: { color: colors.ink, fontSize: 15, marginTop: 9 },
  bottom: { position: 'absolute', bottom: 55, alignItems: 'center' },
  bottomTitle: { color: colors.ink, fontSize: 15, lineHeight: 20, textAlign: 'center', fontWeight: '700' },
});
