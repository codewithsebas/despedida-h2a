"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { iniciales, type Companero } from "@/lib/companeros";

type Props = Companero & {
  firma: string;
  fecha: string;
};

/**
 * Secuencia de apertura:
 *  cerrado   → sobre flotando, sello intacto
 *  abriendo  → el sello se rompe, la solapa gira en 3D y la hoja sube
 *  saliendo  → el sobre cae y se desvanece; la hoja queda sola
 *  carta     → la hoja se expande (FLIP) hasta convertirse en la carta
 */
type Fase = "cerrado" | "abriendo" | "saliendo" | "carta";

const T_SALIENDO = 2150; // ms desde el clic
const T_CARTA = 2750;
const T_MORPH = 850;

const COLORES = ["#cd097c", "#8b00c7", "#0aceff", "#ffffff", "#570037"];

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
  const [desde, setDesde] = useState<DOMRect | null>(null);
  const papelRef = useRef<HTMLSpanElement>(null);

  function abrir() {
    if (fase !== "cerrado") return;
    if (reduceMotion()) {
      setFase("carta");
      return;
    }
    setFase("abriendo");
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

  if (fase === "carta") {
    return <Carta {...props} desde={desde} />;
  }

  const activo = fase !== "cerrado";

  return (
    <div className="flex flex-col items-center gap-10">
      <div
        className={`entrada text-center transition-all duration-700 ${activo ? "-translate-y-3 opacity-0" : ""}`}
      >
        <p className="font-display text-sm uppercase tracking-[0.35em] text-white/45">
          Una carta para ti
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium sm:text-6xl">
          {props.primerNombre}
        </h1>
      </div>

      <div className="entrada w-full" style={{ animationDelay: "0.15s" }}>
        <div className={`sobre-flota ${activo ? "pausado" : ""}`}>
          <button
            type="button"
            className={`sobre ${fase}`}
            onClick={abrir}
            disabled={activo}
            aria-label={`Abrir la carta para ${props.nombre}`}
          >
            <span className="sobre-sombra" />
            <span className="sobre-cuerpo" />
            <span className="sobre-papel" ref={papelRef}>
              <span className="papel-mini-saludo">
                Hola, <b>{props.primerNombre}</b>,
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

      <p
        className={`font-display text-sm text-white/50 transition-opacity duration-500 ${activo ? "opacity-0" : "pista"}`}
      >
        Toca el sobre para abrirlo
      </p>
    </div>
  );
}

function Carta({
  nombre,
  primerNombre,
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
}: Props & { desde: DOMRect | null }) {
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
              Hola, <span className="acc-text font-medium">{primerNombre}</span>,
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
