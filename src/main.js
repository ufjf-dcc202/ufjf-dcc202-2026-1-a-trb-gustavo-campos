import { NOMES_HASTES, TorreHanoi } from "../services/torre-hanoi.js";

// Constantes

const QTD_DISCOS = 5;

// Estado

let hasteSelecionada = null;
let torreHanoi = null;
let elementosVisualizacao = null;

// Inicia

reiniciar();

// =================================================================================================

// INPUT

function tratarClique(nomeHaste) {
  if (hasteSelecionada) {
    if (hasteSelecionada !== nomeHaste) {
      const resultado = torreHanoi.jogar({
        origem: hasteSelecionada,
        destino: nomeHaste,
      });
    }
    hasteSelecionada = null;
  } else {
    hasteSelecionada = nomeHaste;
  }

  atualizarVisualizacao(torreHanoi, elementosVisualizacao);
}

function tratarCliqueVoltar() {
  torreHanoi.voltar();
  atualizarVisualizacao(torreHanoi, elementosVisualizacao);
}

function tratarCliqueAvancar() {
  torreHanoi.avancar();
  atualizarVisualizacao(torreHanoi, elementosVisualizacao);
}

// VISUALIZAÇÃO

function reiniciar() {
  torreHanoi = new TorreHanoi(QTD_DISCOS);

  // Obtendo elementos principais

  const elemTabuleiro = document.querySelector(".tabuleiro");
  elemTabuleiro.style.setProperty("--discos", torreHanoi.qtdDiscos);

  const elemHastes = {
    a: document.querySelector(".discos-haste-a"),
    b: document.querySelector(".discos-haste-b"),
    c: document.querySelector(".discos-haste-c"),
  };
  
  // Criando elementos e setando valores padrões nos mesmos

  NOMES_HASTES.forEach((nomeHaste) => {
    Array.from({ length: torreHanoi.qtdDiscos }, (_, i) => {
      const elemDisco = document.createElement("div");

      elemDisco.className = "disco";

      const ehColunaA = nomeHaste === "a";
      elemDisco.dataset.tamanho = ehColunaA ? i + 1 : undefined;

      elemHastes[nomeHaste].appendChild(elemDisco);
    });
  });

  const elemDiscosDaHaste = {
    a: document.querySelectorAll(".discos-haste-a .disco"),
    b: document.querySelectorAll(".discos-haste-b .disco"),
    c: document.querySelectorAll(".discos-haste-c .disco"),
  };

  const discosSuspensos = {
    a: document.querySelector(".suspensor-discos .disco-a"),
    b: document.querySelector(".suspensor-discos .disco-b"),
    c: document.querySelector(".suspensor-discos .disco-c"),
  };

  // Obtendo historico
  const historicoJogo = document.querySelector(".historico-jogo");

  // Obtendo botões
  const botaoVoltar = document.querySelector(".botao-voltar");
  const botaoAvancar = document.querySelector(".botao-avancar");

  // Adiciona listener às hastes
  NOMES_HASTES.forEach((nomeHaste) => {
    const elemHaste = elemHastes[nomeHaste];
    elemHaste.addEventListener("click", (event) => tratarClique(nomeHaste));
  });

  // Adiciona listernet aos botões
  botaoVoltar.addEventListener("click", (event) => tratarCliqueVoltar());
  botaoAvancar.addEventListener("click", (event) => tratarCliqueAvancar());

  elementosVisualizacao = {
    elemTabuleiro,
    elemHastes,
    elemDiscosDaHaste,
    historicoJogo,
    botaoVoltar,
    botaoAvancar,
    discosSuspensos,
  };

  atualizarVisualizacao();
}

function atualizarVisualizacao() {
  const dadosDiscos = torreHanoi.obterPosicoesDiscos();

  const linhaDaOrdem = (ordem) => torreHanoi.qtdDiscos - ordem;
  const colunaDaHaste = (haste) => ({ a: 1, b: 2, c: 3 })[haste];
  const ordemParaIndice = (ordem) => torreHanoi.qtdDiscos - ordem - 1;

  // Resetando discos

  Object.values(elementosVisualizacao.elemDiscosDaHaste).map((elemDiscos) => {
    elemDiscos.forEach((elemDisco) => {
      elemDisco.dataset.tamanho = null;
    });
  });

  const tamanhoDiscoTopoDaHaste = {
    a: getTamanhoDiscoTopo("a"),
    b: getTamanhoDiscoTopo("b"),
    c: getTamanhoDiscoTopo("c"),
  }

  // Setar disco suspenso selecionado
  Object.entries(elementosVisualizacao.discosSuspensos).forEach(
    ([nomeHaste, elemDisco]) => {
      if (hasteSelecionada === nomeHaste) {
        elemDisco.dataset.tamanho = tamanhoDiscoTopoDaHaste[nomeHaste];
      } else {
        elemDisco.dataset.tamanho = null;
      }
    },
  );

  // Setando discos das hastes de acordo com estado
  dadosDiscos.forEach((dadosDisco) => {
    const elemDiscos = elementosVisualizacao.elemDiscosDaHaste;
    const indice = ordemParaIndice(dadosDisco.ordem);
    const elemDisco = elemDiscos[dadosDisco.nomeHaste][indice];

    const estaSelecionado =
      dadosDisco.nomeHaste === hasteSelecionada &&
      tamanhoDiscoTopoDaHaste[hasteSelecionada] === dadosDisco.tamanho;

    elemDisco.dataset.tamanho = estaSelecionado ? null : dadosDisco.tamanho;
  });

  // Setando histórico de acordo com o estado

  const historico = torreHanoi.obterHistorico();

  const stringHistorico = historico.reduce(
    (acc, movimento) =>
      acc +
      `\n${movimento.selecionado ? "*" : ""} ${movimento.origem} -> ${movimento.destino}`,
    "",
  );

  elementosVisualizacao.historicoJogo.innerText = stringHistorico;

  // Setando disabled dos botões

  // Se estiver antes do primeiro movimento)
  elementosVisualizacao.botaoVoltar.disabled = historico.every(
    (movimento) => !movimento.selecionado,
  );
  // Se está o mais avançado o possível
  elementosVisualizacao.botaoAvancar.disabled =
    historico.length === 0 || historico.at(-1).selecionado;
}

// HELPERS

function getTamanhoDiscoTopo(nomeHaste) {
  const dadosDiscos = torreHanoi.obterPosicoesDiscos();
  const maiorDiscoHaste = dadosDiscos
    .sort((discoA, discoB) => discoA.tamanho - discoB.tamanho)
    .find((disco) => disco.nomeHaste === nomeHaste);

  return maiorDiscoHaste?.tamanho ?? null;
}
