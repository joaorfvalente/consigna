"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card, CardBody, Input } from "@heroui/react";
import { createClient } from "@/lib/supabase/client";
import { FISCAL_YEAR_OPTIONS } from "@/lib/constants";
import type { Entity } from "@/types/entity";

export default function BackofficeEntidadesPage() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchEntities() {
      setLoading(true);
      const supabase = createClient();
      let query = supabase.from("entities").select("*").eq("year", year).order("name");
      if (search.trim()) query = query.ilike("name", `%${search.trim()}%`);
      const { data, error } = await query.limit(100);
      if (error) setEntities([]); else setEntities(data ?? []);
      setLoading(false);
    }
    fetchEntities();
  }, [search, year]);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <header><h1 className="text-3xl font-semibold text-slate-900">Entidades</h1><p className="text-slate-600">Gestao de entidades elegiveis.</p></header>
      <div className="flex flex-wrap gap-3">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar por nome" className="max-w-sm" />
        <select value={String(year)} onChange={(e) => setYear(parseInt(e.target.value, 10))} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm">
          {FISCAL_YEAR_OPTIONS.map((item) => <option key={item} value={String(item)}>{item}</option>)}
        </select>
      </div>

      <Card>
        <CardBody className="overflow-x-auto p-0">
          {loading ? <p className="p-4 text-slate-500">A carregar...</p> : (
            <table className="min-w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-left text-slate-500"><tr><th className="px-4 py-3">NIF</th><th className="px-4 py-3">Nome</th><th className="px-4 py-3">Localidade</th><th className="px-4 py-3">Acoes</th></tr></thead>
              <tbody>
                {entities.map((entity) => (
                  <tr key={entity.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-mono text-slate-500">{entity.nif}</td>
                    <td className="px-4 py-3">{entity.name}</td>
                    <td className="px-4 py-3 text-slate-500">{entity.county ?? "-"}</td>
                    <td className="px-4 py-3"><Button as={Link} href={`/backoffice/entidades/${entity.id}`} variant="light" size="sm">Editar</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </main>
  );
}
