"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LAYOUT_CONTAINER_WIDTH } from "@/components/templates/layout-widths";

const publicLinks = [
  { href: "/", label: "Início" },
  { href: "/entidades", label: "Instituições" },
  { href: "/entidades/mapa", label: "Mapa" },
];

interface MainNavProps {
  forceVisible?: boolean;
  preview?: boolean;
  className?: string;
}

export function MainNav({
  forceVisible = false,
  preview = false,
  className,
}: MainNavProps = {}) {
  const pathname = usePathname();

  if (!forceVisible && pathname?.startsWith("/backoffice")) {
    return null;
  }

  return (
    <nav
      className={cn(
        preview
          ? "rounded-xl border border-border/20 bg-background/90 backdrop-blur"
          : "sticky top-0 z-50 border-b border-border/20 bg-background/90 backdrop-blur",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between px-4 py-3",
          LAYOUT_CONTAINER_WIDTH.nav
        )}
      >
        <Link
          href="/"
          className="text-sm font-semibold text-foreground/90 transition-colors hover:text-foreground"
        >
          Consignação IRS
        </Link>
        <ul className="flex items-center gap-2">
          {publicLinks.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : href === "/entidades/mapa"
                  ? pathname === "/entidades/mapa"
                  : pathname?.startsWith(href) && pathname !== "/entidades/mapa";
            return (
              <li key={href}>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={isActive ? "px-2 text-foreground" : "px-2 text-muted-foreground hover:text-foreground"}
                >
                  <Link href={href}>{label}</Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
