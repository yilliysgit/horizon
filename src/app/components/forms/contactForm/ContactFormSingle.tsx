// app/components/forms/contactForm/ContactFormSingle.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";

const HORIZON_COLORS = {
  navy800: "#00296b",
  navy700: "#003f88", 
  navy600: "#00509d",
  gold500: "#fdc500",
  gold400: "#ffd500",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray600: "#4b5563",
  gray900: "#111827",
  ink: "#333333"
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: ""
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const contactReasons = [
    "Algemene vraag",
    "Offerte aanvragen", 
    "Project bespreken",
    "Klacht of feedback",
    "Technische ondersteuning",
    "Partnership mogelijkheden",
    "Media & pers",
    "Anders"
  ];

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};

    if (!form.name.trim()) e.name = "Vul uw naam in.";

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email.trim());
    if (!form.email.trim()) e.email = "Vul uw e-mailadres in.";
    else if (!emailOk) e.email = "Ongeldig e-mailadres.";

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!phoneDigits) e.phone = "Vul uw telefoonnummer in.";
    else if (phoneDigits.length < 9) e.phone = "Telefoonnummer lijkt onvolledig.";

    if (!form.reason) e.reason = "Selecteer een reden voor contact.";

    if (!form.message.trim()) e.message = "Vul uw bericht in.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simuleer API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form
    setForm({
      name: "",
      email: "",
      phone: "",
      reason: "",
      message: ""
    });
    setErrors({});
  }

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-8 rounded-3xl border backdrop-blur-sm overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`,
          border: `1px solid ${HORIZON_COLORS.gray200}`,
          boxShadow: `
            0 4px 12px rgba(51, 51, 51, 0.08),
            0 2px 4px rgba(51, 51, 51, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.8)
          `
        }}
      >
        {/* Success accent */}
        <div 
          className="absolute top-0 left-0 w-1 h-full"
          style={{ 
            background: `linear-gradient(180deg, #10b981 0%, #059669 100%)`,
            boxShadow: `0 0 8px rgba(16, 185, 129, 0.3)`
          }}
        />

        <div className="text-center">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{
              background: `linear-gradient(135deg, #10b981 0%, #059669 100%)`,
              boxShadow: `0 4px 12px rgba(16, 185, 129, 0.3)`
            }}
          >
            <CheckCircle2 className="w-8 h-8" style={{ color: HORIZON_COLORS.white }} />
          </div>
          
          <h3 
            className="text-2xl font-bold mb-2"
            style={{ 
              color: HORIZON_COLORS.ink,
              fontFamily: "Kanit, sans-serif"
            }}
          >
            Bericht verzonden!
          </h3>
          
          <p style={{ color: HORIZON_COLORS.gray600 }}>
            Bedankt voor uw bericht. We nemen binnen 24 uur contact met u op.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
              color: HORIZON_COLORS.navy800,
              boxShadow: `0 4px 12px rgba(253, 197, 0, 0.3)`
            }}
          >
            Nieuw bericht versturen
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div 
      className="relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl group overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${HORIZON_COLORS.white} 0%, ${HORIZON_COLORS.gray50} 100%)`,
        border: `1px solid ${HORIZON_COLORS.gray200}`,
        boxShadow: `
          0 4px 12px rgba(51, 51, 51, 0.08),
          0 2px 4px rgba(51, 51, 51, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.8)
        `
      }}
    >
      {/* Gouden accent */}
      <div 
        className="absolute top-0 left-0 w-1 h-full transition-all duration-300 group-hover:w-1.5"
        style={{ 
          background: `linear-gradient(180deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 50%, ${HORIZON_COLORS.gold500} 100%)`,
          boxShadow: `0 0 8px rgba(253, 197, 0, 0.3)`
        }}
      />

      {/* Subtiele achtergrond pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, ${HORIZON_COLORS.gold500} 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header */}
      <div className="relative mb-6">
        <h2 
          className="text-2xl font-bold tracking-tight"
          style={{ 
            color: HORIZON_COLORS.ink,
            fontFamily: "Kanit, sans-serif"
          }}
        >
          Contact opnemen
        </h2>
        <p style={{ color: HORIZON_COLORS.gray600 }}>
          Vul het formulier in en we nemen snel contact met u op.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="relative space-y-5">
        {/* Name field */}
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: HORIZON_COLORS.ink }}
          >
            Naam *
          </label>
          <div className="relative">
            <User 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: HORIZON_COLORS.gray600 }}
            />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Uw volledige naam"
              className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:scale-105"
              style={{
                background: `${HORIZON_COLORS.white}F0`,
                border: `1px solid ${errors.name ? '#ef4444' : HORIZON_COLORS.gray200}`,
                color: HORIZON_COLORS.ink,
                outline: 'none',
                boxShadow: errors.name 
                  ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                  : '0 2px 4px rgba(51, 51, 51, 0.06)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = HORIZON_COLORS.gold500;
                e.target.style.boxShadow = `0 0 0 3px rgba(253, 197, 0, 0.2)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.name ? '#ef4444' : HORIZON_COLORS.gray200;
                e.target.style.boxShadow = errors.name 
                  ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                  : '0 2px 4px rgba(51, 51, 51, 0.06)';
              }}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{errors.name}</p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: HORIZON_COLORS.ink }}
          >
            E-mail *
          </label>
          <div className="relative">
            <Mail 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: HORIZON_COLORS.gray600 }}
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="uw.email@voorbeeld.nl"
              className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:scale-105"
              style={{
                background: `${HORIZON_COLORS.white}F0`,
                border: `1px solid ${errors.email ? '#ef4444' : HORIZON_COLORS.gray200}`,
                color: HORIZON_COLORS.ink,
                outline: 'none',
                boxShadow: errors.email 
                  ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                  : '0 2px 4px rgba(51, 51, 51, 0.06)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = HORIZON_COLORS.gold500;
                e.target.style.boxShadow = `0 0 0 3px rgba(253, 197, 0, 0.2)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? '#ef4444' : HORIZON_COLORS.gray200;
                e.target.style.boxShadow = errors.email 
                  ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                  : '0 2px 4px rgba(51, 51, 51, 0.06)';
              }}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{errors.email}</p>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: HORIZON_COLORS.ink }}
          >
            Telefoon *
          </label>
          <div className="relative">
            <Phone 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: HORIZON_COLORS.gray600 }}
            />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="06 12 34 56 78"
              className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:scale-105"
              style={{
                background: `${HORIZON_COLORS.white}F0`,
                border: `1px solid ${errors.phone ? '#ef4444' : HORIZON_COLORS.gray200}`,
                color: HORIZON_COLORS.ink,
                outline: 'none',
                boxShadow: errors.phone 
                  ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                  : '0 2px 4px rgba(51, 51, 51, 0.06)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = HORIZON_COLORS.gold500;
                e.target.style.boxShadow = `0 0 0 3px rgba(253, 197, 0, 0.2)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.phone ? '#ef4444' : HORIZON_COLORS.gray200;
                e.target.style.boxShadow = errors.phone 
                  ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                  : '0 2px 4px rgba(51, 51, 51, 0.06)';
              }}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{errors.phone}</p>
          )}
        </div>

        {/* Reason dropdown */}
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: HORIZON_COLORS.ink }}
          >
            Ik heb een vraag over *
          </label>
          <div className="relative">
            <MessageSquare 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: HORIZON_COLORS.gray600 }}
            />
            <select
              value={form.reason}
              onChange={(e) => setForm(f => ({ ...f, reason: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300 focus:scale-105 appearance-none"
              style={{
                background: `${HORIZON_COLORS.white}F0`,
                border: `1px solid ${errors.reason ? '#ef4444' : HORIZON_COLORS.gray200}`,
                color: HORIZON_COLORS.ink,
                outline: 'none',
                boxShadow: errors.reason 
                  ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                  : '0 2px 4px rgba(51, 51, 51, 0.06)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = HORIZON_COLORS.gold500;
                e.target.style.boxShadow = `0 0 0 3px rgba(253, 197, 0, 0.2)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.reason ? '#ef4444' : HORIZON_COLORS.gray200;
                e.target.style.boxShadow = errors.reason 
                  ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                  : '0 2px 4px rgba(51, 51, 51, 0.06)';
              }}
            >
              <option value="">Selecteer een onderwerp</option>
              {contactReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path 
                  d="M1 1l5 5 5-5" 
                  stroke={HORIZON_COLORS.gray600} 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {errors.reason && (
            <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{errors.reason}</p>
          )}
        </div>

        {/* Message field */}
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: HORIZON_COLORS.ink }}
          >
            Bericht *
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Vertel ons meer over uw vraag of project..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:scale-105 resize-none"
            style={{
              background: `${HORIZON_COLORS.white}F0`,
              border: `1px solid ${errors.message ? '#ef4444' : HORIZON_COLORS.gray200}`,
              color: HORIZON_COLORS.ink,
              outline: 'none',
              boxShadow: errors.message 
                ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                : '0 2px 4px rgba(51, 51, 51, 0.06)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = HORIZON_COLORS.gold500;
              e.target.style.boxShadow = `0 0 0 3px rgba(253, 197, 0, 0.2)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.message ? '#ef4444' : HORIZON_COLORS.gray200;
              e.target.style.boxShadow = errors.message 
                ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                : '0 2px 4px rgba(51, 51, 51, 0.06)';
            }}
          />
          {errors.message && (
            <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{errors.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: isSubmitting 
              ? HORIZON_COLORS.gray200 
              : `linear-gradient(135deg, ${HORIZON_COLORS.gold500} 0%, ${HORIZON_COLORS.gold400} 100%)`,
            color: isSubmitting ? HORIZON_COLORS.gray600 : HORIZON_COLORS.navy800,
            boxShadow: isSubmitting 
              ? 'none' 
              : `0 4px 12px rgba(253, 197, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
            fontFamily: "Kanit, sans-serif"
          }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Versturen...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Bericht versturen
            </>
          )}
        </button>
      </form>

      {/* Subtiele shine effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 0%, rgba(253, 197, 0, 0.05) 50%, transparent 100%)`,
        }}
      />
    </div>
  );
}