import * as React from "react";
import { cn } from "@/lib/utils";
import { useDuelo } from "@/lib/duelo/estado";
import { CORES_CRITERIO, KIT_ITENS, MAYA } from "@/lib/duelo/conteudo";
import { falar, pararFala, prepararVozes } from "@/lib/duelo/fala";
import type { CriterioId } from "@/lib/duelo/conteudo";

/* ------------------------- Palco 1200 × 675 ------------------------- */

export function Stage({ children }: { children: React.ReactNode }) {
  const [escala, setEscala] = React.useState(1);
  const [fluido, setFluido] = React.useState(false);

  React.useEffect(() => {
    const medir = () => {
      const l = window.innerWidth;
      const a = window.innerHeight;
      if (l < 900) {
        setFluido(true);
        setEscala(1);
        return;
      }
      setFluido(false);
      setEscala(Math.min(l / 1200, a / 675));
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  if (fluido) {
    return (
      <div className="min-h-dvh w-full bg-background">
        <div className="mx-auto w-full max-w-[640px] px-4 py-4">{children}</div>
      </div>
    );
  }

  return (
    <div className="grid h-dvh w-full place-items-center overflow-hidden bg-background">
      <div
        style={{
          width: 1200,
          height: 675,
          transform: `scale(${escala})`,
          transformOrigin: "center center",
        }}
        className="relative shrink-0 overflow-hidden rounded-xl bg-background shadow-[0_18px_50px_-20px_rgba(47,52,64,0.45)]"
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------- Maya + balão ------------------------- */

export type PoseMaya = keyof typeof MAYA;

const ALT_MAYA: Record<PoseMaya, string> = {
  neutra: "Maya, repórter mirim do Jornal das Descobertas, em pose neutra",
  pensando: "Maya pensando, com ar de dúvida",
  apontando: "Maya apontando para as fontes",
  apontandoAcima: "Maya apontando para cima",
  tablet: "Maya segurando um tablet com suas pesquisas",
  comemorando: "Maya comemorando a investigação concluída",
};

export function CharacterMaya({
  pose = "neutra",
  className,
}: {
  pose?: PoseMaya;
  className?: string;
}) {
  return (
    <img
      src={MAYA[pose]}
      alt={ALT_MAYA[pose]}
      className={cn("h-full w-auto select-none object-contain", className)}
      draggable={false}
    />
  );
}

export function SpeechBubble({
  children,
  audio,
  className,
}: {
  children: React.ReactNode;
  audio?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[20px] border border-azul/20 bg-[#FDFBF6] p-4 shadow-[0_10px_24px_-14px_rgba(47,52,64,0.45)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute -left-2 top-8 h-4 w-4 rotate-45 border-b border-l border-azul/20 bg-[#FDFBF6]"
      />

      <div className="flex items-start gap-3">
        <div data-fala className="flex-1 space-y-2 text-[16px] leading-snug text-grafite">
          {children}
        </div>
        {audio !== undefined ? <AudioButton rotulo="Ouvir a fala de Maya" /> : null}
      </div>
    </div>
  );
}

/* ------------------------- Áudio nativo (speechSynthesis) ------------------------- */

export function AudioButton({
  rotulo,
  texto,
  src: _src,
}: {
  rotulo: string;
  texto?: string;
  /** Mantido por compatibilidade; o áudio agora é sintetizado pelo navegador. */
  src?: string;
}) {
  const { estado, dispatch } = useDuelo();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [tocando, setTocando] = React.useState(false);
  const [indisponivel, setIndisponivel] = React.useState(false);

  React.useEffect(() => {
    prepararVozes();
    return () => pararFala();
  }, []);

  const textoAlvo = () => {
    if (texto) return texto;
    const el = ref.current;
    if (!el) return "";
    const alvo =
      el.closest("[data-fala]") ??
      el.parentElement?.querySelector("[data-fala]") ??
      el.parentElement?.parentElement?.querySelector("[data-fala]") ??
      el.parentElement?.parentElement;
    if (!alvo) return "";
    const clone = alvo.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("button, .sr-only").forEach((n) => n.remove());
    return clone.textContent ?? "";
  };

  const alternar = () => {
    if (tocando) {
      pararFala();
      setTocando(false);
      return;
    }
    if (!estado.audioLigado) return;
    const ok = falar(textoAlvo(), () => setTocando(false));
    if (ok) setTocando(true);
    else setIndisponivel(true);
  };

  return (
    <div ref={ref} className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={alternar}
        disabled={!estado.audioLigado}
        aria-label={indisponivel ? `${rotulo} (áudio indisponível neste dispositivo)` : rotulo}
        title={indisponivel ? "Áudio indisponível neste dispositivo" : rotulo}
        className="grid h-11 w-11 place-items-center rounded-full border-2 border-azul/30 bg-azul-claro text-azul transition-colors hover:bg-azul hover:text-primary-foreground disabled:opacity-45"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          {estado.audioLigado ? (
            <path
              d="M16.5 8.5a5 5 0 0 1 0 7M18.8 6.2a8 8 0 0 1 0 11.6"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M17 9.5l5 5m0-5l-5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>
      <button
        type="button"
        onClick={() => {
          pararFala();
          setTocando(false);
          dispatch({ tipo: "audio" });
        }}
        aria-pressed={!estado.audioLigado}
        aria-label={estado.audioLigado ? "Desativar som" : "Ativar som"}
        className="rounded-md px-1 py-1 text-[10px] font-bold uppercase tracking-wide text-cinza-azulado hover:text-azul"
      >
        {estado.audioLigado ? "Som ligado" : "Som desligado"}
      </button>
    </div>
  );
}


/* ------------------------- Botões ------------------------- */

const TONS = {
  azul: "bg-azul text-primary-foreground hover:bg-azul/90 border-azul",
  teal: "bg-teal text-secondary-foreground hover:bg-teal/90 border-teal",
  contorno: "bg-card text-grafite hover:bg-muted border-cinza-azulado/40",
} as const;

export function InvestigationButton({
  children,
  tom = "azul",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tom?: keyof typeof TONS }) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "min-h-11 rounded-full border-2 px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        TONS[tom],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function NavigationControls({
  aoVoltar,
  aoAvancar,
  rotuloAvancar = "SEGUIR",
  rotuloVoltar = "VOLTAR",
  avancarLiberado = true,
  aviso,
  extra,
}: {
  aoVoltar?: () => void;
  aoAvancar?: () => void;
  rotuloAvancar?: string;
  rotuloVoltar?: string;
  avancarLiberado?: boolean;
  aviso?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        {aoVoltar ? (
          <InvestigationButton tom="contorno" onClick={aoVoltar}>
            {rotuloVoltar}
          </InvestigationButton>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        {extra}
        {!avancarLiberado && aviso ? (
          <p className="max-w-[380px] text-right text-[14px] font-semibold text-cinza-azulado">
            {aviso}
          </p>
        ) : null}
        {aoAvancar ? (
          <InvestigationButton onClick={aoAvancar} disabled={!avancarLiberado}>
            {rotuloAvancar}
          </InvestigationButton>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------- Kit do Investigador ------------------------- */

export function ProgressKit({ compacto = false }: { compacto?: boolean }) {
  const { estado } = useDuelo();
  return (
    <section
      aria-label="Kit do Investigador de Fontes"
      className="max-w-[400px] rounded-2xl border-2 border-azul/40 bg-[rgba(255,252,246,0.95)] px-3 py-2 shadow-[0_8px_18px_-14px_rgba(47,52,64,0.5)]"
    >
      <h2 className="text-[13px] font-extrabold uppercase tracking-widest text-azul-escuro">
        Kit do Investigador de Fontes
      </h2>
      <ul className="mt-1 flex flex-wrap items-center gap-1.5">
        {KIT_ITENS.map((item) => {
          const conquistado = estado.kit.includes(item.id);
          const cor = CORES_CRITERIO[item.id];
          return (
            <li key={item.id}>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border-2 px-2 py-1 text-[13px] font-bold uppercase tracking-wide",
                  conquistado ? cor.chip : cor.chipVazio,
                )}
              >
                <span aria-hidden="true">{conquistado ? "★" : "○"}</span>
                {compacto ? item.rotulo.replace("?", "") : item.rotulo}
                <span className="sr-only">
                  {conquistado ? " — estratégia no kit" : " — estratégia ainda não reunida"}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}


export function useConquistarKit(itens: CriterioId[]) {
  const { dispatch } = useDuelo();
  const chave = itens.join("|");
  React.useEffect(() => {
    chave
      .split("|")
      .filter(Boolean)
      .forEach((item) => dispatch({ tipo: "kit", item: item as CriterioId }));
  }, [chave, dispatch]);
}

/* ------------------------- Feedback ------------------------- */

export function FeedbackModal({
  aberto,
  titulo,
  paragrafos,
  destaque,
  rotuloFechar = "ENTENDI",
  aoFechar,
  acaoSecundaria,
  maya = "apontando",
}: {
  aberto: boolean;
  titulo: string;
  paragrafos: string[];
  destaque?: string[];
  rotuloFechar?: string;
  aoFechar: () => void;
  acaoSecundaria?: { rotulo: string; aoClicar: () => void };
  /** Maya volta com presença média no feedback (Tipo D). */
  maya?: PoseMaya | false;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (aberto) ref.current?.focus();
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div className="absolute inset-0 z-40 grid place-items-center bg-grafite/45 px-6">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-feedback"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            aoFechar();
            return;
          }
          if (e.key !== "Tab") return;
          const foco = ref.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          if (!foco?.length) return;
          const primeiro = foco[0]!;
          const ultimo = foco[foco.length - 1]!;
          const ativo = document.activeElement;
          if (e.shiftKey && (ativo === primeiro || ativo === ref.current)) {
            e.preventDefault();
            ultimo.focus();
          } else if (!e.shiftKey && ativo === ultimo) {
            e.preventDefault();
            primeiro.focus();
          }
        }}
        className="w-full max-w-[720px] rounded-[26px] border border-azul/20 bg-[#FDFBF6] p-6 shadow-[0_26px_60px_-24px_rgba(47,52,64,0.6)]"
      >
        <div className="flex items-start gap-4">
          {maya ? (
            <div aria-hidden="true" className="h-[170px] shrink-0 self-end">
              <CharacterMaya pose={maya} />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <h2
              id="titulo-feedback"
              className="text-[13px] font-extrabold uppercase tracking-widest text-cinza-azulado"
            >
              {titulo}
            </h2>
            <div className="mt-3 space-y-2 text-[16px] leading-snug text-grafite">
              {paragrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
        {destaque?.length ? (
          <div className="mt-4 rounded-2xl border-2 border-amarelo bg-amarelo/15 p-3">
            {destaque.map((d) => (
              <p key={d} className="text-sm font-extrabold uppercase leading-snug text-grafite">
                {d}
              </p>
            ))}
          </div>
        ) : null}
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          {acaoSecundaria ? (
            <InvestigationButton tom="contorno" onClick={acaoSecundaria.aoClicar}>
              {acaoSecundaria.rotulo}
            </InvestigationButton>
          ) : null}
          <InvestigationButton tom="teal" onClick={aoFechar}>
            {rotuloFechar}
          </InvestigationButton>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Camada decorativa ------------------------- */

export type DecorativeAsset = {
  src: string;
  className?: string;
};

export function DecorativeLayer({ assets }: { assets?: DecorativeAsset[] | undefined }) {
  if (!assets?.length) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      {assets.map((a, i) => (
        <img
          key={`${a.src}-${i}`}
          src={a.src}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={cn("pointer-events-none absolute select-none", a.className)}
        />
      ))}
    </div>
  );
}

/* ------------------------- Cabeçalho de tela ------------------------- */

export function TelaBase({
  titulo,
  etapa,
  children,
  rodape,
  kit = true,
  fundo,
  decoracoes,
}: {
  titulo: string;
  etapa?: string;
  children: React.ReactNode;
  rodape: React.ReactNode;
  kit?: boolean;
  fundo?: string;
  decoracoes?: DecorativeAsset[];
}) {
  return (
    <div className="relative flex h-full w-full flex-col gap-3 overflow-hidden p-5 md:p-6">
      {fundo ? (
        <>
          <img
            src={fundo}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,253,248,0.74),rgba(217,236,255,0.66)_55%,rgba(205,236,217,0.6))]"
          />
        </>
      ) : null}
      <DecorativeLayer assets={decoracoes} />
      <header className="relative flex items-start justify-between gap-4">
        <div className="inline-block min-w-0 max-w-[64%] rounded-2xl border-2 border-azul/25 border-l-[6px] border-l-amarelo bg-[rgba(255,252,246,0.95)] px-3.5 py-1.5 shadow-[0_3px_10px_rgba(47,52,64,0.14)]">
          {etapa ? (
            <p className="text-[13px] font-extrabold uppercase tracking-widest text-teal-escuro">
              {etapa}
            </p>
          ) : null}
          <h1 className="text-[25px] font-extrabold uppercase leading-tight tracking-wide text-azul-escuro">
            {titulo}
          </h1>
        </div>

        {kit ? <ProgressKit compacto /> : null}
      </header>

      <div className="relative min-h-0 flex-1">{children}</div>
      <footer className="relative">{rodape}</footer>
    </div>
  );
}
