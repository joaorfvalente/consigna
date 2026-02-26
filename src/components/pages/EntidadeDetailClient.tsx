"use client";

import Link from "next/link";
import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { Building2, FileText, Globe, Mail, MapPin, Phone } from "lucide-react";
import { CopyNifButton } from "@/components/CopyNifButton";

type EntityDetail = { name: string; nif: string; county: string | null; district: string | null; type: string | null; description: string | null; address: string | null };
type Contacts = { email?: string; phone?: string; website?: string };

export function EntidadeDetailClient({ entity, contacts }: { entity: EntityDetail; contacts: Contacts }) {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:py-10">
      <Button as={Link} href="/entidades" variant="light" size="sm" radius="full" className="w-fit">
        Voltar
      </Button>

      <header className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{entity.name}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-slate-500">NIF {entity.nif}</span>
          <CopyNifButton nif={entity.nif} />
          {entity.type && <Chip variant="flat">{entity.type}</Chip>}
        </div>
      </header>

      <Card shadow="sm" className="border border-slate-200/80">
        <CardHeader className="flex items-center gap-2 text-base font-semibold"><Building2 className="size-4" />Informacao</CardHeader>
        <CardBody className="grid gap-2 text-slate-700 sm:grid-cols-2">
          {entity.county && <p><strong>Localidade:</strong> {entity.county}</p>}
          {entity.district && <p><strong>Distrito:</strong> {entity.district}</p>}
          {entity.type && <p><strong>Tipo:</strong> {entity.type}</p>}
        </CardBody>
      </Card>

      {entity.description && (
        <Card shadow="sm" className="border border-slate-200/80">
          <CardHeader className="flex items-center gap-2 text-base font-semibold"><FileText className="size-4" />Descricao</CardHeader>
          <CardBody><p className="text-slate-600">{entity.description}</p></CardBody>
        </Card>
      )}

      <Card shadow="sm" className="border border-slate-200/80">
        <CardHeader className="text-base font-semibold">Contactos</CardHeader>
        <CardBody className="space-y-2 text-slate-600">
          {entity.address && <p className="flex gap-2"><MapPin className="size-4 mt-1" />{entity.address}</p>}
          {contacts.email && <p className="flex gap-2"><Mail className="size-4 mt-1" /><a href={`mailto:${contacts.email}`}>{contacts.email}</a></p>}
          {contacts.phone && <p className="flex gap-2"><Phone className="size-4 mt-1" /><a href={`tel:${contacts.phone}`}>{contacts.phone}</a></p>}
          {contacts.website && <p className="flex gap-2"><Globe className="size-4 mt-1" /><a href={contacts.website} target="_blank" rel="noopener noreferrer">{contacts.website}</a></p>}
        </CardBody>
      </Card>
    </main>
  );
}
