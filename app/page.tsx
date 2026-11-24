import Link from "next/link";
import { Marca } from "@/components/Marca";
import { COMPANEROS, FIRMA, iniciales } from "@/lib/companeros";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-6 pb-16 sm:px-10">
      <header className="flex items-center justify-between py-8">
        <Marca />
        <span className="font-display text-xs uppercase tracking-[0.3em] text-white/40">
          Hasta pronto
        </span>
      </header>

      <section className="entrada pt-10 pb-16 sm:pt-20 sm:pb-24">
        <p className="mb-6 font-display text-sm uppercase tracking-[0.35em] text-turquesa">
          Cartas de despedida
        </p>
        <h1 className="max-w-4xl font-display text-5xl leading-none font-medium sm:text-7xl lg:text-8xl">
          Gracias por <span className="text-gradient">escuchar</span>,
          <br className="hidden sm:block" /> gracias por{" "}
          <span className="text-gradient">actuar</span> conmigo.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
          Cierro mi etapa en H2A y no quería irme sin dejarles algo. Cada
          sobre tiene un nombre y una carta escrita para esa persona. Busca el
          tuyo y ábrelo.
        </p>
      </section>

      <section aria-labelledby="titulo-cartas">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
          <h2
            id="titulo-cartas"
            className="font-display text-lg font-medium text-white/80"
          >
            Elige tu sobre
          </h2>
          <span className="font-display text-sm text-white/40">
            {String(COMPANEROS.length).padStart(2, "0")} cartas
          </span>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COMPANEROS.map((c, i) => (
            <li
              key={c.slug}
              className="entrada"
              style={{ animationDelay: `${0.15 + i * 0.06}s` }}
            >
              <Link
                href={`/carta/${c.slug}`}
                className={`sobre-card acc-${c.acento}`}
              >
                <div className="flex items-start justify-between">
                  <span className="sello">{iniciales(c.nombre)}</span>
                  <span className="font-display text-sm text-white/35 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="mb-1 text-sm text-white/50">
                    Para
                  </p>
                  <p className="font-display text-xl leading-tight font-medium sm:text-2xl">
                    {c.nombre}
                  </p>
                  <p className="mt-1 text-sm text-white/55">{c.cargo}</p>
                  <p className="mt-3 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.25em] text-white/50">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: "var(--acc)" }}
                    />
                    {c.palabra}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-auto flex flex-col items-start justify-between gap-2 pt-20 font-display text-sm text-white/40 sm:flex-row sm:items-center">
        <span>
          Con cariño, <span className="text-white/70">{FIRMA}</span>
        </span>
        <span>Contenido · Marketing · Tecnología</span>
      </footer>
    </main>
  );
}
