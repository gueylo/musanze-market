import React, { useRef, useState } from 'react';
import { Alert, ScrollView, Image, Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { GROUP_CODE } from '../data';
import { colors, shadow } from '../theme';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Evidence'>;

export function EvidenceScreen({ navigation, route }: Props) {
  const [selectedImage, setSelectedImage] = useState(route.params.draft.imageUri);
  const [permissionMessage, setPermissionMessage] = useState('');
  const draft = route.params.draft;
  const pickerBusy = useRef(false);

  const dismissPermission = async () => {
    if (permissionMessage) {
      setPermissionMessage('');
      // Allow the native modal to dismiss before presenting another native view.
      await new Promise(resolve => setTimeout(resolve, 400));
    }
  };

  const requestCameraAccess = async () => {
    let permission = await ImagePicker.getCameraPermissionsAsync();
    if (!permission.granted && permission.canAskAgain) {
      permission = await ImagePicker.requestCameraPermissionsAsync();
    }
    if (!permission.granted) {
      setPermissionMessage('Camera access is turned off. In Settings, allow Camera permission for Expo Go, then return here and tap Take Photo again.');
      return false;
    }
    return true;
  };

  const chooseFromGallery = async () => {
    if (pickerBusy.current) return;
    pickerBusy.current = true;
    try {
    await dismissPermission();
    // The system photo picker grants access only to the selected image.
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: false, quality: 0.8 });
    if (!result.canceled && result.assets[0]) setSelectedImage(result.assets[0].uri);
    } catch (error) { Alert.alert('Unable to open gallery', error instanceof Error ? error.message : 'Please try again.'); }
    finally { pickerBusy.current = false; }
  };

  const takePhoto = async () => {
    if (pickerBusy.current) return;
    pickerBusy.current = true;
    try {
      await dismissPermission();
      const hasCameraAccess = await requestCameraAccess();
      if (!hasCameraAccess) return;
      setPermissionMessage('');
      const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], allowsEditing: false, quality: 0.8 });
      if (!result.canceled && result.assets[0]) setSelectedImage(result.assets[0].uri);
    } catch (error) {
      console.warn('Camera could not be opened', error);
      Alert.alert('Unable to open camera', error instanceof Error ? error.message : 'Check that this device has a working camera app.');
    }
    finally { pickerBusy.current = false; }
  };

  const continueToReview = () => {
    if (!selectedImage) { Alert.alert('Evidence required', 'Take a photo or choose an image first.'); return; }
    navigation.navigate('Review', { draft: { ...draft, imageUri: selectedImage } });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}><Pressable onPress={() => navigation.goBack()} hitSlop={12}><Text style={styles.back}>‹</Text></Pressable><View style={styles.headerText}><Text style={styles.brand}>MUSANZE MARKET</Text><Text style={styles.code}>{GROUP_CODE}</Text></View><View style={styles.headerSpacer} /></View>
        <View style={styles.headingRow}><View><Text style={styles.title}>New Inspection</Text><Text style={styles.subtitle}>Step 2 of 2: Add Evidence</Text></View><Text style={styles.step}>STEP 2 OF 2</Text></View>

        {selectedImage ? <View style={styles.previewWrap}><Image source={{ uri: selectedImage }} style={styles.preview} /><Pressable onPress={() => setSelectedImage(null)} style={styles.removeCircle}><Text style={styles.removeX}>×</Text></Pressable></View> : <View style={styles.emptyImage}><Text style={styles.cameraIcon}>⌾</Text><Text style={styles.emptyTitle}>No image selected</Text><Text style={styles.emptyBody}>Take a photo or choose from gallery to add inspection evidence.</Text></View>}

        <View style={styles.actions}>{selectedImage ? <><Pressable onPress={() => Alert.alert('Replace image', 'Choose a source', [{ text: 'Camera', onPress: takePhoto }, { text: 'Gallery', onPress: chooseFromGallery }, { text: 'Cancel', style: 'cancel' }])} style={styles.outlineButton}><Text style={styles.buttonIcon}>▣</Text><Text style={styles.outlineText}>Replace Image</Text></Pressable><Pressable onPress={() => setSelectedImage(null)} style={styles.dangerButton}><Text style={styles.buttonIcon}>♢</Text><Text style={styles.dangerText}>Remove Image</Text></Pressable></> : <><Pressable onPress={takePhoto} style={styles.outlineButton}><Text style={styles.buttonIcon}>▣</Text><Text style={styles.outlineText}>Take Photo</Text></Pressable><Pressable onPress={chooseFromGallery} style={styles.outlineButton}><Text style={styles.buttonIcon}>▧</Text><Text style={styles.outlineText}>Choose from Gallery</Text></Pressable></>}</View>

        <View style={styles.bottomRow}><Pressable onPress={() => navigation.goBack()} style={styles.backButton}><Text style={styles.backButtonText}>←  Back</Text></Pressable><Pressable onPress={continueToReview} disabled={!selectedImage} style={[styles.primaryButton, !selectedImage && { opacity: 0.4 }]}><Text style={styles.primaryText}>Next: Review  →</Text></Pressable></View>
      </ScrollView>

      <Modal visible={!!permissionMessage} transparent animationType="fade" onRequestClose={() => setPermissionMessage('')}>
        <View style={styles.modalBackdrop}><View style={styles.permissionCard}><View style={styles.permissionIcon}><Text style={styles.permissionIconText}>▣</Text></View><Text style={styles.permissionTitle}>Camera Permission Required</Text><Text style={styles.permissionBody}>{permissionMessage}</Text><Pressable onPress={() => Linking.openSettings().catch(() => Alert.alert('Open settings manually', 'Allow camera access in your device settings.'))} style={[styles.primaryButton, { flex: 0, width: '100%' }]}><Text style={styles.primaryText}>Open Settings</Text></Pressable><Pressable onPress={takePhoto} style={styles.galleryButton}><Text style={styles.galleryText}>Try Camera Again</Text></Pressable><Pressable onPress={chooseFromGallery} style={styles.galleryButton}><Text style={styles.galleryText}>▧  Choose from Gallery</Text></Pressable><Pressable onPress={() => setPermissionMessage('')} style={styles.cancelButton}><Text style={styles.cancelText}>Cancel</Text></Pressable></View></View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 22 },
  header: { flexDirection: 'row', alignItems: 'center', marginHorizontal: -18, marginTop: -10, paddingHorizontal: 18, paddingVertical: 12, marginBottom: 21, backgroundColor: colors.green },
  back: { color: colors.white, fontSize: 35, lineHeight: 31, width: 28 },
  headerText: { flex: 1, alignItems: 'center' },
  brand: { color: colors.white, fontWeight: '900', fontSize: 16, letterSpacing: 0.3 },
  code: { color: '#164F47', fontSize: 9, fontWeight: '900', letterSpacing: 0.8, marginTop: 2 },
  headerSpacer: { width: 28 },
  headingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: colors.ink, fontSize: 23, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5 },
  step: { color: colors.green, fontSize: 11, fontWeight: '900' },
  emptyImage: { minHeight: 270, marginTop: 24, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.softText, borderRadius: 14, alignItems: 'center', justifyContent: 'center', padding: 28, backgroundColor: colors.white },
  cameraIcon: { color: colors.green, fontSize: 45, marginBottom: 12 },
  emptyTitle: { color: colors.ink, fontSize: 17, fontWeight: '900' },
  emptyBody: { color: colors.muted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 8, maxWidth: 250 },
  previewWrap: { height: 300, marginTop: 24, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  preview: { width: '100%', height: '100%' },
  removeCircle: { position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', ...shadow },
  removeX: { color: colors.ink, fontSize: 24, lineHeight: 24 },
  actions: { marginTop: 17 },
  outlineButton: { height: 48, borderRadius: 11, borderWidth: 1, borderColor: colors.ink, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  buttonIcon: { color: colors.ink, fontSize: 20, marginRight: 9 },
  outlineText: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  dangerButton: { height: 48, borderRadius: 11, borderWidth: 1, borderColor: colors.danger, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  dangerText: { color: colors.danger, fontSize: 14, fontWeight: '800' },
  bottomRow: { flexDirection: 'row', gap: 10, marginTop: 'auto' },
  backButton: { flex: 1, height: 52, borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  backButtonText: { color: colors.ink, fontWeight: '800' },
  primaryButton: { flex: 1, height: 52, borderRadius: 13, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', ...shadow },
  primaryText: { color: colors.white, fontWeight: '900', fontSize: 14 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(16, 25, 31, 0.55)', alignItems: 'center', justifyContent: 'center', padding: 25 },
  permissionCard: { width: '100%', maxWidth: 360, backgroundColor: colors.white, borderRadius: 20, padding: 22, alignItems: 'center', ...shadow },
  permissionIcon: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.dangerLight, alignItems: 'center', justifyContent: 'center', marginBottom: 13 },
  permissionIconText: { color: colors.danger, fontSize: 27 },
  permissionTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  permissionBody: { color: colors.muted, textAlign: 'center', lineHeight: 20, fontSize: 13, marginTop: 9, marginBottom: 17 },
  galleryButton: { width: '100%', height: 46, borderRadius: 11, borderWidth: 1, borderColor: colors.green, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  galleryText: { color: colors.green, fontWeight: '800' },
  cancelButton: { padding: 13, marginTop: 4 },
  cancelText: { color: colors.ink, fontWeight: '800' },
});
