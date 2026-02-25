"use client";

import { useState, useCallback, useRef } from "react";
import { searchAddress } from "@/lib/geocoding";

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
      <input
        type="text"
        placeholder="Pesquisar morada (ex: Rua das Flores, Lisboa)..."
        value={query !== "" ? query : address}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
      />
      {loading && <p className="text-sm text-stone-500">A pesquisar…</p>}
      {suggestions.length > 0 && (
        <ul className="rounded-lg border border-stone-200 bg-white py-1 shadow">
          {suggestions.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => selectSuggestion(s)}
                className="w-full px-3 py-2 text-left text-sm text-stone-700 hover:bg-stone-50"
              >
                {s.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {address && (latitude != null || longitude != null) && (
        <p className="text-sm text-stone-500">
          Localização definida. Coordenadas guardadas automaticamente.
        </p>
      )}
    </div>
  );
}
