"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { parseCSV, parseCSVPreview } from "@/lib/csv-parser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/templates/PageTemplate";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/components/ui/data-table";
import { FISCAL_YEAR_OPTIONS } from "@/lib/constants";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [preview, setPreview] = useState<{ entities: unknown[]; headers: string[]; errors: string[]; totalCount: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ imported: number; errors: string[] } | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      setFile(f || null);
      setPreview(null);
      setResult(null);

      if (f) {
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result as string;
          const { entities, headers, errors, totalCount } = parseCSVPreview(content, year);
          setPreview({ entities, headers, errors, totalCount });
        };
        reader.readAsText(f, "UTF-8");
      }
    },
    [year]
  );

  const handleYearChange = (value: string) => {
    const y = parseInt(value, 10);
    setYear(y);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const { entities, headers, errors, totalCount } = parseCSVPreview(content, y);
        setPreview({ entities, headers, errors, totalCount });
      };
      reader.readAsText(file, "UTF-8");
    }
  };

  async function handleImport() {
    if (!file || !preview || preview.totalCount === 0) return;

    setLoading(true);
    setResult(null);

    const content = await file.text();
    const { entities, errors } = parseCSV(content, year);

    const supabase = createClient();
    let imported = 0;
    const importErrors: string[] = [];

    for (const entity of entities) {
      const { error } = await supabase.from("entities").upsert(entity, {
        onConflict: "nif,year",
      });
      if (error) {
        importErrors.push(`${entity.nif}: ${error.message}`);
      } else {
        imported++;
      }
    }

    setResult({ imported, errors: [...errors, ...importErrors] });
    setLoading(false);
  }

  return (
    <PageTemplate
      title="Upload CSV"
      description="Importar lista de entidades elegíveis do Portal das Finanças"
      className="space-y-8"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Ano fiscal</Label>
          <Select
            value={String(year)}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FISCAL_YEAR_OPTIONS.map((fiscalYear) => (
                <SelectItem key={fiscalYear} value={String(fiscalYear)}>
                  {fiscalYear}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Ficheiro CSV</Label>
          <Input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileChange}
            className="file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-4 file:py-2"
          />
          <p className="text-xs text-muted-foreground">
            Colunas esperadas: NIPC, Nome, Localidade
          </p>
        </div>

        {preview && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pré-visualização</CardTitle>
              {preview.errors.length > 0 && (
                <div className="text-sm text-destructive">
                  {preview.errors.map((e, i) => (
                    <p key={i}>{e}</p>
                  ))}
                </div>
              )}
              <CardDescription>
                {preview.totalCount.toLocaleString("pt-PT")} entidades encontradas
                {preview.totalCount > preview.entities.length && (
                  <span> (a mostrar {preview.entities.length})</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-60 overflow-auto">
                <DataTable>
                  <DataTableHeader>
                    <DataTableRow>
                      {preview.headers.slice(0, 5).map((h, i) => (
                        <DataTableHead key={i}>{h}</DataTableHead>
                      ))}
                    </DataTableRow>
                  </DataTableHeader>
                  <DataTableBody>
                    {(preview.entities as { nif: string; name: string; county?: string }[])
                      .slice(0, 10)
                      .map((e, i) => (
                        <DataTableRow key={i}>
                          <DataTableCell>{e.nif}</DataTableCell>
                          <DataTableCell>{e.name}</DataTableCell>
                          <DataTableCell>{e.county ?? "-"}</DataTableCell>
                        </DataTableRow>
                      ))}
                  </DataTableBody>
                </DataTable>
              </div>
              <Button onClick={handleImport} disabled={loading}>
                {loading ? "A importar…" : "Importar"}
              </Button>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resultado</CardTitle>
              <CardDescription>
                {result.imported} entidades importadas
              </CardDescription>
              {result.errors.length > 0 && (
                <div className="max-h-32 overflow-auto text-sm text-destructive">
                  {result.errors.slice(0, 5).map((e, i) => (
                    <p key={i}>{e}</p>
                  ))}
                  {result.errors.length > 5 && (
                    <p>… e mais {result.errors.length - 5} erros</p>
                  )}
                </div>
              )}
            </CardHeader>
          </Card>
        )}
      </div>
    </PageTemplate>
  );
}
