"use client";

import { Accordion, AccordionItem } from "@heroui/react";

const faqs = [
  { q: "O que é a consignação do IRS?", a: "É a possibilidade de encaminhar 1% do seu IRS para uma entidade elegível, sem custo adicional." },
  { q: "Quem pode consignar?", a: "Qualquer contribuinte que entregue declaração de IRS em Portugal." },
  { q: "Quando posso escolher a entidade?", a: "Pode escolher no Portal das Finanças ou durante o preenchimento da declaração." },
  { q: "A consignação reduz o meu reembolso?", a: "Não. O valor sai da parte do imposto destinada ao Estado." },
];

export function FAQ() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Perguntas frequentes</h2>
      <p className="mt-2 text-base text-slate-600">Tudo o que precisa de saber para consignar o IRS.</p>
      <Accordion
        className="mt-7"
        variant="splitted"
        selectionMode="single"
        itemClasses={{
          base: "border border-slate-200/80 bg-white shadow-sm data-[open=true]:border-primary/30 data-[open=true]:bg-primary-50/30",
          trigger: "py-5",
          title: "text-left text-base font-semibold text-slate-800",
          indicator: "text-slate-500",
          content: "pb-5 text-sm leading-relaxed text-slate-600",
        }}
      >
        {faqs.map((item) => (
          <AccordionItem key={item.q} title={item.q} aria-label={item.q}>
            <p>{item.a}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
