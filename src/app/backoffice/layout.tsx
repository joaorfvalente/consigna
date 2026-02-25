import Link from "next/link";

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-100">
      <nav className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex gap-6">
              <Link
                href="/backoffice"
                className="text-sm font-medium text-stone-700 hover:text-stone-900"
              >
                Dashboard
              </Link>
              <Link
                href="/backoffice/upload"
                className="text-sm font-medium text-stone-700 hover:text-stone-900"
              >
                Upload CSV
              </Link>
              <Link
                href="/backoffice/entidades"
                className="text-sm font-medium text-stone-700 hover:text-stone-900"
              >
                Entidades
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-stone-500 hover:text-stone-700"
              >
                Ver site
              </Link>
              <form action="/backoffice/logout" method="post">
                <button
                  type="submit"
                  className="text-sm font-medium text-stone-600 hover:text-stone-900"
                >
                  Sair
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
