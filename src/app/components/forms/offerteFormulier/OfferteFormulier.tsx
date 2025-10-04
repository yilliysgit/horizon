// src/app/components/forms/offerteFormulier/OfferteFormulier.tsx
"use client";

import React, { useState } from "react";
import OfferteStap1 from "./OfferteFormulierStap1";
import OfferteStap2 from "./OfferteFormulierStap2";
import OfferteStap3 from "./OfferteFormulierStap3";
import OfferteStap4 from "./OfferteFormulierStap4";

import type { OfferteStap1 as TStap1 } from "@/types/forms/offerteFormulier/offerteStap1.type";
import type { OfferteStap2 as TStap2 } from "@/types/forms/offerteFormulier/OfferteStap2.type";
import type { OfferteStap3 as TStap3 } from "@/types/forms/offerteFormulier/OfferteStap3.type";
import type { OfferteStap4 as TStap4 } from "@/types/forms/offerteFormulier/OfferteStap4.type";

type FormData = {
  stap1: TStap1 | null;
  stap2: TStap2 | null;
  stap3: TStap3 | null;
  stap4: TStap4 | null;
};

export default function OfferteFormulier() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    stap1: null,
    stap2: null,
    stap3: null,
    stap4: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStepData = <S extends 1 | 2 | 3 | 4>(step: S, data: FormData[`stap${S}`]) => {
    setFormData((prev) => ({
      ...prev,
      [`stap${step}`]: data,
    })) as unknown as void;
  };

  const nextStep = () => setCurrentStep((s) => Math.min(4, s + 1));
  const previousStep = () => setCurrentStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    try {
      // Hier zou je normaal naar je API posten
      // console.log('Complete form data:', formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({ stap1: null, stap2: null, stap3: null, stap4: null });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        {/* Success state */}
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Offerte Verzonden!</h1>
          <p className="text-gray-600">Bedankt voor uw aanvraag. We nemen binnen 24 uur contact met u op.</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Wat gebeurt er nu?</h2>
          <ul className="text-sm text-green-700 space-y-2 text-left">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2">1.</span>
              We bekijken uw aanvraag en eventuele foto&apos;s
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2">2.</span>
              U ontvangt binnen 24 uur een persoonlijke offerte
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2">3.</span>
              We plannen eventueel een afspraak voor meer details
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={resetForm}
            className="px-6 py-2 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Nieuwe Offerte Aanvragen
          </button>

          <div className="text-sm text-gray-500">
            <p>
              Vragen? Bel ons op <span className="font-medium">06-12345678</span>
            </p>
            <p>
              of mail naar <span className="font-medium">info@uwbedrijf.nl</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step <= currentStep ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  {step < currentStep ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{step}</span>
                  )}
                </div>
                {step < 4 && <div className={`flex-1 h-1 mx-4 ${step < currentStep ? "bg-blue-600" : "bg-gray-300"}`} />}
              </React.Fragment>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span>Contactgegevens</span>
            <span>Projectlocatie</span>
            <span>Projectdetails</span>
            <span>Overzicht</span>
          </div>
        </div>

        {/* Step content */}
        <div>
          {currentStep === 1 && (
            <OfferteStap1
              onNext={nextStep}
              onDataChange={(data: TStap1) => handleStepData(1, data)}
            />
          )}

          {currentStep === 2 && (
            <OfferteStap2
              onNext={nextStep}
              onPrevious={previousStep}
              onDataChange={(data: TStap2) => handleStepData(2, data)}
            />
          )}

          {currentStep === 3 && (
            <OfferteStap3
              onNext={nextStep}
              onPrevious={previousStep}
              onDataChange={(data: TStap3) => handleStepData(3, data)}
            />
          )}

          {currentStep === 4 && formData.stap1 && formData.stap2 && formData.stap3 && (
            <OfferteStap4
              onPrevious={previousStep}
              onSubmit={handleSubmit}
              onDataChange={(data: TStap4) => handleStepData(4, data)}
              stap1Data={formData.stap1}
              stap2Data={formData.stap2}
              stap3Data={formData.stap3}
            />
          )}

          {currentStep === 4 && (!formData.stap1 || !formData.stap2 || !formData.stap3) && (
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                Sommige gegevens ontbreken nog. Ga even terug en vul stap 1–3 af voordat u kunt verzenden.
              </p>
              <button
                onClick={() => setCurrentStep(1)}
                className="mt-4 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Terug naar stap 1
              </button>
            </div>
          )}
        </div>

        {/* Debug info (remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Debug Info:</h3>
            <p className="text-sm text-gray-600">Current Step: {currentStep}</p>
            <pre className="text-xs text-gray-600 whitespace-pre-wrap">
{JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
