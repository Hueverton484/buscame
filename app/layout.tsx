import type { Metadata, Viewport } from "next";
import { Geist, Fraunces } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Buscame — Encontrá a tu perro en Buenos Aires",
    template: "%s · Buscame",
  },
  description:
    "Plataforma comunitaria para reportar y encontrar perros perdidos en CABA. Publicá, buscá y ayudá a reencontrar familias.",
  openGraph: {
    title: "Buscame — Encontrá a tu perro en Buenos Aires",
    description:
      "Plataforma comunitaria para reportar y encontrar perros perdidos en CABA.",
    locale: "es_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff6b35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            style: { fontFamily: "var(--font-geist-sans), system-ui" },
          }}
        />
      </body>
    </html>
  );
}
