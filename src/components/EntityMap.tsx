"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface EntityMapEntity {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface EntityMapProps {
  entities: EntityMapEntity[];
}

export function EntityMap({ entities }: EntityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || entities.length === 0) return;

    const loadMap = async () => {
      const L = (await import("leaflet")).default;

      const map = L.map(mapRef.current!).setView([38.7, -9.14], 7);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      entities.forEach((e) => {
        const marker = L.marker([e.latitude, e.longitude]).addTo(map);
        marker.bindPopup(
          `<a href="/entidades/${e.id}" class="text-emerald-600 font-medium hover:underline">${e.name}</a>`
        );
      });

      if (entities.length === 1) {
        map.setView([entities[0].latitude, entities[0].longitude], 14);
      } else if (entities.length > 1) {
        const bounds = L.latLngBounds(
          entities.map((e) => [e.latitude, e.longitude] as [number, number])
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    loadMap();
  }, [entities]);

  if (entities.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-stone-100">
        <p className="text-stone-500">
          Nenhuma instituição com localização definida. O backoffice pode adicionar
          moradas às entidades.
        </p>
      </div>
    );
  }

  return <div ref={mapRef} className="h-full w-full" />;
}
