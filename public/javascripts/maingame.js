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
//CPS (BUTTON MASHER) - CW

//In general todos"
// have minigame fail go to game over screen
//have them speed up
//front end design

let intervalId; //for timer resets

var score = 0;
var mouseStart = false; //checks mouse movement
var myListener; //for mouse movement checker


//is the array for the randomization. if you want to add a game to the randomization cycle, add it to the array like so
//ALSO DO NOT ADD UNIQUE PASSED PARAMETERS TO A FUNCTION!!!!!!! DEFINE THEM WITHIN THAT FUNCTION OR THIS WON'T WORK!!!!
let gameArray = [
    { func: textboxGame, params: [] },
    { func: mouseMoveGame, params: [] },
    { func: clickableGame, params: []}
];



function startGame() {
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
//    clickableGame(timerElement, gameinfoElement, timer, first, timerAppear);

    

}

function textboxGame(timerElement, gameinfoElement, timer, first, timerAppear){
    var textInputElement = document.getElementById("textInput");
    gameinfoElement.textContent = "Match this text Exactly: test";
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
        }
           // TEXT MATCHING GAME:
           document.getElementById("textInput").addEventListener("input", function(event) {
            const inputText = event.target.value; // Get the value of the input
            if (inputText === "test" && timerElement.textContent != "FAIL") {
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
        // for(let i = 0; i < 5; i++) {
        //     let clickable = document.createElement("clickable");
        //     newX = Math.floor(Math.random() * maxWidth);
        //     newY = Math.floor(Math.random() * maxHeight);
        //     clickable.style.top = newY.toString() + "px";
        //     clickable.style.left = newX.toString() + "px";
        //     clickable.style.cursor = "pointer";
        //     clickable.addEventListener('click', () => {
        //         clickable.style.display = "none";
        //         clicked += 1;
        //         console.log("Clicked!");
                // if(clicked == maxClicked)
                // {
                //     console.log("Minigame passed!");
                //     hide(clickablesContainer)
                //     if(first == true)
                //     {
                //    updateScore();
                //    first = false;
                //     }
                //     startGame();
                // }
            // }, {once: true});
            // clickablesContainer.appendChild(clickable);
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
    document.getElementById("score").innerHTML = score;
  }

document.addEventListener('mousemove', myListener, false); //for mouse movement

window.addEventListener('load', ()=> {
    document.getElementById("startbutton").addEventListener('click', startGame);
});
