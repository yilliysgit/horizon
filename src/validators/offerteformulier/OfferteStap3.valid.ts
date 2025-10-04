// validators/offerteFormulier/OfferteStap3.validator.ts

import { 
  OfferteStap3, 
  Urgentie, 
  Oppervlakte, 
  ExtraDiensten, 
  Dienstsoort, 
  Werksoort,
  DIENST_WERK_MAPPING 
} from '@/types/forms/offerteFormulier/OfferteStap3.type';

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
  projectOmschrijving: {
    minLength: 10,
    maxLength: 1000,
  },
  optionalText: {
    kleurvoorkeuren: { maxLength: 200 },
    materialenWensen: { maxLength: 300 },
    bijzondereEisen: { maxLength: 300 },
    extraOpmerkingen: { maxLength: 500 },
    geschatteDuur: { maxLength: 50 },
  },
  startDatum: {
    maxYearsInFuture: 2,
  },
} as const;

const ERROR_MESSAGES = {
  projectOmschrijving: {
    required: 'Projectomschrijving is verplicht',
    tooShort: `Projectomschrijving moet minimaal ${VALIDATION_RULES.projectOmschrijving.minLength} karakters zijn`,
    tooLong: `Projectomschrijving mag maximaal ${VALIDATION_RULES.projectOmschrijving.maxLength} karakters zijn`,
  },
  dienstsoort: {
    required: 'Selecteer een dienstsoort',
    invalid: 'Selecteer een geldige dienstsoort',
  },
  werksoort: {
    required: 'Selecteer een type werkzaamheden',
    invalid: 'Selecteer een geldige werksoort',
    mismatch: 'Deze werksoort hoort niet bij de geselecteerde dienstsoort',
  },
  gewensteStartdatum: {
    invalid: 'Voer een geldige datum in',
    past: 'Startdatum kan niet in het verleden liggen',
    tooFar: 'Startdatum kan niet meer dan 2 jaar in de toekomst liggen',
  },
  urgentie: {
    invalid: 'Selecteer een geldige urgentie optie',
  },
  oppervlakte: {
    invalid: 'Selecteer een geldige oppervlakte optie',
  },
  extraDiensten: {
    invalid: 'Ongeldige extra diensten geselecteerd',
    tooMany: 'Selecteer maximaal 6 extra diensten',
  },
} as const;

// Geldige opties
const GELDIGE_URGENTIE: Urgentie[] = [
  'direct',
  'binnen-2-weken', 
  'binnen-maand',
  'binnen-3-maanden',
  'geen-haast'
];

const GELDIGE_OPPERVLAKTE: Oppervlakte[] = [
  'klein-onder-50m2',
  'middel-50-100m2',
  'groot-100-200m2', 
  'zeer-groot-boven-200m2',
  'weet-niet'
];

const GELDIGE_EXTRA_DIENSTEN: ExtraDiensten[] = [
  'materiaal-inkoop',
  'afval-afvoer',
  'meubels-verplaatsen',
  'grondwerk-voorbereiden',
  'na-reiniging',
  'garantie-onderhoud'
];

// ============================================
// INDIVIDUELE VELD VALIDATORS
// ============================================

const validateProjectOmschrijving: FieldValidator<string> = (omschrijving: string): string => {
  const trimmed = omschrijving.trim();
  
  if (!trimmed) {
    return ERROR_MESSAGES.projectOmschrijving.required;
  }
  
  if (trimmed.length < VALIDATION_RULES.projectOmschrijving.minLength) {
    return ERROR_MESSAGES.projectOmschrijving.tooShort;
  }
  
  if (trimmed.length > VALIDATION_RULES.projectOmschrijving.maxLength) {
    return ERROR_MESSAGES.projectOmschrijving.tooLong;
  }
  
  return '';
};

const validateDienstsoort: FieldValidator<Dienstsoort | undefined> = (dienstsoort: Dienstsoort | undefined): string => {
  if (!dienstsoort) {
    return ERROR_MESSAGES.dienstsoort.required;
  }
  
  const geldireDienstsoorten = Object.keys(DIENST_WERK_MAPPING) as Dienstsoort[];
  if (!geldireDienstsoorten.includes(dienstsoort)) {
    return ERROR_MESSAGES.dienstsoort.invalid;
  }
  
  return '';
};

const validateWerksoort = (werksoort: Werksoort | undefined, dienstsoort: Dienstsoort | undefined): string => {
  if (!werksoort) {
    return ERROR_MESSAGES.werksoort.required;
  }
  
  if (!dienstsoort) {
    return ERROR_MESSAGES.dienstsoort.required;
  }
  
  const allowedWerksoorten = DIENST_WERK_MAPPING[dienstsoort];
  if (!allowedWerksoorten.includes(werksoort)) {
    return ERROR_MESSAGES.werksoort.mismatch;
  }
  
  return '';
};

const validateGewensteStartdatum: FieldValidator<string | undefined> = (startdatum: string | undefined): string => {
  // Startdatum is optioneel
  if (!startdatum?.trim()) {
    return '';
  }
  
  const dateObj = new Date(startdatum);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check of datum geldig is
  if (isNaN(dateObj.getTime())) {
    return ERROR_MESSAGES.gewensteStartdatum.invalid;
  }
  
  // Check of datum niet in het verleden ligt
  if (dateObj < today) {
    return ERROR_MESSAGES.gewensteStartdatum.past;
  }
  
  // Check of datum niet meer dan 2 jaar in de toekomst ligt
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + VALIDATION_RULES.startDatum.maxYearsInFuture);
  
  if (dateObj > maxDate) {
    return ERROR_MESSAGES.gewensteStartdatum.tooFar;
  }
  
  return '';
};

const validateUrgentie: FieldValidator<Urgentie> = (urgentie: Urgentie): string => {
  if (!GELDIGE_URGENTIE.includes(urgentie)) {
    return ERROR_MESSAGES.urgentie.invalid;
  }
  
  return '';
};

const validateOppervlakte: FieldValidator<Oppervlakte | undefined> = (oppervlakte: Oppervlakte | undefined): string => {
  // Oppervlakte is optioneel
  if (!oppervlakte) {
    return '';
  }
  
  if (!GELDIGE_OPPERVLAKTE.includes(oppervlakte)) {
    return ERROR_MESSAGES.oppervlakte.invalid;
  }
  
  return '';
};

const validateExtraDiensten: FieldValidator<ExtraDiensten[]> = (extraDiensten: ExtraDiensten[]): string => {
  // Extra diensten zijn optioneel
  if (!extraDiensten || extraDiensten.length === 0) {
    return '';
  }
  
  // Check of alle geselecteerde diensten geldig zijn
  const ongeldireDiensten = extraDiensten.filter(d => !GELDIGE_EXTRA_DIENSTEN.includes(d));
  
  if (ongeldireDiensten.length > 0) {
    return `${ERROR_MESSAGES.extraDiensten.invalid}: ${ongeldireDiensten.join(', ')}`;
  }
  
  if (extraDiensten.length > 6) {
    return ERROR_MESSAGES.extraDiensten.tooMany;
  }
  
  return '';
};

const validateOptionalTextField = (
  value: string | undefined, 
  fieldName: string, 
  maxLength: number
): string => {
  // Tekstvelden zijn optioneel
  if (!value?.trim()) {
    return '';
  }
  
  const trimmed = value.trim();
  
  if (trimmed.length > maxLength) {
    return `${fieldName} mag maximaal ${maxLength} karakters zijn`;
  }
  
  return '';
};

// ============================================
// UTILITY FUNCTIES
// ============================================

/**
 * Valideer een enkel veld
 */
export const validateSingleField = (
  field: keyof OfferteStap3, 
  value: OfferteStap3[typeof field],
  contextData?: Partial<OfferteStap3>
): string => {
  switch (field) {
    case 'projectOmschrijving':
      return validateProjectOmschrijving(value as string);
    case 'dienstsoort':
      return validateDienstsoort(value as Dienstsoort | undefined);
    case 'werksoort':
      return validateWerksoort(
        value as Werksoort | undefined, 
        contextData?.dienstsoort
      );
    case 'gewensteStartdatum':
      return validateGewensteStartdatum(value as string | undefined);
    case 'urgentie':
      return validateUrgentie(value as Urgentie);
    case 'oppervlakte':
      return validateOppervlakte(value as Oppervlakte | undefined);
    case 'extraDiensten':
      return validateExtraDiensten(value as ExtraDiensten[]);
    case 'geschatteDuur':
      return validateOptionalTextField(
        value as string | undefined, 
        'Geschatte duur', 
        VALIDATION_RULES.optionalText.geschatteDuur.maxLength
      );
    case 'kleurvoorkeuren':
      return validateOptionalTextField(
        value as string | undefined, 
        'Kleurvoorkeuren', 
        VALIDATION_RULES.optionalText.kleurvoorkeuren.maxLength
      );
    case 'materialenWensen':
      return validateOptionalTextField(
        value as string | undefined, 
        'Materialen wensen', 
        VALIDATION_RULES.optionalText.materialenWensen.maxLength
      );
    case 'bijzondereEisen':
      return validateOptionalTextField(
        value as string | undefined, 
        'Bijzondere eisen', 
        VALIDATION_RULES.optionalText.bijzondereEisen.maxLength
      );
    case 'extraOpmerkingen':
      return validateOptionalTextField(
        value as string | undefined, 
        'Extra opmerkingen', 
        VALIDATION_RULES.optionalText.extraOpmerkingen.maxLength
      );
    default:
      return '';
  }
};

/**
 * Check of een veld verplicht is
 */
export const isFieldRequired = (field: keyof OfferteStap3): boolean => {
  return ['projectOmschrijving', 'dienstsoort', 'werksoort', 'urgentie'].includes(field);
};

/**
 * Check of basis projectgegevens compleet zijn
 */
export const hasBasicProjectData = (data: OfferteStap3): boolean => {
  return Boolean(
    data.projectOmschrijving?.trim() &&
    data.dienstsoort &&
    data.werksoort
  );
};

/**
 * Check of form data minimaal compleet is
 */
export const hasMinimalData = (data: OfferteStap3): boolean => {
  return hasBasicProjectData(data);
};

/**
 * Get project type summary
 */
export const getProjectTypeSummary = (data: OfferteStap3): string => {
  const parts: string[] = [];
  
  if (data.dienstsoort) {
    parts.push(data.dienstsoort);
  }
  
  if (data.werksoort) {
    parts.push(data.werksoort);
  }
  
  if (data.oppervlakte) {
    parts.push(data.oppervlakte.replace('-', ' '));
  }
  
  if (data.urgentie) {
    parts.push(`urgentie: ${data.urgentie.replace('-', ' ')}`);
  }
  
  return parts.join(' | ');
};

// ============================================
// HOOFD VALIDATIE FUNCTIES
// ============================================

/**
 * Valideer alle velden en retourneer errors object
 */
export const validateOfferteStap3 = (data: OfferteStap3): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Verplichte velden
  const projectOmschrijvingError = validateProjectOmschrijving(data.projectOmschrijving);
  if (projectOmschrijvingError) errors.projectOmschrijving = projectOmschrijvingError;

  const dienstsoortError = validateDienstsoort(data.dienstsoort);
  if (dienstsoortError) errors.dienstsoort = dienstsoortError;

  const werksoortError = validateWerksoort(data.werksoort, data.dienstsoort);
  if (werksoortError) errors.werksoort = werksoortError;

  const urgentieError = validateUrgentie(data.urgentie);
  if (urgentieError) errors.urgentie = urgentieError;

  // Optionele velden
  const startdatumError = validateGewensteStartdatum(data.gewensteStartdatum);
  if (startdatumError) errors.gewensteStartdatum = startdatumError;

  const oppervlakteError = validateOppervlakte(data.oppervlakte);
  if (oppervlakteError) errors.oppervlakte = oppervlakteError;

  const extraDienstenError = validateExtraDiensten(data.extraDiensten);
  if (extraDienstenError) errors.extraDiensten = extraDienstenError;

  // Optionele tekstvelden
  const geschatteDuurError = validateOptionalTextField(
    data.geschatteDuur, 
    'Geschatte duur', 
    VALIDATION_RULES.optionalText.geschatteDuur.maxLength
  );
  if (geschatteDuurError) errors.geschatteDuur = geschatteDuurError;

  const kleurvoorkeurenError = validateOptionalTextField(
    data.kleurvoorkeuren, 
    'Kleurvoorkeuren', 
    VALIDATION_RULES.optionalText.kleurvoorkeuren.maxLength
  );
  if (kleurvoorkeurenError) errors.kleurvoorkeuren = kleurvoorkeurenError;

  const materialenWensenError = validateOptionalTextField(
    data.materialenWensen, 
    'Materialen wensen', 
    VALIDATION_RULES.optionalText.materialenWensen.maxLength
  );
  if (materialenWensenError) errors.materialenWensen = materialenWensenError;

  const bijzondereEisenError = validateOptionalTextField(
    data.bijzondereEisen, 
    'Bijzondere eisen', 
    VALIDATION_RULES.optionalText.bijzondereEisen.maxLength
  );
  if (bijzondereEisenError) errors.bijzondereEisen = bijzondereEisenError;

  const extraOpmerkingenError = validateOptionalTextField(
    data.extraOpmerkingen, 
    'Extra opmerkingen', 
    VALIDATION_RULES.optionalText.extraOpmerkingen.maxLength
  );
  if (extraOpmerkingenError) errors.extraOpmerkingen = extraOpmerkingenError;

  return errors;
};

/**
 * Valideer form en retourneer volledig resultaat
 */
export const validateOfferteStap3Complete = (data: OfferteStap3): ValidationResult => {
  const errors = validateOfferteStap3(data);
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Quick check of form geldig is
 */
export const isOfferteStap3Valid = (data: OfferteStap3): boolean => {
  const errors = validateOfferteStap3(data);
  return Object.keys(errors).length === 0;
};

// ============================================
// LEGACY EXPORT (backwards compatibility)
// ============================================
export const isValidOfferteStap3 = isOfferteStap3Valid;

// ============================================
// DEFAULT EXPORT
// ============================================
export default {
  validate: validateOfferteStap3,
  validateComplete: validateOfferteStap3Complete,
  isValid: isOfferteStap3Valid,
  validateField: validateSingleField,
  hasMinimalData,
  hasBasicProjectData,
  isFieldRequired,
  getProjectTypeSummary,
};