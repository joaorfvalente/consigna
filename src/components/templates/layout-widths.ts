export const LAYOUT_CONTAINER_WIDTH = {
  nav: "max-w-6xl",
  narrow: "max-w-2xl",
  default: "max-w-4xl",
  wide: "max-w-6xl",
} as const

export type LayoutContentWidth = keyof Omit<typeof LAYOUT_CONTAINER_WIDTH, "nav">
