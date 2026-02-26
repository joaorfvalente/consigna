"use client";

import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight, MapPin, Search } from "lucide-react";
import { MainNav } from "@/components/MainNav";
import { BackofficeNav } from "@/components/BackofficeNav";
import { EntityFilters } from "@/components/EntityFilters";
import { CopyNifButton } from "@/components/CopyNifButton";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { BackgroundSurface } from "@/components/ui/background-surface";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DataTable,
  DataTableBody,
  DataTableCaption,
  DataTableCell,
  DataTableEmptyState,
  DataTableFooter,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/components/ui/data-table";

function SectionIntro({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <header id={id} className="space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  );
}

export default function ComponentesPage() {
  return (
    <PageTemplate
      title="Biblioteca de Componentes"
      description="Guia visual do design system. Estrutura limpa para consulta rápida."
      className="space-y-0"
      bodyContained={false}
      bodyClassName="pb-20 pt-10"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-2 text-sm">
            <p className="mb-3 font-medium text-foreground">Índice</p>
            <a href="#layout" className="block text-muted-foreground hover:text-foreground">Layout</a>
            <a href="#actions" className="block text-muted-foreground hover:text-foreground">Ações</a>
            <a href="#forms" className="block text-muted-foreground hover:text-foreground">Formulários</a>
            <a href="#surfaces" className="block text-muted-foreground hover:text-foreground">Superfícies</a>
            <a href="#data" className="block text-muted-foreground hover:text-foreground">Dados</a>
          </div>
        </aside>

        <main className="space-y-16">
          <section className="space-y-5">
            <SectionIntro
              id="layout"
              title="Layout e Navegação"
              description="Base estrutural usada pelas páginas públicas e backoffice."
            />
            <div className="space-y-4">
              <PageHeader title="Header default" description="Header base para páginas internas." />
              <PageHeader
                title="Header com contexto adicional"
                description="Suporta topContent e ações abaixo da descrição."
                topContent={<Badge variant="secondary" className="mb-3">Exemplo</Badge>}
              >
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">Ação 1</Button>
                  <Button size="sm">Ação 2</Button>
                </div>
              </PageHeader>
              <PageHeader
                title="Header detalhe de entidade"
                description="Versão compacta para contexto de detalhe."
                surfaceVariant="solid"
                contentClassName="mx-auto max-w-2xl px-4 py-6"
                titleClassName="mt-2 text-2xl font-bold"
                topContent={
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      ← Voltar à lista
                    </Link>
                  </Button>
                }
              >
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-mono text-sm text-muted-foreground">NIF 516822071</span>
                  <CopyNifButton nif="516822071" />
                  <Badge variant="secondary">Cultural</Badge>
                </div>
              </PageHeader>
            </div>
            <div className="space-y-3">
              <MainNav forceVisible preview />
              <BackofficeNav preview />
            </div>
          </section>

          <section className="space-y-5">
            <SectionIntro
              id="actions"
              title="Ações"
              description="Botões e badges usados para ações e estados."
            />
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">XS</Button>
                <Button size="sm">SM</Button>
                <Button size="default">Default</Button>
                <Button size="lg">LG</Button>
                <Button size="icon-xs">•</Button>
                <Button size="icon-sm">+</Button>
                <Button size="icon">🔗</Button>
                <Button size="icon-lg">→</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <MapPin className="size-4" />
                  Ver no mapa
                </Button>
                <Button size="sm">
                  <Search className="size-4" />
                  Pesquisar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="ghost">Ghost</Badge>
                <Badge variant="link">Link</Badge>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <SectionIntro
              id="forms"
              title="Formulários"
              description="Campos base e barra de pesquisa/filtros."
            />
            <div className="grid gap-8 xl:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ds-input">Input</Label>
                  <Input id="ds-input" placeholder="Nome da instituição..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ds-textarea">Textarea</Label>
                  <Textarea id="ds-textarea" placeholder="Descrição..." />
                </div>
                <div className="space-y-2">
                  <Label>Select</Label>
                  <Select defaultValue="1">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Opção 1</SelectItem>
                      <SelectItem value="2">Opção 2</SelectItem>
                      <SelectItem value="3">Opção 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <Suspense fallback={<div className="h-10 rounded-md bg-muted/40" />}>
                  <EntityFilters
                    search=""
                    county={undefined}
                    type={undefined}
                    year={String(new Date().getFullYear())}
                    counties={["Lisboa", "Porto", "Coimbra"]}
                    types={["Solidariedade social", "Ambiental", "Cultural"]}
                    variant="hero"
                  />
                </Suspense>
                <Suspense fallback={<div className="h-10 rounded-md bg-muted/40" />}>
                  <EntityFilters
                    search="fundação"
                    county="Lisboa"
                    type="Ambiental"
                    year={String(new Date().getFullYear())}
                    counties={["Lisboa", "Porto", "Coimbra"]}
                    types={["Solidariedade social", "Ambiental", "Cultural"]}
                    variant="default"
                  />
                </Suspense>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <SectionIntro
              id="surfaces"
              title="Superfícies e Cards"
              description="Fundos utilitários e card base com variante entity."
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <BackgroundSurface variant="solid" className="space-y-2">
                <div className="h-16 rounded-lg border border-border/60" />
                <p className="text-xs font-medium">solid</p>
              </BackgroundSurface>
              <BackgroundSurface variant="gradient" tone="neutral" className="space-y-2">
                <div className="h-16 rounded-lg border border-border/40" />
                <p className="text-xs font-medium">gradient / neutral</p>
              </BackgroundSurface>
              <BackgroundSurface variant="gradient" tone="primary" className="space-y-2">
                <div className="h-16 rounded-lg border border-border/40" />
                <p className="text-xs font-medium">gradient / primary</p>
              </BackgroundSurface>
              <BackgroundSurface variant="gradient" tone="accent" className="space-y-2">
                <div className="h-16 rounded-lg border border-border/40" />
                <p className="text-xs font-medium">gradient / accent</p>
              </BackgroundSurface>
              <BackgroundSurface variant="grain" className="space-y-2">
                <div className="h-16 rounded-lg border border-border/40" />
                <p className="text-xs font-medium">grain</p>
              </BackgroundSurface>
              <BackgroundSurface variant="header" className="space-y-2">
                <div className="h-16 rounded-lg border border-border/40" />
                <p className="text-xs font-medium">header</p>
              </BackgroundSurface>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Card default</CardTitle>
                  <CardDescription>Header + descrição.</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Card completo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Conteúdo principal.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline">Ação</Button>
                </CardFooter>
              </Card>
              <Card variant="entity">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <CardTitle className="leading-snug">
                        <Link href="#" className="hover:underline">Exemplo de instituição</Link>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        Lisboa
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs font-normal">Ambiental</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-3">
                    <span className="font-mono text-sm text-muted-foreground">NIF 501234567</span>
                    <div className="flex items-center gap-1.5">
                      <CopyNifButton nif="501234567" compact />
                      <Button asChild variant="ghost" size="xs">
                        <Link href="#">Ver</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-5">
            <SectionIntro
              id="data"
              title="Dados e Disclosure"
              description="Accordion, separators e tabelas para conteúdo estruturado."
            />
            <div className="grid gap-8 xl:grid-cols-2">
              <div className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="a">
                    <AccordionTrigger>Pergunta exemplo</AccordionTrigger>
                    <AccordionContent>Resposta detalhada.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger>Outra pergunta</AccordionTrigger>
                    <AccordionContent>Conteúdo adicional.</AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Separator />
                <div className="flex h-12 items-center gap-3 text-sm">
                  <span>A</span>
                  <Separator orientation="vertical" />
                  <span>B</span>
                </div>
              </div>
              <div className="space-y-4">
                <DataTable>
                  <DataTableCaption>Exemplo com dados</DataTableCaption>
                  <DataTableHeader>
                    <DataTableRow>
                      <DataTableHead>NIPC</DataTableHead>
                      <DataTableHead>Nome</DataTableHead>
                      <DataTableHead>Localidade</DataTableHead>
                    </DataTableRow>
                  </DataTableHeader>
                  <DataTableBody>
                    <DataTableRow>
                      <DataTableCell className="font-mono text-muted-foreground">501234567</DataTableCell>
                      <DataTableCell>Associação Exemplo</DataTableCell>
                      <DataTableCell className="text-muted-foreground">Lisboa</DataTableCell>
                    </DataTableRow>
                  </DataTableBody>
                  <DataTableFooter>
                    <DataTableRow>
                      <DataTableCell colSpan={3}>1 resultado</DataTableCell>
                    </DataTableRow>
                  </DataTableFooter>
                </DataTable>
                <DataTable>
                  <DataTableHeader>
                    <DataTableRow>
                      <DataTableHead>NIPC</DataTableHead>
                      <DataTableHead>Nome</DataTableHead>
                    </DataTableRow>
                  </DataTableHeader>
                  <DataTableBody>
                    <DataTableEmptyState colSpan={2}>Sem dados para mostrar</DataTableEmptyState>
                  </DataTableBody>
                </DataTable>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageTemplate>
  );
}
