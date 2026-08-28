import * as React from "react";
import { cn } from "@/lib/utils";
import { CRITERIOS } from "@/lib/duelo/conteudo";
import type { CriterioId } from "@/lib/duelo/conteudo";
import { useDuelo } from "@/lib/duelo/estado";

/* ------------------------- ClueCard ------------------------- */

export function ClueCard({
  texto,
  selecionado,
  onClick,
  className,
  arrastavel,
  onDragStart,
  descricao,
}: {
  texto: string;
  selecionado?: boolean;
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
    "min-h-11 w-full rounded-xl border-2 px-3 py-2 text-left text-[13px] font-semibold leading-snug transition-colors",
    selecionado
      ? "border-roxo bg-roxo/12 text-grafite"
      : "border-cinza-azulado/35 bg-card text-grafite hover:border-azul",
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

/* ------------------------- Painel de Investigação ------------------------- */

export function InvestigationPanel({
  duelo,
  compacto,
}: {
  duelo: 1 | 2 | 3;
  compacto?: boolean;
}) {
  const { estado } = useDuelo();
  const pistas = estado.pistas.filter((p) => p.duelo === duelo);

  return (
    <section
      aria-label="Painel de Investigação"
      className="flex h-full flex-col rounded-2xl border-2 border-teal/40 bg-teal-claro/40 p-3"
    >
      <h2 className="text-[10px] font-extrabold uppercase tracking-widest text-teal">
        Painel de Investigação
      </h2>
      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 gap-2">
        {(["A", "B"] as const).map((lado) => (
          <div key={lado} className="flex min-h-0 flex-col rounded-xl border border-teal/30 bg-card p-2">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-cinza-azulado">
              Fonte {lado}
            </h3>
            <ul className="mt-1 min-h-0 flex-1 space-y-1 overflow-auto pr-1">
              {pistas.filter((p) => p.fonte === lado).length === 0 ? (
                <li className="text-[11px] italic text-cinza-azulado">
                  Nenhuma pista registrada ainda.
                </li>
              ) : null}
              {pistas
                .filter((p) => p.fonte === lado)
                .map((p) => (
                  <li
                    key={p.id}
                    className="rounded-lg border border-cinza-azulado/25 bg-muted px-2 py-1 text-[11px] leading-snug text-grafite"
                  >
                    {p.criterio && !compacto ? (
                      <span className="mr-1 font-extrabold uppercase text-teal">
                        {CRITERIOS.find((c) => c.id === p.criterio)?.titulo}
                      </span>
                    ) : null}
                    {p.texto}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] leading-snug text-cinza-azulado">
        O painel apenas organiza o que você observou. Ele não dá nota nem decide por você.
      </p>
    </section>
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
      <legend className="mb-2 text-[14px] font-extrabold leading-snug text-grafite">
        {enunciado}
        {multiplo ? (
          <span className="ml-1 text-[11px] font-semibold text-cinza-azulado">
            (você pode escolher mais de uma)
          </span>
        ) : null}
      </legend>
      <div className={cn("grid gap-2", colunas === 2 ? "grid-cols-2" : "grid-cols-1")}>
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
                "flex min-h-11 items-start gap-2 rounded-xl border-2 px-3 py-2 text-left text-[13px] font-semibold leading-snug transition-colors",
                ativo
                  ? "border-roxo bg-roxo/12 text-grafite"
                  : "border-cinza-azulado/35 bg-card text-grafite hover:border-azul",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 grid h-4 w-4 shrink-0 place-items-center border-2 text-[10px] font-black",
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
}: {
  pares: { id: string; colunaA: string; colunaB: string }[];
  ligacoes: Record<string, string>;
  aoLigar: (idA: string, idB: string) => void;
}) {
  const [selecionadoA, setSelecionadoA] = React.useState<string | null>(null);
  const embaralhadoB = React.useMemo(
    () => [pares[2], pares[0], pares[1]].filter((p): p is (typeof pares)[number] => Boolean(p)),
    [pares],
  );

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
      <div className="space-y-2">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-cinza-azulado">
          Coluna A — Informação
        </h3>
        {pares.map((p) => {
          const ligado = !!ligacoes[p.id];
          return (
            <ClueCard
              key={p.id}
              texto={p.colunaA}
              selecionado={selecionadoA === p.id || ligado}
              {...(ligado ? { descricao: "já ligada" } : {})}
              onClick={() => setSelecionadoA(selecionadoA === p.id ? null : p.id)}
            />
          );
        })}
      </div>
      <div className="self-center text-center text-[10px] font-bold uppercase text-cinza-azulado">
        <span aria-hidden="true">→</span>
        <p className="mt-1 max-w-[70px] leading-tight">Escolha à esquerda e depois à direita</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-cinza-azulado">
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
    <div className="grid h-full grid-cols-[minmax(0,240px)_1fr] gap-3">
      <div className="flex min-h-0 flex-col rounded-2xl border-2 border-cinza-azulado/30 bg-muted/60 p-2">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-cinza-azulado">
          Pistas encontradas
        </h3>
        {legenda ? (
          <p className="mt-1 text-[10px] leading-snug text-cinza-azulado">{legenda}</p>
        ) : null}
        <div className="mt-2 min-h-0 flex-1 space-y-1.5 overflow-auto pr-1">
          {disponiveis.map((i) => (
            <ClueCard
              key={i.id}
              texto={i.texto}
              selecionado={selecionado === i.id}
              arrastavel
              onDragStart={(e) => e.dataTransfer.setData("text/plain", i.id)}
              onClick={() => setSelecionado(selecionado === i.id ? null : i.id)}
            />
          ))}
          {disponiveis.length === 0 ? (
            <p className="text-[11px] italic text-cinza-azulado">Todas as pistas foram colocadas.</p>
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
            className="flex min-h-0 flex-col rounded-2xl border-2 border-dashed border-teal/50 bg-teal-claro/30 p-2"
          >
            <button
              type="button"
              onClick={() => {
                if (!selecionado) return;
                aoColocar(selecionado, d.id);
                setSelecionado(null);
              }}
              className="rounded-lg px-1 py-1 text-left text-[11px] font-extrabold uppercase tracking-widest text-teal hover:text-azul"
              aria-label={`Colocar a pista selecionada em ${d.rotulo}`}
            >
              {d.rotulo}
            </button>
            <ul className="mt-1 min-h-0 flex-1 space-y-1 overflow-auto pr-1">
              {itens
                .filter((i) => colocacoes[i.id] === d.id)
                .map((i) => (
                  <li key={i.id}>
                    <button
                      type="button"
                      onClick={() => aoRemover?.(i.id)}
                      className="w-full rounded-lg border border-cinza-azulado/30 bg-card px-2 py-1 text-left text-[11px] font-semibold leading-snug text-grafite hover:border-azul"
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

/** Registra uma pista no Painel de Investigação. */
export function useRegistrarPista(duelo: 1 | 2 | 3) {
  const { dispatch } = useDuelo();
  return React.useCallback(
    (id: string, texto: string, fonte: "A" | "B", criterio: CriterioId | null = null) => {
      dispatch({ tipo: "pista", pista: { id, texto, fonte, criterio, duelo } });
    },
    [dispatch, duelo],
  );
}
