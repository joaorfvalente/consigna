"use client";

import { Button, Card, CardBody, CardHeader } from "@heroui/react";

export function HeroUiPreview() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <Card shadow="sm" className="border border-primary/15 bg-background/90">
        <CardHeader className="pb-1">
          <p className="text-xs uppercase tracking-wide text-primary">Teste de nova biblioteca</p>
        </CardHeader>
        <CardBody className="pt-1">
          <h2 className="text-lg font-semibold">Experiencia HeroUI (branch de testes)</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Este bloco serve para validar visual, estilos e interacoes do HeroUI antes da migracao
            completa dos componentes da aplicacao.
          </p>
          <div className="mt-4">
            <Button color="primary" variant="shadow" radius="sm">
              Botao HeroUI em teste
            </Button>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
