console.log('Flappy Bird [Micael]')

const somDe_HIT = new Audio();
somDe_HIT.src = './Efeitos/efeitos_hit.wav';
const sprites = new Image();
sprites.src ='./sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function fazColisao(a, b){
    var aY = a.y + a.altura;
    var bY = b.y;
    
    if(aY >= bY ){
        return true;
    }else{
        return false;
    }
}

function criaFlappyBird(){

    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 34,
        altura: 24,
        x:10, 
        y:50,
        velocidade: 0,
        gravidade: 0.25,
        pulo: 4.6,
        pula(){
            console.log('antes',flappyBird.velocidade )
            flappyBird.velocidade =  - flappyBird.pulo;
            console.log('depois',flappyBird.velocidade )
        },
        atualiza(){
            if(fazColisao(flappyBird,chão)){
                console.log('fez colisao');
                somDe_HIT.play();
                setTimeout(() => {
                    
                    mudaParaTela(telas.início);
                },500);
                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
        desenha(){
            contexto.drawImage(
                sprites, 
                flappyBird.spriteX, flappyBird.spriteY, 
                flappyBird.largura, flappyBird.altura, 
                flappyBird.x, flappyBird.y, 
                flappyBird.largura, flappyBird.altura
            );
         }
    };
    return flappyBird;
}


const chão = {
    spriteX: 0,
    spriteY: 612,
    largura: 224,
    altura: 110,
    x:0, 
    y:canvas.height-110,
    desenha(){
        contexto.drawImage(
            sprites,
            chão.spriteX, chão.spriteY,
            chão.largura, chão.altura,
            chão.x, chão.y,
            chão.largura, chão.altura
        );
        contexto.drawImage(
            sprites,
            chão.spriteX, chão.spriteY,
            chão.largura, chão.altura,
            chão.largura, chão.y,
            chão.largura, chão.altura
        );
    },
};

const fundo ={
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x:0, 
    y:canvas.height-314,
    desenha(){
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.x, fundo.y,
            fundo.largura, fundo.altura
        );
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY,
            fundo.largura, fundo.altura,
            fundo.largura, fundo.y,
            fundo.largura, fundo.altura
        );
    }
}

const telaInicio ={
    spriteX: 134,
    spriteY: 0,
    largura:175,
    altura:151,
    x:(canvas.width/2) - 175/2,
    y:50,
    desenha(){
        contexto.drawImage(
        sprites,
        telaInicio.spriteX, telaInicio.spriteY,
        telaInicio.largura, telaInicio.altura,
        telaInicio.x, telaInicio.y,
        telaInicio.largura, telaInicio.altura,
        );
    }
    
}
const globais = {}
let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}
const telas = {
    início:{
        inicializa(){
         globais.flappyBird = criaFlappyBird();
        },
        desenha(){
            fundo.desenha();
            chão.desenha();
            globais.flappyBird.desenha();
            telaInicio.desenha();
        },
        click(){
            mudaParaTela(telas.jogo);
        },
        atualiza(){

        },
        
    }
};

telas.jogo ={
    desenha(){
        fundo.desenha();
        chão.desenha();
        globais.flappyBird.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.flappyBird.atualiza();
    },
}

function loop(){
   
    telaAtiva.desenha();
    telaAtiva.atualiza();
   

    requestAnimationFrame(loop);
}

window.addEventListener("click", function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});
mudaParaTela(telas.início);
loop();
