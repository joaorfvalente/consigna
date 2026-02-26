"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";

const links = [
  { href: "/", label: "Início" },
  { href: "/entidades", label: "Instituições" },
  { href: "/entidades/mapa", label: "Mapa" },
];

export function MainNav() {
  const pathname = usePathname();
  if (pathname?.startsWith("/backoffice")) return null;

  return (
    <Navbar maxWidth="2xl" isBordered height="4.5rem" className="bg-white/90 backdrop-blur-md">
      <NavbarBrand>
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          Consignação IRS
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-1 sm:gap-2">
        {links.map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
          return (
            <NavbarItem key={link.href}>
              <Button
                as={Link}
                href={link.href}
                size="sm"
                radius="full"
                color={isActive ? "primary" : "default"}
                variant={isActive ? "solid" : "light"}
                className={isActive ? "px-4 shadow-sm" : "px-4"}
              >
                {link.label}
              </Button>
            </NavbarItem>
          );
        })}
      </NavbarContent>
    </Navbar>
  );
}
