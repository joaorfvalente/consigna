import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { FAQ } from "@/components/FAQ";
import { Search, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <PageHeader
        title="Uma forma fácil de ajudar quem tanto ajuda."
        description="A consignação do IRS permite-lhe destinar 1% do seu imposto a uma instituição de solidariedade, cultural ou ambiental, em vez de o entregar ao Estado. É um processo totalmente gratuito e não afeta o valor do seu reembolso."
        topContent={
          <Badge variant="secondary" className="mb-4">
            Consignar IRS
          </Badge>
        }
        className="bg-transparent"
        contentClassName="mx-auto max-w-4xl px-4 py-10 sm:py-12"
        titleClassName="max-w-2xl text-4xl font-bold sm:text-5xl"
        descriptionClassName="mt-4 max-w-xl text-lg"
      >
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="min-h-12 px-8">
            <Link href="/entidades">
              <Search className="size-5" />
              Procurar instituições
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-12 px-8">
            <Link href="/entidades/mapa">
              <MapPin className="size-5" />
              Ver no mapa
            </Link>
          </Button>
        </div>
      </PageHeader>

      <div className="w-full border-t border-border" />

      <FAQ />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Dados da lista oficial da Autoridade Tributária e Aduaneira
            </p>
            <Link
              href="/backoffice"
              className="text-sm text-muted-foreground underline hover:text-foreground"
            >
              Acesso backoffice
            </Link>
          </div>
      </div>
    </main>
  );
}
