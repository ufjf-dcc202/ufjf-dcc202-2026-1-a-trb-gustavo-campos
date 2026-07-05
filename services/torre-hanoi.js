const EMPTY_CHAR = "|";
const NOMES_HASTES = ["a", "b", "c"];

// Estado do tabuleiro

export class TorreHanoi {
  _qtdDiscos = null;
  _base = null;

  constructor(qtdDiscos) {
    this._qtdDiscos = qtdDiscos;

    const discosIniciais = Array.from({ length: this._qtdDiscos }, (_, i) => {
      const tamanho = this._qtdDiscos - i;
      return { tamanho };
    });

    this._base = {
      a: { discos: discosIniciais },
      b: { discos: [] },
      c: { discos: [] },
    };
  }

  moverDisco(origem, destino) {
    if (
      [origem, destino].some((nomeHaste) => !NOMES_HASTES.includes(nomeHaste))
    )
      throw new Error("Origem ou destion só podem ser 'a' ou 'b'");

    const discosOrigem = this._base[origem].discos;
    const discosDestino = this._base[destino].discos;

    // Validação movimento

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

  // obterEstado() {
  //   const copiarHaste = (haste) => ({
  //     discos: [...haste.discos.map((disco) => structuredClone(disco))],
  //   });

  //   return {
  //     a: copiarHaste(this._base.a),
  //     b: copiarHaste(this._base.b),
  //     c: copiarHaste(this._base.c),
  //   };
  // }

  obterPosicoesDiscos() {
    return Object.entries(this._base).flatMap (([nomeHaste, hastes]) => {
      return hastes.discos.map((disco, ordem) => ({
        nomeHaste,
        ordem,
        tamanho: disco.tamanho,
      }));
    });
  }

  toString() {
    let totalStr = "";

    for (let level = this._qtdDiscos; level > 0; level--) {
      for (const nomeHaste of NOMES_HASTES) {
        const disco = this._base[nomeHaste].discos[level - 1];
        const char = disco?.tamanho ?? EMPTY_CHAR;
        totalStr += char + "  ";
      }

      totalStr += "\n";
    }

    return totalStr;
  }

  get qtdDiscos() {
    return this._qtdDiscos;
  }
}
