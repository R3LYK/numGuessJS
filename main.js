var random;
let guessCount = 1;
let resetButton;
let acceptedRange;
let startButton;

const chosenDifficulty = document.querySelector('.chosenDifficulty');

document.getElementById("btn").addEventListener("click", gameDifficulty);

//allows user to choose game difficulty (radio-buttons)
function gameDifficulty(){
  
  document.getElementById("difficultySelect").hidden = true;
  document.getElementById("resultParas").hidden = false;

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
      chosenDifficulty.textContent = 'Choose a number between 1 and 100: ';
      console.log(random);
      
  } else if (easy.checked==true) {
      random = randomEasy;
      acceptedRange = 'rangeEasy';
      chosenDifficulty.textContent = 'Choose a number between 1 and 200: ';
      console.log(random);
  } else if (medium.checked==true) {
      random = randomMedium;
      acceptedRange = 'rangeMedium';
      chosenDifficulty.textContent = 'Choose a number between 1 and 300: ';
      console.log(random);
  } else if (hard.checked==true) {
      random = randomHard;
      acceptedRange = 'rangeHard';
      chosenDifficulty.textContent = 'Choose a number between 1 and 400: ';
      console.log(random);
  } else if (insane.checked==true) {
      random  = randomInsane;
      acceptedRange = 'rangeInsane';
      chosenDifficulty.textContent = 'Choose a number between 1 and 500: ';
      console.log(random);
  }
}


const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const guessLeft = document.querySelector('.guessLeft');

let hotColdRange;
let userGuess;

//checks that user guess falls within acceptable parameters based on "chosenDifficulty"
//alerts user if if outside accepted bounds
//includes basic game logic and returns/keeps track of user inputs
function checkGuess() {
    const userGuess = Number(guessField.value);
    console.log(random);
    console.log(acceptedRange);
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
      if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
      }
      if (guessCount === 5) {
        createHintButton();
      }
      guesses.textContent += userGuess + ' - ';
        if (userGuess === random) {
          lastResult.textContent = 'Congratulations! You got it right!';
          lastResult.style.backgroundColor = 'green';
          lowOrHi.textContent = '';
          setGameOver();
        } else if (guessCount === 10) {
          lastResult.textContent = '!!!GAME OVER!!!';
          lowOrHi.textContent = '';
          setGameOver();
        } else {
          lastResult.textContent = 'Wrong!';
          guessLeft.textContent = 'Guess count: ';
          guessLeft.textContent += guessCount + ' ';
          lastResult.style.backgroundColor = 'red';
          if(userGuess < random) {
            hotColdRange = random - userGuess;
            console.log(hotColdRange);
            hotCold();
            colorChangeParam();
          } else if(userGuess > random) {
            hotColdRange = userGuess - random;
            console.log(hotColdRange);
            hotCold();
            colorChangeParam();
            
        }
      }
      guessCount++;
      guessField.value = '';
    guessField.focus();
    }
    
  }
  
guessSubmit.addEventListener('click', checkGuess);
//sets game status to gameover, removing the ability to interact with game input's
//creates reset button "button"
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.id = 'button';
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

//clears everything returned while playing the game
//should also take user back to radio-buttons to choose difficulty
function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll('.panel1 p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
    //Attempting to switch back to radio-buttons using the same code that does the reverse
    //and changing the true/false and passing in "button" in place of "btn"
  }
  
  document.getElementById("difficultySelect").hidden = false;
  document.getElementById("resultParas").hidden = true;
  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  random = null;
  lastResult.style.backgroundColor = 'white';
  
}

//lets user know whether hot or cold, returns message at random.
//plan on changing background color different shades of blue and red depending on hotColdRange

var divElem = document.getElementById("body")

function hotCold(){
  let randomResponse;
  let withinFive = ["You're on FIRE!!!", "How can you stand this heat!?", "How are you not melting?", "So, so close!", "Careful, you're keyboard might melt!", "Just like me, you're incredibly hot!"];
  let withinTen = ["It's getting hot in here!", "This is tropical island heat!!", "I suggest sun-screen when it's this hot.", "I hope you're dressed for this heat!", "Somebody just cranked the thermostat up!"];
  let withinTwenty = ["It's like a nice spring day.", "Close!", "It's like a mild salsa!", ""];
  let withinThirty = ["within 30 placeholder", "within 30 placeholder 2"];
  let withinFourty = ["within 40 placeholder", "within 40 placeholder 2"];
  let withinHundred = ["within 100 placeholder", "within 100 placeholder 2"];
  let withinTwoHun = ["within 200 placeholder", "within 200 placeholder 2"];
  let withinThreeHun = ["within 300 placeholder", "within 300 placeholder 2"];
  let withinFourHun = ["within 400 placeholder", "within 400 placeholder 2"];
  let withinFiveHun = ["within 500 placeholder", "within 500 placeholder 2"];

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
      divElem.style.backgroundColor = "red";
    }
}

//unfinished
function createHintButton(){
  hintButton = document.createElement('button');
  hintButton.id = 'hint';
  hintButton.textContent = 'HINT!!';
  document.body.appendChild(hintButton);
  hintButton.addEventListener('click', getHint);
}

//unfinished
function getHint(){
  if (guessCount === 5) {
  let hexHint = random.toString(16);
  alert(hexHint);
  } else if (guessCount === 6) {
    isRandomPrime();
  } else if (guessCount === 7) {
    isRandomFib();
  } else if (guessCount === 8) {
    alert('placeholder8')
  } else if (guesCount === 9) {
    alert('placeholder9')
  }
}

//unfinished
function isRandomPrime(){

}
//unfinished??
function isRandomFib(){
  let n1 = 0, n2 = 1, sequence;
  sequence = n1 + n2;
  while (sequence <= random) {
      console.log(sequence);

      n1 = n2;
      n2 = nextTerm;
      nextTerm = [n1 + n2];
      if (nextTerm.includes(random))
        alert('The number is in part of the Fibonacci sequence (starting at 1)')
  }
}




//function letMeCheat(){
//create a cheat function that allows users to input chosen difficulty (range),
// is prime, is fib...and other "hint's" and return
// numbers that match parameters.
//}

function colorChangeParam(){
  let hslVal = ["hsl(0, 100%, 50%",
  "hsl(13.06, 100%, 48.63%)",
  "hsl(19.67, 100%, 47.25%)",
  "hsl(25.09, 100%, 45.49%)",
  "hsl(30.13, 100%, 43.73%)",
  "hsl(35.49, 100%, 41.76%)",
  "hsl(40.99, 100%, 39.61%)",
  "hsl(46.25, 100%, 37.65%)",
  "hsl(52.38, 100%, 35.49%)",
  "hsl(58.94, 100%, 33.33%)",
  "hsl(65.83, 100%, 34.31%)",
  "hsl(71.8, 100%, 35.88%)",
  "hsl(81.43, 68.14%, 44.31%)",
  "hsl(92.65, 53.54%, 50.2%)",
  "hsl(106.61, 53.78%, 55.88%)",
  "hsl(123.68, 55.34%, 59.61%)",
  "hsl(138.67, 62.21%, 57.45%)",
  "hsl(150, 68.7%, 54.9%)",
  "hsl(159.14, 75.1%, 51.18%)",
  "hsl(166.58, 100%, 44.71%)",
  "hsl(170.21, 100%, 45.69%)",
  "hsl(173.9, 100%, 46.27%)",
  "hsl(176.75, 100%, 47.06%)",
  "hsl(179.75, 100%, 47.65%)",
  "hsl(182.13, 100%, 50.39%)"
  ]

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
  zipper(hslKey, hslVal)
}

function zipper(key, value){
  key.shift();
  let zipped = key.map((el, i) => {
    return [key[i], value[i]];
  });

  let hslObj = Object.fromEntries(zipped);
  changeBackground(hslObj, userGuess);
  console.log(hslObj);
  console.log(userGuess); //testing that userGuess is defined...it is not.
}


function changeBackground(arr, num){
  return num.reduce((a, b) => {
    let aDiff = Math.abs(a - arr.keys);
    let bDiff = Math.abs(b - arr.keys);

    if (aDiff == bDiff) {
      return a > b ? a : b;
    } else {
      return bDiff < aDiff ? b : a;
    }
  });

}







// hslKey.shift();
// let zipped = hslKey.map((el, i) => {
//   return [hslKey[i], hslVal[i]];
// });

// let hslObj = Object.fromEntries(zipped);