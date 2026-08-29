import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SourceCard — mockup de página fictícia.
 * As duas fontes de cada duelo usam a MESMA moldura e as MESMAS cores:
 * a aparência nunca antecipa a resposta.
 */
export function SourceCard({
  rotulo,
  site,
  titulo,
  children,
  selecionada,
  className,
  onClick,
  id,
  banner,
  tituloGrande,
  faixa,
  cabecalho,
}: {
  rotulo: "FONTE A" | "FONTE B";
  site: string;
  titulo: string;
  children: React.ReactNode;
  selecionada?: boolean;
  className?: string;
  onClick?: () => void;
  id?: string;
  /** Miniatura decorativa (não carrega informação de origem, data ou autoria). */
  banner?: string;
  /** Título ligeiramente maior — diferença apenas de estilo de página. */
  tituloGrande?: boolean;
  /** Pequena faixa gráfica colorida (apresentação informal). */
  faixa?: boolean;
  /** Cabeçalho institucional neutro (apresentação convencional). */
  cabecalho?: string;
}) {
  const Elemento = onClick ? "button" : "div";
  return (
    <Elemento
      id={id}
      {...(onClick ? { type: "button" as const, onClick, "aria-pressed": !!selecionada } : {})}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-[18px] border-2 bg-[#FDFCF8] text-left shadow-[0_12px_26px_-16px_rgba(47,52,64,0.55)] transition-colors",
        selecionada ? "border-roxo ring-4 ring-roxo/25" : "border-cinza-azulado/25",
        onClick && "hover:border-azul",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-cinza-azulado/20 bg-muted px-3 py-1.5">
        <span aria-hidden="true" className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-cinza-azulado/40" />
          <span className="h-2 w-2 rounded-full bg-cinza-azulado/40" />
          <span className="h-2 w-2 rounded-full bg-cinza-azulado/40" />
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-cinza-azulado">
          {rotulo}
        </span>
        <span className="ml-auto truncate rounded-full bg-card px-2 py-0.5 text-[10px] font-semibold text-cinza-azulado">
          {site}
        </span>
      </div>
      {faixa ? (
        <div aria-hidden="true" className="flex h-1.5 w-full">
          <span className="h-full flex-1 bg-teal/70" />
          <span className="h-full flex-1 bg-amarelo/80" />
          <span className="h-full flex-1 bg-azul/60" />
        </div>
      ) : null}
      {cabecalho ? (
        <div className="flex items-center gap-2 border-b border-azul/15 bg-azul-claro/50 px-3 py-1.5">
          <span
            aria-hidden="true"
            className="grid h-6 w-6 place-items-center rounded-md border border-azul/30 bg-card text-[10px] font-extrabold text-azul"
          >
            EH
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-wide text-azul">
            {cabecalho}
          </span>
        </div>
      ) : null}
      <div className="flex flex-col gap-1.5 p-3">
        {banner ? (
          <img
            src={banner}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1024}
            height={512}
            className="h-[62px] w-full rounded-xl object-cover"
          />
        ) : null}
        <h3
          className={cn(
            "font-extrabold leading-tight text-grafite",
            tituloGrande ? "text-[19px]" : "text-[15px]",
          )}
        >
          {titulo}
        </h3>
        <div className="space-y-1 text-[12px] leading-snug text-cinza-azulado">{children}</div>
      </div>
    </Elemento>
  );
}

export function LinhaMeta({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <p>
      <span className="font-bold text-grafite">{rotulo}:</span> {valor}
    </p>
  );
}

/* ---------------- Duelo 1 — Feira de Ciências ---------------- */

export function FonteFeiraA(props: Partial<React.ComponentProps<typeof SourceCard>>) {
  return (
    <SourceCard
      rotulo="FONTE A"
      site="mural-de-avisos.com/feira"
      titulo="Feira de Ciências será na sexta-feira!"
      banner="/assets/fontes/banner_feira_a.jpg"
      tituloGrande
      faixa
      {...props}
    >
      <p>
        A feira vai ter experimentos, maquetes e apresentações das turmas. Não esqueça de levar seu
        crachá!
      </p>
      <p className="flex flex-wrap gap-1.5 pt-0.5">
        <span className="rounded-full bg-teal/15 px-2 py-0.5 text-[10px] font-bold uppercase text-teal">
          experimentos
        </span>
        <span className="rounded-full bg-amarelo/25 px-2 py-0.5 text-[10px] font-bold uppercase text-grafite">
          maquetes
        </span>
        <span className="rounded-full bg-azul/15 px-2 py-0.5 text-[10px] font-bold uppercase text-azul">
          turmas
        </span>
      </p>
      <p>Publicado em: —</p>
      <p>Publicado por: —</p>
      <p className="italic">Compartilhe com os colegas.</p>
    </SourceCard>
  );
}

export function FonteFeiraB(props: Partial<React.ComponentProps<typeof SourceCard>>) {
  return (
    <SourceCard
      rotulo="FONTE B"
      site="escolahorizonte.edu.exemplo/comunicados"
      titulo="Feira de Ciências 2026"
      cabecalho="Escola Horizonte"
      {...props}
    >
      <p className="font-bold text-grafite">Escola Horizonte</p>
      <div className="divide-y divide-cinza-azulado/15 border-y border-cinza-azulado/15">
        <div className="py-1">
          <LinhaMeta rotulo="Data do evento" valor="28 de setembro" />
        </div>
        <div className="py-1">
          <LinhaMeta rotulo="Horário" valor="9h às 16h" />
        </div>
        <div className="py-1">
          <LinhaMeta rotulo="Local" valor="Quadra da escola" />
        </div>
        <div className="py-1">
          <LinhaMeta rotulo="Publicado em" valor="12 de agosto de 2026" />
        </div>
      </div>
      <LinhaMeta rotulo="Publicado por" valor="Coordenação Pedagógica da Escola Horizonte" />
    </SourceCard>
  );
}


/* ---------------- Duelo 2 — Morcegos ---------------- */

export function FonteMorcegoA(props: Partial<React.ComponentProps<typeof SourceCard>>) {
  return (
    <SourceCard
      rotulo="FONTE A"
      site="curiosidadessuperincriveis.exemplo"
      titulo="Morcegos são totalmente cegos!"
      {...props}
    >
      <p className="font-bold text-grafite">Curiosidades Superincríveis</p>
      <p>“Todo mundo sabe que morcegos não enxergam.”</p>
      <p>Publicado por: —</p>
      <p>Publicado em: —</p>
      <p>Referências: —</p>
    </SourceCard>
  );
}

export function FonteMorcegoB(props: Partial<React.ComponentProps<typeof SourceCard>>) {
  return (
    <SourceCard
      rotulo="FONTE B"
      site="museudavidaanimal.exemplo/artigos"
      titulo="Como os morcegos percebem o ambiente?"
      {...props}
    >
      <p className="font-bold text-grafite">Museu da Vida Animal</p>
      <p>
        “Morcegos utilizam diferentes sentidos para se orientar. Muitas espécies também enxergam.”
      </p>
      <LinhaMeta rotulo="Autora" valor="Bióloga do Museu da Vida Animal" />
      <LinhaMeta rotulo="Publicado em" valor="4 de março de 2026" />
      <LinhaMeta rotulo="Referências" valor="estudos sobre ecolocalização e visão em morcegos" />
    </SourceCard>
  );
}

/* ---------------- Duelo 3 — Eclipse ---------------- */

export function FonteEclipseA(props: Partial<React.ComponentProps<typeof SourceCard>>) {
  return (
    <SourceCard
      rotulo="FONTE A"
      site="ceueestrelas.exemplo/eclipses"
      titulo="Eclipse encanta observadores"
      {...props}
    >
      <p className="font-bold text-grafite">Céu e Estrelas</p>
      <p>
        O eclipse foi acompanhado por muitas pessoas em outra região do país, com céu limpo durante
        toda a observação.
      </p>
      <LinhaMeta rotulo="Autor" valor="Redator de astronomia do site" />
      <LinhaMeta rotulo="Publicado em" valor="2023" />
      <LinhaMeta rotulo="Região citada" valor="outra região, distante da nossa cidade" />
    </SourceCard>
  );
}

export function FonteEclipseB(props: Partial<React.ComponentProps<typeof SourceCard>>) {
  return (
    <SourceCard
      rotulo="FONTE B"
      site="observatoriodacidade.exemplo/calendario"
      titulo="Calendário astronômico desta semana"
      {...props}
    >
      <p className="font-bold text-grafite">Observatório da Cidade</p>
      <p>
        O calendário indica quais fenômenos poderão ser observados nesta semana e informa a
        visibilidade do eclipse na nossa cidade.
      </p>
      <LinhaMeta rotulo="Publicado em" valor="esta semana" />
      <LinhaMeta rotulo="Local" valor="nossa cidade, com referência geográfica" />
      <LinhaMeta rotulo="Equipe" valor="Observatório da Cidade" />
    </SourceCard>
  );
}
