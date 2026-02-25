import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <h1 className="text-2xl font-semibold text-stone-900">
            Consignação IRS
          </h1>
          <p className="mt-1 text-stone-600">
            Encontre e escolha uma instituição para consignar 1% do seu IRS
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-medium text-stone-900">
            Como funciona a consignação?
          </h2>
          <p className="mt-3 text-stone-600">
            A consignação permite doar 1% do IRS liquidado a uma instituição de
            solidariedade social, cultural ou ambiental em vez de entregar ao
            Estado. É totalmente gratuito e não afeta o valor do seu reembolso.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/entidades"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
            >
              Procurar instituições
            </Link>
            <Link
              href="/entidades/mapa"
              className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-6 py-3 font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Ver no mapa
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-stone-500">
          <Link href="/backoffice" className="underline hover:text-stone-700">
            Acesso backoffice
          </Link>
        </p>
      </div>
    </main>
  );
}
