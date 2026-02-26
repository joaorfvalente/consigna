"use client";

import { useCallback, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { createClient } from "@/lib/supabase/client";
import { parseCSV, parseCSVPreview } from "@/lib/csv-parser";
import { FISCAL_YEAR_OPTIONS } from "@/lib/constants";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [preview, setPreview] = useState<{ entities: unknown[]; headers: string[]; errors: string[]; totalCount: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ imported: number; errors: string[] } | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setResult(null);
    setPreview(null);
    if (!selected) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(parseCSVPreview(reader.result as string, year));
    reader.readAsText(selected, "UTF-8");
  }, [year]);

  async function handleImport() {
    if (!file || !preview || preview.totalCount === 0) return;
    setLoading(true);
    setResult(null);

    const { entities, errors } = parseCSV(await file.text(), year);
    const supabase = createClient();
    let imported = 0;
    const importErrors: string[] = [];

    for (const entity of entities) {
      const { error } = await supabase.from("entities").upsert(entity, { onConflict: "nif,year" });
      if (error) importErrors.push(`${entity.nif}: ${error.message}`);
      else imported += 1;
    }

    setResult({ imported, errors: [...errors, ...importErrors] });
    setLoading(false);
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:py-10">
      <Card shadow="sm" className="border border-slate-200/70 bg-white/90">
        <CardBody className="gap-2 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Upload CSV</h1>
          <p className="text-slate-600">Importe a lista oficial de entidades elegíveis.</p>
        </CardBody>
      </Card>

      <div className="space-y-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <label htmlFor="year" className="text-sm font-medium text-slate-700">Ano fiscal</label>
        <select id="year" value={String(year)} onChange={(e) => setYear(parseInt(e.target.value, 10))} className="h-11 w-[170px] rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm">
          {FISCAL_YEAR_OPTIONS.map((item) => <option key={item} value={String(item)}>{item}</option>)}
        </select>

        <div className="space-y-2">
        <label htmlFor="csv" className="text-sm font-medium text-slate-700">Ficheiro</label>
        <Input id="csv" type="file" accept=".csv,.txt" onChange={handleFileChange} />
        </div>
      </div>

      {preview && (
        <Card shadow="sm" className="border border-slate-200/70">
          <CardHeader className="flex flex-col items-start gap-1">
            <h2 className="text-base font-semibold text-slate-900">Pré-visualização</h2>
            <p className="text-sm text-slate-500">{preview.totalCount.toLocaleString("pt-PT")} entidades encontradas</p>
          </CardHeader>
          <CardBody className="gap-4">
            <Button onPress={handleImport} color="primary" radius="full" isDisabled={loading}>{loading ? "A importar..." : "Importar"}</Button>
          </CardBody>
        </Card>
      )}

      {result && (
        <Card shadow="sm" className="border border-slate-200/70">
          <CardHeader className="flex flex-col items-start gap-1"><h2 className="text-base font-semibold text-slate-900">Resultado</h2><p className="text-sm text-slate-500">{result.imported} entidades importadas</p></CardHeader>
          {result.errors.length > 0 && (
            <CardBody><div className="text-sm text-danger">{result.errors.slice(0,10).map((item, idx) => <p key={idx}>{item}</p>)}</div></CardBody>
          )}
        </Card>
      )}
    </main>
  );
}
