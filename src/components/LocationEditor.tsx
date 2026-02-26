"use client";

import { useCallback, useRef, useState } from "react";
import { searchAddress } from "@/lib/geocoding";
import { Button, Input } from "@heroui/react";

export function LocationEditor({ address, latitude, longitude, onAddressChange, onLocationChange }: { address: string; latitude: number | null; longitude: number | null; onAddressChange: (address: string) => void; onLocationChange: (lat: number, lng: number) => void; }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{ display_name: string; lat: string; lon: string }[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const fetchSuggestions = useCallback(async (value: string) => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      setSuggestions(await searchAddress(value, { countrycodes: "pt", limit: 5 }));
    } finally {
      setLoading(false);
    }
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 350);
  }

  function selectSuggestion(item: { display_name: string; lat: string; lon: string }) {
    onAddressChange(item.display_name);
    onLocationChange(parseFloat(item.lat), parseFloat(item.lon));
    setQuery("");
    setSuggestions([]);
  }

  return (
    <div className="space-y-2">
      <Input value={query !== "" ? query : address} onChange={(e) => handleChange(e.target.value)} placeholder="Pesquisar morada (Portugal)" />
      {loading && <p className="text-sm text-slate-500">A pesquisar...</p>}

      {suggestions.length > 0 && (
        <ul className="rounded-xl border border-slate-200 bg-white p-1">
          {suggestions.map((item) => (
            <li key={`${item.lat}-${item.lon}`}>
              <Button type="button" variant="light" size="sm" onPress={() => selectSuggestion(item)} className="h-auto w-full justify-start py-2 text-left">
                {item.display_name}
              </Button>
            </li>
          ))}
        </ul>
      )}

      {address && (latitude != null || longitude != null) && <p className="text-sm text-slate-500">Localizacao definida para o mapa.</p>}
    </div>
  );
}
