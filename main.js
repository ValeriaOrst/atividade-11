console.log('Olá mundo!');

// Criando um novo elemento 
let novoElemento = document.createElement('h1');
// Alterando o conteúdo de texto do elemento
novoElemento.innerText = 'Hello, World! English! (Inglês) Ok?!';
// Selecionando o elemento body
let elementoBody = document.body;
// Colocando o novo elemento no body
elementoBody.appendChild(novoElemento);
// Função para gerar uma cor aleatória

novoElemento.style.backgroundColor = 'blue';
novoElemento.style.color = 'yellow';


// Função para gerar uma cor aleatória
function gerarCorAleatoria() {
    const letras = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
        cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
}

// Função para mudar a cor de fundo a cada segundo
function mudarCorDeFundo() {
    document.body.style.backgroundColor = gerarCorAleatoria();
}
setInterval(mudarCorDeFundo, 1000);
mudarCorDeFundo(); // Chama a função imediatamente

// Função para criar uma forma (coração ou estrela)
function criarForma(tipo) {
    const forma = document.createElement('div');
    forma.style.position = 'absolute';
    forma.style.fontSize = Math.random() * 50 + 20 + 'px'; // Tamanho aleatório
    forma.style.color = gerarCorAleatoria(); // Cor aleatória
    forma.textContent = tipo === 'coração' ? '❤️' : '⭐'; // Emoji

    // Posição inicial aleatória
    forma.style.left = Math.random() * window.innerWidth + 'px';
    forma.style.top = Math.random() * window.innerHeight + 'px';

    document.body.appendChild(forma);

    // Mover a forma para um lugar aleatório a cada 2 segundos
    setInterval(() => {
        forma.style.left = Math.random() * window.innerWidth + 'px';
        forma.style.top = Math.random() * window.innerHeight + 'px';
    }, 2000);
}

// Criar várias formas
for (let i = 0; i < 10; i++) {
    const tipo = Math.random() < 0.5 ? 'coração' : 'estrela'; // 50% de chance de ser coração ou estrela
    criarForma(tipo);
}

// Criar um elemento canvas e adicioná-lo ao corpo do documento
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Definir dimensões do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Desenhar o cachorrinho
function drawDog(x, y) {
    ctx.fillStyle = 'brown';
    ctx.fillRect(x, y, 50, 30); // Corpo
    ctx.fillStyle = 'white';
    ctx.fillRect(x + 35, y + 5, 10, 10); // Olho
    ctx.fillStyle = 'black';
    ctx.fillRect(x + 40, y + 8, 5, 5); // Pupila
    ctx.fillRect(x + 10, y + 20, 10, 10); // Pata
    ctx.fillRect(x + 30, y + 20, 10, 10); // Pata
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y + 10, 10, 5); // Língua
}

// Variáveis para posição e velocidade do cachorrinho
let dogY = canvas.height - 50;
let dogX = canvas.width / 2 - 25;
let speedY = -2;

// Função para desenhar uma bola que rebate nas bordas e muda de cor
function drawBola(x, y, raio, velocidadeX, velocidadeY) {
    let cor = gerarCorAleatoria();
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    ctx.fill();

    // Atualizar posição
    x += velocidadeX;
    y += velocidadeY;

    // Verificar colisões com as bordas
    if (x + raio > canvas.width || x - raio < 0) {
        velocidadeX = -velocidadeX; // Inverter direção horizontal
        cor = gerarCorAleatoria(); // Mudar cor ao rebater
    }
    if (y + raio > canvas.height || y - raio < 0) {
        velocidadeY = -velocidadeY; // Inverter direção vertical
        cor = gerarCorAleatoria(); // Mudar cor ao rebater
    }

    requestAnimationFrame(() => drawBola(x, y, raio, velocidadeX, velocidadeY));
}

// Iniciar a animação da bola
const raioBola = 30;
const velocidadeXBola = 2;
const velocidadeYBola = 2;
drawBola(canvas.width / 2, canvas.height / 2, raioBola, velocidadeXBola, velocidadeYBola);

// Função para desenhar um arco-íris
function drawArcoIris() {
    const coresArcoIris = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
    const larguraArcoIris = canvas.width / coresArcoIris.length;

    for (let i = 0; i < coresArcoIris.length; i++) {
        ctx.fillStyle = coresArcoIris[i];
        ctx.fillRect(i * larguraArcoIris, 0, larguraArcoIris, canvas.height);
    }
}

// Desenhar o arco-íris
drawArcoIris();

// Desenhar o cachorrinho na posição inicial
drawDog(dogX, dogY);

// Função para atualizar a animação do cachorrinho
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpar o canvas
    drawDog(dogX, dogY); // Desenhar o cachorrinho na posição atual
    dogY += speedY; // Atualizar a posição Y do cachorrinho

    // Verificar se o cachorrinho saiu da tela e reposicionar
    if (dogY < -50) {
        dogY = canvas.height;
    }

    requestAnimationFrame(animate); // Repetir a animação
}

// Iniciar a animação do cachorrinho
animate();
