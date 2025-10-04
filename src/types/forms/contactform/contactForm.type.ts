// Enum voor "I'm a/an" dropdown
export enum ProfessionTypeNl {
  PARTICULIER = 'particulier',
  ZAKELIJK = 'zakelijk',
  AANNEMER = 'aannemer',
  CONSTRUCTEUR = 'constructeur',
  ARCHITECT = 'architect'
}

// Enum voor "I Want" dropdown  
export enum ContactReasonNl {
  BELLEN = 'Call me to Discuss my Questions',
  OFFERTE = 'Request a Quote',
  INFORMATIE = 'Get More Information',
  AFSPRAAK = 'Schedule a Meeting',
  ONDERSTEUNING = 'Technical Support'
}

// Nieuwe enums voor conditionele velden
export enum BudgetRange {
  KLEIN = '€10.000 - €50.000',
  MIDDEN = '€50.000 - €150.000',
  GROOT = '€150.000 - €500.000',
  ZEER_GROOT = '€500.000+'
}

export enum ProjectType {
  VERBOUWING = 'Verbouwing',
  NIEUWBOUW = 'Nieuwbouw',
  UITBREIDING = 'Uitbreiding',
  RENOVATIE = 'Renovatie'
}

export enum ProjectSize {
  KLEIN = 'Klein project',
  MIDDEN = 'Middelgroot project',
  GROOT = 'Groot project',
  ENTERPRISE = 'Enterprise project'
}

export enum Specialization {
  WONINGBOUW = 'Woningbouw',
  UTILITEITSBOUW = 'Utiliteitsbouw',
  RENOVATIE = 'Renovatie specialist',
  DUURZAAM = 'Duurzaam bouwen'
}

// File upload types
export enum AllowedFileTypes {
  IMAGE = 'image/*',
  PDF = 'application/pdf',
  DWG = '.dwg',
  ALL = 'image/*,.pdf,.dwg'
}

// Hoofdinterface voor alle form data
export interface ContactFormDataNl {
  // Basis velden voor iedereen
  profession: ProfessionTypeNl;
  contactReason: ContactReasonNl;
  name: string;
  email: string;
  phone: string;
  message: string;
  agreeToComms: boolean;

  // File upload
  projectFiles?: File[];
  
  // Conditionele velden - optioneel
  budget?: BudgetRange;
  projectType?: ProjectType;
  companyName?: string;
  projectSize?: ProjectSize;
  timeline?: string;
  licenseNumber?: string;
  specialization?: Specialization;
  partnershipInterest?: boolean;
  engineeringFocus?: string;
  technicalSpecs?: string;
}

// Interface voor formulier validatie errors
export interface ContactFormErrorsNl {
  profession?: string;
  contactReason?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  agreeToComms?: string;
  projectFiles?: string;
  budget?: string;
  projectType?: string;
  companyName?: string;
  projectSize?: string;
  timeline?: string;
  licenseNumber?: string;
  specialization?: string;
  partnershipInterest?: string;
  engineeringFocus?: string;
  technicalSpecs?: string;
}

// Enum voor formulier submit status
export enum ContactFormStatusNl {
  IDLE = 'idle',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error'
}