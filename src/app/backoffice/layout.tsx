import { BackofficeNav } from "@/components/BackofficeNav";

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <BackofficeNav />
      <main>{children}</main>
    </div>
  );
}
