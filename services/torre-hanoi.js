
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
