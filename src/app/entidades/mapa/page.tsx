import { createClient } from "@/lib/supabase/server";
import { EntityMap } from "@/components/EntityMap";
import { PageTemplate } from "@/components/templates/PageTemplate";

export default async function MapaPage() {
  const supabase = await createClient();

  const { data: entities } = await supabase
    .from("entities")
    .select("id, name, latitude, longitude")
    .not("latitude", "is", null)
    .not("longitude", "is", null);

  const entitiesWithLocation = (entities || []).filter(
    (e) => e.latitude != null && e.longitude != null
  );

  return (
    <PageTemplate
      title="Mapa de instituições"
      description={`${entitiesWithLocation.length} instituições com localização`}
      className="min-h-screen bg-muted/30"
      withDivider
      bodyContained={false}
      bodyClassName="h-[calc(100vh-13rem)] min-h-[360px] sm:h-[calc(100vh-14rem)]"
    >
      <div>
        <EntityMap entities={entitiesWithLocation} />
      </div>
    </PageTemplate>
  );
}
