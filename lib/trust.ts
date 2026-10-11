/* « Ils m'ont fait confiance » : organisations clientes, bailleurs et employeurs.
   Les logos (public/logos/*.png, hauteur 96 px) proviennent du dossier
   d'attestations ; une entrée sans logo est rendue en badge typographique.
   Pour remplacer un logo par le fichier officiel : déposer le fichier sous le
   même nom dans public/logos/ (PNG ou SVG, fond transparent). */
export type TrustItem = {
  id: string;
  name: string;
  logo?: string;
  /** Dimensions intrinsèques du fichier (pour next/image). */
  w?: number;
  h?: number;
  /** Hauteur d'affichage en px (défaut 40). */
  display?: number;
};

export const TRUST_ITEMS: TrustItem[] = [
  { id: "oif", name: "Organisation internationale de la Francophonie", logo: "/logos/oif.png", w: 214, h: 96, display: 44 },
  { id: "ue", name: "Union européenne" },
  { id: "afd", name: "Agence Française de Développement", logo: "/logos/afd.png", w: 286, h: 96, display: 30 },
  { id: "giz", name: "Coopération allemande · GIZ" },
  { id: "ddc", name: "Coopération suisse" },
  { id: "irsc", name: "Instituts de recherche en santé du Canada" },
  { id: "gates", name: "Fondation Bill & Melinda Gates" },
  { id: "merieux", name: "Fondation Mérieux" },
  { id: "resaolab", name: "RESAOLAB", logo: "/logos/resaolab.png", w: 454, h: 96, display: 30 },
  { id: "ibf", name: "IBF International Consulting", logo: "/logos/ibf.png", w: 139, h: 96, display: 44 },
  { id: "chu", name: "CHU de Québec · Université Laval", logo: "/logos/chu.png", w: 96, h: 96, display: 46 },
  { id: "benin", name: "République du Bénin · Ministère de la Santé", logo: "/logos/benin.png", w: 107, h: 96, display: 44 },
  { id: "heaven", name: "Heaven Immobilier Groupe", logo: "/logos/heaven.png", w: 96, h: 96, display: 46 },
  { id: "isp", name: "Cabinet Impact Services Plus", logo: "/logos/isp.png", w: 292, h: 96, display: 36 },
  { id: "abm", name: "Association des Biologistes Médicaux du Bénin", logo: "/logos/abm.png", w: 80, h: 96, display: 46 },
  { id: "anpe", name: "Agence Nationale Pour l'Emploi · Bénin", logo: "/logos/anpe.png", w: 907, h: 96, display: 24 },
  { id: "ketou", name: "Commune de Kétou" },
  { id: "aspaif", name: "ASPAIF-ONG", logo: "/logos/aspaif.png", w: 119, h: 96, display: 44 },
  { id: "promoleaders", name: "La Promo des Leaders", logo: "/logos/promoleaders.png", w: 186, h: 96, display: 44 },
  { id: "jci", name: "JCI Kétou-Ifè" },
  { id: "royal", name: "Royal Services Plus" },
];

export const CREDENTIAL_LOGOS: Record<string, { logo: string; w: number; h: number; display: number }> = {
  cif: { logo: "/logos/cif.png", w: 221, h: 96, display: 40 },
  psbde: { logo: "/logos/psbde.png", w: 591, h: 96, display: 28 },
  escae: { logo: "/logos/escae.png", w: 257, h: 96, display: 36 },
  eneam: { logo: "/logos/eneam.png", w: 96, h: 96, display: 40 },
  prodev: { logo: "/logos/prodev.png", w: 171, h: 96, display: 40 },
  acm: { logo: "/logos/acm.png", w: 740, h: 96, display: 26 },
};
