/**
 * Palavras que devem ficar em minúsculas no meio de frases em português
 */
const SMALL_WORDS = new Set([
  "de", "da", "do", "das", "dos",
  "e", "ou", "com", "em", "no", "na", "nos", "nas",
  "a", "o", "as", "os", "um", "uma", "uns", "umas",
  "por", "para", "pelo", "pela", "pelos", "pelas",
  "que", "se", "ao", "à", "aos", "às",
]);

/**
 * Converte texto em MAIÚSCULAS para formato legível (title case).
 * Exceções: preposições e conjunções em minúscula no meio da frase.
 */
export function toTitleCase(text: string): string {
  if (!text || typeof text !== "string") return text;

  const trimmed = text.trim();
  if (!trimmed) return text;

  const words = trimmed.split(/\s+/);

  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      // Primeira palavra ou palavras que não são "small words" → capitalizar
      if (index === 0 || !SMALL_WORDS.has(lower)) {
        return capitalizeFirst(lower);
      }
      return lower;
    })
    .join(" ");
}

function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
