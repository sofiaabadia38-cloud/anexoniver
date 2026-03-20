let contador = document.getElementById("contador");
let carta = document.getElementById("carta");
let mensagem = document.getElementById("mensagem");
let musica = document.getElementById("musica");
let chuva = document.getElementById("chuva-textos");
let nome = document.getElementById("nome-aniversariante");
let livroContainer = document.getElementById("livro-container");

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

function criarFraseVertical(){

  const frase = frases[Math.floor(Math.random() * frases.length)];
  const letras = [...frase];

  const baseX = Math.random() * (window.innerWidth - 100);

  letras.forEach((letra, i) => {

    const span = document.createElement("span");
    span.className = "textoCai";
    span.innerText = letra;

    span.style.left = baseX + "px";

    /* posição final de cada letra */
    span.style.top = (100 + i * 30) + "px";

    span.style.animationDelay = i * 0.05 + "s";

    document.body.appendChild(span);

  });

}

function iniciarChuva() {
  let intervaloChuva = setInterval(criarFelizAniversario, 100);

  // Dura 5 segundos e depois mostra o nome
  setTimeout(() => {
    clearInterval(intervaloChuva);
    chuva.style.display = "none";
    nome.style.display = "block";

    // Após 2 segundos mostra a carta
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
  };

  document.getElementById("voltar").onclick = () => {
    paginas[indice].classList.remove("ativa");
    paginas[indice].classList.add("inativa");
    indice = (indice - 1 + paginas.length) % paginas.length;
    paginas[indice].classList.remove("inativa");
    paginas[indice].classList.add("ativa");
  };
}