import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getFiscalYearOptions } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { Database, FileSpreadsheet, MapPin, PenSquare, Shapes } from "lucide-react";

export default async function BackofficeDashboard() {
  const currentYear = getFiscalYearOptions(1)[0];
  const supabase = await createClient();

  const [
    { count: currentYearCount },
    { count: totalCount },
    { count: describedCount },
    { count: locatedCount },
  ] = await Promise.all([
    supabase
      .from("entities")
      .select("*", { count: "exact", head: true })
      .eq("year", currentYear),
    supabase.from("entities").select("*", { count: "exact", head: true }),
    supabase
      .from("entities")
      .select("*", { count: "exact", head: true })
      .eq("year", currentYear)
      .not("description", "is", null),
    supabase
      .from("entities")
      .select("*", { count: "exact", head: true })
      .eq("year", currentYear)
      .not("latitude", "is", null)
      .not("longitude", "is", null),
  ]);

  const currentYearTotal = currentYearCount ?? 0;
  const describedTotal = describedCount ?? 0;
  const locatedTotal = locatedCount ?? 0;
  const completionRate =
    currentYearTotal > 0
      ? Math.round(((describedTotal + locatedTotal) / (currentYearTotal * 2)) * 100)
      : 0;

  return (
    <PageTemplate
      title="Backoffice"
      description="Centro operacional para manter e enriquecer a base de entidades."
      className="space-y-8"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="gap-1">
            <CardDescription className="flex items-center gap-1.5">
              <Database className="size-3.5" />
              Entidades {currentYear}
            </CardDescription>
            <CardTitle className="text-2xl">{currentYearTotal.toLocaleString("pt-PT")}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="gap-1">
            <CardDescription>Total em base histórica</CardDescription>
            <CardTitle className="text-2xl">{(totalCount ?? 0).toLocaleString("pt-PT")}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="gap-1">
            <CardDescription>Com descrição ({currentYear})</CardDescription>
            <CardTitle className="text-2xl">{describedTotal.toLocaleString("pt-PT")}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="gap-1">
            <CardDescription>Com localização ({currentYear})</CardDescription>
            <CardTitle className="text-2xl">{locatedTotal.toLocaleString("pt-PT")}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Estado de enriquecimento</CardTitle>
          <CardDescription>
            Cobertura combinada de descrição e geolocalização no ano corrente.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Quanto maior este valor, melhor a qualidade da experiência pública.
          </p>
          <Badge variant="secondary" className="text-sm">
            {completionRate}% completo
          </Badge>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileSpreadsheet className="size-4" />
              Upload CSV
            </CardTitle>
            <CardDescription>
              Importar nova lista oficial e atualizar ano fiscal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm">
              <Link href="/backoffice/upload">Ir para upload</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PenSquare className="size-4" />
              Entidades
            </CardTitle>
            <CardDescription>
              Editar descrição, contactos e dados de cada entidade.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm">
              <Link href="/backoffice/entidades">Abrir listagem</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shapes className="size-4" />
              Biblioteca DS
            </CardTitle>
            <CardDescription>
              Rever componentes, variantes e padrões visuais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" size="sm">
              <Link href="/backoffice/componentes">Abrir biblioteca</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Fluxo recomendado</CardTitle>
          <CardDescription>
            Sequência sugerida para manter dados e mapa atualizados.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Passo 1</p>
            <p className="font-medium">Importar CSV</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Passo 2</p>
            <p className="font-medium">Enriquecer descrições</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Passo 3</p>
            <p className="flex items-center gap-1.5 font-medium">
              <MapPin className="size-3.5 text-muted-foreground" />
              Validar localizações
            </p>
          </div>
        </CardContent>
      </Card>
    </PageTemplate>
  );
}
