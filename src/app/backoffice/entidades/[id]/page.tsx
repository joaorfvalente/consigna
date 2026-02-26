"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, CardBody, CardHeader, Input, Textarea } from "@heroui/react";
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
      const { data } = await supabase.from("entities").select("*").eq("id", id).single();
      if (!data) { setLoading(false); return; }
      setEntity(data);
      setDescription(data.description ?? "");
      setContacts((data.contacts as EntityContacts) ?? {});
      setAddress(data.address ?? "");
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
    await supabase.from("entities").update({ description: description || null, contacts: Object.keys(contacts).length ? contacts : null, address: address || null, latitude, longitude }).eq("id", id);
    setSaving(false);
    router.refresh();
  }

  if (loading || !entity) return <p className="mx-auto max-w-6xl px-4 py-8 text-slate-500">A carregar...</p>;

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <header><h1 className="text-3xl font-semibold text-slate-900">{entity.name}</h1><p className="text-slate-600">Edicao de dados da entidade.</p></header>

      <Card>
        <CardHeader className="text-base font-semibold">Dados base</CardHeader>
        <CardBody className="space-y-2 text-sm">
          <p><strong>NIF:</strong> <span className="font-mono">{entity.nif}</span></p>
          <p><strong>Nome:</strong> {entity.original_name ?? entity.name}</p>
          <p><strong>Localidade:</strong> {entity.original_county ?? entity.county ?? "-"}</p>
        </CardBody>
      </Card>

      <Textarea label="Descricao" value={description} onChange={(e) => setDescription(e.target.value)} minRows={4} />

      <div className="grid gap-3 md:grid-cols-3">
        <Input label="Email" value={contacts.email ?? ""} onChange={(e) => setContacts((prev) => ({ ...prev, email: e.target.value || undefined }))} />
        <Input label="Telefone" value={contacts.phone ?? ""} onChange={(e) => setContacts((prev) => ({ ...prev, phone: e.target.value || undefined }))} />
        <Input label="Website" value={contacts.website ?? ""} onChange={(e) => setContacts((prev) => ({ ...prev, website: e.target.value || undefined }))} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Localizacao</p>
        <LocationEditor address={address} latitude={latitude} longitude={longitude} onAddressChange={setAddress} onLocationChange={(lat, lng) => { setLatitude(lat); setLongitude(lng); }} />
      </div>

      <Button color="primary" onPress={handleSave} isDisabled={saving}>{saving ? "A guardar..." : "Guardar"}</Button>
    </main>
  );
}
