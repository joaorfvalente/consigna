import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const backgroundSurfaceVariants = cva(
  "relative overflow-hidden rounded-xl border border-border/60",
  {
    variants: {
      variant: {
        solid: "bg-card",
        gradient:
          "bg-gradient-to-br from-primary/15 via-background to-accent/35",
        grain: "noise-film bg-gradient-to-br from-background via-background to-muted/70",
        header:
          "bg-gradient-to-b from-primary/10 via-primary/5 to-transparent before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--primary)/15%,transparent)]",
      },
      tone: {
        neutral: "",
        primary: "from-primary/20 to-primary/5",
        accent: "from-accent to-primary/15",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "solid",
      tone: "neutral",
      padding: "md",
    },
  }
)

function BackgroundSurface({
  className,
  variant,
  tone,
  padding,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof backgroundSurfaceVariants>) {
  return (
    <div
      data-slot="background-surface"
      data-variant={variant}
      className={cn(backgroundSurfaceVariants({ variant, tone, padding }), className)}
      {...props}
    />
  )
}

export { BackgroundSurface, backgroundSurfaceVariants }
