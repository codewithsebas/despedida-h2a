import Link from "next/link";

export function Marca() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 font-display"
      aria-label="Volver al inicio"
    >
      <span className="text-2xl font-bold">
        H2A<span className="text-magenta">.</span>
      </span>
      <span className="hidden h-4 w-px bg-white/20 sm:block" />
      <span className="hidden text-xs uppercase tracking-[0.3em] text-white/50 transition-colors group-hover:text-white/80 sm:block">
        Hear to Act
      </span>
    </Link>
  );
}
