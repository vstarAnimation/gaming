// Constants
const X = 'X';
const O = 'O';
let currentPlayer = X;
let board = Array(9).fill(null); // Represents the board with 9 cells (empty)
let gameActive = true; // Game state (active or over)

//Elements
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

// Function to handle cell click
function handleCellClick(event) {
    const index = event.target.getAttribute('data-cell-index');
    
    // Only process the click if the cell is empty and the game is active
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer; // Mark the cell
    event.target.textContent = currentPlayer; // Display X or O in the cell

    if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        gameActive = false; // End the game
    } else if (board.every(cell => cell)) {
        alert("It's a draw!");
        gameActive = false; // End the game if all cells are filled
    } else {
        // Switch player
        currentPlayer = currentPlayer === X ? O : X;
    }
}

// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check each winning combination
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Function to reset the game
function resetGame() {
    board = Array(9).fill(null); // Reset the board
    currentPlayer = X; // Set the starting player
    gameActive = true; // Activate the game
    cells.forEach(cell => cell.textContent = ''); // Clear the display
}

// Attach event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);