var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var balls = new Array();
var speed;
var angle;
var radians;
var radius;
var vx = Math.cos(radians) * speed;
var vy = Math.sin(radians) * speed;
var p1;
var pos;
var gravity = .1;
var elasticity = .6;
var friction = .01;

// Generate a ball.
function genBall(evt) {

  pos = getCursorPos(canvas, evt);

  // Set and generate some ball's properties.
  p1 = {x:pos.x,y:pos.y};
  speed = 10 - Math.floor((Math.random() * 4) + 1);
  angle = 360 - Math.floor((Math.random() * 50) + 1);
  radians = angle * Math.PI/ 180;
  radius = 5;
  vx = Math.cos(radians) * speed;
  vy = Math.sin(radians) * speed;

  // Create the ball object, containing its properties and draw function.
  var ball = {
    x: p1.x,
    y: p1.y,
    velocityx: vx,
    velocityy: vy,
    radius: radius,
    draw: function() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      context.closePath();
      context.fillStyle = "blue";
      context.fill();
    }
  };

  // Add the ball to the array of balls.
  balls.push(ball);
}

// The draw loop.
function draw() {

  // Set the canvas size and clear it.
  context.canvas.width  = window.innerWidth - 8;
  context.canvas.height = window.innerHeight - 8;
  context.clearRect(0,0, canvas.width, canvas.height);

  var ball;
  // Iterate the array of balls.
  for (var i = 0; i <balls.length; i++) {
    ball = balls[i];

    // Ball's new position.
    ball.y += ball.velocityy;
    ball.x += ball.velocityx;

    // Calculate the velocity, taking in account the friction and gravity.
    ball.velocityx = ball.velocityx - (ball.velocityx * friction);
    ball.velocityy += gravity;

    // Make the ball bounce on the bottom of the canvas.
    if ((ball.y + ball.radius) > canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.velocityy = - (ball.velocityy) * elasticity;
    }
    // Make the ball bounce on the right hand side of the canvas.
    if ((ball.x + ball.radius) > canvas.width) {
      ball.x = canvas.width - ball.radius;
      ball.velocityx = - (ball.velocityx) * elasticity;
    }

    ball.draw();
  }

  requestAnimationFrame(draw);
}

// Get the cursror's position.
function getCursorPos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener('click', function(evt){
  genBall(evt);
});

window.addEventListener('load', function(evt){
  requestAnimationFrame(draw);
});
