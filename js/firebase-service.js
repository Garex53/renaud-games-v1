import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';

const STORAGE_KEY = 'renaudGamesLeaderboardLocal';

function readLocalScores() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function writeLocalScores(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function createLocalBackend() {
  return {
    mode: 'local',
    isReady: true,
    async saveScore(entry) {
      const all = readLocalScores();
      all.push({ ...entry, createdAt: new Date().toISOString() });
      all.sort((a, b) => (b.score || 0) - (a.score || 0));
      writeLocalScores(all.slice(0, 300));
      return true;
    },
    async getLeaderboard(game = 'crossword', filters = {}) {
      let all = readLocalScores().filter(item => item.game === game);
      if (filters.category) all = all.filter(item => item.category === filters.category);
      if (filters.difficulty) all = all.filter(item => item.difficulty === filters.difficulty);
      if (filters.size) all = all.filter(item => Number(item.size) === Number(filters.size));
      all.sort((a, b) => (b.score || 0) - (a.score || 0));
      return all.slice(0, 20);
    }
  };
}

function createFirebaseBackend(config) {
  const app = initializeApp(config);
  const db = getFirestore(app);
  const scoresRef = collection(db, 'leaderboard');

  return {
    mode: 'firebase',
    isReady: true,
    async saveScore(entry) {
      await addDoc(scoresRef, {
        ...entry,
        score: Number(entry.score) || 0,
        size: Number(entry.size) || null,
        createdAt: serverTimestamp()
      });
      return true;
    },
    async getLeaderboard(game = 'crossword') {
      const q = query(scoresRef, orderBy('score', 'desc'), limit(50));
      const snap = await getDocs(q);
      return snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.game === game)
        .slice(0, 20);
    }
  };
}

let backend;
try {
  if (window.RG_FIREBASE_CONFIG && window.RG_FIREBASE_CONFIG.projectId && !String(window.RG_FIREBASE_CONFIG.projectId).includes('ton-projet')) {
    backend = createFirebaseBackend(window.RG_FIREBASE_CONFIG);
  } else {
    backend = createLocalBackend();
  }
} catch (error) {
  console.error('Firebase init error', error);
  backend = createLocalBackend();
}

window.rgBackend = backend;
window.dispatchEvent(new CustomEvent('rg-backend-ready', { detail: { mode: backend.mode } }));
