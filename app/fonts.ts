import { JetBrains_Mono } from "next/font/google";

// Sans et Serif : system fonts Apple (SF Pro / New York)
// définis directement dans globals.css via --font-sans et --font-serif

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
