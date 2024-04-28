// //tentative minigame list:
// click a bunch of stuff - EDAN  -- Minigame functionality completed, needs to be integrated into main game loop.
// drag stuff - EDAN
// find required picture - EDAN
// (rarely throw in move mouse) - CW
// spot the mistake
// move something with arrow keys/wasd - CW
// copy and paste (will check if matches) - CW
// pause video at exact point
// count something - EDAN
// choose color - CW
// scroll + button click

//In general todos"
// have minigame fail go to game over screen
//have them speed up
//front end design
let intervalId; //for timer resets

var score = 0;
var mouseStart = false; //checks mouse movement
var cpsStart = false;
var myListener; //for mouse movement checker
var cpsListener; //for mouse clicks


//is the array for the randomization. if you want to add a game to the randomization cycle, add it to the array like so
//ALSO DO NOT ADD UNIQUE PASSED PARAMETERS TO A FUNCTION!!!!!!! DEFINE THEM WITHIN THAT FUNCTION OR THIS WON'T WORK!!!!
let gameArray = [
    { func: textboxGame, params: [] },
    { func: mouseMoveGame, params: [] },
    { func: clickableGame, params: []},
    { func: cpsGame, params: []},
    { func: wasdGame, params: []},
    { func: clickImageGame, params: [] },
    {func: colorGame, params: []}
];



function startGame() {
    document.getElementById("score").innerHTML = "Score: " + score; // Displays Score at 0 for start
    clearInterval(intervalId); // Clear any existing timer
    var timer = 5; //makes every game's timer set to 5, set up here because the timer got funky at the time when going through a bunch
    //of random games. Might be fixed by now? Either way, it needs to be dealt with at some point...
    var first = true; //needed for bug fixes!
    var timerAppear = true; //is used to activate game functions when the timer starts and not during the waiting period between games
    document.getElementById("timer").style.display = "inline";  
    document.getElementById("gameinfo").style.display = "inline";
    document.getElementById("startbutton").style.display = "none";
    var timerElement = document.getElementById("timer");
    var gameinfoElement = document.getElementById("gameinfo");
        let gameArrayIndex = Math.floor(Math.random() * gameArray.length); //randomizes games
        let chosenGame = gameArray[gameArrayIndex]; //chooses random game
        chosenGame.params = [timerElement, gameinfoElement, timer, first, timerAppear]; //sets the parameters
        chosenGame.func(...chosenGame.params); // starts the random game
    


    //textboxGame(timerElement, gameinfoElement);
//    // mouseMoveGame(timerElement, gameinfoElement)
//cpsGame(timerElement, gameinfoElement, timer, first, timerAppear);

    

}

function textboxGame(timerElement, gameinfoElement, timer, first, timerAppear){
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
            displayFailButton()
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
               startGame();
                }
                // make it jump to the random minigame function when it is developed
            }
        });
    }, 1000);
}

function mouseMoveGame(timerElement, gameinfoElement, timer, first, timerAppear){
    gameinfoElement.textContent = "Don't move the mouse!";
    mouseStart = true;
    myListener = function () { //activates if mousemovement is detected
        document.removeEventListener('mousemove', myListener, false);
        if (mouseStart === true){ 
            timerElement.textContent = "FAIL";
            clearInterval(myInt);
            displayFailButton()

        }
    };

    var myInt = setInterval(function () {
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
            clearInterval(myInt);  //clears timer
            if(first == true)
            {
           updateScore();
           first = false;
           startGame();
            }
        }
        
    }, 1000);
}


    //CLICK ELEMENTS GAME
    function clickableGame(timerElement, gameinfoElement, timer, first, timerAppear) {
        gameinfoElement.textContent = "Click the boxes!";
        clicked = 0;
        maxClicked = 5;
        let clickablesContainer = document.getElementById("clickables-container");
        clickablesContainer.style.display = "block";
        const clickableWidth = 50;
        const clickableHeight = 50;
        const maxWidth = 400 - clickableWidth;
        const maxHeight = 400 - clickableHeight;
            var myInt = setInterval(function () {
                if(timerAppear === true) //starts the game's functionality
                {
                    for(let i = 0; i < 5; i++) {
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
                if(timer === -1)
                {
                    timerElement.textContent = "FAIL";
                    clearInterval(myInt); //stops timer
                    hide(clickablesContainer);
                    displayFailButton()
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
                    startGame();
                }
            }, 1000);

        }

    //CLICK ELEMENTS GAME END

function cpsGame(timerElement, gameinfoElement, timer, first, timerAppear){
    var clickDisplayElement = document.getElementById("clickDisplay");
        gameinfoElement.textContent = "Do Five Left Clicks!";
        var cpsNumber = 0;
        //myInt is where the timer starts and everything in that function will load when the timer loads a second in.
        function clickRefresh( ){
            document.getElementById("clickDisplay").innerHTML = "Clicks: " + cpsNumber;
          }
          clickRefresh()
    
        cpsStart = true;
        cpsListener = function () { //activates if mousemovement is detected
        //document.removeEventListener('click', cpsListener, false);
            if (cpsStart === true){ 
                cpsNumber++;
                clickRefresh();
                    console.log('mouseClick = ' + cpsNumber);
                    if (cpsNumber >= 5) {
                        timerElement.textContent = "You did it!";
                        clearInterval(myInt); //stops timer
                        document.removeEventListener('click', cpsListener, false); // Remove listener when game ends
                        if(first == true)
                        {
                       updateScore();
                       first = false;
                       hide(clickDisplayElement)
                       startGame();
                        }
                    }
    
            }
        };



        var myInt = setInterval(function () {
            if(timerAppear === true) //starts the game's functionality
            {
                document.addEventListener('click', cpsListener, false);
                timerAppear = false;
                display(clickDisplayElement)
            }
            timerElement.textContent = timer;
            timer = timer - 1;
            //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0
            if(timer === -1)
            {
                timerElement.textContent = "FAIL";
                clearInterval(myInt); //stops timer
                displayFailButton()
            }
        }, 1000);
    }

function wasdGame(timerElement, gameinfoElement, timer, first, timerAppear){
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
    gameinfoElement.textContent = "Paint 25 Spaces Using WASD";
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
            displayFailButton()
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
            if(combo === 23)
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
               startGame();
                }
            }

        }
        
        return array;
    }

}
function clickImageGame(timerElement, gameinfoElement, timer, first, timerAppear) {
    sources = ["../images/dog.png", "../images/cat.png"];
    targetIndex = Math.floor(Math.random() * sources.length);
    targetImage = sources[targetIndex];
    console.log(targetImage);
    sources.splice(targetIndex, 1);
    console.log(sources);
    imageType = targetImage.split("/");
    imageType = imageType[2].split(".");
    imageType = imageType[0];
    gameinfoElement.textContent = "Click the image of a " + imageType;
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
            {       //ADD TARGET IMAGE
                let targetImg = document.createElement("img");
                targetImg.src = targetImage;
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
                for(let i = 0; i < 5; i++) {                   //ADD NON-TARGET IMAGES
                    let img = document.createElement("img");
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
                timerAppear = false;
            }
            timerElement.textContent = timer;
            timer = timer - 1;
            console.log("Tick");
            //SKIPS 0 FOR SOME REASON SO -1 IS ACCURATE, DON'T CHANGE IT TO 0
            if(timer === -1 || wrongClick == true)
            {
                timerElement.textContent = "FAIL";
                clearInterval(myInt); //stops timer
                displayFailButton()
            }
            if(targetClicked == true)
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
                startGame();
            }
        }, 1000);

    }



 //Color ELEMENTS GAME
 function colorGame(timerElement, gameinfoElement, timer, first, timerAppear) {
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
                            startGame();
                        }
                        else if(matchColor != colorOfBox)
                        {
                            timerElement.textContent = "FAIL";
                            clearInterval(myInt); //stops timer
                            hide(clickablesContainer);
                            displayFailButton()
                        }
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
            if(timer === -1)
            {
                timerElement.textContent = "FAIL";
                clearInterval(myInt); //stops timer
                displayFailButton()
            }
        }, 1000);

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
function updateScore( ){
    score = score + 1;
    document.getElementById("score").innerHTML = "Score: " + score;
  }

function displayFailButton() {
    document.getElementById("failbutton").style.display = "block";
    link = document.getElementById("failbutton").children;
    link[0].href = "/submitScore?score=" + String(score);
}

document.addEventListener('mousemove', myListener, false); //for mouse movement

document.addEventListener('click', cpsListener, false); //for mouse clicks

window.addEventListener('load', ()=> {
    document.getElementById("startbutton").addEventListener('click', startGame);
});
