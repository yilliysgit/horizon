// types/forms/offerteFormulier/offerteStap1.type.ts

export type OfferteStap1 = {
  klanttype: 'particulier' | 'zakelijk';
  naam: string;
  email: string; // Wordt gevalideerd met email regex
  telefoon?: string; // Formaat: +31612345678 of 06-12345678
};