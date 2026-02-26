const DEFAULT_FISCAL_YEAR_RANGE = 3

export function getFiscalYearOptions(
  referenceYear = new Date().getFullYear(),
  totalYears = DEFAULT_FISCAL_YEAR_RANGE
) {
  return Array.from({ length: totalYears }, (_, index) => referenceYear - index)
}

export const FISCAL_YEAR_OPTIONS = getFiscalYearOptions()
