"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";

const links = [
  { href: "/backoffice", label: "Dashboard" },
  { href: "/backoffice/upload", label: "Upload" },
  { href: "/backoffice/entidades", label: "Entidades" },
  { href: "/backoffice/componentes", label: "Componentes" },
];

export function BackofficeNav() {
  const pathname = usePathname();
  return (
    <Navbar maxWidth="2xl" isBordered className="bg-white/85 backdrop-blur-md">
      <NavbarBrand>
        <Link href="/backoffice" className="text-base font-semibold tracking-tight text-slate-900">
          Backoffice
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center" className="hidden gap-2 lg:flex">
        {links.map((link) => {
          const isActive = link.href === "/backoffice" ? pathname === link.href : pathname?.startsWith(link.href);
          return (
            <NavbarItem key={link.href}>
              <Button
                as={Link}
                href={link.href}
                size="md"
                radius="full"
                color={isActive ? "primary" : "default"}
                variant={isActive ? "solid" : "light"}
                className={isActive ? "shadow-sm" : ""}
              >
                {link.label}
              </Button>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} href="/" variant="light" size="md" radius="full">
            Ver site
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
