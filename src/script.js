
const player1 = document.querySelector("#player1")
const player2 = document.querySelector("#player2")
const tabuleiro = document.querySelector("#tabuleiro")
const boxs = document.querySelectorAll('.boxs')




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

tabuleiro.addEventListener('click', Jogada)

let turno = 'x'
let contX = 0
let contO = 0
let contEmpate = 0
let gameOver = false

document.querySelector("#contEmpate").innerHTML = contEmpate
document.querySelector("#turn").innerHTML = `Vez de ${turno.toUpperCase()}`

function Jogada(event){
    if(event.target.classList.contains('boxs')){
        if(!event.target.classList.contains('x') && !event.target.classList.contains('o')){
            event.target.classList.add(turno)
            event.target.textContent = turno
            
            checarVitoria(turno)
            
            if(turno.includes('x')){
                turno = 'o'
                document.querySelector("#turn").innerHTML = `Vez de ${turno.toUpperCase()}`
                document.querySelector('#jogador1').classList.remove('bg-zinc-400')
                document.querySelector('#jogador2').classList.add('bg-zinc-400')
                
            }else{
                turno = 'x'
                document.querySelector("#turn").innerHTML = `Vez de ${turno.toUpperCase()}`
                document.querySelector('#jogador1').classList.add('bg-zinc-400')
                document.querySelector('#jogador2').classList.remove('bg-zinc-400')
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
            Win(boxs[win[0]], boxs[win[1]], boxs[win[2]], valor)
            gameOver = true
            break
        }
    }

    let casasJogadas = 0
    for(let i = 0; i < boxs.length; i++){
        if(boxs[i].classList.contains('x') || boxs[i].classList.contains('o')){
            casasJogadas++
        }
    }

    if(casasJogadas == 9 && gameOver == false){
        contEmpate++
        document.querySelector('#contEmpate').innerHTML = contEmpate
        GameOver()
    }

}

function GameOver(){
    for(let i = 0 ; i < boxs.length; i++){
        boxs[i].classList.remove('x', 'o', 'bg-red-400');
        boxs[i].textContent = ''
    }
    gameOver = false
    tabuleiro.addEventListener("click", Jogada)
   
}

function Win(one, two, three, valor) {  
    const line = [one, two, three]
    line.map( (i) => i.classList.add('bg-red-400'))
    if(valor == 'x'){
        contX++
        document.querySelector("#cont1").innerHTML = contX

    }else{
        contO++
        document.querySelector("#cont2").innerHTML = contO
    }
    tabuleiro.removeEventListener("click", Jogada)
    setTimeout( GameOver, 1000)
}

function Resetar(){
    gameOver = false
    tabuleiro.addEventListener("click", Jogada)
    turn = 'x'
    contX = 0
    contO = 0
    contEmpate = 0
    document.querySelector("#turn").innerHTML = `Vez de ${turno.toUpperCase()}`
    document.querySelector("#cont1").innerHTML = contX
    document.querySelector("#cont2").innerHTML = contO
    document.querySelector('#contEmpate').innerHTML = contEmpate
    for(let i = 0 ; i < boxs.length; i++){
        boxs[i].classList.remove('x', 'o', 'bg-red-400');
        boxs[i].textContent = ''
    }
}