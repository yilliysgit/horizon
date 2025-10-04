// src/validators/offerteFormulier/OfferteStap4.validator.ts

import type { OfferteStap4, HoeVanOnsGehoord } from '@/types/forms/offerteFormulier/OfferteStap4.type';

// Resultaat type
export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string>;
};

type FieldValidator<T> = (value: T) => string;

// ============================================
// CONSTANTEN
// ============================================
const VALIDATION_RULES = {
  hoeVanOnsGehoordAnders: { minLength: 3, maxLength: 100 },
  opmerkingen: { maxLength: 500 },
} as const;

const ERROR_MESSAGES = {
  algemeneVoorwaardenGeaccepteerd: {
    required: 'U moet de algemene voorwaarden accepteren om uw offerte te kunnen verzenden',
  },
  hoeVanOnsGehoord: {
    invalid: 'Selecteer een geldige optie uit de lijst',
  },
  hoeVanOnsGehoordAnders: {
    required: 'Geef aan hoe u van ons gehoord heeft wanneer u "Anders" selecteert',
    tooShort: `Omschrijving moet minimaal ${VALIDATION_RULES.hoeVanOnsGehoordAnders.minLength} karakters zijn`,
    tooLong: `Omschrijving mag maximaal ${VALIDATION_RULES.hoeVanOnsGehoordAnders.maxLength} karakters zijn`,
  },
  opmerkingen: {
    tooLong: `Opmerkingen mogen maximaal ${VALIDATION_RULES.opmerkingen.maxLength} karakters zijn`,
  },
  privacybeleidGelezen: {
    required: 'Lees het privacybeleid door voor het verzenden van uw gegevens',
  },
  gegevensverwerking: {
    required: 'Geef toestemming voor gegevensverwerking om door te kunnen gaan',
  },
} as const;

const GELDIGE_BRONNEN: HoeVanOnsGehoord[] = [
  'google',
  'facebook',
  'instagram',
  'aanbeveling',
  'website',
  'anders',
];

// ============================================
// Veldvalidators
// ============================================
const validateAlgemeneVoorwaarden: FieldValidator<boolean> = (geaccepteerd) =>
  !geaccepteerd ? ERROR_MESSAGES.algemeneVoorwaardenGeaccepteerd.required : '';

const validateHoeVanOnsGehoord: FieldValidator<HoeVanOnsGehoord | undefined> = (bron) => {
  if (!bron) return ''; // optioneel
  return GELDIGE_BRONNEN.includes(bron) ? '' : ERROR_MESSAGES.hoeVanOnsGehoord.invalid;
};

const validateHoeVanOnsGehoordAnders = (
  bron: HoeVanOnsGehoord | undefined,
  anders: string | undefined
): string => {
  if (bron !== 'anders') return '';
  if (!anders?.trim()) return ERROR_MESSAGES.hoeVanOnsGehoordAnders.required;

  const v = anders.trim();
  if (v.length < VALIDATION_RULES.hoeVanOnsGehoordAnders.minLength) return ERROR_MESSAGES.hoeVanOnsGehoordAnders.tooShort;
  if (v.length > VALIDATION_RULES.hoeVanOnsGehoordAnders.maxLength) return ERROR_MESSAGES.hoeVanOnsGehoordAnders.tooLong;
  return '';
};

const validateOpmerkingen: FieldValidator<string | undefined> = (opmerkingen) => {
  if (!opmerkingen?.trim()) return '';
  return opmerkingen.trim().length > VALIDATION_RULES.opmerkingen.maxLength
    ? ERROR_MESSAGES.opmerkingen.tooLong
    : '';
};

// Momenteel optioneel — zet regels aan via PRIVACY_CONFIG
const validatePrivacybeleidGelezen: FieldValidator<boolean | undefined> = () => '';
const validateGegevensverwerking: FieldValidator<boolean | undefined> = () => '';
const validateOptionalBoolean: FieldValidator<boolean | undefined> = () => '';

// ============================================
// Utilities
// ============================================
export const validateSingleField = (
  field: keyof OfferteStap4,
  value: OfferteStap4[typeof field],
  contextData?: Partial<OfferteStap4>
): string => {
  switch (field) {
    case 'algemeneVoorwaardenGeaccepteerd':
      return validateAlgemeneVoorwaarden(value as boolean);
    case 'hoeVanOnsGehoord':
      return validateHoeVanOnsGehoord(value as HoeVanOnsGehoord | undefined);
    case 'hoeVanOnsGehoordAnders':
      return validateHoeVanOnsGehoordAnders(contextData?.hoeVanOnsGehoord, value as string | undefined);
    case 'opmerkingen':
      return validateOpmerkingen(value as string | undefined);
    case 'privacybeleidGelezen':
      return validatePrivacybeleidGelezen(value as boolean | undefined);
    case 'gegevensverwerking':
      return validateGegevensverwerking(value as boolean | undefined);
    case 'nieuwsbriefAanmelden':
    case 'marketingCommunicatie':
      return validateOptionalBoolean(value as boolean | undefined);
    default:
      return '';
  }
};

export const isFieldRequired = (field: keyof OfferteStap4): boolean =>
  ['algemeneVoorwaardenGeaccepteerd'].includes(field);

export const hasMinimalData = (data: OfferteStap4): boolean => data.algemeneVoorwaardenGeaccepteerd;

export const hasMarketingPreferences = (data: OfferteStap4): boolean =>
  Boolean(data.nieuwsbriefAanmelden || data.marketingCommunicatie || data.hoeVanOnsGehoord);

export const hasPrivacyConsent = (data: OfferteStap4): boolean =>
  Boolean(data.privacybeleidGelezen && data.gegevensverwerking);

export const getStap4Summary = (data: OfferteStap4): string => {
  const parts: string[] = [];

  if (data.algemeneVoorwaardenGeaccepteerd) parts.push('Voorwaarden geaccepteerd');

  if (data.hoeVanOnsGehoord) {
    const bron =
      data.hoeVanOnsGehoord === 'anders' && data.hoeVanOnsGehoordAnders
        ? data.hoeVanOnsGehoordAnders
        : data.hoeVanOnsGehoord;
    parts.push(`Via: ${bron}`);
  }

  if (data.nieuwsbriefAanmelden) parts.push('Nieuwsbrief');
  if (data.marketingCommunicatie) parts.push('Marketing');
  if (data.opmerkingen?.trim()) parts.push('Met opmerkingen');

  return parts.length ? parts.join(' | ') : 'Geen aanvullende informatie';
};

// ============================================
// Privacy configuratie
// ============================================
export const PRIVACY_CONFIG = {
  requirePrivacybeleidGelezen: false,
  requireGegevensverwerking: false,
  validatePrivacyFields: false,
} as const;

// Let op: muteren van een as-const object is bewust via any-cast
export const updatePrivacyConfig = (config: Partial<typeof PRIVACY_CONFIG>) => {
  Object.assign(PRIVACY_CONFIG as any, config);
};

// ============================================
// Hoofdvalidatie
// ============================================
export const validateOfferteStap4 = (data: OfferteStap4): Record<string, string> => {
  const errors: Record<string, string> = {};

  const e1 = validateAlgemeneVoorwaarden(data.algemeneVoorwaardenGeaccepteerd);
  if (e1) errors.algemeneVoorwaardenGeaccepteerd = e1;

  const e2 = validateHoeVanOnsGehoord(data.hoeVanOnsGehoord);
  if (e2) errors.hoeVanOnsGehoord = e2;

  const e3 = validateHoeVanOnsGehoordAnders(data.hoeVanOnsGehoord, data.hoeVanOnsGehoordAnders);
  if (e3) errors.hoeVanOnsGehoordAnders = e3;

  const e4 = validateOpmerkingen(data.opmerkingen);
  if (e4) errors.opmerkingen = e4;

  if (PRIVACY_CONFIG.validatePrivacyFields) {
    if (PRIVACY_CONFIG.requirePrivacybeleidGelezen) {
      const e5 = validatePrivacybeleidGelezen(data.privacybeleidGelezen);
      if (e5) errors.privacybeleidGelezen = e5;
    }
    if (PRIVACY_CONFIG.requireGegevensverwerking) {
      const e6 = validateGegevensverwerking(data.gegevensverwerking);
      if (e6) errors.gegevensverwerking = e6;
    }
  }

  return errors;
};

export const validateOfferteStap4Complete = (data: OfferteStap4): ValidationResult => {
  const errors = validateOfferteStap4(data);
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const isOfferteStap4Valid = (data: OfferteStap4): boolean =>
  Object.keys(validateOfferteStap4(data)).length === 0;

export const canSubmitOfferte = (data: OfferteStap4): boolean =>
  data.algemeneVoorwaardenGeaccepteerd && isOfferteStap4Valid(data);

// legacy alias
export const isValidOfferteStap4 = isOfferteStap4Valid;

// ============================================
// Default export
// ============================================
export default {
  validate: validateOfferteStap4,
  validateComplete: validateOfferteStap4Complete,
  isValid: isOfferteStap4Valid,
  canSubmit: canSubmitOfferte,
  validateField: validateSingleField,
  hasMinimalData,
  hasMarketingPreferences,
  hasPrivacyConsent,
  isFieldRequired,
  getStap4Summary,
  PRIVACY_CONFIG,
  updatePrivacyConfig,
};
