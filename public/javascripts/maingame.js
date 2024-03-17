var score = 0;
var timer = 0;

var MainGame = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.getElementById("scoreboardcontainer"));
    }
}

function startGame() {
    document.getElementById("timer").style.display = "inline";
    document.getElementById("gameinfo").style.display = "inline";
    document.getElementById("startbutton").style.display = "none";
    MainGame.start();
}

function moveableObject(width, height, image, x, y, name) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedU = 0;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        //add update function
    }
}

window.addEventListener('load', ()=> {
    document.getElementById("startbutton").addEventListener('click', startGame);
});
