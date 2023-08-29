const prompt = require('prompt-sync')();
gameStarter();

function gameStarter(){
  const wordObject = {
    chosenWord : [],
    letters: [],
    guessedLetters: [],
    lives: 7,
    livesAscii: [`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
  =========`, `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|   |
      |
      |
  =========`, `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`, `
  +---+
  |   |
  O   |
      |
      |
      |
=========`, `
  +---+
  |   |
      |
      |
      |
      |
=========`],
  };

  const input = prompt('Woul you like to play some hangman?').toLocaleLowerCase();
  console.log(input);
  if (input === 'yes'){
    mainGame(wordObject);
  } else if (input === 'no') {
    console.log('That\'s okay, come back later when you want to play!');
  } else {
    console.log('I don\'t understand this...');
    gameStarter();
  }
}

function mainGame(wordObject){
  wordObject.chosenWord = pickWord();
  wordObject.letters = emptyUnderslashes(wordObject.chosenWord);
  while (wordObject.lives !== 0 && !winningCondition(wordObject)){
    console.log(`\nYour word contains ${wordObject.chosenWord.length} letters:`);
    console.log(arrayToString(wordObject.letters));
    wordObject = guessLetter(wordObject);
  }
  if (wordObject.lives === 0){
    console.log(`You lost the game!\nThe word was: ${arrayToString(wordObject.chosenWord)}`);
  }
  gameStarter();
}

function pickWord(){
  const array = [];
  const maxValue = 19;
  const minValue = 0;
  const randomWord = Math.floor(Math.random() * (maxValue - minValue) + minValue);
  const wordBank = [
    'apple',
    'banana',
    'chocolate',
    'dinosaur',
    'elephant',
    'flamingo',
    'giraffe',
    'hamburger',
    'igloo',
    'jellyfish',
    'kangaroo',
    'lighthouse',
    'mountain',
    'narwhal',
    'ostrich',
    'pineapple',
    'quokka',
    'rainbow',
    'sunflower',
    'tiger',
  ];
  for (const letter of wordBank[randomWord]){
    array.push(letter);
  }
  return array;
}

function emptyUnderslashes(guessWord) {
  const lettersArray = [];
  for (let i = 0; i < guessWord.length; i++) {
    lettersArray.push('_');
  }
  return lettersArray;
}

function guessLetter(object){
  let losedOneLife = true;
  const input = getInput(object);
  if (object.guessedLetters.includes(input)){
    console.log(`You already guessed the "${input}" letter!`);
    losedOneLife = false;
  } else {
    object.guessedLetters.push(input);
    for (let i = 0; i < object.chosenWord.length; i++){
      if (object.chosenWord[i].toLocaleLowerCase() === input){
        object.letters[i] = object.chosenWord[i];
        console.log('You guessed it!');
        losedOneLife = false;
      }
    }
  }
  if (losedOneLife){
    object.lives -= 1;
    console.log('Bad guess! You losed one life!');
    console.log(object.livesAscii[object.lives]);
    console.log(`You guessed these letters so far: ${arrayToString(object.guessedLetters)}`);
  }
  return object;
}

function getInput(object) {
  let notValid = true;
  let input;
  while (notValid) {
    input = prompt('Guess a letter! ').toLocaleLowerCase();
    if (input === 'show'){
      console.log(arrayToString(object.chosenWord));
    }
    else if (input.length !== 1) {
      console.log('That\'s not a valid guess!');
    } else {
      notValid = false;
    }
  }
  return input;
}

function arrayToString (array){
  let string = '';
  for (const letter of array){
    string += `${letter} `;
  }
  return string;
}

function winningCondition (object){
  for (const letter of object.letters){
    if (letter === '_'){
      return false;
    }
  }
  console.log(`You won the game!\nThe word was: ${arrayToString(object.chosenWord)}`);
  return true;
}
