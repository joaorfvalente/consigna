"use client";

import { useEffect, useRef } from "react";

type MapEntity = { id: string; name: string; latitude: number; longitude: number };
const PT_CENTER: [number, number] = [39.6, -8.0];

export function EntityMap({ entities }: { entities: MapEntity[] }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    let map: import("leaflet").Map | null = null;

    async function setup() {
      const L = (await import("leaflet")).default;
      map = L.map(mapRef.current!).setView(PT_CENTER, 7);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap" }).addTo(map);

      entities.forEach((entity) => {
        const marker = L.marker([entity.latitude, entity.longitude]).addTo(map!);
        marker.bindPopup(`<a href="/entidades/${entity.id}">${entity.name}</a>`);
      });

      if (entities.length > 1) {
        const bounds = L.latLngBounds(entities.map((item) => [item.latitude, item.longitude] as [number, number]));
        map.fitBounds(bounds, { padding: [40, 40] });
      }

      if (entities.length === 1) {
        map.setView([entities[0].latitude, entities[0].longitude], 13);
      }
    }

    setup();
    return () => {
      map?.remove();
    };
  }, [entities]);

  return <div ref={mapRef} className="h-full w-full" />;
}
