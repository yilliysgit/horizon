"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Handshake,
  Clock,
  Wrench,
  Hammer,
  Building2,
  Leaf,
  Ruler,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
} from "lucide-react";

// Kleuren/typografie: blauw, grijs, zwart, wit – strak en modern

export default function OverOnsHorizontotaalbouw() {
  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.10),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(17,24,39,0.08),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-20 md:pb-20 md:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5"/>
                Vakwerk met een glimlach
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                Over <span className="text-blue-700">Horizontotaalbouw</span>
              </h1>
              <p className="mt-4 max-w-xl text-gray-600 md:text-lg">
                Wij zijn een jong, gedreven én ervaren team vaklieden. Van elektriciens tot timmermannen, van loodgieters tot stukadoors en zonnepaneel‑specialisten: met ons hechte team veranderen we iedere bouwval in een schitterend paleis.
              </p>
            </motion.div>
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
              <dl className="grid grid-cols-2 gap-6">
                {[
                  {label:"Jaar ervaring", value:"15+"},
                  {label:"Projecten per jaar", value:"250+"},
                  {label:"Gem. klanttevredenheid", value:"4.9/5"},
                  {label:"Garantie op werk", value:"5 jaar"},
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-gray-50 p-4">
                    <dt className="text-sm text-gray-600">{item.label}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-gray-600">
                * Waarden ter indicatie – we leveren altijd maatwerk en communiceren helder over planning en kosten.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSIE & VISIE */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <Handshake className="h-5 w-5 text-blue-700"/>
              <h2 className="text-2xl font-semibold">Onze missie</h2>
            </div>
            <p className="text-gray-700">
              Uw wens is onze taak. We denken mee, communiceren duidelijk en leveren vakwerk waar we samen trots op zijn. Of het nu gaat om een kleine aanpassing of een complete renovatie – we maken van uw droom een duurzame realiteit.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-700"/>
              <h2 className="text-2xl font-semibold">Onze visie</h2>
            </div>
            <p className="text-gray-700">
              Professioneel, efficiënt en oplossingsgericht bouwen. We combineren vakmanschap met moderne technieken en een strakke organisatie. Zo leveren we projecten op tijd, binnen budget en volgens afspraak – zonder gedoe.
            </p>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="mx-auto max-w-7xl px-6 pb-8 md:pb-12">
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Alles onder één dak</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {icon:<Hammer className="h-5 w-5"/>, title:"Nieuwbouw & Verbouw", text:"Van casco tot sleutel‑klaar: aanbouw, opbouw, dakkapel, uitbouw, modernisering."},
            {icon:<Wrench className="h-5 w-5"/>, title:"Timmerwerk & Afbouw", text:"Keukens, badkamers, maatwerk kasten, vloeren en strak stucwerk."},
            {icon:<Building2 className="h-5 w-5"/>, title:"Installaties", text:"Elektra, loodgieterswerk, verwarming, airco en ventilatie – inclusief keuring."},
            {icon:<Leaf className="h-5 w-5"/>, title:"Duurzaam", text:"Zonnepanelen, isolatie, energie‑optimalisatie en slimme systemen."},
            {icon:<Ruler className="h-5 w-5"/>, title:"Plan & Vergunning", text:"Ontwerp, calculatie, vergunningsaanvraag en bouwbegeleiding."},
            {icon:<Users className="h-5 w-5"/>, title:"Projectmanagement", text:"Vaste contactpersoon, duidelijke planning en transparante prijzen."},
          ].map((d) => (
            <div key={d.title} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="rounded-lg bg-gray-100 p-2 text-gray-900">{d.icon}</div>
              <div>
                <p className="font-semibold text-gray-900">{d.title}</p>
                <p className="text-gray-700">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AANPAK */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Onze aanpak</h2>
        <ol className="relative grid gap-6 md:grid-cols-2">
          {[
            {step:"01", title:"Intake & advies", text:"We luisteren, denken mee en adviseren eerlijk over haalbaarheid, planning en budget."},
            {step:"02", title:"Offerte & planning", text:"Transparante prijsopbouw en een heldere timeline met één aanspreekpunt."},
            {step:"03", title:"Uitvoering", text:"Strak georganiseerd team van specialisten. Netjes werken, dagelijkse updates."},
            {step:"04", title:"Oplevering & garantie", text:"Samen nalopen, restpunten oplossen en 5 jaar garantie op het werk."},
          ].map((s, i) => (
            <li key={s.step} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Clock className="h-3.5 w-3.5"/> Fase {s.step}
              </div>
              <p className="text-lg font-semibold">{s.title}</p>
              <p className="mt-1 text-gray-700">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* WAARDEN / USP */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {icon:<CheckCircle2 className="h-5 w-5"/>, title:"Meedenkend", text:"Voor ieder vraagstuk bedenken we een slimme, haalbare oplossing."},
            {icon:<Award className="h-5 w-5"/>, title:"Vakwerk", text:"Gecertificeerde specialisten, premium materialen en strak afwerkingsniveau."},
            {icon:<ShieldCheck className="h-5 w-5"/>, title:"Zekerheid", text:"5 jaar garantie, duidelijke afspraken en vaste prijzen waar mogelijk."},
          ].map((u)=> (
            <div key={u.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-lg bg-gray-100 px-2.5 py-1.5 text-gray-900">{u.icon}<span className="text-sm font-semibold">{u.title}</span></div>
              <p className="text-gray-700">{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">Klaar om uw project te starten?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            Vertel ons kort over uw plannen – we reageren doorgaans binnen 4 uur met eerlijk advies of een vrijblijvende offerte.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:info@horizontotaalbouw.nl" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700">
              <Mail className="h-4 w-4"/> E‑mail versturen
            </a>
            <a href="tel:0852003300" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 hover:border-gray-400">
              <Phone className="h-4 w-4"/> Bel: 085 – 200 3300
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
