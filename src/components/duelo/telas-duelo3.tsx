import * as React from "react";
import { AUDIO, DECORATIVOS, DUELO3, FUNDOS } from "@/lib/duelo/conteudo";
import { useAtividade, useDuelo } from "@/lib/duelo/estado";
import { AudioButton, FeedbackModal, NavigationControls, TelaBase } from "./base";
import { InvestigationTools, MultipleChoice } from "./atividades";
import { FonteEclipseA, FonteEclipseB } from "./fontes";

const DECOR_D3 = [
  { src: DECORATIVOS.iconeMapa, className: "left-[-10px] top-[136px] w-[44px] opacity-60" },
  { src: DECORATIVOS.iconeGlobo, className: "right-[16px] bottom-[76px] w-[44px] opacity-60" },
];

/* ---------------- Duelo 3 — investigação autônoma ---------------- */

export function TelaDuelo3Investigacao() {
  const { dispatch } = useDuelo();
  const [investigados, setInvestigados] = useAtividade<string[]>("d3-ferramentas", []);
  const [ativo, setAtivo] = React.useState<string | null>(null);

  const chave = investigados.filter((i) => DUELO3.criteriosChave.includes(i));

  const investigar = (id: string) => {
    setAtivo(id);
    if (!investigados.includes(id)) setInvestigados([...investigados, id]);
  };

  return (
    <TelaBase
      fundo={FUNDOS.duelo3}
      decoracoes={DECOR_D3}
      titulo="Duelo 3 — Eclipse nesta sexta?"
      etapa="Investigação autônoma"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="DECIDIR"
          avancarLiberado={chave.length >= 2}
          aviso={DUELO3.avisoInvestigacao}
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-2">
        <div className="flex items-start gap-3">
          <p className="text-[17px] font-extrabold leading-snug text-grafite">
            {DUELO3.pergunta} {DUELO3.comando}
          </p>
          <AudioButton src={AUDIO.duelo3Investigacao} rotulo="Ouvir o comando da investigação" />
        </div>

        <InvestigationTools
          titulo="Pistas para investigar"
          ferramentas={DUELO3.ferramentas}
          investigados={investigados}
          aoInvestigar={investigar}
          ativo={ativo}
        />

        <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-3">
          <FonteEclipseA />
          <FonteEclipseB />
        </div>
      </div>
    </TelaBase>
  );
}

/* ---------------- Duelo 3 — decisão ---------------- */

export function TelaDuelo3Decisao() {
  const { dispatch } = useDuelo();
  const [fonte, setFonte] = useAtividade<string[]>("d3-escolha", []);
  const [pistas, setPistas] = useAtividade<string[]>("d3-pistas", []);
  const [feedback, setFeedback] = React.useState<null | "erro" | "acerto">(null);

  const corretas = DUELO3.decisao.opcoes.filter((o) => o.correta).map((o) => o.id);
  const pronto = fonte.length === 1 && pistas.length > 0;

  const confirmar = () => {
    const valido =
      fonte[0] === "B" && pistas.length >= 2 && pistas.every((p) => corretas.includes(p));
    setFeedback(valido ? "acerto" : "erro");
  };

  const alternar = (id: string) =>
    setPistas(pistas.includes(id) ? pistas.filter((p) => p !== id) : [...pistas, id]);

  return (
    <TelaBase
      fundo={FUNDOS.duelo3}
      decoracoes={DECOR_D3}
      titulo="Decisão do Duelo 3"
      etapa="Serve para esta situação?"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={confirmar}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={pronto}
          aviso="Escolha uma fonte e pelo menos duas pistas que justifiquem sua decisão."
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-4">
        <MultipleChoice
          enunciado={DUELO3.decisao.pergunta}
          opcoes={DUELO3.decisao.opcoesFonte}
          selecionadas={fonte}
          aoSelecionar={(id) => setFonte([id])}
          colunas={2}
        />
        <MultipleChoice
          enunciado={DUELO3.decisao.perguntaPistas}
          multiplo
          opcoes={DUELO3.decisao.opcoes.map((o) => ({ id: o.id, texto: o.texto }))}
          selecionadas={pistas}
          aoSelecionar={alternar}
          colunas={2}
        />
      </div>

      <FeedbackModal
        aberto={feedback === "erro"}
        titulo="Vamos investigar mais um pouco"
        paragrafos={[DUELO3.decisao.feedbackErro]}
        rotuloFechar="REVISAR"
        aoFechar={() => setFeedback(null)}
      />
      <FeedbackModal
        aberto={feedback === "acerto"}
        titulo="Investigação concluída"
        paragrafos={[DUELO3.decisao.feedback, DUELO3.decisao.complementar]}
        destaque={DUELO3.decisao.destaque}
        rotuloFechar="SEGUIR"
        aoFechar={() => {
          setFeedback(null);
          dispatch({ tipo: "avancar" });
        }}
      />
    </TelaBase>
  );
}
