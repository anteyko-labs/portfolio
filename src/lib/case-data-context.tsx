"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { CatalogEntry } from "./catalog";
import type { MicroCase } from "./cases-data";

// Case data for the /cases catalog, localized on the server (see localize.ts)
// and provided here so client components never import the data modules.
export type CaseData = {
  catalogEntries: CatalogEntry[];
  microCases: MicroCase[];
  /** Distinct industry groups across the catalog, counted on the server */
  industries: number;
};

const CaseDataContext = createContext<CaseData | null>(null);

export function CaseDataProvider({ value, children }: { value: CaseData; children: ReactNode }) {
  return <CaseDataContext.Provider value={value}>{children}</CaseDataContext.Provider>;
}

export function useCaseData(): CaseData {
  const value = useContext(CaseDataContext);
  if (!value) throw new Error("useCaseData must be used within a CaseDataProvider");
  return value;
}
