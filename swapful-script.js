//GAME INPUTS
 /*const letters=[
    "g", "o", "m", "p", "c", "u","b","l","m","e", "t", "o", "p", "l","o","u"
];*/
 const letters=[
    "z", "i", "f", "e", "o", "n","n","r","o","f", "i", "u", "e", "v","r","e"
 ];
 //answers
 //const answer=["pump", "clog", "mule","boot"];
 const answer=["five", "four", "nine","zero"];

 //valid words
 /*const otherwords=[ "none","bump","boom","mump","comb","comm","comp","coop","coot","club","culm","lump", "loom", "goop","plum","bloc","buco","clop","coup","cube","glum","gulp","pleb","plug","pube","puce","pool","tump","umbo","blog","bull","cleg","clog","come","cope","cull","geum","glob","glom","glop","memo","mobe","mome","mope","mull","poem","pome","pull","temp","tomb","bell","bleu","blue","boll","cell","clou","cool","clue","cult","gull","loup","lube","loot","luce","mell","moll","mule","pego","poll","pule","tulp","ulmo","belt","blet","blot","bole","bolt","bout","bute","celt","clot","cole","colt","cute","glue","glut","lept","lobe","lope","luge","melt","meou","moot","mole","molt","motu","moue","mute","pelt","peut","plot","pole","poop","pout","tube","cote","gelt","gout","loge","mote","ogle","poet","tegu","tome","tope","tool","lout","lute","tell","toll","tolu","tule","ulto","tole"
 ];*/
 const otherwords=["enuf","erne","eruv","euro","even","ever","fere","fern","fief","fife","fine","fino","fire","firn","foin","fore","free","friz","froe","fuze","info","inro","iron","neif","neve","nevi","niff","noir","nori","nuff","ooze","orzo","ouzo","oven","over","reef","reif","rein","reno","rife","riff","rive","roof","roue","rove","ruer","ruff","ruin","rune","veer","vein","vier","viff","vine","vino","zein","zine","zone","zoon","zori","noon","nene","noun","noni","none","neon"];

//theme
const theme="numbers";

//DECLARING VARIABLES
let swap =[];
let moves=0;
let totalValidWords = []; // Moved outside the function to persist between calls
let finalWordsFound;

//THEME
//Show the whole theme at the end of the game 
function loadTheme(){
    const themeArea = document.getElementById("theme-content");
    if (!themeArea) {
        console.error("Theme area element not found");
        return;
    }

    themeArea.textContent = theme;
    
}
//SWAPPING LETTERS
function storeLetter(letter, index) {
    if (swap.length === 0) {
        swap.push({ letter, index });
        //change the button background color to light blue
        const button = document.querySelector(`.image-item:nth-child(${index + 1})`);
            button.style.backgroundColor = '#a8a8a8';
        console.log(`First selection: ${letter} at index ${index}`);
    } else {
        swap.push({ letter, index });
        console.log(`Second selection: ${letter} at index ${index}`);
        //if the same button was pushed twice, do not count as move and deselect
        if (swap[0].index==swap[1].index){
            swap = [];
            console.log('reset swap')
            console.log('number of moves:'+moves)
            //turn button back to white
            const button = document.querySelector(`.image-item:nth-child(${index + 1})`);
            button.style.backgroundColor = '#eaeaea';
        }
        else{
            // Swap letters based on their indices
            const [first, second] = swap;
            [letters[first.index], letters[second.index]] = [letters[second.index], letters[first.index]];
            console.log(`Swapped ${first.letter} at index ${first.index} with ${second.letter} at index ${second.index}`);
            console.log('Updated letters array:', letters.join(', '));
            
            // Refresh the display and check the grid
            displayLetters();
            const button = document.querySelector(`.image-item:nth-child(${first.index+1})`);
            button.classList.add('flip');
            const button1 = document.querySelector(`.image-item:nth-child(${second.index+1})`);
            button1.classList.add('flip');
            checkGrid();
            moves++;
            document.getElementById('moves').innerHTML=('Moves: '+moves);
            console.log('number of moves:'+moves)
        }
        // Reset swap array
        swap = [];
    }
}

//DISPLAY LETTERS
function displayLetters() {
    const gameArea = document.getElementById("game-grid");
    if (!gameArea) {
        console.error("Game area element not found");
        return;
    }

    gameArea.innerHTML = '';
    
    letters.forEach((letter, index) => {
        const letterBox = document.createElement('button');
        letterBox.className = 'image-item';
        letterBox.addEventListener('click', () => storeLetter(letter, index));
        letterBox.innerHTML = `<span>${letter}</span>`;
        const outerBox = document.createElement('div');
        outerBox.className='outer-box';
        outerBox.innerHTML +=letterBox.outerHTML;
        gameArea.appendChild(letterBox);
    });
}
//SOLVED PUZZLE
function finishPuzzle() {
    let allDisabled = true;

    for (let i = 0; i < 16; i++) {
        const button = document.querySelector(`.image-item:nth-child(${i + 1})`);
        if (button && !button.disabled) {
            allDisabled = false;
            break; // Exit the loop as soon as we find an enabled button
        }
    }

    if (allDisabled) {
        //stopTimer
        stopTimer();
        // Show popup
        showWinPopup();
    } else {
        console.log("You're still playing. Keep going!");
    }
}
//finished message
function showWinPopup() {
    const popup = document.createElement('div');
    popup.className = 'win-popup';
    popup.id="win";
    popup.innerHTML = `
        <div class="instructions-content">
        <button id="play" onclick="removeWin()"><img src="icons/Close_round.svg"></button>
        <h1>Hooray!</h1>
        <p>You finished Swapful in</p>
        <div class="box"> <span class="alfaslabone">${moves+1} </span>moves</div>
        <button id="shareButton" onclick="shareResults()">Share your results</button>
        </div>
        `;
    document.body.appendChild(popup);
}

//VALIDATING WORDS
function checkGrid() {
    const gridWords = [
        letters.slice(0, 4).join(""),
        letters.slice(4, 8).join(""),
        letters.slice(8, 12).join(""),
        letters.slice(12, 16).join("")
    ];
    
    console.log("Words in grid:", gridWords);
    
    let correctWords = 0;
    let newValidWords = 0;
    
    gridWords.forEach((word, rowIndex) => {
        if (answer.includes(word)) {
            console.log(`Row ${rowIndex + 1}: "${word}" is a correct answer!`);
            correctWords++;
            
            // Disable buttons and change background color for this row
            const startIndex = rowIndex * 4;
            for (let i = startIndex; i < startIndex + 4; i++) {
                const button = document.querySelector(`.image-item:nth-child(${i + 1})`);
                if (button) {
                    button.disabled = true;
                    button.style.backgroundColor = 'rgb(210, 230, 249)';
                    button.style.color = 'black';
                }
            }
        } else if (otherwords.includes(word) && !totalValidWords.includes(word)) {
            console.log(`Row ${rowIndex + 1}: "${word}" is a valid word, but not a target answer.`);
            newValidWords++;
            totalValidWords.push(word);
            //add word to word bank
            var wordBank = document.getElementById('wordbank');
            const newWord = document.createElement("span");
            newWord.textContent = word + " ";
            wordBank.appendChild(newWord);
        } else {
            console.log(`Row ${rowIndex + 1}: "${word}" is not a recognized word or has been found before.`);
        }
    });
    finishPuzzle();
    
    console.log(`Total correct answers: ${correctWords}`);
    console.log(`New valid words found: ${newValidWords}`);
    console.log(`Total unique valid words found so far: ${totalValidWords.length}`);
    var validWordsTracker = document.getElementById('validWords');
    var totalWords=correctWords+totalValidWords.length;
    finalWordsFound=totalWords;
    //validWordsTracker.innerHTML="Words: "+totalWords;
    
    return { correctWords, totalValidWordsCount: totalValidWords.length };
}
//TIMER
    let timer;    
    let seconds = 0;
    let minutes = 0;

    //const startStopButton = document.getElementById('startStop');
    //const resetButton = document.getElementById('reset');

    function formatTime(time) {
        return time.toString().padStart(2, '0');
    }

    function startTimer(){
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
        }, 1000);
    }

    function stopTimer(){
        clearInterval(timer);
        isRunning = !isRunning;
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        seconds = 0;
        minutes = 0;
    }

//Instructions
function instructions() {
    const background = document.createElement('div');
    background.className = 'background';
    background.id = 'background';
    const popup = document.createElement('div');
    popup.className = 'instruction-popup';
    popup.id = 'instructions-box';
    popup.innerHTML = `
        <div class="instructions-content">

            <button id="play" onclick="removeInstructions()"><img src="icons/Close_round.svg"></button>
            <h1>How to Play</h1>
            <p class="instructions-text">
                <h3>Swap letters to spell 4 words by row<br> related to today's theme.</h3>
                <video width="100%" autoplay loop muted> 
                <source src="instructions.mp4" type="video/mp4" alt="example of swapping letters and spelling a word" >
                Your browser does not support the video tag.
                </video>
            </p>
            <div>
            <button id="playbutton" onclick="removeInstructions()">Let's Play!</button>
        </div>
    `;

    document.body.appendChild(background);
    document.body.appendChild(popup);
}

function removeInstructions() {
    const instructionsBox = document.getElementById('instructions-box');
    const opacity = document.getElementById('background');
    if (instructionsBox) {
        instructionsBox.remove();
        opacity.remove();
    }
    startTimer(); //start the timer after closing instructions
}

function removeWin() {
    const winBox = document.getElementById('win');
    const opacity = document.getElementById('background');
    if (winBox) {
        winBox.remove();
        opacity.remove();
    }
}

//Share Game
function shareGame() {
    try {
        navigator.share({
            title: "Want to play Swapful with me?",
            url: "https://smax15.github.io/swapful.html",
        });
        console.log("Data was shared successfully");
    } catch (err) {
        console.error("error:", err.message);
    }
}

//Share Results
function shareResults()  {
            try {
            navigator.share({
                title: "Can you beat me?",
                text: `I just finished Swapful in ${moves} moves.` ,
                url: "https://smax15.github.io/swapful.html",
            });
            console.log("Data was shared successfully");
            } catch (err) {
            console.error("error:", err.message);
            }
}

// Start game
function startGame(){
    displayLetters();
    moves=0;
    resetTimer();
    loadTheme();
} 

//start game
startGame();
instructions();