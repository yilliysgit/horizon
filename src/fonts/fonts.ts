import { Inter, Archivo } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300","400","500"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600","700","800"],   // houd het bij 2–3 kop-gewichten
  variable: "--font-archivo",
  display: "swap",
  preload: true,
});