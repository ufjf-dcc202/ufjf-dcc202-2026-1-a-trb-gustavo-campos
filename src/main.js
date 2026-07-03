import { TorreHanoi } from "../services/torre-hanoi.js";

// Sequência de instruções

const solucaoParaCincoDiscos = [
    { origem: "a", destino: "c" },
    { origem: "a", destino: "b" },
    { origem: "c", destino: "b" },
];

// Simulação

const torreHanoi = new TorreHanoi();

imprimirRetorno(torreHanoi);

for (const instrucao of solucaoParaCincoDiscos) {
  const resultado = torreHanoi.moverDisco(instrucao.origem, instrucao.destino);
  processsarResultado(resultado);
  imprimirRetorno(torreHanoi);
}

// Auxiliares

function imprimirRetorno(torreHanoi) {
  console.log(torreHanoi.toString());
}

function processsarResultado(resultado) {
  if (!resultado.sucesso) throw new Error(resultado.erro);
}
