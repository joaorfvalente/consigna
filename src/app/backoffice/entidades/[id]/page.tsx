"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Entity, EntityContacts } from "@/types/entity";
import { LocationEditor } from "@/components/LocationEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Textarea } from "@/components/ui/textarea";

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
    return <p className="text-muted-foreground">A carregar…</p>;
  }

  const originalName = entity.original_name ?? entity.name;
  const originalCounty = entity.original_county ?? entity.county;

  return (
    <PageTemplate
      title={entity.name}
      description="Enriquecer descrição, contactos e localização"
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Valores originais (CSV)</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground">NIPC</dt>
              <dd className="font-mono">{entity.nif}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Nome</dt>
              <dd>{originalName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Localidade</dt>
              <dd>{originalCounty || "—"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div>
          <Label>
            Descrição / Missão
          </Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-2"
          />
        </div>

        <div>
          <Label>
            Contactos
          </Label>
          <div className="mt-2 space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={contacts.email || ""}
              onChange={(e) =>
                setContacts((c) => ({ ...c, email: e.target.value || undefined }))
              }
            />
            <Input
              type="tel"
              placeholder="Telefone"
              value={contacts.phone || ""}
              onChange={(e) =>
                setContacts((c) => ({ ...c, phone: e.target.value || undefined }))
              }
            />
            <Input
              type="url"
              placeholder="Site"
              value={contacts.website || ""}
              onChange={(e) =>
                setContacts((c) => ({ ...c, website: e.target.value || undefined }))
              }
            />
          </div>
        </div>

        <div>
          <Label>
            Localização (para mapa)
          </Label>
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

        <Button
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "A guardar…" : "Guardar"}
        </Button>
      </div>
    </PageTemplate>
  );
}
