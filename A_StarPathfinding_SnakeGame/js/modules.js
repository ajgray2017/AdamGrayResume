var drawModule = (function () {

    var bodySnake = function (x, y) {
        context.fillStyle = "white";
        context.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        context.strokeStyle = "black";
        context.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var drawSnake = function () {
        //todo randomize starting position
        var length = 1;
        snake = [];
        for (var i = length - 1; i >= 0; i--) {
            snake.push({
                x: i,
                y: 0
            });
        }
    }

    var drawObs = function (obs) {
        for (var i = 0; i < obs.length; i++) {
            context.fillStyle = "black";
            context.fillRect(obs[i][0] * snakeSize, obs[i][1] * snakeSize, snakeSize, snakeSize);

        }
    }

    var createObs = function () {
        //todo add boolean for switch, add i < ammount for ability to change difficulty, add catch so obs not created on top of snake
        for (var i = 0; i < slider.value; i++) {
            obs.push([Math.floor((Math.random() * (w / 10)) + 1), Math.floor((Math.random() * (h / 10)) + 1)])
        }
        console.log(obs);
    }

    var drawgoal = function (x, y) {
        context.fillStyle = "red";
        context.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var createGoal = function () {
        food = {
            x: Math.floor((Math.random() * (w / 10)) + 1),
            y: Math.floor((Math.random() * (h / 10)) + 1)
        }

        for (var i = 0; i > snake.length; i++) {
            if (food.x === snake[i].x && food.y === snake[i].y) {
                while (obs.includes([food.x, food.y])) {
                    food.x = Math.floor((Math.random() * (w / 10)) + 1);
                    food.y = Math.floor((Math.random() * (h / 10)) + 1);
                }
            }
        }
        console.log([food.x, food.y])
        console.log((obs.includes([food.x, food.y])))
    }

    var paint = function () {
        context.fillStyle = "darkgrey";
        context.fillRect(0, 0, w, h);
        context.strokeStyle = "black";
        context.strokeRect(0, 0, w, h);

        btn.setAttribute("disabled", true);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        if (direction == "right") {
            snakeX++;
        } else if (direction == "left") {
            snakeX--;
        } else if (direction == "up") {
            snakeY--;
        } else if (direction == "down") {
            snakeY++;
        }

        if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCol(snakeX, snakeY, snake)) {
            //restart game
            btn.removeAttribute("disabled", true);

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
        drawObs(obs);
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
        context.fillStyle = "blue";
        context.fillText(score_text, 145, h - 5);
    }

    var init = function () {
        direction = "down";
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