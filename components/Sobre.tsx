"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { abrirCarta } from "@/app/carta/[slug]/acciones";
import {
  iniciales,
  type ContenidoCarta,
  type DatosPublicos,
} from "@/lib/tipos";

type Props = DatosPublicos & {
  firma: string;
  fecha: string;
};

/**
 * Secuencia de apertura:
 *  cerrado   → sobre flotando, sello intacto
 *  pin       → se pide el PIN; el servidor lo valida y devuelve la carta
 *  abriendo  → el sello se rompe, la solapa gira en 3D y la hoja sube
 *  saliendo  → el sobre cae y se desvanece; la hoja queda sola
 *  carta     → la hoja se expande (FLIP) hasta convertirse en la carta
 */
type Fase = "cerrado" | "pin" | "abriendo" | "saliendo" | "carta";

const T_SALIENDO = 2150; // ms desde el inicio de la apertura
const T_CARTA = 2750;
const T_MORPH = 850;
const LARGO_PIN = 4;

const COLORES = ["#cd097c", "#8b00c7", "#0aceff", "#ffffff", "#570037"];

/** Recuerda el PIN durante la pestaña para no pedirlo al recargar. */
const clavePin = (slug: string) => `h2a-pin:${slug}`;

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function lanzarConfeti() {
  if (reduceMotion()) return;
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("span");
    el.className = "confeti";
    el.style.left = `${Math.random() * 100}vw`;
    el.style.background = COLORES[i % COLORES.length];
    el.style.animationDuration = `${2.6 + Math.random() * 2.4}s`;
    el.style.animationDelay = `${Math.random() * 0.5}s`;
    el.style.setProperty("--dx", `${(Math.random() - 0.5) * 260}px`);
    el.style.setProperty("--rot", `${Math.random() * 900 - 450}deg`);
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

export function Sobre(props: Props) {
  const [fase, setFase] = useState<Fase>("cerrado");
  const [carta, setCarta] = useState<ContenidoCarta | null>(null);
  const [desde, setDesde] = useState<DOMRect | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);
  const [verificando, startTransition] = useTransition();
  const papelRef = useRef<HTMLSpanElement>(null);

  function iniciarApertura(contenido: ContenidoCarta) {
    setCarta(contenido);
    setFase(reduceMotion() ? "carta" : "abriendo");
  }

  function verificar(pin: string, recordado = false) {
    setError(null);
    startTransition(async () => {
      const r = await abrirCarta(props.slug, pin);
      if (r.ok) {
        try {
          sessionStorage.setItem(clavePin(props.slug), pin);
        } catch {}
        iniciarApertura(r.carta);
        return;
      }
      if (recordado) {
        // El PIN guardado ya no sirve (p. ej. se cambió): se pide de nuevo.
        try {
          sessionStorage.removeItem(clavePin(props.slug));
        } catch {}
        setFase("pin");
        return;
      }
      setError(r.error);
      setIntento((n) => n + 1);
    });
  }

  function tocarSobre() {
    if (fase !== "cerrado" || verificando) return;
    let guardado: string | null = null;
    try {
      guardado = sessionStorage.getItem(clavePin(props.slug));
    } catch {}
    if (guardado) {
      verificar(guardado, true);
      return;
    }
    setFase("pin");
  }

  useEffect(() => {
    if (fase === "abriendo") {
      const t = setTimeout(() => setFase("saliendo"), T_SALIENDO);
      return () => clearTimeout(t);
    }
    if (fase === "saliendo") {
      const t = setTimeout(() => {
        if (papelRef.current) setDesde(papelRef.current.getBoundingClientRect());
        setFase("carta");
      }, T_CARTA - T_SALIENDO);
      return () => clearTimeout(t);
    }
  }, [fase]);

  if (fase === "carta" && carta) {
    return <Carta {...props} {...carta} desde={desde} />;
  }

  const abriendo = fase === "abriendo" || fase === "saliendo";

  return (
    <div className="flex flex-col items-center gap-10">
      <div
        className={`entrada text-center transition-all duration-700 ${abriendo ? "-translate-y-3 opacity-0" : ""}`}
      >
        <p className="font-display text-sm uppercase tracking-[0.35em] text-white/45">
          Una carta para ti
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium sm:text-6xl">
          {props.apodo ?? props.primerNombre}
        </h1>
      </div>

      <div className="entrada w-full" style={{ animationDelay: "0.15s" }}>
        <div className={`sobre-flota ${abriendo ? "pausado" : ""}`}>
          <button
            type="button"
            className={`sobre ${fase} ${verificando ? "verificando" : ""}`}
            onClick={tocarSobre}
            disabled={fase !== "cerrado" || verificando}
            aria-label={`Abrir la carta para ${props.nombre}`}
          >
            <span className="sobre-sombra" />
            <span className="sobre-cuerpo" />
            <span className="sobre-papel" ref={papelRef}>
              <span className="papel-mini-saludo">
                Hola, <b>{props.apodo ?? props.primerNombre}</b>,
              </span>
              <span className="papel-mini-lineas" />
            </span>
            <span className="sobre-frente" />
            <span className="sobre-solapa">
              <span className="cara exterior" />
              <span className="cara interior" />
            </span>
            <span className="sello sobre-sello">{iniciales(props.nombre)}</span>
            <span className="sobre-para">Para {props.nombre}</span>
          </button>
        </div>
      </div>

      {fase === "pin" ? (
        <EntradaPin
          key={intento}
          error={error}
          agitar={intento > 0}
          verificando={verificando}
          onCompleto={(pin) => verificar(pin)}
        />
      ) : (
        <p
          className={`font-display text-sm text-white/50 transition-opacity duration-500 ${fase === "cerrado" && !verificando ? "pista" : "opacity-0"}`}
        >
          Toca el sobre para abrirlo
        </p>
      )}
    </div>
  );
}

/** Cuatro casillas para el PIN: avanza solo, admite pegar y retroceder. */
function EntradaPin({
  error,
  agitar,
  verificando,
  onCompleto,
}: {
  error: string | null;
  agitar: boolean;
  verificando: boolean;
  onCompleto: (pin: string) => void;
}) {
  const [digitos, setDigitos] = useState<string[]>(() =>
    Array(LARGO_PIN).fill(""),
  );
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const completo = digitos.every((d) => d !== "");

  // Al aparecer, el panel se desplaza a la vista (en pantallas bajas queda abajo).
  useEffect(() => {
    formRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, []);

  // Las casillas se deshabilitan mientras se verifica; al terminar, el foco
  // vuelve a la primera vacía.
  useEffect(() => {
    if (verificando) return;
    const vacia = refs.current.find((el) => el && el.value === "");
    (vacia ?? refs.current[0])?.focus();
  }, [verificando]);

  function escribir(i: number, valor: string) {
    const nuevos = valor.replace(/\D/g, "");
    const siguiente = [...digitos];
    if (nuevos === "") {
      siguiente[i] = "";
      setDigitos(siguiente);
      return;
    }
    // Admite pegar o autocompletar varios dígitos a la vez.
    let j = i;
    for (const d of nuevos) {
      if (j >= LARGO_PIN) break;
      siguiente[j++] = d;
    }
    setDigitos(siguiente);
    refs.current[Math.min(j, LARGO_PIN - 1)]?.focus();
    if (siguiente.every((d) => d !== "")) onCompleto(siguiente.join(""));
  }

  function tecla(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && digitos[i] === "" && i > 0) {
      e.preventDefault();
      const siguiente = [...digitos];
      siguiente[i - 1] = "";
      setDigitos(siguiente);
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < LARGO_PIN - 1) {
      refs.current[i + 1]?.focus();
    }
  }

  return (
    <form
      ref={formRef}
      className={`pin-panel ${agitar ? "agitar" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (completo && !verificando) onCompleto(digitos.join(""));
      }}
    >
      <label htmlFor="pin-0" className="pin-titulo">
        Ingresa tu PIN para abrir la carta
      </label>
      <div className="pin-cajas">
        {digitos.map((d, i) => (
          <input
            key={i}
            id={`pin-${i}`}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`pin-caja ${d ? "llena" : ""}`}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            pattern="[0-9]*"
            maxLength={LARGO_PIN}
            value={d}
            disabled={verificando}
            aria-label={`Dígito ${i + 1} de ${LARGO_PIN}`}
            aria-invalid={error ? true : undefined}
            onChange={(e) => escribir(i, e.target.value)}
            onKeyDown={(e) => tecla(i, e)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      <p className={`pin-mensaje ${error ? "error" : ""}`} role="alert">
        {verificando ? "Verificando…" : (error ?? "Son 4 dígitos.")}
      </p>
    </form>
  );
}

function Carta({
  nombre,
  primerNombre,
  apodo,
  cargo,
  palabra,
  apertura,
  gracias,
  frase,
  cierre,
  despedida,
  firma,
  fecha,
  desde,
}: Props & ContenidoCarta & { desde: DOMRect | null }) {
  const cartaRef = useRef<HTMLElement>(null);
  const morphRef = useRef<HTMLDivElement>(null);
  const [listo, setListo] = useState(!desde);

  // La hoja del sobre se expande hasta ocupar el lugar de la carta (FLIP).
  useLayoutEffect(() => {
    const carta = cartaRef.current;
    const morph = morphRef.current;
    if (!desde || !carta || !morph) return;

    const hasta = carta.getBoundingClientRect();
    const anim = morph.animate(
      [
        {
          top: `${desde.top}px`,
          left: `${desde.left}px`,
          width: `${desde.width}px`,
          height: `${desde.height}px`,
          borderRadius: "8px",
          transform: "rotate(0deg)",
        },
        {
          offset: 0.45,
          transform: "rotate(-1.2deg)",
        },
        {
          top: `${hasta.top}px`,
          left: `${hasta.left}px`,
          width: `${hasta.width}px`,
          height: `${hasta.height}px`,
          borderRadius: "20px",
          transform: "rotate(0deg)",
        },
      ],
      {
        duration: T_MORPH,
        easing: "cubic-bezier(0.65, 0, 0.25, 1)",
        fill: "forwards",
      },
    );
    anim.onfinish = () => {
      setListo(true);
      lanzarConfeti();
    };
    return () => anim.cancel();
  }, [desde]);

  return (
    <>
      {desde && (
        <div
          ref={morphRef}
          className={`papel-morph ${listo ? "desvanecer" : ""}`}
          aria-hidden="true"
        />
      )}
      <article
        ref={cartaRef}
        className={`carta ${listo ? "visible" : ""}`}
        aria-label={`Carta para ${nombre}`}
      >
        <div className={listo ? "revelar" : "invisible"}>
          <header className="carta-membrete">
            <span className="marca">
              H2A<span>.</span>
            </span>
            <span>{fecha}</span>
          </header>

          <div className="mb-8">
            <p className="etiqueta">
              Para {nombre} · {cargo}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight font-light text-[#1d0a26] sm:text-5xl">
              Hola, <span className="acc-text font-medium">{apodo ?? primerNombre}</span>,
            </h1>
          </div>

          <div className="carta-cuerpo inicial">
            <p>{apertura}</p>
          </div>

          <section aria-label="Agradecimientos">
            <h2 className="seccion-titulo">Gracias</h2>
            <ol className="gracias">
              {gracias.map((g, i) => (
                <li key={g.titulo}>
                  <span className="num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{g.titulo}</h3>
                    <p>{g.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <figure className="cita">
            <blockquote>
              <p>{frase}</p>
            </blockquote>
            <footer>{palabra}</footer>
          </figure>

          <div className="carta-cuerpo">
            <p>{cierre}</p>
          </div>

          <footer className="carta-firma">
            <div>
              <p className="text-base text-[#2b1a33]/70">{despedida}</p>
              <div className="linea" />
              <p className="nombre-firma">{firma}</p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print rounded-full border border-[#1d0a26]/15 px-4 py-2 font-display text-xs uppercase tracking-[0.2em] text-[#1d0a26]/60 transition-colors hover:border-[#1d0a26]/40 hover:text-[#1d0a26]"
            >
              Guardar
            </button>
          </footer>
        </div>
      </article>
    </>
  );
}
