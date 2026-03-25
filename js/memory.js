let memoryCards = [],
    memoryOpened = [],
    memoryMoves = 0,
    memoryPairs = 0,
    memoryLock = false;

function initMemory(){

  const images = [
    "img/memory/1.png",
    "img/memory/2.png",
    "img/memory/3.png",
    "img/memory/4.png",
    "img/memory/5.png",
    "img/memory/6.png",
    "img/memory/7.png",
    "img/memory/8.png"
  ];

  memoryCards = [...images, ...images]
    .sort(() => Math.random() - 0.5)
    .map((img, i) => ({
      id: i,
      symbol: img,
      open: false,
      done: false
    }));

  memoryOpened = [];
  memoryMoves = 0;
  memoryPairs = 0;
  memoryLock = false;

  renderMemory();
}

function renderMemory(){
  const grid = document.getElementById('memoryGrid');
  if(!grid) return;

  grid.innerHTML = '';

  memoryCards.forEach(card => {

    const btn = document.createElement('button');
    btn.className = 'btn secondary';
    btn.style.height = '82px';
    btn.style.borderRadius = '18px';
    btn.style.padding = '0';
    btn.style.overflow = 'hidden';

    if(card.open || card.done){
      btn.innerHTML = `<img src="${card.symbol}" class="memory-img">`;
    } else {
      btn.textContent = '❔';
    }

    btn.onclick = () => openMemoryCard(card.id);
    grid.appendChild(btn);
  });

  const moves = document.getElementById('memoryMoves');
  const pairs = document.getElementById('memoryPairs');

  if(moves) moves.textContent = memoryMoves;
  if(pairs) pairs.textContent = memoryPairs;
}

async function openMemoryCard(id){

  if(memoryLock) return;

  const card = memoryCards.find(c => c.id === id);
  if(!card || card.done || card.open) return;

  card.open = true;
  memoryOpened.push(card);

  renderMemory();

  if(memoryOpened.length === 2){

    memoryMoves++;
    memoryLock = true;

    if(memoryOpened[0].symbol === memoryOpened[1].symbol){

      memoryOpened.forEach(c => c.done = true);
      memoryPairs++;
      memoryOpened = [];
      memoryLock = false;

      beep(620, 0.06, 'triangle', 0.024);
      renderMemory();

      if(memoryPairs === 8){

        const score = Math.max(20, 180 - (memoryMoves * 8));

        appState.scores.memoryBest = Math.max(appState.scores.memoryBest || 0, score);
        appState.scores.total += 5;

        saveScores();

        await submitScore({
          game: 'memory',
          score,
          category: 'arcade',
          difficulty: 'standard',
          size: 16,
          title: 'Memory'
        });

        const feedback = document.getElementById('memoryFeedback');
        if(feedback){
          feedback.innerHTML = `<span class="good">Partie terminée ! Score ${score}</span>`;
        }
      }

    } else {

      setTimeout(() => {
        memoryOpened.forEach(c => c.open = false);
        memoryOpened = [];
        memoryLock = false;
        renderMemory();
      }, 650);
    }
  }
}

document.addEventListener('DOMContentLoaded', initMemory);
