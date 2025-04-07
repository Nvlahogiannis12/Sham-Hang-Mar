const wordList = [
    'mario',
    'donkeykong',
    'link',
    'samus',
    'darksamus',
    'yoshi',
    'kirby',
    'fox',
    'pikachu',
    'lugi',
    'ness',
    'captainfalcon',
    'jigglypuff',
    'peach',
    'daisy',
    'bowser',
    'iceclimbers',
    'sheik',
    'zelda',
    'drmario',
    'pichu',
    'falco',
    'marth',
    'lucina',
    'younglink',
    'ganondorf',
    'mewtwo',
    'roy',
    'chrom',
    'mrgameandwatch',
    'metaknight',
    'pit',
    'darkpit',
    'zerosuitsamus',
    'wario',
    'snake',
    'ike',
    'pokemontrainer',
    'diddykong',
    'lucas',
    'sonic',
    'kingdedede',
    'olimar',
    'lucario',
    'rob',
    'toonlink',
    'wolf',
    'villager',
    'megaman',
    'wiifittrainer',
    'rosalina',
    'littlemac',
    'greninja',
    'mii',
    'palutena',
    'pacman',
    'robin',
    'shulk',
    'bowserjr',
    'ryu',
    'ken',
    'cloud',
    'corrin',
    'bayonetta',
    'inkling',
    'ridley',
    'simon',
    'richter',
    'kingkrool',
    'isabelle',
    'incineroar',
    'piranhaplant',
    'joker',
    'hero',
    'banjoandkazooie',
    'terry',
    'byleth',
    'minmin',
    'steve',
    'alex',
    'sephiroth',
    'pyra',
    'mythra',
    'kazuya',
    'sora',  
    'smashball',
    'pokeball',
    'dragoonparts',
    'bomber',
    'fakesmashball',
    'food',
    'heartcontainer',
    'healingsprout',
    'supermushroom',
    'superstar',
    'metalbox',
    'superspicycurry',
    'lightning',
    'beamsword',
    'homerunbat',
    'goldenhammer',
    'firebar',
    'killingedge',
    'raygun',
    'superscope',
    'steeldiver',
    'bananagun',
    'ramblinevilmushroom',
    'bobomb',
    'greenshell',
    'freezie',
    'gooeybomb',
    'dekunut',
    'pitfall',
    'bananapeel',
    'soccerball',
    'xbomb',
    'powblock',
    'boomerang',
    'cucco',
    'killereye',
    'beastball',
    'franklinbadge',
    'backshield',
    'rocketbelt',
    'specialflag',
    'rollingcrate',
    'capsule',
    'grass',
    'assisttrophy',
    'masterball',
    'daybreakparts',
    'blastbox',
    'sandbag',
    'maximtomato',
    'fairybottle',
    'healingfield',
    'poisonmushroom',
    'warpstar',
    'bunnyhood',
    'timer',
    'bulletbill',
    'starrod',
    'hammer',
    'lipsstick',
    'oreclub',
    'deathssythe',
    'fireflower',
    'gustbellow',
    'drill',
    'rageblaster',
    'staff',
    'motionsensorbomb',
    'bumper',
    'mrsaturn',
    'smartbomb',
    'smokeball',
    'hothead',
    'unira',
    'bombchu',
    'hocotatebomb',
    'spinyshell',
    'beetle',
    'beehive',
    'bossgalaga',
    'blackhole',
    'screwattack',
    'superleaf',
    'superlauncherstar',
    'crate',
    'barrel',
    'partyball',
]

let winStreak = 0
let loseStreak = 0
let playerGuess = false
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 7
let playerHP = 100
let whoWon = ''

window.onload = getName();
// Generates random number if guest name Chosen
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//inputs username
function getName() {
  let randomNumber = getRandomNumber(0, 9999);
  let userName = prompt('What is your name:')
  userName ? document.getElementById('healthText').innerText = `${userName}`:
  document.getElementById('healthText').innerText =`Guest_` + `${randomNumber}`
}


function startGame(level){
    selectedWord = getRandomWord(level)
    playerGuess = true

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
    document.getElementById('healthCare').classList.remove('d-none')
    playerGuessing()
}

//add and remove event key listener 
function playerGuessing(){
    if (playerGuess === true){
  window.addEventListener("keydown", (event) => {
    if(event.key == 'Enter' && document.getElementsByTagName('input')[0].value!= '') guessLetter();
  });
    } else{
  window.removeEventListener("keydown", (event) => {
    if(event.key == 'Enter') guessLetter();
  });
    }
  }

function getRandomWord(level){
    let filteredWords = wordList.filter(word => {
        if(level === 'easy') return word.length <= 6;
        if(level === 'medium') return word.length > 6 && word.length <= 10;
        if(level === 'hard') return word.length >= 11;
    })

    return filteredWords[Math.floor(Math.random()* filteredWords.length)]
}

//toggle on and off enter key

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
        sound("audios/Crazy Hand Laugh.mp3")
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
        endGame(false)} else{
            sound("audios/Home Run Bat.mp3")
        }
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
    } else {
        sound("audios/ssb4 sound.mp3")
    }
}

function healthInsurance() {
    let healthbar = document.getElementById("playerHealth");
          healthbar.setAttribute("style", `width: ${playerHP}%;`);
  }

function endGame(won){
    if(won === true){
      //  setTimeout(() => alert('You Win'), 100)
      sound("audios/Smash Bros GAME.mp3")
      setTimeout(() => document.getElementById('gameover').classList.remove('d-none') , 100)
      document.getElementById('gameDecision').innerText = `YOU WON`
      winStreak++
      document.getElementById('gameStreak').innerText = `Win: ${winStreak}  Lose: ${loseStreak}`
      document.getElementById('Restarting').classlist.add('d-none')
    } else{
        sound("audios/Crazy Hand Laugh.mp3")
        setTimeout(() => document.getElementById('gameover').classList.remove('d-none') , 100)
        document.getElementById('gameDecision').innerText = `YOU FAILED`
        loseStreak++
        document.getElementById('gameStreak').innerText = `Win: ${winStreak}  Lose: ${loseStreak}`
        document.getElementById('wordReveal').innerText = `Word: ${selectedWord}`
        
    }

}

function restartGame(){
    document.getElementById('gameover').classList.add('d-none')
    document.getElementById('difficultySelection').classList.remove('d-none')

    document.getElementById('gameArea').classList.add('d-none')
    document.getElementById('difficultyBox').classList.add('d-none')

    document.getElementById('gameArea').classList.remove('d-block')
    document.getElementById('difficultyBox').classList.remove('d-block')

    document.getElementById('healthCare').classList.add('d-none')

 playerGuess = false
 selectedWord = ''
 displayedWord = ''
 wrongGuesses = 0
 guessedLetters = []
 playerHP = 100
 healthInsurance()
 playerGuessing()
 document.getElementById('wrongLetters').textContent = 'Wrong Guesses:';
}

function sound(url){
    let audio = new Audio(url)
    audio.play()
}