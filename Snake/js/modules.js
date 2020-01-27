//modules
var drawingModule = (function() {
    var snakeBody = function(x, y) {
        //inside square
        context.fillStyle = "white";
        context.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
        //border
        //! May not need
        context.strokeStyle = "grey";
        context.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    }

    var foodcolor = function(x, y) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
    }

    //! move to bottom
    var scoreText = function() {
        var score_text = "Score: " + score;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 145, h - 5);
    }

    var createFood = function() {
        food = {
            //random position
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }

        for (var i = 0; i > snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;

            //if snakes head was at the same postion as food 
            if (food.x === snakeX || food.y === snakeY || food.y === snakeY && food.x === snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }

    var checkCol = function(x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x === x && array[i].y === y)
                return true;
        }
        return false;
    }

    var painting = function() {
        //movement color
        context.fillStyle = "lightgrey";
        context.fillRect(0, 0, width, height);

        context.strokeStyle = "black";
        context.strokeRect(0, 0, width, height);

        //disabling start button once game has started 
        sbtn.setAttribute("disabled", true);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        //movement controls
        if (direction == "r") {
            snakeX++;
        } else if (direction == "l") {
            snakeX--;
        } else if (direction == "u") {
            snakeY++;
        } else if (direction == "d") {
            snakeY--;
        }

        //game ending checks
        if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || check_col(snakeX, snakeY, snake)) {

            //send back to start menu
            //TODO start menu, with more than start
            btn.removeAttribute('disabled', true);

            //clean up
            context.clearRect(0, 0, w, h);
            gameloop = clearInterval(gameloop);
            return;
        }

        if (snakeX == food.x && snakeY == food.y) {
            //add to the tail
            var tail = {
                x: snakeX,
                y: snakeY
            };
            score++;

            //more food
            createFood();
        } else {

            var tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }

        //! why?
        snake.unshift(tail);

        for (var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }

        //! bad function name
        foodcolor(food.x, food.y);

        //Put the score text.
        scoreText();
    }

    var init = function() {
        direction = 'down';
        drawSnake();
        createFood();
        gameloop = setInterval(painting, 80);
    }

    return {
        init: init
    };



}());