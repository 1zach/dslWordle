const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.keyboard-container')
const messageDisplay = document.querySelector('.message-container')
const wordle= "KORYSUCKS"

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]
let currentRow = 0
let currentTile = 0
let isGameOver = false



keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    keyboard.append(buttonElement)
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
});

const guessRows = [
    ['', '', '', '', '','','','',''],
    ['', '', '', '', '','','','',''],
    ['', '', '', '', '','','','',''],
    ['', '', '', '', '','','','',''],
    ['', '', '', '', '','','','',''],
    ['', '', '', '', '','','','','']
]

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        rowElement.append(tileElement)
        tileElement.classList.add('tile')
    });
    
    tileDisplay.append(rowElement)
});

const handleClick = (key) => {
    console.log(key)
    if (key === '«') {
        deleteLetter()
        console.log('delete')
        return
    }

    if (key === 'ENTER') {
        checkRow()
        console.log('check row')
        return
    }
    addLetter(key)
}


const addLetter = (letter) => {
    if (currentTile < wordle.length && currentRow < 6){
    
    const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
    tile.textContent = letter
    guessRows[currentRow][currentTile] = letter
    tile.setAttribute('data', letter)
    currentTile++
    console.log(guessRows)
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
    currentTile--
    const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
    tile.textContent = ''
    guessRows[currentRow][currentTile] = ''
    tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    flipTile()
    if (currentTile > (wordle.length - 1)) {
       if(wordle == guess) {
           showMessage('You got it!')
           isGameOver = true
           return
       } else {
           if (currentRow >=5) {
               isGameOver=true
               showMessage('Game Over')
               return
           }
           if (currentRow < 5) {
               currentRow++
               currentTile = 0
           }
       }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)

}


const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []
    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
       //const dataLetter = tile.getAttribute('data')

    setTimeout(() => {
        tile.classList.add(guess[index].color)
        tile.classList.add('flip')
        addColorToKey(guess[index].letter, guess[index].color)
    }, 500 * index)
    /*    tile.classList.add('flip')
        if (dataLetter == wordle[index]) {
           tile.classList.add('green-overlay')
           addColorToKey(dataLetter, 'green-overlay')
       } else if (wordle.includes(dataLetter)) {
           tile.classList.add('yellow-overlay')
           addColorToKey(dataLetter, 'yellow-overlay')
       } else {
           tile.classList.add('grey-overlay')
           addColorToKey(dataLetter, 'grey-overlay')
       }*/
    
})
}