
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
