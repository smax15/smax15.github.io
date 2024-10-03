//GAME INPUTS
 const letters=[
    "g", "o", "m", "p", "c", "u","b","l","m","e", "t", "o", "p", "l","o","u"
];
 /*const letters=[
    "z", "i", "v", "e", "n", "o","n","r","o","f", "i", "u", "e", "f","r","e"
 ];//*/
 //answers
 const answer=["pump", "clog", "mule","boot"];
 //const answer=["five", "four", "nine","zero"];

 //valid words
 const otherwords=[ "bump","boom","mump","comb","comm","comp","club","culm","lump","plum","bloc","buco","clop","coup","cube","glum","gulp","pleb","plug","pube","puce","pool","tump","umbo","blog","bull","cleg","clog","come","cope","cull","geum","glob","glom","glop","memo","mobe","mome","mope","mull","poem","pome","pull","temp","tomb","bell","bleu","blue","boll","cell","clou","cool","clue","cult","gull","loup","lube","loot","luce","mell","moll","mule","pego","poll","pule","tulp","ulmo","belt","blet","blot","bole","bolt","bout","bute","celt","clot","cole","colt","cute","glue","glut","lept","lobe","lope","luge","melt","meou","moot","mole","molt","motu","moue","mute","pelt","peut","plot","pole","pout","tube","cote","gelt","gout","loge","mote","ogle","poet","tegu","tome","tope","tool","lout","lute","tell","toll","tolu","tule","ulto","tole"
 ];

//theme
const theme=["s","h","o","e"];
//const theme=["n","u","m","b","e","r"]
const hiddenTheme=[];

//DECLARING VARIABLES
let swap =[];
let moves=0;
let hint=theme.length-1;
let totalValidWords = []; // Moved outside the function to persist between calls
let hintCount=0;
let hintUsed=0;
let finalWordsFound;

//THEME
//Show the whole theme at the end of the game 
function loadTheme(){
    const themeArea = document.getElementById("theme-grid");
    if (!themeArea) {
        console.error("Theme area element not found");
        return;
    }

    themeArea.innerHTML = '';
    
    theme.forEach((letterTheme, index) => {
        const themeBox = document.createElement('div');
        themeBox.className = 'theme-item';
        themeBox.innerHTML = `<span>${letterTheme}</span>`;
        themeArea.appendChild(themeBox);
    });
    //console.log('this is theme ' +hint)
}

const themeArea = document.getElementById("theme-grid");

//This makes each letter of the theme into - to hide it
function hideTheme(){
    if (!themeArea) {
        //console.error("Theme area element not found");
        return;
    }

    themeArea.innerHTML = '';
    //add "-" to hiddenTheme
    for (let i=0; i<theme.length;i++){
        const placeholder = "-";
        hiddenTheme.push(placeholder);
    }
    displayTheme();
    //console.log('this is theme ' +hint)
}

//This shows the theme (full, half, no revealed) during the game
function displayTheme(){
    hiddenTheme.forEach((letterTheme, index) => {
        const themeBox = document.createElement('div');
        themeBox.className = 'theme-item';
        themeBox.innerHTML = `<span>${letterTheme}</span>`;
        themeArea.appendChild(themeBox);
    });
}

//this reveals one letter of the theme at a time 
function revealTheme(){
    //should use hint as an index to replace letter in hidden Theme for Theme
    hiddenTheme[hint]=theme[hint];
    hint--;
    //console.log(hiddenTheme);
    themeArea.innerHTML="";
    displayTheme();
    hintCount--;
    if(hintCount==0){
        disableHintButton();
    }
    hintUsed++;
    const applyHintUsed=document.getElementById(`hintused`);
    //applyHintUsed.innerHTML="Hints: "+hintUsed;
}

//SWAPPING LETTERS
function storeLetter(letter, index) {
    if (swap.length === 0) {
        swap.push({ letter, index });
        //change the button background color to light blue
        const button = document.querySelector(`.image-item:nth-child(${index + 1})`);
        if (button) {
            button.style.backgroundColor = '#a8a8a8';
            button.style.transition= background-color 0.3s ease;
        }
        //console.log(`First selection: ${letter} at index ${index}`);
    } else {
        swap.push({ letter, index });
        //console.log(`Second selection: ${letter} at index ${index}`);
        //if the same button was pushed twice, do not count as move and deselect
        if (swap[0].index==swap[1].index){
            swap = [];
            //console.log('reset swap')
            //console.log('number of moves:'+moves)
            //turn button back to white
            const button = document.querySelector(`.image-item:nth-child(${index + 1})`);
            button.style.backgroundColor = '#efefef';
            button.style.transition= background-color 0.3s ease;
        }
        else{
            // Swap letters based on their indices
            const [first, second] = swap;
            [letters[first.index], letters[second.index]] = [letters[second.index], letters[first.index]];
            
            //console.log(`Swapped ${first.letter} at index ${first.index} with ${second.letter} at index ${second.index}`);
            //console.log('Updated letters array:', letters.join(', '));
            
            // Refresh the display and check the grid
            displayLetters();
            checkGrid();
            moves++;
            document.getElementById('moves').innerHTML=('Moves: '+moves);
            //console.log('number of moves:'+moves)
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
        // Reveal the theme
        loadTheme();
    } else {
        //console.log("You're still playing. Keep going!");
    }
}
//finished message
function showWinPopup() {
    const popup = document.createElement('div');
    popup.className = 'win-popup';
    popup.innerHTML = `
        <h2>Hooray!</h2>
        <p>You finished Swapful in <strong>${moves+1} moves</strong>,</p>
        <p>in ${finalWordsFound} words, and using ${hintUsed} hints.</p>
        <p>Your time was ${formatTime(minutes)}:${formatTime(seconds)}.</p>
        <p>Today's theme:<strong>${theme.join("")}</strong></p>
        <button onclick="this.parentElement.remove()">Close</button>
    `;
    document.body.appendChild(popup);
}

//HINT BUTTON
function disableHintButton(){
    const button = document.getElementById(`hint`);
            button.disabled = true;
}

function enableHintButton(){
    const button = document.getElementById(`hint`);
            button.disabled = false;
            const hintcaption = document.getElementById(`hint-counter`);
            hintcaption.innerHTML="";
}

//add to hintCount when valid word is added
function addhintCount(){
    hintCount++;
}

function checkHintAvailable(){
    if(hintCount>0){
        //enable hint button
        enableHintButton();        
        //console.log("enable hint button");
        }
        else{
            var untilHint=3-totalValidWords.length%3;
            const hintcaption = document.getElementById(`hint-counter`);
            if(untilHint==1){
                hintcaption.innerHTML= untilHint+" word until the next hint";
            }
            else{
                hintcaption.innerHTML=untilHint+" words until the next hint";
            }
            //console.log("You have "+ untilHint+" until next Hint");
        };
}

//VALIDATING WORDS
function checkGrid() {
    const gridWords = [
        letters.slice(0, 4).join(""),
        letters.slice(4, 8).join(""),
        letters.slice(8, 12).join(""),
        letters.slice(12, 16).join("")
    ];
    
    //console.log("Words in grid:", gridWords);
    
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
            //check if there's enough hints to enable hint 
            if(totalValidWords.length%3==0){
                addhintCount();
            };
            checkHintAvailable();
        } else {
            console.log(`Row ${rowIndex + 1}: "${word}" is not a recognized word or has been found before.`);
        }
    });
    finishPuzzle();
    
    //console.log(`Total correct answers: ${correctWords}`);
    //console.log(`New valid words found: ${newValidWords}`);
    //console.log(`Total unique valid words found so far: ${totalValidWords.length}`);
    var validWordsTracker = document.getElementById('validWords');
    var totalWords=correctWords+totalValidWords.length;
    finalWordsFound=totalWords;
    validWordsTracker.innerHTML="Words: "+totalWords;
    
    return { correctWords, totalValidWordsCount: totalValidWords.length };
}
//TIMER
    let timer;    
    let seconds = 0;
    let minutes = 0;

    const display = document.getElementById('timer');
    //const startStopButton = document.getElementById('startStop');
    //const resetButton = document.getElementById('reset');

    function formatTime(time) {
        return time.toString().padStart(2, '0');
    }

    function updateDisplay() {
        display.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }

    /*function startStop() {
            if (isRunning) {
                clearInterval(timer);
                //startStopButton.textContent = 'Start';
            } else {
                timer = setInterval(() => {
                    seconds++;
                    if (seconds === 60) {
                        seconds = 0;
                        minutes++;
                    }
                    updateDisplay();
                }, 1000);
                //startStopButton.textContent = 'Stop';
            }
            isRunning = !isRunning;
        }*/
    function startTimer(){
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
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
        updateDisplay();
    }

        //startStopButton.addEventListener('click', startStop);
       // resetButton.addEventListener('click', reset);

//Instructions
function instructions() {
    const popup = document.createElement('div');
    popup.className = 'win-popup';
    popup.id = 'instructions-box';
    popup.innerHTML = `
        <div class="instructions-content">
            <p>SWAPFUL</p>
            <h2>How to play</h2>
            <p class="instructions-text">
                <h3>Spell 4 words related to today's theme.</h3>
                <ul>
                    <img src="swapful_example.gif" alt="show game example of swapping letters and spelling a word" style="display:block; margin:auto;width:50%; padding-bottom:20px">
                    <li>Move letters by swapping spots.</li>
                    <li>Words are read by row.</li>
                    <li>Letters of found-themed words cannot be moved.</li>
                </ul>
                <br>
                <h3>Earn hints</h3>
                <ul>
                    <li>For every 3 non-themed words you find, you earn a hint.</li>
                    <li>Hints reveal theme letters one at a time, backwards.</li>
                </ul>
            </p>
            <div>
            <button id="play" onclick="removeInstructions()">Play</button>
        </div>
    `;
    document.body.appendChild(popup);
}

function removeInstructions() {
    const instructionsBox = document.getElementById('instructions-box');
    if (instructionsBox) {
        instructionsBox.remove();
    }
    startTimer(); // Assuming you want to start the timer after closing instructions
}

// Start game
function startGame(){
    displayLetters();
    moves=0;
    hideTheme();
    resetTimer();
    updateDisplay();
} 

//start game
startGame();
instructions();