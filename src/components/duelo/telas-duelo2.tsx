import * as React from "react";
import { AUDIO, DECORATIVOS, DUELO2, FUNDOS, PISTA_MAGICA } from "@/lib/duelo/conteudo";
import { useAtividade, useDuelo } from "@/lib/duelo/estado";
import { AudioButton, FeedbackModal, NavigationControls, TelaBase } from "./base";
import { InvestigationTools, MultipleChoice } from "./atividades";
import { FonteMorcegoA, FonteMorcegoB } from "./fontes";

const DECOR_D2 = [
  {
    src: DECORATIVOS.clipeTeal,
    className: "left-[-14px] top-[140px] w-[44px] -rotate-6 opacity-80",
  },
  {
    src: DECORATIVOS.iconeCartasPergunta,
    className: "right-[16px] bottom-[76px] w-[44px] opacity-60",
  },
];

/* ---------------- Duelo 2 — investigação compartilhada ---------------- */

export function TelaDuelo2Investigacao() {
  const { dispatch } = useDuelo();
  const [investigados, setInvestigados] = useAtividade<string[]>("d2-ferramentas", []);
  const [ativo, setAtivo] = React.useState<string | null>(null);

  const investigar = (id: string) => {
    setAtivo(id);
    if (!investigados.includes(id)) setInvestigados([...investigados, id]);
  };

  return (
    <TelaBase
      fundo={FUNDOS.duelo2}
      decoracoes={DECOR_D2}
      titulo="Duelo 2 — Morcegos são cegos?"
      etapa="Investigação compartilhada"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="DECIDIR"
          avancarLiberado={investigados.length >= 2}
          aviso="Investigue pelo menos duas pistas nas fontes para seguir."
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-2">
        <div className="flex items-start gap-3">
          <p className="text-[17px] font-extrabold leading-snug text-grafite">{DUELO2.comando}</p>
          <AudioButton src={AUDIO.duelo2Investigacao} rotulo="Ouvir o comando da investigação" />
        </div>

        <InvestigationTools
          titulo="Pistas para investigar"
          ferramentas={DUELO2.ferramentas}
          investigados={investigados}
          aoInvestigar={investigar}
          ativo={ativo}
        />

        <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-3">
          <FonteMorcegoA />
          <FonteMorcegoB />
        </div>
      </div>
    </TelaBase>
  );
}

/* ---------------- Duelo 2 — decisão e comparação ---------------- */

export function TelaDuelo2Decisao() {
  const { dispatch } = useDuelo();
  const [fonte, setFonte] = useAtividade<string[]>("d2-escolha", []);
  const [pistas, setPistas] = useAtividade<string[]>("d2-pistas", []);
  const [feedback, setFeedback] = React.useState<
    null | "fonteA" | "aparencia" | "poucas" | "acerto"
  >(null);

  const corretas = DUELO2.decisao.opcoes.filter((o) => o.correta).map((o) => o.id);
  const pronto = fonte.length === 1 && pistas.length > 0;

  const confirmar = () => {
    if (fonte[0] !== "B") {
      setFeedback("fonteA");
      return;
    }
    if (pistas.some((p) => !corretas.includes(p))) {
      setFeedback("aparencia");
      return;
    }
    if (pistas.length < 2) {
      setFeedback("poucas");
      return;
    }
    setFeedback("acerto");
  };

  const alternar = (id: string) =>
    setPistas(pistas.includes(id) ? pistas.filter((p) => p !== id) : [...pistas, id]);

  return (
    <TelaBase
      fundo={FUNDOS.duelo2}
      decoracoes={DECOR_D2}
      titulo="Decisão do Duelo 2"
      etapa="Comparar antes de confiar"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={confirmar}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={pronto}
          aviso="Escolha uma fonte e as pistas que justificam sua decisão."
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-4">
        <MultipleChoice
          enunciado={DUELO2.decisao.pergunta}
          opcoes={DUELO2.decisao.opcoesFonte}
          selecionadas={fonte}
          aoSelecionar={(id) => setFonte([id])}
          colunas={2}
        />
        <MultipleChoice
          enunciado={DUELO2.decisao.perguntaJustificativa}
          multiplo
          opcoes={DUELO2.decisao.opcoes.map((o) => ({ id: o.id, texto: o.texto }))}
          selecionadas={pistas}
          aoSelecionar={alternar}
          colunas={2}
        />
      </div>

      <FeedbackModal
        aberto={feedback === "fonteA"}
        titulo="Vamos observar de novo"
        paragrafos={[DUELO2.feedbackFonteA]}
        rotuloFechar="REVISAR"
        aoFechar={() => setFeedback(null)}
      />
      <FeedbackModal
        aberto={feedback === "aparencia"}
        titulo="Vamos observar de novo"
        paragrafos={[DUELO2.feedbackAparencia]}
        rotuloFechar="REVISAR"
        aoFechar={() => setFeedback(null)}
      />
      <FeedbackModal
        aberto={feedback === "poucas"}
        titulo="Falta comparar mais uma pista"
        paragrafos={[DUELO2.feedbackPoucas]}
        rotuloFechar="REVISAR"
        aoFechar={() => setFeedback(null)}
      />
      <FeedbackModal
        aberto={feedback === "acerto"}
        titulo="Comparação concluída"
        paragrafos={[DUELO2.feedback, ...PISTA_MAGICA.falas]}
        destaque={PISTA_MAGICA.destaque}
        rotuloFechar="SEGUIR"
        aoFechar={() => {
          setFeedback(null);
          dispatch({ tipo: "avancar" });
        }}
      />
    </TelaBase>
  );
}
