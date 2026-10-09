import { cacheLife } from "next/cache";

/**
 * Ano corrente para o rodapé. Com Cache Components, `new Date()` só pode rodar
 * dentro de um escopo em cache; aqui o valor é recalculado no máximo uma vez por dia.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
