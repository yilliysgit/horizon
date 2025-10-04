// hooks/offerteformulier/useOfferteDataStap1.ts

import { useState, useCallback, useMemo } from 'react';
import { OfferteStap1 } from '@/types/forms/offerteFormulier/offerteStap1.type';

// Specifieke error type voor betere type safety
type OfferteStap1Errors = Partial<Record<keyof OfferteStap1, string>>;

// Validation rules - maakt testing en onderhoud makkelijker
const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Flexibelere telefoon regex - ondersteunt meer formaten
  phone: /^(\+31|0031|0)[1-9][\d\s\-]{8,}$/,
} as const;

const ERROR_MESSAGES = {
  naam: {
    required: 'Naam is verplicht',
    minLength: 'Naam moet minimaal 2 karakters zijn',
  },
  email: {
    required: 'E-mailadres is verplicht',
    invalid: 'Ongeldig e-mailadres',
  },
  telefoon: {
    invalid: 'Ongeldig telefoonnummer (gebruik 06-12345678 of +31612345678)',
  },
} as const;

// Default form state - herbruikbaar
const DEFAULT_FORM_STATE: OfferteStap1 = {
  klanttype: 'particulier',
  naam: '',
  email: '',
};

export const useOfferteDataStap1 = () => {
  const [contactData, setContactData] = useState<OfferteStap1>(DEFAULT_FORM_STATE);
  const [errors, setErrors] = useState<OfferteStap1Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Type-safe update functie met useCallback voor performance
  const updateContact = useCallback(<K extends keyof OfferteStap1>(
    field: K, 
    value: OfferteStap1[K]
  ) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const { [field]: removed, ...rest } = prev;
        return rest;
      });
    }
  }, [errors]);

  // Bulk update functie voor het laden van opgeslagen data
  const updateContactBulk = useCallback((data: Partial<OfferteStap1>) => {
    setContactData(prev => ({ ...prev, ...data }));
  }, []);

  const setFormErrors = useCallback((newErrors: OfferteStap1Errors) => {
    setErrors(newErrors);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const resetForm = useCallback(() => {
    setContactData(DEFAULT_FORM_STATE);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  // Memoized check voor form data - voorkomt onnodige re-renders
  const hasFormData = useMemo((): boolean => {
    const { klanttype, ...restData } = contactData;
    
    // Check of er inhoud is in naam, email of telefoon
    const hasContent = Object.values(restData).some(value => 
      typeof value === 'string' && value.trim().length > 0
    );
    
    // Of klanttype is veranderd van default
    const hasChangedKlanttype = klanttype !== 'particulier';
    
    return hasContent || hasChangedKlanttype;
  }, [contactData]);

  // Verbeterde validatie met meer specifieke regels
  const validateForm = useCallback((): OfferteStap1Errors => {
    const newErrors: OfferteStap1Errors = {};

    // Naam validatie
    const naam = contactData.naam?.trim();
    if (!naam) {
      newErrors.naam = ERROR_MESSAGES.naam.required;
    } else if (naam.length < 2) {
      newErrors.naam = ERROR_MESSAGES.naam.minLength;
    }

    // Email validatie
    const email = contactData.email?.trim();
    if (!email) {
      newErrors.email = ERROR_MESSAGES.email.required;
    } else if (!VALIDATION_RULES.email.test(email)) {
      newErrors.email = ERROR_MESSAGES.email.invalid;
    }

    // Telefoon validatie (optioneel, maar als ingevuld moet het geldig zijn)
    const telefoon = contactData.telefoon?.trim();
    if (telefoon) {
      // Normaliseer telefoon nummer voor validatie
      const normalizedPhone = telefoon.replace(/[\s\-\(\)]/g, '');
      if (!VALIDATION_RULES.phone.test(normalizedPhone)) {
        newErrors.telefoon = ERROR_MESSAGES.telefoon.invalid;
      }
    }

    return newErrors;
  }, [contactData]);

  // Memoized form validity check
  const isFormValid = useMemo((): boolean => {
    const formErrors = validateForm();
    return Object.keys(formErrors).length === 0;
  }, [validateForm]);

  // Helper voor het verkrijgen van specifieke veld errors
  const getFieldError = useCallback((field: keyof OfferteStap1): string | undefined => {
    return errors[field];
  }, [errors]);

  // Helper voor het checken of een specifiek veld errors heeft
  const hasFieldError = useCallback((field: keyof OfferteStap1): boolean => {
    return Boolean(errors[field]);
  }, [errors]);

  // Validate en set errors in één keer - handig voor form submission
  const validateAndSetErrors = useCallback((): boolean => {
    const formErrors = validateForm();
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }, [validateForm]);

  // Helper voor form submission state
  const setSubmitting = useCallback((submitting: boolean) => {
    setIsSubmitting(submitting);
  }, []);

  // Normalizeer telefoon nummer voor opslag
  const normalizePhoneNumber = useCallback((phone: string): string => {
    if (!phone) return '';
    
    // Remove alle non-digit characters behalve +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Convert 0031 naar +31
    if (cleaned.startsWith('0031')) {
      return '+31' + cleaned.substring(4);
    }
    
    // Convert 06 naar +316
    if (cleaned.startsWith('06')) {
      return '+31' + cleaned.substring(1);
    }
    
    return cleaned;
  }, []);

  // Update telefoon met normalisatie
  const updateTelefoon = useCallback((value: string) => {
    const normalized = normalizePhoneNumber(value);
    updateContact('telefoon', normalized);
  }, [updateContact, normalizePhoneNumber]);

  return {
    // State
    contactData,
    errors,
    isSubmitting,
    
    // Actions
    updateContact,
    updateContactBulk,
    updateTelefoon,
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
    getFieldError,
    hasFieldError,
    normalizePhoneNumber,
  };
};