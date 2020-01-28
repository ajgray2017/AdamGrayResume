var drawModule = (function () {

    var bodySnake = function (x, y) {
        context.fillStyle = 'white';
        context.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        context.strokeStyle = 'black';
        context.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var drawSnake = function () {
        var length = 4;
        snake = [];
        for (var i = length - 1; i >= 0; i--) {
            snake.push({
                x: i,
                y: 0
            });
        }
    }

    var drawObs = function (x, y) {
        context.fillStyle = 'black';
        context.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var createObs = function () {
        //todo add boolean for switch, add i < ammount for ability to change difficulty 
        for(var i = 0; i < 100; i++){
            drawObs(Math.floor((Math.random() * 60) + 1), Math.floor((Math.random() * 60) + 1))
        }
    }

    var drawgoal = function (x, y) {
        context.fillStyle = 'red';
        context.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var createGoal = function () {
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

    var paint = function () {
        context.fillStyle = 'darkgrey';
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

        if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCol(snakeX, snakeY, snake)) {
            //restart game
            btn.removeAttribute('disabled', true);

            context.clearRect(0, 0, w, h);
            gameloop = clearInterval(gameloop);
            return;
        }

        if (snakeX == food.x && snakeY == food.y) {
            var tail = {
                x: snakeX,
                y: snakeY
            };
            score++;

            createGoal();
        } else {
            var tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }

        snake.unshift(tail);

        for (var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }

        drawgoal(food.x, food.y);
        scoreText();
    }

    var checkCol = function (x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y)
                return true;
        }
        return false;
    }

    var scoreText = function () {
        var score_text = "Score: " + score;
        context.fillStyle = 'blue';
        context.fillText(score_text, 145, h - 5);
    }

    var init = function () {
        direction = 'down';
        drawSnake();
        obs = [];
        score = 0;
        createObs();
        createGoal();
        gameloop = setInterval(paint, 80);
    }


    return {
        init: init
    };


}());