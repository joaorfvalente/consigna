"use client";

import { useState } from "react";

interface CopyNifButtonProps {
  nif: string;
}

export function CopyNifButton({ nif }: CopyNifButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(nif);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded px-2 py-0.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50"
      title="Copiar NIPC"
    >
      {copied ? "Copiado!" : "Copiar"}
    </button>
  );
}
