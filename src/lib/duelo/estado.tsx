import * as React from "react";
import type { CriterioId } from "./conteudo";

/** Ordem controlada das telas (fluxo enxuto de 14 etapas). */
export const TELAS = [
  "capa",
  "problema",
  "fonte",
  "lupa",
  "duelo1-investigacao",
  "duelo1-decisao",
  "duelo2-investigacao",
  "duelo2-comparacao",
  "duelo3-investigacao",
  "duelo3-decisao",
  "caminho",
  "metacognicao",
  "transferencia",
  "encerramento",
] as const;

export type Tela = (typeof TELAS)[number];

type Estado = {
  tela: Tela;
  kit: CriterioId[];
  /** Progresso livre das atividades, preservado ao voltar. */
  atividades: Record<string, unknown>;
  audioLigado: boolean;
};

type Acao =
  | { tipo: "ir"; tela: Tela }
  | { tipo: "avancar" }
  | { tipo: "voltar" }
  | { tipo: "kit"; item: CriterioId }
  | { tipo: "atividade"; chave: string; valor: unknown }
  | { tipo: "audio" }
  | { tipo: "recomecar" };

const inicial: Estado = {
  tela: "capa",
  kit: [],
  atividades: {},
  audioLigado: true,
};

function reducer(estado: Estado, acao: Acao): Estado {
  switch (acao.tipo) {
    case "ir":
      return { ...estado, tela: acao.tela };
    case "avancar": {
      const i = TELAS.indexOf(estado.tela);
      return { ...estado, tela: TELAS[Math.min(i + 1, TELAS.length - 1)]! };
    }
    case "voltar": {
      const i = TELAS.indexOf(estado.tela);
      return { ...estado, tela: TELAS[Math.max(i - 1, 0)]! };
    }
    case "kit":
      return estado.kit.includes(acao.item)
        ? estado
        : { ...estado, kit: [...estado.kit, acao.item] };
    case "atividade":
      return {
        ...estado,
        atividades: { ...estado.atividades, [acao.chave]: acao.valor },
      };
    case "audio":
      return { ...estado, audioLigado: !estado.audioLigado };
    case "recomecar":
      return { ...inicial, audioLigado: estado.audioLigado };
    default:
      return estado;
  }
}

const Ctx = React.createContext<{
  estado: Estado;
  dispatch: React.Dispatch<Acao>;
} | null>(null);

export function ProvedorDuelo({ children }: { children: React.ReactNode }) {
  const [estado, dispatch] = React.useReducer(reducer, inicial);
  const valor = React.useMemo(() => ({ estado, dispatch }), [estado]);
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useDuelo() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useDuelo precisa estar dentro de <ProvedorDuelo>");
  return ctx;
}

/** Guarda e recupera o progresso de uma atividade (preservado ao usar VOLTAR). */
export function useAtividade<T>(chave: string, valorInicial: T) {
  const { estado, dispatch } = useDuelo();
  const valor = (estado.atividades[chave] as T | undefined) ?? valorInicial;
  const definir = React.useCallback(
    (proximo: T | ((anterior: T) => T)) => {
      const resolvido =
        typeof proximo === "function"
          ? (proximo as (anterior: T) => T)(valor)
          : proximo;
      dispatch({ tipo: "atividade", chave, valor: resolvido });
    },
    [chave, dispatch, valor],
  );
  return [valor, definir] as const;
}
