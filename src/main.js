import { inicializar, moverDisco, obterRepresentacao } from "../services/torre-hanoi.js";

inicializar(5);

const solucaoParaCincoDiscos = [
  { origem: "a", destino: "c" },
  { origem: "a", destino: "b" },
  { origem: "c", destino: "b" },
];

imprimirRetorno();

for (const instrucao of solucaoParaCincoDiscos) {
    const resultado = moverDisco(instrucao.origem, instrucao.destino);
    processsarResultado(resultado)
    imprimirRetorno();
}

function imprimirRetorno() {
    console.log(obterRepresentacao());
}

function processsarResultado(resultado) {
    if (!resultado.sucesso) throw new Error(resultado.erro);
}