var sequence = [];
var playerSequence = [];
var level = 1;
var buttonsDisabled = true;
var strictMode = false;
var score = 0;

var buttonElements = document.querySelectorAll('.simon-btn');
var startButton = document.querySelector('.start-btn');
var strictButton = document.querySelector('.strict-btn');
var helpStrictButton = document.querySelector('.help-strict-btn');
var scoreElement = document.getElementById('score');
var levelElement = document.getElementById('level');
var namePlayer = document.getElementById('namePlayer');

var modal = document.getElementById('modal-error');
var titleModal = modal.querySelector('h2');
var textModal = modal.querySelector('p');
var closeButton = document.getElementsByClassName('close')[0];

startButton.addEventListener('click', normalGame);

strictButton.addEventListener('click', strictGame);
helpStrictButton.addEventListener('click', modalSStrict);

for (var i = 0; i < buttonElements.length; i++) {
  buttonElements[i].addEventListener('click', handleButtonClick);
}

function strictGame(){
  strictMode = true;
  startGame();
}

function normalGame(){
  strictMode = false;
  startGame()
}

function startGame() {
  if(namePlayer.value != '' && namePlayer.value.length > 3){
    playerSequence = [];
    level = 1;
    score = 0;
    scoreElement.textContent = 'Puntaje: ' + score;
    buttonsDisabled = true;
    generateSequence();
  }else{
    openModal('Error', 'Ingrese un nombre con más de 3 caractéres');
  }
}

function generateSequence() {
  var randomNum = Math.floor(Math.random() * 4);
  sequence.push(randomNum);
  playSequence();
}

function playSequence() {
  buttonsDisabled = true;
  sequence.forEach((color, index) => {
    setTimeout(function () {
      playButton(color);
    }, (index + 1) * 800);
  });

  buttonsDisabled = false;
}

function handleButtonClick(event) {
  if (!buttonsDisabled) {
    var buttonId = event.target.id;
    var buttonIndex = getButtonIndex(buttonId);
    playButton(buttonIndex);
    playerSequence.push(buttonIndex);
    scoreElement.textContent = 'Puntaje: ' + score++;
    checkPlayerSequence();
  }
}

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

function checkPlayerSequence() {
  if (playerSequence.length === sequence.length) {
    buttonsDisabled = true
    if (arraysMatch(playerSequence, sequence)) {
      playerSequence = [];
      level++;
      setTimeout(function() {
        if(strictMode){
          score = (score + 1) * 2;
        }else{
          score ++;
        }
        levelElement.textContent = 'Nivel: ' + sequence.length;
      }, 1000);
      buttonsDisabled = false
      generateSequence();
    } else {
      if (strictMode) {
        openModal('Game Over', 'Hubo un error en la secuencia, vuelve a intentarlo!');
        scoreElement.textContent = 'Puntaje: ' + 0;
        levelElement.textContent = 'Nivel: ' + 0;
        playerSequence = [];
        sequence = [];
        saveLocalStorage(score);
        score = 0;
      } else {
        openModal('Try Again', 'Hubo un error en la secuencia, vuelve a intentarlo!');
        levelElement.textContent = 'Nivel: ' + 0;
        playerSequence = [];
        sequence = [];
        saveLocalStorage(score);
      }
    }
  }
}

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

function modalSStrict(){
  openModal('¿Que es Todo o nada?', 'Por cada nivel que ganes duplicas puntos, pero si pierdes, tu puntaje vuelve a cero');
}

function openModal(title, text) {
  modal.style.display = 'block';
  titleModal.textContent = title;
  textModal.textContent = text;
}

function closeModal() {
  modal.style.display = 'none';
  titleModal.textContent = '';
  textModal.textContent = '';
}

function getLocalStorage(){
  var scoreLS = localStorage.getItem('score');
  if (!scoreLS) {
      return [];
  }
  return JSON.parse(scoreLS);
}

function saveLocalStorage(){
  var scoreLS = getLocalStorage();
  scoreLS.push(Object.fromEntries(getResults()));
  localStorage.setItem('score', JSON.stringify(scoreLS));
}

function getResults() {
  var gameScore = new Map();
  gameScore.set('date', getDateAndHour());
  gameScore.set('name', namePlayer.value);
  gameScore.set('level', level);
  gameScore.set('hits', score);
  return gameScore;
}

function getDateAndHour() {
  var date = new Date();
  var day = String(date.getDate()).padStart(2, '0');
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var year = date.getFullYear();
  var hr = String(date.getHours()).padStart(2, '0');
  var min = String(date.getMinutes()).padStart(2, '0');
  var seg = String(date.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} - ${hr}:${min}:${seg}`;
}

closeButton.addEventListener('click', closeModal);
window.addEventListener('click', function(event) {
  if (event.target === modal) {
      closeModal();
  }
});