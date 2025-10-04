// src/app/components/forms/offerteFormulier/OfferteFormulierStap4.tsx
import React, { useEffect } from 'react';
import { useOfferteDataStap4 } from '@/hooks/offerteformulier/useOfferteDataStap4';
import { validateOfferteStap4 } from '@/validators/offerteformulier/OfferteStap4.valid';
import type { OfferteStap1 } from '@/types/forms/offerteFormulier/offerteStap1.type';
import type { OfferteStap2 } from '@/types/forms/offerteFormulier/OfferteStap2.type';
import type { OfferteStap3 } from '@/types/forms/offerteFormulier/OfferteStap3.type';
import type { HoeVanOnsGehoord } from '@/types/forms/offerteFormulier/OfferteStap4.type';

interface OfferteStap4Props {
  onPrevious: () => void;
  onSubmit: () => void;
  onDataChange?: (data: any) => void;
  stap1Data: OfferteStap1;
  stap2Data: OfferteStap2;
  stap3Data: OfferteStap3;
}

export default function OfferteStap4({
  onPrevious,
  onSubmit,
  onDataChange,
  stap1Data,
  stap2Data,
  stap3Data,
}: OfferteStap4Props) {
  const {
    stap4Data,
    overzicht,
    updateStap4Field,
    toggleCheckbox,
    setHoeVanOnsGehoord,
    canSubmitOfferte,           // ← boolean
    setVerzendStatus,
    setFormErrors,
    updateOverzichtFromStappen, // ← gebruiken om het overzicht te vullen
    getFormulierSamenvatting,   // ← object, niet aanroepen
  } = useOfferteDataStap4();

  useEffect(() => {
    // Houd overzicht in sync zodra stap1/2/3 binnenkomen of wijzigen
    updateOverzichtFromStappen(stap1Data, stap2Data, stap3Data);
  }, [stap1Data, stap2Data, stap3Data, updateOverzichtFromStappen]);

  const handleSubmit = async () => {
    const validationErrors = validateOfferteStap4(stap4Data);
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    if (!stap4Data.algemeneVoorwaardenGeaccepteerd) {
      setFormErrors({ algemeneVoorwaardenGeaccepteerd: 'U moet de algemene voorwaarden accepteren' });
      return;
    }

    try {
      setVerzendStatus('aan-het-verzenden');
      onDataChange?.(stap4Data);

      // Simuleer API-call
      await new Promise((r) => setTimeout(r, 2000));

      setVerzendStatus('verzonden');
      onSubmit();
    } catch (e) {
      setVerzendStatus('fout', 'Er ging iets mis bij het verzenden. Probeer het opnieuw.');
    }
  };

  const samenvatting = getFormulierSamenvatting; // ← geen () !

  const hoeVanOnsGehoordOpties = [
    { value: 'google', label: 'Google zoekresultaten' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'aanbeveling', label: 'Aanbeveling van bekenden' },
    { value: 'website', label: 'Direct via website' },
    { value: 'anders', label: 'Anders' },
  ] as const;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Overzicht & Verzenden</h1>
        <p className="text-gray-600">Stap 4 van 4: Controleer uw gegevens en verstuur de offerte</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div className="bg-blue-600 h-2 rounded-full w-full" />
        </div>
      </div>

      <div className="space-y-8">
        {/* Overzicht */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Uw gegevens</h2>

          {/* Contactgegevens */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Contactgegevens</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">Naam:</span> {stap1Data?.naam}</p>
              <p><span className="font-medium">Type:</span> {stap1Data?.klanttype}</p>
              <p><span className="font-medium">Email:</span> {stap1Data?.email}</p>
              {'telefoon' in stap1Data && (stap1Data as any)?.telefoon && (
                <p><span className="font-medium">Telefoon:</span> {(stap1Data as any).telefoon}</p>
              )}
            </div>
          </div>

          {/* Projectlocatie */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Projectlocatie</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Adres:</span> {stap2Data?.straat} {stap2Data?.huisnummer}
              </p>
              <p>
                <span className="font-medium">Plaats:</span> {stap2Data?.postcode} {stap2Data?.plaats}
              </p>
              {'typeWoning' in stap2Data && (stap2Data as any)?.typeWoning && (
                <p><span className="font-medium">Type woning:</span> {(stap2Data as any).typeWoning}</p>
              )}
              {'bouwjaar' in stap2Data && (stap2Data as any)?.bouwjaar && (
                <p><span className="font-medium">Bouwjaar:</span> {(stap2Data as any).bouwjaar}</p>
              )}
            </div>
          </div>

          {/* Projectdetails */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Projectdetails</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">Omschrijving:</span></p>
              <p className="pl-4 italic">{stap3Data?.projectOmschrijving}</p>
              {stap3Data?.dienstsoort && (
                <p><span className="font-medium">Categorie:</span> {stap3Data.dienstsoort}</p>
              )}
              {stap3Data?.werksoort && (
                <p><span className="font-medium">Werkzaamheden:</span> {stap3Data.werksoort}</p>
              )}
              {stap3Data?.urgentie && (
                <p><span className="font-medium">Urgentie:</span> {stap3Data.urgentie}</p>
              )}
              {stap3Data?.projectFotos?.length > 0 && (
                <p><span className="font-medium">Foto&apos;s:</span> {stap3Data.projectFotos.length} toegevoegd</p>
              )}
            </div>
          </div>
        </div>

        {/* Hoe van ons gehoord */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Hoe heeft u van ons gehoord?
            <span className="text-gray-500 text-xs ml-1">(optioneel - helpt ons onze dienstverlening te verbeteren)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hoeVanOnsGehoordOpties.map((optie) => (
              <label key={optie.value} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="hoeVanOnsGehoord"
                  value={optie.value}
                  checked={stap4Data.hoeVanOnsGehoord === optie.value}
                  onChange={() => setHoeVanOnsGehoord(optie.value as HoeVanOnsGehoord)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-900">{optie.label}</span>
              </label>
            ))}
          </div>

          {stap4Data.hoeVanOnsGehoord === 'anders' && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Vertel ons hoe u van ons gehoord heeft"
                value={stap4Data.hoeVanOnsGehoordAnders || ''}
                onChange={(e) => updateStap4Field('hoeVanOnsGehoordAnders', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Last-minute opmerkingen */}
        <div>
          <label htmlFor="opmerkingen" className="block text-sm font-medium text-gray-700 mb-2">
            Nog laatste opmerkingen?
          </label>
          <textarea
            id="opmerkingen"
            value={stap4Data.opmerkingen || ''}
            onChange={(e) => updateStap4Field('opmerkingen', e.target.value)}
            placeholder="Heeft u nog laatste vragen of opmerkingen?"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Privacy en voorwaarden */}
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="font-medium text-gray-900 mb-4">Privacy en voorwaarden</h3>

          <div className="space-y-4">
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={stap4Data.algemeneVoorwaardenGeaccepteerd}
                  onChange={() => toggleCheckbox('algemeneVoorwaardenGeaccepteerd')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                <span className="ml-3 text-sm text-gray-900">
                  Ik accepteer de <a href="#" className="text-blue-600 hover:underline">algemene voorwaarden</a> *
                </span>
              </label>
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={stap4Data.privacybeleidGelezen || false}
                  onChange={() => toggleCheckbox('privacybeleidGelezen')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                <span className="ml-3 text-sm text-gray-900">
                  Ik heb het <a href="#" className="text-blue-600 hover:underline">privacybeleid</a> gelezen
                </span>
              </label>
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={stap4Data.marketingCommunicatie || false}
                  onChange={() => toggleCheckbox('marketingCommunicatie')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                <span className="ml-3 text-sm text-gray-900">
                  Ik wil graag op de hoogte blijven van aanbiedingen en nieuws via e-mail
                </span>
              </label>
            </div>
          </div>
        </div>

        {overzicht.verzendStatus === 'aan-het-verzenden' && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3" />
              <p className="text-blue-800">Uw offerte wordt verzonden...</p>
            </div>
          </div>
        )}

        {overzicht.verzendStatus === 'fout' && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-800">{overzicht.verzendFoutmelding}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onPrevious}
          disabled={overzicht.verzendStatus === 'aan-het-verzenden'}
          className="px-6 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Vorige: Projectdetails
        </button>

        <button
          onClick={handleSubmit}
          disabled={!canSubmitOfferte || overzicht.verzendStatus === 'aan-het-verzenden'}
          className={`px-8 py-3 rounded-md font-medium transition-colors text-lg ${
            canSubmitOfferte && overzicht.verzendStatus !== 'aan-het-verzenden'
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {overzicht.verzendStatus === 'aan-het-verzenden' ? 'Verzenden...' : 'Offerte Verzenden'}
        </button>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-md">
        <p className="text-sm text-green-800">
          <strong>Bijna klaar!</strong> Na het verzenden ontvangt u binnen 24 uur een persoonlijke offerte van ons.
        </p>
      </div>
    </div>
  );
}
