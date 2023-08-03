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
  generateSequence();
  buttonsDisabled = true;
}

// Generate the sequence
function generateSequence() {
  sequence = [];
  
  for (var i = 0; i < level; i++) {
    var randomNum = Math.floor(Math.random() * 4);
    sequence[i] = randomNum;
  }

  console.log('sequence: ' + sequence)

  playSequence();
}

// Play the sequence
function playSequence() {
  var i = 0;
  var interval = setInterval(function() {
    clearButtons();
    setTimeout(function() {
      playButton(sequence[i]);
      console.log('sequence: ' + sequence[i])
    }, 100);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      buttonsDisabled = false;
    }
  }, 1000);
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

// Clear button states
function clearButtons() {
  for (var i = 0; i < buttonElements.length; i++) {
    buttonElements[i].classList.remove('active');
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
        playSequence();
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
        score = 0;
        scoreElement.textContent = 'Puntaje: ' + score;
        setTimeout(function() {
          playSequence();
        }, 1000);
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
      console.log('green')
      return 0;
    case 'red':
      console.log('red')
      return 1;
    case 'yellow':
      console.log('yellow')
      return 2;
    case 'blue':
      console.log('blue')
      return 3;
  }
}
