const winningCondition = [
    [0, 1, 2], // horizontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // vertical
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonal
    [2, 4, 6]
]

let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let playerX = "<span style='color:blue'>X</span>";
let playerO = "<span style='color:red'>O</span>";
let currentPlayer = playerX;

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game has ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const statusDisplay = document.getElementById("gameStatus");
statusDisplay.innerHTML = currentPlayerTurn();

// buttons
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', playGame));
document.querySelector('#restartBtn').addEventListener('click', restartGame);


function playGame(cell) {
    console.log(cell.target);
    const clickedCell = cell.target;
    clickedCell.style.userSelect = "none"; // prevent highlighting 'X' or 'O'

    // get data-index: "0" and turn into string
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index')); // 0 1 2....

    // if the box is not empty or game has ended => don't fill X or O
    if (gameState[clickedCellIndex] !== "" || !gameActive) { return }
    
    gameState[clickedCellIndex] = currentPlayer; // assign letter to player
    clickedCell.innerHTML = currentPlayer;
    
    evalGame(); // check winning condition
}

function evalGame() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningCondition[i]; // ex. [1, 4, 7]
        let a = gameState[winCondition[0]]; // ex. check if currentPlayer has 1
        let b = gameState[winCondition[1]]; // ex. check if currentPlayer has 4
        let c = gameState[winCondition[2]]; // ex. check if currentPlayer has 7
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes(""); // true when all is filled
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === playerX ? playerO : playerX; // change player;
    statusDisplay.innerHTML = currentPlayerTurn();
}

function restartGame() {
    // reset everything
    gameActive = true;
    currentPlayer = playerX;
    gameState = ["", "", "", "", "", "", "", "", ""]
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}