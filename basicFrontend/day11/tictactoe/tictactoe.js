 
    const cells = document.querySelectorAll(".cell");
    const statusEl = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");

    // 3x3 board (row & column based)
    let board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    let currentPlayer = "X";
    let gameOver = false;

    function updateStatus(msg) {
      statusEl.innerHTML = msg;
    }

    function checkWinner() {
      // Check rows
      for (let r = 0; r < 3; r++) {
        if (board[r][0] && board[r][0] === board[r][1] && board[r][1] === board[r][2]) {
          return board[r][0];
        }
      }

      // Check columns
      for (let c = 0; c < 3; c++) {
        if (board[0][c] && board[0][c] === board[1][c] && board[1][c] === board[2][c]) {
          return board[0][c];
        }
      }

      // Check diagonals
      if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
      }
      if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
      }

      return null;
    }

    function isDraw() {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[r][c] === "") return false;
        }
      }
      return true;
    }
function handleCellClick(e) {
  if (gameOver) return;

  const cell = e.target;
  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);

  // already filled
  if (board[row][col] !== "") return;

  // ✅ IMPORTANT: update board first
  board[row][col] = currentPlayer;

  // update UI
  cell.textContent = currentPlayer;
  cell.classList.add("disabled");

  // check win
  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    updateStatus(`<b>${winner}</b> won the game ✅`);
    disableAllCells();
    return;
  }

  // check draw
  if (isDraw()) {
    gameOver = true;
    updateStatus(`It's a <b>Draw</b> 🤝`);
    return;
  }

  // switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`Player <b>${currentPlayer}</b>'s turn`);
}


    function disableAllCells() {
      cells.forEach(cell => cell.classList.add("disabled"));
    }

    function resetGame() {
      board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ];
      currentPlayer = "X";
      gameOver = false;

      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("disabled");
      });

      updateStatus(`Player <b>X</b>'s turn`);
    }

    // Attach events
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetBtn.addEventListener("click", resetGame);
  