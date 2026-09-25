export type RiskLevel = 'Low' | 'Medium' | 'High';
export type LocalImageName = 'volcano' | 'marketExterior' | 'marketInterior' | 'fruitStall' | 'produceStall' | 'sweetPotatoes';

export type FormValues = {
  vendorAlias: string;
  stallCode: string;
  category: string;
  contactNumber: string;
  riskLevel: RiskLevel | '';
  consent: boolean;
};

export type InspectionDraft = FormValues & {
  imageUri: string | null;
  timestamp?: string;
};

export type Inspection = InspectionDraft & {
  id: string;
  timestamp: string;
  imageKey?: LocalImageName;
};

export type RootStackParamList = {
  Splash: undefined;
  Tabs: { screen?: keyof TabParamList } | undefined;
  Evidence: { draft: InspectionDraft };
  Review: { draft: InspectionDraft };
  Success: undefined;
  InspectionDetails: { inspectionId: string };
};

export type TabParamList = {
  Home: undefined;
  'New Inspection': undefined;
  Records: undefined;
};
