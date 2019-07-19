const board = document.getElementById('board');
const cols = 5;
const rows = 5;
const start = document.querySelector('.start');
const reset = document.querySelector('.reset');
const lifesCounter = document.querySelector('.lifes_counter');
const scoreCounter = document.querySelector('.score_counter');
const timeCounter = document.querySelector('.time_counter');
let timer; 
let highlightRandom;
let endHighlight;
let round;
let random;
let clickedId;

for (let i = 0; i < cols; i ++) {
    const divRow = document.createElement('div');
    divRow.id = "row-" + i;
    board.appendChild(divRow);
    for (let j = 0; j < rows; j ++) {
        const div = document.createElement('div');
        div.id = "tile-" + i + j;
        div.setAttribute('class', 'tile');
        div.setAttribute('data-clicked', 'false');
        divRow.appendChild(div);
    }
}

const tiles = document.querySelectorAll('.tile');

const roundCounter = () => {
    let counter = timeCounter.innerText;
    if(counter > 0){
        counter--;
        timeCounter.innerText = counter;
    } else {
        timeCounter.innerText = 0;
        return;
    }
}

const startCounter = () => {
    timer = setInterval(roundCounter, 1000);
    start.setAttribute('disabled', 'true');
}

const resetTiles = () => {
        tiles.forEach(el => {
        el.style = "background: #5a6196";
        el.setAttribute('data-clicked', 'false');
    });
}
   
const resetGame = () => {
    clearInterval(timer);
    clearInterval(highlightRandom);
    lifesCounter.innerText = 3;
    scoreCounter.innerText = 0;
    timeCounter.innerText = 60;
    start.removeAttribute('disabled');
    resetTiles();
    tiles.forEach(el => el.classList.remove('active'));
}

const selectRandom = () => {
   if(timeCounter.innerText > 0) {
        let random1 = Math.floor(Math.random() * cols);
        let random2 = Math.floor(Math.random() * rows);
        resetTiles();
        document.getElementById("tile-" + random1 + random2).style = 'background: chartreuse';
        endHighlight = setTimeout(resetTiles, 2000);
        random = random1.toString() + random2.toString();
        return random;
    } else {
        alert("koniec gry, zdobyles " +  scoreCounter.innerText + " punktów");
        resetGame();
    }
 }

 const roundCycle = () => {
       highlightRandom = setInterval(selectRandom, 3000); 
}

const startGame = () => {
    selectRandom();
    startCounter();
    roundCycle();
    tiles.forEach(el => el.classList.add('active'));
}


start.addEventListener('click', startGame);
reset.addEventListener('click', resetGame);

tiles.forEach(el => {
    el.addEventListener('click', () => {
        clickedId = el.id.slice(-2);
        if((clickedId === random) && (el.style.background === "chartreuse")) {
            if(el.getAttribute('data-clicked') === 'false') {
                let counter = parseFloat(scoreCounter.innerText);
                scoreCounter.innerText = counter + 1;
            }
            el.setAttribute('data-clicked', 'true');
        } else {
            let counter = parseFloat(lifesCounter.innerText);
            if(lifesCounter.innerText > 0) {
                lifesCounter.innerText = counter - 1;
                alert('straciłeś zycie');
            } else {
                alert("koniec gry");
                resetGame();
            }
        }
    })
});

//wytyczne:
//https://gitlab.gwo.pl/recruitment/zadanie-rekrutacyjne---javascript
