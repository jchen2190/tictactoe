const playerX = 'x'
const playerO = 'circle'

const winCombination = [
    [0, 1, 2], // horizontal
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // vertical
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonal
    [2, 4, 6]
]

const cellSlot = document.querySelectorAll("data-cell");
const myBoard = document.getElementById('board');
const myMsg = document.getElementById('message');