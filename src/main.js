import { TorreHanoi } from "../services/torre-hanoi.js";

// Constantes

const QTD_DISCOS = 5;
const NOME_HASTES = ["a", "b", "c"];

// Estado

let ultimoClicado = null;
let torreHanoi = null;
let elementosVisualizacao = null;

// Inicia

reiniciar();

// Adiciona listener às hastes

NOME_HASTES.forEach((nomeHaste) => {
  const elemHaste = elementosVisualizacao.elemHastes[nomeHaste];
  elemHaste.addEventListener("click", (event) => lidarComClique(nomeHaste));
});

// =================================================================================================

// Input

function lidarComClique(nomeHaste) {
  if (ultimoClicado) {
    // console.log(`Mover de ${ultimoClicado} para ${nomeHaste}`);
    torreHanoi.moverDisco(ultimoClicado, nomeHaste);
    ultimoClicado = null;
  } else {
    ultimoClicado = nomeHaste;
    // console.log(`Mover de ${nomeHaste}`);
  }

  atualizarVisualizacao(torreHanoi, elementosVisualizacao);
}

// Visualização

function reiniciar() {

  // Obtendo elementos principais

  torreHanoi = new TorreHanoi(QTD_DISCOS);

  const elemTabuleiro = document.querySelector(".tabuleiro");
  elemTabuleiro.style.setProperty("--discos", torreHanoi.qtdDiscos);

  const elemHastes = {
    a: document.querySelector(".haste-a"),
    b: document.querySelector(".haste-b"),
    c: document.querySelector(".haste-c"),
  };

  // Criando elementos e setando valores padrões nos mesmos

  NOME_HASTES.forEach((nomeHaste) => {
    Array.from({ length: torreHanoi.qtdDiscos }, (_, i) => {
      const elemDisco = document.createElement("div");

      elemDisco.className = "disco";

      const ehColunaA = nomeHaste === "a";
      elemDisco.dataset.ativo = ehColunaA ? true : false;
      elemDisco.dataset.tamanho = ehColunaA ? i + 1 : undefined;

      elemHastes[nomeHaste].appendChild(elemDisco);
    });
  });

  const elemDiscosDaHaste = {
    a: document.querySelectorAll(".haste-a .disco"),
    b: document.querySelectorAll(".haste-b .disco"),
    c: document.querySelectorAll(".haste-c .disco"),
  };

  elementosVisualizacao = {
    elemTabuleiro,
    elemHastes,
    elemDiscosDaHaste,
  };

  atualizarVisualizacao();
}

function atualizarVisualizacao() {
  const dadosDiscos = torreHanoi.obterPosicoesDiscos();

  const linhaDaOrdem = (ordem) => torreHanoi.qtdDiscos - ordem;
  const colunaDaHaste = (haste) => ({ a: 1, b: 2, c: 3 })[haste];

  // Resetando
  Object.values(elementosVisualizacao.elemDiscosDaHaste).map((elemDiscos) => {
    elemDiscos.forEach((elemDisco) => {
      elemDisco.dataset.ativo = false;
      elemDisco.dataset.tamanho = null;
    });
  });

  const ordemParaIndice = (ordem) => torreHanoi.qtdDiscos - ordem - 1;

  dadosDiscos.forEach((dadosDisco) => {
    const elemDiscos = elementosVisualizacao.elemDiscosDaHaste;
    const indice = ordemParaIndice(dadosDisco.ordem);
    const elemDisco = elemDiscos[dadosDisco.nomeHaste][indice];

    elemDisco.dataset.ativo = true;
    elemDisco.dataset.tamanho = dadosDisco.tamanho;
  });
}
