type Props = { className: string; label: string; decorative?: boolean };

export function Sprite({ className, label, decorative = false }: Props) {
  return <span className={`sprite ${className}`} role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : label} aria-hidden={decorative || undefined} />;
}
