const characters = [
  { name: 'Goku', origin: 'Planète Vegeta' },
  { name: 'Vegeta', origin: 'Planète Vegeta' },
  { name: 'Gohan', origin: 'Terre' },
  { name: 'Piccolo', origin: 'Namek' }
];

let player = {
  character: null,
  country: null,
  xp: 0,
  level: 1
};

function initCharacters() {
  const select = document.getElementById('character-select');
  characters.forEach(ch => {
    const opt = document.createElement('option');
    opt.value = ch.name;
    opt.textContent = ch.name;
    select.appendChild(opt);
  });
}

function startGame() {
  const charSelect = document.getElementById('character-select');
  const countrySelect = document.getElementById('country-select');
  player.character = charSelect.value;
  player.country = countrySelect.value;
  document.getElementById('player-setup').hidden = true;
  document.getElementById('game').hidden = false;
  showMessage(`Bienvenue ${player.character} du ${player.country}!`);
}

function showMessage(msg) {
  const box = document.getElementById('messages');
  const p = document.createElement('p');
  p.textContent = msg;
  box.appendChild(p);
}

function gainXP(amount) {
  player.xp += amount;
  if (player.xp >= player.level * 100) {
    player.level++;
    showMessage(`Niveau supérieur! Niveau actuel: ${player.level}`);
  }
}

function setupEvents() {
  document.getElementById('start-btn').addEventListener('click', startGame);
  document.getElementById('attack-btn').addEventListener('click', () => {
    gainXP(20);
    showMessage('Attaque lancée!');
  });
  document.getElementById('ally-btn').addEventListener('click', () => {
    gainXP(10);
    showMessage('Alliance proposée.');
  });
  document.getElementById('peace-btn').addEventListener('click', () => {
    gainXP(5);
    showMessage('Traité de paix envoyé.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCharacters();
  setupEvents();
});
