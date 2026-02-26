"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Entity } from "@/types/entity";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableEmptyState,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { FISCAL_YEAR_OPTIONS } from "@/lib/constants";

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
    <PageTemplate
      title="Entidades"
      description="Gerir e enriquecer dados das entidades elegíveis"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          type="text"
          placeholder="Pesquisar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:w-72"
        />
        <Select
          value={String(year)}
          onValueChange={(value) => setYear(parseInt(value, 10))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Ano" />
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

      {loading ? (
        <p className="text-muted-foreground">A carregar…</p>
      ) : (
        <DataTable>
          <DataTableHeader>
            <DataTableRow>
              <DataTableHead>NIPC</DataTableHead>
              <DataTableHead>Nome</DataTableHead>
              <DataTableHead>Localidade</DataTableHead>
              <DataTableHead>Tipo</DataTableHead>
              <DataTableHead>Ações</DataTableHead>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>
            {entities.map((e) => (
              <DataTableRow key={e.id}>
                <DataTableCell className="font-mono text-muted-foreground">
                  {e.nif}
                </DataTableCell>
                <DataTableCell>{e.name}</DataTableCell>
                <DataTableCell className="text-muted-foreground">
                  {e.county ?? "-"}
                </DataTableCell>
                <DataTableCell className="text-muted-foreground">
                  {e.type ?? "-"}
                </DataTableCell>
                <DataTableCell>
                  <Button asChild variant="link" size="sm" className="h-auto px-0">
                    <Link href={`/backoffice/entidades/${e.id}`}>Editar</Link>
                  </Button>
                </DataTableCell>
              </DataTableRow>
            ))}
            {entities.length === 0 && (
              <DataTableEmptyState colSpan={5}>
                Nenhuma entidade encontrada. Faça upload de um CSV primeiro.
              </DataTableEmptyState>
            )}
          </DataTableBody>
        </DataTable>
      )}
    </PageTemplate>
  );
}
