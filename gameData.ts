import { Character, Country, Language, PredefinedMessage, Translations } from './types';

export const AVAILABLE_CHARACTERS: Character[] = [
  { id: 'goku', name: 'Son Goku', description: 'Le héros principal, toujours prêt à relever un défi.', avatarId: 'GokuAvatar', firstName: 'Son', lastName: 'Goku', origin: 'Planète Vegeta (élevé sur Terre)' },
  { id: 'vegeta', name: 'Vegeta', description: 'Le prince des Saiyans, fier et puissant.', avatarId: 'VegetaAvatar', firstName: 'Vegeta', origin: 'Planète Vegeta' },
  { id: 'piccolo', name: 'Piccolo', description: 'Sage Namekien et ancien ennemi devenu allié.', avatarId: 'PiccoloAvatar', firstName: 'Piccolo', origin: 'Planète Namek' },
  { id: 'bulma', name: 'Bulma', description: 'Scientifique de génie et aventurière.', avatarId: 'BulmaAvatar', firstName: 'Bulma', origin: 'Terre' },
];

// NOTE: This is a small subset of countries for brevity. A full list of 195 countries should be used.
// Find a comprehensive JSON/CSV for this, including ISO codes, names, and flag emojis.
// For the D3 map to work well with IDs, ensure these IDs match what the TopoJSON provides (often ISO 3166-1 numeric or alpha-3, or sometimes alpha-2).
// If TopoJSON uses numeric IDs, a mapping might be needed or use names for matching.
// For now, COUNTRIES uses alpha-2, and we'll try to match by name or ID in the map component.
export const COUNTRIES: Country[] = [
  { id: 'AF', name: 'Afghanistan', emoji: '🇦🇫', continent: 'Asia'},
  { id: 'AL', name: 'Albania', emoji: '🇦🇱', continent: 'Europe'},
  { id: 'DZ', name: 'Algeria', emoji: '🇩🇿', continent: 'Africa'},
  { id: 'AD', name: 'Andorra', emoji: '🇦🇩', continent: 'Europe'},
  { id: 'AO', name: 'Angola', emoji: '🇦🇴', continent: 'Africa'},
  { id: 'AR', name: 'Argentina', emoji: '🇦🇷', continent: 'South America', gdp: 490, population: 45 },
  { id: 'AU', name: 'Australia', emoji: '🇦🇺', continent: 'Oceania', gdp: 1700, population: 25 },
  { id: 'AT', name: 'Austria', emoji: '🇦🇹', continent: 'Europe'},
  { id: 'BR', name: 'Brazil', emoji: '🇧🇷', continent: 'South America', gdp: 1600, population: 210 },
  { id: 'CA', name: 'Canada', emoji: '🇨🇦', continent: 'North America', gdp: 2000, population: 38 },
  { id: 'CN', name: 'China', emoji: '🇨🇳', continent: 'Asia', gdp: 17000, population: 1400 },
  { id: 'CD', name: 'DR Congo', emoji: '🇨🇩', continent: 'Africa'},
  { id: 'EG', name: 'Egypt', emoji: '🇪🇬', continent: 'Africa', gdp: 400, population: 100 },
  { id: 'FR', name: 'France', emoji: '🇫🇷', continent: 'Europe', gdp: 2700, population: 67 },
  { id: 'DE', name: 'Germany', emoji: '🇩🇪', continent: 'Europe', gdp: 4200, population: 83 },
  { id: 'IN', name: 'India', emoji: '🇮🇳', continent: 'Asia', gdp: 3200, population: 1380 },
  { id: 'ID', name: 'Indonesia', emoji: '🇮🇩', continent: 'Asia'},
  { id: 'IR', name: 'Iran', emoji: '🇮🇷', continent: 'Asia'},
  { id: 'IQ', name: 'Iraq', emoji: '🇮🇶', continent: 'Asia'},
  { id: 'IL', name: 'Israel', emoji: '🇮🇱', continent: 'Asia', gdp: 400, population: 9},
  { id: 'IT', name: 'Italy', emoji: '🇮🇹', continent: 'Europe', gdp: 2100, population: 59 },
  { id: 'JP', name: 'Japan', emoji: '🇯🇵', continent: 'Asia', gdp: 5000, population: 125 },
  { id: 'LB', name: 'Lebanon', emoji: '🇱🇧', continent: 'Asia', gdp: 20, population: 6},
  { id: 'MX', name: 'Mexico', emoji: '🇲🇽', continent: 'North America', gdp: 1300, population: 126 },
  { id: 'NG', name: 'Nigeria', emoji: '🇳🇬', continent: 'Africa'},
  { id: 'KP', name: 'North Korea', emoji: '🇰🇵', continent: 'Asia'},
  { id: 'PK', name: 'Pakistan', emoji: '🇵🇰', continent: 'Asia'},
  { id: 'PS', name: 'Palestine', emoji: '🇵🇸', continent: 'Asia'},
  { id: 'PE', name: 'Peru', emoji: '🇵🇪', continent: 'South America'},
  { id: 'PL', name: 'Poland', emoji: '🇵🇱', continent: 'Europe'},
  { id: 'RU', name: 'Russia', emoji: '🇷🇺', continent: 'Europe/Asia', gdp: 1800, population: 145 },
  { id: 'SA', name: 'Saudi Arabia', emoji: '🇸🇦', continent: 'Asia'},
  { id: 'SO', name: 'Somalia', emoji: '🇸🇴', continent: 'Africa'},
  { id: 'ZA', name: 'South Africa', emoji: '🇿🇦', continent: 'Africa', gdp: 420, population: 60 },
  { id: 'KR', name: 'South Korea', emoji: '🇰🇷', continent: 'Asia'},
  { id: 'ES', name: 'Spain', emoji: '🇪🇸', continent: 'Europe', gdp: 1400, population: 47 },
  { id: 'SD', name: 'Sudan', emoji: '🇸🇩', continent: 'Africa'},
  { id: 'SE', name: 'Sweden', emoji: '🇸🇪', continent: 'Europe'},
  { id: 'CH', name: 'Switzerland', emoji: '🇨🇭', continent: 'Europe'},
  { id: 'SY', name: 'Syria', emoji: '🇸🇾', continent: 'Asia'},
  { id: 'TH', name: 'Thailand', emoji: '🇹🇭', continent: 'Asia'},
  { id: 'TR', name: 'Turkey', emoji: '🇹🇷', continent: 'Asia/Europe'},
  { id: 'UA', name: 'Ukraine', emoji: '🇺🇦', continent: 'Europe'},
  { id: 'GB', name: 'United Kingdom', emoji: '🇬🇧', continent: 'Europe', gdp: 3100, population: 67 },
  { id: 'US', name: 'United States', emoji: '🇺🇸', continent: 'North America', gdp: 23000, population: 330 },
  { id: 'YE', name: 'Yemen', emoji: '🇾🇪', continent: 'Asia'},
  // Add more countries to reach 195...
  // A more comprehensive list is needed for a full game.
  // Example for a small country:
  { id: 'VA', name: 'Vatican City', emoji: '🇻🇦', continent: 'Europe', gdp: 0.01, population: 0.0008 },
];


export const INITIAL_XP = 0;
export const INITIAL_LEVEL = 1;
export const XP_PER_LEVEL = 100; // XP needed to advance to the next level

export const TRANSLATIONS: Translations = {
  appName: {
    [Language.FR]: "Dragon Ball: Guerre des Pays",
    [Language.EN]: "Dragon Ball: War of Countries",
    [Language.AR]: "دراغون بول: حرب الدول",
    [Language.ES]: "Dragon Ball: Guerra de Países",
    [Language.IT]: "Dragon Ball: Guerra dei Paesi",
  },
  selectCharacter: {
    [Language.FR]: "Choisissez votre personnage",
    [Language.EN]: "Choose Your Character",
    [Language.AR]: "اختر شخصيتك",
    [Language.ES]: "Elige tu Personaje",
    [Language.IT]: "Scegli il tuo Personaggio",
  },
  selectCountry: {
    [Language.FR]: "Choisissez votre pays de départ",
    [Language.EN]: "Choose Your Starting Country",
    [Language.AR]: "اختر بلد البداية",
    [Language.ES]: "Elige tu País de Inicio",
    [Language.IT]: "Scegli il tuo Paese di Partenza",
  },
  playerName: {
    [Language.FR]: "Nom du Joueur",
    [Language.EN]: "Player Name",
    [Language.AR]: "اسم اللاعب",
    [Language.ES]: "Nombre del Jugador",
    [Language.IT]: "Nome Giocatore",
  },
  startGame: {
    [Language.FR]: "Commencer le Jeu",
    [Language.EN]: "Start Game",
    [Language.AR]: "ابدأ اللعبة",
    [Language.ES]: "Empezar Juego",
    [Language.IT]: "Inizia Gioco",
  },
  level: {
    [Language.FR]: "Niveau",
    [Language.EN]: "Level",
    [Language.AR]: "المستوى",
    [Language.ES]: "Nivel",
    [Language.IT]: "Livello",
  },
  xp: {
    [Language.FR]: "XP",
    [Language.EN]: "XP",
    [Language.AR]: "نقاط خبرة",
    [Language.ES]: "XP",
    [Language.IT]: "XP",
  },
  attack: {
    [Language.FR]: "Attaquer",
    [Language.EN]: "Attack",
    [Language.AR]: "هجوم",
    [Language.ES]: "Atacar",
    [Language.IT]: "Attacca",
  },
  ally: {
    [Language.FR]: "S'allier",
    [Language.EN]: "Ally",
    [Language.AR]: "تحالف",
    [Language.ES]: "Aliarse",
    [Language.IT]: "Alleati",
  },
  peaceTreaty: {
    [Language.FR]: "Traité de paix",
    [Language.EN]: "Peace Treaty",
    [Language.AR]: "معاهدة سلام",
    [Language.ES]: "Tratado de Paz",
    [Language.IT]: "Trattato di Pace",
  },
  worldMap: {
    [Language.FR]: "Carte du Monde",
    [Language.EN]: "World Map",
    [Language.AR]: "خريطة العالم",
    [Language.ES]: "Mapa del Mundo",
    [Language.IT]: "Mappa del Mondo",
  },
  playerStats: {
    [Language.FR]: "Stats du Joueur",
    [Language.EN]: "Player Stats",
    [Language.AR]: "إحصائيات اللاعب",
    [Language.ES]: "Estadísticas del Jugador",
    [Language.IT]: "Statistiche Giocatore",
  },
  actions: {
    [Language.FR]: "Actions",
    [Language.EN]: "Actions",
    [Language.AR]: "أفعال",
    [Language.ES]: "Acciones",
    [Language.IT]: "Azioni",
  },
  predefinedMessages: {
    [Language.FR]: "Messages Prédéfinis",
    [Language.EN]: "Predefined Messages",
    [Language.AR]: "رسائل محددة مسبقا",
    [Language.ES]: "Mensajes Predefinidos",
    [Language.IT]: "Messaggi Predefiniti",
  },
  messageHello: { [Language.FR]: "Bonjour !", [Language.EN]: "Hello!", [Language.AR]: "مرحبا!", [Language.ES]: "¡Hola!", [Language.IT]: "Ciao!" },
  messageLove: { [Language.FR]: "Je t'aime.", [Language.EN]: "I love you.", [Language.AR]: "أنا أحبك.", [Language.ES]: "Te quiero.", [Language.IT]: "Ti amo." },
  messageWarningGeneric: { [Language.FR]: "Attention à cette région !", [Language.EN]: "Watch out for this region!", [Language.AR]: "احترس من هذه المنطقة!", [Language.ES]: "¡Cuidado con esta región!", [Language.IT]: "Attenzione a questa regione!" },
  messageWarningIsraelLebanon: {
    [Language.FR]: "Attention à Israël qui attaque le Liban !",
    [Language.EN]: "Warning: Israel is attacking Lebanon!",
    [Language.AR]: "تحذير: إسرائيل تهاجم لبنان!",
    [Language.ES]: "¡Advertencia: Israel está atacando al Líbano!",
    [Language.IT]: "Attenzione: Israele sta attaccando il Libano!",
  },
  conquered: { [Language.FR]: "Conquis", [Language.EN]: "Conquered", [Language.AR]: "تم فتحه", [Language.ES]: "Conquistado", [Language.IT]: "Conquistato" },
  allied: { [Language.FR]: "Allié", [Language.EN]: "Allied", [Language.AR]: "حليف", [Language.ES]: "Aliado", [Language.IT]: "Alleato" },
  neutral: { [Language.FR]: "Neutre", [Language.EN]: "Neutral", [Language.AR]: "محايد", [Language.ES]: "Neutral", [Language.IT]: "Neutrale" },
  ownedByPlayer: { [Language.FR]: "Possédé par le joueur", [Language.EN]: "Owned by Player", [Language.AR]: "مملوك للاعب", [Language.ES]: "Propiedad del Jugador", [Language.IT]: "Posseduto dal Giocatore" },
  ownedByAI: { [Language.FR]: "Possédé par l'IA", [Language.EN]: "Owned by AI", [Language.AR]: "مملوكة من قبل الذكاء الاصطناعي", [Language.ES]: "Propiedad de la IA", [Language.IT]: "Posseduto dall'IA" },
  leaderboard: { [Language.FR]: "Classement", [Language.EN]: "Leaderboard", [Language.AR]: "لوحة الصدارة", [Language.ES]: "Clasificación", [Language.IT]: "Classifica" },
  noCountrySelected: { [Language.FR]: "Aucun pays sélectionné", [Language.EN]: "No country selected", [Language.AR]: "لم يتم اختيار بلد", [Language.ES]: "Ningún país seleccionado", [Language.IT]: "Nessun paese selezionato" },
  countryName: { [Language.FR]: "Pays", [Language.EN]: "Country", [Language.AR]: "البلد", [Language.ES]: "País", [Language.IT]: "Paese" },
  status: { [Language.FR]: "Statut", [Language.EN]: "Status", [Language.AR]: "الحالة", [Language.ES]: "Estado", [Language.IT]: "Stato" },
  with: { [Language.FR]: "avec", [Language.EN]: "with", [Language.AR]: "مع", [Language.ES]: "con", [Language.IT]: "con" },
};

export const PREDEFINED_MESSAGES: PredefinedMessage[] = [
  { id: 'hello', textKey: 'messageHello' },
  { id: 'love', textKey: 'messageLove' },
  { id: 'warningGeneric', textKey: 'messageWarningGeneric' },
  { id: 'warningIsraelLebanon', textKey: 'messageWarningIsraelLebanon'},
];

export const getTranslation = (key: string, lang: Language): string => {
  return TRANSLATIONS[key]?.[lang] || key;
};
