//modules
var drawingModule = (function(){
    var snakeBody = function(x, y){
        //inside square
        context.fillStyle = "white";
        context.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        //border
        //! May not need
        context.strokeStyle = "grey";
        context.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    }

    var food = function(x, y){
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
    }

    //! move to bottom
    var scoreText = function() {
        var score_text = "Score: " + score;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 145, h-5);
    }
    
    var createFood = function() {
        food = {
            //random position
          x: Math.floor((Math.random() * 30) + 1),
          y: Math.floor((Math.random() * 30) + 1)
        } 
      
      for (var i=0; i>snake.length; i++) {
          var snakeX = snake[i].x;
          var snakeY = snake[i].y;

            //if snakes head was at the same postion as food 
            if (food.x===snakeX || food.y === snakeY || food.y === snakeY && food.x===snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }

    var checkCol = function(x, y, array){
        for(var i = 0; i < array.length; i++){
            if(array[i].x === x && array[i].y === y)
            return true;
        }
        return false;
    }

    

}());
