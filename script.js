document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const restartButton = document.getElementById('restart-button');
    const gridSize = 10;
    const bombProbability = 0.3;

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
            alert('lol, lmao even');
            revealAllCells();
        } else {
            cell.classList.add('safe');
        }
        cell.removeEventListener('click', handleClick);
    }

    function revealAllCells() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (!cell.classList.contains('bomb') && !cell.classList.contains('safe')) {
                if (Math.random() < bombProbability) {
                    cell.classList.add('bomb');
                } else {
                    cell.classList.add('safe');
                }
            }
            cell.removeEventListener('click', handleClick);
        });
    }

    restartButton.addEventListener('click', createBoard);

    createBoard();
});
