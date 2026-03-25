window.appState = {
  soundEnabled: true,
  profile: JSON.parse(localStorage.getItem('renaudGamesProfile') || '{"name":"Renaud"}'),
  scores: JSON.parse(localStorage.getItem('renaudGamesScores') || '{"crossword":0,"snakeBest":0,"zombieBest":0,"memoryBest":0,"total":0}')
};

function saveProfile(){
  localStorage.setItem('renaudGamesProfile', JSON.stringify(appState.profile));
  const nameEls = document.querySelectorAll('[data-player-name]');
  nameEls.forEach(el => el.textContent = appState.profile.name || 'Renaud');
}

function saveScores(){
  localStorage.setItem('renaudGamesScores', JSON.stringify(appState.scores));
  renderStats();
}

function renderStats(){
  const map = {
    statCross: appState.scores.crossword || 0,
    statSnake: appState.scores.snakeBest || 0,
    statZombie: appState.scores.zombieBest || 0,
    statTotal: appState.scores.total || 0,
    statMemory: appState.scores.memoryBest || 0
  };
  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
  document.querySelectorAll('[data-player-name]').forEach(el => el.textContent = appState.profile.name || 'Renaud');
}

function resetScores(){
  if(!confirm('Réinitialiser tous les scores locaux ?')) return;
  appState.scores = {crossword:0,snakeBest:0,zombieBest:0,memoryBest:0,total:0};
  saveScores();
  window.location.reload();
}

function toggleSound(){
  appState.soundEnabled = !appState.soundEnabled;
  document.querySelectorAll('[data-sound-label]').forEach(el => {
    el.textContent = appState.soundEnabled ? '🔊 Son activé' : '🔇 Son coupé';
  });
}

function beep(freq=440,duration=0.05,type='sine',gain=0.018){
  if(!appState.soundEnabled) return;
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type; osc.frequency.value = freq; g.gain.value = gain;
    osc.connect(g); g.connect(ctx.destination);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  }catch(e){}
}

function openProfileModal(){
  const modal = document.getElementById('profileModal');
  if (!modal) return;
  modal.classList.add('show');
  const input = document.getElementById('playerNameInput');
  if (input) {
    input.value = appState.profile.name || 'Renaud';
    setTimeout(() => input.focus(), 30);
  }
}

function closeProfileModal(){
  const modal = document.getElementById('profileModal');
  if (modal) modal.classList.remove('show');
}

function saveProfileFromModal(){
  const input = document.getElementById('playerNameInput');
  if (!input) return;
  const value = input.value.trim().slice(0, 24);
  if (!value) return;
  appState.profile.name = value;
  saveProfile();
  closeProfileModal();
}

async function submitScore(entry){
  if (!window.rgBackend || !window.rgBackend.saveScore) return false;
  try {
    await window.rgBackend.saveScore({
      player: appState.profile.name || 'Renaud',
      ...entry
    });
    return true;
  } catch (error) {
    console.error('Score submit error', error);
    return false;
  }
}

function renderBackendStatus(){
  const backendMode = window.rgBackend?.mode || 'local';
  document.querySelectorAll('[data-backend-status]').forEach(el => {
    el.textContent = backendMode === 'firebase' ? 'Classement en ligne actif' : 'Classement local actif';
    el.classList.toggle('ok', backendMode === 'firebase');
    el.classList.toggle('warn', backendMode !== 'firebase');
  });
}

window.addEventListener('rg-backend-ready', renderBackendStatus);
document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  saveProfile();
  renderBackendStatus();
});
