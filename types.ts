
export interface Character {
  id: string;
  name: string;
  description: string;
  avatarId: string; // Refers to an SVG avatar component name
  // Dragon Ball specific details
  firstName?: string;
  lastName?: string;
  origin?: string; // e.g., Planet Vegeta
}

export interface Country {
  id: string; // ISO 3166-1 alpha-2 code, e.g., "US"
  name: string;
  emoji: string;
  continent?: string; // Optional: For filtering or grouping
  gdp?: number; // Example metric for strength
  population?: number; // Example metric
}

export interface PlayerState {
  character: Character | null;
  xp: number;
  level: number;
  playerName: string;
  homeCountryId: string | null; // Country ID
}

export interface CountryStatus {
  owner: 'player' | 'ai' | 'neutral';
  allianceWithPlayer: boolean;
}

export interface GameState {
  playerState: PlayerState;
  countryStatuses: Record<string, CountryStatus>; // Keyed by Country ID
  currentLanguage: Language;
  gamePhase: 'setup' | 'playing';
  activeWars: { attackerId: string, defenderId: string }[];
  alliances: { countryId1: string, countryId2: string }[]; // For AI-AI or AI-Player
}

export enum Language {
  FR = 'fr',
  EN = 'en',
  AR = 'ar',
  ES = 'es',
  IT = 'it',
}

export interface Translations {
  [key: string]: { [lang in Language]: string };
}

export interface PredefinedMessage {
  id: string;
  textKey: string; // Key to look up in Translations
}
