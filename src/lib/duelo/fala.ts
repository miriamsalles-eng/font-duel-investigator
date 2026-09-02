/** Áudio nativo (Web Speech API) com preferência por voz feminina pt-BR. */

const NOMES_FEMININOS = [
  "luciana",
  "francisca",
  "maria",
  "fernanda",
  "camila",
  "vitoria",
  "vitória",
  "helena",
  "joana",
  "female",
  "mulher",
  "google português do brasil",
  "microsoft maria",
];

export function suportaFala(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function escolherVoz(): SpeechSynthesisVoice | null {
  if (!suportaFala()) return null;
  const vozes = window.speechSynthesis.getVoices();
  if (!vozes.length) return null;

  const ptBr = vozes.filter((v) => v.lang?.toLowerCase().replace("_", "-").startsWith("pt-br"));
  const feminina = ptBr.find((v) => NOMES_FEMININOS.some((n) => v.name.toLowerCase().includes(n)));
  if (feminina) return feminina;
  if (ptBr[0]) return ptBr[0];

  const pt = vozes.filter((v) => v.lang?.toLowerCase().startsWith("pt"));
  const femininaPt = pt.find((v) => NOMES_FEMININOS.some((n) => v.name.toLowerCase().includes(n)));
  return femininaPt ?? pt[0] ?? null;
}

/** Pré-carrega a lista de vozes (alguns navegadores só a preenchem de forma assíncrona). */
export function prepararVozes(): void {
  if (!suportaFala()) return;
  window.speechSynthesis.getVoices();
}

export function pararFala(): void {
  if (!suportaFala()) return;
  window.speechSynthesis.cancel();
}

export function falar(texto: string, aoTerminar?: () => void): boolean {
  if (!suportaFala() || !texto.trim()) return false;
  try {
    window.speechSynthesis.cancel();
    const fala = new SpeechSynthesisUtterance(texto.trim());
    const voz = escolherVoz();
    if (voz) fala.voice = voz;
    fala.lang = voz?.lang ?? "pt-BR";
    fala.rate = 0.92;
    fala.pitch = 1.04;
    fala.volume = 1;
    fala.onend = () => aoTerminar?.();
    fala.onerror = () => aoTerminar?.();
    window.speechSynthesis.speak(fala);
    return true;
  } catch {
    return false;
  }
}
