import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Reveal({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("reveal-block", className)} {...props}>
      {children}
    </div>
  );
}
