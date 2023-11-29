const player1 = document.querySelector("#player1")
const player2 = document.querySelector("#player2")

const tabuleiro = document.querySelector("#tabuleiro")
const boxs = document.querySelectorAll('.boxs')
let turno = 'x'
let gameOver = false

tabuleiro.addEventListener('click', Jogada)

document.addEventListener('keyup', (event) =>{
    if(event.key == "Enter"){
        Jogar()
    }
})
function Jogar(){
    document.querySelector("#inicial").classList.add('hidden')
    document.querySelector("#jogo").classList.remove("hidden")
    document.querySelector("#name1").innerHTML = player1.value
    document.querySelector("#name2").innerHTML = player2.value
}

function Jogada(event){
    if(event.target.classList.contains('boxs')){
        if(!event.target.classList.contains('x') && !event.target.classList.contains('o')){
            event.target.classList.add(turno)
            event.target.textContent = turno
            
          checarVitoria(turno)
            
            if(turno.includes('x')){
                turno = 'o'
            }else{
                turno = 'x'
            }

        
            if(gameOver){
                GameOver()
            }

            
        }
    }
}

function checarVitoria(valor){
    const possibilidades = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]

    for(let line = 0; line < possibilidades.length; line++){
        let win = possibilidades[line]
        let cont = 0

        for(let atual = 0; atual < win.length; atual++){
            let caixa = boxs[win[atual]]
            if(caixa.classList.contains(valor)){
                cont++
            }
        }

        if(cont == 3){
            gameOver = true
            break
        }
    }
}

function GameOver(){
    alert('Game Over')
    for(let i of boxs){
        i.classList.remove('x')
        i.classList.remove('o')
        i.textContent = ''
    }
    gameOver = false
}