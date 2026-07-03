import { TorreHanoi } from "../services/torre-hanoi.js";

const torreHanoi = new TorreHanoi();

const solucaoParaCincoDiscos = [
  { origem: "a", destino: "c" },
  { origem: "a", destino: "b" },
  { origem: "c", destino: "b" },
];

console.log(torreHanoi.toString());

imprimirRetorno();

for (const instrucao of solucaoParaCincoDiscos) {
  const resultado = torreHanoi.moverDisco(instrucao.origem, instrucao.destino);
  processsarResultado(resultado);
  console.log(torreHanoi.toString());
}

function imprimirRetorno() {
  console.log(torreHanoi.toString());
}

function processsarResultado(resultado) {
  if (!resultado.sucesso) throw new Error(resultado.erro);
}
