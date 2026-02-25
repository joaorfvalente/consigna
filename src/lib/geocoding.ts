/**
 * Integração com Nominatim (OpenStreetMap) para geocoding.
 * Rate limit: 1 req/s - usar debounce no autocomplete.
 */

export interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  class?: string;
}

export async function searchAddress(
  query: string,
  options?: { countrycodes?: string; limit?: number }
): Promise<NominatimResult[]> {
  if (!query || query.trim().length < 3) return [];

  const params = new URLSearchParams({
    q: query.trim(),
    format: "json",
    addressdetails: "1",
    limit: String(options?.limit ?? 5),
    "accept-language": "pt",
  });

  if (options?.countrycodes) {
    params.set("countrycodes", options.countrycodes);
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?${params}`,
    {
      headers: {
        "User-Agent": "ConsignacaoIRS-Webapp/1.0",
      },
    }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
