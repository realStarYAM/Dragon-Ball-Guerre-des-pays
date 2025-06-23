import React, { useState, useEffect, createContext } from 'react';
import { Language } from './types.js';
import { INITIAL_XP, INITIAL_LEVEL, COUNTRIES, TRANSLATIONS, getTranslation } from './gameData.js';
import { SetupScreen, GameScreen, LanguageSwitcher } from './components.jsx';

const initialPlayerState = {
  character: null,
  xp: INITIAL_XP,
  level: INITIAL_LEVEL,
  playerName: '',
  homeCountryId: null,
};

const initialCountryStatuses = COUNTRIES.reduce((acc, country) => {
  acc[country.id] = { owner: 'neutral', allianceWithPlayer: false };
  return acc;
}, {});


const initialGameState = {
  playerState: initialPlayerState,
  countryStatuses: initialCountryStatuses,
  currentLanguage: Language.FR, // Default language
  gamePhase: 'setup',
  activeWars: [],
  alliances: [],
};

// Contexts
export const LanguageContext = createContext({
  currentLanguage: Language.FR,
  setCurrentLanguage: () => {},
  translate: (key) => key,
});

export const GameContext = createContext({
  gameState: initialGameState,
  setGameState: () => {},
});

const APP_STORAGE_KEY = 'dragonBallWarGame';
const LANGUAGE_STORAGE_KEY = 'dragonBallWarGameLang';

const App = () => {
  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLang || Language.FR;
  });

  const [gameState, setGameState] = useState(() => {
    const savedGame = localStorage.getItem(APP_STORAGE_KEY);
    if (savedGame) {
      try {
        const parsedGame = JSON.parse(savedGame);
        // Ensure all countries have a status, even if new ones were added to gameData.ts
        const fullCountryStatuses = { ...initialCountryStatuses, ...parsedGame.countryStatuses };
        return { ...parsedGame, countryStatuses: fullCountryStatuses, currentLanguage: currentLanguage };
      } catch (e) {
        console.error("Failed to parse saved game state:", e);
        return { ...initialGameState, currentLanguage: currentLanguage };
      }
    }
    return { ...initialGameState, currentLanguage: currentLanguage };
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    // Update gameState's language if it changes via switcher
    // This seems redundant if gameState.currentLanguage is the source of truth,
    // but useful if language is managed separately and needs to sync.
    // For now, let's assume LanguageContext handles language primarily for UI text.
    // Game logic specific language needs might differ.
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const setCurrentLanguage = (lang) => {
    setCurrentLanguageState(lang);
    setGameState(prev => ({ ...prev, currentLanguage: lang })); // Sync with game state too
  };
  
  const translate = (key) => {
    return getTranslation(key, currentLanguage);
  };

  const handleGameStart = (
    playerName,
    character,
    homeCountryId
  ) => {
    setGameState(prev => {
      const newCountryStatuses = { ...prev.countryStatuses };
      newCountryStatuses[homeCountryId] = { owner: 'player', allianceWithPlayer: false };

      return {
        ...prev,
        playerState: {
          ...prev.playerState,
          playerName,
          character,
          homeCountryId,
        },
        countryStatuses: newCountryStatuses,
        gamePhase: 'playing',
      };
    });
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, translate }}>
      <GameContext.Provider value={{ gameState, setGameState }}>
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
          <header className="w-full bg-slate-800 p-4 shadow-lg text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-sky-400">
              {translate('appName')}
            </h1>
          </header>
          <main className="w-full flex-grow container mx-auto px-2 py-4 md:px-4 md:py-6">
            {gameState.gamePhase === 'setup' ? (
              <SetupScreen onGameStart={handleGameStart} />
            ) : (
              <GameScreen />
            )}
          </main>
          <LanguageSwitcher />
          <footer className="w-full text-center p-4 text-xs text-gray-500">
            Dragon Ball: Guerre des Pays - Alpha Version
          </footer>
        </div>
      </GameContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;
