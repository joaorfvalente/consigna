import * as React from "react"

import { cn } from "@/lib/utils"
import { BackgroundSurface } from "@/components/ui/background-surface"

interface PageHeaderProps {
  title: React.ReactNode
  description?: React.ReactNode
  topContent?: React.ReactNode
  children?: React.ReactNode
  surfaceVariant?: React.ComponentProps<typeof BackgroundSurface>["variant"]
  surfaceTone?: React.ComponentProps<typeof BackgroundSurface>["tone"]
  className?: string
  surfaceClassName?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

function PageHeader({
  title,
  description,
  topContent,
  children,
  surfaceVariant = "header",
  surfaceTone,
  className,
  surfaceClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
}: PageHeaderProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <BackgroundSurface
        variant={surfaceVariant}
        tone={surfaceTone}
        padding="none"
        className={cn("rounded-none border-x-0 border-t-0", surfaceClassName)}
      >
        <div className={cn("relative px-6 py-8", contentClassName)}>
          {topContent}
          <h1 className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", titleClassName)}>
            {title}
          </h1>
          {description ? (
            <p className={cn("mt-1 text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </BackgroundSurface>
    </section>
  )
}

export { PageHeader }
