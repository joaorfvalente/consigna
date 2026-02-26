import * as React from "react"

import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/ui/page-header"
import {
  LAYOUT_CONTAINER_WIDTH,
  type LayoutContentWidth,
} from "@/components/templates/layout-widths"

interface PageTemplateProps {
  title: React.ReactNode
  description?: React.ReactNode
  topContent?: React.ReactNode
  headerChildren?: React.ReactNode
  headerClassName?: string
  width?: LayoutContentWidth
  headerWidth?: LayoutContentWidth
  headerContentClassName?: string
  headerSurfaceVariant?: React.ComponentProps<typeof PageHeader>["surfaceVariant"]
  headerSurfaceTone?: React.ComponentProps<typeof PageHeader>["surfaceTone"]
  className?: string
  withDivider?: boolean
  bodyContained?: boolean
  bodyClassName?: string
  children: React.ReactNode
}

function PageTemplate({
  title,
  description,
  topContent,
  headerChildren,
  headerClassName = "relative left-1/2 w-screen -translate-x-1/2",
  width = "default",
  headerWidth = "default",
  headerContentClassName,
  headerSurfaceVariant,
  headerSurfaceTone,
  className,
  withDivider = false,
  bodyContained = true,
  bodyClassName = "py-8",
  children,
}: PageTemplateProps) {
  const resolvedHeaderContentClassName =
    headerContentClassName ??
    cn(
      "mx-auto px-4 py-6 sm:py-8",
      LAYOUT_CONTAINER_WIDTH[headerWidth]
    )

  return (
    <div className={className}>
      <PageHeader
        title={title}
        description={description}
        topContent={topContent}
        className={headerClassName}
        contentClassName={resolvedHeaderContentClassName}
        surfaceVariant={headerSurfaceVariant}
        surfaceTone={headerSurfaceTone}
      >
        {headerChildren}
      </PageHeader>

      {withDivider ? <div className="w-full border-t border-border" /> : null}

      {bodyContained ? (
        <div
          className={cn(
            "mx-auto w-full space-y-6 px-4",
            LAYOUT_CONTAINER_WIDTH[width],
            bodyClassName
          )}
        >
          {children}
        </div>
      ) : (
        <div className={bodyClassName}>{children}</div>
      )}
    </div>
  )
}

export { PageTemplate }
