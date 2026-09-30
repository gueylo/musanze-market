import React, { createContext, useContext, useMemo, useState } from 'react';

import { initialInspections } from './data';
import { Inspection, InspectionDraft } from './types';

type InspectionContextValue = {
  inspections: Inspection[];
  saveInspection: (draft: InspectionDraft) => Inspection;
  getInspection: (id: string) => Inspection | undefined;
};

const InspectionContext = createContext<InspectionContextValue | undefined>(undefined);

export function InspectionProvider({ children }: { children: React.ReactNode }) {
  const [inspections, setInspections] = useState<Inspection[]>(initialInspections);

  const value = useMemo<InspectionContextValue>(() => ({
    inspections,
    saveInspection: (draft) => {
      const inspection: Inspection = {
        ...draft,
        id: `inspection-${Date.now()}`,
        timestamp: draft.timestamp || new Date().toISOString(),
      };
      setInspections((current) => [inspection, ...current]);
      return inspection;
    },
    getInspection: (id) => inspections.find((inspection) => inspection.id === id),
  }), [inspections]);

  return <InspectionContext.Provider value={value}>{children}</InspectionContext.Provider>;
}

export function useInspections() {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error('useInspections must be used inside InspectionProvider');
  }
  return context;
}
