let memoryCards = [];
let memoryOpened = [];
let memoryMoves = 0;
let memoryPairs = 0;
let memoryLock = false;

// IMAGES (IMPORTANT)
const images = [
  "img/cards/card1.png",
  "img/cards/card2.png",
  "img/cards/card3.png",
  "img/cards/card4.png",
  "img/cards/card5.png",
  "img/cards/card6.png",
  "img/cards/card7.png",
  "img/cards/card8.png"
];

function initMemory() {
  memoryCards = [...images, ...images]
    .sort(() => Math.random() - 0.5)
    .map((img, i) => ({
      id: i,
      img: img,
      open: false,
      done: false
    }));

  memoryOpened = [];
  memoryMoves = 0;
  memoryPairs = 0;
  memoryLock = false;

  renderMemory();
}

function renderMemory() {
  const grid = document.getElementById("memoryGrid");
  if (!grid) return;

  grid.innerHTML = "";

  memoryCards.forEach(card => {
    const btn = document.createElement("button");
    btn.className = "btn secondary";
    btn.style.height = "110px";

    if (card.open || card.done) {
      btn.innerHTML = `<img src="${card.img}" class="memory-img">`;
    } else {
      btn.innerHTML = "❔";
    }

    btn.onclick = () => openMemoryCard(card.id);
    grid.appendChild(btn);
  });

  document.getElementById("memoryMoves").textContent = memoryMoves;
  document.getElementById("memoryPairs").textContent = memoryPairs;
}

async function openMemoryCard(id) {
  if (memoryLock) return;

  const card = memoryCards.find(c => c.id === id);
  if (!card || card.done || card.open) return;

  card.open = true;
  memoryOpened.push(card);
  renderMemory();

  if (memoryOpened.length === 2) {
    memoryMoves++;
    memoryLock = true;

    if (memoryOpened[0].img === memoryOpened[1].img) {
      memoryOpened.forEach(c => c.done = true);
      memoryPairs++;
      memoryOpened = [];
      memoryLock = false;

      renderMemory();

      if (memoryPairs === 8) {
        const score = Math.max(20, 180 - (memoryMoves * 8));

        appState.scores.memoryBest = Math.max(appState.scores.memoryBest || 0, score);
        appState.scores.total += 5;

        saveScores();

        await submitScore({
          game: "memory",
          score,
          category: "arcade",
          difficulty: "standard",
          size: 16,
          title: "Memory"
        });

        document.getElementById("memoryFeedback").innerHTML =
          `<span class="good">Partie terminée ! Score ${score}</span>`;
      }

    } else {
      setTimeout(() => {
        memoryOpened.forEach(c => c.open = false);
        memoryOpened = [];
        memoryLock = false;
        renderMemory();
      }, 700);
    }
  }
}

document.addEventListener("DOMContentLoaded", initMemory);
