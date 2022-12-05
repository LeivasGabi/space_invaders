const grade = document.getElementById("grade");
const pontuacao = document.getElementById("pontuacao");

for (let i = 0; i < 255; i++){
    let quadrado = document.createElement("div");
    grade.appendChild(quadrado);
}
const quadrados = document.querySelectorAll("#grade div");
const invasores = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
];

let posicaoJogador = 202;
let tamanho = 15;
let direcao = 1;
let descer = false;
let invasoresID;
let atingidos = [];
let pontos = 0;

quadrados[posicaoJogador].classList.add("jogador");

invasores.forEach(invasor => {
    quadrados[invasor].classList.add("invasor");
});

document.addEventListener("keydown", moverJogador);
invasoresID = setInterval(moverInvasores, 300);
document.addEventListener("keyup",atirar);

//funcoes
function moverJogador(e){
    quadrados[posicaoJogador].classList.remove("jogador");

    if(e.keyCode == 37){ //esquerda
        if(posicaoJogador % tamanho != 0){
            posicaoJogador--;
        }
    }else if (e.keyCode == 39){ //direita
        if(posicaoJogador % tamanho != tamanho -1){
            posicaoJogador++;
        }
    }
    quadrados[posicaoJogador].classList.add("jogador");
}
function moverInvasores(){
    const bordaEsquerda = invasores[0] % tamanho ==0;
    const bordaDireita = invasores[invasores.length - 1] % tamanho == tamanho -1;

    invasores.forEach(invasor => {
        quadrados[invasor].classList.remove("invasor");
    });
    if(bordaEsquerda && direcao ==-1){
        direcao = 1;
        descer = true;
    }else if(bordaDireita && direcao ==1){
        direcao =- 1;
        descer = true;
    }
    for(let i=0; i< invasores.length; i++){
        invasores[i] += descer ? tamanho : direcao;
    }  
     
    descer = false;

    invasores.forEach((invasor,indice) => {
        if(!atingidos.includes(indice)){
            quadrados[invasor].classList.add("invasor");
        }
    });
    if(invasores[invasores.length -1] > quadrados.length - tamanho){
        alert("Você perdeu!");
        clearInterval(invasoresID);
    }
    if(quadrados[posicaoJogador].classList.contains("invasor")){
        alert("você perdeu!");
        quadrados[posicaoJogador].classList.add("kabum");
        clearInterval(invasoresID);
    }
    if(atingidos.length == invasores.length){
        alert("Você venceu!");
        clearInterval(invasoresID);
    }
}
function atirar(e){
    let tiroId;
    let posicaoTiro = posicaoJogador;

    if(e.keyCode == 32){
        tiroId = setInterval(moverTiro, 100);
    }
    function moverTiro(){
        quadrados[posicaoTiro].classList.remove("tiro");
        posicaoTiro -= tamanho;
        quadrados[posicaoTiro].classList.add("tiro");

        if(quadrados[posicaoTiro].classList.contains("invasor")){
            quadrados[posicaoTiro].classList.remove("tiro");
            quadrados[posicaoTiro].classList.remove("invasor");
            quadrados[posicaoTiro].classList.add("kabum");

            setTimeout(() => {
                quadrados[posicaoTiro].classList.remove("kabum");

            },300);

            clearInterval(tiroId);
            atingidos.push(invasores.indexOf(posicaoTiro));
            pontos++;
            pontuacao.innerHTML = pontos;
        }

        if(posicaoTiro < tamanho){
            clearInterval(tiroId);
            quadrados[posicaoTiro].classList.remove("tiro");
        }
    }
}   

