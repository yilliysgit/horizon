import React from 'react';
import { useOfferteDataStap1 } from '@/hooks/offerteformulier/useOfferteDataStap1';
import { validateOfferteStap1 } from '@/validators/offerteformulier/OfferteStap1.valid';
import type { OfferteStap1 } from '@/types/forms/offerteFormulier/offerteStap1.type';

interface OfferteStap1Props {
  onNext: () => void;
  onDataChange?: (data: OfferteStap1) => void;
}

export default function OfferteStap1({ onNext, onDataChange }: OfferteStap1Props) {
  const {
    contactData,
    errors,
    updateContact,
    updateTelefoon,
    setFormErrors,
    isFormValid,
    hasFormData
  } = useOfferteDataStap1();

  const handleNext = () => {
    const validationErrors = validateOfferteStap1(contactData);
    
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    
    // Data doorsturen naar parent component (zonder extra normalisatie)
    onDataChange?.(contactData);
    onNext();
  };

  // Eenvoudige submit check die altijd werkt
  const canSubmit = Boolean(
    contactData.naam?.trim() && 
    contactData.email?.trim() && 
    Object.keys(errors).length === 0
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Offerte Aanvragen
        </h1>
        <p className="text-gray-600">
          Stap 1 van 4: Uw contactgegevens
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div className="bg-blue-600 h-2 rounded-full w-1/4"></div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Klanttype */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Type klant *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="klanttype"
                value="particulier"
                checked={contactData.klanttype === 'particulier'}
                onChange={(e) => updateContact('klanttype', e.target.value as 'particulier' | 'zakelijk')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-900">
                Particulier
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="klanttype"
                value="zakelijk"
                checked={contactData.klanttype === 'zakelijk'}
                onChange={(e) => updateContact('klanttype', e.target.value as 'particulier' | 'zakelijk')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-900">
                Zakelijk
              </span>
            </label>
          </div>
        </div>

        {/* Naam */}
        <div>
          <label htmlFor="naam" className="block text-sm font-medium text-gray-700 mb-2">
            {contactData.klanttype === 'zakelijk' ? 'Bedrijfsnaam' : 'Volledige naam'} *
          </label>
          <input
            type="text"
            id="naam"
            value={contactData.naam}
            onChange={(e) => updateContact('naam', e.target.value)}
            placeholder={contactData.klanttype === 'zakelijk' ? 'Bedrijf B.V.' : 'Jan de Vries'}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.naam 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            aria-invalid={errors.naam ? 'true' : 'false'}
            aria-describedby={errors.naam ? 'naam-error' : undefined}
          />
          {errors.naam && (
            <p id="naam-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.naam}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-mailadres *
          </label>
          <input
            type="email"
            id="email"
            value={contactData.email}
            onChange={(e) => updateContact('email', e.target.value)}
            placeholder="jan@voorbeeld.nl"
            autoComplete="email"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Telefoon */}
        <div>
          <label htmlFor="telefoon" className="block text-sm font-medium text-gray-700 mb-2">
            Telefoonnummer
            <span className="text-gray-500 text-xs ml-1">(optioneel)</span>
          </label>
          <input
            type="tel"
            id="telefoon"
            value={contactData.telefoon || ''}
            onChange={(e) => updateTelefoon(e.target.value)}
            placeholder="06-12345678 of +31-6-12345678"
            autoComplete="tel"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.telefoon 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            aria-invalid={errors.telefoon ? 'true' : 'false'}
            aria-describedby={errors.telefoon ? 'telefoon-error telefoon-help' : 'telefoon-help'}
          />
          {errors.telefoon && (
            <p id="telefoon-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.telefoon}
            </p>
          )}
          <p id="telefoon-help" className="mt-1 text-xs text-gray-500">
            Voor snellere communicatie en afspraken
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Velden met * zijn verplicht
        </div>
        
        <button
          onClick={handleNext}
          disabled={!canSubmit}
          className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
            canSubmit
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Ga naar stap 2: Projectlocatie"
        >
          Volgende: Projectlocatie
        </button>
      </div>

      {/* Help text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-blue-800">
              <strong>Privacy gegarandeerd:</strong> Uw gegevens worden vertrouwelijk behandeld en alleen gebruikt voor het opstellen van uw offerte. 
              We delen uw informatie nooit met derden.
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-4 text-center">
        <span className="text-xs text-gray-400">
          Stap 1 van 4 voltooid
        </span>
      </div>
    </div>
  );
}