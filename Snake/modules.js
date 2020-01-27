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

    var scoreText = function() {
        var score_text = "Score: " + score;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 145, h-5);
    }
}());
