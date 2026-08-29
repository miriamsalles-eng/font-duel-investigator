import { createFileRoute } from "@tanstack/react-router";
import { ProvedorDuelo } from "@/lib/duelo/estado";
import { Stage } from "@/components/duelo/base";
import { TelaMetacognicao } from "@/components/duelo/telas-final";

export const Route = createFileRoute("/metacheck")({
  head: () => ({ meta: [{ title: "Verificação — Metacognição" }] }),
  component: () => (
    <ProvedorDuelo>
      <Stage>
        <TelaMetacognicao />
      </Stage>
    </ProvedorDuelo>
  ),
});
