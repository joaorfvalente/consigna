"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Button, Card, CardBody, CardHeader, Chip, Progress } from "@heroui/react";
import { Database, FileSpreadsheet, MapPin, PenSquare, Shapes } from "lucide-react";

export function BackofficeDashboardClient({ currentYear, currentYearTotal, totalCount, describedTotal, locatedTotal, completionRate }: { currentYear: number; currentYearTotal: number; totalCount: number; describedTotal: number; locatedTotal: number; completionRate: number; }) {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:py-10">
      <Card shadow="sm" className="border border-slate-200/70 bg-white/90">
        <CardBody className="gap-2 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Backoffice</h1>
          <p className="text-slate-600">Gestão de dados de entidades e controlo da qualidade da informação.</p>
        </CardBody>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={<Database className="size-4" />} title={`Entidades ${currentYear}`} value={currentYearTotal} />
        <MetricCard title="Total historico" value={totalCount} />
        <MetricCard title="Com descricao" value={describedTotal} />
        <MetricCard title="Com localizacao" value={locatedTotal} />
      </section>

      <Card shadow="sm" className="border border-slate-200/70">
        <CardHeader className="flex flex-col items-start gap-2">
          <h2 className="text-base font-semibold text-slate-900">Qualidade dos dados</h2>
          <p className="text-sm text-slate-500">Descricao e geolocalizacao no ano corrente.</p>
        </CardHeader>
        <CardBody className="gap-3">
          <Progress aria-label="Progresso" value={completionRate} />
          <Chip color="primary" variant="flat">{completionRate}% completo</Chip>
        </CardBody>
      </Card>

      <section className="grid gap-4 lg:grid-cols-3">
        <ActionCard icon={<FileSpreadsheet className="size-4" />} title="Upload" description="Importar ficheiro CSV" href="/backoffice/upload" cta="Abrir" />
        <ActionCard icon={<PenSquare className="size-4" />} title="Entidades" description="Editar dados das entidades" href="/backoffice/entidades" cta="Abrir" />
        <ActionCard icon={<Shapes className="size-4" />} title="Componentes" description="Guia visual HeroUI" href="/backoffice/componentes" cta="Abrir" />
      </section>

      <Card shadow="sm" className="border border-slate-200/70">
        <CardHeader><h2 className="text-base font-semibold text-slate-900">Fluxo sugerido</h2></CardHeader>
        <CardBody className="grid gap-3 sm:grid-cols-3">
          <StepCard label="Passo 1" text="Importar CSV" />
          <StepCard label="Passo 2" text="Completar descricoes" />
          <StepCard label="Passo 3" text="Validar mapa" icon={<MapPin className="size-4 text-slate-500" />} />
        </CardBody>
      </Card>
    </main>
  );
}

function MetricCard({ icon, title, value }: { icon?: ReactNode; title: string; value: number }) {
  return (
    <Card shadow="sm" className="border border-slate-200/70">
      <CardBody>
        <p className="flex items-center gap-1 text-sm text-slate-500">{icon}{title}</p>
        <p className="text-2xl font-semibold text-slate-900">{value.toLocaleString("pt-PT")}</p>
      </CardBody>
    </Card>
  );
}

function ActionCard({ icon, title, description, href, cta }: { icon: ReactNode; title: string; description: string; href: string; cta: string }) {
  return (
    <Card shadow="sm" className="border border-slate-200/70 transition-transform duration-200 hover:-translate-y-0.5">
      <CardHeader className="flex flex-col items-start gap-1">
        <p className="flex items-center gap-2 text-base font-semibold text-slate-900">{icon}{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </CardHeader>
      <CardBody>
        <Button as={Link} href={href} variant="bordered" size="sm" radius="full">
          {cta}
        </Button>
      </CardBody>
    </Card>
  );
}

function StepCard({ label, text, icon }: { label: string; text: string; icon?: ReactNode }) {
  return <Card shadow="none" className="border border-slate-200"><CardBody><p className="text-xs text-slate-500">{label}</p><p className="mt-1 flex items-center gap-1 text-slate-900 font-medium">{icon}{text}</p></CardBody></Card>;
}
