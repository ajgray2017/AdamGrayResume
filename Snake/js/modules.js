var drawModule = (function() {

    var bodySnake = function(x, y) {
        context.fillStyle = 'green';
        context.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        context.strokeStyle = 'darkgreen';
        context.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var pizza = function(x, y) {
        context.fillStyle = 'yellow';
        context.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        context.fillStyle = 'red';
        context.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    }

    var scoreText = function() {
        var score_text = "Score: " + score;
        context.fillStyle = 'blue';
        context.fillText(score_text, 145, h - 5);
    }

    var drawSnake = function() {
        var length = 4;
        snake = [];
        for (var i = length - 1; i >= 0; i--) {
            snake.push({ x: i, y: 0 });
        }
    }

    var paint = function() {
        context.fillStyle = 'lightgrey';
        context.fillRect(0, 0, w, h);
        context.strokeStyle = 'black';
        context.strokeRect(0, 0, w, h);

        btn.setAttribute('disabled', true);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        if (direction == 'right') {
            snakeX++;
        } else if (direction == 'left') {
            snakeX--;
        } else if (direction == 'up') {
            snakeY--;
        } else if (direction == 'down') {
            snakeY++;
        }

        if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
            //restart game
            btn.removeAttribute('disabled', true);

            context.clearRect(0, 0, w, h);
            gameloop = clearInterval(gameloop);
            return;
        }

        if (snakeX == food.x && snakeY == food.y) {
            var tail = { x: snakeX, y: snakeY };
            score++;

            createFood();
        } else {
            var tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }

        snake.unshift(tail);

        for (var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }

        pizza(food.x, food.y);
        scoreText();
    }

    var createFood = function() {
        food = {
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }

        for (var i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }

    var checkCollision = function(x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y)
                return true;
        }
        return false;
    }

    var init = function() {
        direction = 'down';
        drawSnake();
        createFood();
        gameloop = setInterval(paint, 80);
    }


    return {
        init: init
    };


}());