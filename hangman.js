const prompt = require('prompt-sync')();
gameStarter();

function gameStarter(){
  const gameData = {
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

  const input = prompt('Would you like to play some hangman?').toLocaleLowerCase();
  console.log(input);
  if (input === 'yes'){
    mainGame(gameData);
  } else if (input === 'no') {
    console.log('That\'s okay, come back later when you want to play!');
  } else {
    console.log('I don\'t understand this...');
    gameStarter();
  }
}

function mainGame(gameData){
  gameData.chosenWord = chooseWord();
  gameData.letters = generateUnderscores(gameData.chosenWord);
  while (gameData.lives !== 0 && !isPlayerWon(gameData.letters, gameData.chosenWord)){
    console.log(`\nYour word contains ${gameData.chosenWord.length} letters:`);
    console.log(convertLettersToString(gameData.letters));
    const input = getInput(gameData.chosenWord);
    checkGuess(gameData, input);
  }
  if (gameData.lives === 0){
    console.log(`You lost the game!\nThe word was: ${convertLettersToString(gameData.chosenWord)}`);
  }
  gameStarter();
}

function chooseWord(){
  const letters = [];
  const maxValue = 19;
  const minValue = 0;
  const randomIndex = Math.floor(Math.random() * (maxValue - minValue) + minValue);
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
  for (const letter of wordBank[randomIndex]){
    letters.push(letter);
  }
  //letters = wordBank[randomIndex].split();
  return letters;
}
function mapFunc(element){
  return "_"
}

function generateUnderscores(letters) {
  const underscores = letters.map(mapFunc);
  return underscores;
}

function checkGuess(gameData, input){
  let hasLostOneLife = true;
  if (gameData.guessedLetters.includes(input)){
    console.log(`You already guessed the "${input}" letter!`);
    hasLostOneLife = false;
  } else {
    gameData.guessedLetters.push(input);
    for (let i = 0; i < gameData.chosenWord.length; i++){
      if (gameData.chosenWord[i].toLocaleLowerCase() === input){
        gameData.letters[i] = gameData.chosenWord[i];
        console.log('You guessed it!');
        hasLostOneLife = false;
      }
    }
  }
  if (hasLostOneLife){
    gameData.lives -= 1;
    console.log('Bad guess! You losed one life!');
    console.log(gameData.livesAscii[gameData.lives]);
    console.log(`You guessed these letters so far: ${convertLettersToString(gameData.guessedLetters)}`);
  }
}

function getInput(chosenWord) {
  let isValid = true;
  let input;
  while (isValid) {
    input = prompt('Guess a letter! ').toLocaleLowerCase();
    if (input === 'show'){
      console.log(convertLettersToString(chosenWord));
    }
    else if (input.length !== 1) {
      console.log('That\'s not a valid guess!');
    } else {
      isValid = false;
    }
  }
  return input;
}

function convertLettersToString (letters){
  let joinedLetters = '';
  for (const letter of letters){
    joinedLetters += `${letter} `;
  }
  return joinedLetters;
}

function isPlayerWon (letters, chosenWord){
  for (const letter of letters){
    if (letter === '_'){
      return false;
    }
  }
  console.log(`You won the game!\nThe word was: ${convertLettersToString(chosenWord)}`);
  return true;
}
