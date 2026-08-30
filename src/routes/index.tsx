import { createFileRoute } from "@tanstack/react-router";
import { ProvedorDuelo, useDuelo } from "@/lib/duelo/estado";
import { Stage } from "@/components/duelo/base";
import { TelaCapa, TelaProblema, TelaOQueEFonte, TelaLupa } from "@/components/duelo/telas-intro";
import { TelaDuelo1Investigacao, TelaDuelo1Decisao } from "@/components/duelo/telas-duelo1";
import { TelaDuelo2Investigacao, TelaDuelo2Decisao } from "@/components/duelo/telas-duelo2";
import { TelaDuelo3Investigacao, TelaDuelo3Decisao } from "@/components/duelo/telas-duelo3";
import {
  TelaCaminho,
  TelaMetacognicao,
  TelaTransferencia,
  TelaEncerramento,
} from "@/components/duelo/telas-final";

const TITULO = "Duelo das Fontes — Antes de acreditar, investigue!";
const DESCRICAO =
  "Objeto digital interativo em que Maya, repórter mirim, convida você a investigar fontes de informação em três duelos antes de decidir em qual confiar.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pagina,
});

function Roteador() {
  const { estado } = useDuelo();
  switch (estado.tela) {
    case "capa":
      return <TelaCapa />;
    case "problema":
      return <TelaProblema />;
    case "fonte":
      return <TelaOQueEFonte />;
    case "lupa":
      return <TelaLupa />;
    case "duelo1-investigacao":
      return <TelaDuelo1Investigacao />;
    case "duelo1-decisao":
      return <TelaDuelo1Decisao />;
    case "duelo2-investigacao":
      return <TelaDuelo2Investigacao />;
    case "duelo2-comparacao":
      return <TelaDuelo2Decisao />;
    case "duelo3-investigacao":
      return <TelaDuelo3Investigacao />;
    case "duelo3-decisao":
      return <TelaDuelo3Decisao />;
    case "caminho":
      return <TelaCaminho />;
    case "metacognicao":
      return <TelaMetacognicao />;
    case "transferencia":
      return <TelaTransferencia />;
    case "encerramento":
      return <TelaEncerramento />;
    default:
      return <TelaCapa />;
  }
}

function Pagina() {
  return (
    <ProvedorDuelo>
      <main className="min-h-screen w-full bg-background">
        <h1 className="sr-only">{TITULO}</h1>
        <Stage>
          <Roteador />
        </Stage>
      </main>
    </ProvedorDuelo>
  );
}
