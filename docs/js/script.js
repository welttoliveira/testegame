const paises = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Equador", "Guiana", "Paraguai", "Peru", "Suriname", "Uruguai", "Venezuela"];
let palavraEscolhida;
let exibicaoPalavra;
let letrasDigitadas;
let tentativasRestantes;
let erros;

// Iniciando o jogo
function iniciar() {
    // Sorteando a palavra
    palavraEscolhida = paises[Math.floor(Math.random() * paises.length)].toLowerCase();

    // Inicializar a exibição com os '_'
    exibicaoPalavra = Array(palavraEscolhida.length).fill('_');

    // Inicializar a lista de letras digitadas
    letrasDigitadas = [];

    // Número máximo de tentativas
    tentativasRestantes = 7;

    // Inicializar o número de erros
    erros = 0;

    // Limpar mensagem de vitória/derrota
    document.getElementById('mensagem').innerText = '';

    // Reabilitar campo de entrada
    document.getElementById('entrada').disabled = false;
    document.getElementById('entrada').value = '';

    // Redefinir a imagem da forca para a inicial
    document.getElementById('imagem').src = `img/forca0.png`;

    atualizarExibicao();
}

function atualizarExibicao() {
    document.getElementById('exibicao-palavra').innerText = exibicaoPalavra.join(' ');
    document.getElementById('imagem').src = `img/forca${erros}.png`;

    // Verificar se o jogo terminou
    if (tentativasRestantes === 0) {
        encerrarjogo('Você perdeu! A palavra era: ' + palavraEscolhida);
    } else if (!exibicaoPalavra.includes('_')) {
        encerrarjogo('Parabéns, você ganhou!');
    }
}
function chutarLetra() {
    const entrada = document.getElementById('entrada');
    const letra = entrada.value.toLowerCase();
    if (!letra.match(/[a-zà-ùç]/i)) {
        alert('Por favor, digite uma letra válida!');
        return;
    }
    if (letrasDigitadas.includes(letra)) {
        alert('Você já tentou essa letra!');
        return;
    }

    letrasDigitadas.push(letra);
    if (palavraEscolhida.includes(letra)) {
        for (let i = 0; i < palavraEscolhida.length; i++) {
            if (palavraEscolhida[i] === letra) {
                exibicaoPalavra[i] = letra;
            }
        }
    } else {
        tentativasRestantes--;
        erros++;
    }
    entrada.value = '';
    atualizarExibicao();
}

function encerrarjogo(mensagem){
    // Exibir a mensagem
    document.getElementById('mensagem').innerText = mensagem;

    // Desabilitar campo de digitação
    document.getElementById('entrada').disabled = true;

    // Limpar o campo de entrada
    document.getElementById('entrada').value = '';
}

window.onload = iniciar;
