
const canvas = document.getElementById('tabuleiro');
const tabuleiroctx = canvas.getContext('2d');

tabuleiroctx.canvas.width = COLUNAS * TAMANHOBLOCO;
tabuleiroctx.canvas.height = LINHAS * TAMANHOBLOCO;
tabuleiroctx.scale(TAMANHOBLOCO, TAMANHOBLOCO);

function limparLinha() {
    let quantidadeLinhas = 1;
    equacao: for (let y = quadro.length - 1; y > 0; --y) {
        for (let x = 0; x < quadro[y].length; ++x){
            if (quadro[y][x] === 0) {
                continue equacao;
            }
        }
        
        const linha = quadro.splice(y, 1)[0].fill(0);
        quadro.unshift(linha);
        ++y;
        jogador.pontuacao += quantidadeLinhas * 10;
        

        quantidadeLinhas *= 2;
        jogador.linhas = quantidadeLinhas;

    }
}
function criarTabuleiro(w = COLUNAS , h = LINHAS) {
    const blocosParados = [];
    while (h--) {
        blocosParados.push(new Array(w).fill(0))
    }
    return blocosParados;
}
function detectarColisao(quadro, jogador) {
    const peca = jogador.peca;
    const posicao = jogador.posicao;
    
    for (let y = 0; y < peca.length; ++y) {
        for (let x = 0; x < peca[y].length; ++x) {
            if (peca[y][x] !== 0 &&
               (quadro[y + posicao.y] && quadro[y + posicao.y][x + posicao.x]) !== 0) 
               { console.log("Detectado colisao!") ; return true; }
        }
    }
    return false;
}
function juntarBlocos(blocosParados, jogador) {
    const posicao = jogador.posicao
    jogador.peca.forEach((linha, y) => {
        linha.forEach( (valor, x) => {
            if (valor !== 0) {
                blocosParados[y + posicao.y][x + posicao.x] = valor;
            }
        });
    });
}
function rodarPeca(peca, direcao) {
    for (let y = 0; y < peca.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                peca[x][y],
                peca[y][x],
            ] = [
                peca[y][x],
                peca[x][y],
            ];
        }
    }

    if (direcao > 0) {
        peca.forEach(row => row.reverse());
    } else {
        peca.reverse();
    }
}
function girarPecaJogador(direcao) {
    const pos = jogador.posicao.x;
    let deslocamento = 1;
    rodarPeca(jogador.peca, direcao);
    while (detectarColisao(quadro, jogador)) {
        jogador.posicao.x += deslocamento;
        deslocamento = -(deslocamento + (deslocamento > 0 ? 1 : -1));
        if (deslocamento > jogador.peca[0].length) {
            rodarPeca(jogador.peca, -direcao);
            jogador.posicao.x = pos;
            return;
        }
    }
}
function desenharMatriz(peca, deslocamento ) {
    peca.forEach((linha,y) => {
        linha.forEach((valor, x) =>{
            if (valor !== 0) {
                tabuleiroctx.fillStyle = cores[valor];
                tabuleiroctx.fillRect(x + deslocamento.x, y + deslocamento.y, 1 , 1);
            }
    
        })
    })
}
function desenharJogo() {
    tabuleiroctx.clearRect(0, 0, canvas.width, canvas.height);
    
    desenharMatriz(quadro, {x:0, y:0});
    if (jogador.peca == null){
        reiniciarJogador();
    }
    desenharMatriz(jogador.peca,jogador.posicao);

    

}
function arrastarJogador(movimento) {
    jogador.posicao.x += movimento;
    if (detectarColisao( quadro , jogador)) {
        jogador.posicao.x -= movimento; 
    }

}
function abaixarJogador() {
    
    jogador.posicao.y++;

    if (detectarColisao(quadro,jogador)) {
        jogador.posicao.y--;
        juntarBlocos(quadro,jogador);
        limparLinha();
        reiniciarJogador();
            
    }
    
    contagemBlocoCaindo = 0;
}
function reiniciarJogador() {
    jogador.posicao.y = 0;
    jogador.posicao.x = 5;

    const pecas = 'TJLOSZI';
    jogador.peca = LISTAPECAS[pecas[pecas.length * Math.random() | 0]];
    
    if (detectarColisao(quadro,jogador)) {
        quadro.forEach(linha => linha.fill(0));
    }

}
function jogar(botao) {
    atualizarframe();

    let audio = document.getElementById("audio");
    audio.play();

    document.addEventListener("keydown", (evt) => {
        console.log(evt.key);
        if (LISTACHAVES[evt.key] ){
            
            if ( LISTACHAVES[evt.key].tipoMovimento == "y") {
                abaixarJogador();
            } 
            if (LISTACHAVES[evt.key].tipoMovimento == "x") {
                arrastarJogador(LISTACHAVES[evt.key].velocidadeMovimento);
            }

            if (LISTACHAVES[evt.key].tipoMovimento == "r") {
                girarPecaJogador(LISTACHAVES[evt.key].velocidadeMovimento);
            }



            
        }
    });
}



//
// configuracoes iniciais do jogo
//

let contagemBlocoCaindo = 0;
let intervaloBlocos = 1000; // milisegundos

const quadro = criarTabuleiro();
const jogador = {
    posicao: {x:5, y: 0},
    peca: null,
    pontuacao: 0,
    linhas: 0,
}
const cores = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

function atualizarPontuacao() {
    document.getElementById("pontuacao").innerText = jogador.pontuacao;
}
function atualizarLinhas() {
    document.getElementById("linhas").innerText = jogador.linhas;
}




let ultimotempo = 0;
function atualizarframe(tempo = 0) {
    const diferencatempo = tempo - ultimotempo;
    
    contagemBlocoCaindo += diferencatempo;
    if ( contagemBlocoCaindo > intervaloBlocos) {
        abaixarJogador();
    }
    ultimotempo = tempo;

    atualizarLinhas();
    atualizarPontuacao();

    desenharJogo();
    requestAnimationFrame(atualizarframe);
}