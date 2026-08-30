import * as React from "react";
import { DECORATIVOS, FUNDOS, AUDIO, DUELO1 } from "@/lib/duelo/conteudo";
import { useAtividade, useDuelo } from "@/lib/duelo/estado";
import {
  AudioButton,
  CharacterMaya,
  FeedbackModal,
  NavigationControls,
  TelaBase,
} from "./base";
import { MultipleChoice } from "./atividades";
import { FonteFeiraA, FonteFeiraB } from "./fontes";

const DECOR_D1 = [
  { src: DECORATIVOS.clipeAmarelo, className: "left-[-14px] top-[130px] w-[44px] -rotate-12 opacity-80" },
  { src: DECORATIVOS.iconeCalendario, className: "right-[18px] bottom-[74px] w-[42px] opacity-60" },
];

const OPCOES_FONTE = [
  { id: "A", texto: "Fonte A" },
  { id: "B", texto: "Fonte B" },
];

/* ---------------- Duelo 1 — investigação guiada (fontes + pistas) ---------------- */

export function TelaDuelo1Investigacao() {
  const { dispatch } = useDuelo();
  const [respostas, setRespostas] = useAtividade<Record<string, string>>("d1-guiadas", {});
  const [erro, setErro] = React.useState(false);

  const completo = DUELO1.guiadas.every((g) => respostas[g.id]);
  const correto = DUELO1.guiadas.every((g) => respostas[g.id] === g.esperada);

  const confirmar = () => {
    if (!correto) {
      setErro(true);
      return;
    }
    dispatch({ tipo: "avancar" });
  };

  return (
    <TelaBase
      fundo={FUNDOS.duelo1}
      decoracoes={DECOR_D1}
      titulo="Duelo 1 — Feira de Ciências"
      etapa="Investigação guiada"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={confirmar}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={completo}
          aviso="Responda às duas perguntas para seguir."
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-2.5">
        <div className="flex items-start gap-3">
          <p className="text-[17px] font-extrabold leading-snug text-grafite">{DUELO1.comando}</p>
          <AudioButton src={AUDIO.duelo1Investigacao} rotulo="Ouvir o comando da investigação" />
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-3">
          <FonteFeiraA />
          <FonteFeiraB />
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-3">
          {DUELO1.guiadas.map((g) => (
            <MultipleChoice
              key={g.id}
              enunciado={g.enunciado}
              opcoes={OPCOES_FONTE}
              selecionadas={respostas[g.id] ? [respostas[g.id]!] : []}
              aoSelecionar={(id) => {
                setRespostas({ ...respostas, [g.id]: id });
              }}
              colunas={2}
            />
          ))}
        </div>
      </div>

      <FeedbackModal
        aberto={erro}
        titulo="Vamos procurar de novo"
        paragrafos={[DUELO1.feedbackErroGuiada]}
        rotuloFechar="REVISAR"
        aoFechar={() => setErro(false)}
      />
    </TelaBase>
  );
}

/* ---------------- Duelo 1 — decisão ---------------- */

export function TelaDuelo1Decisao() {
  const { dispatch } = useDuelo();
  const [fonte, setFonte] = useAtividade<string[]>("d1-escolha", []);
  const [pistas, setPistas] = useAtividade<string[]>("d1-pistas", []);
  const [feedback, setFeedback] = React.useState<null | "erro" | "acerto">(null);

  const pronto = fonte.length === 1 && pistas.length > 0;
  const corretas = DUELO1.decisao.opcoes.filter((o) => o.correta).map((o) => o.id);
  const temDistrator = pistas.some((p) => !corretas.includes(p));
  const valido = fonte[0] === "B" && pistas.some((p) => corretas.includes(p)) && !temDistrator;

  const alternar = (id: string) =>
    setPistas(pistas.includes(id) ? pistas.filter((p) => p !== id) : [...pistas, id]);

  return (
    <TelaBase
      fundo={FUNDOS.duelo1}
      decoracoes={DECOR_D1}
      titulo="Decisão do Duelo 1"
      etapa="Sua escolha"
      rodape={
        <NavigationControls
          aoVoltar={() => dispatch({ tipo: "voltar" })}
          aoAvancar={() => setFeedback(valido ? "acerto" : "erro")}
          rotuloAvancar="CONFIRMAR"
          avancarLiberado={pronto}
          aviso="Escolha uma fonte e ao menos uma pista que justifique sua decisão."
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-4">
        <MultipleChoice
          enunciado={DUELO1.decisao.pergunta}
          opcoes={OPCOES_FONTE}
          selecionadas={fonte}
          aoSelecionar={(id) => setFonte([id])}
          colunas={2}
        />
        <MultipleChoice
          enunciado={DUELO1.decisao.perguntaPista}
          multiplo
          opcoes={DUELO1.decisao.opcoes.map((o) => ({ id: o.id, texto: o.texto }))}
          selecionadas={pistas}
          aoSelecionar={alternar}
          colunas={2}
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute bottom-1 right-2 h-[110px]">
        <CharacterMaya pose="apontandoAcima" />
      </div>

      <FeedbackModal
        aberto={feedback === "erro"}
        titulo="Vamos investigar mais um pouco"
        paragrafos={[DUELO1.feedbackAparencia]}
        rotuloFechar="REVISAR"
        aoFechar={() => setFeedback(null)}
      />
      <FeedbackModal
        aberto={feedback === "acerto"}
        titulo="Boa investigação"
        paragrafos={[DUELO1.decisao.feedback, DUELO1.decisao.complementar]}
        rotuloFechar="SEGUIR"
        aoFechar={() => {
          setFeedback(null);
          dispatch({ tipo: "avancar" });
        }}
      />
    </TelaBase>
  );
}
