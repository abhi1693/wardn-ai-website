import Link from "next/link";

import { BrandMark } from "@/components/atoms/brand-mark";

export function Brand() {
  return (
    <Link className="brand" href="#top" aria-label="Wardn AI home">
      <BrandMark />
      <span>Wardn AI</span>
    </Link>
  );
}
