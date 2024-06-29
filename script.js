document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const restartButton = document.getElementById('restart-button');
    const safeColorInput = document.getElementById('safe-color');
    const bombColorInput = document.getElementById('bomb-color');
    const winCounterDisplay = document.getElementById('win-counter');
    const gridSize = 20;
    const bombProbability = 0.3; 
    let winCounter = 0;

    function updateWinCounter() {
        winCounterDisplay.textContent = `Wins: ${winCounter}`;
    }

    function createBoard() {
        gameContainer.innerHTML = '';
        gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', handleClick);
            gameContainer.appendChild(cell);
        }
    }

    function handleClick(event) {
        const cell = event.target;
        if (Math.random() < bombProbability) {
            cell.classList.add('bomb');
            cell.style.backgroundColor = bombColorInput.value;
            alert('blows your mind');
            revealAllCells();
        } else {
            cell.classList.add('safe');
            cell.style.backgroundColor = safeColorInput.value;
            checkWinCondition();
        }
        cell.removeEventListener('click', handleClick);
    }

    function revealAllCells() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (!cell.classList.contains('bomb') && !cell.classList.contains('safe')) {
                if (Math.random() < bombProbability) {
                    cell.classList.add('bomb');
                    cell.style.backgroundColor = bombColorInput.value;
                } else {
                    cell.classList.add('safe');
                    cell.style.backgroundColor = safeColorInput.value;
                }
            }
            cell.removeEventListener('click', handleClick);
        });
    }

    function checkWinCondition() {
        const cells = document.querySelectorAll('.cell');
        const allSafe = Array.from(cells).every(cell => 
            cell.classList.contains('safe') || 
            (cell.classList.contains('bomb') && cell.style.backgroundColor === bombColorInput.value)
        );

        if (allSafe) {
            alert('wtf you actually did');
            winCounter++;
            updateWinCounter();
        }
    }

    restartButton.addEventListener('click', createBoard);

    createBoard();
    updateWinCounter();
});
