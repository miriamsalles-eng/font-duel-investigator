import * as React from "react";
import { cn } from "@/lib/utils";

/* ------------------------- ClueCard ------------------------- */

export function ClueCard({
  texto,
  selecionado,
  revisar,
  onClick,
  className,
  arrastavel,
  onDragStart,
  descricao,
}: {
  texto: string;
  selecionado?: boolean;
  /** Marcação discreta de "reveja esta relação" (não entrega a resposta). */
  revisar?: boolean;
  onClick?: () => void;
  className?: string;
  arrastavel?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  descricao?: string;
}) {
  const conteudo = (
    <>
      <span>{texto}</span>
      {descricao ? <span className="sr-only"> — {descricao}</span> : null}
    </>
  );
  const classes = cn(
    "min-h-11 w-full rounded-xl border-2 px-3 py-2.5 text-left text-[15px] font-semibold leading-snug transition-colors",
    selecionado
      ? "border-roxo bg-roxo/12 text-grafite"
      : "border-cinza-azulado/35 bg-card text-grafite hover:border-azul",
    revisar && "border-dashed border-amarelo bg-amarelo/15",
    className,
  );

  if (!onClick) {
    return (
      <div className={classes} draggable={arrastavel} onDragStart={onDragStart}>
        {conteudo}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!selecionado}
      draggable={arrastavel}
      onDragStart={onDragStart}
      className={classes}
    >
      {conteudo}
    </button>
  );
}

/* ------------------------- MultipleChoice ------------------------- */

export function MultipleChoice({
  enunciado,
  opcoes,
  selecionadas,
  aoSelecionar,
  multiplo,
  colunas = 1,
}: {
  enunciado: string;
  opcoes: { id: string; texto: string }[];
  selecionadas: string[];
  aoSelecionar: (id: string) => void;
  multiplo?: boolean;
  colunas?: 1 | 2;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-[17px] font-extrabold leading-snug text-grafite">
        {enunciado}
        {multiplo ? (
          <span className="ml-1 text-[14px] font-semibold text-cinza-azulado">
            (você pode escolher mais de uma)
          </span>
        ) : null}
      </legend>
      <div
        className={cn(
          "grid gap-2.5",
          colunas === 2 ? "grid-cols-[repeat(auto-fit,minmax(240px,1fr))]" : "grid-cols-1",
        )}
      >
        {opcoes.map((o) => {
          const ativo = selecionadas.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              role={multiplo ? "checkbox" : "radio"}
              aria-checked={ativo}
              onClick={() => aoSelecionar(o.id)}
              className={cn(
                "flex min-h-12 items-start gap-2.5 rounded-xl border-2 px-3.5 py-2.5 text-left text-[16px] font-semibold leading-snug transition-colors",
                ativo
                  ? "border-roxo bg-roxo/12 text-grafite"
                  : "border-cinza-azulado/35 bg-card text-grafite hover:border-azul",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center border-2 text-[12px] font-black",
                  multiplo ? "rounded" : "rounded-full",
                  ativo ? "border-roxo bg-roxo text-card" : "border-cinza-azulado/50",
                )}
              >
                {ativo ? "✓" : ""}
              </span>
              {o.texto}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ------------------------- MatchColumnsActivity ------------------------- */

export function MatchColumnsActivity({
  pares,
  ligacoes,
  aoLigar,
  revisar = [],
}: {
  pares: { id: string; colunaA: string; colunaB: string }[];
  ligacoes: Record<string, string>;
  aoLigar: (idA: string, idB: string) => void;
  /** IDs da coluna A que precisam ser revistos após uma confirmação incorreta. */
  revisar?: string[];
}) {
  const [selecionadoA, setSelecionadoA] = React.useState<string | null>(null);
  const embaralhadoB = React.useMemo(
    () => [pares[2], pares[0], pares[1]].filter((p): p is (typeof pares)[number] => Boolean(p)),
    [pares],
  );

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-3">
      <div className="space-y-2.5">
        <h3 className="text-[13px] font-extrabold uppercase tracking-widest text-cinza-azulado">
          Coluna A — Informação
        </h3>
        {pares.map((p) => {
          const ligado = !!ligacoes[p.id];
          const destino = pares.find((x) => x.id === ligacoes[p.id]);
          return (
            <ClueCard
              key={p.id}
              texto={p.colunaA}
              selecionado={selecionadoA === p.id || ligado}
              revisar={revisar.includes(p.id)}
              {...(destino ? { descricao: `ligada a ${destino.colunaB}` } : {})}
              onClick={() => setSelecionadoA(selecionadoA === p.id ? null : p.id)}
            />
          );
        })}
      </div>
      <div className="self-center text-center text-[13px] font-bold uppercase text-cinza-azulado">
        <span aria-hidden="true">→</span>
        <p className="mt-1 max-w-[92px] text-[12px] leading-tight">
          Escolha à esquerda e depois à direita
        </p>
      </div>
      <div className="space-y-2.5">
        <h3 className="text-[13px] font-extrabold uppercase tracking-widest text-cinza-azulado">
          Coluna B — Fonte
        </h3>
        {embaralhadoB.map((p) => {
          const usada = Object.values(ligacoes).includes(p.id);
          return (
            <ClueCard
              key={p.id}
              texto={p.colunaB}
              selecionado={usada}
              onClick={() => {
                if (!selecionadoA) return;
                aoLigar(selecionadoA, p.id);
                setSelecionadoA(null);
              }}
              {...(usada ? { descricao: "já ligada" } : {})}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------- DragDropActivity ------------------------- */

export type Destino = { id: string; rotulo: string };

/**
 * Arrastar e soltar com alternativa acessível por clique/teclado:
 * seleciona-se a pista e depois o destino.
 */
export function DragDropActivity({
  itens,
  destinos,
  colocacoes,
  aoColocar,
  aoRemover,
  legenda,
}: {
  itens: { id: string; texto: string }[];
  destinos: Destino[];
  colocacoes: Record<string, string>;
  aoColocar: (itemId: string, destinoId: string) => void;
  aoRemover?: (itemId: string) => void;
  legenda?: string;
}) {
  const [selecionado, setSelecionado] = React.useState<string | null>(null);
  const disponiveis = itens.filter((i) => !colocacoes[i.id]);

  return (
    <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-3">
      <div className="flex min-h-0 flex-col rounded-2xl border-2 border-cinza-azulado/30 bg-muted/60 p-2">
        <h3 className="text-[13px] font-extrabold uppercase tracking-widest text-cinza-azulado">
          Pistas encontradas
        </h3>
        {legenda ? (
          <p className="mt-1 text-[13px] leading-snug text-cinza-azulado">{legenda}</p>
        ) : null}
        <div className="mt-1.5 min-h-0 flex-1 space-y-1">
          {disponiveis.map((i) => (
            <ClueCard
              key={i.id}
              texto={i.texto}
              className="text-[15px] py-1.5"
              selecionado={selecionado === i.id}
              arrastavel
              onDragStart={(e) => e.dataTransfer.setData("text/plain", i.id)}
              onClick={() => setSelecionado(selecionado === i.id ? null : i.id)}
            />
          ))}
          {disponiveis.length === 0 ? (
            <p className="text-[14px] italic text-cinza-azulado">
              Todas as pistas foram colocadas.
            </p>
          ) : null}
        </div>
      </div>

      <div className={cn("grid min-h-0 gap-3", destinos.length > 2 ? "grid-cols-3" : "grid-cols-2")}>
        {destinos.map((d) => (
          <div
            key={d.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData("text/plain");
              if (id) aoColocar(id, d.id);
            }}
            className="flex min-h-0 flex-col rounded-2xl border-2 border-dashed border-teal/50 bg-teal-claro/30 p-2.5"
          >
            <button
              type="button"
              onClick={() => {
                if (!selecionado) return;
                aoColocar(selecionado, d.id);
                setSelecionado(null);
              }}
              className="rounded-lg px-1 py-1 text-left text-[13px] font-extrabold uppercase tracking-wide text-teal hover:text-azul"
              aria-label={`Colocar a pista selecionada em ${d.rotulo}`}
            >
              {d.rotulo}
            </button>
            <ul className="mt-1 min-h-0 flex-1 space-y-1">
              {itens
                .filter((i) => colocacoes[i.id] === d.id)
                .map((i) => (
                  <li key={i.id}>
                    <button
                      type="button"
                      onClick={() => aoRemover?.(i.id)}
                      className="w-full rounded-lg border border-cinza-azulado/30 bg-card px-2 py-1.5 text-left text-[14px] font-semibold leading-snug text-grafite hover:border-azul"
                      aria-label={`Retirar a pista “${i.texto}” de ${d.rotulo}`}
                    >
                      {i.texto}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------- Ferramentas de investigação ------------------------- */

/**
 * Botões-ferramenta que NÃO entregam diagnósticos: cada clique mostra apenas
 * a pergunta que orienta a leitura dos dois cards.
 */
export function InvestigationTools({
  titulo,
  ferramentas,
  investigados,
  aoInvestigar,
  ativo,
}: {
  titulo: string;
  ferramentas: { id: string; rotulo: string; pergunta: string }[];
  investigados: string[];
  aoInvestigar: (id: string) => void;
  ativo: string | null;
}) {
  const atual = ferramentas.find((f) => f.id === ativo);
  return (
    <section aria-label="Ferramentas de investigação" className="min-w-0">
      <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-cinza-azulado">
        {titulo}
      </h2>
      <ul className="mt-1 flex flex-wrap gap-1.5">
        {ferramentas.map((f) => {
          const feito = investigados.includes(f.id);
          return (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => aoInvestigar(f.id)}
                aria-pressed={ativo === f.id}
                className={cn(
                  "min-h-11 rounded-full border-2 px-4 py-2 text-[15px] font-bold transition-colors",
                  ativo === f.id
                    ? "border-roxo bg-roxo/12 text-grafite"
                    : feito
                      ? "border-teal bg-teal-claro/60 text-teal-escuro"
                      : "border-cinza-azulado/40 bg-card text-grafite hover:border-azul",
                )}
              >
                {f.rotulo}
              </button>
            </li>
          );
        })}
      </ul>
      <p
        aria-live="polite"
        className="mt-1.5 rounded-xl border-2 border-amarelo bg-amarelo/15 px-3 py-1.5 text-[16px] font-semibold leading-snug text-grafite"
      >
        {atual
          ? atual.pergunta
          : "Escolha uma pista acima e procure a resposta dentro das duas fontes."}
      </p>
    </section>
  );
}
