import { TorreHanoi } from "../services/torre-hanoi.js";

// Sequência de instruções

const solucaoParaCincoDiscos = [
    { origem: "a", destino: "c" },
    { origem: "a", destino: "b" },
    { origem: "c", destino: "b" },
];

// Simulação

const torreHanoi = new TorreHanoi();

console.log(torreHanoi.toString());

imprimirRetorno();

for (const instrucao of solucaoParaCincoDiscos) {
  const resultado = torreHanoi.moverDisco(instrucao.origem, instrucao.destino);
  processsarResultado(resultado);
  console.log(torreHanoi.toString());
}

// Auxiliares

function imprimirRetorno() {
  console.log(torreHanoi.toString());
}

function processsarResultado(resultado) {
  if (!resultado.sucesso) throw new Error(resultado.erro);
}
