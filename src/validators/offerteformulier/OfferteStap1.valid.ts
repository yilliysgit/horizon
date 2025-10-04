// /validators/offerteFormulier/OfferteStap1.validator.ts

import { OfferteStap1 } from "@/types/forms/offerteFormulier/offerteStap1.type";

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
  naam: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s'\-\.]+$/u, // Unicode support + toegevoegde punt voor initialen
  },
  email: {
    maxLength: 254,
    // Iets pragmatischere regex - RFC 5322 is vaak te strikt voor real-world gebruik
    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  telefoon: {
    // Nederlandse patronen - meer flexibel gemaakt
    patterns: [
      /^(\+31|0031)[1-9][0-9]{8}$/,           // +31612345678
      /^0[1-9][0-9]{8}$/,                     // 0612345678  
      /^[1-9][0-9]{8}$/,                      // 612345678
      /^(\+31|0031)[1-9][0-9\-\s]{9,}$/,      // +31-6-12345678 (met koppeltekens/spaties)
      /^0[1-9][0-9\-\s]{9,}$/,                // 06-12345678
    ],
  },
} as const;

const ERROR_MESSAGES = {
  naam: {
    required: 'Naam is verplicht',
    tooShort: `Naam moet minimaal ${VALIDATION_RULES.naam.minLength} karakters zijn`,
    tooLong: `Naam mag maximaal ${VALIDATION_RULES.naam.maxLength} karakters zijn`,
    invalidCharacters: 'Naam mag alleen letters, spaties, koppeltekens en apostroffen bevatten',
  },
  email: {
    required: 'E-mailadres is verplicht',
    tooLong: 'E-mailadres is te lang',
    invalid: 'Voer een geldig e-mailadres in (bijvoorbeeld: naam@bedrijf.nl)',
  },
  telefoon: {
    invalid: 'Voer een geldig Nederlands telefoonnummer in (bijvoorbeeld: 06-12345678 of +31-6-12345678)',
  },
} as const;

// ============================================
// INDIVIDUELE VELD VALIDATORS
// ============================================

const validateNaam: FieldValidator<string> = (naam: string): string => {
  const trimmed = naam.trim();
  
  if (!trimmed) {
    return ERROR_MESSAGES.naam.required;
  }
  
  if (trimmed.length < VALIDATION_RULES.naam.minLength) {
    return ERROR_MESSAGES.naam.tooShort;
  }
  
  if (trimmed.length > VALIDATION_RULES.naam.maxLength) {
    return ERROR_MESSAGES.naam.tooLong;
  }
  
  if (!VALIDATION_RULES.naam.pattern.test(trimmed)) {
    return ERROR_MESSAGES.naam.invalidCharacters;
  }
  
  return '';
};

const validateEmail: FieldValidator<string> = (email: string): string => {
  const trimmed = email.trim();
  
  if (!trimmed) {
    return ERROR_MESSAGES.email.required;
  }
  
  if (trimmed.length > VALIDATION_RULES.email.maxLength) {
    return ERROR_MESSAGES.email.tooLong;
  }
  
  if (!VALIDATION_RULES.email.pattern.test(trimmed)) {
    return ERROR_MESSAGES.email.invalid;
  }
  
  return '';
};

const validateTelefoon: FieldValidator<string | undefined> = (telefoon: string | undefined): string => {
  // Telefoon is optioneel
  if (!telefoon?.trim()) {
    return '';
  }
  
  const trimmed = telefoon.trim();
  // Normaliseer voor validatie (verwijder spaties, koppeltekens, haakjes)
  const normalized = trimmed.replace(/[\s\-\.\(\)]/g, '');
  
  const isValid = VALIDATION_RULES.telefoon.patterns.some(pattern => 
    pattern.test(normalized) || pattern.test(trimmed)
  );
  
  if (!isValid) {
    return ERROR_MESSAGES.telefoon.invalid;
  }
  
  return '';
};

// ============================================
// UTILITY FUNCTIES
// ============================================

/**
 * Normaliseer telefoon nummer naar consistent formaat
 */
export const normalizeTelefoon = (telefoon: string): string => {
  if (!telefoon?.trim()) return '';
  
  const cleaned = telefoon.replace(/[\s\-\.\(\)]/g, '');
  
  // Converteer naar +31 formaat
  if (cleaned.match(/^0031/)) {
    return '+31' + cleaned.substring(4);
  }
  
  if (cleaned.match(/^0[1-9]/)) {
    return '+31' + cleaned.substring(1);
  }
  
  if (cleaned.match(/^\+31/)) {
    return cleaned;
  }
  
  // Als het begint met een cijfer 1-9, veronderstel +31
  if (cleaned.match(/^[1-9]/)) {
    return '+31' + cleaned;
  }
  
  return telefoon; // Return origineel als we het niet kunnen normaliseren
};

/**
 * Valideer een enkel veld uit de form
 */
export const validateSingleField = (
  field: keyof OfferteStap1, 
  value: OfferteStap1[typeof field]
): string => {
  switch (field) {
    case 'naam':
      return validateNaam(value as string);
    case 'email':
      return validateEmail(value as string);
    case 'telefoon':
      return validateTelefoon(value as string | undefined);
    case 'klanttype':
      // Klanttype is altijd geldig (union type)
      return '';
    default:
      return '';
  }
};

/**
 * Check of een veld verplicht is
 */
export const isFieldRequired = (field: keyof OfferteStap1): boolean => {
  return ['naam', 'email'].includes(field);
};

/**
 * Check of form data minimaal compleet is voor voortgang
 */
export const hasMinimalData = (data: OfferteStap1): boolean => {
  return Boolean(data.naam?.trim() && data.email?.trim());
};

// ============================================
// HOOFD VALIDATIE FUNCTIES
// ============================================

/**
 * Valideer alle velden en retourneer errors object
 */
export const validateOfferteStap1 = (data: OfferteStap1): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Valideer elk veld
  const naamError = validateNaam(data.naam);
  if (naamError) errors.naam = naamError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const telefoonError = validateTelefoon(data.telefoon);
  if (telefoonError) errors.telefoon = telefoonError;

  return errors;
};

/**
 * Valideer form en retourneer volledig resultaat
 */
export const validateOfferteStap1Complete = (data: OfferteStap1): ValidationResult => {
  const errors = validateOfferteStap1(data);
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Quick check of form geldig is (zonder error details)
 */
export const isOfferteStap1Valid = (data: OfferteStap1): boolean => {
  const errors = validateOfferteStap1(data);
  return Object.keys(errors).length === 0;
};

// ============================================
// LEGACY EXPORT (backwards compatibility)
// ============================================
export const validateContactGegevensStap1 = validateOfferteStap1;

// ============================================
// DEFAULT EXPORT
// ============================================
export default {
  validate: validateOfferteStap1,
  validateComplete: validateOfferteStap1Complete,
  isValid: isOfferteStap1Valid,
  validateField: validateSingleField,
  hasMinimalData,
  isFieldRequired,
  normalizeTelefoon,
};