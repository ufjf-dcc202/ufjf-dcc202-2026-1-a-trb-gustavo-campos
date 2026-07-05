import { TorreHanoi } from "../services/torre-hanoi.js";

const QTD_DISCOS = 5;

// Sequência de instruções

const movimentos = [
  { origem: "a", destino: "c" },
  { origem: "a", destino: "b" },
  { origem: "c", destino: "b" },
];

// Simulação

const torreHanoi = new TorreHanoi(QTD_DISCOS);
const elementosVisualizacao = inicializarVisualizacao(torreHanoi);

for (const instrucao of movimentos) {
  const resultado = torreHanoi.moverDisco(instrucao.origem, instrucao.destino);
  atualizarVisualizacao(torreHanoi, elementosVisualizacao);
}

// Visualização

function inicializarVisualizacao(torreHanoi) {
  const tabuleiro = document.querySelector(".tabuleiro");
  tabuleiro.style.setProperty("--discos", torreHanoi.qtdDiscos);

  const discos = Array.from({ length: torreHanoi.qtdDiscos }, (_, i) => {
    const disco = document.createElement("div");
    disco.className = "disco";
    tabuleiro.appendChild(disco);
    return disco;
  });

  const elementosVisualizacao = {
    tabuleiro,
    discos,
  };

  atualizarVisualizacao(torreHanoi, elementosVisualizacao);

  return elementosVisualizacao;
}

function atualizarVisualizacao(torreHanoi, elementosVisualizacao) {
  const dadosDiscos = torreHanoi.obterPosicoesDiscos();

  if (dadosDiscos.length !== elementosVisualizacao.discos.length)
    throw new Error("Quantidade de discos não esperada");

  const linhaDaOrdem = (ordem) => torreHanoi.qtdDiscos - ordem;
  const colunaDaHaste = (haste) => ({ a: 1, b: 2, c: 3   })[haste];

  dadosDiscos.forEach((dadosDisco, index) => {
    const elementoDisco = elementosVisualizacao.discos[index];
    elementoDisco.style.gridRow = linhaDaOrdem(dadosDisco.ordem);
    elementoDisco.style.gridColumn = colunaDaHaste(dadosDisco.nomeHaste);
    elementoDisco.dataset.tamanho = dadosDisco.tamanho;
  });
}
