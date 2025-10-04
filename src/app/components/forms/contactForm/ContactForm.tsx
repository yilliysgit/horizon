'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  ContactFormDataNl,
  ContactFormErrorsNl,
  ProfessionTypeNl,
  ContactReasonNl,
  BudgetRange,
  ProjectType,
  ProjectSize,
  Specialization,
  AllowedFileTypes,
  ContactFormStatusNl,
} from '@/types/forms/contactform/contactForm.type';

const MAX_FILES = 5;
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const initialFormData: ContactFormDataNl = {
  profession: ProfessionTypeNl.PARTICULIER,
  contactReason: ContactReasonNl.BELLEN,
  name: '',
  email: '',
  phone: '',
  message: '',
  agreeToComms: false,
  projectFiles: [],
};

function validate(d: ContactFormDataNl): ContactFormErrorsNl {
  const e: ContactFormErrorsNl = {};

  if (!d.name?.trim()) e.name = 'Naam is verplicht';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Ongeldig e-mailadres';
  if (!d.phone?.trim()) e.phone = 'Telefoonnummer is verplicht';
  if (!d.message?.trim()) e.message = 'Bericht is verplicht';

  // Conditionele validaties
  if (d.profession === ProfessionTypeNl.ZAKELIJK && !d.companyName?.trim()) {
    e.companyName = 'Bedrijfsnaam is verplicht voor zakelijke aanvragen';
  }

  // Files
  if (d.projectFiles && d.projectFiles.length > MAX_FILES) {
    e.projectFiles = `Maximaal ${MAX_FILES} bestanden toegestaan`;
  }
  if (d.projectFiles?.some((f) => f.size > MAX_SIZE)) {
    e.projectFiles = `Elk bestand mag maximaal 10MB zijn`;
  }

  return e;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormDataNl>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrorsNl>({});
  const [status, setStatus] = useState<ContactFormStatusNl>(ContactFormStatusNl.IDLE);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const tooMany = files.length > MAX_FILES;
    const tooLarge = files.some((f) => f.size > MAX_SIZE);

    if (tooMany || tooLarge) {
      setErrors((prev) => ({
        ...prev,
        projectFiles: tooMany
          ? `Maximaal ${MAX_FILES} bestanden toegestaan`
          : `Elk bestand mag maximaal 10MB zijn`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, projectFiles: undefined }));
    }

    setFormData((f) => ({ ...f, projectFiles: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const v = validate(formData);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    try {
      setStatus(ContactFormStatusNl.SUBMITTING);

      const body = new FormData();
      body.append('profession', formData.profession);
      body.append('contactReason', formData.contactReason);
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('phone', formData.phone);
      body.append('message', formData.message);
      body.append('agreeToComms', String(formData.agreeToComms));

      // Optionele/conditionele velden
      if (formData.budget) body.append('budget', formData.budget);
      if (formData.projectType) body.append('projectType', formData.projectType);
      if (formData.companyName) body.append('companyName', formData.companyName);
      if (formData.projectSize) body.append('projectSize', formData.projectSize);
      if (formData.timeline) body.append('timeline', formData.timeline);
      if (formData.licenseNumber) body.append('licenseNumber', formData.licenseNumber);
      if (formData.specialization) body.append('specialization', formData.specialization);
      if (typeof formData.partnershipInterest === 'boolean') {
        body.append('partnershipInterest', String(formData.partnershipInterest));
      }
      if (formData.engineeringFocus) body.append('engineeringFocus', formData.engineeringFocus);
      if (formData.technicalSpecs) body.append('technicalSpecs', formData.technicalSpecs);

      formData.projectFiles?.forEach((file) => body.append('projectFiles', file));

      const res = await fetch('/api/contact', { method: 'POST', body });
      if (!res.ok) throw new Error('Serverfout');

      setStatus(ContactFormStatusNl.SUCCESS);
      setFormData(initialFormData);
    } catch (err) {
      setStatus(ContactFormStatusNl.ERROR);
    } finally {
      // no-op
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-0">
            {/* FORMULIER */}
            <div className="px-8 py-12 lg:px-12 lg:py-16">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Contact opnemen
                  </h2>
                  <p className="text-gray-600">
                    Vertel ons kort over je project, dan nemen we snel contact op.
                  </p>
                </div>

                {/* Status banners */}
                {status === ContactFormStatusNl.SUCCESS && (
                  <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-900">
                    Bedankt! Je bericht is verzonden. We nemen spoedig contact op.
                  </div>
                )}
                {status === ContactFormStatusNl.ERROR && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-900">
                    Er ging iets mis bij het verzenden. Probeer het later opnieuw.
                  </div>
                )}

                {/* BASIS DROPDOWNS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="profession" className="block text-sm font-semibold text-gray-700">
                      Ik ben
                    </label>
                    <select
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, profession: e.target.value as ProfessionTypeNl }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value={ProfessionTypeNl.PARTICULIER}>Particulier</option>
                      <option value={ProfessionTypeNl.ZAKELIJK}>Zakelijk</option>
                      <option value={ProfessionTypeNl.AANNEMER}>Aannemer</option>
                      <option value={ProfessionTypeNl.CONSTRUCTEUR}>Constructeur</option>
                      <option value={ProfessionTypeNl.ARCHITECT}>Architect</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contactReason" className="block text-sm font-semibold text-gray-700">
                      Ik wil
                    </label>
                    <select
                      id="contactReason"
                      name="contactReason"
                      value={formData.contactReason}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, contactReason: e.target.value as ContactReasonNl }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value={ContactReasonNl.BELLEN}>Teruggebeld worden</option>
                      <option value={ContactReasonNl.OFFERTE}>Een offerte aanvragen</option>
                      <option value={ContactReasonNl.INFORMATIE}>Meer informatie ontvangen</option>
                      <option value={ContactReasonNl.AFSPRAAK}>Een afspraak plannen</option>
                      <option value={ContactReasonNl.ONDERSTEUNING}>Technische ondersteuning</option>
                    </select>
                  </div>
                </div>

                {/* CONDITIONELE VELDEN - PARTICULIER */}
                {formData.profession === ProfessionTypeNl.PARTICULIER && (
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 space-y-4">
                    <h3 className="font-semibold text-blue-900">Informatie particulier</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                          Budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget || ''}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, budget: e.target.value as BudgetRange }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          <option value="">Selecteer budget</option>
                          <option value={BudgetRange.KLEIN}>{BudgetRange.KLEIN}</option>
                          <option value={BudgetRange.MIDDEN}>{BudgetRange.MIDDEN}</option>
                          <option value={BudgetRange.GROOT}>{BudgetRange.GROOT}</option>
                          <option value={BudgetRange.ZEER_GROOT}>{BudgetRange.ZEER_GROOT}</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                          Projecttype
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType || ''}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, projectType: e.target.value as ProjectType }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          <option value="">Selecteer type</option>
                          <option value={ProjectType.VERBOUWING}>{ProjectType.VERBOUWING}</option>
                          <option value={ProjectType.NIEUWBOUW}>{ProjectType.NIEUWBOUW}</option>
                          <option value={ProjectType.UITBREIDING}>{ProjectType.UITBREIDING}</option>
                          <option value={ProjectType.RENOVATIE}>{ProjectType.RENOVATIE}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONDITIONELE VELDEN - ZAKELIJK */}
                {formData.profession === ProfessionTypeNl.ZAKELIJK && (
                  <div className="p-6 bg-green-50 rounded-xl border border-green-200 space-y-4">
                    <h3 className="font-semibold text-green-900">Zakelijke informatie</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                          Bedrijfsnaam *
                        </label>
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          placeholder="Uw bedrijfsnaam"
                          value={formData.companyName || ''}
                          onChange={(e) => setFormData((p) => ({ ...p, companyName: e.target.value }))}
                          aria-invalid={!!errors.companyName}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        {errors.companyName && (
                          <p className="text-sm text-red-600">{errors.companyName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="projectSize" className="block text-sm font-medium text-gray-700">
                            Projectgrootte
                          </label>
                          <select
                            id="projectSize"
                            name="projectSize"
                            value={formData.projectSize || ''}
                            onChange={(e) =>
                              setFormData((p) => ({ ...p, projectSize: e.target.value as ProjectSize }))
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                          >
                            <option value="">Selecteer grootte</option>
                            <option value={ProjectSize.KLEIN}>{ProjectSize.KLEIN}</option>
                            <option value={ProjectSize.MIDDEN}>{ProjectSize.MIDDEN}</option>
                            <option value={ProjectSize.GROOT}>{ProjectSize.GROOT}</option>
                            <option value={ProjectSize.ENTERPRISE}>{ProjectSize.ENTERPRISE}</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                            Planning / Doorlooptijd
                          </label>
                          <input
                            id="timeline"
                            name="timeline"
                            type="text"
                            placeholder="Bijv. Q4 2025"
                            value={formData.timeline || ''}
                            onChange={(e) => setFormData((p) => ({ ...p, timeline: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONDITIONELE VELDEN - AANNEMER */}
                {formData.profession === ProfessionTypeNl.AANNEMER && (
                  <div className="p-6 bg-orange-50 rounded-xl border border-orange-200 space-y-4">
                    <h3 className="font-semibold text-orange-900">Informatie aannemer</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                          Licentienummer
                        </label>
                        <input
                          id="licenseNumber"
                          name="licenseNumber"
                          type="text"
                          placeholder="Licentienummer"
                          value={formData.licenseNumber || ''}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, licenseNumber: e.target.value }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                          Specialisatie
                        </label>
                        <select
                          id="specialization"
                          name="specialization"
                          value={formData.specialization || ''}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              specialization: e.target.value as Specialization,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                        >
                          <option value="">Selecteer</option>
                          <option value={Specialization.WONINGBOUW}>{Specialization.WONINGBOUW}</option>
                          <option value={Specialization.UTILITEITSBOUW}>{Specialization.UTILITEITSBOUW}</option>
                          <option value={Specialization.RENOVATIE}>{Specialization.RENOVATIE}</option>
                          <option value={Specialization.DUURZAAM}>{Specialization.DUURZAAM}</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        id="partnershipInterest"
                        name="partnershipInterest"
                        type="checkbox"
                        checked={formData.partnershipInterest || false}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, partnershipInterest: e.target.checked }))
                        }
                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <label htmlFor="partnershipInterest" className="text-sm font-medium text-gray-700">
                        Interesse in samenwerkingsmogelijkheden
                      </label>
                    </div>
                  </div>
                )}

                {/* CONDITIONELE VELDEN - CONSTRUCTEUR */}
                {formData.profession === ProfessionTypeNl.CONSTRUCTEUR && (
                  <div className="p-6 bg-purple-50 rounded-xl border border-purple-200 space-y-4">
                    <h3 className="font-semibold text-purple-900">Constructeursinformatie</h3>
                    <div className="space-y-2">
                      <label htmlFor="engineeringFocus" className="block text-sm font-medium text-gray-700">
                        Focus
                      </label>
                      <input
                        id="engineeringFocus"
                        name="engineeringFocus"
                        type="text"
                        placeholder="Bijv. constructief, MEP, civiel"
                        value={formData.engineeringFocus || ''}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, engineeringFocus: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="technicalSpecs" className="block text-sm font-medium text-gray-700">
                        Technische specificaties
                      </label>
                      <textarea
                        id="technicalSpecs"
                        name="technicalSpecs"
                        placeholder="Beschrijf de technische eisen"
                        value={formData.technicalSpecs || ''}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, technicalSpecs: e.target.value }))
                        }
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* BASIS VELDEN */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                      Naam *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Bijv. Jan Jansen"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      aria-invalid={!!errors.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                        E-mailadres *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="naam@bedrijf.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        aria-invalid={!!errors.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                        Telefoonnummer *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+31 6 1234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        aria-invalid={!!errors.phone}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* FILE UPLOAD */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Projectbestanden (optioneel)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                    <input
                      type="file"
                      multiple
                      accept={AllowedFileTypes.ALL}
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 text-gray-400">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-blue-600 hover:text-blue-500">
                            Klik om te uploaden
                          </span>{' '}
                          of sleep bestanden hierheen
                        </div>
                        <p className="text-xs text-gray-500">Afbeeldingen, PDF, DWG — max {MAX_FILES} bestanden, tot 10MB per stuk</p>
                        {errors.projectFiles && <p className="text-sm text-red-600">{errors.projectFiles}</p>}
                      </div>
                    </label>
                  </div>

                  {formData.projectFiles && formData.projectFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Geselecteerde bestanden:</p>
                      <div className="space-y-2">
                        {formData.projectFiles.map((file, index) => (
                          <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">{Math.round(file.size / 1024)} KB</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* BERICHT */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                    Bericht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Schrijf hier je bericht"
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    rows={5}
                    aria-invalid={!!errors.message}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                  {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
                </div>

                {/* CHECKBOX */}
                <div className="flex items-start space-x-3">
                  <input
                    id="agree-comms"
                    name="agreeToComms"
                    type="checkbox"
                    checked={formData.agreeToComms}
                    onChange={(e) => setFormData((p) => ({ ...p, agreeToComms: e.target.checked }))}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="agree-comms" className="text-sm text-gray-700">
                    Ik ga akkoord om communicatie te ontvangen van Hank Construction.
                  </label>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={status === ContactFormStatusNl.SUBMITTING}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {status === ContactFormStatusNl.SUBMITTING ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Versturen…</span>
                    </div>
                  ) : (
                    'Bericht versturen'
                  )}
                </button>

                {/* DEBUG (alleen in development) */}
                {process.env.NODE_ENV !== 'production' && (
                  <details className="mt-8">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      Debug info (development)
                    </summary>
                    <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                      <pre className="text-xs text-gray-600 overflow-x-auto">
                        {JSON.stringify(formData, null, 2)}
                      </pre>
                    </div>
                  </details>
                )}
              </form>
            </div>

            {/* AFBEELDING */}
            <div className="lg:flex lg:items-center lg:justify-center bg-gray-100 lg:bg-transparent">
              <div className="h-64 lg:h-full w-full relative">
                <Image
                  src="/images/wanden-en-plafonds.jpg"
                  alt="Horizontotaalbouw – contact en projectopname"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
