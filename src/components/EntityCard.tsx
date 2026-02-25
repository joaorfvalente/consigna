import Link from "next/link";
import type { Entity } from "@/types/entity";
import { CopyNifButton } from "./CopyNifButton";

interface EntityCardProps {
  entity: Entity;
}

export function EntityCard({ entity }: EntityCardProps) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow">
      <Link href={`/entidades/${entity.id}`} className="block">
        <h3 className="font-medium text-stone-900 hover:text-emerald-600">
          {entity.name}
        </h3>
      </Link>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-stone-600">{entity.nif}</span>
          <CopyNifButton nif={entity.nif} />
        </div>
      </div>
      <div className="mt-1 flex flex-wrap gap-2 text-sm text-stone-500">
        {entity.county && <span>{entity.county}</span>}
        {entity.type && (
          <span className="rounded bg-stone-100 px-1.5 py-0.5">{entity.type}</span>
        )}
      </div>
    </div>
  );
}
