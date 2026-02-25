import Link from "next/link";

export default function BackofficeDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Backoffice</h1>
      <p className="mt-1 text-stone-600">
        Gestão das entidades elegíveis para consignação IRS
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/backoffice/upload"
          className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow"
        >
          <h2 className="font-medium text-stone-900">Upload CSV</h2>
          <p className="mt-1 text-sm text-stone-600">
            Importar lista de entidades do Portal das Finanças
          </p>
        </Link>
        <Link
          href="/backoffice/entidades"
          className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow"
        >
          <h2 className="font-medium text-stone-900">Entidades</h2>
          <p className="mt-1 text-sm text-stone-600">
            Gerir e enriquecer dados das entidades
          </p>
        </Link>
      </div>
    </div>
  );
}
