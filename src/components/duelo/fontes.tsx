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
}: {
  rotulo: "FONTE A" | "FONTE B";
  site: string;
  titulo: string;
  children: React.ReactNode;
  selecionada?: boolean;
  className?: string;
  onClick?: () => void;
  id?: string;
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
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-3">
        <h3 className="text-[15px] font-extrabold leading-tight text-grafite">{titulo}</h3>
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
      {...props}
    >
      <p>
        A feira vai ter experimentos, maquetes e apresentações das turmas. Não esqueça de levar seu
        crachá!
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
      {...props}
    >
      <p className="font-bold text-grafite">Escola Horizonte</p>
      <LinhaMeta rotulo="Data do evento" valor="28 de setembro" />
      <LinhaMeta rotulo="Horário" valor="9h às 16h" />
      <LinhaMeta rotulo="Local" valor="Quadra da escola" />
      <LinhaMeta rotulo="Publicado em" valor="12 de agosto de 2026" />
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
