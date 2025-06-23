
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Language } from './types.js';
import { AVAILABLE_CHARACTERS, COUNTRIES, PREDEFINED_MESSAGES, getTranslation, TRANSLATIONS, XP_PER_LEVEL } from './gameData.js';
import { GameContext, LanguageContext } from './App'; // Assuming contexts are exported from App.tsx
import * as d3 from 'd3';
import *লাইনেtopojson from 'topojson-client';

// --- SVG Avatars ---
const GokuAvatar = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-500 text-white ${className}`}>
    <text x="50" y="60" textAnchor="middle" fontSize="40">悟空</text>
  </svg>
);
const VegetaAvatar = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-700 text-white ${className}`}>
    <text x="50" y="60" textAnchor="middle" fontSize="35">ベジータ</text>
  </svg>
);
const PiccoloAvatar = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500 text-white ${className}`}>
    <text x="50" y="60" textAnchor="middle" fontSize="40">ピッコロ</text>
  </svg>
);
const BulmaAvatar = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-teal-400 text-white ${className}`}>
    <text x="50" y="60" textAnchor="middle" fontSize="35">ブルマ</text>
  </svg>
);

const AVATAR_MAP = {
  GokuAvatar,
  VegetaAvatar,
  PiccoloAvatar,
  BulmaAvatar,
  // Add more as needed
};

export const AvatarDisplay = ({ avatarId, className }) => {
  const AvatarComponent = AVATAR_MAP[avatarId];
  return AvatarComponent ? <AvatarComponent className={className} /> : <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-400 ${className}`} aria-label="Default avatar">?</div>;
};

// --- Character Components ---
const CharacterCard = ({ character, onSelect, isSelected, language }) => {
  return (
    <button
      onClick={() => onSelect(character)}
      className={`p-3 md:p-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105
                  ${isSelected ? 'bg-sky-500 ring-4 ring-sky-300' : 'bg-slate-700 hover:bg-slate-600'}`}
      aria-pressed={isSelected}
      aria-label={`${getTranslation('selectCharacter', language)}: ${character.name}`}
    >
      <div className="flex flex-col items-center">
        <AvatarDisplay avatarId={character.avatarId} className="mb-2" />
        <h3 className="text-sm md:text-md font-semibold text-white">{character.name}</h3>
        <p className="text-xs md:text-sm text-gray-300 text-center">{character.description}</p>
        <dl className="mt-2 text-xs text-gray-400 text-left">
          {character.firstName && <div><dt className="inline font-semibold">Prénom: </dt><dd className="inline">{character.firstName}</dd></div>}
          {character.lastName && <div><dt className="inline font-semibold">Nom: </dt><dd className="inline">{character.lastName}</dd></div>}
          {character.origin && <div><dt className="inline font-semibold">Origine: </dt><dd className="inline">{character.origin}</dd></div>}
        </dl>
      </div>
    </button>
  );
};

export const CharacterSelection = ({ onCharacterSelect, selectedCharacter }) => {
  const { currentLanguage } = useContext(LanguageContext);

  return (
    <div className="mb-6 p-4 bg-slate-800 rounded-lg shadow-xl">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-sky-400">{getTranslation('selectCharacter', currentLanguage)}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {AVAILABLE_CHARACTERS.map(char => (
          <CharacterCard
            key={char.id}
            character={char}
            onSelect={onCharacterSelect}
            isSelected={selectedCharacter?.id === char.id}
            language={currentLanguage}
          />
        ))}
      </div>
    </div>
  );
};


// --- Country Components ---
export const CountrySelector = ({ onCountrySelect, selectedCountryId, disabled }) => {
  const { currentLanguage } = useContext(LanguageContext);

  return (
    <div className="mb-6 p-4 bg-slate-800 rounded-lg shadow-xl">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-sky-400">{getTranslation('selectCountry', currentLanguage)}</h2>
      <select
        value={selectedCountryId || ''}
        onChange={(e) => onCountrySelect(e.target.value)}
        disabled={disabled}
        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-sky-500 focus:border-sky-500 disabled:opacity-50"
        aria-label={getTranslation('selectCountry', currentLanguage)}
      >
        <option value="" disabled>{`-- ${getTranslation('selectCountry', currentLanguage)} --`}</option>
        {COUNTRIES.sort((a,b) => a.name.localeCompare(b.name)).map(country => (
          <option key={country.id} value={country.id}>
            {country.emoji} {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// --- Player HUD ---
export const PlayerHUD = () => {
  const { gameState } = useContext(GameContext);
  const { currentLanguage } = useContext(LanguageContext);
  const { playerState } = gameState;

  if (!playerState.character || !playerState.homeCountryId) {
    return null; // Don't render HUD if game not fully set up
  }
  
  const homeCountry = COUNTRIES.find(c => c.id === playerState.homeCountryId);

  return (
    <div className="p-3 md:p-4 bg-slate-800 shadow-lg rounded-lg mb-4 text-sm md:text-base">
      <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-3">
          <AvatarDisplay avatarId={playerState.character.avatarId} className="w-10 h-10 md:w-12 md:h-12"/>
          <div>
            <h3 className="font-bold text-sky-400 text-md md:text-lg">{playerState.playerName}</h3>
            <p className="text-xs md:text-sm text-gray-300">{playerState.character.name}</p>
          </div>
        </div>
        <div className="text-right md:text-left">
          <p><span className="font-semibold">{getTranslation('level', currentLanguage)}:</span> {playerState.level}</p>
          <p><span className="font-semibold">{getTranslation('xp', currentLanguage)}:</span> {playerState.xp} / {playerState.level * XP_PER_LEVEL}</p>
        </div>
        {homeCountry && (
          <div className="text-right md:text-left">
            <p className="font-semibold">{getTranslation('countryName', currentLanguage)}:</p>
            <p>{homeCountry.emoji} {homeCountry.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};


// --- World Map ---
export const WorldMap = ({ onCountrySelect, selectedCountryId, countryStatuses, playerHomeCountryId }) => {
  const svgRef = useRef(null);
  const { currentLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous map

    const width = svgRef.current.parentElement?.clientWidth || 800;
    const height = width * 0.5; // Maintain aspect ratio

    svg.attr("viewBox", `0 0 ${width} ${height}`)
       .attr("preserveAspectRatio", "xMidYMid meet");
    
    const projection = d3.geoMercator().scale(width / (2 * Math.PI) * 0.9).translate([width / 2, height / 1.5]);
    const path = d3.geoPath().projection(projection);

    // Fetch world map data (TopoJSON format)
    // Using a more detailed map for better country outlines
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((world) => {
      if (!world) {
        console.error("Failed to load world map data.");
        return;
      }
      // Convert TopoJSON to GeoJSON
      const countriesGeoJSON = topojson.feature(world, world.objects.countries);

      svg.append("g")
        .selectAll("path")
        .data(countriesGeoJSON.features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "country stroke-gray-700 stroke-[0.5px] cursor-pointer")
        .attr("fill", (d) => {
            const countryId = d.id; // TopoJSON often uses ISO 3166-1 numeric, need to map to alpha-2 or match by name
            // For this example, we'll try to find by name, but ISO alpha-2 in your COUNTRIES data is better
            const gameCountry = COUNTRIES.find(c => c.name === d.properties.name || c.id === d.id); // d.id might be numeric, check properties
            if (gameCountry) {
                const status = countryStatuses[gameCountry.id];
                if (status) {
                    if (status.owner === 'player') return '#34d399'; // Emerald 400
                    if (status.owner === 'ai') return '#f87171'; // Red 400
                    if (status.allianceWithPlayer) return '#60a5fa'; // Blue 400
                }
            }
          return "#4a5568"; // Default: slate-600
        })
        .on("mouseover", function(event, d) {
          d3.select(this).style("fill-opacity", 0.7);
        })
        .on("mouseout", function(event, d) {
          d3.select(this).style("fill-opacity", 1);
        })
        .on("click", (event, d) => {
            const gameCountry = COUNTRIES.find(c => c.name === d.properties.name || c.id === d.id);
            if (gameCountry) {
              onCountrySelect(gameCountry.id);
            } else {
              onCountrySelect(null); // No matching game country found
            }
        })
        .style("stroke", (d) => {
            const gameCountry = COUNTRIES.find(c => c.name === d.properties.name || c.id === d.id);
            return gameCountry?.id === selectedCountryId ? "#fbbf24" : "#374151"; // Amber-400 or gray-800
        })
        .style("stroke-width", (d) => {
            const gameCountry = COUNTRIES.find(c => c.name === d.properties.name || c.id === d.id);
            return gameCountry?.id === selectedCountryId ? "2px" : "0.5px";
        });

        // Add a small tooltip (very basic)
        const tooltip = d3.select("body").append("div")
            .attr("class", "d3-tooltip absolute p-2 bg-slate-800 text-white text-xs rounded shadow-lg pointer-events-none opacity-0")
            .style("transition", "opacity 0.2s");

        svg.selectAll(".country")
            .on("mouseover", function(event, d) {
                d3.select(this).style("fill-opacity", 0.7);
                const gameCountry = COUNTRIES.find(c => c.name === d.properties.name || c.id === d.id);
                tooltip.style("opacity", 1)
                       .html(gameCountry ? `${gameCountry.emoji} ${gameCountry.name}` : d.properties.name || "Unknown territory")
                       .style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 15) + "px");
            })
            .on("mouseout", function() {
                d3.select(this).style("fill-opacity", 1);
                tooltip.style("opacity", 0);
            });


    }).catch(error => {
        console.error("Error loading or processing map data:", error);
        svg.append("text")
           .attr("x", width/2)
           .attr("y", height/2)
           .attr("text-anchor", "middle")
           .attr("fill", "white")
           .text("Error loading map.");
    });

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
        const newWidth = svgRef.current?.parentElement?.clientWidth || 800;
        const newHeight = newWidth * 0.5;
        d3.select(svgRef.current)
            .attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
        
        // Re-project and re-draw if needed, or simply adjust scale/translate
        projection.scale(newWidth / (2 * Math.PI) * 0.9).translate([newWidth / 2, newHeight / 1.5]);
        svg.selectAll("path").attr("d", path);
    });

    if (svgRef.current.parentElement) {
        resizeObserver.observe(svgRef.current.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
      d3.select(".d3-tooltip").remove(); // Clean up tooltip on unmount
    };

  }, [countryStatuses, selectedCountryId]); // Redraw if statuses or selection change to update colors/strokes

  return (
    <div className="map-container bg-slate-700 p-1 md:p-2 rounded-lg shadow-xl mb-4" aria-label={getTranslation('worldMap', currentLanguage)}>
      <svg ref={svgRef} className="w-full h-auto"></svg>
    </div>
  );
};

// --- Language Switcher ---
export const LanguageSwitcher = () => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const languages = Object.values(Language);

  return (
    <div className="p-2 md:p-3 bg-slate-800 rounded-md shadow-md flex gap-1 md:gap-2 justify-center items-center fixed bottom-2 right-2 z-50">
      {languages.map(lang => (
        <button
          key={lang}
          onClick={() => setCurrentLanguage(lang)}
          className={`px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm rounded-md transition-colors
                      ${currentLanguage === lang ? 'bg-sky-500 text-white font-semibold' : 'bg-slate-600 hover:bg-slate-500 text-gray-200'}`}
          aria-pressed={currentLanguage === lang}
          lang={lang} // Good for accessibility, indicates the language of the button label itself if it were translated
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};


// --- Predefined Messages ---
export const PredefinedMessageButton = ({ message, onClick }) => {
  const { currentLanguage } = useContext(LanguageContext);
  return (
    <button
      onClick={() => onClick(message)}
      className="w-full text-left p-2 bg-slate-600 hover:bg-slate-500 rounded-md text-sm text-gray-200 transition-colors"
    >
      {getTranslation(message.textKey, currentLanguage)}
    </button>
  );
};

export const PredefinedMessagesPanel = ({ onMessageSend }) => {
  const { currentLanguage } = useContext(LanguageContext);

  // Example: How to handle a specific message like the Israel-Lebanon one if needed dynamically.
  // For now, all messages are from PREDEFINED_MESSAGES.
  // const dynamicMessageExample: PredefinedMessage = {
  //   id: 'warningIsraelLebanon',
  //   textKey: 'messageWarningIsraelLebanon', // This key would need to be added to TRANSLATIONS
  // };

  return (
    <div className="p-3 bg-slate-800 rounded-lg shadow-xl">
      <h3 className="text-md font-semibold mb-3 text-sky-400">{getTranslation('predefinedMessages', currentLanguage)}</h3>
      <div className="space-y-2">
        {PREDEFINED_MESSAGES.map(msg => (
          <PredefinedMessageButton key={msg.id} message={msg} onClick={onMessageSend} />
        ))}
        {/* You could add more dynamic messages here if needed */}
        {/* <PredefinedMessageButton message={dynamicMessageExample} onClick={onMessageSend} /> */}
      </div>
    </div>
  );
};


// --- Selected Country Info Panel & Actions ---
export const SelectedCountryInfoPanel = ({ countryId, onAttack, onAlly, onPeaceTreaty }) => {
  const { gameState } = useContext(GameContext);
  const { currentLanguage } = useContext(LanguageContext);

  if (!countryId) {
    return (
      <div className="p-4 bg-slate-800 rounded-lg shadow-xl text-center">
        <p className="text-gray-400">{getTranslation('noCountrySelected', currentLanguage)}</p>
      </div>
    );
  }

  const country = COUNTRIES.find(c => c.id === countryId);
  const statusInfo = gameState.countryStatuses[countryId];

  if (!country) return <div className="p-4 bg-slate-800 rounded-lg shadow-xl text-center"><p className="text-red-400">Error: Country data not found.</p></div>;

  let statusText = getTranslation('neutral', currentLanguage);
  let statusColor = 'text-gray-400';

  if (statusInfo) {
    if (statusInfo.owner === 'player') {
      statusText = getTranslation('ownedByPlayer', currentLanguage);
      statusColor = 'text-emerald-400';
    } else if (statusInfo.owner === 'ai') {
      statusText = getTranslation('ownedByAI', currentLanguage);
      statusColor = 'text-red-400';
    } else if (statusInfo.allianceWithPlayer) {
      statusText = getTranslation('allied', currentLanguage) + ` (${getTranslation('ownedByAI', currentLanguage)})`;
      statusColor = 'text-sky-400';
    }
  }


  const isPlayerOwned = statusInfo?.owner === 'player';
  const isNeutral = !statusInfo || statusInfo.owner === 'neutral';
  const isOwnedByAI = statusInfo?.owner === 'ai';
  const isAlliedWithPlayer = statusInfo?.allianceWithPlayer;

  return (
    <div className="p-4 bg-slate-800 rounded-lg shadow-xl">
      <h3 className="text-xl font-bold mb-3 text-sky-400">{country.emoji} {country.name}</h3>
      <div className="mb-3">
        <p><span className="font-semibold">{getTranslation('status', currentLanguage)}:</span> <span className={statusColor}>{statusText}</span></p>
        {country.continent && <p><span className="font-semibold">Continent:</span> {country.continent}</p>}
        {country.population && <p><span className="font-semibold">Population:</span> {country.population}M</p>}
        {country.gdp && <p><span className="font-semibold">GDP:</span> ${country.gdp}B</p>}
      </div>

      {!isPlayerOwned && (
        <div className="space-y-2">
          { (isNeutral || (isOwnedByAI && !isAlliedWithPlayer)) && (
            <button
              onClick={() => onAttack(countryId)}
              className="w-full p-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors"
              aria-label={`${getTranslation('attack', currentLanguage)} ${country.name}`}
            >
              {getTranslation('attack', currentLanguage)}
            </button>
          )}
          { isOwnedByAI && !isAlliedWithPlayer && (
            <button
              onClick={() => onAlly(countryId)}
              className="w-full p-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-colors"
              aria-label={`${getTranslation('ally', currentLanguage)} ${getTranslation('with', currentLanguage)} ${country.name}`}
            >
              {getTranslation('ally', currentLanguage)}
            </button>
          )}
           { isOwnedByAI && isAlliedWithPlayer && (
            <button
              onClick={() => onPeaceTreaty(countryId)} // Placeholder, could be 'Break Alliance' or other action
              className="w-full p-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-md transition-colors"
              aria-label={`${getTranslation('peaceTreaty', currentLanguage)} ${getTranslation('with', currentLanguage)} ${country.name}`}
            >
              {getTranslation('peaceTreaty', currentLanguage)} (Break Alliance)
            </button>
          )}
          {/* Add Peace Treaty button logic if country is at war with player */}
        </div>
      )}
    </div>
  );
};


// --- Setup Screen ---
export const SetupScreen = ({ onGameStart }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedHomeCountry, setSelectedHomeCountry] = useState(null);
  const { currentLanguage } = useContext(LanguageContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName && selectedCharacter && selectedHomeCountry) {
      onGameStart(playerName, selectedCharacter, selectedHomeCountry);
    } else {
      alert("Please fill in all fields!"); // Basic validation
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="playerName" className="block text-xl md:text-2xl font-bold mb-2 text-sky-400">
            {getTranslation('playerName', currentLanguage)}
          </label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-sky-500 focus:border-sky-500"
            required
            aria-required="true"
          />
        </div>

        <CharacterSelection
          selectedCharacter={selectedCharacter}
          onCharacterSelect={setSelectedCharacter}
        />
        <CountrySelector
          selectedCountryId={selectedHomeCountry}
          onCountrySelect={setSelectedHomeCountry}
          disabled={!selectedCharacter} // Example: enable country selection only after char selection
        />

        <button
          type="submit"
          disabled={!playerName || !selectedCharacter || !selectedHomeCountry}
          className="w-full p-3 md:p-4 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded-md shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {getTranslation('startGame', currentLanguage)}
        </button>
      </form>
    </div>
  );
};

// --- Game Screen (Main gameplay view) ---
export const GameScreen = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { currentLanguage } = useContext(LanguageContext);
  const [selectedMapCountryId, setSelectedMapCountryId] = useState(null);

  const handleCountrySelectOnMap = (countryId) => {
    setSelectedMapCountryId(countryId);
  };

  const handleAttack = (countryId) => {
    // Basic attack logic: AI country becomes player-owned. Player gains XP.
    // In a real game, this would involve combat mechanics, strength comparison, etc.
    console.log(`Player attacking ${countryId}`);
    setGameState(prev => {
      const newCountryStatuses = { ...prev.countryStatuses };
      newCountryStatuses[countryId] = { owner: 'player', allianceWithPlayer: false };
      
      let newXp = prev.playerState.xp + 50; // XP for conquering
      let newLevel = prev.playerState.level;
      if (newXp >= newLevel * XP_PER_LEVEL) {
        newXp -= newLevel * XP_PER_LEVEL;
        newLevel++;
      }

      return {
        ...prev,
        playerState: { ...prev.playerState, xp: newXp, level: newLevel },
        countryStatuses: newCountryStatuses,
        activeWars: [...prev.activeWars, { attackerId: prev.playerState.homeCountryId!, defenderId: countryId }] // Simplistic
      };
    });
    alert(`You attacked and conquered ${COUNTRIES.find(c=>c.id === countryId)?.name}!`);
  };

  const handleAlly = (countryId) => {
    // Basic ally logic: AI country becomes allied with player. Player gains XP.
    console.log(`Player forming alliance with ${countryId}`);
     setGameState(prev => {
      const newCountryStatuses = { ...prev.countryStatuses };
      // Ensure the country is marked as AI-owned if it wasn't before, then set alliance
      const currentOwner = newCountryStatuses[countryId]?.owner || 'ai'; // Default to ai if neutral and allying
      newCountryStatuses[countryId] = { owner: currentOwner, allianceWithPlayer: true };
      
      let newXp = prev.playerState.xp + 25; // XP for alliance
      let newLevel = prev.playerState.level;
      if (newXp >= newLevel * XP_PER_LEVEL) {
        newXp -= newLevel * XP_PER_LEVEL;
        newLevel++;
      }
      
      return {
        ...prev,
        playerState: { ...prev.playerState, xp: newXp, level: newLevel },
        countryStatuses: newCountryStatuses,
        alliances: [...prev.alliances, { countryId1: prev.playerState.homeCountryId!, countryId2: countryId }] // Simplistic
      };
    });
    alert(`You formed an alliance with ${COUNTRIES.find(c=>c.id === countryId)?.name}!`);
  };

  // Or break alliance
  const handlePeaceTreaty = (countryId) => {
    console.log(`Player breaking alliance/making peace with ${countryId}`);
    setGameState(prev => {
      const newCountryStatuses = { ...prev.countryStatuses };
      // Country remains AI owned, but no longer allied
      if (newCountryStatuses[countryId]) {
        newCountryStatuses[countryId].allianceWithPlayer = false;
      }
      return {
        ...prev,
        countryStatuses: newCountryStatuses,
        alliances: prev.alliances.filter(a => !( (a.countryId1 === prev.playerState.homeCountryId && a.countryId2 === countryId) || (a.countryId2 === prev.playerState.homeCountryId && a.countryId1 === countryId) ))
      };
    });
    alert(`Alliance with ${COUNTRIES.find(c=>c.id === countryId)?.name} broken.`);
  };


  const handleSendMessage = (message) => {
    const translatedMessage = getTranslation(message.textKey, currentLanguage);
    // In a real game, this might go to a chat log, or trigger an event.
    // For "Attention à Israël qui attaque le Liban", this could trigger a game event or AI behavior.
    if (message.id === 'warningIsraelLebanon') { // Example specific action
        alert(`ALERT: ${translatedMessage} - This could trigger a specific game event!`);
        // Potentially set some state, e.g., gameState.israelAttackingLebanon = true;
    } else {
        alert(`Message sent: "${translatedMessage}"`);
    }
  };


  return (
    <div className="p-2 md:p-4">
      <PlayerHUD />
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-3/4">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-sky-400">{getTranslation('worldMap', currentLanguage)}</h2>
          <WorldMap
            onCountrySelect={handleCountrySelectOnMap}
            selectedCountryId={selectedMapCountryId}
            countryStatuses={gameState.countryStatuses}
            playerHomeCountryId={gameState.playerState.homeCountryId}
          />
        </div>
        <div className="lg:w-1/4 space-y-4">
          <div>
             <h2 className="text-xl md:text-2xl font-bold mb-2 text-sky-400">{getTranslation('actions', currentLanguage)}</h2>
            <SelectedCountryInfoPanel
              countryId={selectedMapCountryId}
              onAttack={handleAttack}
              onAlly={handleAlly}
              onPeaceTreaty={handlePeaceTreaty}
            />
          </div>
          <PredefinedMessagesPanel onMessageSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};
