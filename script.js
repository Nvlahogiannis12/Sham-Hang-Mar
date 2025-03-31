const wordList = [
    'articuno',
    'zapdos',
    'moltres',
    'mewtwo',
    'mew',
    'suicune',
    'entei',
    'raikou',
    'hooh',
    'lugia',
    'celebi',
    'kyogre',
    'groudon',
    'rayquaza',
    'deoxys',
    'jirachi',
]

let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 7
let playerHP = 100

function startGame(level){
    selectedWord = getRandomWord(level)

// Update difficulty selection box
updateDifficultyDisplay(level)

//create placeholder for selected word
displayedWord = '_'.repeat(selectedWord.length)
document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')

    //Hide difficulty selection and Show game area & difficulty box
    document.getElementById('difficultySelection').classList.add('d-none')

    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.remove('d-none')

    document.getElementById('gameArea').classList.add('d-block')
    document.getElementById('difficultyBox').classList.add('d-block')
}

function getRandomWord(level){
    let filteredWords = wordList.filter(word => {
        if(level === 'easy') return word.length <= 4;
        if(level === 'medium') return word.length > 4 && word.length <= 7;
        if(level === 'hard') return word.length >= 8;
    })

    return filteredWords[Math.floor(Math.random()* filteredWords.length)]
}

function updateDifficultyDisplay(level){
    let difficultyBox = document.getElementById('difficultyBox')

    //remove any previous difficulty box
    difficultyBox.classList.remove('easy','medium','hard')

    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`

    //Apply CSS styling
    difficultyBox.classList.add(level)
}

function guessLetter(){
    let inputField = document.getElementById('letterInput')
    let guessedLetter = inputField.value.toLowerCase()

    //Check if Valid input between A-Z
    if(!guessedLetter.match(/^[a-z]$/)){
        alert('You have FAILED to put a letter between A-Z')
        inputField.value = ''
        return
    }
    if(guessedLetters.includes(guessedLetter)){
        alert('You guessed that already')
        inputField.value = ''
        return
    } else {
        guessedLetters.push(guessedLetter)
    }
    
    if(selectedWord.includes(guessedLetter)){
        correctGuess(guessedLetter)
    } else {
        wrongGuess(guessedLetter)
    }

    inputField.value = ''
    inputField.focus()
}

function wrongGuess(guessedLetter){
    wrongGuesses++
    document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`
    //health decrease
    if(playerHP === 10){
        playerHP -= 10;
    } else{
        playerHP -= 15
    }
    healthInsurance()
    
    if (wrongGuesses === maxMistakes){
        endGame(false)}
}

function correctGuess(guessedLetter){
    let newDisplayedWord = ''
    for (let i = 0; i < selectedWord.length; i++){
        if (selectedWord[i] === guessedLetter){
            newDisplayedWord += guessedLetter
        } else{
            newDisplayedWord += displayedWord[i]
        }
    }

    displayedWord = newDisplayedWord
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')


    if(!displayedWord.includes('_')){
        endGame(true)
    }
}

function healthInsurance() {
    let healthbar = document.getElementById("playerHealth");
          healthbar.setAttribute("style", `width: ${playerHP}%;`);
  }

function endGame(won){
    if(won === true){
        setTimeout(() => alert('You Win'), 100)
    } else{
        setTimeout(() => alert('You Lose'), 100)
    }

}

function restartGame(){
    
}