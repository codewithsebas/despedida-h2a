import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hasta pronto, equipo H2A",
  description: "Cartas de despedida para mis compañeros de H2A.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} antialiased`}
    >
      <body>
        <div className="bg-aura" aria-hidden="true" />
        <div className="bg-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
