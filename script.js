const PAYS_API = "https://restcountries.com/v3.1/all";
const SEARCH_BY_NAME = "https://restcountries.com/v3.1/name/"

const IMG_TO_GUESS = document.querySelector('.theImageToGuess');
const BUTTON_SEARCH = document.querySelector('#searchBtn');
const USER_TEXT = document.querySelector('.userInput');
const RESULT_TEXT = document.querySelector('.result');
const ANSWER_TEXT = document.querySelector('.answer');
let countryToguess = "";
let trad_countryToguess = "";
// const CARD_LIST_HTML = document.querySelector('#CardList');
// const buttonsAllCountries = document.querySelector('#allCountriesBtn')


async function Search(url){
    try{
        const res = await fetch(url);
        const repos = await res.json();
        return repos;
    } catch(err){
        console.error(err);
        //! todo: Faire une fonction pour dire à l'user qu'il y a eu une erreur de chargement.

    }
}
Search(PAYS_API).then(showResult);

function startTheGame(){
    disappearElement();
    appearElement();
    reload();
}

function appearElement(){
    // Faire apparaitre les élements de jeu
}

function disappearElement(){
    //Faire disparaitre les boutons pour lancer le jeu
}

function reload(){
    Search(PAYS_API).then(showResult);
    RESULT_TEXT.textContent = "";
    ANSWER_TEXT.textContent = "";
}

function showResult(data){
    const length = Object.keys(data).length
    const country = generateOneObjectFromATable(data, length);
    IMG_TO_GUESS.src = country.flags.png;
    countryToguess = country.name.common;
    trad_countryToguess = country.translations.fra.common;

    console.log("Le pays à deviner est :" + countryToguess);
    console.log("Traduction :" + trad_countryToguess);
}

function generateOneObjectFromATable(data, dataLength){
    let randomIndex = Math.floor(Math.random() * dataLength)
    return data[randomIndex];
}

function verifyWithFlag() {
    const answer = USER_TEXT.value;
    const check = answer
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[-]/gi, ' ')
        .toUpperCase();
    const trad_countryToguesstest = trad_countryToguess
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[-]/gi, ' ')
            if (countryToguess !== ""){
                if (check === countryToguess.toUpperCase() || check === trad_countryToguesstest.toUpperCase()){
                    win();
                } else {
                    loose();
                }
                nextGuess();
            } else {
                RESULT_TEXT.textContent = "Sorry, the attempt to connect to the server failed.";
            }

}
function win(){
    RESULT_TEXT.textContent = "Bravo!";
    RESULT_TEXT.classList.add("greenText");
    RESULT_TEXT.classList.remove("redText");
}
function loose(){
    RESULT_TEXT.textContent = "Nop!";
    RESULT_TEXT.classList.add("redText");
    RESULT_TEXT.classList.remove("greenText");
    ANSWER_TEXT.textContent = `The answer was ${countryToguess}`;

}
async function nextGuess(){
    setTimeout(reload, 800);
    USER_TEXT.value = "";
}




BUTTON_SEARCH.addEventListener("click", () => verifyWithFlag());
document.addEventListener( "keydown", (e) => {
    if (e.key === "Enter"){
        verifyWithFlag();
    }
});