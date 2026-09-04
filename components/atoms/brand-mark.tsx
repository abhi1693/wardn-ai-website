import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={cn("brand-mark", className)} viewBox="0 0 64 64" aria-hidden="true">
      <path className="brand-mark-back" d="M13 18l12 30 7-16 7 16 12-30" />
      <path className="brand-mark-front" d="M25 48l7-30 7 30" />
    </svg>
  );
}
