import { cn } from "@/lib/utils";

export function SectionKicker({
  index,
  children,
  dark = false,
}: {
  index: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={cn("section-kicker", dark && "section-kicker-dark")}>
      <span>{index}</span> {children}
    </div>
  );
}
