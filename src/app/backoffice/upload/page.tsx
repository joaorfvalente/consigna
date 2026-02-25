"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { parseCSV, parseCSVPreview } from "@/lib/csv-parser";

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

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const y = parseInt(e.target.value, 10);
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
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Upload CSV</h1>
      <p className="mt-1 text-stone-600">
        Importar lista de entidades elegíveis do Portal das Finanças
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Ano fiscal
          </label>
          <select
            value={year}
            onChange={handleYearChange}
            className="mt-1 rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
          >
            {[2025, 2024, 2023].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Ficheiro CSV
          </label>
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-stone-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-emerald-700 hover:file:bg-emerald-100"
          />
          <p className="mt-1 text-xs text-stone-500">
            Colunas esperadas: NIPC, Nome, Localidade
          </p>
        </div>

        {preview && (
          <div className="rounded-lg border border-stone-200 bg-white p-4">
            <h3 className="font-medium text-stone-900">Pré-visualização</h3>
            {preview.errors.length > 0 && (
              <div className="mt-2 text-sm text-amber-600">
                {preview.errors.map((e, i) => (
                  <p key={i}>{e}</p>
                ))}
              </div>
            )}
            <p className="mt-2 text-sm text-stone-600">
              {preview.totalCount.toLocaleString("pt-PT")} entidades encontradas
              {preview.totalCount > preview.entities.length && (
                <span className="text-stone-500"> (a mostrar {preview.entities.length})</span>
              )}
            </p>
            <div className="mt-4 max-h-60 overflow-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200">
                    {preview.headers.slice(0, 5).map((h, i) => (
                      <th key={i} className="px-2 py-1 text-left font-medium text-stone-700">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(preview.entities as { nif: string; name: string; county?: string }[]).slice(0, 10).map((e, i) => (
                    <tr key={i} className="border-b border-stone-100">
                      <td className="px-2 py-1">{e.nif}</td>
                      <td className="px-2 py-1">{e.name}</td>
                      <td className="px-2 py-1">{e.county ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleImport}
              disabled={loading}
              className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "A importar…" : "Importar"}
            </button>
          </div>
        )}

        {result && (
          <div className="rounded-lg border border-stone-200 bg-white p-4">
            <h3 className="font-medium text-stone-900">Resultado</h3>
            <p className="mt-2 text-sm text-stone-600">
              {result.imported} entidades importadas
            </p>
            {result.errors.length > 0 && (
              <div className="mt-2 max-h-32 overflow-auto text-sm text-amber-600">
                {result.errors.slice(0, 5).map((e, i) => (
                  <p key={i}>{e}</p>
                ))}
                {result.errors.length > 5 && (
                  <p>… e mais {result.errors.length - 5} erros</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
