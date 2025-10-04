export type Urgentie =
  | 'direct'
  | 'binnen-2-weken'
  | 'binnen-maand'
  | 'binnen-3-maanden'
  | 'geen-haast';

export type Dienstsoort =
  | 'totaalrenovaties'
  | 'ruwbouw'
  | 'dakwerken'
  | 'afwerking'
  | 'interieur'
  | 'installaties';

export type Werksoort =
  // Totaalrenovaties
  | 'complete-renovaties'
  | 'op-aanbouwen'
  | 'verbouwingen-op-maat'
  | 'renovatieadvies-ontwerp'
  | 'herbestemmingen'
  | 'projectcoordinatie'

  // Ruwbouw
  | 'funderingen'
  | 'dragende-constructies'
  | 'metselwerk'
  | 'ruwbouw-timmerwerk'
  | 'betonwerken'
  | 'kelderbouw'

  // Dakwerken
  | 'nieuwe-daken'
  | 'dakrenovaties'
  | 'dakisolatie'
  | 'dakramen-lichtkoepels'
  | 'zink-koperwerk'
  | 'dakgoten-regenafvoer'

  // Afwerking
  | 'afbouw-timmerwerk'
  | 'wanden-plafonds'
  | 'stuc-pleisterwerk'
  | 'vloeren-tegelwerk'
  | 'schilder-lakwerk'
  | 'binnen-buitendeuren'

  // Interieur
  | 'keukens'
  | 'badkamers'
  | 'toiletten'
  | 'inbouwkasten-maatwerkmeubels'
  | 'trappen-leuningen'
  | 'interieurbekleding'

// Installaties
  | 'elektrotechniek'
  | 'loodgieterswerk'         // <-- was loodgiterswerk
  | 'verwarming-ventilatie'
  | 'airco-warmtepompen'
  | 'domotica-smart-home'
  | 'zonnepanelen-duurzame-energie';

  
export type Oppervlakte =
  | 'klein-onder-50m2'
  | 'middel-50-100m2'
  | 'groot-100-200m2'
  | 'zeer-groot-boven-200m2'
  | 'weet-niet';

export type ExtraDiensten =
  | 'materiaal-inkoop'
  | 'afval-afvoer'
  | 'meubels-verplaatsen'
  | 'grondwerk-voorbereiden'
  | 'na-reiniging'
  | 'garantie-onderhoud';

export type ProjectFoto = {
  id: string;
  file: File;
  preview: string;
  fileSize: number;
  beschrijving?: string;
  uploadStatus: 'pending' | 'uploading' | 'uploaded' | 'error';
  errorMessage?: string;
};

export type OfferteStap3 = {
  projectOmschrijving: string;
  oppervlakte?: Oppervlakte;
  dienstsoort?: Dienstsoort;
  werksoort?: Werksoort;
  projectFotos: ProjectFoto[];
  urgentie: Urgentie;
  gewensteStartdatum?: string;
  geschatteDuur?: string;
  extraDiensten: ExtraDiensten[];
  parkerenMogelijk?: boolean;
  sleutelsBeschikbaar?: boolean;
  aanwezigTijdensWerk?: boolean;
  kleurvoorkeuren?: string;
  materialenWensen?: string;
  bijzondereEisen?: string;
  extraOpmerkingen?: string;
};

export const DIENST_WERK_MAPPING: Record<Dienstsoort, Werksoort[]> = {
  totaalrenovaties: [
    'complete-renovaties',
    'op-aanbouwen',
    'verbouwingen-op-maat',
    'renovatieadvies-ontwerp',
    'herbestemmingen',
    'projectcoordinatie',
  ],
  ruwbouw: [
    'funderingen',
    'dragende-constructies',
    'metselwerk',
    'ruwbouw-timmerwerk',
    'betonwerken',
    'kelderbouw',
  ],
  dakwerken: [
    'nieuwe-daken',
    'dakrenovaties',
    'dakisolatie',
    'dakramen-lichtkoepels',
    'zink-koperwerk',
    'dakgoten-regenafvoer',
  ],
  afwerking: [
    'afbouw-timmerwerk',
    'wanden-plafonds',
    'stuc-pleisterwerk',
    'vloeren-tegelwerk',
    'schilder-lakwerk',
    'binnen-buitendeuren',
  ],

interieur: [
  'keukens',
  'badkamers',
  'toiletten',
  'inbouwkasten-maatwerkmeubels',
  'trappen-leuningen',
  'interieurbekleding',       // <-- update
],
installaties:[
  'elektrotechniek',
  'loodgieterswerk',          // <-- update
  'verwarming-ventilatie',
  'airco-warmtepompen',
  'domotica-smart-home',
  'zonnepanelen-duurzame-energie'
]




};

export const DIENST_LABELS: Record<Dienstsoort, string> = {
  totaalrenovaties: 'Totaalrenovaties',
  ruwbouw: 'Ruwbouw',
  dakwerken: 'Dakwerken',
  afwerking: 'Afwerking',
  interieur: 'Interieur',
  installaties: 'Installaties',
};

export const WERK_LABELS: Record<Werksoort, string> = {
  // Totaalrenovaties
  'complete-renovaties': 'Complete renovaties',
  'op-aanbouwen': 'Op- en aanbouwen',
  'verbouwingen-op-maat': 'Verbouwingen op maat',
  'renovatieadvies-ontwerp': 'Renovatieadvies & ontwerp',
  herbestemmingen: 'Herbestemmingen (bv. zolder → slaapkamer)',
  projectcoordinatie: 'Projectcoördinatie',

  // Ruwbouw
  funderingen: 'Funderingen',
  'dragende-constructies': 'Dragende constructies',
  metselwerk: 'Metselwerk',
  'ruwbouw-timmerwerk': 'Ruwbouw timmerwerk',
  betonwerken: 'Betonwerken',
  kelderbouw: 'Kelderbouw',

  // Dakwerken
  'nieuwe-daken': 'Nieuwe daken',
  dakrenovaties: 'Dakrenovaties',
  dakisolatie: 'Dakisolatie',
  'dakramen-lichtkoepels': 'Dakramen & lichtkoepels',
  'zink-koperwerk': 'Zink- en koperwerk',
  'dakgoten-regenafvoer': 'Dakgoten & regenafvoer',

  // Afwerking
  'afbouw-timmerwerk': 'Afbouw timmerwerk',
  'wanden-plafonds': 'Wanden & plafonds',
  'stuc-pleisterwerk': 'Stuc- en pleisterwerk',
  'vloeren-tegelwerk': 'Vloeren & tegelwerk',
  'schilder-lakwerk': 'Schilder- en lakwerk',
  'binnen-buitendeuren': 'Binnen- & buitendeuren',

  // Interieur
  keukens: 'Keukens',
  badkamers: 'Badkamers',
  toiletten: 'Toiletten',
  'inbouwkasten-maatwerkmeubels': 'Inbouwkasten & maatwerkmeubels',
  'trappen-leuningen': 'Trappen & leuningen',
  interieurbekleding: 'Interieurbekleding (bv. lambrisering)',

  // Installaties
  elektrotechniek: 'Elektrotechniek',
  loodgieterswerk: 'Loodgieterswerk',
  'verwarming-ventilatie': 'Verwarming & ventilatie',
  'airco-warmtepompen': 'Airco & warmtepompen',
  'domotica-smart-home': 'Domotica & smart home',
  'zonnepanelen-duurzame-energie': 'Zonnepanelen & duurzame energie',
};
