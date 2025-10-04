// @/hooks/offerteformulier/useOfferteDataStap2.ts

import { useState, useCallback, useMemo } from 'react';
import type { OfferteStap2 } from '@/types/forms/offerteFormulier/OfferteStap2.type';

// Specifieke error type voor betere type safety
type OfferteStap2Errors = Partial<Record<keyof OfferteStap2, string>>;

// Validation rules
const VALIDATION_RULES = {
  postcode: /^[1-9][0-9]{3}[A-Z]{2}$/i, // NL: 1234AB
  huisnummer: /^[0-9]+[A-Za-z]?/,       // 12, 12A, 12bis
} as const;

const ERROR_MESSAGES = {
  straat: {
    required: 'Straat is verplicht',
    minLength: 'Straat moet minimaal 2 karakters zijn',
  },
  huisnummer: {
    required: 'Huisnummer is verplicht',
    invalid: 'Ongeldig huisnummer format',
  },
  postcode: {
    required: 'Postcode is verplicht',
    invalid: 'Ongeldige postcode (gebruik format: 1234AB)',
  },
  plaats: {
    required: 'Plaats is verplicht',
    minLength: 'Plaats moet minimaal 2 karakters zijn',
  },
  bouwjaar: {
    invalid: 'Voer een realistisch bouwjaar in (1800 - huidig jaar + 5)',
    future: 'Bouwjaar kan niet in de toekomst liggen',
  },
} as const;

// Default form state
const DEFAULT_FORM_STATE: OfferteStap2 = {
  straat: '',
  huisnummer: '',
  postcode: '',
  plaats: '',
  land: 'Nederland',
  typeWoning: undefined,
  bouwjaar: undefined,
  eigendom: undefined,
  opmerkingen: '',
};

export const useOfferteDataStap2 = () => {
  const [projectData, setProjectData] = useState<OfferteStap2>(DEFAULT_FORM_STATE);
  const [errors, setErrors] = useState<OfferteStap2Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Type-safe update functie
  const updateProject = useCallback(<K extends keyof OfferteStap2>(
    field: K,
    value: OfferteStap2[K]
  ) => {
    setProjectData(prev => ({ ...prev, [field]: value }));

    // Clear veld-specifieke error zodra gebruiker aanpast
    if (errors[field]) {
      setErrors(prev => {
        const { [field]: _removed, ...rest } = prev;
        return rest;
      });
    }
  }, [errors]);

  // Bulk update
  const updateProjectBulk = useCallback((data: Partial<OfferteStap2>) => {
    setProjectData(prev => ({ ...prev, ...data }));
  }, []);

  // Bouwjaar met validatie
  const setBouwjaar = useCallback((year: string) => {
    if (year === '') {
      updateProject('bouwjaar', undefined);
      return;
    }

    const yearNumber = parseInt(year, 10);
    const currentYear = new Date().getFullYear();

    if (isNaN(yearNumber) || yearNumber < 1800 || yearNumber > currentYear + 5) {
      setErrors(prev => ({ ...prev, bouwjaar: ERROR_MESSAGES.bouwjaar.invalid }));
      // Sla tóch de waarde op voor betere UX (kan later gecorrigeerd worden)
      setProjectData(prev => ({ ...prev, bouwjaar: yearNumber }));
      return;
    }

    updateProject('bouwjaar', yearNumber);
  }, [updateProject]);

  // Postcode formatteren (spaties weg, uppercase)
  const updatePostcode = useCallback((value: string) => {
    const formatted = value.replace(/\s/g, '').toUpperCase();
    updateProject('postcode', formatted);
  }, [updateProject]);

  // Error helpers
  const setFormErrors = useCallback((newErrors: OfferteStap2Errors) => {
    setErrors(newErrors);
  }, []);

  const clearErrors = useCallback(() => setErrors({}), []);

  const resetForm = useCallback(() => {
    setProjectData(DEFAULT_FORM_STATE);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  // Heeft gebruiker al iets ingevuld?
  const hasFormData = useMemo((): boolean => {
    const hasStringContent = [
      projectData.straat,
      projectData.huisnummer,
      projectData.postcode,
      projectData.plaats,
      projectData.opmerkingen,
    ].some(v => v && v.trim().length > 0);

    const hasSelections = Boolean(
      projectData.typeWoning ||
      projectData.bouwjaar ||
      projectData.eigendom
    );

    const hasChangedLand = projectData.land !== 'Nederland';

    return hasStringContent || hasSelections || hasChangedLand;
  }, [projectData]);

  // Validatie
  const validateForm = useCallback((): OfferteStap2Errors => {
    const newErrors: OfferteStap2Errors = {};

    // Straat
    const straat = projectData.straat?.trim();
    if (!straat)      newErrors.straat = ERROR_MESSAGES.straat.required;
    else if (straat.length < 2) newErrors.straat = ERROR_MESSAGES.straat.minLength;

    // Huisnummer
    const huisnummer = projectData.huisnummer?.trim();
    if (!huisnummer) newErrors.huisnummer = ERROR_MESSAGES.huisnummer.required;
    else if (!VALIDATION_RULES.huisnummer.test(huisnummer)) {
      newErrors.huisnummer = ERROR_MESSAGES.huisnummer.invalid;
    }

    // Postcode
    const postcode = projectData.postcode?.trim();
    if (!postcode) newErrors.postcode = ERROR_MESSAGES.postcode.required;
    else if (!VALIDATION_RULES.postcode.test(postcode)) {
      newErrors.postcode = ERROR_MESSAGES.postcode.invalid;
    }

    // Plaats
    const plaats = projectData.plaats?.trim();
    if (!plaats)      newErrors.plaats = ERROR_MESSAGES.plaats.required;
    else if (plaats.length < 2) newErrors.plaats = ERROR_MESSAGES.plaats.minLength;

    // Bouwjaar (optioneel → indien gevuld, dan valideren)
    if (projectData.bouwjaar) {
      const currentYear = new Date().getFullYear();
      if (projectData.bouwjaar < 1800 || projectData.bouwjaar > currentYear + 5) {
        newErrors.bouwjaar = ERROR_MESSAGES.bouwjaar.invalid;
      }
    }

    return newErrors;
  }, [projectData]);

  const isFormValid = useMemo((): boolean => {
    const formErrors = validateForm();
    return Object.keys(formErrors).length === 0;
  }, [validateForm]);

  const validateAndSetErrors = useCallback((): boolean => {
    const formErrors = validateForm();
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }, [validateForm]);

  // Helpers
  const getFieldError = useCallback((field: keyof OfferteStap2): string | undefined => errors[field], [errors]);
  const hasFieldError = useCallback((field: keyof OfferteStap2): boolean => Boolean(errors[field]), [errors]);
  const setSubmitting = useCallback((submitting: boolean) => setIsSubmitting(submitting), []);

  const hasBasicAddressData = useMemo((): boolean => (
    Boolean(
      projectData.straat?.trim() &&
      projectData.huisnummer?.trim() &&
      projectData.postcode?.trim() &&
      projectData.plaats?.trim()
    )
  ), [projectData]);

  const getFormattedAddress = useMemo((): string => {
    const parts = [
      projectData.straat,
      projectData.huisnummer,
      projectData.postcode && projectData.plaats ? `${projectData.postcode} ${projectData.plaats}` : '',
      projectData.land !== 'Nederland' ? projectData.land : ''
    ].filter(Boolean);
    return parts.join(', ');
  }, [projectData]);

  return {
    // State
    projectData,
    errors,
    isSubmitting,

    // Actions
    updateProject,
    updateProjectBulk,
    setBouwjaar,
    updatePostcode,
    setFormErrors,
    clearErrors,
    resetForm,
    setSubmitting,

    // Validation
    validateForm,
    validateAndSetErrors,
    isFormValid,

    // Helpers
    hasFormData,
    hasBasicAddressData,
    getFieldError,
    hasFieldError,
    getFormattedAddress,
  };
};
