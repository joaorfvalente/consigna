"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { Search, X } from "lucide-react";

export function EntityFilters({ search, county, type, year, counties, types }: { search?: string; county?: string; type?: string; year?: string; counties: string[]; types: string[]; }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`/entidades?${params.toString()}`);
  }

  const yearBase = year ? parseInt(year, 10) : new Date().getFullYear();
  const years = [yearBase, yearBase - 1, yearBase - 2];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.querySelector<HTMLInputElement>('input[name="q"]');
        updateParams({ q: input?.value || undefined });
      }}
      className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-[250px] flex-1">
          <Input name="q" defaultValue={search} placeholder="Pesquisar instituicao" radius="full" startContent={<Search className="size-4 text-slate-400" />} />
        </div>

        <select value={county ?? "all"} onChange={(e) => updateParams({ county: e.target.value === "all" ? undefined : e.target.value })} className="h-11 min-w-[180px] rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm">
          <option value="all">Todas as localidades</option>
          {counties.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>

        <select value={type ?? "all"} onChange={(e) => updateParams({ type: e.target.value === "all" ? undefined : e.target.value })} className="h-11 min-w-[180px] rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm">
          <option value="all">Todos os tipos</option>
          {types.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>

        <select value={year ?? String(yearBase)} onChange={(e) => updateParams({ year: e.target.value })} className="h-11 min-w-[110px] rounded-xl border border-slate-200 bg-white px-3 text-sm shadow-sm">
          {years.map((item) => <option key={item} value={String(item)}>{item}</option>)}
        </select>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="submit" color="primary" radius="full">
          Pesquisar
        </Button>

        {(search || county || type) && (
          <Button type="button" variant="light" color="danger" radius="full" onPress={() => router.push("/entidades")}>
            <X className="size-4" /> Limpar
          </Button>
        )}
      </div>
    </form>
  );
}
