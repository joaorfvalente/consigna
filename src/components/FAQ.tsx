"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é a consignação do IRS?",
    answer:
      "A consignação do IRS permite aos contribuintes doar uma parte do imposto pago (depois de descontadas as deduções à coleta) a um conjunto de entidades, em vez de o entregar na totalidade ao Estado. Desta forma, é possível apoiar diversas causas e instituições à sua escolha, sem qualquer custo adicional para si.",
  },
  {
    question: "Quem pode beneficiar com a consignação?",
    answer:
      "Desde o ano passado, com a publicação da Lei nº 42/2024, de 14 de novembro, todas/os as/os contribuintes podem consignar 1% do seu IRS a entidades que constam na lista publicada pela AT (anteriormente era possível consignar apenas 0,5%), desde que estejam devidamente inscritas para o efeito.",
  },
  {
    question: "Quando posso indicar a entidade a consignar?",
    answer:
      "Existem dois momentos: antecipadamente (entre 15 e 31 de março, antes de preencher a declaração) ou ao preencher a declaração (entre 1 de abril e 30 de junho). Se se enganar ou pretender alterar a entidade selecionada antecipadamente, poderá fazê-lo ao preencher a sua declaração de rendimentos.",
  },
  {
    question: "Como fazer a consignação antecipadamente?",
    answer:
      "Aceda ao Portal das Finanças e, no menu Dados Agregados IRS, selecione «Entidade a Consignar IRS/IVA». Insira os dados (nome e NIF) da entidade escolhida. Se ainda não tiver uma entidade em mente, clique na lupa junto ao NIF e verá uma lista com as instituições autorizadas. Selecione a entidade pretendida, verifique se o nome está correto e submeta o pedido. Poderá obter o comprovativo da consignação.",
  },
  {
    question: "Como fazer a consignação ao preencher a declaração?",
    answer:
      "Se optar por selecionar a instituição beneficiária no momento da entrega do IRS, deverá fazê-lo no quadro 11. Encontrará quatro opções: instituições religiosas; instituições particulares de solidariedade social ou pessoas coletivas de utilidade pública; pessoas coletivas de utilidade pública com fins ambientais; instituições culturais com estatuto de utilidade pública. Escolha o tipo de entidade, insira o NIF e indique se pretende consignar o IRS, o IVA ou ambos.",
  },
  {
    question: "Posso também consignar o IVA?",
    answer:
      "Sim. A segunda modalidade consiste em consignar o IVA suportado nas despesas com exigência de fatura (oficinas, alojamentos, cabeleireiros, atividades veterinárias, restaurantes). Neste caso, abdica-se desta dedução, que corresponde a 15% do IVA suportado por essas despesas. Os passos são idênticos aos da consignação do IRS, bastando selecionar a opção IVA.",
  },
];

export function FAQ() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:py-12">
      <h2 className="text-lg font-semibold">Perguntas frequentes</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Saiba mais sobre a consignação do IRS
      </p>
      <Accordion type="single" collapsible className="mt-6 w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
