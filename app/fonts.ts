import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";

export const fraunces = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const jakarta = Inter({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
