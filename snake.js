class Snake {
    constructor(x, y, s) {
        this.x = x
        this.y = y
        this.s = s
        this.end = [{ x: this.x, y: this.y }]
        this.moveX = 0
        this.moveY = 1
    }

    move() {
        var diff;
        if (this.moveX == 1) {
            diff = {
                x: this.end[this.end.length - 1].x + this.s,
                y: this.end[this.end.length - 1].y
            }
        } else if (this.moveX == -1) {
            diff = {
                x: this.end[this.end.length - 1].x - this.s,
                y: this.end[this.end.length - 1].y
            }
        } else if (this.moveY == 1) {
            diff = {
                x: this.end[this.end.length - 1].x,
                y: this.end[this.end.length - 1].y + this.s
            }
        } else if (this.moveY == -1) {
            diff = {
                x: this.end[this.end.length - 1].x,
                y: this.end[this.end.length - 1].y - this.s
            }
        }

        this.end.shift()
        this.end.push(diff)

    }

}


class Apple {
    constructor() {
        var isTouching;

        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.s) * snake.s
            this.y = Math.floor(Math.random() * canvas.height / snake.s) * snake.s
            for (var i = 0; i < snake.end.length; i++) {
                if (this.x == snake.end[i].x && this.y == snake.end[i].y) {
                    isTouching = true
                }
            }
            this.s = snake.s
            this.color = "pink"
            
            
            if (!isTouching) {
                break;
            }
        }
    }
}


var canvas = document.getElementById("back")

var snake = new Snake(20, 20, 20);

var apple = new Apple();

var canvasContext = canvas.getContext('2d');


window.onload = () => {
    gameLoop();
}


function gameLoop() {
    setInterval(show, 1000 / 15) // here 15 is our fps value
}



function show() {
    update();
    draw();
}


function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    chomp()
    reappear();
}


function reappear(){
    var headTail = snake.end[snake.end.length - 1]
    if(headTail.x == -snake.s){
        headTail.x = canvas.width - snake.s
    } else if(headTail.x == canvas.width){
        headTail.x = 0
    } else if(headTail.y == -snake.s){
        headTail.y = canvas.height - snake.s
    } else if(headTail.y == canvas.height){
        headTail.y = 0
    } 
}



function chomp(){
    if(snake.end[snake.end.length - 1].x == apple.x &&
        snake.end[snake.end.length - 1].y == apple.y){
            snake.end[snake.end.length] = {x:apple.x, y: apple.y}
            apple = new Apple();
        }
}



function draw() {
    makeSquare(0, 0, canvas.width, canvas.height, "black")
    makeSquare(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < snake.end.length; i++) {
        makeSquare(snake.end[i].x + 2.5, snake.end[i].y + 2.5,
            snake.s - 5, snake.s - 5, 'white')
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: " + (snake.end.length - 1),
        canvas.width - 120, 18);
    makeSquare(apple.x, apple.y, apple.s, apple.s, apple.color)

}


function makeSquare(x, y, width, height, color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == 37 && snake.moveX != 1) {
            snake.moveX = -1
            snake.moveY = 0;
        } else if (event.keyCode == 38 && snake.moveY != 1) {
            snake.moveX = 0
            snake.moveY = -1;
        }else if (event.keyCode == 39 && snake.moveX != -1) {
            snake.moveX = 1
            snake.moveY = 0;
        } else if (event.keyCode == 40 && snake.moveY !=-1) {
            snake.moveX = 0
            snake.moveY = 1;
        }
    }, 1)


})