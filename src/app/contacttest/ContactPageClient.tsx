"use client";
import React, { useMemo, useState } from "react";

import Header from "../components/layout/header/Header";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  ChevronRight,
  Building2,
  Hammer,
  Wrench,
  HelpCircle,
} from "lucide-react";

// Kleuren: blauw, zwart, wit, grijs
// Tailwind-classes gebruiken uitsluitend variaties van blue/gray/black/white

// Helper voor input styling
const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white/90 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
const sectionTitleClass = "text-2xl md:text-3xl font-semibold text-gray-900";

// Typing
interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  budget: string;
  timeframe: string;
  description: string;
  agree: boolean;
}

export default function ContactHorizontotaalbouw() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    budget: "",
    timeframe: "",
    description: "",
    agree: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState<null | FormData>(null);

  const projectTypes = useMemo(
    () => [
      "Nieuwbouw",
      "Verbouwing",
      "Aanbouw",
      "Renovatie",
      "Badkamer",
      "Keuken",
      "Dakkapel",
      "Overig",
    ],
    []
  );

  const budgets = useMemo(
    () => [
      "< €10.000",
      "€10.000 – €25.000",
      "€25.000 – €50.000",
      "€50.000 – €100.000",
      "> €100.000",
    ],
    []
  );

  const timeframes = useMemo(
    () => [
      "Binnen 1 maand",
      "1–3 maanden",
      "3–6 maanden",
      "6+ maanden",
    ],
    []
  );

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};

    if (!form.name.trim()) e.name = "Vul uw volledige naam in.";

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!phoneDigits) e.phone = "Vul uw telefoonnummer in.";
    else if (phoneDigits.length < 9)
      e.phone = "Telefoonnummer lijkt onvolledig.";

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.email.trim());
    if (!form.email.trim()) e.email = "Vul uw e-mailadres in.";
    else if (!emailOk) e.email = "Ongeldig e-mailadres.";

    if (!form.projectType) e.projectType = "Selecteer een projecttype.";
    if (!form.budget) e.budget = "Kies een budgetrange.";
    if (!form.timeframe) e.timeframe = "Kies een gewenst tijdsframe.";

    if (!form.description.trim())
      e.description = "Beschrijf uw project zo duidelijk mogelijk.";

    if (!form.agree)
      e.agree = "U moet akkoord gaan met de privacyverklaring.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    // Simuleer succesvolle verzending
    setSubmitted(form);
    // Reset formulier
    setForm({
      name: "",
      phone: "",
      email: "",
      projectType: "",
      budget: "",
      timeframe: "",
      description: "",
      agree: false,
    });
    // Scroll naar melding
    const anchor = document.getElementById("success-anchor");
    anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-900">
      {/* Header */}
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.10),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(17,24,39,0.08),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-14 md:pb-16 md:pt-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Reactie binnen 4 uur gegarandeerd
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Contact Horizontotaalbouw
              </h1>
              <p className="max-w-xl text-gray-600 md:text-lg">
                Klaar om uw droomproject te realiseren? Onze bouwexperts staan
                voor u klaar met persoonlijk advies en een vrijblijvende
                offerte.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#offerte"
                  className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Vraag uw offerte aan <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href="tel:0612345678"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 hover:border-gray-400"
                >
                  <Phone className="h-4 w-4" /> 06 12 34 56 78
                </a>
              </div>
            </motion.div>

            {/* Snel info kaart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-gray-100 p-3 text-gray-800">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Hoofdkantoor</p>
                    <p className="font-semibold text-gray-900">Hoofdstraat 123</p>
                    <p className="text-gray-700">1234 AB Amsterdam</p>
                    <p className="text-gray-700">Nederland</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-gray-100 p-3 text-gray-800">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefoon</p>
                    <p className="font-semibold text-gray-900">06 12 34 56 78</p>
                    <p className="text-gray-700">Direct voor spoedgevallen</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-gray-100 p-3 text-gray-800">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">E-mail</p>
                    <p className="font-semibold text-gray-900">info@horizontotaalbouw.nl</p>
                    <p className="text-gray-700">Reactie binnen 4 uur</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-gray-100 p-3 text-gray-800">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Openingstijden</p>
                    <p className="font-semibold text-gray-900">Ma–Vr: 08:00–17:00</p>
                    <p className="font-semibold text-gray-900">Za: 09:00–15:00</p>
                    <p className="text-gray-700">Zo: Op afspraak</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offerte + Contact formulier */}
      <section id="offerte" className="mx-auto max-w-7xl px-6 pb-16">
        {submitted && (
          <div id="success-anchor" className="mb-8 rounded-2xl border border-blue-600/20 bg-blue-50 p-5 text-blue-800">
            <p className="font-semibold">Bedankt! Uw aanvraag is ontvangen.</p>
            <p className="text-sm opacity-90">
              We nemen binnen <strong>4 uur</strong> contact met u op. Referentie (samenvatting): {submitted.projectType || "Project"}, {submitted.budget || "Budget n.n.b."}, {submitted.timeframe || "Tijdsframe n.n.b."}
            </p>
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3"
          >
            <div className="mb-6 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-blue-700" />
              <h2 className={sectionTitleClass}>Vraag uw offerte aan</h2>
            </div>

            <form onSubmit={onSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Naam *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Uw volledige naam"
                    className={inputClass}
                  />
                  {errors.name && <p className="mt-1 text-sm text-blue-700">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass}>Telefoon *</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="06 12 34 56 78"
                    className={inputClass}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-blue-700">{errors.phone}</p>}
                </div>
                <div>
                  <label className={labelClass}>E‑mail *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="uw.email@voorbeeld.nl"
                    className={inputClass}
                  />
                  {errors.email && <p className="mt-1 text-sm text-blue-700">{errors.email}</p>}
                </div>
                <div>
                  <label className={labelClass}>Type project</label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))}
                    className={inputClass}
                  >
                    <option value="">Selecteer projecttype</option>
                    {projectTypes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="mt-1 text-sm text-blue-700">{errors.projectType}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Indicatief budget</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                    className={inputClass}
                  >
                    <option value="">Selecteer budgetrange</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {errors.budget && <p className="mt-1 text-sm text-blue-700">{errors.budget}</p>}
                </div>
                <div>
                  <label className={labelClass}>Gewenste startdatum</label>
                  <select
                    value={form.timeframe}
                    onChange={(e) => setForm((f) => ({ ...f, timeframe: e.target.value }))}
                    className={inputClass}
                  >
                    <option value="">Selecteer tijdsframe</option>
                    {timeframes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.timeframe && (
                    <p className="mt-1 text-sm text-blue-700">{errors.timeframe}</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>Projectomschrijving *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Beschrijf uw project zo gedetailleerd mogelijk. Locatie, gewenste uitvoering, materialen, planning, speciale wensen, etc."
                  rows={6}
                  className={`${inputClass} resize-y`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-blue-700">{errors.description}</p>
                )}
              </div>

              <div className="mt-5 flex items-start gap-3">
                <input
                  id="agree"
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => setForm((f) => ({ ...f, agree: e.target.checked }))}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <label htmlFor="agree" className="text-sm text-gray-700">
                  Door dit formulier te versturen gaat u akkoord met onze {" "}
                  <a href="#" className="font-semibold text-blue-700 underline underline-offset-2">
                    privacyverklaring
                  </a>
                  .
                </label>
              </div>

              {errors.agree && <p className="mt-2 text-sm text-blue-700">{errors.agree}</p>}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/20"
                >
                  Verstuur aanvraag <ChevronRight className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-600">
                  Reactie binnen <strong>4 uur</strong> gegarandeerd
                </span>
              </div>
            </form>
          </motion.div>

          {/* Waarom + Reviews */}
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="md:col-span-2"
          >
            <div className="mb-6 flex items-center gap-2">
              <Wrench className="h-6 w-6 text-blue-700" />
              <h3 className="text-xl font-semibold text-gray-900">Waarom Horizontotaalbouw?</h3>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: <CheckCircle2 className="h-5 w-5" />, 
                  title: "Snelle reactie binnen 4 uur",
                },
                { icon: <Hammer className="h-5 w-5" />, title: "15+ jaar ervaring in de bouw" },
                { icon: <ShieldCheck className="h-5 w-5" />, title: "Gecertificeerde vakspecialisten" },
                { icon: <Building2 className="h-5 w-5" />, title: "Transparante prijzen en planning" },
                { icon: <ShieldCheck className="h-5 w-5" />, title: "5 jaar garantie op werkzaamheden" },
                { icon: <ShieldCheck className="h-5 w-5" />, title: "Volledig verzekerd en bonded" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="rounded-lg bg-gray-100 p-2 text-gray-900">{item.icon}</div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
              <div className="mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-blue-700" />
                <p className="font-semibold text-gray-900">
                  ★ ★ ★ ★ ★ <span className="ml-2 text-gray-600">4.9/5 (127 reviews)</span>
                </p>
              </div>
              <figure className="mb-4">
                <blockquote className="text-gray-800">
                  “Horizontotaalbouw heeft onze complete verbouwing perfect uitgevoerd. Professioneel, op tijd en binnen budget. Absolute aanrader!”
                </blockquote>
                <figcaption className="mt-1 text-sm text-gray-600">— Familie van der Berg, Amsterdam</figcaption>
              </figure>
              <figure>
                <blockquote className="text-gray-800">
                  “Zeer tevreden over de aanbouw. Goede communicatie en vakmanschap van het hoogste niveau.”
                </blockquote>
                <figcaption className="mt-1 text-sm text-gray-600">— J. Hendriks, Utrecht</figcaption>
              </figure>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-700" />
          <h2 className={sectionTitleClass}>Veelgestelde vragen</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <details className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm open:shadow-md">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
              Hoe snel krijg ik een offerte?
              <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-gray-700">
              We streven ernaar binnen 24 uur te reageren op uw aanvraag. Voor complexere projecten plannen we graag een gratis intakegesprek binnen 48 uur.
            </p>
          </details>
          <details className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm open:shadow-md">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
              Zijn jullie verzekerd?
              <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-gray-700">
              Ja, we zijn volledig verzekerd met een uitgebreide bedrijfsaansprakelijkheidsverzekering en CAR-verzekering. Daarnaast bieden we 5 jaar garantie op onze werkzaamheden.
            </p>
          </details>
          <details className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm open:shadow-md">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
              In welke regio's zijn jullie actief?
              <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-gray-700">
              We opereren voornamelijk in Noord-Holland, Zuid-Holland en Utrecht. Voor grote projecten (&gt; €100.000) reizen we ook naar andere provincies in Nederland.
            </p>
          </details>
          <details className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm open:shadow-md">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
              Kunnen jullie helpen met vergunningen?
              <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-gray-700">
              Absoluut! We begeleiden het complete vergunningstraject en hebben ervaring met gemeentelijke procedures. Dit is inbegrepen bij projecten vanaf €25.000.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <section id="contact" className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Klaar om uw project te starten?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Neem vandaag nog contact met ons op voor een vrijblijvende offerte.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:0612345678"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 hover:border-gray-400"
            >
              <Phone className="h-4 w-4" /> Bel nu: 06 12 34 56 78
            </a>
            <a
              href="mailto:info@horizontotaalbouw.nl"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Mail className="h-4 w-4" /> E‑mail versturen
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Horizontotaalbouw. Alle rechten voorbehouden.</p>
          <nav className="flex items-center gap-5 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">
              Privacyverklaring
            </a>
            <a href="#" className="hover:text-gray-900">
              Algemene voorwaarden
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
