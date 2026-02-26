"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CopyNifButtonProps {
  nif: string;
  compact?: boolean;
}

export function CopyNifButton({ nif, compact = false }: CopyNifButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(nif);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button
      variant="ghost"
      size={compact ? "xs" : "sm"}
      onClick={handleCopy}
      className={
        compact
          ? "h-7 px-2 text-muted-foreground hover:text-foreground"
          : "min-h-[44px] min-w-[44px] text-muted-foreground hover:text-foreground"
      }
      title="Copiar NIPC"
    >
      {copied ? "Copiado!" : "Copiar"}
    </Button>
  );
}
