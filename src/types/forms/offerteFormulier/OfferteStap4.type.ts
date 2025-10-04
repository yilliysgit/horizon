// src/types/forms/offerteFormulier/OfferteStap4.type.ts

import type { ProjectFoto } from './OfferteStap3.type';
import type { OfferteStap1 } from './offerteStap1.type';
import type { OfferteStap2 } from './OfferteStap2.type';
import type { OfferteStap3 } from './OfferteStap3.type';

export type HoeVanOnsGehoord =
  | 'google'
  | 'facebook'
  | 'instagram'
  | 'aanbeveling'
  | 'website'
  | 'anders';

export type VerzendStatus =
  | 'niet-verzonden'
  | 'aan-het-verzenden'
  | 'verzonden'
  | 'fout';

export type OfferteStap4 = {
  // Acceptatie van voorwaarden (verplicht voor verzenden)
  algemeneVoorwaardenGeaccepteerd: boolean;

  // Optionele communicatie voorkeuren
  nieuwsbriefAanmelden?: boolean;
  marketingCommunicatie?: boolean;

  // Optionele extra informatie voor verzending
  opmerkingen?: string;

  // Privacy en GDPR
  privacybeleidGelezen?: boolean;
  gegevensverwerking?: boolean;

  // Marketingbron (optioneel)
  hoeVanOnsGehoord?: HoeVanOnsGehoord;
  hoeVanOnsGehoordAnders?: string; // indien 'anders'
};

// Overzicht van alle stappen
export type OfferteOverzicht = {
  stap1: OfferteStap1;
  stap2: OfferteStap2;
  stap3: OfferteStap3;
  stap4: OfferteStap4;

  // Voltooiing
  stap1Voltooid: boolean;
  stap2Voltooid: boolean;
  stap3Voltooid: boolean;
  stap4Voltooid: boolean;

  // Foto’s
  totaalFotos: number;
  projectFotos: ProjectFoto[];
  fotosSuccesvolGeupload: number;
  fotosMetFouten: number;

  // Samenvatting
  klantSamenvatting: string;
  projectSamenvatting: string;

  // Verzenden
  verzendStatus: VerzendStatus;
  verzendFoutmelding?: string;

  // Timestamps
  aangemaaktOp: Date;
  laatstGewijzigdOp: Date;
  verzondenOp?: Date;
};

// Upload-tracking helper
export type FotoUploadStatus = {
  totaalFotos: number;
  geuploadeFotos: number;
  foutieveFotos: number;   // <- spelling fix
  uploadProgress: number;  // 0–100
  isUploadCompleet: boolean;
};

// Validatie-overzicht helper
export type FormulierValidatie = {
  stap1Valid: boolean;
  stap2Valid: boolean;
  stap3Valid: boolean;
  stap4Valid: boolean;
  allesValid: boolean;
  validatieFouten: string[];
};
