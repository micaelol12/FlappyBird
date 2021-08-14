console.log('Flappy Bird [Micael]')

const sprites = new Image();
sprites.src ='./sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 34,
    altura: 24,
    x:10, 
    y:50,
    velocidade: 0,
    gravidade: 0.25,
    atualiza(){
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

const chão = {
    spriteX: 0,
    spriteY: 613,
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



function loop(){
    flappyBird.atualiza();
    fundo.desenha();
    chão.desenha();
    flappyBird.desenha();
    


    requestAnimationFrame(loop);
}
loop();
