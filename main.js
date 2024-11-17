import './style.css';

const braillePatterns = {
  'a': [1,0,0,0,0,0], 'b': [1,1,0,0,0,0],
  'c': [1,0,0,1,0,0], 'd': [1,0,0,1,1,0],
  'e': [1,0,0,0,1,0], 'f': [1,1,0,1,0,0],
  'g': [1,1,0,1,1,0], 'h': [1,1,0,0,1,0],
  'i': [0,1,0,1,0,0], 'j': [0,1,0,1,1,0],
  'k': [1,0,1,0,0,0], 'l': [1,1,1,0,0,0],
  'm': [1,0,1,1,0,0], 'n': [1,0,1,1,1,0],
  'o': [1,0,1,0,1,0], 'p': [1,1,1,1,0,0],
  'q': [1,1,1,1,1,0], 'r': [1,1,1,0,1,0],
  's': [0,1,1,1,0,0], 't': [0,1,1,1,1,0],
  'u': [1,0,1,0,0,1], 'v': [1,1,1,0,0,1],
  'w': [0,1,0,1,1,1], 'x': [1,0,1,1,0,1],
  'y': [1,0,1,1,1,1], 'z': [1,0,1,0,1,1]
};

class BrailleBrick {
  constructor() {
    this.container = document.getElementById('brick-container');
    this.input = document.getElementById('input-text');
    this.convertBtn = document.getElementById('convert');
    this.setupEventListeners();
    this.createBrick();
  }

  createBrick() {
    this.container.innerHTML = '';
    const brick = document.createElement('div');
    brick.className = 'brick';
    
    for (let i = 0; i < 6; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      brick.appendChild(dot);
    }
    
    this.container.appendChild(brick);
  }

  updateBrick(pattern) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', pattern[index] === 1);
    });
  }

  setupEventListeners() {
    this.convertBtn.addEventListener('click', () => {
      const letter = this.input.value.toLowerCase();
      if (braillePatterns[letter]) {
        this.updateBrick(braillePatterns[letter]);
      } else {
        this.updateBrick([0,0,0,0,0,0]);
        alert('Please enter a valid letter (a-z)');
      }
    });

    this.input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '');
    });
  }
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('ServiceWorker registered'))
      .catch(err => console.log('ServiceWorker registration failed:', err));
  });
}

new BrailleBrick();