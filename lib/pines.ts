import "server-only";
import { timingSafeEqual } from "node:crypto";

/**
 * Los PINes viven en la variable de entorno PINES_CARTAS (nunca en el código,
 * porque el repositorio es público). Formato:
 *
 *   PINES_CARTAS="julian-alvarez:1234,juliana-moreno:5678,..."
 *
 * En local está en .env.local (ignorado por git). En producción hay que
 * configurarla en el panel del hosting (por ejemplo, Vercel → Environment Variables).
 */
function leerPines(): Map<string, string> {
  const mapa = new Map<string, string>();
  const raw = process.env.PINES_CARTAS ?? "";
  for (const par of raw.split(/[,\s]+/)) {
    const [slug, pin] = par.split(":");
    if (slug && pin) mapa.set(slug.trim(), pin.trim());
  }
  return mapa;
}

export function pinValido(slug: string, pin: string): boolean {
  const esperado = leerPines().get(slug);
  if (!esperado) {
    console.error(`[pines] No hay PIN configurado para "${slug}" en PINES_CARTAS.`);
    return false;
  }
  const a = Buffer.from(pin);
  const b = Buffer.from(esperado);
  return a.length === b.length && timingSafeEqual(a, b);
}
