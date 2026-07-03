
const EMPTY_CHAR = "|";
const NOMES_HASTES = ["a", "b", "c"];

// Estado do tabuleiro

let _qtdDiscos = null;
let _base = null;

export function inicializar(qtdDiscos = 5) {
  _qtdDiscos = qtdDiscos;
  
  const discosIniciais = Array.from({ length: _qtdDiscos }, (_, i) => {
    const tamanho = _qtdDiscos - i;
    return { tamanho };
  });

  _base = {
    a: { discos: discosIniciais },
    b: { discos: [] },
    c: { discos: [] },
  };
}

export function moverDisco(origem, destino) {
  if (!_base) return { sucesso: false, erro: "O estado não foi inicializado" };

  const discosOrigem = _base[origem].discos;
  const discosDestino = _base[destino].discos;

  // Validação

  const discoOrigem = discosOrigem.at(-1);
  const discoDestino = discosDestino.at(-1);

  if (!discoOrigem)
    return { sucesso: false, erro: "Não há disco na origem para mover" };

  if (discoDestino && discoOrigem.tamanho > discoDestino.tamanho)
    return {
      sucesso: false,
      erro: "O disco de origem é maior que o disco no topo do destino",
    };

  // Movimentação

  discosOrigem.pop();
  discosDestino.push(discoOrigem);

  return { sucesso: true };
}

export function obterRepresentacao() {
  if (!_base)
    throw new Error("Não é possível renderizar estado não inicializado");
  
  let totalStr = "";

  for (let level = _qtdDiscos; level > 0; level--) {
    for (const nomeHaste of NOMES_HASTES) {
      const disco = _base[nomeHaste].discos[level-1];
      const char = disco?.tamanho ?? EMPTY_CHAR;
      totalStr += char + "  ";
    }

    totalStr += "\n";
  }

  return totalStr;
}
