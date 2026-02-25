import { toTitleCase } from "./text-utils";
import type { EntityInsert } from "@/types/entity";

/** Mapeamento de nomes de colunas possíveis para campos da entidade (CSV)
 * O ficheiro CSV tem apenas: NIPC, Nome, Localidade
 */
const COLUMN_ALIASES: Record<string, string[]> = {
  nif: ["nipc", "nif", "NIPC", "NIF", "número de identificação fiscal"],
  name: ["name", "nome", "designação", "designacao"],
  county: ["county", "concelho", "localidade"],
};

function normalizeHeader(header: string): string {
  return header.trim().toLowerCase().replace(/\s+/g, " ");
}

function findColumnMapping(headers: string[]): Partial<Record<keyof EntityInsert, number>> {
  const mapping: Partial<Record<keyof EntityInsert, number>> = {};
  const normalizedHeaders = headers.map(normalizeHeader);

  for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
    const idx = normalizedHeaders.findIndex((h) =>
      aliases.some((a) => h.includes(a.toLowerCase()))
    );
    if (idx >= 0) {
      mapping[field as keyof EntityInsert] = idx;
    }
  }

  return mapping;
}

function parseRow(
  row: string[],
  mapping: Partial<Record<keyof EntityInsert, number>>,
  year: number
): EntityInsert | null {
  const nifIdx = mapping.nif;
  const nameIdx = mapping.name;
  if (nifIdx === undefined || nameIdx === undefined) return null;

  const nif = row[nifIdx]?.trim();
  const name = row[nameIdx]?.trim();
  if (!nif || !name) return null;

  return {
    nif,
    name: toTitleCase(name),
    county: mapping.county != null && mapping.county >= 0 ? toTitleCase(row[mapping.county]?.trim() || "") || null : null,
    year,
  };
}

/**
 * Parse CSV content. Aceita separadores , ou ;
 */
export function parseCSV(
  content: string,
  year: number,
  options?: { delimiter?: "," | ";" }
): { entities: EntityInsert[]; errors: string[] } {
  const delimiter = options?.delimiter ?? detectDelimiter(content);
  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  const errors: string[] = [];

  if (lines.length < 2) {
    return { entities: [], errors: ["Ficheiro vazio ou sem cabeçalho"] };
  }

  const headerLine = lines[0];
  const headers = parseCSVLine(headerLine, delimiter);
  const mapping = findColumnMapping(headers);

  if (mapping.nif === undefined || mapping.name === undefined) {
    errors.push("Colunas obrigatórias não encontradas: NIPC e Nome");
    return { entities: [], errors };
  }

  const entities: EntityInsert[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i], delimiter);
    const entity = parseRow(row, mapping, year);
    if (entity) {
      entities.push(entity);
    }
  }

  return { entities, errors };
}

function parseCSVLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if ((char === delimiter || char === ",") && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function detectDelimiter(content: string): "," | ";" {
  const firstLine = content.split(/\r?\n/)[0] || "";
  const semicolonCount = (firstLine.match(/;/g) || []).length;
  const commaCount = (firstLine.match(/,/g) || []).length;
  return semicolonCount > commaCount ? ";" : ",";
}

/**
 * Preview das primeiras N linhas parseadas.
 * Faz parse do ficheiro completo para obter o total de entidades (importante para CSVs com 5000+ linhas).
 */
export function parseCSVPreview(
  content: string,
  year: number,
  limit = 20
): { entities: EntityInsert[]; headers: string[]; errors: string[]; totalCount: number } {
  const { entities: allEntities, errors } = parseCSV(content, year);
  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  const headers = lines[0] ? parseCSVLine(lines[0], detectDelimiter(content)) : [];

  return {
    entities: allEntities.slice(0, limit),
    headers,
    errors,
    totalCount: allEntities.length,
  };
}
