import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { marketImages } from '../data';
import { colors, shadow } from '../theme';
import { LocalImageName } from '../types';

type MarketCardProps = {
  name: string;
  category: string;
  status: string;
  priority: string;
  imageKey: LocalImageName;
  onPress: () => void;
};

export function MarketCard({ name, category, status, priority, imageKey, onPress }: MarketCardProps) {
  const statusColor = status === 'Inspected' ? colors.green : status === 'In Progress' ? colors.amber : colors.danger;
  const statusBackground = status === 'Inspected' ? colors.greenLight : status === 'In Progress' ? colors.amberLight : colors.dangerLight;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]} accessibilityRole="button">
      <Image source={marketImages[imageKey]} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category} numberOfLines={1}>{category}</Text>
        <Text style={[styles.status, { color: statusColor, backgroundColor: statusBackground }]}>{status}</Text>
        <Text style={styles.priority}>Priority: <Text style={styles.priorityValue}>{priority}</Text></Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0, marginHorizontal: 4, marginBottom: 10, borderRadius: 13, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', ...shadow },
  pressed: { opacity: 0.8 },
  image: { width: '100%', height: 96, backgroundColor: '#263440' },
  details: { padding: 9 },
  name: { color: colors.ink, fontWeight: '900', fontSize: 13 },
  category: { color: colors.muted, fontSize: 11, marginTop: 2, marginBottom: 6 },
  status: { alignSelf: 'flex-start', fontSize: 10, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 99, overflow: 'hidden' },
  priority: { color: colors.danger, fontSize: 10, marginTop: 6 },
  priorityValue: { fontWeight: '900' },
});
