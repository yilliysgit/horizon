import React from 'react';
import { useOfferteDataStap2 } from '@/hooks/offerteformulier/useOfferteDataStap2';
import { validateOfferteStap2 } from '@/validators/offerteformulier/OfferteStap2.valid';
import type { OfferteStap2, TypeWoning, Eigendom } from '@/types/forms/offerteFormulier/OfferteStap2.type';

interface OfferteStap2Props {
  onNext: () => void;
  onPrevious: () => void;
  onDataChange?: (data: OfferteStap2) => void;
}

export default function OfferteStap2({ onNext, onPrevious, onDataChange }: OfferteStap2Props) {
  const {
    projectData,
    errors,
    updateProject,
    setBouwjaar,
    updatePostcode,
    setFormErrors,
    hasBasicAddressData
  } = useOfferteDataStap2();

  const handleNext = () => {
    const validationErrors = validateOfferteStap2(projectData);
    
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    
    onDataChange?.(projectData);
    onNext();
  };

  // Correcte submit check - alleen adresgegevens verplicht
  const canSubmit = hasBasicAddressData && Object.keys(errors).length === 0;

  const typeWoningOpties: { value: TypeWoning; label: string }[] = [
    { value: 'vrijstaand', label: 'Vrijstaand huis' },
    { value: 'rijtjeshuis', label: 'Rijtjeshuis' },
    { value: 'hoekhuis', label: 'Hoekhuis' },
    { value: 'appartement', label: 'Appartement' },
    { value: 'anders', label: 'Anders' }
  ];

  const eigendomOpties: { value: Eigendom; label: string }[] = [
    { value: 'eigenaar', label: 'Eigenaar' },
    { value: 'huurder', label: 'Huurder' },
    { value: 'aannemer', label: 'Aannemer' },
    { value: 'vve', label: 'VvE' }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Projectlocatie
        </h1>
        <p className="text-gray-600">
          Stap 2 van 4: Waar gaat het project plaatsvinden?
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div className="bg-blue-600 h-2 rounded-full w-2/4"></div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Adresgegevens */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Adresgegevens *</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Straat */}
            <div>
              <label htmlFor="straat" className="block text-sm font-medium text-gray-700 mb-2">
                Straatnaam *
              </label>
              <input
                type="text"
                id="straat"
                value={projectData.straat}
                onChange={(e) => updateProject('straat', e.target.value)}
                placeholder="Hoofdstraat"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                  errors.straat 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                aria-invalid={errors.straat ? 'true' : 'false'}
                aria-describedby={errors.straat ? 'straat-error' : undefined}
              />
              {errors.straat && (
                <p id="straat-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.straat}
                </p>
              )}
            </div>

            {/* Huisnummer */}
            <div>
              <label htmlFor="huisnummer" className="block text-sm font-medium text-gray-700 mb-2">
                Huisnummer *
              </label>
              <input
                type="text"
                id="huisnummer"
                value={projectData.huisnummer}
                onChange={(e) => updateProject('huisnummer', e.target.value)}
                placeholder="123A"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                  errors.huisnummer 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                aria-invalid={errors.huisnummer ? 'true' : 'false'}
                aria-describedby={errors.huisnummer ? 'huisnummer-error' : undefined}
              />
              {errors.huisnummer && (
                <p id="huisnummer-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.huisnummer}
                </p>
              )}
            </div>

            {/* Postcode */}
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
                Postcode *
              </label>
              <input
                type="text"
                id="postcode"
                value={projectData.postcode}
                onChange={(e) => updatePostcode(e.target.value)}
                placeholder="1234 AB"
                maxLength={7}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                  errors.postcode 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                aria-invalid={errors.postcode ? 'true' : 'false'}
                aria-describedby={errors.postcode ? 'postcode-error' : undefined}
              />
              {errors.postcode && (
                <p id="postcode-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.postcode}
                </p>
              )}
            </div>

            {/* Plaats */}
            <div>
              <label htmlFor="plaats" className="block text-sm font-medium text-gray-700 mb-2">
                Plaats *
              </label>
              <input
                type="text"
                id="plaats"
                value={projectData.plaats}
                onChange={(e) => updateProject('plaats', e.target.value)}
                placeholder="Amsterdam"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
                  errors.plaats 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                aria-invalid={errors.plaats ? 'true' : 'false'}
                aria-describedby={errors.plaats ? 'plaats-error' : undefined}
              />
              {errors.plaats && (
                <p id="plaats-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.plaats}
                </p>
              )}
            </div>

            {/* Land */}
            <div className="md:col-span-2">
              <label htmlFor="land" className="block text-sm font-medium text-gray-700 mb-2">
                Land
              </label>
              <select
                id="land"
                value={projectData.land || 'Nederland'}
                onChange={(e) => updateProject('land', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Nederland">Nederland</option>
                <option value="België">België</option>
                <option value="Duitsland">Duitsland</option>
              </select>
              {errors.land && (
                <p className="mt-1 text-sm text-red-600">{errors.land}</p>
              )}
            </div>
          </div>
        </div>

        {/* Woning informatie */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Woning informatie</h2>
          <p className="text-sm text-gray-600 mb-4">Deze informatie helpt ons een betere offerte maken (optioneel)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type woning */}
            <div>
              <label htmlFor="typeWoning" className="block text-sm font-medium text-gray-700 mb-2">
                Type woning
              </label>
              <select
                id="typeWoning"
                value={projectData.typeWoning || ''}
                onChange={(e) => updateProject('typeWoning', e.target.value as TypeWoning || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecteer type woning</option>
                {typeWoningOpties.map(optie => (
                  <option key={optie.value} value={optie.value}>
                    {optie.label}
                  </option>
                ))}
              </select>
              {errors.typeWoning && (
                <p className="mt-1 text-sm text-red-600">{errors.typeWoning}</p>
              )}
            </div>

            {/* Bouwjaar */}
            <div>
              <label htmlFor="bouwjaar" className="block text-sm font-medium text-gray-700 mb-2">
                Bouwjaar
              </label>
              <input
                type="number"
                id="bouwjaar"
                value={projectData.bouwjaar || ''}
                onChange={(e) => setBouwjaar(e.target.value)}
                placeholder="1995"
                min="1800"
                max="2030"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.bouwjaar ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.bouwjaar ? 'true' : 'false'}
                aria-describedby={errors.bouwjaar ? 'bouwjaar-error' : undefined}
              />
              {errors.bouwjaar && (
                <p id="bouwjaar-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.bouwjaar}
                </p>
              )}
            </div>

            {/* Eigendom */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Eigendomssituatie
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {eigendomOpties.map(optie => (
                  <label key={optie.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="eigendom"
                      value={optie.value}
                      checked={projectData.eigendom === optie.value}
                      onChange={(e) => updateProject('eigendom', e.target.value as Eigendom)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      {optie.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.eigendom && (
                <p className="mt-1 text-sm text-red-600">{errors.eigendom}</p>
              )}
            </div>
          </div>
        </div>

        {/* Opmerkingen */}
        <div>
          <label htmlFor="opmerkingen" className="block text-sm font-medium text-gray-700 mb-2">
            Aanvullende opmerkingen
            <span className="text-gray-500 text-xs ml-1">(optioneel)</span>
          </label>
          <textarea
            id="opmerkingen"
            value={projectData.opmerkingen || ''}
            onChange={(e) => updateProject('opmerkingen', e.target.value)}
            placeholder="Heeft u specifieke wensen of opmerkingen over de locatie?"
            rows={3}
            maxLength={500}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.opmerkingen ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.opmerkingen && (
            <p className="mt-1 text-sm text-red-600">{errors.opmerkingen}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {projectData.opmerkingen?.length || 0}/500 karakters
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onPrevious}
          className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Vorige: Contactgegevens
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canSubmit}
          className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
            canSubmit
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Ga naar stap 3: Projectdetails"
        >
          Volgende: Projectdetails
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
              <strong>Tip:</strong> Hoe meer informatie u verstrekt, hoe nauwkeuriger we uw offerte kunnen maken. 
              Woningtype en bouwjaar helpen ons de juiste materialen en technieken te bepalen.
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 text-center">
        <span className="text-xs text-gray-400">
          Stap 2 van 4 voltooid
        </span>
      </div>
    </div>
  );
}