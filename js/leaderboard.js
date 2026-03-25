async function renderLeaderboard(){
  const game = document.getElementById('lbGame')?.value || 'crossword';
  const tbody = document.getElementById('leaderboardBody');
  const status = document.getElementById('leaderboardStatus');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="5">Chargement...</td></tr>';
  try {
    const rows = await window.rgBackend.getLeaderboard(game);
    status.textContent = window.rgBackend.mode === 'firebase' ? 'Classement Firebase en direct' : 'Classement local actif';
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="5">Aucun score pour le moment.</td></tr>';
      return;
    }
    tbody.innerHTML = rows.map((row, index) => `<tr><td class="rank">#${index + 1}</td><td>${row.player || 'Joueur'}</td><td>${row.score || 0}</td><td>${row.category || '-'}</td><td>${row.difficulty || '-'}</td></tr>`).join('');
  } catch (error) {
    console.error(error);
    tbody.innerHTML = '<tr><td colspan="5">Impossible de charger le classement.</td></tr>';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lbGame')?.addEventListener('change', renderLeaderboard);
  window.addEventListener('rg-backend-ready', renderLeaderboard);
  renderLeaderboard();
});
