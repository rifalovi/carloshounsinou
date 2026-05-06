"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { locale: string };

export default function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname();

  const otherLocale = locale === "fr" ? "en" : "fr";
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <Link
      href={otherPath}
      aria-label={`Switch to ${otherLocale === "fr" ? "Français" : "English"}`}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        fontWeight: 500,
        color: "#525B66",
        textDecoration: "none",
        letterSpacing: "0.04em",
        padding: "4px 8px",
        border: "1px solid rgba(15,20,25,0.12)",
        borderRadius: "4px",
        transition: "all 0.2s",
      }}
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}
