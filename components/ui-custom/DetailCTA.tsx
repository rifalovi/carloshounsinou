"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

type Props = { label: string; projectTitle: string };

export default function DetailCTA({ label, projectTitle }: Props) {
  const locale = useLocale();
  const router = useRouter();

  const handleClick = () => {
    const message = `Bonjour Carlos,\n\nJe souhaite en savoir plus sur le projet « ${projectTitle} ».\n\nPouvez-vous me partager une présentation détaillée et discuter d'une éventuelle collaboration ?\n\nCordialement,`;
    sessionStorage.setItem("contactPrefill", JSON.stringify({ message, project: projectTitle }));
    router.push(`/${locale}/#contact`);
  };

  return (
    <button onClick={handleClick} className="ds-btn ds-btn-gold">
      {label}
      <span
        aria-hidden="true"
        style={{
          width: "26px",
          height: "26px",
          background: "color-mix(in srgb, var(--sp-bleu-nuit) 12%, transparent)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
        }}
      >
        →
      </span>
    </button>
  );
}
