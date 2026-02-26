"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface EntityFiltersProps {
  search?: string;
  county?: string;
  type?: string;
  year?: string;
  counties: string[];
  types: string[];
  variant?: "default" | "hero";
}

export function EntityFilters({
  search,
  county,
  type,
  year,
  counties,
  types,
  variant = "default",
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

  function clearFilters() {
    router.push("/entidades");
  }

  const yearValue = year ? parseInt(year, 10) : new Date().getFullYear();
  const hasActiveFilters = search || county || type;
  const yearOptions = [yearValue, yearValue - 1, yearValue - 2];
  const isHero = variant === "hero";

  return (
    <div
      className={
        isHero ? "mt-6 w-full" : "w-full border-b border-border/70 bg-card px-4 py-3"
      }
    >
      <div className="mx-auto max-w-4xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.querySelector<HTMLInputElement>('input[name="q"]');
            updateParams({ q: input?.value || undefined });
          }}
          className="flex items-center gap-2 overflow-x-auto pb-1"
        >
          <div className="relative min-w-[320px] flex-1">
            <Search className="absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              name="q"
              type="text"
              placeholder="Pesquisar instituição..."
              defaultValue={search}
              className={
                isHero
                  ? "h-10 rounded-full border-border/60 bg-background/85 pl-10 pr-28 shadow-none backdrop-blur"
                  : "h-10 rounded-full border-border/70 bg-background pl-10 pr-28 shadow-none"
              }
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1.5 top-1/2 h-7 -translate-y-1/2"
            >
              Pesquisar
            </Button>
          </div>

          <Select
            value={county ?? "__all__"}
            onValueChange={(v) =>
              updateParams({ county: v === "__all__" ? undefined : v })
            }
          >
            <SelectTrigger className="h-9 w-[170px] rounded-full border-border/60 bg-background/80 text-sm shadow-none">
              <SelectValue placeholder="Localidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Todas as localidades</SelectItem>
              {counties.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={type ?? "__all__"}
            onValueChange={(v) =>
              updateParams({ type: v === "__all__" ? undefined : v })
            }
          >
            <SelectTrigger className="h-9 w-[150px] rounded-full border-border/60 bg-background/80 text-sm shadow-none">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Todos os tipos</SelectItem>
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={year ?? String(yearValue)}
            onValueChange={(v) => updateParams({ year: v })}
          >
            <SelectTrigger className="h-9 w-[110px] rounded-full border-border/60 bg-background/80 text-sm shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
              Limpar
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
