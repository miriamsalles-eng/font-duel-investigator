import * as React from "react";
import { DECORATIVOS, FUNDOS,AUDIO, DUELO3 } from "@/lib/duelo/conteudo";
import { useAtividade, useDuelo } from "@/lib/duelo/estado";
import {
  CharacterMaya,
  FeedbackModal,
  InvestigationButton,
  NavigationControls,
  SpeechBubble,
  TelaBase,
} from "./base";
import { InvestigationPanel, MultipleChoice, useRegistrarPista } from "./atividades";
import { FonteEclipseA, FonteEclipseB } from "./fontes";

const DECOR_D3 = [
  { src: DECORATIVOS.tagCordao, className: "left-[-10px] top-[120px] w-[54px] -rotate-6 opacity-75" },
  { src: DECORATIVOS.iconeMapa, className: "right-[20px] bottom-[70px] w-[42px] opacity-55" },
  { src: DECORATIVOS.iconeGlobo, className: "right-[66px] bottom-[68px] w-[40px] opacity-50" },
];


export function TelaDuelo3Fontes() {
  const { dispatch } = useDuelo();
  return (
    <TelaBase
      fundo={FUNDOS.duelo3}
      decoracoes={DECOR_D3}
      titulo="Duelo 3 — Eclipse"
      etapa="Investigação autônoma"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="INVESTIGAR"
        />
      }
    >
      <div className="grid h-full grid-cols-[210px_1fr] gap-4">
        <div className="flex flex-col justify-between">
          <SpeechBubble audio={AUDIO.duelo3}>
            <p>{DUELO3.fala}</p>
            <p className="font-bold">{DUELO3.pergunta}</p>
          </SpeechBubble>
          <div className="h-[240px]">
            <CharacterMaya pose="tablet" className="mx-auto" />
          </div>
        </div>
        <div className="grid min-h-0 grid-cols-2 gap-3">
          <FonteEclipseA className="h-full" />
          <FonteEclipseB className="h-full" />
        </div>
      </div>
    </TelaBase>
  );
}

export function TelaDuelo3Investigacao() {
  const { dispatch } = useDuelo();
  const registrar = useRegistrarPista(3);
  const [feitos, setFeitos] = useAtividade<string[]>("d3-investigacoes", []);

  const investigar = (id: string) => {
    const achado = DUELO3.achados[id];
    if (!achado) return;
    if (!feitos.includes(id)) setFeitos([...feitos, id]);
    registrar(`d3-${id}-A`, achado.A, "A");
    registrar(`d3-${id}-B`, achado.B, "B");
  };

  return (
    <TelaBase
      fundo={FUNDOS.duelo3}
      decoracoes={DECOR_D3}
      titulo={DUELO3.comando}
      etapa="Duelo 3 — Eclipse"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="COMPARAR"
          avancarLiberado={feitos.length >= 1}
          aviso="Escolha o que deseja investigar antes de decidir."
        />
      }
    >
      <div className="grid h-full grid-cols-[240px_1fr_320px] gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-cinza-azulado">
            Você decide o que investigar
          </p>
          <ul className="grid grid-cols-2 gap-1.5">
            {DUELO3.opcoesInvestigacao.map((o) => (
              <li key={o.id}>
                <InvestigationButton
                  tom={feitos.includes(o.id) ? "teal" : "contorno"}
                  className="w-full px-2 text-[11px]"
                  onClick={() => investigar(o.id)}
                  aria-pressed={feitos.includes(o.id)}
                >
                  {o.rotulo}
                </InvestigationButton>
              </li>
            ))}
          </ul>
          <SpeechBubble audio={AUDIO.duelo3Investigacao}>
            <p>{DUELO3.pergunta}</p>
          </SpeechBubble>
        </div>
        <div className="grid min-h-0 grid-cols-2 gap-3">
          <FonteEclipseA className="h-full" />
          <FonteEclipseB className="h-full" />
        </div>
        <InvestigationPanel duelo={3} />
      </div>
    </TelaBase>
  );
}

export function TelaDuelo3Decisao() {
  const { estado, dispatch } = useDuelo();
  const [escolha, setEscolha] = useAtividade<string[]>("d3-escolha", []);
  const [pistas, setPistas] = useAtividade<string[]>("d3-pistas", []);
  const [feedback, setFeedback] = React.useState(false);

  const disponiveis = estado.pistas
    .filter((p) => p.duelo === 3)
    .map((p) => ({ id: p.id, texto: `Fonte ${p.fonte}: ${p.texto}` }));

  const pronto = escolha.length === 1 && pistas.length > 0;

  return (
    <TelaBase
      fundo={FUNDOS.duelo3}
      decoracoes={DECOR_D3}
      titulo="Decisão do Duelo 3"
      etapa="Sua escolha"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => setFeedback(true)}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={pronto}
          aviso="Escolha uma fonte e as pistas que justificam sua decisão."
        />
      }
    >
      <div className="grid h-full grid-cols-[1fr_230px] gap-4">
        <div className="flex min-h-0 flex-col gap-3 overflow-auto pr-1">
          <MultipleChoice
            enunciado={DUELO3.decisao.pergunta}
            opcoes={[
              { id: "A", texto: "Fonte A — Céu e Estrelas" },
              { id: "B", texto: "Fonte B — Observatório da Cidade" },
            ]}
            selecionadas={escolha}
            aoSelecionar={(id) => setEscolha([id])}
            colunas={2}
          />
          {disponiveis.length ? (
            <MultipleChoice
              enunciado={DUELO3.decisao.perguntaPistas}
              multiplo
              opcoes={disponiveis}
              selecionadas={pistas}
              aoSelecionar={(id) =>
                setPistas(pistas.includes(id) ? pistas.filter((p) => p !== id) : [...pistas, id])
              }
              colunas={2}
            />
          ) : (
            <p className="text-[13px] font-semibold text-cinza-azulado">
              Volte uma tela e investigue algumas pistas para justificar sua escolha.
            </p>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <SpeechBubble audio={AUDIO.duelo3Decisao}>
            <p>Essa pista ajuda a explicar sua escolha.</p>
          </SpeechBubble>
          <div className="h-[280px]">
            <CharacterMaya pose="neutra" className="mx-auto" />
          </div>
        </div>
      </div>

      <FeedbackModal
        aberto={feedback}
        titulo="Vamos comparar as duas fontes mais uma vez?"
        paragrafos={[DUELO3.decisao.feedback, DUELO3.decisao.complementar]}
        destaque={DUELO3.decisao.destaque}
        rotuloFechar="SEGUIR"
        aoFechar={() => {
          setFeedback(false);
          dispatch({ tipo: "avancar" });
        }}
        acaoSecundaria={{ rotulo: "REVISAR", aoClicar: () => setFeedback(false) }}
      />
    </TelaBase>
  );
}
