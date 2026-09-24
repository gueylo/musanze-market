import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StatusBar, Text } from 'react-native';

import { InspectionProvider } from './src/InspectionContext';
import { colors } from './src/theme';
import { RootStackParamList, TabParamList } from './src/types';
import { EvidenceScreen } from './src/screens/EvidenceScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { InspectionDetailsScreen } from './src/screens/InspectionDetailsScreen';
import { NewInspectionScreen } from './src/screens/NewInspectionScreen';
import { RecordsScreen } from './src/screens/RecordsScreen';
import { ReviewScreen } from './src/screens/ReviewScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { SuccessScreen } from './src/screens/SuccessScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.softText,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginBottom: 4 },
        tabBarStyle: { paddingTop: 8, marginBottom: 8, borderTopWidth: 0, elevation: 0, shadowOpacity: 0, backgroundColor: colors.white },
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarButton: (props) => <Pressable {...(props as unknown as React.ComponentProps<typeof Pressable>)} android_ripple={{ color: 'transparent' }} />,
        tabBarIcon: ({ focused }) => (
          <>{route.name === 'Home' ? <TextIcon text="⌂" focused={focused} /> : route.name === 'Records' ? <TextIcon text="▣" focused={focused} /> : <TextIcon text="＋" focused={focused} />}</>
        ),
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="New Inspection" component={NewInspectionScreen} />
      <Tabs.Screen name="Records" component={RecordsScreen} />
    </Tabs.Navigator>
  );
}

function TextIcon({ text, focused }: { text: string; focused: boolean }) {
  return <Text style={{ color: focused ? colors.green : colors.softText, fontSize: 24, lineHeight: 24 }}>{text}</Text>;
}

export default function App() {
  return (
    <SafeAreaProvider><InspectionProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={{ ...DarkTheme, colors: { ...DarkTheme.colors, primary: colors.green, background: colors.background, card: colors.white, text: colors.ink, border: colors.border } }}>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Tabs" component={TabsNavigator} />
          <Stack.Screen name="Evidence" component={EvidenceScreen} />
          <Stack.Screen name="Review" component={ReviewScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
          <Stack.Screen name="InspectionDetails" component={InspectionDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </InspectionProvider></SafeAreaProvider>
  );
}
