import * as React from "react";
import { cn } from "@/lib/utils";
import {
  DECORATIVOS,
  AUDIO,
  CORES_CRITERIO,
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

const DECOR_INTRO = [
  {
    src: DECORATIVOS.fitaTeal,
    className: "left-[-18px] top-[86px] w-[110px] -rotate-6 opacity-80",
  },
  {
    src: DECORATIVOS.clipeAzul,
    className: "right-[16px] bottom-[92px] w-[46px] rotate-12 opacity-80",
  },
  { src: DECORATIVOS.pontinhoAmarelo, className: "left-[46%] bottom-[10px] w-[22px] opacity-70" },
];

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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[560px]">
            <h1 className="sr-only">Duelo das Fontes — Antes de acreditar, investigue!</h1>
            <p aria-hidden="true" className="text-3xl font-extrabold uppercase text-card">
              Duelo das Fontes
            </p>
            <p className="mt-1 text-[17px] font-bold text-card">Antes de acreditar, investigue!</p>
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

  return (
    <TelaBase
      fundo={FUNDOS.intro}
      decoracoes={DECOR_INTRO}
      titulo="O problema"
      etapa="Jornal das Descobertas"
      kit={false}
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="INVESTIGAR"
        />
      }
    >
      <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,260px)] items-center gap-6">
        <SpeechBubble audio={AUDIO.problema}>
          {TELA_PROBLEMA.falas.map((fala) => (
            <p key={fala} className="text-[18px]">
              {fala}
            </p>
          ))}
        </SpeechBubble>
        <div className="h-[380px]">
          <CharacterMaya pose="pensando" className="mx-auto" />
        </div>
      </div>
    </TelaBase>
  );
}

/* ------------------------- Tela 3 — O que é uma fonte? ------------------------- */

export function TelaOQueEFonte() {
  const { dispatch } = useDuelo();
  const [ligacoes, setLigacoes] = useAtividade<Record<string, string>>("ligar-colunas", {});
  const [revisar, setRevisar] = React.useState<string[]>([]);
  const [erro, setErro] = React.useState(false);
  const [acerto, setAcerto] = React.useState(false);

  const completo = Object.keys(ligacoes).length === LIGAR_COLUNAS.pares.length;

  /** Cada destino da coluna B só pode estar ligado a uma informação por vez. */
  const ligar = (idA: string, idB: string) => {
    const proximo: Record<string, string> = {};
    Object.entries(ligacoes).forEach(([a, b]) => {
      if (b !== idB && a !== idA) proximo[a] = b;
    });
    proximo[idA] = idB;
    setLigacoes(proximo);
    setRevisar([]);
  };

  const confirmar = () => {
    const incorretos = LIGAR_COLUNAS.pares.filter((p) => ligacoes[p.id] !== p.id).map((p) => p.id);
    if (incorretos.length) {
      setRevisar(incorretos);
      setErro(true);
      return;
    }
    setRevisar([]);
    setAcerto(true);
  };

  return (
    <TelaBase
      fundo={FUNDOS.intro}
      decoracoes={DECOR_INTRO}
      titulo="O que é uma fonte?"
      etapa="Antes dos duelos"
      kit={false}
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={confirmar}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={completo}
          aviso="Ligue as três informações às fontes para seguir."
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-3">
        <div className="rounded-2xl border-2 border-amarelo bg-[#FFFCF3] px-5 py-3 shadow-[0_6px_16px_-12px_rgba(47,52,64,0.5)]">
          <p className="text-[13px] font-extrabold uppercase tracking-widest text-teal-escuro">
            Conceito
          </p>
          <p className="text-[18px] font-bold leading-snug text-grafite">
            {LIGAR_COLUNAS.definicao}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[18px] font-extrabold leading-snug text-grafite">
            {LIGAR_COLUNAS.comando}
          </p>
          <AudioButton src={AUDIO.fonte} rotulo="Ouvir o comando da atividade" />
        </div>
        <MatchColumnsActivity
          pares={LIGAR_COLUNAS.pares}
          ligacoes={ligacoes}
          aoLigar={ligar}
          revisar={revisar}
        />
      </div>

      <FeedbackModal
        aberto={erro}
        titulo="Vamos observar de novo"
        paragrafos={[LIGAR_COLUNAS.feedbackErro]}
        rotuloFechar="REVISAR"
        aoFechar={() => setErro(false)}
      />
      <FeedbackModal
        aberto={acerto}
        titulo="Pista organizada"
        paragrafos={[LIGAR_COLUNAS.feedbackFinal]}
        rotuloFechar="SEGUIR"
        aoFechar={() => {
          setAcerto(false);
          dispatch({ tipo: "avancar" });
        }}
      />
    </TelaBase>
  );
}

/* ------------------------- Tela 4 — Lupa de investigação ------------------------- */

export function TelaLupa() {
  const { dispatch } = useDuelo();

  React.useEffect(() => {
    CRITERIOS.forEach((c) => dispatch({ tipo: "kit", item: c.id }));
  }, [dispatch]);

  return (
    <TelaBase
      fundo={FUNDOS.intro}
      decoracoes={DECOR_INTRO}
      titulo="Lupa de investigação"
      etapa="Cinco pistas para observar"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="INVESTIGAR"
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className="text-[17px] font-extrabold leading-snug text-grafite">{FALA_LUPA}</p>
          <AudioButton src={AUDIO.lupa} rotulo="Ouvir a explicação de Maya" />
        </div>
        <ul className="grid flex-1 grid-cols-8 content-start gap-3">
          {CRITERIOS.map((c, i) => {
            const cor = CORES_CRITERIO[c.id];
            return (
              <li
                key={c.id}
                className={cn(
                  "col-span-2 rounded-2xl border-2 bg-card px-3.5 py-3 shadow-[0_6px_16px_-14px_rgba(47,52,64,0.5)]",
                  cor.card,
                  i === 4 && "col-start-4",
                )}
              >
                <img
                  src={cor.icone}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="h-8 w-8 select-none object-contain"
                />
                <p className={cn("mt-1 text-[15px] font-extrabold uppercase tracking-wide", cor.titulo)}>
                  {c.titulo}
                </p>
                <p className="mt-1 text-[15px] leading-snug text-grafite">{c.perguntaLupa}</p>
              </li>
            );
          })}
        </ul>

      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10px] right-2 h-[150px]"
      >
        <CharacterMaya pose="tablet" />
      </div>

    </TelaBase>
  );
}
