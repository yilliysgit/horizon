// types/forms/offerteFormulier/offerteStap2.type.ts

export type TypeWoning = 
  | 'vrijstaand' 
  | 'rijtjeshuis' 
  | 'hoekhuis' 
  | 'appartement' 
  | 'anders';

export type Eigendom = 'eigenaar' | 'huurder' | 'aannemer' | 'vve';


export type OfferteStap2 = {
  // Adresgegevens (verplicht)
  straat: string;
  huisnummer: string; // Kan ook 12A, 34bis etc. zijn
  postcode: string; // Format: 1234AB
  plaats: string;
  land?: string; // Default: Nederland, maar soms ook België?
  
  // Woning informatie (optioneel - helpt bij offerte inschatting)
  typeWoning?: TypeWoning;
  bouwjaar?: number; // Als number voor makkelijke validatie
  eigendom?: Eigendom;

  // Extra informatie (optioneel)
  opmerkingen?: string; // Voor specifieke wensen/situaties
};