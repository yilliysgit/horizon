// @/hooks/offerteformulier/useOfferteDataStap3.ts

import { useState, useCallback, useMemo } from 'react';
import {
  OfferteStap3,
  ExtraDiensten,
  Urgentie,
  Oppervlakte,
  ProjectFoto,
  Dienstsoort,
  Werksoort,
  DIENST_WERK_MAPPING,
} from '@/types/forms/offerteFormulier/OfferteStap3.type';

type OfferteStap3Errors = Partial<Record<keyof OfferteStap3, string>>;

const FOTO_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  maxCount: 10,
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const,
} as const;

const ERROR_MESSAGES = {
  projectOmschrijving: {
    required: 'Projectomschrijving is verplicht',
    minLength: 'Geef een uitgebreidere beschrijving (minimaal 10 karakters)',
  },
  dienstsoort: {
    required: 'Selecteer een dienstsoort',
  },
  werksoort: {
    required: 'Selecteer een type werkzaamheden',
  },
  gewensteStartdatum: {
    past: 'Startdatum kan niet in het verleden liggen',
    invalid: 'Ongeldige datum',
  },
  projectFotos: {
    invalidType: 'Alleen JPG, PNG en WebP bestanden zijn toegestaan',
    tooLarge: 'Bestand is te groot (max 5MB per foto)',
    tooMany: "Maximaal 10 foto's toegestaan",
  },
} as const;

const DEFAULT_FORM_STATE: OfferteStap3 = {
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
};

export const useOfferteDataStap3 = () => {
  const [projectData, setProjectData] = useState<OfferteStap3>(DEFAULT_FORM_STATE);
  const [errors, setErrors] = useState<OfferteStap3Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateProject = useCallback(
    <K extends keyof OfferteStap3>(field: K, value: OfferteStap3[K]) => {
      setProjectData((prev) => ({
        ...prev,
        [field]: value,
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

  const updateProjectBulk = useCallback((data: Partial<OfferteStap3>) => {
    setProjectData((prev) => ({ ...prev, ...data }));
  }, []);

  const setDienstsoort = useCallback((dienstsoort: Dienstsoort) => {
    setProjectData((prev) => ({
      ...prev,
      dienstsoort,
      werksoort: undefined,
    }));

    setErrors((prev) => {
      const { dienstsoort: _d, werksoort: _w, ...rest } = prev;
      return rest;
    });
  }, []);

  const setWerksoort = useCallback(
    (werksoort: Werksoort) => {
      if (!projectData.dienstsoort) {
        setErrors((prev) => ({ ...prev, dienstsoort: ERROR_MESSAGES.dienstsoort.required }));
        return;
      }
      const allowed = DIENST_WERK_MAPPING[projectData.dienstsoort];
      if (!allowed.includes(werksoort)) {
        setErrors((prev) => ({
          ...prev,
          werksoort: 'Deze werksoort hoort niet bij de geselecteerde dienstsoort',
        }));
        return;
      }
      updateProject('werksoort', werksoort);
    },
    [projectData.dienstsoort, updateProject]
  );

  const toggleExtraDienst = useCallback((dienst: ExtraDiensten) => {
    setProjectData((prev) => ({
      ...prev,
      extraDiensten: prev.extraDiensten.includes(dienst)
        ? prev.extraDiensten.filter((d) => d !== dienst)
        : [...prev.extraDiensten, dienst],
    }));
  }, []);

  const setBooleanField = useCallback(
    (field: 'parkerenMogelijk' | 'sleutelsBeschikbaar' | 'aanwezigTijdensWerk', value: boolean | undefined) => {
      updateProject(field, value);
    },
    [updateProject]
  );

  const setStartdatum = useCallback(
    (datum: string) => {
      if (datum === '') {
        updateProject('gewensteStartdatum', undefined);
        return;
      }
      const dateObj = new Date(datum);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(dateObj.getTime())) {
        setErrors((prev) => ({ ...prev, gewensteStartdatum: ERROR_MESSAGES.gewensteStartdatum.invalid }));
        return;
      }
      if (dateObj < today) {
        setErrors((prev) => ({ ...prev, gewensteStartdatum: ERROR_MESSAGES.gewensteStartdatum.past }));
        return;
      }
      updateProject('gewensteStartdatum', datum);
    },
    [updateProject]
  );

  const addFoto = useCallback((file: File) => {
    if (!FOTO_CONFIG.allowedTypes.includes(file.type as any)) {
      setErrors((prev) => ({ ...prev, projectFotos: ERROR_MESSAGES.projectFotos.invalidType }));
      return;
    }
    if (file.size > FOTO_CONFIG.maxSize) {
      setErrors((prev) => ({ ...prev, projectFotos: ERROR_MESSAGES.projectFotos.tooLarge }));
      return;
    }

    setProjectData((prev) => {
      if (prev.projectFotos.length >= FOTO_CONFIG.maxCount) {
        setErrors((e) => ({ ...e, projectFotos: ERROR_MESSAGES.projectFotos.tooMany }));
        return prev;
      }
      const id = `foto-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      const preview = URL.createObjectURL(file);
      const newFoto: ProjectFoto = {
        id,
        file,
        preview,
        fileSize: file.size,
        beschrijving: '',
        uploadStatus: 'pending',
      };
      const next = { ...prev, projectFotos: [...prev.projectFotos, newFoto] };

      // clear foto errors
      setErrors((e) => {
        const { projectFotos, ...rest } = e;
        return rest;
      });

      return next;
    });
  }, []);

  const removeFoto = useCallback((id: string) => {
    setProjectData((prev) => {
      const found = prev.projectFotos.find((f) => f.id === id);
      if (found) URL.revokeObjectURL(found.preview);
      return { ...prev, projectFotos: prev.projectFotos.filter((f) => f.id !== id) };
    });
  }, []);

  const updateFotoBeschrijving = useCallback((id: string, beschrijving: string) => {
    setProjectData((prev) => ({
      ...prev,
      projectFotos: prev.projectFotos.map((f) => (f.id === id ? { ...f, beschrijving } : f)),
    }));
  }, []);

  const updateFotoStatus = useCallback((id: string, status: ProjectFoto['uploadStatus'], errorMessage?: string) => {
    setProjectData((prev) => ({
      ...prev,
      projectFotos: prev.projectFotos.map((f) => (f.id === id ? { ...f, uploadStatus: status, errorMessage } : f)),
    }));
  }, []);

  const clearAllFotos = useCallback(() => {
    projectData.projectFotos.forEach((f) => URL.revokeObjectURL(f.preview));
    setProjectData((prev) => ({ ...prev, projectFotos: [] }));
  }, [projectData.projectFotos]);

  const setFormErrors = useCallback((newErrors: OfferteStap3Errors) => setErrors(newErrors), []);
  const clearErrors = useCallback(() => setErrors({}), []);
  const resetForm = useCallback(() => {
    projectData.projectFotos.forEach((f) => URL.revokeObjectURL(f.preview));
    setProjectData(DEFAULT_FORM_STATE);
    setErrors({});
    setIsSubmitting(false);
  }, [projectData.projectFotos]);
  const setSubmitting = useCallback((s: boolean) => setIsSubmitting(s), []);

  const hasFormData = useMemo((): boolean => {
    const { urgentie } = projectData;

    const hasStringContent = [
      projectData.projectOmschrijving,
      projectData.geschatteDuur,
      projectData.kleurvoorkeuren,
      projectData.materialenWensen,
      projectData.bijzondereEisen,
      projectData.extraOpmerkingen,
    ].some((v) => v && v.trim().length > 0);

    const hasSelections = Boolean(
      projectData.dienstsoort ||
        projectData.werksoort ||
        projectData.oppervlakte ||
        projectData.gewensteStartdatum ||
        projectData.extraDiensten.length > 0 ||
        projectData.projectFotos.length > 0
    );

    const hasBooleanSelections = [
      projectData.parkerenMogelijk,
      projectData.sleutelsBeschikbaar,
      projectData.aanwezigTijdensWerk,
    ].some((v) => v !== undefined);

    const hasChangedUrgentie = urgentie !== 'binnen-maand';

    return hasStringContent || hasSelections || hasBooleanSelections || hasChangedUrgentie;
  }, [projectData]);

  const validateForm = useCallback((): OfferteStap3Errors => {
    const newErrors: OfferteStap3Errors = {};
    if (!projectData.projectOmschrijving.trim()) {
      newErrors.projectOmschrijving = ERROR_MESSAGES.projectOmschrijving.required;
    } else if (projectData.projectOmschrijving.trim().length < 10) {
      newErrors.projectOmschrijving = ERROR_MESSAGES.projectOmschrijving.minLength;
    }
    if (!projectData.dienstsoort) newErrors.dienstsoort = ERROR_MESSAGES.dienstsoort.required;
    if (!projectData.werksoort) newErrors.werksoort = ERROR_MESSAGES.werksoort.required;

    if (projectData.gewensteStartdatum) {
      const start = new Date(projectData.gewensteStartdatum);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (start < today) newErrors.gewensteStartdatum = ERROR_MESSAGES.gewensteStartdatum.past;
    }
    return newErrors;
  }, [projectData]);

  const isFormValid = useMemo(() => Object.keys(validateForm()).length === 0, [validateForm]);

  const validateAndSetErrors = useCallback(() => {
    const formErrors = validateForm();
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }, [validateForm]);

  const getFieldError = useCallback((field: keyof OfferteStap3) => errors[field], [errors]);
  const hasFieldError = useCallback((field: keyof OfferteStap3) => Boolean(errors[field]), [errors]);

  const availableWerksoorten = useMemo< Werksoort[] >(
    () => (projectData.dienstsoort ? DIENST_WERK_MAPPING[projectData.dienstsoort] : []),
    [projectData.dienstsoort]
  );

  const getProjectSummary = useMemo((): string => {
    const parts: string[] = [];
    if (projectData.projectOmschrijving) {
      const desc = projectData.projectOmschrijving.slice(0, 50);
      parts.push(desc + (projectData.projectOmschrijving.length > 50 ? '...' : ''));
    }
    if (projectData.dienstsoort) parts.push(`Dienst: ${projectData.dienstsoort}`);
    if (projectData.oppervlakte) parts.push(`Oppervlakte: ${projectData.oppervlakte.replace(/-/g, ' ')}`);
    if (projectData.urgentie) parts.push(`Urgentie: ${projectData.urgentie.replace(/-/g, ' ')}`);
    if (projectData.projectFotos.length > 0) {
      parts.push(`${projectData.projectFotos.length} foto${projectData.projectFotos.length === 1 ? '' : "'s"}`);
    }
    return parts.join(' | ');
  }, [projectData]);

  const fotoUploadStatus = useMemo(() => {
    const fotos = projectData.projectFotos;
    const totaal = fotos.length;
    const geupload = fotos.filter((f) => f.uploadStatus === 'uploaded').length;
    const errorCount = fotos.filter((f) => f.uploadStatus === 'error').length;

    return {
      totaal,
      geupload,
      errors: errorCount,
      progress: totaal > 0 ? Math.round((geupload / totaal) * 100) : 0,
      isCompleet: totaal > 0 && geupload === totaal,
    };
  }, [projectData.projectFotos]);

  return {
    projectData,
    errors,
    isSubmitting,

    updateProject,
    updateProjectBulk,
    setDienstsoort,
    setWerksoort,
    toggleExtraDienst,
    setBooleanField,
    setStartdatum,
    addFoto,
    removeFoto,
    updateFotoBeschrijving,
    updateFotoStatus,
    clearAllFotos,
    setFormErrors,
    clearErrors,
    resetForm,
    setSubmitting,

    validateForm,
    validateAndSetErrors,
    isFormValid,

    hasFormData,
    getFieldError,
    hasFieldError,
    availableWerksoorten,
    getProjectSummary,
    fotoUploadStatus,
  };
};
