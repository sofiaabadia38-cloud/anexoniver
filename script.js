let contador = document.getElementById("contador");
let carta = document.getElementById("carta");
let mensagem = document.getElementById("mensagem");
let musica = document.getElementById("musica");
let chuva = document.getElementById("chuva-textos");
let nome = document.getElementById("nome-aniversariante");
let livroContainer = document.getElementById("livro-container");
let verVideo = document.getElementById("ver-video");
let videoFinal = document.getElementById("video-final");

let segundos = 3;

// -----------------------------
// CONTAGEM REGRESSIVA
// -----------------------------
const intervalo = setInterval(() => {
  contador.innerText = segundos;
  segundos--;
  if(segundos < 0){
    clearInterval(intervalo);
    contador.style.display = "none";
    iniciarChuva();
  }
}, 1000);

// -----------------------------
// CHUVA DE FELIZ ANIVERSÁRIO MULTILÍNGUE
// -----------------------------
const frases = [
  "Happy Birthday 🎉", "Feliz Cumpleaños 🎉", "Joyeux Anniversaire 🎉",
  "Alles Gute zum Geburtstag 🎉", "Buon Compleanno 🎉", "生日快乐 🎉",
  "お誕生日おめでとう 🎉", "생일 축하합니다 🎉", "С днём рождения 🎉",
  "عيد ميلاد سعيد 🎉", "Feliz Aniversário 🎉", "Grattis på födelsedagen 🎉"
];

function criarFelizAniversario() {
  const div = document.createElement("div");
  div.className = "textoCai";
  div.innerText = frases[Math.floor(Math.random() * frases.length)];
  div.style.left = Math.random() * (window.innerWidth - 200) + "px";
  const cores = ["#8B0000", "#B22222", "#DC143C", "#FF4500"];
  div.style.color = cores[Math.floor(Math.random() * cores.length)];
  div.style.animationDuration = (3 + Math.random() * 3) + "s";
  chuva.appendChild(div);
  setTimeout(() => { div.remove(); }, 6000);
}

function iniciarChuva() {
  let intervaloChuva = setInterval(criarFelizAniversario, 100);

  setTimeout(() => {
    clearInterval(intervaloChuva);
    chuva.style.display = "none";
    nome.style.display = "block";

    setTimeout(() => {
      nome.style.display = "none";
      carta.style.display = "block";
    }, 2000);
  }, 5000);
}

// -----------------------------
// ABRIR CARTA
// -----------------------------
function abrirCarta(){
  mensagem.style.display = "block";
  musica.play().catch(e => console.log("Clique para tocar a música"));

  setTimeout(()=>{
    carta.style.display = "none";
    mostrarLivro();
  }, 4000);
}

// -----------------------------
// LIVRO DE FOTOS
// -----------------------------
function mostrarLivro(){
  livroContainer.style.display = "block";
  const paginas = document.querySelectorAll("#livro .pagina");
  let indice = 0;

  document.getElementById("proximo").onclick = () => {
    paginas[indice].classList.remove("ativa");
    paginas[indice].classList.add("inativa");
    indice = (indice + 1) % paginas.length;
    paginas[indice].classList.remove("inativa");
    paginas[indice].classList.add("ativa");

    checarUltimaPagina(indice, paginas.length);
  };

  document.getElementById("voltar").onclick = () => {
    paginas[indice].classList.remove("ativa");
    paginas[indice].classList.add("inativa");
    indice = (indice - 1 + paginas.length) % paginas.length;
    paginas[indice].classList.remove("inativa");
    paginas[indice].classList.add("ativa");

    checarUltimaPagina(indice, paginas.length);
  };
}

// -----------------------------
// CHECAR ÚLTIMA PÁGINA PARA MOSTRAR BOTÃO DE VÍDEO
// -----------------------------
function checarUltimaPagina(indice, total){
  if(indice === total - 1){
    verVideo.style.display = "block";
  } else {
    verVideo.style.display = "none";
  }
}

// -----------------------------
// VER VÍDEO
// -----------------------------
verVideo.onclick = () => {
  livroContainer.style.display = "none";
  videoFinal.style.display = "block";
  videoFinal.play();
};