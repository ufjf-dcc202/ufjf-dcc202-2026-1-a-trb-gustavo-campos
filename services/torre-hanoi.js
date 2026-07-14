const EMPTY_CHAR = "|";
export const NOMES_HASTES = ["a", "b", "c"];

// Estado do tabuleiro

export class TorreHanoi {
  
  _base = {
    a: { discos: [] },
    b: { discos: [] },
    c: { discos: [] },
  };

  _qtdDiscos = null;
  _historico = [];
  _jogadasVoltadas = 0;

  constructor(qtdDiscos) {
    this._qtdDiscos = qtdDiscos;

    const discosIniciais = Array.from({ length: this._qtdDiscos }, (_, i) => {
      const tamanho = this._qtdDiscos - i;
      return { tamanho };
    });

    this._base.a.discos = discosIniciais;
  }

  // Public

  jogar({ origem, destino }) {
    if (this._jogadasVoltadas > 0) {
      // TODO: limpar histórico posterior e zerar jogadas voltadas
    }

    const result = this.moverDisco({ origem, destino });

    // Adicionar ao histórico
    if (result.sucesso) {
      this._historico = [
        ...this._historico,
        {
          origem,
          destino,
        },
      ];
    }

    return result;
  }

  voltar() {
    const podeVoltar = this._jogadasVoltadas < this._historico.length;
    if (!podeVoltar) return;

    const jogadaRetrocesso = this.obterJogadaRetrocesso();

    this.moverDisco(jogadaRetrocesso);
    this._jogadasVoltadas++;
  }

  avancar() {
    const podeAvancar = this._jogadasVoltadas > 0;
    if (!podeAvancar) return;

    const jogadaAvanco = this.obterJogadaAvanco();

    this.moverDisco(jogadaAvanco);
    this._jogadasVoltadas--;
  }

  obterPosicoesDiscos() {
    return Object.entries(this._base).flatMap(([nomeHaste, hastes]) => {
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
        totalStr += char + "    ";
      }

      totalStr += "\n";
    }

    return totalStr;
  }

  get qtdDiscos() {
    return this._qtdDiscos;
  }

  // Private

  moverDisco({ origem, destino }) {
    if (
      [origem, destino].some((nomeHaste) => !NOMES_HASTES.includes(nomeHaste))
    )
      throw new Error(
        "Origem ou destino só podem ser " + NOMES_HASTES.join(", "),
      );

    if (origem === destino)
      return {
        sucesso: false,
        erro: "A haste de destino deve ser diferente da haste de origem",
      };

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
        erro: "O disco de origem deve ser menor que o disco no topo do destino",
      };

    // Movimentação

    discosOrigem.pop();
    discosDestino.push(discoOrigem);

    return { sucesso: true };
  }

  obterMovimentoInverso({ origem, destino }) {
    return {
      origem: destino,
      destino: origem,
    };
  }

  obterJogadaRetrocesso() {
    /* Obtém a jogada responsável por voltar pro estado anterior */
    const indiceJogadaSelecionada =
      this._historico.length - 1 - this._jogadasVoltadas;

    const indiceJogadaAnterior = indiceJogadaSelecionada - 1;

    const jogadaAnterior = this._historico[indiceJogadaAnterior];
    return this.obterMovimentoInverso(jogadaAnterior);
  }

  obterJogadaAvanco() {
    /* Obtém a jogada responsável por avançar pro próximo estado */
    const indiceJogadaSelecionada =
      this._historico.length - 1 - this._jogadasVoltadas;

    const indiceJogadaProxima = indiceJogadaSelecionada + 1;

    return this._historico[indiceJogadaProxima];
  }
}
