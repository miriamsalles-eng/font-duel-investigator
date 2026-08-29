import * as React from "react";
import {
  DECORATIVOS,
  FUNDOS,
  AUDIO,
  CAMINHO,
  ENCERRAMENTO,
  KIT_ITENS,
  METACOGNICAO,
  TRANSFERENCIA,
} from "@/lib/duelo/conteudo";
import { useAtividade, useDuelo } from "@/lib/duelo/estado";
import {
  CharacterMaya,
  FeedbackModal,
  InvestigationButton,
  NavigationControls,
  ProgressKit,
  SpeechBubble,
  TelaBase,
  useConquistarKit,
} from "./base";
import { DragDropActivity, MultipleChoice } from "./atividades";

const DECOR_FINAL = [
  { src: DECORATIVOS.estrelaPequena, className: "left-[16px] top-[110px] w-[26px] opacity-70" },
  { src: DECORATIVOS.faixaRasgadaTeal, className: "right-[-14px] top-[92px] w-[120px] rotate-3 opacity-70" },
  { src: DECORATIVOS.iconeSeloEstrela, className: "right-[24px] bottom-[70px] w-[44px] opacity-60" },
];


/* ---------------- Monte seu caminho de investigação ---------------- */

export function TelaCaminho() {
  const { dispatch } = useDuelo();
  const [colocacoes, setColocacoes] = useAtividade<Record<string, string>>("caminho", {});
  const [feedback, setFeedback] = React.useState(false);
  useConquistarKit(["quem", "quando", "origem", "confirmam", "situacao"]);

  const investigativos = CAMINHO.cartoes.filter((c) => c.investigativo);
  const escolhidos = investigativos.filter((c) => colocacoes[c.id] === "caminho");
  const completo = escolhidos.length >= 3;

  return (
    <TelaBase
      fundo={FUNDOS.final}
      decoracoes={DECOR_FINAL}
      titulo={CAMINHO.titulo}
      etapa="Sua estratégia"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => setFeedback(true)}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={completo}
          aviso="Monte um caminho com pelo menos três passos de investigação."
        />
      }
    >
      <DragDropActivity
        itens={CAMINHO.cartoes.map((c) => ({ id: c.id, texto: c.texto }))}
        destinos={[
          { id: "caminho", rotulo: "Meu caminho de investigação" },
          { id: "fora", rotulo: "Não me ajuda a investigar" },
        ]}
        colocacoes={colocacoes}
        aoColocar={(item, destino) => setColocacoes({ ...colocacoes, [item]: destino })}
        aoRemover={(item) => {
          const copia = { ...colocacoes };
          delete copia[item];
          setColocacoes(copia);
        }}
        legenda="Arraste os cartões ou selecione um e escolha onde ele entra."
      />

      <FeedbackModal
        aberto={feedback}
        titulo="Seu caminho"
        paragrafos={[CAMINHO.feedback]}
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

/* ---------------- Metacognição ---------------- */

export function TelaMetacognicao() {
  const { dispatch } = useDuelo();
  const [q1, setQ1] = useAtividade<string[]>("meta-q1", []);
  const [q2, setQ2] = useAtividade<string[]>("meta-q2", []);
  const [q3, setQ3] = useAtividade<string[]>("meta-q3", []);
  const [feedback, setFeedback] = React.useState<null | "esperada" | "revisar">(null);

  const pronto = q1.length === 1 && q2.length > 0 && q3.length > 0;

  const alternar = (
    valor: string[],
    definir: (v: string[]) => void,
    id: string,
  ) => definir(valor.includes(id) ? valor.filter((v) => v !== id) : [...valor, id]);

  return (
    <TelaBase
      fundo={FUNDOS.final}
      decoracoes={DECOR_FINAL}
      titulo={METACOGNICAO.titulo}
      etapa="Reflexão"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() =>
            setFeedback(q1[0] === METACOGNICAO.pergunta1.esperada ? "esperada" : "revisar")
          }
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={pronto}
          aviso="Responda às três perguntas para seguir."
        />
      }
    >
      <div className="grid h-full grid-cols-[1fr_210px] gap-4">
        <div className="flex min-h-0 flex-col gap-3 overflow-auto pr-1">
          <MultipleChoice
            enunciado={METACOGNICAO.pergunta1.enunciado}
            opcoes={METACOGNICAO.pergunta1.alternativas}
            selecionadas={q1}
            aoSelecionar={(id) => setQ1([id])}
          />
          <MultipleChoice
            enunciado={METACOGNICAO.pergunta2.enunciado}
            multiplo
            colunas={2}
            opcoes={METACOGNICAO.pergunta2.opcoes.map((o) => ({ id: o, texto: o }))}
            selecionadas={q2}
            aoSelecionar={(id) => alternar(q2, setQ2, id)}
          />
          <MultipleChoice
            enunciado={METACOGNICAO.pergunta3.enunciado}
            multiplo
            colunas={2}
            opcoes={METACOGNICAO.pergunta3.opcoes.map((o) => ({ id: o, texto: o }))}
            selecionadas={q3}
            aoSelecionar={(id) => alternar(q3, setQ3, id)}
          />
        </div>
        <div className="flex flex-col justify-between">
          <SpeechBubble audio={AUDIO.metacognicao}>
            <p>{METACOGNICAO.fala}</p>
          </SpeechBubble>
          <div className="h-[250px]">
            <CharacterMaya pose="pensando" className="mx-auto" />
          </div>
        </div>
      </div>

      <FeedbackModal
        aberto={feedback === "esperada"}
        titulo="Sua reflexão"
        paragrafos={[METACOGNICAO.pergunta1.feedbackEsperada]}
        rotuloFechar="SEGUIR"
        aoFechar={() => {
          setFeedback(null);
          dispatch({ tipo: "avancar" });
        }}
      />
      <FeedbackModal
        aberto={feedback === "revisar"}
        titulo="Vamos revisar juntos"
        paragrafos={[METACOGNICAO.pergunta1.feedbackRevisar]}
        rotuloFechar="REVISAR"
        aoFechar={() => setFeedback(null)}
      />
    </TelaBase>
  );
}

/* ---------------- Transferência ---------------- */

export function TelaTransferencia() {
  const { dispatch } = useDuelo();
  return (
    <TelaBase
      fundo={FUNDOS.final}
      decoracoes={DECOR_FINAL}
      titulo="Leve a investigação com você"
      etapa="Transferência"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => dispatch({ tipo: "avancar" })}
          rotuloAvancar="SEGUIR"
        />
      }
    >
      <div className="grid h-full grid-cols-[1fr_320px] items-center gap-6">
        <SpeechBubble audio={AUDIO.transferencia}>
          {TRANSFERENCIA.falas.map((f) => (
            <p key={f} className="text-[17px]">
              {f}
            </p>
          ))}
        </SpeechBubble>
        <div className="h-[380px]">
          <CharacterMaya pose="tablet" className="mx-auto" />
        </div>
      </div>
    </TelaBase>
  );
}

/* ---------------- Encerramento ---------------- */

export function TelaEncerramento() {
  const { dispatch } = useDuelo();
  return (
    <TelaBase
      fundo={FUNDOS.final}
      decoracoes={DECOR_FINAL}
      titulo="Investigação concluída"
      etapa="Encerramento"
      kit={false}
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          extra={
            <InvestigationButton tom="contorno" onClick={() => dispatch({ tipo: "recomecar" })}>
              INVESTIGAR DE NOVO
            </InvestigationButton>
          }
        />
      }
    >
      <div className="grid h-full grid-cols-[1fr_300px] items-center gap-6">
        <div className="space-y-3">
          <SpeechBubble audio={AUDIO.encerramento}>
            {ENCERRAMENTO.falas.map((f) => (
              <p key={f} className="text-[17px]">
                {f}
              </p>
            ))}
          </SpeechBubble>
          <div className="rounded-2xl border-2 border-amarelo bg-amarelo/15 p-4">
            <p className="text-2xl font-extrabold uppercase tracking-wide text-grafite">
              {ENCERRAMENTO.selo}
            </p>
            <p className="text-sm font-semibold text-cinza-azulado">{ENCERRAMENTO.complemento}</p>
          </div>
          <div className="rounded-2xl border-2 border-roxo/40 bg-card p-3">
            <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-cinza-azulado">
              Estratégias reunidas no seu kit
            </h2>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {KIT_ITENS.map((i) => (
                <li
                  key={i.id}
                  className="rounded-full border-2 border-roxo px-2 py-1 text-[11px] font-bold uppercase text-roxo"
                >
                  {i.rotulo}
                </li>
              ))}
            </ul>
          </div>
          <ProgressKit compacto />
        </div>
        <div className="h-[400px]">
          <CharacterMaya pose="comemorando" className="mx-auto" />
        </div>
      </div>
    </TelaBase>
  );
}
