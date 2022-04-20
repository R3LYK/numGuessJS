var random;
let guessCount = 1;
let resetButton;
let hintButton;
let acceptedRange;
let startButton;

const chosenDifficulty = document.querySelector('.chosenDifficulty');
const chosenRange = document.querySelector('.chosenRange');
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const guessesLeft = document.querySelector('.guessesLeft');
const check = document.querySelector('.check');
const xGuesses = document.querySelector('.xGuesses');
const hintBox = document.querySelector('.hintBox');
const resetGameButton = document.querySelector('.resetGameButton');
const box4msg = document.querySelector('.message');
const box5msg = document.querySelector('.hint');
const box6msg = document.querySelector('.rightWrong');
const guessLabel = document.querySelector('#guessEnter label');

resetGameButton.style.backgroundColor = 'orange';


//============GAME LOGIC & Menu's ============//

body.style.backgroundColor = "rgb(220, 220, 220)"; // sets initial background color (before change)
document.getElementById("btn").addEventListener("click", gameDifficulty);

let checkResetButton = () => {
  if(checker === true){
    hintButton.parentNode.removeChild(hintButton);
    checker = false;
  }
}

//allows user to choose game difficulty (radio-buttons)
function gameDifficulty(){
  
  document.getElementById("difficultySelect").hidden = true;
  document.getElementById("resultParas").hidden = false;
  document.getElementById("box-1").hidden = false;
  document.getElementById("box-2").hidden = false;
  document.getElementById("box-3").hidden = false;
  document.getElementById("box-4").hidden = false;
  document.getElementById("box-5").hidden = false;
  document.getElementById("box-6").hidden = false;
  document.getElementById("guessEnter").hidden = false;

  const randomVeryEasy = Math.floor(Math.random() * 100 + 1);
  const randomEasy = Math.floor(Math.random() * 200 + 1);
  const randomMedium = Math.floor(Math.random() * 300 + 1);
  const randomHard = Math.floor(Math.random() * 400 + 1);
  const randomInsane = Math.floor(Math.random() * 500 + 1);
  var veryEasy = document.getElementById("veryEasy");
  var easy = document.getElementById("easy");
  var medium = document.getElementById("medium");
  var hard = document.getElementById("hard");
  var insane = document.getElementById("insane");
  
  if (veryEasy.checked==true) {
      random = randomVeryEasy;
      acceptedRange = 'rangeVeryEasy';
      chosenDifficulty.textContent = "DIFFICULTY: Very Easy";
      chosenRange.textContent = "RANGE: 1-100";
  } else if (easy.checked==true) {
      random = randomEasy;
      acceptedRange = 'rangeEasy';
      chosenDifficulty.textContent = 'DIFFICULTY: EASY';
      chosenRange.textContent = "RANGE: 1-200";
  } else if (medium.checked==true) {
      random = randomMedium;
      acceptedRange = 'rangeMedium';
      chosenDifficulty.textContent = 'DIFFICULTY: Medium';
      chosenRange.textContent = "RANGE: 1-300";
  } else if (hard.checked==true) {
      random = randomHard;
      acceptedRange = 'rangeHard';
      chosenDifficulty.textContent = 'DIFFICULTY: Hard';
      chosenRange.textContent = "RANGE: 1-400";
  } else if (insane.checked==true) {
      random  = randomInsane;
      acceptedRange = 'rangeInsane';
      chosenDifficulty.textContent = 'DIFFICULTY: Insane';
      chosenRange.textContent = "RANGE: 1-500";
  }
  setGameStart();
  console.log("random = " + random);
}

//targeting in game boxes to blur/un-blur for game-start/over
const box1 = document.querySelector("#box-1");
const box2 = document.querySelector("#box-2");
const box3 = document.querySelector("#box-3");
const box4 = document.querySelector("#box-4");
const box5 = document.querySelector("#box-5");
const box6 = document.querySelector("#box-6");

function setGameStart(){
  
  check.textContent = "GUESSES LEFT:";
  xGuesses.textContent = "PREVIOUS GUESSES:";
  box4msg.textContent = "MSG:";
  box5msg.textContent = "HINT:";
  box6msg.textContent = "MSG:";
  box1.style.filter = 'blur(0px)';
  box2.style.filter = 'blur(0px)';
  box3.style.filter = 'blur(0px)';
  box4.style.filter = 'blur(0px)';
  box5.style.filter = 'blur(0px)';
  box6.style.filter = 'blur(0px)';
  guessField.style.filter = 'blur(0px)';
  guessSubmit.style.filter = 'blur(0px)';
  guessLabel.style.filter = 'blur(0px)';
}

let hotColdRange;
let userGuess;
let guessArr = [];

//checks that user guess falls within acceptable parameters based on "chosenDifficulty"
//alerts user if if outside accepted bounds
//includes basic game logic and returns/keeps track of user inputs
function checkGuess() {
    
    let returnMsg = ['Sorry!!', 'Not quite!!', 'Nope!!']
    userGuess = Number(guessField.value);
    console.log("accepted range =" + acceptedRange);
    //validate user input
    if (acceptedRange === 'rangeVeryEasy' && (userGuess < 1 || userGuess > 100)) {
      alert('Please choose a number 1 through 100');
    } else if (acceptedRange === 'rangeEasy' && (userGuess < 1 || userGuess > 200)) {
      alert('Please choose a number 1 through 200');
    } else if (acceptedRange === 'rangeMedium' && (userGuess < 1 || userGuess > 300)) {
      alert('Please choose a number 1 through 300');
    } else if (acceptedRange === 'rangeHard' && (userGuess < 1 || userGuess > 400)) {
      alert('Please choose a number 1 through 400');
    } else if (acceptedRange === 'rangeInsane' && (userGuess < 1 || userGuess > 500)) {
      alert('Please choose a number 1 through 500');
    } else {
      if(guessArr.includes(userGuess)) {
        alert("You've already guessed this number. Please choose a different number.")
      } else {
        if (guessCount === 1) {
          guesses.textContent = '';
        }
        if (guessCount >= 5 && checker === false) {
          createHintButton();
        }
        guesses.textContent += userGuess + ' - ';
          if (userGuess === random) {
            lastResult.textContent = 'Congratulations! You got it right!';
            lowOrHi.textContent = '';
            setGameOver();
          } else if (guessCount === 10) {
            lastResult.textContent = '!!!GAME OVER!!!';
            lowOrHi.textContent = '';
            setGameOver();
          } else {
            lastResult.textContent = 'Wrong!';
            guessesLeft.textContent = '';
            guessesLeft.textContent += 10 - guessCount + ' ';
            if(userGuess < random) {
              hotColdRange = random - userGuess;
              hotCold();
              colorChangeParam();
            } else if(userGuess > random) {
              hotColdRange = userGuess - random;
              hotCold();
              colorChangeParam();
              
          }
        }
      guessCount++;
      guessField.value = '';
      guessField.focus();
      console.log("hotColdRange = " + hotColdRange);
      console.log("Guess count = " + guessCount);
      guessArr.push(userGuess);
      console.log("Guess array = " + guessArr)

    }
  }
}

guessSubmit.addEventListener('click', checkGuess);
resetGameButton.addEventListener('click', confirmReset);


//sets game status to gameover, removing the ability to interact with game input's
function setGameOver() {
  hintBox.textContent = random;
  box5msg.textContent = "The correct number was:"
  guessField.disabled = true;
  guessSubmit.disabled = true;
  setGameOver.called = true;
  resetGameButton.value = 'New Game';
  resetGameButton.style.backgroundColor = 'lightgreen';
  box1.style.filter = 'blur(2px)';
  box2.style.filter = 'blur(2px)';
  box3.style.filter = 'blur(2px)';
  box4.style.filter = 'blur(2px)';
  box5.style.filter = 'blur(0px)';
  box6.style.filter = 'blur(2px)';
  guessField.style.filter = 'blur(2px)';
  guessSubmit.style.filter = 'blur(2px)';
  guessLabel.style.filter = 'blur(2px)';
  checkResetButton();
}

//verifies that user wants to reset game (unless setGameOver === true)
function confirmReset() {
  if(setGameOver.called){
    resetGame();
  } else {
    let warning = "Are you sure you want to reset the game?"
    if(confirm(warning) == true){
      resetGame();
    } else {
      alert("Be careful where you click!!")
    }
  }
}

//resets everything returned while playing the game
//should also take user back to radio-buttons to choose difficulty
function resetGame() {
    guessCount = 1;
    const resetParas = document.querySelectorAll('.panel-2 p'); //clears in-game top display
    for (const resetPara of resetParas) {
      resetPara.textContent = '';
    }
    const resetCons = document.querySelectorAll('.container-2 p'); //clears in-game bottom display
    for (const resetCon of resetCons) {
      resetCon.textContent = '';
    }
    checkResetButton();
    document.getElementById("difficultySelect").hidden = false;
    document.getElementById("resultParas").hidden = true;
    document.getElementById("box-1").hidden = true;
    document.getElementById("box-2").hidden = true;
    document.getElementById("box-3").hidden = true;
    document.getElementById("box-4").hidden = true;
    document.getElementById("box-5").hidden = true;
    document.getElementById("box-6").hidden = true;
    document.getElementById("guessEnter").hidden = true;
    // resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    random = null;
    body.style.backgroundColor = "rgb(220, 220, 220)";
    resetGameButton.value = 'Reset';
    guessArr = [];
    console.clear(); // using for testing purposes.
}

//lets user know whether hot or cold, returns message at random.

function hotCold(){
  let randomResponse;
  let withinFive = ["You're on FIRE!!!", "How can you stand this heat!?", "How are you not melting?", "So, so close!", "Careful, your keyboard might melt!", "Just like me, you're incredibly hot!"];
  let withinTen = ["It's getting hot in here, but clothes are still recommended!", "This is tropical island heat!!", "I suggest sun-screen when it's this hot.", "I hope you're dressed for this heat!", "Somebody just cranked the thermostat up!"];
  let withinTwenty = ["It's like a nice spring day.", "Close!", "Mild salsa!", "Horeshoes and hand-grenades...", "The background color tells me you're close."];
  let withinThirty = ["NO, NO, NO!!!", "I don't understand why this is so hard for you.", "I know what the number is, and this isn't it.", "Wrong. Again...", "I'm growing tired of being rude. Why can't you figure this out?"];
  let withinFourty = ["Wrong!! Do yo think this is a game!!??", "Nope, the number is actually [invalid]", "You're still pretty far off", "FAIL", "We're going to be here awhile..."];
  let withinHundred = ["I bet you're going to need to use the 'hint' button.", "You're around 32 leagues away.", "You could be further off, but not much further.", "You want me to just tell you the number?", "Negative."];
  let withinTwoHun = ["Still pretty far off", "Nope. Not close.", "Don't be discouraged...unless this is the 2nd time you've gotten this message.", "Just makes you want to scream doesn't it? No? Just me?", "Sigh..."];
  let withinThreeHun = ["I'm running out of quips...", "This isn't hard, I know what the number is.", "NO. NO. NO!!", "Pathetic attempt!", "Skip a couple hundred"];
  let withinFourHun = ["You're way, way off.", "Yeah, no. Try again.", "This is embarasing, but not for me.", "At least your tried. You did TRY didn't you?", "You're way off."];
  let withinFiveHun = ["From here, you're going to need binoculars", "NOT. EVEN. CLOSE!!", "You might not be very good at this...", "You could be further away, but not much.", "You could always cheat..."];

    //need to see if there is a better way to do this
    //there has to be a more effecient way to do this.
    if (hotColdRange <= 5) {
      randomResponse = withinFive[Math.floor(Math.random()*withinFive.length)];
      lowOrHi.textContent = randomResponse;
    } else if (hotColdRange <= 10) {
      randomResponse = withinTen[Math.floor(Math.random()*withinTen.length)];
      lowOrHi.textContent = randomResponse;
    } else if (hotColdRange <= 20) {
      randomResponse = withinTwenty[Math.floor(Math.random()*withinTwenty.length)];
      lowOrHi.textContent = randomResponse;
    } else if (hotColdRange <= 30) {
      randomResponse = withinThirty[Math.floor(Math.random()*withinThirty.length)];
      lowOrHi.textContent = randomResponse;
    } else if (hotColdRange <= 40) {
      randomResponse = withinFourty[Math.floor(Math.random()*withinFourty.length)];
      lowOrHi.textContent = randomResponse;
    } else if (hotColdRange <= 100) {
      randomResponse = withinHundred[Math.floor(Math.random()*withinHundred.length)];
      lowOrHi.textContent = randomResponse;
    } else if (hotColdRange <= 200) {
      randomResponse = withinTwoHun[Math.floor(Math.random()*withinTwoHun.length)];
      lowOrHi.textContent = randomResponse;
    } else if (hotColdRange <= 300) {
      randomResponse = withinThreeHun[Math.floor(Math.random()*withinThreeHun.length)];
      lowOrHi.textContent = randomResponse;
    } else if (hotColdRange <= 400) {
      randomResponse = withinFourHun[Math.floor(Math.random()*withinFourHun.length)];
      lowOrHi.textContent = randomResponse;
    } else if (hotColdRange <= 500) {
      randomResponse = withinFiveHun[Math.floor(Math.random()*withinFiveHun.length)];
      lowOrHi.textContent = randomResponse;
    }
}

//======HINT FUNCTIONS===========//

let checker = false;

function createHintButton(){
  hintButton = document.createElement('button');
  hintButton.id = 'hint';
  hintButton.textContent = 'GET HINT!';
  document.body.appendChild(hintButton);
  hintButton.addEventListener('click', getHint);
  console.log("guessCount = " + guessCount);
  checker = createHintButton.called = true;
}

// function createResetButton(){
//   resetButton = document.createElement('button');
//   restButton.id = 'reset';
//   resetButton.textContent = 'Reset Game!';
//   document.body.appendChile(resetButton);
//   hintButton.addEventListener('click', resetGame);
// }

//working
function getHint(){
  if(guessCount === 6){
    isPrime(random);
  } else if(guessCount === 7){
    if(isFibonacci(random) === true){
      hintBox.textContent = "The number is part of the Fibonacci Sequence (starting with 1)."
    } else {
      hintBox.textContent = "The number is not part of the Fibonacci Sequence (starting with 1)."
    }
  } else if(guessCount === 8){
    isEven(random);
  } else { return false; }
  checkResetButton();
}

//working
function isPrime(num) {
  var sqrtnum=Math.floor(Math.sqrt(num));
    var prime = num != 1;
    for(var i=2; i<sqrtnum+1; i++) { // sqrtnum+1
        if(num % i == 0) {
            prime = false;
            break;
        }
    }
    if(prime === true){
      hintBox.textContent = "The number is prime."
    } else {
      hintBox.textContent = "The number is not prime."
    }
}

// Returns true if n is a Fibonacci Number, else false
function isFibonacci(num)
{
 
    // n is Fibonacci if one of 5*n*n + 4 or 5*n*n - 4 or both
    // is a perfect square
    return isPerfectSquare(5 * num * num + 4) ||
           isPerfectSquare(5 * num * num - 4);
}
 
function isPerfectSquare(x)
{
    let s = parseInt(Math.sqrt(x));
    return (s * s == x);
}

function isEven(num){
  if(num % 2 === 0){
    hintBox.textContent = "The number is even."
  } else {
    hintBox.textContent = "The number is not even."
  }
}

//function letMeCheat(){
//create a cheat function that allows users to input chosen difficulty (range),
// is prime, is fib...and other "hint's" and return
// numbers that match parameters.
//}

//could probably change the in-game message to return th same way as the color, vs using hot/cold
//==============Color change functions =================//

let zipped = {};
let color;

function colorChangeParam(){
  let hslVal = ["hsl(355.7, 100%, 50.78%)",
    "hsl(0, 100%, 59.22%)",
    "hsl(0.96, 100%, 63.14%)",
    "hsl(0.36, 100%, 67.06%)",
    "hsl(0.4, 100%, 70.59%)",
    "hsl(359.55, 100%, 73.92%)",
    "hsl(358.47, 100%, 76.86%)",
    "hsl(357.67, 100%, 79.8%)",
    "hsl(356.59, 97.78%, 82.35%)",
    "hsl(355.65, 85.19%, 84.12%)",
    "hsl(353.75, 64.86%, 85.49%)",
    "hsl(353.33, 40.3%, 86.86%)",
    "hsl(235.47, 63.86%, 83.73%)",
    "hsl(236.31, 67.01%, 80.98%)",
    "hsl(238.44, 69.37%, 78.24%)",
    "hsl(239.34, 72.8%, 75.49%)",
    "hsl(240.57, 75.54%, 72.75%)",
    "hsl(241.98, 79.08%, 70%)",
    "hsl(243.5, 82.04%, 67.25%)",
    "hsl(244.71, 84.53%, 64.51%)",
    "hsl(245.96, 87.69%, 61.76%)",
    "hsl(247.54, 91.39%, 59.02%)",
    "hsl(248.61, 93.72%, 56.27%)",
    "hsl(249.96, 96.62%, 53.53%)",
    "hsl(251.24, 100%, 50.78%)"
  ] // hsl values

  let hslKey = [];
  let upper;

  if (acceptedRange === 'rangeVeryEasy'){
    upper = 101;
    for(let i = 0; i < upper; i += 4){
      hslKey.push(i);
    }
  } else if (acceptedRange === 'rangeEasy'){
    upper = 201;
    for(let i = 0; i < upper; i += 8){
      hslKey.push(i);
    }
  } else if (acceptedRange === 'rangeMedium'){
    upper = 301;
    for(let i = 0; i < upper; i += 12){
      hslKey.push(i);
    }
  } else if (acceptedRange === 'rangeHard'){
    upper = 401;
    for(let i = 0; i < upper; i += 16){
      hslKey.push(i);
    }
  } else if (acceptedRange === 'rangeInsane'){
    upper = 501;
    for(let i = 0; i < upper; i += 20){
      hslKey.push(i);
  }
  }
  hslKey.shift(); //removes zero value at [0]
  zipped = hslKey.reduce((obj, key, index) => ({...obj, [key]: hslVal[index]}), {}); //creates key/value for color change
  closestFunc(diff(userGuess, random), Object.keys(zipped));
}

//returns difference between 2 numbers (used for random/userGuess to assign color change).
function diff(a,b){
  if (a > b) {
    return a - b;
  } else {
    return b - a;
  }
}

//finds closest number in key/value to assign value to color.
function closestFunc (num, arr) {
  var curr = arr[0];
  var diff = Math.abs (num - curr);
  for (var val = 0; val < arr.length; val++) {
      var newdiff = Math.abs (num - arr[val]);
      if (newdiff < diff) {
          diff = newdiff;
          curr = arr[val];
      }
  }
  color = (curr - random);
  console.log("curr =" + curr);
  if (typeof zipped[curr] !== "undefined"){
    color = zipped[curr];
  }
  console.log("color value =" + color);
  changeBackground();
}

function changeBackground() {
  document.body.style.background = color;
}
