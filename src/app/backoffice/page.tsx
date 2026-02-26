import { createClient } from "@/lib/supabase/server";
import { getFiscalYearOptions } from "@/lib/constants";
import { BackofficeDashboardClient } from "@/components/pages/BackofficeDashboardClient";

export default async function BackofficeDashboard() {
  const currentYear = getFiscalYearOptions(1)[0];
  const supabase = await createClient();

  const [{ count: currentYearCount }, { count: totalCount }, { count: describedCount }, { count: locatedCount }] = await Promise.all([
    supabase.from("entities").select("*", { count: "exact", head: true }).eq("year", currentYear),
    supabase.from("entities").select("*", { count: "exact", head: true }),
    supabase.from("entities").select("*", { count: "exact", head: true }).eq("year", currentYear).not("description", "is", null),
    supabase.from("entities").select("*", { count: "exact", head: true }).eq("year", currentYear).not("latitude", "is", null).not("longitude", "is", null),
  ]);

  const currentYearTotal = currentYearCount ?? 0;
  const describedTotal = describedCount ?? 0;
  const locatedTotal = locatedCount ?? 0;
  const completionRate = currentYearTotal > 0 ? Math.round(((describedTotal + locatedTotal) / (currentYearTotal * 2)) * 100) : 0;

  return <BackofficeDashboardClient currentYear={currentYear} currentYearTotal={currentYearTotal} totalCount={totalCount ?? 0} describedTotal={describedTotal} locatedTotal={locatedTotal} completionRate={completionRate} />;
}
