
const btnPlay = document.getElementById("btn-play");
const gridContainerElement = document.getElementById("grid-container")
const difficult = document.getElementById("difficult");
let bombsArr = [];
let gridArr = [];
let gameover;
let win;

const result = document.getElementById('result');
const mode = document.getElementById('mode');


function bombGenerator(){
    bombsArr=[];

    do{
        if(difficult.value === 'hard'){
            bomb = generateRandomNumbers(1,49);
            //console.log('è difficile');
        }else if(difficult.value === 'medium'){
            bomb = generateRandomNumbers(1,81);
            //console.log('è medio');
        }else{
            bomb = generateRandomNumbers(1,100);
            //console.log('è facile');
        }

        if(!(bombsArr.includes(bomb))){

            bombsArr.push(bomb)
        }

    }while(bombsArr.length < 16)

    
}

/**Restituisce numero casuale tra min e max
 * Description
 * @param {any} min
 * @param {any} max
 * @returns {any}
 */
function generateRandomNumbers(min, max){
   let random = Math.floor(Math.random()*(max - min + 1) + min)

   return random
}


/**
 * Crea una griglia in base al livello della difficoltà impostato (hard, medium,easy)
 * @param {any} difficultLevel
 * @returns {any}
 */
function createGrid(difficultLevel){
    let maxlenght;

    if (difficultLevel == "easy") {
        maxlenght = 100;
    }else if( difficultLevel == "medium"){
        maxlenght = 81;
    }else{
        maxlenght=49;
    }

    
    for(let i = 1; i <= maxlenght; i++){
        createNewSquare(gridContainerElement, i, difficult.value )
        
    }
    
}

/**
 * Crea elemento div con classe "square" e lo aggiunge a un elemento genitore con contenuto
 * @param {elemento genitore, testo dell'elemento creato} parentElement
 * @returns {any}
 */
function createNewSquare(parentElement, text, classInput){

    //Crea elemento div con classe "square" e lo aggiunge a un elemento esistente
    let square = document.createElement("div");
        square.classList="square";
        square.classList.add(classInput);
        square.innerText = text;

        
        parentElement.append(square);
        
        square.addEventListener('click', function(){
            //console.log(gridArr)
            let score = document.querySelectorAll('.selected');

            if(win===true){

            }else if(bombsArr.includes(parseInt(square.innerText))){

                gameover = true;
                result.innerText = `hai perso! il tuo punteggio è di ${score.length}`;
                result.style.color='red';

                //square.classList.add("bomb");
                for(let i = 0 ; i < bombsArr.length; i++){
                    gridArr[parseInt(bombsArr[i] - 1)].classList.add('bomb');
                    //console.log(bombsArr)
                }

            }else{

                if(gameover === false && win === false){

                    square.classList.add("selected");
                    score = document.querySelectorAll('.selected');

                    if(score.length == gridArr.length - bombsArr.length){
                        win = true;
                        result.style.color = 'green';
                        result.innerText = `hai vinto! il tuo punteggio è di ${score.length}`
                        for(let i = 0 ; i < bombsArr.length; i++){
                            gridArr[parseInt(bombsArr[i] - 1)].classList.add('bomb');
                            //console.log(bombsArr)
                        }
                    }
                }
            }
            //console.log(square.innerText)
    
        });
    }

btnPlay.addEventListener('click', ()=>{

    
    //ripulisci la griglia genitore;
    gridContainerElement.innerHTML="";
    result.innerText = ""
    
    gameover=false;
    win=false;
    
    bombGenerator();
    
    
    btnPlay.innerText="Replay!"
    
    //Crea una nuova griglia;
    createGrid(difficult.value);
    gridArr = document.querySelectorAll('.square');

    if(mode.value=='cheat'){
        for(let i = 0 ; i < bombsArr.length; i++){
            gridArr[parseInt(bombsArr[i] - 1)].style.background='rgba(235, 8, 8, 0.336)';
            //console.log(bombsArr)
        }
    }
    
   
})