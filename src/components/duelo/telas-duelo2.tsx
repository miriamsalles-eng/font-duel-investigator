import * as React from "react";
import { DECORATIVOS, FUNDOS,AUDIO, DUELO2, PISTA_MAGICA } from "@/lib/duelo/conteudo";
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
import { FonteMorcegoA, FonteMorcegoB } from "./fontes";

const DECOR_D2 = [
  { src: DECORATIVOS.clipeTeal, className: "left-[-12px] top-[150px] w-[44px] rotate-6 opacity-80" },
  { src: DECORATIVOS.iconeCartasPergunta, className: "right-[20px] bottom-[70px] w-[42px] opacity-55" },
  { src: DECORATIVOS.iconePastaArquivos, className: "right-[66px] bottom-[68px] w-[40px] opacity-50" },
];


export function TelaDuelo2Fontes() {
  const { dispatch } = useDuelo();
  return (
    <TelaBase
      fundo={FUNDOS.duelo2}
      decoracoes={DECOR_D2}
      titulo="Duelo 2 — Morcegos"
      etapa="Investigação compartilhada"
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
          <SpeechBubble audio={AUDIO.duelo2}>
            <p className="font-bold">{DUELO2.pergunta}</p>
            <p>{DUELO2.fala}</p>
          </SpeechBubble>
          <div className="h-[250px]">
            <CharacterMaya pose="pensando" className="mx-auto" />
          </div>
        </div>
        <div className="grid min-h-0 grid-cols-2 gap-3">
          <FonteMorcegoA className="h-full" />
          <FonteMorcegoB className="h-full" />
        </div>
      </div>
    </TelaBase>
  );
}

export function TelaDuelo2Investigacao() {
  const { dispatch } = useDuelo();
  const registrar = useRegistrarPista(2);
  const [feitos, setFeitos] = useAtividade<string[]>("d2-investigacoes", []);

  const investigar = (id: string) => {
    const achado = DUELO2.achados[id];
    if (!achado) return;
    if (!feitos.includes(id)) setFeitos([...feitos, id]);
    registrar(`d2-${id}-A`, achado.A, "A");
    registrar(`d2-${id}-B`, achado.B, "B");
  };

  return (
    <TelaBase
      fundo={FUNDOS.duelo2}
      decoracoes={DECOR_D2}
      titulo="Você escolhe por onde começar"
      etapa="Duelo 2 — Morcegos"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="COMPARAR"
          avancarLiberado={feitos.length >= 2}
          aviso="Escolha pelo menos duas investigações antes de comparar."
        />
      }
    >
      <div className="grid h-full grid-cols-[260px_1fr_320px] gap-4">
        <div className="flex flex-col gap-2">
          <SpeechBubble audio={AUDIO.duelo2Investigacao}>
            <p>{DUELO2.fala}</p>
          </SpeechBubble>
          <ul className="space-y-1.5">
            {DUELO2.opcoesInvestigacao.map((o) => (
              <li key={o.id}>
                <InvestigationButton
                  tom={feitos.includes(o.id) ? "teal" : "contorno"}
                  className="w-full text-[12px]"
                  onClick={() => investigar(o.id)}
                  aria-pressed={feitos.includes(o.id)}
                >
                  {o.rotulo}
                </InvestigationButton>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid min-h-0 grid-cols-2 gap-3">
          <FonteMorcegoA className="h-full" />
          <FonteMorcegoB className="h-full" />
        </div>
        <InvestigationPanel duelo={2} />
      </div>
    </TelaBase>
  );
}

export function TelaDuelo2Comparacao() {
  const { dispatch } = useDuelo();
  const [organizacao, setOrganizacao] = useAtividade<Record<string, string>>("d2-cartoes", {});
  const [escolha, setEscolha] = useAtividade<string[]>("d2-escolha", []);
  const [justificativa, setJustificativa] = useAtividade<string[]>("d2-justificativa", []);
  const [feedback, setFeedback] = React.useState<null | "A" | "B">(null);

  const organizados = Object.keys(organizacao).length === DUELO2.cartoesComparacao.length;
  const pronto = organizados && escolha.length === 1 && justificativa.length > 0;

  return (
    <TelaBase
      fundo={FUNDOS.duelo2}
      decoracoes={DECOR_D2}
      titulo="Comparação do Duelo 2"
      etapa="Organize e decida"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => setFeedback((escolha[0] as "A" | "B") ?? "B")}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={pronto}
          aviso="Organize os seis cartões, escolha uma fonte e complete a justificativa."
        />
      }
    >
      <div className="grid h-full grid-cols-[1fr_320px] gap-4">
        <div className="flex min-h-0 flex-col gap-2 overflow-auto pr-1">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-cinza-azulado">
            Coloque cada cartão na fonte em que você observou isso
          </p>
          <ul className="space-y-1.5">
            {DUELO2.cartoesComparacao.map((texto) => (
              <li
                key={texto}
                className="flex items-center gap-2 rounded-xl border-2 border-cinza-azulado/30 bg-card px-3 py-1.5"
              >
                <span className="flex-1 text-[13px] font-semibold leading-snug text-grafite">
                  {texto}
                </span>
                {(["A", "B"] as const).map((lado) => (
                  <button
                    key={lado}
                    type="button"
                    aria-pressed={organizacao[texto] === lado}
                    aria-label={`Cartão “${texto}” na Fonte ${lado}`}
                    onClick={() => setOrganizacao({ ...organizacao, [texto]: lado })}
                    className={
                      organizacao[texto] === lado
                        ? "min-h-9 rounded-full border-2 border-roxo bg-roxo/12 px-3 text-[11px] font-extrabold text-roxo"
                        : "min-h-9 rounded-full border-2 border-cinza-azulado/35 px-3 text-[11px] font-extrabold text-cinza-azulado hover:border-azul"
                    }
                  >
                    Fonte {lado}
                  </button>
                ))}
              </li>
            ))}
          </ul>

          <MultipleChoice
            enunciado={DUELO2.perguntaDecisao}
            opcoes={[
              { id: "A", texto: "Fonte A — Curiosidades Superincríveis" },
              { id: "B", texto: "Fonte B — Museu da Vida Animal" },
            ]}
            selecionadas={escolha}
            aoSelecionar={(id) => setEscolha([id])}
            colunas={2}
          />

          <MultipleChoice
            enunciado={`Complete: ${DUELO2.justificativaModelo}`}
            multiplo
            opcoes={DUELO2.cartoesComparacao.map((t) => ({ id: t, texto: t }))}
            selecionadas={justificativa}
            aoSelecionar={(id) =>
              setJustificativa(
                justificativa.includes(id)
                  ? justificativa.filter((j) => j !== id)
                  : [...justificativa, id],
              )
            }
            colunas={2}
          />
        </div>
        <div className="flex min-h-0 flex-col gap-2">
          <InvestigationPanel duelo={2} compacto />
          <SpeechBubble audio={AUDIO.duelo2Comparacao}>
            <p>Que outra pista pode nos ajudar?</p>
          </SpeechBubble>
        </div>
      </div>

      <FeedbackModal
        aberto={feedback === "B"}
        titulo="Comparando evidências"
        paragrafos={[DUELO2.feedback]}
        rotuloFechar="SEGUIR"
        aoFechar={() => {
          setFeedback(null);
          dispatch({ tipo: "avancar" });
        }}
        acaoSecundaria={{ rotulo: "REVISAR", aoClicar: () => setFeedback(null) }}
      />
      <FeedbackModal
        aberto={feedback === "A"}
        titulo="Antes de decidir"
        paragrafos={[DUELO2.feedbackFonteA]}
        rotuloFechar="REVISAR"
        aoFechar={() => setFeedback(null)}
        acaoSecundaria={{
          rotulo: "SEGUIR MESMO ASSIM",
          aoClicar: () => {
            setFeedback(null);
            dispatch({ tipo: "avancar" });
          },
        }}
      />
    </TelaBase>
  );
}

export function TelaPistaMagica() {
  const { dispatch } = useDuelo();
  return (
    <TelaBase
      fundo={FUNDOS.duelo2}
      decoracoes={DECOR_D2}
      titulo="Não existe pista mágica"
      etapa="Entre os duelos"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="SEGUIR"
        />
      }
    >
      <div className="grid h-full grid-cols-[280px_1fr] items-center gap-6">
        <div className="h-[400px]">
          <CharacterMaya pose="apontando" className="mx-auto" />
        </div>
        <div className="space-y-3">
          <SpeechBubble audio={AUDIO.pistaMagica}>
            {PISTA_MAGICA.falas.map((f) => (
              <p key={f} className="text-[16px]">
                {f}
              </p>
            ))}
          </SpeechBubble>
          <div className="rounded-2xl border-2 border-amarelo bg-amarelo/15 p-4">
            {PISTA_MAGICA.destaque.map((d) => (
              <p key={d} className="text-lg font-extrabold uppercase leading-tight text-grafite">
                {d}
              </p>
            ))}
          </div>
        </div>
      </div>
    </TelaBase>
  );
}
