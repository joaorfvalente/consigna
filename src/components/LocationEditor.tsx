"use client";

import { useState, useCallback, useRef } from "react";
import { searchAddress } from "@/lib/geocoding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LocationEditorProps {
  address: string;
  latitude: number | null;
  longitude: number | null;
  onAddressChange: (address: string) => void;
  onLocationChange: (lat: number, lng: number) => void;
}

export function LocationEditor({
  address,
  latitude,
  longitude,
  onAddressChange,
  onLocationChange,
}: LocationEditorProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ display_name: string; lat: string; lon: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const results = await searchAddress(q, { countrycodes: "pt", limit: 5 });
      setSuggestions(results);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleInputChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 400);
  }

  function selectSuggestion(s: { display_name: string; lat: string; lon: string }) {
    onAddressChange(s.display_name);
    onLocationChange(parseFloat(s.lat), parseFloat(s.lon));
    setQuery("");
    setSuggestions([]);
  }

  return (
    <div className="mt-2 space-y-2">
      <Input
        type="text"
        placeholder="Pesquisar morada (ex: Rua das Flores, Lisboa)..."
        value={query !== "" ? query : address}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {loading && <p className="text-sm text-muted-foreground">A pesquisar…</p>}
      {suggestions.length > 0 && (
        <ul className="rounded-lg border bg-card py-1 shadow-sm">
          {suggestions.map((s, i) => (
            <li key={i}>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => selectSuggestion(s)}
                className="h-auto w-full justify-start px-3 py-2 text-left text-sm whitespace-normal"
              >
                {s.display_name}
              </Button>
            </li>
          ))}
        </ul>
      )}
      {address && (latitude != null || longitude != null) && (
        <p className="text-sm text-muted-foreground">
          Localização definida. Coordenadas guardadas automaticamente.
        </p>
      )}
    </div>
  );
}
