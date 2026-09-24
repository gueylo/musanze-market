import { ImageSourcePropType } from 'react-native';
import { Inspection, LocalImageName } from './types';

// Change this one value later if your lecturer gives you a different group code.
export const GROUP_CODE = 'MOB_A1_G05';

// Set to true when you need to demonstrate the catalog empty state.
export const SHOW_EMPTY_STATE = false;

export const marketImages: Record<LocalImageName, ImageSourcePropType> = {
  volcano: require('../assets/musanze-volcano.jpg'),
  marketExterior: require('../assets/whatsapp_image_2024-09-03_at_1.17_15_am.jpg'),
  marketInterior: require('../assets/HS6se9xW0AAmZ-4.webp'),
  fruitStall: require('../assets/Musanze-Agri-Market-interior-photo-by-Diana-Irumva.jpg'),
  produceStall: require('../assets/images (1).jpeg'),
  sweetPotatoes: require('../assets/musanze-central-market.jpg'),
};

export const marketZones = [
  { id: 'zone-a', name: 'Zone A', category: 'Fresh Produce', status: 'Pending', priority: 'High', imageKey: 'produceStall' as LocalImageName },
  { id: 'zone-b', name: 'Zone B', category: 'Fruits', status: 'Inspected', priority: 'Medium', imageKey: 'fruitStall' as LocalImageName },
  { id: 'zone-c', name: 'Zone C', category: 'Grains & Cereals', status: 'In Progress', priority: 'High', imageKey: 'marketInterior' as LocalImageName },
  { id: 'zone-d', name: 'Zone D', category: 'Meat & Fish', status: 'Pending', priority: 'High', imageKey: 'sweetPotatoes' as LocalImageName },
  { id: 'zone-e', name: 'Zone E', category: 'Dairy & Eggs', status: 'Inspected', priority: 'Low', imageKey: 'fruitStall' as LocalImageName },
  { id: 'zone-f', name: 'Zone F', category: 'General Goods', status: 'Pending', priority: 'Medium', imageKey: 'marketExterior' as LocalImageName },
];

// These fictional records make the Records tab useful immediately. New records
// are added above them and remain available for the current app session.
export const initialInspections: Inspection[] = [
  {
    id: 'sample-1',
    vendorAlias: 'Vendor Alpha',
    stallCode: 'A-001',
    category: 'Fresh Produce',
    contactNumber: '0781234567',
    riskLevel: 'Low',
    consent: true,
    imageUri: null,
    timestamp: '2026-09-30T14:35:00.000Z',
    imageKey: 'produceStall',
  },
  {
    id: 'sample-2',
    vendorAlias: 'Vendor Bravo',
    stallCode: 'B-002',
    category: 'Fruits',
    contactNumber: '0782345678',
    riskLevel: 'Medium',
    consent: true,
    imageUri: null,
    timestamp: '2026-09-29T11:20:00.000Z',
    imageKey: 'fruitStall',
  },
  {
    id: 'sample-3',
    vendorAlias: 'Vendor Charlie',
    stallCode: 'C-003',
    category: 'Grains & Cereals',
    contactNumber: '0783456789',
    riskLevel: 'High',
    consent: true,
    imageUri: null,
    timestamp: '2026-09-28T16:10:00.000Z',
    imageKey: 'marketInterior',
  },
];

export const categoryOptions = [
  'Fresh Produce',
  'Fruits',
  'Grains & Cereals',
  'Meat & Fish',
  'Dairy & Eggs',
  'General Goods',
];
