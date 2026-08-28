import * as React from "react";
import { AUDIO, DUELO1 } from "@/lib/duelo/conteudo";
import { useAtividade, useDuelo } from "@/lib/duelo/estado";
import {
  CharacterMaya,
  FeedbackModal,
  NavigationControls,
  SpeechBubble,
  TelaBase,
} from "./base";
import { DragDropActivity, InvestigationPanel, MultipleChoice, useRegistrarPista } from "./atividades";
import { FonteFeiraA, FonteFeiraB } from "./fontes";

/* ---------------- Duelo 1 — apresentação das fontes ---------------- */

export function TelaDuelo1Fontes() {
  const { dispatch } = useDuelo();
  return (
    <TelaBase
      titulo="Duelo 1 — Feira de Ciências"
      etapa="Investigação guiada"
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
          <SpeechBubble audio={AUDIO.duelo1}>
            <p>{DUELO1.fala}</p>
          </SpeechBubble>
          <div className="h-[240px]">
            <CharacterMaya pose="neutra" className="mx-auto" />
          </div>
        </div>
        <div className="flex min-h-0 flex-col gap-2">
          <p className="text-[13px] font-semibold text-cinza-azulado">{DUELO1.situacao}</p>
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
            <FonteFeiraA className="h-full" />
            <FonteFeiraB className="h-full" />
          </div>
        </div>
      </div>
    </TelaBase>
  );
}

/* ---------------- Duelo 1 — investigação guiada ---------------- */

const HOTSPOTS = [
  { id: "h1", passo: 0, fonte: "A" as const, rotulo: "Procurar a data na Fonte A", pista: "Não apresenta data.", criterio: "quando" as const },
  { id: "h2", passo: 0, fonte: "B" as const, rotulo: "Procurar a data na Fonte B", pista: "A informação é deste ano.", criterio: "quando" as const },
  { id: "h3", passo: 1, fonte: "A" as const, rotulo: "Procurar quem publicou a Fonte A", pista: "Não fica claro quem publicou.", criterio: "quem" as const },
  { id: "h4", passo: 1, fonte: "B" as const, rotulo: "Procurar quem publicou a Fonte B", pista: "A escola está identificada.", criterio: "quem" as const },
];

export function TelaDuelo1Investigacao() {
  const { dispatch } = useDuelo();
  const registrar = useRegistrarPista(1);
  const [achados, setAchados] = useAtividade<string[]>("d1-achados", []);
  const passo = achados.filter((id) => HOTSPOTS.find((h) => h.id === id)?.passo === 0).length >= 2 ? 1 : 0;
  const completo = achados.length === HOTSPOTS.length;

  const clicar = (h: (typeof HOTSPOTS)[number]) => {
    if (!achados.includes(h.id)) setAchados([...achados, h.id]);
    registrar(`d1-${h.id}`, h.pista, h.fonte, h.criterio);
  };

  return (
    <TelaBase
      titulo="Investigação guiada"
      etapa="Duelo 1 — Feira de Ciências"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="COMPARAR"
          avancarLiberado={completo}
          aviso="Procure as pistas de data e de autoria nas duas fontes."
        />
      }
    >
      <div className="grid h-full grid-cols-[1fr_320px] gap-4">
        <div className="flex min-h-0 flex-col gap-2">
          <SpeechBubble audio={AUDIO.duelo1Investigacao}>
            <p>{DUELO1.investigacao.intro}</p>
            <p className="font-bold">
              {passo === 0 ? DUELO1.investigacao.passo1 : DUELO1.investigacao.passo2}
            </p>
          </SpeechBubble>
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
            {(["A", "B"] as const).map((lado) => (
              <div key={lado} className="flex min-h-0 flex-col gap-2">
                {lado === "A" ? <FonteFeiraA className="min-h-0 flex-1" /> : <FonteFeiraB className="min-h-0 flex-1" />}
                <div className="flex flex-col gap-1.5">
                  {HOTSPOTS.filter((h) => h.fonte === lado).map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => clicar(h)}
                      disabled={h.passo > passo}
                      aria-pressed={achados.includes(h.id)}
                      className="min-h-11 rounded-xl border-2 border-azul/40 bg-azul-claro px-3 py-2 text-left text-[12px] font-bold text-azul transition-colors hover:bg-azul hover:text-primary-foreground disabled:opacity-40"
                    >
                      {achados.includes(h.id) ? `Pista registrada: ${h.pista}` : h.rotulo}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <InvestigationPanel duelo={1} />
      </div>
    </TelaBase>
  );
}

/* ---------------- Duelo 1 — Painel: arrastar as pistas ---------------- */

export function TelaDuelo1Painel() {
  const { dispatch } = useDuelo();
  const [colocacoes, setColocacoes] = useAtividade<Record<string, string>>("d1-painel", {});
  const [aparencia, setAparencia] = React.useState(false);

  const itens = DUELO1.pistas.map((p) => ({ id: p.id, texto: p.texto }));
  const investigativas = DUELO1.pistas.filter((p) => p.tipo === "pista");
  const completo = investigativas.every((p) => colocacoes[p.id]);

  const colocar = (itemId: string, destinoId: string) => {
    const pista = DUELO1.pistas.find((p) => p.id === itemId);
    if (pista?.tipo === "aparencia" && destinoId !== "fora") {
      setAparencia(true);
      return;
    }
    setColocacoes({ ...colocacoes, [itemId]: destinoId });
  };

  return (
    <TelaBase
      titulo="Painel do Duelo 1"
      etapa="Organize as pistas"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={completo}
          aviso="Coloque as quatro pistas de data e autoria em cada fonte."
        />
      }
    >
      <DragDropActivity
        itens={itens}
        destinos={[
          { id: "A", rotulo: "Fonte A" },
          { id: "B", rotulo: "Fonte B" },
          { id: "fora", rotulo: "Só aparência — não é evidência" },
        ]}
        colocacoes={colocacoes}
        aoColocar={colocar}
        aoRemover={(id) => {
          const copia = { ...colocacoes };
          delete copia[id];
          setColocacoes(copia);
        }}
        legenda="Arraste ou selecione uma pista e depois escolha onde ela entra."
      />

      <FeedbackModal
        aberto={aparencia}
        titulo="Vamos observar de novo"
        paragrafos={[DUELO1.feedbackAparencia]}
        rotuloFechar="REVISAR"
        aoFechar={() => setAparencia(false)}
      />
    </TelaBase>
  );
}

/* ---------------- Duelo 1 — decisão ---------------- */

export function TelaDuelo1Decisao() {
  const { dispatch } = useDuelo();
  const [fonte, setFonte] = useAtividade<string[]>("d1-escolha", []);
  const [pista, setPista] = useAtividade<string[]>("d1-pista-decisiva", []);
  const [feedback, setFeedback] = React.useState(false);

  const pronto = fonte.length === 1 && pista.length === 1;

  return (
    <TelaBase
      titulo="Decisão do Duelo 1"
      etapa="Sua escolha"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => setFeedback(true)}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={pronto}
          aviso="Escolha uma fonte e a pista que mais ajudou."
        />
      }
    >
      <div className="grid h-full grid-cols-[1fr_240px] gap-5">
        <div className="space-y-4">
          <MultipleChoice
            enunciado={DUELO1.decisao.pergunta}
            opcoes={[
              { id: "A", texto: "Fonte A" },
              { id: "B", texto: "Fonte B" },
            ]}
            selecionadas={fonte}
            aoSelecionar={(id) => setFonte([id])}
            colunas={2}
          />
          <MultipleChoice
            enunciado={DUELO1.decisao.perguntaPista}
            opcoes={DUELO1.pistas
              .filter((p) => p.tipo === "pista")
              .map((p) => ({ id: p.id, texto: p.texto }))}
            selecionadas={pista}
            aoSelecionar={(id) => setPista([id])}
            colunas={2}
          />
        </div>
        <div className="flex flex-col justify-between">
          <SpeechBubble audio={AUDIO.duelo1Decisao}>
            <p>Que pista pesou mais para você?</p>
          </SpeechBubble>
          <div className="h-[280px]">
            <CharacterMaya pose="apontandoAcima" className="mx-auto" />
          </div>
        </div>
      </div>

      <FeedbackModal
        aberto={feedback}
        titulo="Vamos comparar as duas fontes"
        paragrafos={[DUELO1.decisao.feedback, DUELO1.decisao.complementar]}
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
