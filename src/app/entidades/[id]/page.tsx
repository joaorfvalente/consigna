import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CopyNifButton } from "@/components/CopyNifButton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageTemplate } from "@/components/templates/PageTemplate";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Building2,
  FileText,
} from "lucide-react";

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

  const contacts = (entity.contacts as {
    email?: string;
    phone?: string;
    website?: string;
  }) || {};

  return (
    <PageTemplate
      title={entity.name}
      className="min-h-screen bg-muted/30"
      headerWidth="narrow"
      width="narrow"
      topContent={
        <Button variant="ghost" size="sm" asChild>
          <Link href="/entidades" className="text-muted-foreground hover:text-foreground">
            ← Voltar à lista
          </Link>
        </Button>
      }
      headerSurfaceVariant="solid"
      bodyClassName="py-8"
      withDivider={false}
      headerChildren={
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-lg text-muted-foreground">
            NIF {entity.nif}
          </span>
          <CopyNifButton nif={entity.nif} />
          {entity.type && <Badge variant="secondary">{entity.type}</Badge>}
        </div>
      }
    >
      <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="size-4" />
                Informação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-3 sm:grid-cols-2">
                {entity.county && (
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Localidade
                      </dt>
                      <dd className="font-medium">{entity.county}</dd>
                    </div>
                  </div>
                )}
                {entity.district && (
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Distrito
                      </dt>
                      <dd className="font-medium">{entity.district}</dd>
                    </div>
                  </div>
                )}
                {entity.type && (
                  <div>
                    <dt className="text-xs text-muted-foreground">Tipo</dt>
                    <dd>
                      <Badge variant="outline">{entity.type}</Badge>
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {entity.description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-4" />
                  Missão / Descrição
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {entity.description}
                </p>
              </CardContent>
            </Card>
          )}

          {(contacts.email ||
            contacts.phone ||
            contacts.website ||
            entity.address) && (
            <Card>
              <CardHeader>
                <CardTitle>Contactos</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  {entity.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Morada
                        </dt>
                        <dd>{entity.address}</dd>
                      </div>
                    </div>
                  )}
                  {contacts.email && (
                    <div className="flex items-start gap-2">
                      <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Email
                        </dt>
                        <dd>
                          <a
                            href={`mailto:${contacts.email}`}
                            className="text-primary hover:underline"
                          >
                            {contacts.email}
                          </a>
                        </dd>
                      </div>
                    </div>
                  )}
                  {contacts.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          Telefone
                        </dt>
                        <dd>
                          <a
                            href={`tel:${contacts.phone}`}
                            className="text-primary hover:underline"
                          >
                            {contacts.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                  )}
                  {contacts.website && (
                    <div className="flex items-start gap-2">
                      <Globe className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <dt className="text-xs text-muted-foreground">Site</dt>
                        <dd>
                          <a
                            href={contacts.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {contacts.website}
                          </a>
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>
          )}

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-sm text-primary">
                Use o NIF acima para indicar esta instituição na sua declaração
                de IRS no Portal das Finanças (Quadro 11 ou Dados Agregados IRS).
              </p>
            </CardContent>
          </Card>
      </div>
    </PageTemplate>
  );
}
