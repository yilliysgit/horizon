// src/hooks/offerteformulier/useOfferteDataStap4.ts

import { useState, useCallback, useMemo } from 'react';
import {
  OfferteStap4,
  OfferteOverzicht,
  HoeVanOnsGehoord,
  VerzendStatus,
  FormulierValidatie,
  FotoUploadStatus,
} from '@/types/forms/offerteFormulier/OfferteStap4.type';
import type { OfferteStap1 } from '@/types/forms/offerteFormulier/offerteStap1.type';
import type { OfferteStap2 } from '@/types/forms/offerteFormulier/OfferteStap2.type';
import type { OfferteStap3, ProjectFoto } from '@/types/forms/offerteFormulier/OfferteStap3.type';

// Specifieke error type
type OfferteStap4Errors = Partial<Record<keyof OfferteStap4, string>>;

const ERROR_MESSAGES = {
  algemeneVoorwaardenGeaccepteerd: {
    required: 'Algemene voorwaarden moeten geaccepteerd worden',
  },
  hoeVanOnsGehoordAnders: {
    required: 'Specificeer hoe u van ons gehoord heeft',
  },
  opmerkingen: {
    tooLong: 'Opmerkingen mogen maximaal 500 karakters zijn',
  },
} as const;

// Default form state
const DEFAULT_STAP4_STATE: OfferteStap4 = {
  algemeneVoorwaardenGeaccepteerd: false,
  nieuwsbriefAanmelden: false,
  marketingCommunicatie: false,
  opmerkingen: '',
  privacybeleidGelezen: false,
  gegevensverwerking: false,
  hoeVanOnsGehoord: undefined,
  hoeVanOnsGehoordAnders: '',
};

const createDefaultOverzicht = (): OfferteOverzicht => ({
  stap1: {
    klanttype: 'particulier',
    naam: '',
    email: '',
  },
  stap2: {
    straat: '',
    huisnummer: '',
    postcode: '',
    plaats: '',
    land: 'Nederland',
  },
  stap3: {
    projectOmschrijving: '',
    oppervlakte: undefined,
    dienstsoort: undefined,
    werksoort: undefined,
    projectFotos: [],
    urgentie: 'binnen-maand',
    gewensteStartdatum: undefined,
    geschatteDuur: '',
    extraDiensten: [],
    parkerenMogelijk: undefined,
    sleutelsBeschikbaar: undefined,
    aanwezigTijdensWerk: undefined,
    kleurvoorkeuren: '',
    materialenWensen: '',
    bijzondereEisen: '',
    extraOpmerkingen: '',
  },
  stap4: DEFAULT_STAP4_STATE,
  stap1Voltooid: false,
  stap2Voltooid: false,
  stap3Voltooid: false,
  stap4Voltooid: false,
  totaalFotos: 0,
  projectFotos: [],
  fotosSuccesvolGeupload: 0,
  fotosMetFouten: 0,
  klantSamenvatting: '',
  projectSamenvatting: '',
  verzendStatus: 'niet-verzonden',
  verzendFoutmelding: undefined,
  aangemaaktOp: new Date(),
  laatstGewijzigdOp: new Date(),
  verzondenOp: undefined,
});

type BooleanFields =
  | 'algemeneVoorwaardenGeaccepteerd'
  | 'nieuwsbriefAanmelden'
  | 'marketingCommunicatie'
  | 'privacybeleidGelezen'
  | 'gegevensverwerking';

export const useOfferteDataStap4 = () => {
  const [stap4Data, setStap4Data] = useState<OfferteStap4>(DEFAULT_STAP4_STATE);
  const [overzicht, setOverzicht] = useState<OfferteOverzicht>(createDefaultOverzicht());
  const [errors, setErrors] = useState<OfferteStap4Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Type-safe update
  const updateStap4Field = useCallback(
    <K extends keyof OfferteStap4>(field: K, value: OfferteStap4[K]) => {
      setStap4Data((prev) => ({
        ...prev,
        [field]: value,
      }));

      setOverzicht((prev) => ({
        ...prev,
        stap4: {
          ...prev.stap4,
          [field]: value,
        },
        laatstGewijzigdOp: new Date(),
      }));

      if (errors[field]) {
        setErrors((prev) => {
          const { [field]: _removed, ...rest } = prev;
          return rest;
        });
      }
    },
    [errors]
  );

  // Bulk update
  const updateStap4Bulk = useCallback((data: Partial<OfferteStap4>) => {
    setStap4Data((prev) => ({ ...prev, ...data }));
    setOverzicht((prev) => ({
      ...prev,
      stap4: { ...prev.stap4, ...data },
      laatstGewijzigdOp: new Date(),
    }));
  }, []);

  // Toggle booleans
  const toggleCheckbox = useCallback(
    (field: BooleanFields) => {
      const currentValue = stap4Data[field] as boolean;
      updateStap4Field(field, !currentValue);
    },
    [stap4Data, updateStap4Field]
  );

  // Hoe van ons gehoord
  const setHoeVanOnsGehoord = useCallback(
    (bron: HoeVanOnsGehoord) => {
      updateStap4Field('hoeVanOnsGehoord', bron);
      if (bron !== 'anders') {
        updateStap4Field('hoeVanOnsGehoordAnders', '');
      }
    },
    [updateStap4Field]
  );

  // Overzicht bijwerken op basis van stappen
  const updateOverzichtFromStappen = useCallback(
    (stap1Data: OfferteStap1, stap2Data: OfferteStap2, stap3Data: OfferteStap3) => {
      const validateStap1 = (d: OfferteStap1): boolean => Boolean(d.naam?.trim() && d.email?.trim());
      const validateStap2 = (d: OfferteStap2): boolean =>
        Boolean(d.straat?.trim() && d.huisnummer?.trim() && d.postcode?.trim() && d.plaats?.trim());
      const validateStap3 = (d: OfferteStap3): boolean =>
        Boolean(d.projectOmschrijving?.trim() && d.dienstsoort && d.werksoort);
      const validateStap4 = (d: OfferteStap4): boolean => d.algemeneVoorwaardenGeaccepteerd;

      const stap1Voltooid = validateStap1(stap1Data);
      const stap2Voltooid = validateStap2(stap2Data);
      const stap3Voltooid = validateStap3(stap3Data);
      const stap4Voltooid = validateStap4(stap4Data);

      const projectFotos = stap3Data.projectFotos || [];
      const fotosSuccesvolGeupload = projectFotos.filter((f) => f.uploadStatus === 'uploaded').length;
      const fotosMetFouten = projectFotos.filter((f) => f.uploadStatus === 'error').length;

      const klantSamenvatting = stap1Voltooid
        ? `${stap1Data.naam} (${stap1Data.klanttype}) - ${stap1Data.email}${
            (stap1Data as any).telefoon ? ` - ${(stap1Data as any).telefoon}` : ''
          }`
        : 'Klantgegevens niet compleet';

      const projectSamenvatting =
        stap2Voltooid && stap3Voltooid
          ? `${stap2Data.straat} ${stap2Data.huisnummer}, ${stap2Data.postcode} ${stap2Data.plaats} - ${stap3Data.dienstsoort} (${stap3Data.werksoort})`
          : 'Projectgegevens niet compleet';

      setOverzicht((prev) => ({
        ...prev,
        stap1: stap1Data,
        stap2: stap2Data,
        stap3: stap3Data,
        stap4: stap4Data,
        stap1Voltooid,
        stap2Voltooid,
        stap3Voltooid,
        stap4Voltooid,
        totaalFotos: projectFotos.length,
        projectFotos,
        fotosSuccesvolGeupload,
        fotosMetFouten,
        klantSamenvatting,
        projectSamenvatting,
        laatstGewijzigdOp: new Date(),
      }));
    },
    [stap4Data]
  );

  // Versturen toegestaan?
  const canSubmitOfferte = useMemo(
    () =>
      Boolean(
        stap4Data.algemeneVoorwaardenGeaccepteerd &&
          overzicht.stap1Voltooid &&
          overzicht.stap2Voltooid &&
          overzicht.stap3Voltooid
      ),
    [stap4Data.algemeneVoorwaardenGeaccepteerd, overzicht]
  );

  // Verzendstatus
  const setVerzendStatus = useCallback((status: VerzendStatus, foutmelding?: string) => {
    setOverzicht((prev) => ({
      ...prev,
      verzendStatus: status,
      verzendFoutmelding: foutmelding,
      verzondenOp: status === 'verzonden' ? new Date() : prev.verzondenOp,
      laatstGewijzigdOp: new Date(),
    }));
  }, []);

  // Errors
  const setFormErrors = useCallback((newErrors: OfferteStap4Errors) => setErrors(newErrors), []);
  const clearErrors = useCallback(() => setErrors({}), []);

  // Validatie
  const validateForm = useCallback((): OfferteStap4Errors => {
    const newErrors: OfferteStap4Errors = {};

    if (!stap4Data.algemeneVoorwaardenGeaccepteerd) {
      newErrors.algemeneVoorwaardenGeaccepteerd = ERROR_MESSAGES.algemeneVoorwaardenGeaccepteerd.required;
    }

    if (stap4Data.hoeVanOnsGehoord === 'anders' && !stap4Data.hoeVanOnsGehoordAnders?.trim()) {
      newErrors.hoeVanOnsGehoordAnders = ERROR_MESSAGES.hoeVanOnsGehoordAnders.required;
    }

    if (stap4Data.opmerkingen && stap4Data.opmerkingen.length > 500) {
      newErrors.opmerkingen = ERROR_MESSAGES.opmerkingen.tooLong;
    }

    return newErrors;
  }, [stap4Data]);

  const isFormValid = useMemo(() => Object.keys(validateForm()).length === 0, [validateForm]);

  const validateAndSetErrors = useCallback(() => {
    const formErrors = validateForm();
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }, [validateForm]);

  // Resets
  const resetStap4 = useCallback(() => {
    setStap4Data(DEFAULT_STAP4_STATE);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const resetCompleteFormulier = useCallback(() => {
    setStap4Data(DEFAULT_STAP4_STATE);
    setOverzicht(createDefaultOverzicht());
    setErrors({});
    setIsSubmitting(false);
  }, []);

  // Helpers
  const hasFormData = useMemo(
    () =>
      Boolean(
        stap4Data.algemeneVoorwaardenGeaccepteerd ||
          stap4Data.nieuwsbriefAanmelden ||
          stap4Data.marketingCommunicatie ||
          stap4Data.opmerkingen?.trim() ||
          stap4Data.privacybeleidGelezen ||
          stap4Data.gegevensverwerking ||
          stap4Data.hoeVanOnsGehoord ||
          stap4Data.hoeVanOnsGehoordAnders?.trim()
      ),
    [stap4Data]
  );

  const getFieldError = useCallback((field: keyof OfferteStap4) => errors[field], [errors]);
  const hasFieldError = useCallback((field: keyof OfferteStap4) => Boolean(errors[field]), [errors]);
  const setSubmitting = useCallback((s: boolean) => setIsSubmitting(s), []);

  // Validatie-overzicht
  const formulierValidatie = useMemo<FormulierValidatie>(() => {
    const stap1Valid = overzicht.stap1Voltooid;
    const stap2Valid = overzicht.stap2Voltooid;
    const stap3Valid = overzicht.stap3Voltooid;
    const stap4Valid = overzicht.stap4Voltooid;
    const allesValid = stap1Valid && stap2Valid && stap3Valid && stap4Valid;

    const validatieFouten: string[] = [];
    if (!stap1Valid) validatieFouten.push('Klantgegevens niet compleet');
    if (!stap2Valid) validatieFouten.push('Adresgegevens niet compleet');
    if (!stap3Valid) validatieFouten.push('Projectgegevens niet compleet');
    if (!stap4Valid) validatieFouten.push('Algemene voorwaarden niet geaccepteerd');

    return { stap1Valid, stap2Valid, stap3Valid, stap4Valid, allesValid, validatieFouten };
  }, [overzicht]);

  // Foto-upload status
  const fotoUploadStatus = useMemo<FotoUploadStatus>(() => {
    const totaalFotos = overzicht.totaalFotos;
    const geuploadeFotos = overzicht.fotosSuccesvolGeupload;
    const foutieveFotos = overzicht.fotosMetFouten; // <— spelling gelijk aan type
    const uploadProgress = totaalFotos > 0 ? Math.round((geuploadeFotos / totaalFotos) * 100) : 100;
    const isUploadCompleet = totaalFotos === 0 || geuploadeFotos === totaalFotos;

    return { totaalFotos, geuploadeFotos, foutieveFotos, uploadProgress, isUploadCompleet };
  }, [overzicht]);

  // Samenvatting
  const getFormulierSamenvatting = useMemo(
    () => ({
      volledigIngevuld: formulierValidatie.allesValid,
      klaarVoorVerzending: canSubmitOfferte,
      totaalStappenVoltooid: [overzicht.stap1Voltooid, overzicht.stap2Voltooid, overzicht.stap3Voltooid, overzicht.stap4Voltooid].filter(
        Boolean
      ).length,
      klant: overzicht.klantSamenvatting,
      project: overzicht.projectSamenvatting,
      fotos: fotoUploadStatus,
      status: overzicht.verzendStatus,
      validatieFouten: formulierValidatie.validatieFouten,
    }),
    [formulierValidatie, canSubmitOfferte, overzicht, fotoUploadStatus]
  );

  return {
    // State
    stap4Data,
    overzicht,
    errors,
    isSubmitting,

    // Actions
    updateStap4Field,
    updateStap4Bulk,
    toggleCheckbox,
    setHoeVanOnsGehoord,
    updateOverzichtFromStappen,
    setVerzendStatus,
    setFormErrors,
    clearErrors,
    resetStap4,
    resetCompleteFormulier,
    setSubmitting,

    // Validation
    validateForm,
    validateAndSetErrors,
    isFormValid,
    canSubmitOfferte,

    // Helpers
    hasFormData,
    getFieldError,
    hasFieldError,
    formulierValidatie,
    fotoUploadStatus,
    getFormulierSamenvatting,
  };
};
