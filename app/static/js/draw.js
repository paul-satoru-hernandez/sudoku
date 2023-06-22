window.onload = async () => {
    const table = await getSudokuBoard();
    drawBoxes(table);
}

getSudokuBoard = async () => {
    const board = fetch(`/get-sudoku-board`, {
        method: 'POST'
    }).then(function(response) {
        return response.json();
    }).then(function(result) {
        return result;
    })
    return board;
}

drawBoxes = (board) => {
    main_grid = document.querySelector(".main-grid");
    for (var i=0; i<81; i++) {
        let cell = document.createElement('input');
        cell.classList = 'grid-cell'
        cell.dataset.index = i;
        if (board[i]) {
            cell.value = board[i];
            cell.readOnly = true;
            cell.classList.add("readonly");
        }
        main_grid.appendChild(cell);
    }
    initializeListeners();
}

initializeListeners = () => {
    let inputs = document.querySelectorAll(".grid-cell");
    inputs.forEach((input) => {
        input.addEventListener('input', verifyInput);
    })
}

function verifyInput() {
    if (isNaN(this.value)) {
        this.value = "";
    }
    if (this.value > 9) {
        this.value = this.value.substring(1);
    }
    if (this.value <= 0) {
        this.value = "";
    }
    checkBoard(this.dataset.index);
}

function checkBoard(index) {
    let row = Math.floor(index / 9);
    let col = index % 9;
    let box = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    let cells = document.querySelectorAll(".grid-cell");
    let check = false;
    for (var i=0; i<9; i++) {
        if (i != col) {
            if (cells[row * 9 + i].value == cells[index].value) {
                check = true
            }
        }
        if (i != row) {
            if (cells[col + i * 9].value == cells[index].value) {
                check = true;
            }
        }
        // console.log(i + box * 3);
    }
    if (check) {
        cells[index].classList.add('error');
    } else {
        cells[index].classList.remove('error')
    }
}
