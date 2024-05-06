
let intervalId; //for timer resets

var score = 0;
var mouseStart = false; //checks mouse movement
var cpsStart = false;
var myListener; //for mouse movement checker
var myListenerz;
var cpsListener; //for mouse clicks
let numbIndex;
var scoreLevel = 1;
var lives = 0
var attempt = 0
var gamemode = ''

//is the array for the randomization. if you want to add a game to the randomization cycle, add it to the array like so
//ALSO DO NOT ADD UNIQUE PASSED PARAMETERS TO A FUNCTION!!!!!!! DEFINE THEM WITHIN THAT FUNCTION OR THIS WON'T WORK!!!!
let gameArray = [
    { func: textboxGame, params: [] },
    { func: mouseMoveGame, params: [] },
    { func: clickableGame, params: []},
    { func: cpsGame, params: []},
    { func: wasdGame, params: []},
    { func: clickImageGame, params: [] },
    {func: colorGame, params: []},
    {func: guessGame, params: []}
];



function startGame(lives) {
    console.log(gamemode);
    if(lives == 0){
        gameover(timerElement, gameinfoElement);
        }
    hide(document.getElementById("startbutton"));
    hide(document.getElementById("start3button"));
    hide(document.getElementById("homebutton"));
    hide(document.getElementById("failbutton"));
    hide(document.getElementById("info"));
    document.getElementById("score").innerHTML = "Score: " + score; // Displays Score at 0 for start
    document.getElementById("lives").innerHTML = "Lives: " + lives; // Displays Score at 0 for start
    clearInterval(intervalId); // Clear any existing timer
    var timer = 5; //makes every game's timer set to 5, set up here because the timer got funky at the time when going through a bunch
    //of random games. Might be fixed by now? Either way, it needs to be dealt with at some point...
    var first = true; //needed for bug fixes!
    var cpsnumber = 0;
    document.removeEventListener('click', cpsListener, false); // Remove listener when game ends
    var timerAppear = true; //is used to activate game functions when the timer starts and not during the waiting period between games
    if(score == 12) {
        scoreLevel = 2;
    }
    else if(score == 25) {
        scoreLevel = 3;
    }
    else if(score == 45) {
        scoreLevel = 4;
    }
    document.getElementById("timer").style.display = "inline";  
    document.getElementById("gameinfo").style.display = "inline";
    document.getElementById("startbutton").style.display = "none";
    var timerElement = document.getElementById("timer");
    var gameinfoElement = document.getElementById("gameinfo");
        let gameArrayIndex = Math.floor(Math.random() * gameArray.length); //randomizes games
        let chosenGame = gameArray[gameArrayIndex]; //chooses random game
        chosenGame.params = [timerElement, gameinfoElement, timer, first, timerAppear, scoreLevel, lives]; //sets the parameters
        chosenGame.func(...chosenGame.params); // starts the random game
    


//     textboxGame(timerElement, gameinfoElement);
//    // mouseMoveGame(timerElement, gameinfoElement)
// clickImageGame(timerElement, gameinfoElement, timer, first, timerAppear, scoreLevel, lives);

    

}

function textboxGame(timerElement, gameinfoElement, timer, first, timerAppear, scoreLevel, lives){
    var textInputElement = document.getElementById("textInput");
    const usedWord = [
        "transition", "season", "admission", "monarch", "resource", "straight", "stable", 
        "stadium", "prospect", "economics", "reality", "transaction", "compartment", "publicity", "insert", 
        "suspicion", "lonely", "missile", "threaten", "barrier", "departure", "conference", 
        "voyage", "audience", "wriggle", "modernize", "facility", "handicap", "computer", 
        "keyboard", "monitor", "software", "hardware", "network", "internet", "database", 
        "algorithm", "function", "variable", "constant", "parameter", "argument", "operator", 
        "expression", "statement", "semicolon", "surprise", "cabinet", "mountain", "captain", 
        "history", "business", "medicine", "daughter", "absorption", "language", "sentence", 
        "competence", "laughter", "umbrella", "elephant", "triangle", "backpack", "reservoir", 
        "diamond", "keyboard", "notebook", "excavate", "rainbow", "umbrella", "vampire", 
        "whisper", "zeppelin", "absolute", "birthday", "calendar", "champagne", "elephant", 
        "favorite", "grammar", "harmony", "insight", "justice", "kitchen", "fascinate", 
        "meditate", "narrate", "occasion", "passion", "question", "radiator", "solution", 
        "wisecrack", "salesperson", "looting", "spectrum", "concert"
    ];
    let wordIndex = Math.floor(Math.random() * usedWord.length); //randomizes games
let chosenWord = usedWord[wordIndex]; //chooses random game

if(scoreLevel == 2){
                       chosenWord = chosenWord.toLowerCase().split('').map(function(c){
                            return Math.random() < .5? c : c.toUpperCase();
                            }).join(''); }

if(scoreLevel == 3){
    chosenWord = chosenWord.toLowerCase().split('').map(function(c){
        return Math.random() < .5? c : c.toUpperCase();
        }).join(''); 
    timer = 4;
}
if(scoreLevel == 4){
    chosenWord = chosenWord.toLowerCase().split('').map(function(c){
        return Math.random() < .5? c : c.toUpperCase();
        }).join(''); 
    timer = 3;
}


    gameinfoElement.textContent = "Match this word exactly: " + chosenWord;
    textboxclear(textInputElement) //clears textbox

    //myInt is where the timer starts and everything in that function will load when the timer loads a second in.

    var myInt = setInterval(function () {
        if(timerAppear === true) //starts the game's functionality
        {
            display(textInputElement) //displays text box
            timerAppear = false;
        }
        timerElement.textContent = timer;
        timer = timer - 1;
        //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0
        if(timer === -1)
        {
            timerElement.textContent = "FAIL";
            clearInterval(myInt); //stops timer
            hide(textInputElement) //hides textbox
            if(lives == 1){
                lives = lives - 1;
                updateLives();
            gameover(timerElement, gameinfoElement);
            }
            else{
                lives = lives - 1;
                updateLives();
                startGame(lives)
            }
        }
           // TEXT MATCHING GAME:
           document.getElementById("textInput").addEventListener("input", function(event) {
            const inputText = event.target.value; // Get the value of the input
            if (inputText === chosenWord && timerElement.textContent != "FAIL") {
                timerElement.textContent = "You did it!";
                clearInterval(myInt); //stops timer
                if(first == true)
                {
               updateScore();
               first = false;
               hide(textInputElement) //hides textbox
               startGame(lives);
                }
                // make it jump to the random minigame function when it is developed
            }
        });
    }, 1000);
}

function mouseMoveGame(timerElement, gameinfoElement, timer, first, timerAppear, scoreLevel, lives){
    var newTimer = 0 ;
    var tStart = false;
    mouseStart = true;
    myListener = function () { //activates if mousemovement is detected
        document.removeEventListener('mousemove', myListener, false);
        if (mouseStart === true){ 
            timerElement.textContent = "FAIL";
            clearInterval(myIntM); 
            if(lives == 1){
                lives = lives - 1;
                updateLives();
                gameover(timerElement, gameinfoElement);
                }
                else{
                    lives = lives - 1;
                    updateLives();
                    startGame(lives)
                }

        }
    };
    if(scoreLevel == 1)
    {
        do{
        newTimer = Math.floor(Math.random() * 5) + 1; //randomizes games
        }while(newTimer < 3) //3-5
        gameinfoElement.textContent = "Don't move the mouse!";
        timer = newTimer;
        tStart = true;
    }
    else if(scoreLevel == 2)
    {
        do{
            newTimer = Math.floor(Math.random() * 4) + 1; //randomizes games
            }while(newTimer < 2) //2-4
            gameinfoElement.textContent = "Don't move the mouse!";
            timer = newTimer;
            tStart = true;
    }

    else if(scoreLevel == 3)
    {
        do{
            newTimer = Math.floor(Math.random() * 2) + 1; //randomizes games
            }while(newTimer < 1) //1-2
            if(score % 2 === 0) { 
                timer = newTimer;
                gameinfoElement.textContent = "Move the mouse!";
                document.removeEventListener('mousemove', myListener, false);
                clearInterval(myIntM); //stops timer
                mouseStart = false;
                mouseMove2Game(timerElement, timer, first, timerAppear, lives, gameinfoElement)
            }
            else{
            gameinfoElement.textContent = "Don't move the mouse!";
            timer = newTimer;
            tStart = true;
            }
    }

    else if(scoreLevel == 4)
    {
            if(score % 2 === 0) {
                gameinfoElement.textContent = "Move the mouse!";
                timer = 1 
                document.removeEventListener('mousemove', myListener, false);
                clearInterval(myIntM); //stops timer
                mouseStart = false;
                mouseMove2Game(timerElement, timer, first, timerAppear)
            }
            else{
            gameinfoElement.textContent = "Don't move the mouse!";
            timer = 1;
            tStart = true;
            }
    }

if(tStart === true) {
    var myIntM = setInterval(function () {
        if(timerAppear === true)
        {
            timerAppear = false;
            document.addEventListener('mousemove', myListener, false); //actually starts the mousetracker
        }
        timerElement.textContent = timer;
        timer = timer - 1;
        //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0
        if(timer === -1)
        {
            mouseStart = false;
            timerElement.textContent = "You did it!";
            document.removeEventListener('mousemove', myListener, false); // Remove listener when game ends
            clearInterval(myIntM);  //clears timer
            if(first == true)
            {
           updateScore();
           first = false;
           startGame(lives);
            }
        }
        
    }, 1000);
}
}


    //CLICK ELEMENTS GAME
    function clickableGame(timerElement, gameinfoElement, timer, first, timerAppear, scoreLevel, lives) {
        gameinfoElement.textContent = "Click the boxes!";
        boxN = 6;
        timer = 5;
        if(scoreLevel === 2){
            boxN = 8;
            //boxN is the number of boxes
        }
        if(scoreLevel === 3){
            boxN = 7;
            //boxN is the number of boxes
            timer = 4
        }

        if(scoreLevel === 4){
            boxN = 11;
            //boxN is the number of boxes
            timer = 5
        }

        clicked = 0;
        maxClicked = boxN;
        let clickablesContainer = document.getElementById("clickables-container");
        clickablesContainer.style.display = "block";
        const clickableWidth = 50;
        const clickableHeight = 50;
        const maxWidth = 400 - clickableWidth;
        const maxHeight = 400 - clickableHeight;
            var myInt = setInterval(function () {
                if(timerAppear === true) //starts the game's functionality
                {
                    for(let i = 0; i < boxN; i++) {
                        let clickable = document.createElement("clickable");
                        newX = Math.floor(Math.random() * maxWidth);
                        newY = Math.floor(Math.random() * maxHeight);
                        clickable.style.top = newY.toString() + "px";
                        clickable.style.left = newX.toString() + "px";
                        clickable.style.cursor = "pointer";
                        clickable.addEventListener('click', () => {
                            clickable.style.display = "none";
                            clicked += 1;
                            console.log("Clicked!");
                        }, {once: true});
                        clickablesContainer.appendChild(clickable);}
                    timerAppear = false;
                }
                timerElement.textContent = timer;
                timer = timer - 1;
                console.log("Tick");
                //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0
                if(timer === -1 && clicked != maxClicked)
                {
                    timerElement.textContent = "FAIL";
                    clearInterval(myInt); //stops timer
                    hide(clickablesContainer);
                    if(lives == 1){
                        lives = lives - 1;
                        updateLives();
                        clickablesContainer.innerHTML = "";
                        gameover(timerElement, gameinfoElement);
                        }
                        else{
                            clickablesContainer.innerHTML = "";
                            lives = lives - 1;
                            updateLives();
                            startGame(lives)
                        }
                }

                if(clicked == maxClicked)
                {
                    timerElement.textContent = "You did it!";
                    clickablesContainer.innerHTML = "";
                    clearInterval(myInt); //stops timer
                    hide(clickablesContainer);
                    if(first == true)
                    {
                   updateScore();
                   first = false;
                    }
                    startGame(lives);
                }
            }, 1000);

        }

    //CLICK ELEMENTS GAME END

function cpsGame(timerElement, gameinfoElement, timer, first, timerAppear, scoreLevel, lives){
    var clickDisplayElement = document.getElementById("clickDisplay");
        cpsNumber = 0;
        var goalN = 0;
        

        if(scoreLevel == 1) {
            goalN = 20
        }

        if(scoreLevel == 2) {
            goalN = 25
        }

        
        if(scoreLevel == 3) {
            goalN = 30
        }

        if(scoreLevel == 4) {
            goalN = 36
        }


        gameinfoElement.textContent = "Do "+ goalN +" Left Clicks!";
        //myInt is where the timer starts and everything in that function will load when the timer loads a second in.
        function clickRefresh( ){
            document.getElementById("clickDisplay").innerHTML = "Clicks: " + cpsNumber;
          }
          clickRefresh()
    
        cpsStart = true;
        cpsListener = function () { //activates if mousemovement is detected
        //document.removeEventListener('click', cpsListener, false);
            if (cpsStart === true && timerElement.textContent != "FAIL"){ 
                cpsNumber++;
                clickRefresh();
                    console.log('mouseClick = ' + cpsNumber);
                    if (cpsNumber >= goalN) {
                        timerElement.textContent = "You did it!";
                        clearInterval(myInt); //stops timer
                        document.removeEventListener('click', cpsListener, false); // Remove listener when game ends
                        if(first == true)
                        {
                       updateScore();
                       first = false;
                       hide(clickDisplayElement)
                       startGame(lives);
                        }
                    }
    
            }
        };



        var myInt = setInterval(function () {
            if(timerAppear === true) //starts the game's functionality
            {
                document.removeEventListener('click', cpsListener, false);
                document.addEventListener('click', cpsListener, false);
                timerAppear = false;
                display(clickDisplayElement)
                cpsNumber = 0;
                clickRefresh();
                console.log("Goal and cps" + goalN + " " + cpsNumber)
            }
            timerElement.textContent = timer;
            timer = timer - 1;
            //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0
            if(timer === -1)
            {
                timerElement.textContent = "FAIL";
                clearInterval(myInt); //stops timer
                hide(clickDisplayElement)
                if(lives == 1){
                    document.removeEventListener('click', cpsListener, false); // Remove listener when game ends
                    lives = lives - 1;
                    cpsNumber = 0;
                    cpsStart = false;
                    if(first == true){
                    clickRefresh();
                    cpsNumber = 0;
                    }
                    updateLives();
                    gameover(timerElement, gameinfoElement);
                    }
                    else{
                        lives = lives - 1;
                        updateLives();
                        startGame(lives)
                    }
            }
        }, 1000);
    }

function wasdGame(timerElement, gameinfoElement, timer, first, timerAppear, scoreLevel, lives){
    timer = 5
if(scoreLevel === 1){
    spaces = 23 //actually 25
}

if(scoreLevel === 2){
    spaces = 28 //actually 30
}

if(scoreLevel === 3){
    spaces = 28 //actually 30
    timer = 4;
}

if(scoreLevel === 4){
    spaces = 31 //actually 33
    timer = 4;
}

    const box = document.querySelector('#box');
    const sprite = document.querySelector('#sprite');
    let speed = 10;
    let trailColor = 'red'; // Color of the trail
    let trailSize = 15; // Size of the trail dot
    var wwidth = window.innerWidth;
    var hheight = window.innerHeight; 
    var combo = 0;
    let comboArray = [[0, 0]];
    let trailDots = []; // Array to store trail dots
    display(box);
    display(sprite);
    const toNum = (pxVal) => {
        return parseInt(pxVal, 10);
    };
    const addTrailDot = (left, bottom) => {
        const trailDot = document.createElement('div');
        trailDot.className = 'trail-dot';
        trailDot.style.backgroundColor = trailColor;
        trailDot.style.width = trailSize + 'px';
        trailDot.style.height = trailSize + 'px';
        trailDot.style.position = 'absolute';
        trailDot.style.left = (wwidth/9 + toNum(sprite.style.left)) + 'px'; // Use current sprite position
        trailDot.style.bottom = (hheight/1.5 + toNum(sprite.style.bottom)) + 'px'; // Use current sprite position
        document.body.appendChild(trailDot);
        trailDots.push(trailDot); // Add the trail dot to the array
    
    };
    const resetTrail = () => {
        for (const dot of trailDots) {
            document.body.removeChild(dot);
        }
        trailDots = []; // Reset the array
    };
    gameinfoElement.textContent = "Paint " + (spaces + 2) +  " Spaces Using WASD";
    var myInt = setInterval(function () {
        if(timerAppear === true) //starts the game's functionality
        {
            window.addEventListener('keydown', handleMovement);
            timerAppear = false;
        }
        timerElement.textContent = timer;
        timer = timer - 1;
        //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0
        if(timer === -1)
        {
            timerElement.textContent = "FAIL";
            clearInterval(myInt); //stops timer
            window.removeEventListener('keydown', handleMovement);
            hide(box);
            hide(sprite);
            resetTrail(); // Remove all trail dots from the screen
            sprite.style.left = 0;
            sprite.style.bottom = 0;
            if(lives == 1){
                lives = lives - 1;
                updateLives();
                gameover(timerElement, gameinfoElement);
                }
                else{
                    lives = lives - 1;
                    updateLives();
                    startGame(lives)
                }
        }

        }, 1000);
            const handleMovement = (e) => {
                // Handle movement only if the square is not fully painted
                let left = toNum(sprite.style.left);
                const bottom = toNum(sprite.style.bottom);
                addTrailDot(left, bottom);
                switch (e.key) {
                    case 'a':
                        if (left <= 0) return (sprite.style.left = 0);
                        sprite.style.left = left - speed + 'px';
                        addTrailDot(left, bottom);
                        console.log("Left, Bottom: " + left + " " +  bottom);
                        checkAndAppend(comboArray, left, bottom);
                        break;
                    case 'd':
                        if (left >= 50) return (sprite.style.left = 50);
                        sprite.style.left = left + speed + 'px';
                        addTrailDot(left, bottom);
                        console.log("Left, Bottom: " + left + " " +  bottom);
                        checkAndAppend(comboArray, left, bottom);
                        break;
                    case 'w':
                        if (bottom >= 0) return (sprite.style.bottom = 0);
                        sprite.style.bottom = bottom + speed + 'px';
                        addTrailDot(left, bottom);
                        console.log("Left, Bottom: " + left + " " +  bottom);
                        checkAndAppend(comboArray, left, bottom);
                        break;
                    case 's':
                        if (bottom <= -50) return (sprite.style.bottom = -50);
                        sprite.style.bottom = bottom - speed + 'px';
                        addTrailDot(left, bottom);
                        console.log("Left, Bottom: " + left + " " +  bottom);
                        checkAndAppend(comboArray, left, bottom);
                        break;
                }
    };



    function checkAndAppend(array, num1, num2) {
        // Check if the combination already exists in the array
        let exists = array.some(pair => pair[0] === num1 && pair[1] === num2);
        
        // If the combination doesn't exist, append it to the array
        if (!exists) {
            array.push([num1, num2]);
            combo = combo + 1;
            console.log(combo)
            if(combo === spaces)
            {
                timerElement.textContent = "You did it!";
                clearInterval(myInt); //stops timer
                if(first == true)
                {
               updateScore();
               first = false;
               window.removeEventListener('keydown', handleMovement);
               hide(box);
               hide(sprite);
            //    document.body.removeChild(trailDot);
            resetTrail(); // Remove all trail dots from the screen
            sprite.style.left = 0;
            sprite.style.bottom = 0;
               startGame(lives);
                }
            }

        }
        
        return array;
    }

}
function clickImageGame(timerElement, gameinfoElement, timer, first, timerAppear, scoreLevel, lives) {
wrongCount = 15


    if(scoreLevel === 1){
        timer = 5;
    }
    if(scoreLevel === 2){
        timer = 2;
    }

    if(scoreLevel === 3){
        timer = 2;
        wrongCount = 40
    }

    if(scoreLevel === 4){
        timer = 1;
        wrongCount = 45
    }


    sources = ["../images/dog.png", "../images/cat.png", "../images/chicken.png", "../images/cow.png", "../images/pig.png"];
    targetIndex = Math.floor(Math.random() * sources.length);
    targetImage = sources[targetIndex];
    console.log(targetImage);
    sources.splice(targetIndex, 1);
    console.log(sources);
    imageType = targetImage.split("/");
    imageType = imageType[2].split(".");
    imageType = imageType[0];
    gameinfoElement.textContent = "Click the " + imageType;
    targetClicked = false;
    wrongClick = false;
    let clickablesContainer = document.getElementById("clickables-container");
    clickablesContainer.style.display = "block";
    const imageWidth = 75;
    const imageHeight = 75;
    const maxWidth = 400 - imageWidth;
    const maxHeight = 400 - imageHeight;
        var myInt = setInterval(function () {
            if(timerAppear === true) //starts the game's functionality
            {   
                for(let i = 0; i < wrongCount; i++) {                   //ADD NON-TARGET IMAGES
                    let img = document.createElement("img");
                    img.classList.add("image-hover");
                    imgIndex = Math.floor(Math.random() * sources.length);
                    imgSource = sources[imgIndex];
                    img.src = imgSource;
                    newX = Math.floor(Math.random() * maxWidth);
                    newY = Math.floor(Math.random() * maxHeight);
                    img.style.top = newY.toString() + "px";
                    img.style.left = newX.toString() + "px";
                    img.style.cursor = "pointer";
                    img.addEventListener('click', () => {
                        wrongClick = true;
                        img.style.display = "none";
                    }, {once: true});
                    clickablesContainer.appendChild(img);}
                       //ADD TARGET IMAGE
                let targetImg = document.createElement("img");
                targetImg.src = targetImage;
                targetImg.classList.add("image-hover");
                newX = Math.floor(Math.random() * maxWidth);
                newY = Math.floor(Math.random() * maxHeight);
                targetImg.style.top = newY.toString() + "px";
                targetImg.style.left = newX.toString() + "px";
                targetImg.style.cursor = "pointer";
                targetImg.addEventListener('click', () => {
                    targetClicked = true;
                    targetImg.style.display = "none";
                }, {once: true});
                clickablesContainer.appendChild(targetImg);
                timerAppear = false;
            }
            timerElement.textContent = timer;
            timer = timer - 1;
            console.log("Tick");
            //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0


            if((timer === -1 && targetClicked == false) || wrongClick == true)
            {
                hide(clickablesContainer)
                timerElement.textContent = "FAIL";
                clearInterval(myInt); //stops timer
                if(lives == 1){
                    lives = lives - 1;
                    updateLives();
                    clickablesContainer.innerHTML = "";
                    gameover(timerElement, gameinfoElement);
                    }
                    else{
                        lives = lives - 1;
                        updateLives();
                        clickablesContainer.innerHTML = "";
                        startGame(lives)
                    }
            }


            if(targetClicked == true && wrongClick == false && timer != -1)
            {
                hide(clickablesContainer);
                timerElement.textContent = "You did it!";
                clickablesContainer.innerHTML = "";
                clearInterval(myInt); //stops timer
                if(first == true)
                {
               updateScore();
               first = false;
                }
                startGame(lives);
            }

        }, 1000);

    }



 //Color ELEMENTS GAME
 function colorGame(timerElement, gameinfoElement, timer, first, timerAppear, scoreLevel, lives) {
    timer = 4;
    flashy = false;
    timerSpeed = 1000;
    if(scoreLevel == 2) {
timer = 2;
    }

    if(scoreLevel == 3) {
        timer = 6;
        flashy = true;
        timerSpeed = 600;
            }

        if(scoreLevel == 4){
            timer = 8
            flashy = true;
            timerSpeed = 525;
        }
            
    const usedColor = ["red", "blue", "green", "pink", "purple", "orange"];
            let colorIndex = Math.floor(Math.random() * usedColor.length); //randomizes games
        let chosenColor = usedColor[colorIndex]; //chooses random game
     colorIndex = Math.floor(Math.random() * usedColor.length); //randomizes games
        let chosenColor2 = usedColor[colorIndex]; //chooses random game
        gameinfoElement.style.color = chosenColor2;
    gameinfoElement.textContent = "Click the " + chosenColor +  " box!";
    colorOfBox = "";
    matchColor = "";
    if(chosenColor == "red")
    {
        matchColor = "rgb(255, 0, 0)";
    }
    if(chosenColor == "blue")
    {
     matchColor = "rgb(0, 0, 255)";   
    }
    if(chosenColor == "green")
    {
    matchColor = "rgb(0, 128, 0)";
    }
    if(chosenColor == "pink")
    {
        matchColor = "rgb(255, 192, 203)";
    }
    if(chosenColor == "purple")
    {
        matchColor = "rgb(128, 0, 128)";
    }
    if(chosenColor == "orange")
    {
        matchColor = "rgb(255, 165, 0)";
    }

    clicked = 0;
    maxClicked = 6;
    let clickablesContainer = document.getElementById("clickables-container");
    clickablesContainer.style.display = "block";
    const clickableWidth = 50;
    const clickableHeight = 50;
    const maxWidth = 400 - clickableWidth;
    const maxHeight = 400 - clickableHeight;
        var myInt = setInterval(function () {
            if(timerAppear === true) //starts the game's functionality
            {
                for(let i = 0; i < 6; i++) {
                    color = "color";
                    // colorN = "5"
                    let clickable = document.createElement(color + i);
                    newX = Math.floor(Math.random() * maxWidth);
                    newY = Math.floor(Math.random() * maxHeight);
                    clickable.style.top = newY.toString() + "px";
                    clickable.style.left = newX.toString() + "px";
                    clickable.style.cursor = "pointer";
                    clickable.addEventListener('click', () => {
                        clickable.style.display = "none";
                        let computedStyle = window.getComputedStyle(clickable);
                        let colorOfBox = computedStyle.getPropertyValue("background-color");
                        console.log(colorOfBox);
                        console.log(matchColor);
                        if(matchColor == colorOfBox)
                        {
                            timerElement.textContent = "You did it!";
                            clickablesContainer.innerHTML = "";
                            clearInterval(myInt); //stops timer
                            hide(clickablesContainer);
                            if(first == true)
                            {
                           updateScore();
                           gameinfoElement.style.color = "black";
                           first = false;
                            }
                            startGame(lives);
                        }
                        else if(matchColor != colorOfBox)
                        {
                            timerElement.textContent = "FAIL";
                            clearInterval(myInt); //stops timer
                            hide(clickablesContainer);
                            clickablesContainer.innerHTML = "";
                            if(lives == 1){
                                lives = lives - 1;
                                updateLives();
                                clickablesContainer.innerHTML = "";
                                gameover(timerElement, gameinfoElement);
                                }
                                else{
                                    lives = lives - 1;
                                    updateLives();
                                    startGame(lives)
                                }
                        }
                        clicked += 1;
                        console.log("Clicked!");
                    }, {once: true});
                    clickablesContainer.appendChild(clickable);}
                timerAppear = false;
                //display(clickablesContainer)
            }
            if(timer % 2 !== 0 && flashy === true) {
                display(clickablesContainer);
            }
            else if(flashy === true && timer % 2 == 0){
                hide(clickablesContainer);
                clickablesContainer.innerHTML = ""; 
                timerAppear = true;
                
            }
            timerElement.textContent = timer;
            timer = timer - 1;
            console.log("Tick");
            //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0
            if(timer === -1)
            {
                hide(clickablesContainer);
                timerElement.textContent = "FAIL";
                clearInterval(myInt); //stops timer
                if(lives == 1){
                    lives = lives - 1;
                    updateLives();
                    clickablesContainer.innerHTML = "";
                    gameover(timerElement, gameinfoElement);
                    }
                    else{
                        lives = lives - 1;
                        updateLives();
                        clickablesContainer.innerHTML = "";
                        gameinfoElement.style.color = "black";
                        startGame(lives)
                    }
            }
        }, timerSpeed);

    }

function guessGame(timerElement, gameinfoElement, timer, first, timerAppear, scoreLevel, lives){
    nguess = 0;
    nrange = "1-7"
if(scoreLevel == 1){
    timer = 4;
    nRange = "1-7"
    nguess = 7;
}

if(scoreLevel == 2){
    timer = 8;
    nrange = "1-10"
    nguess = 10;
}

if(scoreLevel == 3){
    timer = 8;
    nrange = "1-25"
    nguess = 25;
}


if(scoreLevel == 4){
    timer = 5;
    nrange = "1-20"
    nguess = 20;
}

    var textInputElement = document.getElementById("textInput");
    var clickDisplayElement = document.getElementById("clickDisplay");
    numbIndex = Math.floor(Math.random() * nguess) + 1; //randomizes games
    gameinfoElement.textContent = "Guess the number between " + nrange + "!"
    textboxclear(textInputElement) //clears textbox
    textboxclear(clickDisplayElement)
    document.getElementById("clickDisplay").innerHTML = "";



    const inputHandler = function(event) {
        const inputText = event.target.value; // Get the value of the input
        if (inputText === numbIndex.toString() && timerElement.textContent != "FAIL") {
            timerElement.textContent = "You did it!";
            clearInterval(myInt); //stops timer
            document.getElementById("textInput").removeEventListener("input", inputHandler);
            if(first == true)
            {
                updateScore();
                first = false;
                hide(textInputElement) //hides textbox
                hide(clickDisplayElement)
                startGame(lives);
            }
        }
    
        else if (inputText === "") {
            // Handle case when input is empty
            document.getElementById("clickDisplay").innerHTML = "";
        }
        else if (!isNaN(inputText) && inputText > numbIndex && timerElement.textContent != "FAIL") {
            document.getElementById("clickDisplay").innerHTML = "Too High!";
        }
        else if (!isNaN(inputText) && inputText < numbIndex && timerElement.textContent != "FAIL") {
            document.getElementById("clickDisplay").innerHTML = "Too Low!";
        }
    };

    document.getElementById("textInput").addEventListener("input", inputHandler);

    //myInt is where the timer starts and everything in that function will load when the timer loads a second in.

    var myInt = setInterval(function () {
        if(timerAppear === true) //starts the game's functionality
        {
            display(textInputElement) //displays text box
            display(clickDisplayElement)
            timerAppear = false;
            console.log(numbIndex.toString())
        }
        timerElement.textContent = timer;
        timer = timer - 1;
        //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0
        if(timer === -1)
        {
            timerElement.textContent = "FAIL";
            clearInterval(myInt); //stops timer
            hide(textInputElement) //hides textbox
            document.getElementById("textInput").removeEventListener("input", inputHandler);
            hide(clickDisplayElement)
            if(lives == 1){
                lives = lives - 1;
                updateLives();
                gameover(timerElement, gameinfoElement);
                }
                else{
                    lives = lives - 1;
                    updateLives();
                    startGame(lives)
                }
        }
    }, 1000);
}

function mouseMove2Game(timerElement, timer, first, timerAppear, lives, gameinfoElement){
    mouseStart = true;
    myListenerz = function () { //activates if mousemovement is detected
        document.removeEventListener('mousemove', myListenerz, false);
        if (mouseStart === true){ 
            {
                timerElement.textContent = "You did it!";
                    if(first == true) {
                        clearInterval(myInty); 
                    updateScore();
                    first = false;
                    startGame(lives);
                    }
            }
        }
    };


    var myInty = setInterval(function () {
        if(timerAppear === true)
        {
            timerAppear = false;
            document.addEventListener('mousemove', myListenerz, false); //actually starts the mousetracker
        }
        timerElement.textContent = timer;
        timer = timer - 1;
        //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0
        if(timer === -1)
        {
            mouseStart = false;
            timerElement.textContent = "FAIL!";
            document.removeEventListener('mousemove', myListenerz, false); // Remove listener when game ends
            clearInterval(myInty);  //clears timer
            if(lives == 1){
                lives = lives - 1;
                updateLives();
                gameover(timerElement, gameinfoElement);
                }
                else{
                    lives = lives - 1;
                    updateLives();
                    startGame(lives)
                }
        }
        
    }, 1000);
}
function gameover(timerElement, gameinfoElement){
    var nScore = score; 
    document.getElementById("score").innerHTML = "Score: " + nScore;
    score = 0;
    lives = 1
    scoreLevel = 1;
    updateLives();
    timerElement.textContent = "GAME OVER";
    gameinfoElement.textContent = "Would you like to upload your score or try again?";
    display(document.getElementById("startbutton"));
    display(document.getElementById("start3button"));
    display(document.getElementById("homebutton"));
    displayFailButton(nScore);

}

function displayFailButton(nScore) {
    document.getElementById("failbutton").style.display = "block";
    link = document.getElementById("failbutton").children;
    link[0].href = "/submitScore?score=" + String(nScore) + "&gamemode=" + gamemode;
}

function display(element) { //displays textbox
    element.style.display = (element.style.display === 'none') ? 'block' : 'none'; // (cond) ? <do> : <else>
}

function hide(element) { //hides textbox
    element.style.display = 'none';
}

function textboxclear() { //clears textbox

    document.getElementById('textInput').value = "";
}
function updateScore(){
    score = score + 1;
    document.getElementById("score").innerHTML = "Score: " + score;
  }

  function updateLives(){
    lives = lives - 1;
    document.getElementById("lives").innerHTML = "Lives: " + lives;
  }

document.addEventListener('mousemove', myListener, false); //for mouse movement

document.addEventListener('mousemove', myListenerz, false); //for mouse movement

document.addEventListener('click', cpsListener, false); //for mouse clicks




