import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SourceCard — recorte de uma página fictícia da Internet.
 * Cada gênero digital (postagem, comunicado, blog, artigo, boletim) tem uma
 * VARIANTE do mesmo componente: muda cabeçalho, organização e detalhes,
 * mas o acabamento gráfico é equivalente. A aparência nunca antecipa a
 * resposta — a confiabilidade precisa ser descoberta lendo o conteúdo.
 *
 * Quando uma informação não existe na fonte, o campo simplesmente NÃO aparece.
 */

export type VarianteFonte =
  | "postagem"
  | "comunicado"
  | "curiosidades"
  | "artigo-educativo"
  | "divulgacao"
  | "boletim";

type Tom = {
  faixa: string;
  borda: string;
  chip: string;
  marca: string;
  titulo: string;
  logo: string;
};

const TONS: Record<VarianteFonte, Tom> = {
  postagem: {
    faixa: "bg-azul-claro",
    borda: "border-azul/45",
    chip: "bg-card text-azul-escuro border-azul/40",
    marca: "text-azul-escuro",
    titulo: "text-grafite",
    logo: "bg-azul text-card",
  },
  comunicado: {
    faixa: "bg-teal-claro",
    borda: "border-teal/50",
    chip: "bg-card text-teal-escuro border-teal/45",
    marca: "text-teal-escuro",
    titulo: "text-grafite",
    logo: "bg-teal text-card",
  },
  curiosidades: {
    faixa: "bg-coral-claro",
    borda: "border-coral/50",
    chip: "bg-card text-coral-escuro border-coral/45",
    marca: "text-coral-escuro",
    titulo: "text-grafite",
    logo: "bg-coral text-card",
  },
  "artigo-educativo": {
    faixa: "bg-verde-claro",
    borda: "border-verde/55",
    chip: "bg-card text-verde-escuro border-verde/50",
    marca: "text-verde-escuro",
    titulo: "text-grafite",
    logo: "bg-verde text-card",
  },
  divulgacao: {
    faixa: "bg-roxo-claro",
    borda: "border-roxo/45",
    chip: "bg-card text-roxo-escuro border-roxo/40",
    marca: "text-roxo-escuro",
    titulo: "text-grafite",
    logo: "bg-roxo text-card",
  },
  boletim: {
    faixa: "bg-amarelo-claro",
    borda: "border-amarelo",
    chip: "bg-card text-amarelo-escuro border-amarelo",
    marca: "text-amarelo-escuro",
    titulo: "text-grafite",
    logo: "bg-amarelo text-grafite",
  },
};

export function SourceCard({
  rotulo,
  variante,
  marca,
  sigla,
  tipo,
  titulo,
  children,
  selecionada,
  className,
  onClick,
  id,
}: {
  rotulo: "FONTE A" | "FONTE B";
  variante: VarianteFonte;
  /** Nome do site/instituição exibido no cabeçalho da página. */
  marca: string;
  /** Iniciais neutras no "logo" da página. */
  sigla: string;
  /** Rótulo discreto do gênero (Postagem, Comunicado oficial…). */
  tipo: string;
  titulo: string;
  children: React.ReactNode;
  selecionada?: boolean;
  className?: string;
  onClick?: () => void;
  id?: string;
}) {
  const t = TONS[variante];
  const Elemento = onClick ? "button" : "div";
  const redonda = variante === "postagem" || variante === "curiosidades";

  return (
    <Elemento
      id={id}
      {...(onClick ? { type: "button" as const, onClick, "aria-pressed": !!selecionada } : {})}
      className={cn(
        "flex w-full min-w-0 flex-col overflow-hidden rounded-[18px] border-2 bg-card text-left shadow-[0_12px_26px_-16px_rgba(47,52,64,0.5)] transition-colors",
        selecionada ? "border-roxo ring-4 ring-roxo/25" : t.borda,
        onClick && "hover:border-azul",
        className,
      )}
    >
      <div className={cn("flex items-center gap-2 px-3 py-1.5", t.faixa)}>
        <span
          aria-hidden="true"
          className={cn(
            "grid h-7 w-7 shrink-0 place-items-center text-[12px] font-black",
            redonda ? "rounded-full" : "rounded-md",
            t.logo,
          )}
        >
          {sigla}
        </span>
        <span className={cn("min-w-0 truncate text-[15px] font-extrabold", t.marca)}>{marca}</span>
        <span
          className={cn(
            "ml-auto shrink-0 rounded-full border px-2 py-0.5 text-[13px] font-bold",
            t.chip,
          )}
        >
          {tipo}
        </span>
      </div>

      <div className="flex items-center gap-2 border-b border-cinza-azulado/15 px-3 py-1">
        <span className="text-[13px] font-extrabold uppercase tracking-widest text-cinza-azulado">
          {rotulo}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 px-3.5 py-2.5">
        <h3 className={cn("text-[17px] font-extrabold leading-tight", t.titulo)}>{titulo}</h3>
        <div className="space-y-1.5 text-[15px] leading-snug text-grafite">{children}</div>
      </div>
    </Elemento>
  );
}

/** Bloco organizado de metadados (só aparece quando a informação existe). */
export function BlocoMeta({
  linhas,
  variante = "postagem",
}: {
  linhas: { rotulo: string; valor: string }[];
  variante?: VarianteFonte;
}) {
  const t = TONS[variante];
  return (
    <dl className={cn("mt-0.5 rounded-xl px-3 py-2 text-[14px] leading-snug", t.faixa)}>
      {linhas.map((l) => (
        <div key={l.rotulo} className="flex flex-wrap gap-x-1.5">
          <dt className="font-extrabold text-grafite">{l.rotulo}:</dt>
          <dd className="min-w-0 text-grafite">{l.valor}</dd>
        </div>
      ))}
    </dl>
  );
}

export function LinhaMeta({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <p className="text-[14px]">
      <span className="font-extrabold text-grafite">{rotulo}:</span> {valor}
    </p>
  );
}

/** Ícones discretos de interação — meramente visuais, como em uma postagem real. */
function IconesPostagem() {
  return (
    <p
      aria-hidden="true"
      className="mt-0.5 flex items-center gap-3 border-t border-cinza-azulado/15 pt-1 text-[13px] font-bold text-cinza-azulado"
    >
      <span>curtir</span>
      <span>comentar</span>
      <span>compartilhar</span>
    </p>
  );
}

type PropsFonte = Partial<React.ComponentProps<typeof SourceCard>>;

/* ---------------- Duelo 1 — Feira de Ciências ---------------- */

export function FonteFeiraA(props: PropsFonte) {
  return (
    <SourceCard
      rotulo="FONTE A"
      variante="postagem"
      marca="Mural da Comunidade"
      sigla="MC"
      tipo="Postagem"
      titulo="Vai ter Feira de Ciências!"
      {...props}
    >
      <p>
        Pessoal, vai ter Feira de Ciências na escola! As turmas estão preparando várias atividades
        legais. Quem quiser aparecer, será bem-vindo!
      </p>
      <IconesPostagem />
    </SourceCard>
  );
}

export function FonteFeiraB(props: PropsFonte) {
  return (
    <SourceCard
      rotulo="FONTE B"
      variante="comunicado"
      marca="Escola Horizonte"
      sigla="EH"
      tipo="Comunicado oficial"
      titulo="Feira de Ciências 2026"
      {...props}
    >
      <BlocoMeta
        variante="comunicado"
        linhas={[
          { rotulo: "Data do evento", valor: "28 de setembro" },
          { rotulo: "Horário", valor: "9h às 16h" },
          { rotulo: "Local", valor: "Quadra da escola" },
        ]}
      />
      <LinhaMeta rotulo="Publicado em" valor="12 de agosto de 2026" />
      <LinhaMeta
        rotulo="Publicado por"
        valor="Coordenação Pedagógica da Escola Horizonte"
      />
    </SourceCard>
  );
}

/* ---------------- Duelo 2 — Morcegos ---------------- */

export function FonteMorcegoA(props: PropsFonte) {
  return (
    <SourceCard
      rotulo="FONTE A"
      variante="curiosidades"
      marca="Curiosidades Superincríveis"
      sigla="CS"
      tipo="Blog de curiosidades"
      titulo="Morcegos são totalmente cegos!"
      {...props}
    >
      <p>
        Todo mundo sabe que morcegos não enxergam. Eles vivem no escuro e por isso precisam usar os
        ouvidos para não bater nas coisas.
      </p>
      <p className="font-bold text-coral-escuro">Compartilhe essa curiosidade com seus amigos!</p>
      <IconesPostagem />
    </SourceCard>
  );
}

export function FonteMorcegoB(props: PropsFonte) {
  return (
    <SourceCard
      rotulo="FONTE B"
      variante="artigo-educativo"
      marca="Museu da Vida Animal"
      sigla="MV"
      tipo="Artigo educativo"
      titulo="Como os morcegos percebem o ambiente?"
      {...props}
    >
      <p>
        Morcegos utilizam diferentes sentidos para perceber o ambiente. Muitas espécies enxergam e
        também utilizam a ecolocalização, emitindo sons e percebendo seus ecos para se orientar.
      </p>
      <BlocoMeta
        variante="artigo-educativo"
        linhas={[
          { rotulo: "Autora", valor: "Marina Lopes, bióloga do Museu da Vida Animal" },
          { rotulo: "Publicado em", valor: "4 de março de 2026" },
          {
            rotulo: "Fontes consultadas",
            valor: "Estudos sobre visão e ecolocalização em morcegos",
          },
        ]}
      />
    </SourceCard>
  );
}

/* ---------------- Duelo 3 — Eclipse ---------------- */

export function FonteEclipseA(props: PropsFonte) {
  return (
    <SourceCard
      rotulo="FONTE A"
      variante="divulgacao"
      marca="Ciência e Céu"
      sigla="CC"
      tipo="Divulgação científica"
      titulo="Como observar um eclipse solar com segurança"
      {...props}
    >
      <p>
        Os eclipses solares acontecem quando a Lua passa entre a Terra e o Sol. Para observar o
        fenômeno, é necessário utilizar proteção adequada para os olhos.
      </p>
      <p>
        O eclipse de 14 de outubro de 2023 pôde ser observado em diferentes regiões do Brasil.
      </p>
      <BlocoMeta
        variante="divulgacao"
        linhas={[
          { rotulo: "Autora", valor: "Ana Martins, divulgadora científica" },
          { rotulo: "Publicado em", valor: "10 de outubro de 2023" },
          { rotulo: "Fontes", valor: "Instituições de pesquisa em astronomia" },
        ]}
      />
    </SourceCard>
  );
}

export function FonteEclipseB(props: PropsFonte) {
  return (
    <SourceCard
      rotulo="FONTE B"
      variante="boletim"
      marca="Observatório da Cidade"
      sigla="OC"
      tipo="Boletim de observação"
      titulo="Eclipse desta sexta-feira: haverá visibilidade na cidade?"
      {...props}
    >
      <p>
        O eclipse previsto para sexta-feira, 18 de setembro de 2026, poderá ser observado
        parcialmente em nossa cidade entre 15h22 e 16h08, se as condições do céu permitirem.
      </p>
      <p className="font-bold">
        Nunca observe o Sol diretamente. Utilize somente equipamentos adequados para observação
        solar.
      </p>
      <BlocoMeta
        variante="boletim"
        linhas={[
          { rotulo: "Publicado em", valor: "15 de setembro de 2026" },
          { rotulo: "Publicado por", valor: "Equipe do Observatório da Cidade" },
          { rotulo: "Dados astronômicos", valor: "Boletim de observação atualizado" },
        ]}
      />
    </SourceCard>
  );
}
