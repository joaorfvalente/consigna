"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

export function CopyNifButton({ nif, compact = false }: { nif: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(nif);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Button size={compact ? "sm" : "md"} variant={copied ? "solid" : "flat"} color={copied ? "success" : "default"} onPress={handleCopy}>
      {copied ? "Copiado" : "Copiar NIF"}
    </Button>
  );
}
