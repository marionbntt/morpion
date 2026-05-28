const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const currentPlayerSpan = document.getElementById('current-player');
const restartBtn = document.getElementById('restart-btn');

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartBtn.addEventListener('click', resetGame);

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== '' || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  const winnerCombo = checkWinner();

  if (winnerCombo) {
    gameOver = true;
    highlightWinner(winnerCombo);
    statusDiv.textContent = `Joueur ${currentPlayer} a gagné !`;
    return;
  }

  if (board.every(cell => cell !== '')) {
    gameOver = true;
    statusDiv.textContent = "Match nul !";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerSpan.textContent = currentPlayer;
}

function checkWinner() {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
}

function highlightWinner(combo) {
  combo.forEach(index => {
    cells[index].classList.add('winner');
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });

  statusDiv.innerHTML = 'Tour du joueur <span id="current-player">X</span>';
}
