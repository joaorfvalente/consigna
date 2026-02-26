import * as React from "react"

import { cn } from "@/lib/utils"

function DataTable({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="data-table-wrapper"
      className="relative w-full overflow-x-auto rounded-xl border bg-card"
    >
      <table
        data-slot="data-table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function DataTableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="data-table-header"
      className={cn("bg-muted/50 [&_tr]:border-b", className)}
      {...props}
    />
  )
}

function DataTableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="data-table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function DataTableFooter({
  className,
  ...props
}: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="data-table-footer"
      className={cn("bg-muted/50 border-t font-medium", className)}
      {...props}
    />
  )
}

function DataTableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="data-table-row"
      className={cn("border-b transition-colors hover:bg-muted/40", className)}
      {...props}
    />
  )
}

function DataTableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="data-table-head"
      className={cn(
        "text-muted-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}

function DataTableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="data-table-cell"
      className={cn("p-4 align-middle", className)}
      {...props}
    />
  )
}

function DataTableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="data-table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

function DataTableEmptyState({
  colSpan,
  children,
  className,
}: {
  colSpan: number
  children: React.ReactNode
  className?: string
}) {
  return (
    <tr data-slot="data-table-empty-row">
      <td
        colSpan={colSpan}
        className={cn(
          "text-muted-foreground px-4 py-10 text-center text-sm",
          className
        )}
      >
        {children}
      </td>
    </tr>
  )
}

export {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableFooter,
  DataTableHead,
  DataTableRow,
  DataTableCell,
  DataTableCaption,
  DataTableEmptyState,
}
