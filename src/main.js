import { NOMES_HASTES, TorreHanoi } from "../services/torre-hanoi.js";

// Constantes

const QTD_DISCOS = 5;

// Estado

let ultimoClicado = null;
let torreHanoi = null;
let elementosVisualizacao = null;

// Inicia

reiniciar();

// Adiciona listener às hastes

NOMES_HASTES.forEach((nomeHaste) => {
  const elemHaste = elementosVisualizacao.elemHastes[nomeHaste];
  elemHaste.addEventListener("click", (event) => lidarComClique(nomeHaste));
});

// =================================================================================================

// INPUT

function lidarComClique(nomeHaste) {
  if (ultimoClicado) {
    const resultado = torreHanoi.moverDisco(ultimoClicado, nomeHaste);
    definirMensagemDeErro(resultado);
    ultimoClicado = null;
  } else {
    ultimoClicado = nomeHaste;
  }

  atualizarVisualizacao(torreHanoi, elementosVisualizacao);
}

function definirMensagemDeErro(resultado) {
  if (resultado.sucesso) elementosVisualizacao.logJogo.textContent = "";
  else elementosVisualizacao.logJogo.textContent = resultado.erro;
}

// VISUALIZAÇÃO

function reiniciar() {
  torreHanoi = new TorreHanoi(QTD_DISCOS);

  // Obtendo elementos principais

  const elemTabuleiro = document.querySelector(".tabuleiro");
  elemTabuleiro.style.setProperty("--discos", torreHanoi.qtdDiscos);

  const elemHastes = {
    a: document.querySelector(".haste-a"),
    b: document.querySelector(".haste-b"),
    c: document.querySelector(".haste-c"),
  };

  // Criando elementos e setando valores padrões nos mesmos

  NOMES_HASTES.forEach((nomeHaste) => {
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

  // Obtendo log
  const logJogo = document.querySelector(".log-jogo");

  elementosVisualizacao = {
    elemTabuleiro,
    elemHastes,
    elemDiscosDaHaste,
    logJogo,
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
