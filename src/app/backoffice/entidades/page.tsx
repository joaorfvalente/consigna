"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Entity } from "@/types/entity";
import Link from "next/link";

export default function BackofficeEntidadesPage() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchEntities() {
      const supabase = createClient();
      let query = supabase
        .from("entities")
        .select("*")
        .eq("year", year)
        .order("name");

      if (search.trim()) {
        query = query.ilike("name", `%${search.trim()}%`);
      }

      const { data, error } = await query.limit(100);

      if (error) {
        console.error(error);
        setEntities([]);
      } else {
        setEntities(data || []);
      }
      setLoading(false);
    }

    fetchEntities();
  }, [year, search]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Entidades</h1>
      <p className="mt-1 text-stone-600">
        Gerir e enriquecer dados das entidades elegíveis
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 sm:w-64"
        />
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value, 10))}
          className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
        >
          {[2025, 2024, 2023].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="mt-8 text-stone-500">A carregar…</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-stone-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-stone-700">
                  NIPC
                </th>
                <th className="px-4 py-3 text-left font-medium text-stone-700">
                  Nome
                </th>
                <th className="px-4 py-3 text-left font-medium text-stone-700">
                  Localidade
                </th>
                <th className="px-4 py-3 text-left font-medium text-stone-700">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left font-medium text-stone-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {entities.map((e) => (
                <tr key={e.id} className="border-t border-stone-100">
                  <td className="px-4 py-3 font-mono text-stone-600">{e.nif}</td>
                  <td className="px-4 py-3 text-stone-900">{e.name}</td>
                  <td className="px-4 py-3 text-stone-600">{e.county ?? "-"}</td>
                  <td className="px-4 py-3 text-stone-600">{e.type ?? "-"}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/backoffice/entidades/${e.id}`}
                      className="text-emerald-600 hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {entities.length === 0 && (
            <p className="px-4 py-8 text-center text-stone-500">
              Nenhuma entidade encontrada. Faça upload de um CSV primeiro.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
