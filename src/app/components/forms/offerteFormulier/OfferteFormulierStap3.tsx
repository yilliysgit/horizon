import React from 'react';
import { useOfferteDataStap3 } from '@/hooks/offerteformulier/useOfferteDataStap3';
import { validateOfferteStap3 } from '@/validators/offerteformulier/OfferteStap3.valid';
import type { 
  OfferteStap3, 
  Dienstsoort, 
  Werksoort, 
  Urgentie, 
  Oppervlakte, 
  ExtraDiensten 
} from '@/types/forms/offerteFormulier/OfferteStap3.type';
import { DIENST_LABELS, WERK_LABELS } from '@/types/forms/offerteFormulier/OfferteStap3.type';

type OfferteStap3ErrorsUI = Partial<Record<keyof OfferteStap3, string>>;


interface OfferteStap3Props {
  onNext: () => void;
  onPrevious: () => void;
  onDataChange?: (data: OfferteStap3) => void;
}

export default function OfferteStap3({ onNext, onPrevious, onDataChange }: OfferteStap3Props) {
  const {
    projectData,
    errors,
    updateProject,
    setDienstsoort,
    setWerksoort,
    toggleExtraDienst,
    setBooleanField,
    setStartdatum,
    addFoto,
    removeFoto,
    updateFotoBeschrijving,
    setFormErrors,
    isFormValid,
    hasFormData,
    availableWerksoorten,
    fotoUploadStatus
  } = useOfferteDataStap3();

const handleNext = () => {
  // Gebruik externe validator als die bestaat, anders basis validatie
  let validationErrors: OfferteStap3ErrorsUI = {};

  try {
    validationErrors = validateOfferteStap3
      ? (validateOfferteStap3(projectData) as OfferteStap3ErrorsUI)
      : {};
  } catch {
    // Fallback validatie als externe validator niet bestaat
    validationErrors = {};
    if (!projectData.projectOmschrijving?.trim()) {
      validationErrors.projectOmschrijving = 'Projectomschrijving is verplicht';
    }
    if (!projectData.dienstsoort) {
      validationErrors.dienstsoort = 'Selecteer een dienstsoort';
    }
    if (!projectData.werksoort) {
      validationErrors.werksoort = 'Selecteer een type werkzaamheden';
    }
  }

  if (Object.keys(validationErrors).length > 0) {
    setFormErrors(validationErrors);
    return;
  }

  onDataChange?.(projectData);
  onNext();
};

  // Eenvoudige submit check
  const canSubmit = Boolean(
    projectData.projectOmschrijving?.trim() &&
    projectData.dienstsoort &&
    projectData.werksoort &&
    Object.keys(errors).length === 0
  );

  const urgentieOpties: { value: Urgentie; label: string }[] = [
    { value: 'direct', label: 'Direct (binnen 1 week)' },
    { value: 'binnen-2-weken', label: 'Binnen 2 weken' },
    { value: 'binnen-maand', label: 'Binnen een maand' },
    { value: 'binnen-3-maanden', label: 'Binnen 3 maanden' },
    { value: 'geen-haast', label: 'Geen haast' }
  ];

  const oppervlakteOpties: { value: Oppervlakte; label: string }[] = [
    { value: 'klein-onder-50m2', label: 'Klein (onder 50m²)' },
    { value: 'middel-50-100m2', label: 'Middel (50-100m²)' },
    { value: 'groot-100-200m2', label: 'Groot (100-200m²)' },
    { value: 'zeer-groot-boven-200m2', label: 'Zeer groot (boven 200m²)' },
    { value: 'weet-niet', label: 'Weet ik niet' }
  ];

  const extraDienstenOpties: { value: ExtraDiensten; label: string }[] = [
    { value: 'materiaal-inkoop', label: 'Materiaal inkoop' },
    { value: 'afval-afvoer', label: 'Afval afvoer' },
    { value: 'meubels-verplaatsen', label: 'Meubels verplaatsen' },
    { value: 'grondwerk-voorbereiden', label: 'Grondwerk voorbereiden' },
    { value: 'na-reiniging', label: 'Na-reiniging' },
    { value: 'garantie-onderhoud', label: 'Garantie & onderhoud' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        addFoto(file);
      });
    }
    // Reset input value zodat dezelfde file opnieuw geupload kan worden
    event.target.value = '';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Projectdetails
        </h1>
        <p className="text-gray-600">
          Stap 3 van 4: Wat wilt u laten doen?
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Projectomschrijving */}
        <div>
          <label htmlFor="projectOmschrijving" className="block text-sm font-medium text-gray-700 mb-2">
            Projectomschrijving *
          </label>
          <textarea
            id="projectOmschrijving"
            value={projectData.projectOmschrijving}
            onChange={(e) => updateProject('projectOmschrijving', e.target.value)}
            placeholder="Beschrijf wat u graag wilt laten doen. Hoe meer details, hoe beter we u kunnen helpen."
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.projectOmschrijving 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            aria-invalid={errors.projectOmschrijving ? 'true' : 'false'}
            aria-describedby={errors.projectOmschrijving ? 'projectOmschrijving-error' : undefined}
          />
          {errors.projectOmschrijving && (
            <p id="projectOmschrijving-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.projectOmschrijving}
            </p>
          )}
        </div>

        {/* Dienstsoort en Werksoort */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Type werkzaamheden *</h2>
          
          {/* Dienstsoort */}
          <div className="mb-6">
            <label htmlFor="dienstsoort" className="block text-sm font-medium text-gray-700 mb-2">
              Hoofdcategorie *
            </label>
            <select
              id="dienstsoort"
              value={projectData.dienstsoort || ''}
              onChange={(e) => setDienstsoort(e.target.value as Dienstsoort)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.dienstsoort ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecteer hoofdcategorie</option>
              {Object.entries(DIENST_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.dienstsoort && (
              <p className="mt-1 text-sm text-red-600">{errors.dienstsoort}</p>
            )}
          </div>

          {/* Werksoort */}
          {projectData.dienstsoort && (
            <div>
              <label htmlFor="werksoort" className="block text-sm font-medium text-gray-700 mb-2">
                Specifieke werkzaamheden *
              </label>
              <select
                id="werksoort"
                value={projectData.werksoort || ''}
                onChange={(e) => setWerksoort(e.target.value as Werksoort)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.werksoort ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecteer werkzaamheden</option>
                {availableWerksoorten.map(werksoort => (
                  <option key={werksoort} value={werksoort}>
                    {WERK_LABELS[werksoort]}
                  </option>
                ))}
              </select>
              {errors.werksoort && (
                <p className="mt-1 text-sm text-red-600">{errors.werksoort}</p>
              )}
            </div>
          )}
        </div>

        {/* Projectdetails */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Oppervlakte */}
          <div>
            <label htmlFor="oppervlakte" className="block text-sm font-medium text-gray-700 mb-2">
              Oppervlakte
            </label>
            <select
              id="oppervlakte"
              value={projectData.oppervlakte || ''}
              onChange={(e) => updateProject('oppervlakte', e.target.value as Oppervlakte || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecteer oppervlakte</option>
              {oppervlakteOpties.map(optie => (
                <option key={optie.value} value={optie.value}>
                  {optie.label}
                </option>
              ))}
            </select>
          </div>

          {/* Urgentie */}
          <div>
            <label htmlFor="urgentie" className="block text-sm font-medium text-gray-700 mb-2">
              Urgentie
            </label>
            <select
              id="urgentie"
              value={projectData.urgentie}
              onChange={(e) => updateProject('urgentie', e.target.value as Urgentie)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {urgentieOpties.map(optie => (
                <option key={optie.value} value={optie.value}>
                  {optie.label}
                </option>
              ))}
            </select>
          </div>

          {/* Gewenste startdatum */}
          <div>
            <label htmlFor="gewensteStartdatum" className="block text-sm font-medium text-gray-700 mb-2">
              Gewenste startdatum
            </label>
            <input
              type="date"
              id="gewensteStartdatum"
              value={projectData.gewensteStartdatum || ''}
              onChange={(e) => setStartdatum(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.gewensteStartdatum ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.gewensteStartdatum && (
              <p className="mt-1 text-sm text-red-600">{errors.gewensteStartdatum}</p>
            )}
          </div>

          {/* Geschatte duur */}
          <div>
            <label htmlFor="geschatteDuur" className="block text-sm font-medium text-gray-700 mb-2">
              Geschatte duur
            </label>
            <input
              type="text"
              id="geschatteDuur"
              value={projectData.geschatteDuur}
              onChange={(e) => updateProject('geschatteDuur', e.target.value)}
              placeholder="Bijv: 2 weken"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Extra diensten */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Extra diensten
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {extraDienstenOpties.map(optie => (
              <label key={optie.value} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={projectData.extraDiensten.includes(optie.value)}
                  onChange={() => toggleExtraDienst(optie.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-900">{optie.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Projectfoto's */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Projectfoto's
            <span className="text-gray-500 text-xs ml-1">(optioneel, max 10 foto's)</span>
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Klik om foto's te uploaden</span> of sleep bestanden hierheen
              </span>
              <span className="text-xs text-gray-500">PNG, JPG, WebP tot 5MB per foto</span>
            </label>
          </div>

          {errors.projectFotos && (
            <p className="mt-2 text-sm text-red-600">{errors.projectFotos}</p>
          )}

          {/* Geüploade foto's */}
          {projectData.projectFotos.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {projectData.projectFotos.map(foto => (
                  <div key={foto.id} className="relative group">
                    <img
                      src={foto.preview}
                      alt="Project foto"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeFoto(foto.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <div className="mt-1">
                      <input
                        type="text"
                        value={foto.beschrijving || ''}
                        onChange={(e) => updateFotoBeschrijving(foto.id, e.target.value)}
                        placeholder="Beschrijving..."
                        className="w-full text-xs px-2 py-1 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {fotoUploadStatus.totaal} foto{fotoUploadStatus.totaal === 1 ? '' : '\'s'} geüpload
              </p>
            </div>
          )}
        </div>

        {/* Aanvullende informatie */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Aanvullende informatie</h2>
          
          {/* Boolean vragen */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Is parkeren mogelijk?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="parkerenMogelijk"
                    checked={projectData.parkerenMogelijk === true}
                    onChange={() => setBooleanField('parkerenMogelijk', true)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Ja</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="parkerenMogelijk"
                    checked={projectData.parkerenMogelijk === false}
                    onChange={() => setBooleanField('parkerenMogelijk', false)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Nee</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zijn sleutels beschikbaar?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sleutelsBeschikbaar"
                    checked={projectData.sleutelsBeschikbaar === true}
                    onChange={() => setBooleanField('sleutelsBeschikbaar', true)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Ja</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sleutelsBeschikbaar"
                    checked={projectData.sleutelsBeschikbaar === false}
                    onChange={() => setBooleanField('sleutelsBeschikbaar', false)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Nee</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bent u aanwezig tijdens het werk?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="aanwezigTijdensWerk"
                    checked={projectData.aanwezigTijdensWerk === true}
                    onChange={() => setBooleanField('aanwezigTijdensWerk', true)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Ja</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="aanwezigTijdensWerk"
                    checked={projectData.aanwezigTijdensWerk === false}
                    onChange={() => setBooleanField('aanwezigTijdensWerk', false)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Nee</span>
                </label>
              </div>
            </div>
          </div>

          {/* Text velden */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="kleurvoorkeuren" className="block text-sm font-medium text-gray-700 mb-2">
                Kleurvoorkeuren
              </label>
              <input
                type="text"
                id="kleurvoorkeuren"
                value={projectData.kleurvoorkeuren || ''}
                onChange={(e) => updateProject('kleurvoorkeuren', e.target.value)}
                placeholder="Bijv: wit, grijs"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="materialenWensen" className="block text-sm font-medium text-gray-700 mb-2">
                Materialen wensen
              </label>
              <input
                type="text"
                id="materialenWensen"
                value={projectData.materialenWensen || ''}
                onChange={(e) => updateProject('materialenWensen', e.target.value)}
                placeholder="Bijv: duurzaam, luxe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="bijzondereEisen" className="block text-sm font-medium text-gray-700 mb-2">
              Bijzondere eisen
            </label>
            <textarea
              id="bijzondereEisen"
              value={projectData.bijzondereEisen || ''}
              onChange={(e) => updateProject('bijzondereEisen', e.target.value)}
              placeholder="Heeft u specifieke eisen of wensen?"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="extraOpmerkingen" className="block text-sm font-medium text-gray-700 mb-2">
              Extra opmerkingen
            </label>
            <textarea
              id="extraOpmerkingen"
              value={projectData.extraOpmerkingen || ''}
              onChange={(e) => updateProject('extraOpmerkingen', e.target.value)}
              placeholder="Overige opmerkingen..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onPrevious}
          className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Vorige: Projectlocatie
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canSubmit}
          className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
            canSubmit
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Ga naar stap 4: Afronding"
        >
          Volgende: Afronding
        </button>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Foto's helpen ons de situatie beter te begrijpen en een nauwkeurigere offerte te maken. 
              U kunt foto's van de huidige situatie en eventuele inspiratiebeelden uploaden.
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 text-center">
        <span className="text-xs text-gray-400">
          Stap 3 van 4 voltooid
        </span>
      </div>
    </div>
  );
}