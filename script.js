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

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', playGame));
document.querySelector('#restartBtn').addEventListener('click', restartGame);


function playGame(cell) {
    console.log(cell.target);
    const clickedCell = cell.target;
    clickedCell.style.userSelect = "none";

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) { return }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    evalGame();
}

function evalGame() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningCondition[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
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

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    statusDisplay.innerHTML = currentPlayerTurn();
}

function restartGame() {
    gameActive = true;
    currentPlayer = playerX;
    gameState = ["", "", "", "", "", "", "", "", ""]
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}