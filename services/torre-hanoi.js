const EMPTY_CHAR = "|";
export const NOMES_HASTES = ["a", "b", "c"];

// Estado do tabuleiro

export class TorreHanoi {
  _hastes = {
    a: [] ,
    b: [] ,
    c: [] ,
  };

  _qtdDiscos = null;
  _historico = [];
  _jogadasVoltadas = 0;

  constructor(qtdDiscos) {
    this._qtdDiscos = qtdDiscos;

    // Inicializa a base com uma sequência de N discos descrescentes na primeira base
    const discosIniciais = Array.from({ length: this._qtdDiscos }, (_, i) => {
      const tamanho = this._qtdDiscos - i;
      return { tamanho };
    });

    this._hastes.a.push(...discosIniciais);
  }

  // Public

  jogar({ origem, destino }) {
    /* Faz uma movimentação, e se for válida atualiza o histórico de acordo */

    const result = this.moverDisco({ origem, destino });

    if (result.sucesso) {
      // Limpar histórico posterior, se houver
      if (this._jogadasVoltadas > 0) {
        const indiceAtual = this.obterIndiceJogadaSelecionada();
        this._historico.splice(indiceAtual + 1);
        this._jogadasVoltadas = 0;
      }

      // Adicionar ao histórico
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
    /* Altera o estado para o da jogada anterior, caso já tenha havido alguma jogada */
    const podeVoltar = this._jogadasVoltadas < this._historico.length;
    if (!podeVoltar) return;

    const jogadaRetrocesso = this.obterJogadaRetrocesso();

    this.moverDisco(jogadaRetrocesso);
    this._jogadasVoltadas++;
  }

  avancar() {
    /* Altera o estado para o da próxima jogada, caso o jogo esteja retrocedido */
    const podeAvancar = this._jogadasVoltadas > 0;
    if (!podeAvancar) return;

    const jogadaAvanco = this.obterJogadaAvanco();

    this.moverDisco(jogadaAvanco);
    this._jogadasVoltadas--;
  }

  obterPosicoesDiscos() {
    /*
    * Retorna a haste, a ordem e o tamanho de cada disco.
    */
    return Object.entries(this._hastes).flatMap(([nomeHaste, haste]) => {
      return haste.map((disco, ordem) => ({
        nomeHaste,
        ordem,
        tamanho: disco.tamanho,
      }));
    });
  }

  obterHistorico() {
    /* 
    * Retorna uma cópia do histórico, com a informação adicional de qual 
    * item do mesmo se encontra ativo no momento.
    */
    const indiceSelecionado = this.obterIndiceJogadaSelecionada();
    const copiaHistorico = this._historico.map((movimento, indice) => ({
      ...movimento,
      selecionado: indice === indiceSelecionado,
    }));
    return copiaHistorico;
  }

  get qtdDiscos() {
    return this._qtdDiscos;
  }

  // Private

  moverDisco({ origem, destino }) {
    /* 
    * Faz validações, e move o disco, se for válido. Não causa 
    * outros efeitos colaterais, diferente do método "jogar".
    */
    if (
      [origem, destino].some((nomeHaste) => !NOMES_HASTES.includes(nomeHaste))
    ) {
      throw new Error(
        "Origem ou destino só podem ser " + NOMES_HASTES.join(", "),
      );
    }

    if (origem === destino) {
      return {
        sucesso: false,
        erro: "A haste de destino deve ser diferente da haste de origem",
      };
    }

    const discosOrigem = this._hastes[origem];
    const discosDestino = this._hastes[destino];

    // Validação movimento

    const discoOrigem = discosOrigem.at(-1);
    const discoDestino = discosDestino.at(-1);

    if (!discoOrigem)
      return { sucesso: false, erro: "Não há disco na origem para mover" };

    if (discoDestino && discoOrigem.tamanho > discoDestino.tamanho) {
      return {
        sucesso: false,
        erro: "O disco de origem deve ser menor que o disco no topo do destino",
      };
    }

    // Movimentação

    discosOrigem.pop();
    discosDestino.push(discoOrigem);

    return { sucesso: true };
  }

  obterMovimentoInverso({ origem, destino }) {
    /* 
    * Dado um movimento feito, retorna o movimento responsável por desfazê-lo, 
    * ou seja, retorna o movimento contrário, ou oposto.
    */
    return {
      origem: destino,
      destino: origem,
    };
  }

  obterJogadaRetrocesso() {
    /* Obtém a jogada responsável por voltar pro estado anterior */

    const indiceJogadaSelecionada = this.obterIndiceJogadaSelecionada();
    const jogadaSelecionada = this._historico[indiceJogadaSelecionada];
    return this.obterMovimentoInverso(jogadaSelecionada);
  }

  obterJogadaAvanco() {
    /* Obtém a jogada responsável por avançar pro próximo estado */

    const indiceJogadaSelecionada = this.obterIndiceJogadaSelecionada();
    const indiceJogadaProxima = indiceJogadaSelecionada + 1;
    return this._historico[indiceJogadaProxima];
  }

  obterIndiceJogadaSelecionada() {
    /* 
    * Obtém qual é o índice do histórico que contém a última jogada feita
    * Obs: "última" se refere à jogada do histórico que levou ao estado atual 
    */
    return this._historico.length - 1 - this._jogadasVoltadas;
  }
}
