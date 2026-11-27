import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Marca } from "@/components/Marca";
import { Sobre } from "@/components/Sobre";
import {
  COMPANEROS,
  FECHA,
  FIRMA,
  datosPublicos,
  getCompanero,
} from "@/lib/companeros";

export function generateStaticParams() {
  return COMPANEROS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/carta/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const c = getCompanero(slug);
  return { title: c ? `Para ${c.primerNombre} · H2A` : "Carta · H2A" };
}

export default async function CartaPage(props: PageProps<"/carta/[slug]">) {
  const { slug } = await props.params;
  const c = getCompanero(slug);
  if (!c) notFound();

  return (
    <main
      className={`acc-${c.acento} mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 pb-16 sm:px-10`}
    >
      <header className="no-print flex items-center justify-between py-8">
        <Marca />
        <Link
          href="/"
          className="font-display text-sm text-white/50 transition-colors hover:text-white"
        >
          ← Todas las cartas
        </Link>
      </header>

      <div className="flex flex-1 flex-col justify-center py-6">
        {/* Solo datos públicos: el texto llega tras validar el PIN */}
        <Sobre {...datosPublicos(c)} firma={FIRMA} fecha={FECHA} />
      </div>
    </main>
  );
}
