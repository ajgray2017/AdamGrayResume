var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var slider = document.getElementById("obRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value
var snakeSize = 10;
var w = 650;
var h = 500;
var score = 0;
var obs = [];
var snake;
var snakeSize = 10;
var food;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
  }