"use client";

import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Chip, Input, Textarea } from "@heroui/react";

export default function ComponentesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:py-10">
      <Card shadow="sm" className="border border-slate-200/70 bg-white/90">
        <CardBody className="gap-2 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Biblioteca HeroUI</h1>
          <p className="text-slate-600">Página de referência visual.</p>
        </CardBody>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        <Card shadow="sm" className="border border-slate-200/70">
          <CardHeader className="text-base font-semibold">Botoes e chips</CardHeader>
          <CardBody className="flex flex-wrap gap-2">
            <Button color="primary">Primario</Button>
            <Button variant="bordered">Secundario</Button>
            <Button variant="flat" color="success">Sucesso</Button>
            <Button variant="light" color="danger">Perigo</Button>
            <Chip color="primary" variant="flat">Tag</Chip>
          </CardBody>
        </Card>

        <Card shadow="sm" className="border border-slate-200/70">
          <CardHeader className="text-base font-semibold">Campos</CardHeader>
          <CardBody className="gap-3">
            <Input label="Nome" placeholder="Associacao Exemplo" />
            <Input label="Email" type="email" placeholder="contacto@instituicao.pt" />
            <Textarea label="Descricao" placeholder="Texto de exemplo" />
          </CardBody>
        </Card>
      </section>

      <Card shadow="sm" className="border border-slate-200/70">
        <CardHeader className="text-base font-semibold">Accordion</CardHeader>
        <CardBody>
          <Accordion variant="splitted" selectionMode="single">
            <AccordionItem key="1" title="Pergunta exemplo" aria-label="Pergunta exemplo">Resposta exemplo para validacao visual.</AccordionItem>
            <AccordionItem key="2" title="Outra pergunta" aria-label="Outra pergunta">Mais conteudo para testar componentes.</AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
    </main>
  );
}
