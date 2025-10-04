// validators/offerteFormulier/OfferteStap2.validator.ts

import { OfferteStap2, TypeWoning, Eigendom } from "@/types/forms/offerteFormulier/OfferteStap2.type";

// Type voor validatie resultaat
export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string>;
};

// Type voor individuele veld validatie
type FieldValidator<T> = (value: T) => string;

// ============================================
// VALIDATIE CONSTANTEN
// ============================================
const VALIDATION_RULES = {
  straat: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-ZÀ-ÿ0-9\s'\-\.]+$/u, // Letters, cijfers, spaties, apostroffen, koppeltekens, punten
  },
  huisnummer: {
    maxLength: 20,
    // Patronen: 123, 123A, 123-125, 123/125, 123bis, 123rood, etc.
    pattern: /^[0-9]+[a-zA-Z]*(\s?[-\/]\s?[0-9]+[a-zA-Z]*)*$/,
  },
  postcode: {
    // Nederlandse postcode: 1234 AB of 1234AB
    pattern: /^[1-9][0-9]{3}\s?[A-Z]{2}$/,
  },
  plaats: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s'\-]+$/u, // Unicode letters, spaties, apostroffen, koppeltekens
  },
  bouwjaar: {
    min: 1800,
    max: () => new Date().getFullYear() + 2, // Dynamisch huidige jaar + 2
  },
  opmerkingen: {
    maxLength: 500,
  },
} as const;

const ERROR_MESSAGES = {
  straat: {
    required: 'Straatnaam is verplicht',
    tooShort: `Straatnaam moet minimaal ${VALIDATION_RULES.straat.minLength} karakters zijn`,
    tooLong: `Straatnaam mag maximaal ${VALIDATION_RULES.straat.maxLength} karakters zijn`,
    invalidCharacters: 'Straatnaam bevat ongeldige karakters',
  },
  huisnummer: {
    required: 'Huisnummer is verplicht',
    invalid: 'Voer een geldig huisnummer in (bijvoorbeeld: 123, 123A, 123bis, 123-125)',
    tooLong: `Huisnummer mag maximaal ${VALIDATION_RULES.huisnummer.maxLength} karakters zijn`,
  },
  postcode: {
    required: 'Postcode is verplicht',
    invalid: 'Voer een geldige Nederlandse postcode in (bijvoorbeeld: 1234 AB)',
  },
  plaats: {
    required: 'Plaats is verplicht',
    tooShort: `Plaats moet minimaal ${VALIDATION_RULES.plaats.minLength} karakters zijn`,
    tooLong: `Plaats mag maximaal ${VALIDATION_RULES.plaats.maxLength} karakters zijn`,
    invalidCharacters: 'Plaats mag alleen letters, spaties en koppeltekens bevatten',
  },
  bouwjaar: {
    invalid: 'Bouwjaar moet een geldig jaar zijn',
    tooOld: `Bouwjaar kan niet voor ${VALIDATION_RULES.bouwjaar.min} zijn`,
    tooNew: 'Bouwjaar kan niet meer dan 2 jaar in de toekomst zijn',
  },
  opmerkingen: {
    tooLong: `Opmerkingen mogen maximaal ${VALIDATION_RULES.opmerkingen.maxLength} karakters zijn`,
  },
} as const;

// Geldige landen (uitbreidbaar)
const GELDIGE_LANDEN = ['Nederland', 'België', 'Duitsland'] as const;

// ============================================
// INDIVIDUELE VELD VALIDATORS
// ============================================

const validateStraat: FieldValidator<string> = (straat: string): string => {
  const trimmed = straat.trim();
  
  if (!trimmed) {
    return ERROR_MESSAGES.straat.required;
  }
  
  if (trimmed.length < VALIDATION_RULES.straat.minLength) {
    return ERROR_MESSAGES.straat.tooShort;
  }
  
  if (trimmed.length > VALIDATION_RULES.straat.maxLength) {
    return ERROR_MESSAGES.straat.tooLong;
  }
  
  if (!VALIDATION_RULES.straat.pattern.test(trimmed)) {
    return ERROR_MESSAGES.straat.invalidCharacters;
  }
  
  return '';
};

const validateHuisnummer: FieldValidator<string> = (huisnummer: string): string => {
  const trimmed = huisnummer.trim();
  
  if (!trimmed) {
    return ERROR_MESSAGES.huisnummer.required;
  }
  
  if (trimmed.length > VALIDATION_RULES.huisnummer.maxLength) {
    return ERROR_MESSAGES.huisnummer.tooLong;
  }
  
  if (!VALIDATION_RULES.huisnummer.pattern.test(trimmed)) {
    return ERROR_MESSAGES.huisnummer.invalid;
  }
  
  return '';
};

const validatePostcode: FieldValidator<string> = (postcode: string): string => {
  const trimmed = postcode.trim().toUpperCase();
  
  if (!trimmed) {
    return ERROR_MESSAGES.postcode.required;
  }
  
  if (!VALIDATION_RULES.postcode.pattern.test(trimmed)) {
    return ERROR_MESSAGES.postcode.invalid;
  }
  
  return '';
};

const validatePlaats: FieldValidator<string> = (plaats: string): string => {
  const trimmed = plaats.trim();
  
  if (!trimmed) {
    return ERROR_MESSAGES.plaats.required;
  }
  
  if (trimmed.length < VALIDATION_RULES.plaats.minLength) {
    return ERROR_MESSAGES.plaats.tooShort;
  }
  
  if (trimmed.length > VALIDATION_RULES.plaats.maxLength) {
    return ERROR_MESSAGES.plaats.tooLong;
  }
  
  if (!VALIDATION_RULES.plaats.pattern.test(trimmed)) {
    return ERROR_MESSAGES.plaats.invalidCharacters;
  }
  
  return '';
};

const validateLand: FieldValidator<string | undefined> = (land: string | undefined): string => {
  // Land is optioneel, default Nederland
  if (!land?.trim()) {
    return '';
  }
  
  const trimmed = land.trim();
  
  if (!GELDIGE_LANDEN.includes(trimmed as any)) {
    return `Selecteer een geldig land: ${GELDIGE_LANDEN.join(', ')}`;
  }
  
  return '';
};

const validateBouwjaar: FieldValidator<number | undefined> = (bouwjaar: number | undefined): string => {
  // Bouwjaar is optioneel
  if (bouwjaar === undefined || bouwjaar === null) {
    return '';
  }
  
  if (isNaN(bouwjaar)) {
    return ERROR_MESSAGES.bouwjaar.invalid;
  }
  
  if (bouwjaar < VALIDATION_RULES.bouwjaar.min) {
    return ERROR_MESSAGES.bouwjaar.tooOld;
  }
  
  if (bouwjaar > VALIDATION_RULES.bouwjaar.max()) {
    return ERROR_MESSAGES.bouwjaar.tooNew;
  }
  
  return '';
};

const validateOpmerkingen: FieldValidator<string | undefined> = (opmerkingen: string | undefined): string => {
  // Opmerkingen zijn optioneel
  if (!opmerkingen?.trim()) {
    return '';
  }
  
  const trimmed = opmerkingen.trim();
  
  if (trimmed.length > VALIDATION_RULES.opmerkingen.maxLength) {
    return ERROR_MESSAGES.opmerkingen.tooLong;
  }
  
  return '';
};

// TypeWoning en Eigendom validators (optioneel, maar als ingevuld moeten ze geldig zijn)
const validateTypeWoning: FieldValidator<TypeWoning | undefined> = (typeWoning: TypeWoning | undefined): string => {
  if (!typeWoning) return '';
  
  const geldige: TypeWoning[] = ['vrijstaand', 'rijtjeshuis', 'hoekhuis', 'appartement', 'anders'];
  
  if (!geldige.includes(typeWoning)) {
    return 'Selecteer een geldig woningtype';
  }
  
  return '';
};

const validateEigendom: FieldValidator<Eigendom | undefined> = (eigendom: Eigendom | undefined): string => {
  if (!eigendom) return '';
  
  const geldige: Eigendom[] = ['eigenaar', 'huurder', 'aannemer', 'vve'];
  
  if (!geldige.includes(eigendom)) {
    return 'Selecteer een geldige eigendomssituatie';
  }
  
  return '';
};

// ============================================
// UTILITY FUNCTIES
// ============================================

/**
 * Normaliseer postcode naar consistent formaat (1234AB)
 */
export const normalizePostcode = (postcode: string): string => {
  if (!postcode?.trim()) return '';
  
  return postcode.trim().toUpperCase().replace(/\s/g, '');
};

/**
 * Format postcode voor weergave (1234 AB)
 */
export const formatPostcode = (postcode: string): string => {
  const normalized = normalizePostcode(postcode);
  if (normalized.length === 6) {
    return normalized.slice(0, 4) + ' ' + normalized.slice(4);
  }
  return normalized;
};

/**
 * Valideer een enkel veld
 */
export const validateSingleField = (
  field: keyof OfferteStap2, 
  value: OfferteStap2[typeof field]
): string => {
  switch (field) {
    case 'straat':
      return validateStraat(value as string);
    case 'huisnummer':
      return validateHuisnummer(value as string);
    case 'postcode':
      return validatePostcode(value as string);
    case 'plaats':
      return validatePlaats(value as string);
    case 'land':
      return validateLand(value as string | undefined);
    case 'typeWoning':
      return validateTypeWoning(value as TypeWoning | undefined);
    case 'bouwjaar':
      return validateBouwjaar(value as number | undefined);
    case 'eigendom':
      return validateEigendom(value as Eigendom | undefined);
    case 'opmerkingen':
      return validateOpmerkingen(value as string | undefined);
    default:
      return '';
  }
};

/**
 * Check of een veld verplicht is
 */
export const isFieldRequired = (field: keyof OfferteStap2): boolean => {
  return ['straat', 'huisnummer', 'postcode', 'plaats'].includes(field);
};

/**
 * Check of basis adresgegevens compleet zijn
 */
export const hasBasicAddressData = (data: OfferteStap2): boolean => {
  return Boolean(
    data.straat?.trim() &&
    data.huisnummer?.trim() &&
    data.postcode?.trim() &&
    data.plaats?.trim()
  );
};

/**
 * Check of form data minimaal compleet is
 */
export const hasMinimalData = (data: OfferteStap2): boolean => {
  return hasBasicAddressData(data);
};

/**
 * Format volledig adres voor weergave
 */
export const formatAddress = (data: OfferteStap2): string => {
  const parts = [
    data.straat,
    data.huisnummer,
    data.postcode && data.plaats ? 
      `${formatPostcode(data.postcode)} ${data.plaats}` : '',
    data.land && data.land !== 'Nederland' ? data.land : ''
  ].filter(Boolean);
  
  return parts.join(', ');
};

// ============================================
// HOOFD VALIDATIE FUNCTIES
// ============================================

/**
 * Valideer alle velden en retourneer errors object
 */
export const validateOfferteStap2 = (data: OfferteStap2): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Valideer verplichte velden
  const straatError = validateStraat(data.straat);
  if (straatError) errors.straat = straatError;

  const huisnummerError = validateHuisnummer(data.huisnummer);
  if (huisnummerError) errors.huisnummer = huisnummerError;

  const postcodeError = validatePostcode(data.postcode);
  if (postcodeError) errors.postcode = postcodeError;

  const plaatsError = validatePlaats(data.plaats);
  if (plaatsError) errors.plaats = plaatsError;

  // Valideer optionele velden
  const landError = validateLand(data.land);
  if (landError) errors.land = landError;

  const typeWoningError = validateTypeWoning(data.typeWoning);
  if (typeWoningError) errors.typeWoning = typeWoningError;

  const bouwjaarError = validateBouwjaar(data.bouwjaar);
  if (bouwjaarError) errors.bouwjaar = bouwjaarError;

  const eigendomError = validateEigendom(data.eigendom);
  if (eigendomError) errors.eigendom = eigendomError;

  const opmerkingenError = validateOpmerkingen(data.opmerkingen);
  if (opmerkingenError) errors.opmerkingen = opmerkingenError;

  return errors;
};

/**
 * Valideer form en retourneer volledig resultaat
 */
export const validateOfferteStap2Complete = (data: OfferteStap2): ValidationResult => {
  const errors = validateOfferteStap2(data);
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Quick check of form geldig is
 */
export const isOfferteStap2Valid = (data: OfferteStap2): boolean => {
  const errors = validateOfferteStap2(data);
  return Object.keys(errors).length === 0;
};

// ============================================
// LEGACY EXPORT (backwards compatibility)
// ============================================
export const isValidOfferteStap2 = isOfferteStap2Valid;

// ============================================
// DEFAULT EXPORT
// ============================================
export default {
  validate: validateOfferteStap2,
  validateComplete: validateOfferteStap2Complete,
  isValid: isOfferteStap2Valid,
  validateField: validateSingleField,
  hasMinimalData,
  hasBasicAddressData,
  isFieldRequired,
  normalizePostcode,
  formatPostcode,
  formatAddress,
};