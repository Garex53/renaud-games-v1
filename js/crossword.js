const crosswordState = { puzzle:null, cells:[], selectedWordIndex:0, score:0, solved:false };

const crosswordBank = {
  informatique: {
    facile: [
      { answer:'SOURIS', clue:'Périphérique pour cliquer' },{ answer:'CLAVIER', clue:'Périphérique pour écrire' },{ answer:'ECRAN', clue:'Affiche l’image' },{ answer:'PIXEL', clue:'Élément d’une image' },{ answer:'WEB', clue:'Réseau de pages' },{ answer:'USB', clue:'Port courant' },{ answer:'MAIL', clue:'Courrier électronique' },{ answer:'SITE', clue:'Ensemble de pages web' },{ answer:'BUG', clue:'Erreur informatique' },{ answer:'RAM', clue:'Mémoire vive' },{ answer:'CODE', clue:'Texte écrit par un développeur' },{ answer:'APP', clue:'Application' },{ answer:'FICHIER', clue:'Document enregistré' },{ answer:'ONGLET', clue:'Section dans un navigateur' },{ answer:'LOGIN', clue:'Connexion à un compte' },{ answer:'CLIC', clue:'Action de souris' },{ answer:'DOSSIER', clue:'Répertoire de fichiers' },{ answer:'TABLETTE', clue:'Appareil tactile portable' }
    ],
    moyen: [
      { answer:'SERVEUR', clue:'Machine qui héberge des données' },{ answer:'RESEAU', clue:'Ensemble d’appareils connectés' },{ answer:'LINUX', clue:'Système libre' },{ answer:'SCRIPT', clue:'Suite d’instructions' },{ answer:'DONNEE', clue:'Data en français' },{ answer:'CLOUD', clue:'Stockage en ligne' },{ answer:'HTML', clue:'Langage de structure web' },{ answer:'CSS', clue:'Langage de style web' },{ answer:'CACHE', clue:'Mémoire temporaire' },{ answer:'NAVIGATEUR', clue:'Programme pour aller sur internet' },{ answer:'COOKIE', clue:'Petite donnée stockée par un site' },{ answer:'API', clue:'Interface entre services' },{ answer:'GPU', clue:'Processeur graphique' },{ answer:'SECURISE', clue:'Protégé contre les accès non voulus' },{ answer:'UPLOAD', clue:'Envoi d’un fichier en ligne' },{ answer:'DOWNLOAD', clue:'Téléchargement en anglais' }
    ],
    difficile: [
      { answer:'ALGORITHME', clue:'Suite d’étapes logiques' },{ answer:'VARIABLE', clue:'Zone mémoire nommée' },{ answer:'FRAMEWORK', clue:'Base de travail pour développer' },{ answer:'KERNEL', clue:'Cœur du système' },{ answer:'SECURITE', clue:'Protection contre les attaques' },{ answer:'COMPILATEUR', clue:'Transforme du code source' },{ answer:'DATABASE', clue:'Base de données en anglais' },{ answer:'PYTHON', clue:'Langage très utilisé' },{ answer:'JAVASCRIPT', clue:'Langage du web interactif' },{ answer:'NODE', clue:'Environnement JS serveur' },{ answer:'DEPENDANCE', clue:'Élément nécessaire à un projet' },{ answer:'OPTIMISATION', clue:'Amélioration des performances' },{ answer:'FIREWALL', clue:'Barrière réseau de sécurité' },{ answer:'TERMINAL', clue:'Console système' }
    ]
  },
  culture: {
    facile: [
      { answer:'PARIS', clue:'Capitale de la France' },{ answer:'ROME', clue:'Capitale de l’Italie' },{ answer:'LUNE', clue:'Satellite naturel de la Terre' },{ answer:'MER', clue:'Grande étendue d’eau salée' },{ answer:'ART', clue:'Peinture, musique, sculpture...' },{ answer:'LIVRE', clue:'Objet qu’on lit' },{ answer:'THE', clue:'Boisson chaude' },{ answer:'OR', clue:'Métal précieux' },{ answer:'RIO', clue:'Ville du Brésil' },{ answer:'EAU', clue:'Liquide vital' },{ answer:'OPERA', clue:'Spectacle musical' },{ answer:'SOLEIL', clue:'Étoile du système solaire' },{ answer:'ASIE', clue:'Continent' },{ answer:'AFRIQUE', clue:'Continent du Sahara' }
    ],
    moyen: [
      { answer:'EVEREST', clue:'Plus haut sommet du monde' },{ answer:'JAPON', clue:'Pays de Tokyo' },{ answer:'NIL', clue:'Fleuve africain' },{ answer:'ORION', clue:'Constellation célèbre' },{ answer:'THEATRE', clue:'Art de la scène' },{ answer:'SAHARA', clue:'Grand désert africain' },{ answer:'VIOLON', clue:'Instrument à cordes' },{ answer:'ZEUS', clue:'Dieu grec' },{ answer:'MUSEE', clue:'Lieu d’exposition' },{ answer:'TANGO', clue:'Danse argentine' },{ answer:'PYRAMIDE', clue:'Monument d’Égypte' },{ answer:'GEOGRAPHIE', clue:'Étude des territoires' },{ answer:'VOLTAIRE', clue:'Écrivain des Lumières' },{ answer:'OPALE', clue:'Pierre précieuse' }
    ],
    difficile: [
      { answer:'ASTRONOMIE', clue:'Science des astres' },{ answer:'GALILEE', clue:'Savant italien' },{ answer:'HISTOIRE', clue:'Étude du passé' },{ answer:'SCULPTURE', clue:'Art de modeler la matière' },{ answer:'ARCHEOLOGIE', clue:'Science des civilisations anciennes' },{ answer:'MYTHOLOGIE', clue:'Récits des dieux antiques' },{ answer:'BAROQUE', clue:'Style artistique européen' },{ answer:'DYNASTIE', clue:'Suite de souverains' },{ answer:'LITTERATURE', clue:'Ensemble des œuvres écrites' },{ answer:'ARCHITECTURE', clue:'Art de concevoir des bâtiments' },{ answer:'MEDITERRANEE', clue:'Mer entre Europe et Afrique' },{ answer:'ENCYCLOPEDIE', clue:'Ouvrage de savoir complet' }
    ]
  },
  cinema: {
    facile: [
      { answer:'FILM', clue:'Œuvre projetée au cinéma' },{ answer:'SON', clue:'Partie audio' },{ answer:'STAR', clue:'Vedette' },{ answer:'ROLE', clue:'Personnage joué' },{ answer:'ECRAN', clue:'Surface de projection' },{ answer:'RIRE', clue:'Réaction à une comédie' },{ answer:'SCENE', clue:'Partie d’un film' },{ answer:'GENRE', clue:'Comédie, action, horreur...' },{ answer:'OSCAR', clue:'Grande récompense américaine' },{ answer:'ART', clue:'Le cinéma en est un' },{ answer:'DVD', clue:'Ancien support vidéo' },{ answer:'ACTEUR', clue:'Personne qui joue un rôle' }
    ],
    moyen: [
      { answer:'MONTAGE', clue:'Assemblage des plans' },{ answer:'TRAILER', clue:'Bande-annonce' },{ answer:'PLATEAU', clue:'Lieu de tournage' },{ answer:'IMAX', clue:'Format de salle géante' },{ answer:'COMEDIE', clue:'Genre drôle' },{ answer:'REALISATEUR', clue:'Dirige le film' },{ answer:'PIXAR', clue:'Studio d’animation connu' },{ answer:'SCENARIO', clue:'Histoire écrite du film' },{ answer:'MIXAGE', clue:'Travail sur le son' },{ answer:'CASCADE', clue:'Scène dangereuse' },{ answer:'PROJECTEUR', clue:'Diffuse l’image dans la salle' }
    ],
    difficile: [
      { answer:'DOCUMENTAIRE', clue:'Film basé sur le réel' },{ answer:'NOLAN', clue:'Réalisateur d’Inception' },{ answer:'FOLEY', clue:'Bruitage de cinéma' },{ answer:'PANORAMIQUE', clue:'Mouvement horizontal de caméra' },{ answer:'BLOCKBUSTER', clue:'Film au très grand succès' },{ answer:'DOUBLAGE', clue:'Voix remplacée' },{ answer:'PREPRODUCTION', clue:'Étape avant tournage' },{ answer:'CGI', clue:'Effets numériques' },{ answer:'PHOTOGRAPHIE', clue:'Image et lumière d’un film' },{ answer:'FESTIVAL', clue:'Cannes en est un' }
    ]
  }
};

function sanitize(str){ return (str||'').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Z0-9]/g,''); }
function emptyGrid(size){ return Array.from({length:size},()=>Array.from({length:size},()=>null)); }

function canPlaceWord(grid, word, row, col, dir){
  const size = grid.length;
  const dr = dir === 'down' ? 1 : 0;
  const dc = dir === 'across' ? 1 : 0;
  const endRow = row + dr * (word.length - 1);
  const endCol = col + dc * (word.length - 1);
  if (row < 0 || col < 0 || endRow >= size || endCol >= size) return false;

  for (let i=0;i<word.length;i++){
    const r = row + dr*i;
    const c = col + dc*i;
    const existing = grid[r][c];
    if (existing && existing !== word[i]) return false;
    if (!existing) {
      if (dir === 'across') {
        if (r > 0 && grid[r-1][c]) return false;
        if (r < size-1 && grid[r+1][c]) return false;
      } else {
        if (c > 0 && grid[r][c-1]) return false;
        if (c < size-1 && grid[r][c+1]) return false;
      }
    }
  }

  const beforeR = row - dr;
  const beforeC = col - dc;
  const afterR = row + dr * word.length;
  const afterC = col + dc * word.length;
  if (beforeR >=0 && beforeC >=0 && beforeR < size && beforeC < size && grid[beforeR][beforeC]) return false;
  if (afterR >=0 && afterC >=0 && afterR < size && afterC < size && grid[afterR][afterC]) return false;
  return true;
}

function placeWord(grid, word, row, col, dir){
  const cells = [];
  for (let i=0;i<word.length;i++) {
    const r = row + (dir === 'down' ? i : 0);
    const c = col + (dir === 'across' ? i : 0);
    grid[r][c] = word[i];
    cells.push({ r, c });
  }
  return cells;
}

function countCrossings(grid, word, row, col, dir){
  let count = 0;
  for (let i=0;i<word.length;i++) {
    const r = row + (dir === 'down' ? i : 0);
    const c = col + (dir === 'across' ? i : 0);
    if (grid[r][c] === word[i]) count++;
  }
  return count;
}

function generateAutoPuzzle(wordsData, size){
  const words = wordsData.map(w => ({ answer: sanitize(w.answer), clue: w.clue }))
    .filter(w => w.answer.length >= 3 && w.answer.length <= size)
    .sort((a,b) => b.answer.length - a.answer.length);
  if (!words.length) return null;

  let best = null;
  for (let attempt=0; attempt<80; attempt++) {
    const grid = emptyGrid(size);
    const placed = [];
    const seed = words[attempt % Math.min(words.length, 6)];
    const seedDir = attempt % 2 === 0 ? 'across' : 'down';
    const seedRow = seedDir === 'across' ? Math.floor(size/2) : Math.max(0, Math.floor((size-seed.answer.length)/2));
    const seedCol = seedDir === 'across' ? Math.max(0, Math.floor((size-seed.answer.length)/2)) : Math.floor(size/2);
    if (!canPlaceWord(grid, seed.answer, seedRow, seedCol, seedDir)) continue;
    placed.push({ ...seed, row: seedRow, col: seedCol, dir: seedDir, cells: placeWord(grid, seed.answer, seedRow, seedCol, seedDir) });

    for (const current of words.filter(w => w !== seed)) {
      let bestMove = null;
      for (const existing of placed) {
        for (let i=0;i<current.answer.length;i++) {
          for (let j=0;j<existing.answer.length;j++) {
            if (current.answer[i] !== existing.answer[j]) continue;
            const dir = existing.dir === 'across' ? 'down' : 'across';
            const row = dir === 'down' ? existing.row - i : existing.row + j;
            const col = dir === 'across' ? existing.col - i : existing.col + j;
            if (!canPlaceWord(grid, current.answer, row, col, dir)) continue;
            const crossings = countCrossings(grid, current.answer, row, col, dir);
            if (crossings < 1) continue;
            if (!bestMove || crossings > bestMove.crossings) bestMove = { row, col, dir, crossings };
          }
        }
      }
      if (bestMove) {
        placed.push({ ...current, row: bestMove.row, col: bestMove.col, dir: bestMove.dir, cells: placeWord(grid, current.answer, bestMove.row, bestMove.col, bestMove.dir) });
      }
    }

    if (!best || placed.length > best.words.length) {
      best = { size, title: `Grille ${size}x${size}`, solution: grid.map(row => [...row]), words: placed };
    }
  }

  if (!best || best.words.length < 4) return null;
  const starts = new Map(); let num=1;
  best.words.sort((a,b) => (a.row - b.row) || (a.col - b.col));
  best.words.forEach(w => {
    const key = `${w.row}-${w.col}`;
    if (!starts.has(key)) starts.set(key, num++);
    w.number = starts.get(key);
  });
  return best;
}

function pickPuzzle(category, difficulty, chosenSize){
  const wordsData = crosswordBank?.[category]?.[difficulty];
  if (!wordsData || !wordsData.length) return null;
  return generateAutoPuzzle(wordsData, chosenSize);
}

function renderCrossword(){
  const puzzle = crosswordState.puzzle;
  if (!puzzle) return;
  const gridEl = document.getElementById('cwGrid');
  const cluesEl = document.getElementById('cwClues');
  gridEl.innerHTML = '';
  cluesEl.innerHTML = '';
  gridEl.style.gridTemplateColumns = `repeat(${puzzle.size}, 1fr)`;
  crosswordState.cells = Array.from({length:puzzle.size},()=>Array.from({length:puzzle.size},()=>null));

  const numberMap = {};
  puzzle.words.forEach(w => numberMap[`${w.row}-${w.col}`] = w.number);

  for (let r=0;r<puzzle.size;r++) {
    for (let c=0;c<puzzle.size;c++) {
      const wrap = document.createElement('div');
      wrap.className = 'cw-cell-wrap';
      if (puzzle.solution[r][c]) {
        const input = document.createElement('input');
        input.className = 'cw-cell';
        input.maxLength = 1;
        input.dataset.r = r;
        input.dataset.c = c;
        input.addEventListener('input', e => {
          e.target.value = sanitize(e.target.value).slice(0,1);
          if (e.target.value) moveToNextCell(r,c);
          updateCrosswordProgress();
        });
        input.addEventListener('keydown', e => {
          if (e.key === 'ArrowUp') focusCell(r-1,c);
          else if (e.key === 'ArrowDown') focusCell(r+1,c);
          else if (e.key === 'ArrowLeft') focusCell(r,c-1);
          else if (e.key === 'ArrowRight') focusCell(r,c+1);
          else if (e.key === 'Backspace' && !e.target.value) moveToPreviousCell(r,c);
        });
        wrap.appendChild(input);
        crosswordState.cells[r][c] = input;
        if (numberMap[`${r}-${c}`]) {
          const num = document.createElement('span');
          num.className = 'cw-number';
          num.textContent = numberMap[`${r}-${c}`];
          wrap.appendChild(num);
        }
      } else {
        const block = document.createElement('div');
        block.className = 'cw-block';
        wrap.appendChild(block);
      }
      gridEl.appendChild(wrap);
    }
  }

  const info = document.createElement('div');
  info.className = 'note';
  info.style.marginBottom = '12px';
  info.textContent = `Grille : ${puzzle.title} — ${puzzle.size}x${puzzle.size}`;
  cluesEl.appendChild(info);

  ['across','down'].forEach(dir => {
    const title = dir === 'across' ? 'Horizontal' : 'Vertical';
    const group = document.createElement('div');
    group.className = 'clue-group';
    group.innerHTML = `<h3 style="margin-bottom:10px;">${title}</h3>`;
    puzzle.words.filter(w => w.dir === dir).sort((a,b) => a.number - b.number).forEach(w => {
      const div = document.createElement('div');
      div.className = 'clue-item';
      div.style.cursor = 'pointer';
      div.innerHTML = `<strong>${w.number}.</strong> ${w.clue} <span class="small">(${w.answer.length} lettres)</span>`;
      div.onclick = () => focusWord(puzzle.words.indexOf(w));
      group.appendChild(div);
    });
    cluesEl.appendChild(group);
  });
  focusWord(0);
}

function focusWord(index){
  const word = crosswordState.puzzle?.words[index];
  crosswordState.selectedWordIndex = index;
  if (word?.cells?.length) focusCell(word.cells[0].r, word.cells[0].c);
}
function focusCell(r,c){ const cell = crosswordState.cells?.[r]?.[c]; if (cell) { cell.focus(); cell.select(); } }
function moveToNextCell(r,c){
  const word = crosswordState.puzzle.words[crosswordState.selectedWordIndex];
  if (word) {
    const idx = word.cells.findIndex(pos => pos.r === r && pos.c === c);
    if (idx >= 0 && idx < word.cells.length - 1) { focusCell(word.cells[idx+1].r, word.cells[idx+1].c); return; }
  }
}
function moveToPreviousCell(r,c){
  for (let i=r;i>=0;i--) {
    for (let j=(i===r?c-1:crosswordState.cells[i].length-1); j>=0; j--) {
      if (crosswordState.cells[i][j]) { focusCell(i,j); return; }
    }
  }
}

function getCrosswordFilledCount(){
  const puzzle = crosswordState.puzzle;
  let total=0, filled=0;
  for (let r=0;r<puzzle.size;r++) for (let c=0;c<puzzle.size;c++) if (puzzle.solution[r][c]) { total++; if (crosswordState.cells[r][c]?.value) filled++; }
  return { total, filled };
}
function updateCrosswordProgress(){
  const puzzle = crosswordState.puzzle;
  if (!puzzle) return;
  const { total, filled } = getCrosswordFilledCount();
  const percent = total ? Math.round((filled / total) * 100) : 0;
  document.getElementById('cwProgressLabel').textContent = `${percent}%`;
  document.getElementById('cwProgressBar').style.width = `${percent}%`;
  document.getElementById('cwGridScore').textContent = crosswordState.score;
}
function clearCellStyles(){
  const puzzle = crosswordState.puzzle;
  if (!puzzle) return;
  for (let r=0;r<puzzle.size;r++) for (let c=0;c<puzzle.size;c++) { const cell = crosswordState.cells[r][c]; if (cell) cell.classList.remove('correct','wrong','hint','reveal'); }
}

async function checkCrossword(){
  const puzzle = crosswordState.puzzle;
  if (!puzzle) return;
  let wrong=0, complete=true;
  clearCellStyles();
  for (let r=0;r<puzzle.size;r++) for (let c=0;c<puzzle.size;c++) {
    const sol = puzzle.solution[r][c]; const cell = crosswordState.cells[r][c];
    if (sol && cell) {
      const val = sanitize(cell.value);
      if (!val) complete = false;
      if (val === sol) cell.classList.add('correct');
      else { if (val) cell.classList.add('wrong'); wrong++; complete = false; }
    }
  }
  if (complete && wrong === 0) {
    if (!crosswordState.solved) {
      crosswordState.solved = true;
      const bonus = 100 + Math.max(0, 60 - crosswordState.score);
      crosswordState.score += bonus;
      if (window.appState?.scores) {
        window.appState.scores.crossword += 1;
        window.appState.scores.total += crosswordState.score;
        saveScores();
      }
      await submitScore({ game:'crossword', score:crosswordState.score, category:document.getElementById('cwCategory').value, difficulty:document.getElementById('cwDifficulty').value, size:Number(document.getElementById('cwSize').value), title:puzzle.title });
    }
    document.getElementById('cwFeedback').innerHTML = `<span class="good">Bravo, grille terminée ! +${crosswordState.score} points</span>`;
    beep(700,0.12,'triangle',0.03);
  } else {
    document.getElementById('cwFeedback').innerHTML = `<span class="warnText">Il reste ${wrong} erreur(s) ou des cases vides.</span>`;
    beep(220,0.07,'square',0.015);
  }
  updateCrosswordProgress();
}

function giveLetterHint(){
  const puzzle = crosswordState.puzzle;
  if (!puzzle || crosswordState.solved) return;
  const empties = [];
  for (let r=0;r<puzzle.size;r++) for (let c=0;c<puzzle.size;c++) if (puzzle.solution[r][c] && sanitize(crosswordState.cells[r][c].value) !== puzzle.solution[r][c]) empties.push({r,c});
  if (!empties.length) return;
  const pick = empties[Math.floor(Math.random()*empties.length)];
  crosswordState.cells[pick.r][pick.c].value = puzzle.solution[pick.r][pick.c];
  crosswordState.cells[pick.r][pick.c].classList.add('hint');
  crosswordState.score = Math.max(0, crosswordState.score - 4);
  updateCrosswordProgress();
  beep(520,0.05,'sine',0.02);
}

function revealWord(){
  const puzzle = crosswordState.puzzle;
  if (!puzzle || crosswordState.solved) return;
  const remainingWords = puzzle.words.filter(w => w.cells.some(pos => sanitize(crosswordState.cells[pos.r][pos.c].value) !== puzzle.solution[pos.r][pos.c]));
  if (!remainingWords.length) return;
  const word = remainingWords[Math.floor(Math.random()*remainingWords.length)];
  word.cells.forEach(pos => {
    crosswordState.cells[pos.r][pos.c].value = puzzle.solution[pos.r][pos.c];
    crosswordState.cells[pos.r][pos.c].classList.add('reveal');
  });
  crosswordState.score = Math.max(0, crosswordState.score - 12);
  updateCrosswordProgress();
  beep(460,0.06,'sine',0.02);
}

function clearWrongCells(){
  const puzzle = crosswordState.puzzle;
  if (!puzzle) return;
  for (let r=0;r<puzzle.size;r++) for (let c=0;c<puzzle.size;c++) {
    const sol = puzzle.solution[r][c]; const cell = crosswordState.cells[r][c];
    if (sol && cell && cell.value && sanitize(cell.value) !== sol) cell.value = '';
    if (cell) cell.classList.remove('wrong');
  }
  updateCrosswordProgress();
}

function generateCrossword(){
  const category = document.getElementById('cwCategory').value;
  const difficulty = document.getElementById('cwDifficulty').value;
  const chosenSize = Number(document.getElementById('cwSize').value);
  const puzzle = pickPuzzle(category, difficulty, chosenSize);
  if (!puzzle) {
    document.getElementById('cwGrid').innerHTML = '';
    document.getElementById('cwClues').innerHTML = '';
    document.getElementById('cwFeedback').innerHTML = '<span class="bad">Aucune grille compatible.</span>';
    document.getElementById('cwProgressLabel').textContent = '0%';
    document.getElementById('cwProgressBar').style.width = '0%';
    document.getElementById('cwGridScore').textContent = '0';
    return;
  }
  crosswordState.puzzle = puzzle;
  crosswordState.cells = [];
  crosswordState.selectedWordIndex = 0;
  crosswordState.score = 0;
  crosswordState.solved = false;
  renderCrossword();
  updateCrosswordProgress();
  document.getElementById('cwFeedback').innerHTML = `<span class="good">Grille générée automatiquement 🔥</span>`;
}

document.addEventListener('DOMContentLoaded', () => { if (document.getElementById('cwGrid')) generateCrossword(); });
