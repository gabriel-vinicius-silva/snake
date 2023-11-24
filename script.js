document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const scoreElement = document.getElementById('score-value');
    const resetButton = document.getElementById('reset-button');
    const upButton = document.getElementById('up-button');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    const downButton = document.getElementById('down-button');

    const gridSize = 15; // Reduzi o tamanho do grid para ficar mais proporcional
    const snakeSize = 20;
    let snake = [{ x: 0, y: 0 }];
    let food = generateFood();
    let score = 0;

    function generateFood() {
        let x, y;
        do {
            x = Math.floor(Math.random() * gridSize) * snakeSize;
            y = Math.floor(Math.random() * gridSize) * snakeSize;
        } while (snake.some(segment => segment.x === x && segment.y === y)); // Garante que a fruta não apareça na cobra

        return { x, y };
    }

    function draw() {
        // Limpa o tabuleiro
        board.innerHTML = '';

        // Desenha a cobra
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.style.left = `${segment.x}px`;
            snakeElement.style.top = `${segment.y}px`;
            snakeElement.classList.add('snake');
            board.appendChild(snakeElement);
        });

        // Desenha a comida
        const foodElement = document.createElement('div');
        foodElement.style.left = `${food.x}px`;
        foodElement.style.top = `${food.y}px`;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

        // Atualiza a pontuação
        scoreElement.textContent = score;
    }

    function update() {
        // Atualiza a posição da cobra
        const head = { ...snake[0] };
        switch (direction) {
            case 'UP':
                head.y -= snakeSize;
                break;
            case 'DOWN':
                head.y += snakeSize;
                break;
            case 'LEFT':
                head.x -= snakeSize;
                break;
            case 'RIGHT':
                head.x += snakeSize;
                break;
        }

        // Verifica colisões
        if (head.x < 0 || head.x >= gridSize * snakeSize || head.y < 0 || head.y >= gridSize * snakeSize) {
            alert('Game Over! Pontuação: ' + score);
            resetGame();
            return;
        }

        // Verifica se a cobra comeu a comida
        if (head.x === food.x && head.y === food.y) {
            snake.unshift(food);
            food = generateFood();
            score += 10; // Incrementa a pontuação ao comer a comida
        } else {
            // Move a cobra
            snake.pop();
            snake.unshift(head);
        }

        // Desenha o tabuleiro
        draw();
    }

    function resetGame() {
        snake = [{ x: 0, y: 0 }];
        food = generateFood();
        direction = 'RIGHT';
        score = 0; // Zera a pontuação ao reiniciar o jogo
        draw();
    }

    let direction = 'RIGHT';

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                direction = 'UP';
                break;
            case 'ArrowDown':
                direction = 'DOWN';
                break;
            case 'ArrowLeft':
                direction = 'LEFT';
                break;
            case 'ArrowRight':
                direction = 'RIGHT';
                break;
        }
    });

    upButton.addEventListener('click', () => direction = 'UP');
    leftButton.addEventListener('click', () => direction = 'LEFT');
    rightButton.addEventListener('click', () => direction = 'RIGHT');
    downButton.addEventListener('click', () => direction = 'DOWN');

    resetButton.addEventListener('click', resetGame);

    setInterval(update, 150);
    draw();
});
