"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface EntityFiltersProps {
  search?: string;
  county?: string;
  type?: string;
  year?: string;
  counties: string[];
  types: string[];
}

export function EntityFilters({
  search,
  county,
  type,
  year,
  counties,
  types,
}: EntityFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    router.push(`/entidades?${params.toString()}`);
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.querySelector<HTMLInputElement>('input[name="q"]');
            updateParams({ q: input?.value || undefined });
          }}
          className="contents"
        >
          <div>
            <label className="block text-sm font-medium text-stone-700">
              Pesquisa
            </label>
            <input
              name="q"
              type="text"
              placeholder="Nome da instituição..."
              defaultValue={search}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
            />
          </div>
        </form>
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Localidade
          </label>
          <select
            value={county ?? ""}
            onChange={(e) => updateParams({ county: e.target.value || undefined })}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
          >
            <option value="">Todos</option>
            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Tipo
          </label>
          <select
            value={type ?? ""}
            onChange={(e) => updateParams({ type: e.target.value || undefined })}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
          >
            <option value="">Todos</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Ano
          </label>
          <select
            value={year ?? currentYear}
            onChange={(e) => updateParams({ year: e.target.value })}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
          >
            {[currentYear, currentYear - 1, currentYear - 2].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
