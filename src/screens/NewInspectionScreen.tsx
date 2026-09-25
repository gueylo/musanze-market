import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { categoryOptions, GROUP_CODE } from '../data';
import { colors, shadow } from '../theme';
import { FormValues, RootStackParamList, TabParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = BottomTabScreenProps<TabParamList, 'New Inspection'>;
type Navigation = NativeStackNavigationProp<RootStackParamList>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyForm: FormValues = {
  vendorAlias: '',
  stallCode: '',
  category: '',
  contactNumber: '',
  riskLevel: '',
  consent: false,
};

export function NewInspectionScreen({}: Props) {
  const navigation = useNavigation<Navigation>();
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showCategories, setShowCategories] = useState(false);

  const update = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!form.vendorAlias.trim()) nextErrors.vendorAlias = 'Vendor alias is required.';
    // Classroom placeholder rule: a capital letter, hyphen, and three digits.
    if (!form.stallCode.trim()) nextErrors.stallCode = 'Stall code is required.';
    else if (!/^[A-Z]-\d{3}$/.test(form.stallCode.trim())) nextErrors.stallCode = 'Invalid stall code. Use format: A-001';
    if (!form.category) nextErrors.category = 'Please select a category.';
    if (!form.contactNumber.trim()) nextErrors.contactNumber = 'Contact number is required.';
    // Classroom placeholder rule: fictional Rwanda-style number, for example 0781234567.
    else if (!/^07\d{8}$/.test(form.contactNumber.trim())) nextErrors.contactNumber = 'Invalid phone number. Use 07xxxxxxxx';
    if (!form.riskLevel) nextErrors.riskLevel = 'Please select a risk level.';
    if (!form.consent) nextErrors.consent = 'You must confirm consent to continue.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const continueToEvidence = () => {
    if (!validate()) return;
    navigation.navigate('Evidence', { draft: { ...form, vendorAlias: form.vendorAlias.trim(), stallCode: form.stallCode.trim(), contactNumber: form.contactNumber.trim(), imageUri: null } });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}><KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.headerText}><Text style={styles.brand}>MUSANZE MARKET</Text><Text style={styles.code}>{GROUP_CODE}</Text></View>
        </View>
        <View style={styles.headingRow}><Text style={styles.title}>New Inspection</Text><Text style={styles.step}>STEP 1 OF 2</Text></View>
        <Text style={styles.subtitle}>Enter the vendor details below</Text>

        <View style={styles.card}>
          <Field label="Vendor Alias" required value={form.vendorAlias} placeholder="e.g. Vendor Alpha" onChangeText={(value) => update('vendorAlias', value)} error={errors.vendorAlias} />
          <Field label="Stall Code" required value={form.stallCode} placeholder="e.g. A-001" autoCapitalize="characters" onChangeText={(value) => update('stallCode', value.toUpperCase())} error={errors.stallCode} />

          <Text style={styles.label}>Category <Text style={styles.required}>*</Text></Text>
          <Pressable style={[styles.select, errors.category && styles.errorInput]} onPress={() => setShowCategories((current) => !current)}>
            <Text style={form.category ? styles.selectText : styles.placeholder}>{form.category || 'Select category'}</Text><Text style={styles.selectArrow}>{showCategories ? '⌃' : '⌄'}</Text>
          </Pressable>
          {showCategories && <View style={styles.options}>{categoryOptions.map((option) => <Pressable key={option} onPress={() => { update('category', option); setShowCategories(false); }} style={styles.option}><Text style={styles.optionText}>{option}</Text></Pressable>)}</View>}
          {!!errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

          <Field label="Contact Number" required value={form.contactNumber} placeholder="e.g. 0781234567" keyboardType="phone-pad" onChangeText={(value) => update('contactNumber', value.replace(/\s/g, ''))} error={errors.contactNumber} />

          <Text style={styles.label}>Risk Level <Text style={styles.required}>*</Text></Text>
          <View style={styles.riskRow}>{(['Low', 'Medium', 'High'] as const).map((risk) => <Pressable key={risk} onPress={() => update('riskLevel', risk)} style={[styles.riskButton, form.riskLevel === risk && styles.riskSelected]}><Text style={[styles.riskText, form.riskLevel === risk && styles.riskSelectedText]}>{risk}</Text></Pressable>)}</View>
          {!!errors.riskLevel && <Text style={styles.errorText}>{errors.riskLevel}</Text>}

          <Pressable style={styles.consentRow} onPress={() => update('consent', !form.consent)} accessibilityRole="checkbox" accessibilityState={{ checked: form.consent }}>
            <View style={[styles.checkbox, form.consent && styles.checkboxChecked]}>{form.consent && <Text style={styles.check}>✓</Text>}</View>
            <Text style={styles.consentText}>I confirm that the vendor has given consent for this inspection.</Text>
          </Pressable>
          {!!errors.consent && <Text style={styles.errorText}>{errors.consent}</Text>}
        </View>

        <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={continueToEvidence}><Text style={styles.primaryText}>Next: Add Evidence  →</Text></Pressable>
        <Text style={styles.helper}>All fields marked with * are required.</Text>
      </ScrollView>
    </KeyboardAvoidingView></SafeAreaView>
  );
}

function Field({ label, required, value, placeholder, onChangeText, error, ...props }: { label: string; required?: boolean; value: string; placeholder: string; onChangeText: (value: string) => void; error?: string } & Omit<React.ComponentProps<typeof TextInput>, 'value' | 'placeholder' | 'onChangeText'>) {
  return <View style={styles.field}><Text style={styles.label}>{label} {required && <Text style={styles.required}>*</Text>}</Text><TextInput {...props} value={value} placeholder={placeholder} placeholderTextColor={colors.softText} onChangeText={onChangeText} style={[styles.input, error && styles.errorInput]} />{!!error && <Text style={styles.errorText}>{error}</Text>}</View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 28 },
  header: { alignItems: 'center', justifyContent: 'center', marginHorizontal: -18, marginTop: -12, paddingHorizontal: 18, paddingVertical: 12, marginBottom: 21, backgroundColor: colors.green },
  headerText: { alignItems: 'center' },
  brand: { color: colors.white, fontWeight: '900', fontSize: 18, letterSpacing: 0.4 },
  code: { color: '#164F47', fontSize: 10, fontWeight: '900', letterSpacing: 0.8, marginTop: 2 },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: colors.ink, fontSize: 24, fontWeight: '900' },
  step: { color: colors.green, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5, marginBottom: 18 },
  card: { backgroundColor: colors.white, borderRadius: 17, padding: 16, borderWidth: 1, borderColor: colors.border, ...shadow },
  field: { marginBottom: 15 },
  label: { color: colors.ink, fontSize: 13, fontWeight: '800', marginBottom: 7 },
  required: { color: colors.danger },
  input: { height: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 13, color: colors.ink, fontSize: 14, backgroundColor: colors.white },
  errorInput: { borderColor: colors.danger, backgroundColor: colors.dangerLight },
  errorText: { color: colors.danger, fontSize: 12, marginTop: 5, lineHeight: 17 },
  select: { height: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white },
  selectText: { color: colors.ink, fontSize: 14 },
  placeholder: { color: colors.softText, fontSize: 14 },
  selectArrow: { color: colors.ink, fontSize: 20 },
  options: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, marginTop: 5, overflow: 'hidden', backgroundColor: colors.white },
  option: { padding: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  optionText: { color: colors.ink, fontSize: 14 },
  riskRow: { flexDirection: 'row', marginBottom: 1 },
  riskButton: { flex: 1, minHeight: 42, borderWidth: 1, borderColor: colors.border, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 8, backgroundColor: colors.white },
  riskSelected: { borderColor: colors.green, backgroundColor: colors.greenLight },
  riskText: { color: colors.ink, fontWeight: '700', fontSize: 13 },
  riskSelectedText: { color: colors.green },
  consentRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 19 },
  checkbox: { width: 22, height: 22, borderRadius: 5, borderWidth: 2, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  checkboxChecked: { backgroundColor: colors.green, borderColor: colors.green },
  check: { color: colors.white, fontWeight: '900', fontSize: 15 },
  consentText: { flex: 1, color: colors.muted, fontSize: 13, lineHeight: 20 },
  primaryButton: { height: 54, backgroundColor: colors.green, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 18, ...shadow },
  primaryText: { color: colors.white, fontSize: 15, fontWeight: '900' },
  pressed: { opacity: 0.8 },
  helper: { color: colors.softText, textAlign: 'center', fontSize: 12, marginTop: 11 },
});
