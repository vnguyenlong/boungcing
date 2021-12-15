let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function random(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}
random(1, 10);

class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    Ball() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        this.arc(this.x, this.y, this.size, 0., 2 * Math.PI);
        ctx.fill();
    }
    Star() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(108, 0.0);
        ctx.lineTo(141, 70);
        ctx.lineTo(218, 78.3);
        ctx.lineTo(162, 131);
        ctx.lineTo(175, 205);
        ctx.lineTo(108, 170);
        ctx.lineTo(41.2, 205);
        ctx.lineTo(55, 131);
        ctx.lineTo(1, 78);
        ctx.lineTo(75, 68);
        ctx.lineTo(108, 0);
        ctx.closePath();
        ctx.fill();
    }
    Square() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.lineWidth = "4"
        ctx.rect(30, 30, 50, 50);
        ctx.stroke();
        ctx.fill();
    }
}
var testBall = new Ball(50, 100, 4, 4, '#bada55', 10);
testBall.x
testBall.size
testBall.color
testBall.Ball()
testBall.Star()
testBall.Square()

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velY = -(this.velX);
    }
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
}
Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx * dy * dy);
            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 225) + ',' + random(0, 225) + ',' + random(0, 255) + ',';
            }
        }
    }
}
var balls = [];

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    while (ball.length < 25) {
        var ball = new Ball(
            random(0, height),
            random(0, width),
            random(-7, 7),
            random(-7, 7),
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 225) + ')',
            random(5, 10)
        );
        balls.push(ball);
    }
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
}
loop();