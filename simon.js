// Variables
var sequence = [];
var playerSequence = [];
var level = 1;
var buttonsDisabled = true;
var strictMode = false;
var score = 0;

var buttonElements = document.querySelectorAll('.simon-btn');
var startButton = document.querySelector('.start-btn');
var scoreElement = document.getElementById('score');

// Start button event listener
startButton.addEventListener('click', startGame);

// Button click event listeners
for (var i = 0; i < buttonElements.length; i++) {
  buttonElements[i].addEventListener('click', handleButtonClick);
}

// Start the game
function startGame() {
  playerSequence = [];
  level = 1;
  score = 0;
  scoreElement.textContent = 'Puntaje: ' + score;
  buttonsDisabled = true;
  generateSequence();
}

// Generate the sequence
function generateSequence() {
  // Generate only one additional random light for this level
  var randomNum = Math.floor(Math.random() * 4);
  sequence.push(randomNum);

  console.log('sequence generate: ' + sequence);

  playSequence();
}

//play sequence generated
function playSequence() {
  sequence.forEach((color, index) => {
    setTimeout(function () {
      playButton(color);
      console.log("color: "+ color)
    }, (index + 1) * 800);
    buttonsDisabled = false;
});
}

// Handle button click
function handleButtonClick(event) {
  console.log('Botón clickeado:', event.target.id);
  if (!buttonsDisabled) {
    var buttonId = event.target.id;
    var buttonIndex = getButtonIndex(buttonId);
    playButton(buttonIndex);
    playerSequence.push(buttonIndex);
    checkPlayerSequence();
  }
}

// Play a button
function playButton(buttonIndex) {
  if (buttonIndex >= 0 && buttonIndex < buttonElements.length) {
    var buttonElement = buttonElements[buttonIndex];
    buttonElement.classList.add('active');
    setTimeout(function() {
      buttonElement.classList.remove('active');
    }, 500);
  } else {
    console.error('Índice de botón inválido: ', buttonIndex);
  }
}

// Check player's sequence
function checkPlayerSequence() {
  if (playerSequence.length === sequence.length) {
    if (arraysMatch(playerSequence, sequence)) {
      playerSequence = [];
      level++;
      generateSequence();
      setTimeout(function() {
        score++;
        scoreElement.textContent = 'Puntaje: ' + score;
      }, 1000);
    } else {
      if (strictMode) {
        alert('Game Over!');
        startGame();
      } else {
        alert('Try Again!');
        playerSequence = [];
        sequence = []
        generateSequence()
      }
    }
  }
}

// Check if two arrays match
function arraysMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

// Get button index
function getButtonIndex(buttonId) {
  switch (buttonId) {
    case 'green':
      return 0;
    case 'red':
      return 1;
    case 'yellow':
      return 2;
    case 'blue':
      return 3;
  }
}
