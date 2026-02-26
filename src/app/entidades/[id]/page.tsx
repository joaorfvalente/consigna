import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { EntidadeDetailClient } from "@/components/pages/EntidadeDetailClient";

interface EntityDetail {
  name: string;
  nif: string;
  county: string | null;
  district: string | null;
  type: string | null;
  description: string | null;
  address: string | null;
  contacts: { email?: string; phone?: string; website?: string } | null;
}

export default async function EntityDetailPage({ params }: { params: Promise<{ id: string }>; }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entity, error } = await supabase.from("entities").select("*").eq("id", id).single();
  if (error || !entity) notFound();

  return (
    <EntidadeDetailClient
      entity={entity as EntityDetail}
      contacts={(entity.contacts ?? {}) as { email?: string; phone?: string; website?: string }}
    />
  );
}
