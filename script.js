const wordList = [
    'Articuno',
    'Zapdos',
    'Moltres',
    'Mewtwo',
    'Mew',
    'Suicune',
    'Entei',
    'Raikou',
    'Hooh',
    'Lugia',
    'Celebi',
    'Kyogre',
    'Groudon',
    'Rayquaza',
    'Deoxys',
    'Jirachi',
]

let selectedWord = ''
let displayedWord = ''
let wrongGuess = 0
let guessedLetters = []
const maxMistakes = 6

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