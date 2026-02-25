import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CopyNifButton } from "@/components/CopyNifButton";

export default async function EntityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: entity, error } = await supabase
    .from("entities")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !entity) {
    notFound();
  }

  const contacts = (entity.contacts as { email?: string; phone?: string; website?: string }) || {};

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <Link
            href="/entidades"
            className="text-sm text-stone-500 hover:text-stone-700"
          >
            ← Voltar à lista
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-stone-900">
            {entity.name}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-mono text-lg text-stone-700">{entity.nif}</span>
            <CopyNifButton nif={entity.nif} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <h2 className="font-medium text-stone-900">Informação</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {entity.county && (
                <div>
                  <dt className="text-stone-500">Localidade</dt>
                  <dd className="text-stone-900">{entity.county}</dd>
                </div>
              )}
              {entity.district && (
                <div>
                  <dt className="text-stone-500">Distrito</dt>
                  <dd className="text-stone-900">{entity.district}</dd>
                </div>
              )}
              {entity.type && (
                <div>
                  <dt className="text-stone-500">Tipo</dt>
                  <dd className="text-stone-900">{entity.type}</dd>
                </div>
              )}
            </dl>
          </div>

          {entity.description && (
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="font-medium text-stone-900">Missão / Descrição</h2>
              <p className="mt-2 text-stone-600">{entity.description}</p>
            </div>
          )}

          {(contacts.email || contacts.phone || contacts.website || entity.address) && (
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="font-medium text-stone-900">Contactos</h2>
              <dl className="mt-3 space-y-2 text-sm">
                {entity.address && (
                  <div>
                    <dt className="text-stone-500">Morada</dt>
                    <dd className="text-stone-900">{entity.address}</dd>
                  </div>
                )}
                {contacts.email && (
                  <div>
                    <dt className="text-stone-500">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${contacts.email}`}
                        className="text-emerald-600 hover:underline"
                      >
                        {contacts.email}
                      </a>
                    </dd>
                  </div>
                )}
                {contacts.phone && (
                  <div>
                    <dt className="text-stone-500">Telefone</dt>
                    <dd>
                      <a
                        href={`tel:${contacts.phone}`}
                        className="text-emerald-600 hover:underline"
                      >
                        {contacts.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {contacts.website && (
                  <div>
                    <dt className="text-stone-500">Site</dt>
                    <dd>
                      <a
                        href={contacts.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline"
                      >
                        {contacts.website}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm text-emerald-800">
              Use o NIPC acima para indicar esta instituição na sua declaração de
              IRS no Portal das Finanças.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
