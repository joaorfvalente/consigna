"use client";

import Link from "next/link";
import { Button, Card, CardBody, Chip, Divider } from "@heroui/react";
import { Search, MapPin } from "lucide-react";
import { FAQ } from "@/components/FAQ";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_58%)]" />

      <section className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card shadow="sm" className="border border-slate-200/70 bg-white/90 backdrop-blur">
            <CardBody className="gap-5 p-8 sm:p-12">
              <Chip color="primary" variant="flat" className="w-fit">
                Plataforma de consignacao IRS
              </Chip>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Apoie uma instituicao em poucos minutos, sem custo adicional.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
                Pesquise entidades elegiveis, confirme o NIF e finalize no Portal das Financas com confianca.
              </p>
              <div className="mt-1 flex flex-col gap-3 sm:flex-row">
                <Button as={Link} href="/entidades" color="primary" size="lg" radius="full" className="shadow-md shadow-primary/20">
                  <Search className="size-5" /> Procurar instituicoes
                </Button>
                <Button as={Link} href="/entidades/mapa" variant="bordered" size="lg" radius="full">
                  <MapPin className="size-5" /> Ver no mapa
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card shadow="sm" className="border border-slate-200/70 bg-white/90">
            <CardBody className="gap-5 p-7">
              <p className="text-sm font-medium text-slate-500">Como funciona</p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">1. Encontre uma entidade</p>
                  <p className="text-sm text-slate-600">Filtre por nome, distrito e tipo de organizacao.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">2. Copie o NIF</p>
                  <p className="text-sm text-slate-600">Use o botao de copia para evitar erros manuais.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">3. Submeta no portal</p>
                  <p className="text-sm text-slate-600">Cole o NIF no processo de entrega da declaracao.</p>
                </div>
              </div>
              <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Impacto</p>
                <p className="mt-1 text-sm text-slate-700">
                  O valor consignado nao reduz o seu reembolso: e transferido da parte do imposto destinada ao Estado.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <Divider />
      </div>

      <div className="py-2">
        <FAQ />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10">
        <Card shadow="none" className="border border-slate-200 bg-white/80">
          <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Dados oficiais da Autoridade Tributaria e Aduaneira
            </p>
            <Link
              href="/backoffice"
              className="text-sm font-medium text-slate-600 underline hover:text-slate-900"
            >
              Acesso backoffice
            </Link>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
