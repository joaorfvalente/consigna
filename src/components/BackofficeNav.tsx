"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LAYOUT_CONTAINER_WIDTH } from "@/components/templates/layout-widths";

interface BackofficeNavProps {
  preview?: boolean;
  className?: string;
}

export function BackofficeNav({ preview = false, className }: BackofficeNavProps) {
  const pathname = usePathname();
  const links = [
    { href: "/backoffice", label: "Dashboard" },
    { href: "/backoffice/upload", label: "Upload CSV" },
    { href: "/backoffice/entidades", label: "Entidades" },
    { href: "/backoffice/componentes", label: "Componentes" },
  ];

  return (
    <nav
      className={cn(
        preview
          ? "rounded-xl border border-border/20 bg-background/90 backdrop-blur"
          : "border-b border-border/20 bg-background/90 backdrop-blur",
        className
      )}
    >
      <div className={cn("mx-auto px-4", LAYOUT_CONTAINER_WIDTH.nav)}>
        <div className="flex min-h-14 flex-col gap-3 py-3 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:py-0">
          <div className="flex flex-wrap items-center gap-2">
            {links.map((link) => {
              const isActive =
                link.href === "/backoffice"
                  ? pathname === link.href
                  : pathname?.startsWith(link.href);
              return (
                <Button
                  key={link.href}
                  asChild
                  variant="ghost"
                  size="sm"
                  className={isActive ? "px-2 text-foreground" : "px-2 text-muted-foreground hover:text-foreground"}
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="px-2 text-muted-foreground hover:text-foreground">
              <Link href="/">Ver site</Link>
            </Button>
            <form action="/backoffice/logout" method="post">
              <Button type="submit" variant="ghost" size="sm">
                Sair
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
