import { createFileRoute } from "@tanstack/react-router";
import { DueloApp } from "@/components/duelo/app";

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
  component: DueloApp,
});

