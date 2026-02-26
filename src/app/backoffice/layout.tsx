import { BackofficeNav } from "@/components/BackofficeNav";

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <BackofficeNav />

      <main className="w-full">{children}</main>
    </div>
  );
}
