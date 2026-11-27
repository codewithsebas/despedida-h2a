// Tipos y utilidades compartidos entre servidor y navegador.
// Este archivo NO debe contener el texto de las cartas.

export type Acento = "magenta" | "violeta" | "turquesa";

export type Gracia = { titulo: string; texto: string };

/** Lo que se puede mostrar sin PIN: el sobre y la tarjeta de la portada. */
export type DatosPublicos = {
  slug: string;
  nombre: string;
  primerNombre: string;
  /** Rol en H2A, se muestra en el sobre y en la carta */
  cargo: string;
  acento: Acento;
  /** Palabra que resume lo que esa persona deja en el equipo */
  palabra: string;
};

/** El texto de la carta: solo llega al navegador después de validar el PIN. */
export type ContenidoCarta = {
  apertura: string;
  gracias: Gracia[];
  frase: string;
  cierre: string;
  despedida: string;
};

export type Companero = DatosPublicos & ContenidoCarta;

export function iniciales(nombre: string) {
  const partes = nombre.split(" ").filter(Boolean);
  return (partes[0][0] + (partes[1]?.[0] ?? "")).toUpperCase();
}
