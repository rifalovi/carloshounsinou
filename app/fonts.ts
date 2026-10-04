import { Manrope, IBM_Plex_Mono } from "next/font/google";

// Polices du design system partagé (styles/tokens.css) : Manrope pour tout le
// texte, IBM Plex Mono pour les références et données techniques. Servies par
// next/font (auto-hébergées, sans requête vers Google Fonts à l'exécution).

export const sans = Manrope({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-manrope",
  display: "swap",
});

export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
