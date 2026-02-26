"use client";

import { useEffect, useRef } from "react";

interface EntityMapEntity {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface EntityMapProps {
  entities: EntityMapEntity[];
}

const PORTUGAL_CENTER: [number, number] = [39.6, -8.1];
const PORTUGAL_ZOOM = 7;

export function EntityMap({ entities }: EntityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let map: import("leaflet").Map | null = null;
    const loadMap = async () => {
      const L = (await import("leaflet")).default;

      const createdMap = L.map(mapRef.current!).setView(
        PORTUGAL_CENTER,
        PORTUGAL_ZOOM
      );
      map = createdMap;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(createdMap);

      entities.forEach((e) => {
        const marker = L.marker([e.latitude, e.longitude]).addTo(createdMap);
        marker.bindPopup(
          `<a href="/entidades/${e.id}" class="text-primary font-medium hover:underline">${e.name}</a>`
        );
      });

      if (entities.length === 1) {
        createdMap.setView([entities[0].latitude, entities[0].longitude], 14);
      } else if (entities.length > 1) {
        const bounds = L.latLngBounds(
          entities.map((e) => [e.latitude, e.longitude] as [number, number])
        );
        createdMap.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    loadMap();

    return () => {
      map?.remove();
    };
  }, [entities]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />
      {entities.length === 0 && (
        <div className="pointer-events-none absolute left-1/2 top-4 z-[500] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-lg border bg-card/95 px-4 py-3 text-center shadow-sm backdrop-blur">
          <p className="text-sm text-muted-foreground">
            Ainda não existem instituições com localização definida. O mapa mantém a
            vista de Portugal para facilitar validação.
          </p>
        </div>
      )}
    </div>
  );
}
