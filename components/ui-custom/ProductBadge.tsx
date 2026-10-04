type ProductBadgeProps = {
  label: string;
};

export function ProductBadge({ label }: ProductBadgeProps) {
  return (
    <span className="ds-cat offre" style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
      <span aria-hidden="true" style={{ fontSize: "8px", lineHeight: 1 }}>◆</span>
      {label}
    </span>
  );
}
