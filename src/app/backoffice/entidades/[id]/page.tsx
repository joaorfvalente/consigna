"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Entity, EntityContacts } from "@/types/entity";
import { LocationEditor } from "@/components/LocationEditor";

export default function EditEntityPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [entity, setEntity] = useState<Entity | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [description, setDescription] = useState("");
  const [contacts, setContacts] = useState<EntityContacts>({});
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEntity() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("entities")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setEntity(null);
        setLoading(false);
        return;
      }

      setEntity(data);
      setDescription(data.description || "");
      setContacts((data.contacts as EntityContacts) || {});
      setAddress(data.address || "");
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setLoading(false);
    }

    fetchEntity();
  }, [id]);

  async function handleSave() {
    if (!entity) return;

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("entities")
      .update({
        description: description || null,
        contacts: Object.keys(contacts).length ? contacts : null,
        address: address || null,
        latitude,
        longitude,
      })
      .eq("id", id);

    setSaving(false);
    if (!error) {
      router.refresh();
    }
  }

  if (loading || !entity) {
    return <p className="text-stone-500">A carregar…</p>;
  }

  const originalName = entity.original_name ?? entity.name;
  const originalCounty = entity.original_county ?? entity.county;

  return (
    <div>
      <div className="rounded-lg border border-amber-100 bg-amber-50/50 p-4">
        <h2 className="text-sm font-medium text-amber-800">Valores originais (CSV)</h2>
        <dl className="mt-2 space-y-1 text-sm">
          <div>
            <dt className="text-amber-700">NIPC</dt>
            <dd className="font-mono text-stone-900">{entity.nif}</dd>
          </div>
          <div>
            <dt className="text-amber-700">Nome</dt>
            <dd className="text-stone-900">{originalName}</dd>
          </div>
          <div>
            <dt className="text-amber-700">Localidade</dt>
            <dd className="text-stone-900">{originalCounty || "—"}</dd>
          </div>
        </dl>
      </div>

      <h1 className="mt-6 text-2xl font-semibold text-stone-900">{entity.name}</h1>

      <div className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Descrição / Missão
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Contactos
          </label>
          <div className="mt-2 space-y-2">
            <input
              type="email"
              placeholder="Email"
              value={contacts.email || ""}
              onChange={(e) =>
                setContacts((c) => ({ ...c, email: e.target.value || undefined }))
              }
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={contacts.phone || ""}
              onChange={(e) =>
                setContacts((c) => ({ ...c, phone: e.target.value || undefined }))
              }
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
            />
            <input
              type="url"
              placeholder="Site"
              value={contacts.website || ""}
              onChange={(e) =>
                setContacts((c) => ({ ...c, website: e.target.value || undefined }))
              }
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Localização (para mapa)
          </label>
          <LocationEditor
            address={address}
            latitude={latitude}
            longitude={longitude}
            onAddressChange={setAddress}
            onLocationChange={(lat, lng) => {
              setLatitude(lat);
              setLongitude(lng);
            }}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {saving ? "A guardar…" : "Guardar"}
        </button>
      </div>
    </div>
  );
}
