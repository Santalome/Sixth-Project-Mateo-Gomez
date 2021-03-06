const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');
let missed = 0;

const phrases = [
    "honda",
    "toyota",
    "suzuki",
    "nissan",
    "acura",
    "i want a car",
    "jeep",
    "tesla"
];

btnReset.addEventListener('click', () => {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(array){
    let nRandom = Math.floor(Math.random()*(phrases.length));
    return array[nRandom];
}

function addPhraseToDisplay(array){
    for(let i = 0; i < array.length; i++){
        let li = document.createElement('li');
        li.textContent = array[i];
        let ul = phrase;
        ul.appendChild(li);
        if(array[i] != ' '){
            li.className = 'letter';
        }else{
            li.className = 'space';
        }
    }
}

const randomPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randomPhrase);

function checkLetter(button){
    let allLi = document.querySelectorAll('li');
    let match = null;
    for(let i = 0; i < allLi.length; i++){
        if(button == allLi[i].textContent){
            allLi[i].classList.add("show");
            match = button;
        }
    }
    return match;
}

qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === "BUTTON"){
        e.target.classList.add("chosen");
        e.target.setAttribute('disabled', ' ');
        let btn = e.target.textContent;
        let letter = checkLetter(btn);


        if(btn != letter){
            let heart = document.querySelectorAll('.tries img');
            let source = "./images/lostHeart.png";
            heart[missed].src = source;
            missed ++;
        }
    }
    checkWin(); 
});

function checkWin(){
    let cLetter = document.querySelectorAll('.letter');
    let cShow = document.querySelectorAll('.show');
    let overlay = document.getElementById('overlay');
    let headLine = document.querySelector('#overlay .title');
    if(cShow.length == cLetter.length){
        overlay.className = "win";
        headLine.textContent = "You win !";
        overlay.style.display = 'flex';
        btnReset.style.display = 'none';
    }else if(missed > 4){
        overlay.className = "lose";
        headLine.textContent = "You lose !";
        overlay.style.display = 'flex';
        btnReset.style.display = 'none';
    }
}