import * as React from "react";
import { cn } from "@/lib/utils";
import {
  AUDIO,
  CRITERIOS,
  FALA_LUPA,
  FUNDOS,
  LIGAR_COLUNAS,
  TELA_PROBLEMA,
} from "@/lib/duelo/conteudo";
import { useAtividade, useDuelo } from "@/lib/duelo/estado";
import {
  AudioButton,
  CharacterMaya,
  FeedbackModal,
  InvestigationButton,
  NavigationControls,
  SpeechBubble,
  TelaBase,
} from "./base";
import { MatchColumnsActivity } from "./atividades";

/* ------------------------- Tela 1 — Capa ------------------------- */

export function TelaCapa() {
  const { dispatch } = useDuelo();
  return (
    <div className="relative h-full w-full">
      <img
        src={FUNDOS.capa}
        alt="Mesa de estudos com o título Duelo das Fontes e Maya, repórter do Jornal das Descobertas"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-grafite/70 via-grafite/10 to-transparent p-6">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-[560px]">
            <h1 className="sr-only">Duelo das Fontes — Antes de acreditar, investigue!</h1>
            <p aria-hidden="true" className="text-2xl font-extrabold uppercase text-card">
              Duelo das Fontes
            </p>
            <p className="mt-1 text-sm font-bold text-card">Antes de acreditar, investigue!</p>
          </div>
          <div className="flex items-center gap-3">
            <AudioButton src={AUDIO.capa} rotulo="Ouvir a apresentação" />
            <InvestigationButton
              tom="teal"
              className="px-10 py-3 text-base"
              onClick={() => dispatch({ tipo: "avancar" })}
            >
              COMEÇAR
            </InvestigationButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Tela 2 — O problema ------------------------- */

export function TelaProblema() {
  const { dispatch } = useDuelo();
  const [passo, setPasso] = useAtividade<number>("problema-passo", 0);
  const ultimo = passo >= TELA_PROBLEMA.falas.length - 1;

  return (
    <TelaBase titulo="O problema" etapa="Jornal das Descobertas" kit={false}
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={ultimo ? () => dispatch({ tipo: "avancar" }) : () => setPasso(passo + 1)}
          rotuloAvancar={ultimo ? "INVESTIGAR" : "DESCOBRIR"}
        />
      }
    >
      <div className="grid h-full grid-cols-[280px_1fr] items-center gap-6">
        <div className="h-[420px]">
          <CharacterMaya pose="pensando" className="mx-auto" />
        </div>
        <div className="space-y-3">
          {TELA_PROBLEMA.falas.slice(0, passo + 1).map((fala, i) => (
            <SpeechBubble key={fala} {...(i === passo ? { audio: AUDIO.problema } : {})}>
              <p className="text-[17px]">{fala}</p>
            </SpeechBubble>
          ))}
        </div>
      </div>
    </TelaBase>
  );
}

/* ------------------------- Tela 3 — O que é uma fonte? ------------------------- */

export function TelaOQueEFonte() {
  const { dispatch } = useDuelo();
  const [ligacoes, setLigacoes] = useAtividade<Record<string, string>>("ligar-colunas", {});
  const [feedback, setFeedback] = React.useState(false);
  const completo = Object.keys(ligacoes).length === LIGAR_COLUNAS.pares.length;

  return (
    <TelaBase
      titulo="O que é uma fonte?"
      etapa="Antes dos duelos"
      kit={false}
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => setFeedback(true)}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={completo}
          aviso="Ligue as três informações às fontes para seguir."
        />
      }
    >
      <div className="grid h-full grid-cols-[1fr_300px] gap-5">
        <div className="flex min-h-0 flex-col gap-3">
          <p className="rounded-2xl border-2 border-amarelo bg-amarelo/15 px-4 py-2 text-[15px] font-bold text-grafite">
            {LIGAR_COLUNAS.definicao}
          </p>
          <MatchColumnsActivity
            pares={LIGAR_COLUNAS.pares}
            ligacoes={ligacoes}
            aoLigar={(a, b) => setLigacoes({ ...ligacoes, [a]: b })}
          />
        </div>
        <div className="flex flex-col justify-end">
          <SpeechBubble audio={AUDIO.fonte}>
            <p>Vamos ligar cada informação ao lugar de onde ela costuma vir?</p>
          </SpeechBubble>
          <div className="h-[300px]">
            <CharacterMaya pose="apontando" className="mx-auto" />
          </div>
        </div>
      </div>

      <FeedbackModal
        aberto={feedback}
        titulo="Pista organizada"
        paragrafos={[LIGAR_COLUNAS.feedbackFinal]}
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

/* ------------------------- Tela 4 — Lupa de investigação ------------------------- */

export function TelaLupa() {
  const { estado, dispatch } = useDuelo();
  const [abertos, setAbertos] = useAtividade<string[]>("lupa-abertos", []);
  const todos = abertos.length === CRITERIOS.length;

  const abrir = (id: string) => {
    if (!abertos.includes(id)) setAbertos([...abertos, id]);
    dispatch({ tipo: "kit", item: id as (typeof CRITERIOS)[number]["id"] });
  };

  return (
    <TelaBase
      titulo="Lupa de investigação"
      etapa="Cinco pistas para observar"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="INVESTIGAR"
          avancarLiberado={todos}
          aviso="Abra as cinco pistas para reunir seu kit."
        />
      }
    >
      <div className="grid h-full grid-cols-[1fr_250px] gap-5">
        <ul className="grid grid-cols-2 content-start gap-2.5">
          {CRITERIOS.map((c) => {
            const aberto = abertos.includes(c.id);
            return (
              <li key={c.id} className={cn(c.id === "situacao" && "col-span-2")}>
                <button
                  type="button"
                  onClick={() => abrir(c.id)}
                  aria-expanded={aberto}
                  className={cn(
                    "min-h-11 w-full rounded-2xl border-2 px-4 py-3 text-left transition-colors",
                    aberto
                      ? "border-roxo bg-roxo/10"
                      : "border-cinza-azulado/35 bg-card hover:border-azul",
                  )}
                >
                  <span className="text-[13px] font-extrabold uppercase tracking-wide text-azul">
                    {c.titulo}
                  </span>
                  <span className="mt-1 block text-[13px] leading-snug text-grafite">
                    {aberto ? c.perguntaLupa : "Clique para descobrir esta pista."}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col justify-between">
          <SpeechBubble audio={AUDIO.lupa}>
            <p>{FALA_LUPA}</p>
          </SpeechBubble>
          <div className="h-[280px]">
            <CharacterMaya pose="tablet" className="mx-auto" />
          </div>
          <p className="text-center text-[11px] font-bold text-cinza-azulado">
            {estado.kit.length} de 5 estratégias reunidas
          </p>
        </div>
      </div>
    </TelaBase>
  );
}
