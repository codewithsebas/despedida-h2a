"use server";

import { contenidoCarta, getCompanero } from "@/lib/companeros";
import { pinValido } from "@/lib/pines";
import type { ContenidoCarta } from "@/lib/tipos";

export type ResultadoPin =
  | { ok: true; carta: ContenidoCarta }
  | { ok: false; error: string };

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Verifica el PIN en el servidor y, solo si es correcto, devuelve el texto
 * de la carta. Cada intento fallido tarda ~1 s para frenar a quien intente
 * adivinarlo probando combinaciones.
 */
export async function abrirCarta(
  slug: string,
  pin: string,
): Promise<ResultadoPin> {
  const companero = getCompanero(slug);
  if (!companero || !/^\d{4}$/.test(pin)) {
    await esperar(1000);
    return { ok: false, error: "El PIN debe tener 4 dígitos." };
  }

  if (!pinValido(slug, pin)) {
    await esperar(1000);
    return { ok: false, error: "PIN incorrecto. Inténtalo de nuevo." };
  }

  return { ok: true, carta: contenidoCarta(companero) };
}
