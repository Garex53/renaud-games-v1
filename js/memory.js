let memoryCards = [];
let memoryOpened = [];
let memoryMoves = 0;
let memoryPairs = 0;
let memoryLock = false;

const images = [
  "img/cards/card_1.png",
  "img/cards/card_2.png",
  "img/cards/card_3.png",
  "img/cards/card_4.png",
  "img/cards/card_5.png",
  "img/cards/card_6.png",
  "img/cards/card_7.png",
  "img/cards/card_8.png"
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
    btn.style.padding = "0";
    btn.style.overflow = "hidden";

    if (card.open || card.done) {
      btn.innerHTML = `<img src="${card.img}" alt="carte" class="memory-img">`;
    } else {
      btn.innerHTML = "❔";
    }

    btn.onclick = () => openMemoryCard(card.id);
    grid.appendChild(btn);
  });

  const moves = document.getElementById("memoryMoves");
  const pairs = document.getElementById("memoryPairs");

  if (moves) moves.textContent = memoryMoves;
  if (pairs) pairs.textContent = memoryPairs;
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

        if (window.appState?.scores) {
          appState.scores.memoryBest = Math.max(appState.scores.memoryBest || 0, score);
          appState.scores.total += 5;
          if (typeof saveScores === "function") saveScores();
        }

        if (typeof submitScore === "function") {
          await submitScore({
            game: "memory",
            score,
            category: "arcade",
            difficulty: "standard",
            size: 16,
            title: "Memory"
          });
        }

        const feedback = document.getElementById("memoryFeedback");
        if (feedback) {
          feedback.innerHTML = `<span class="good">Partie terminée ! Score ${score}</span>`;
        }
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
