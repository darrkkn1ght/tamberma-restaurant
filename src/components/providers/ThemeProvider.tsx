"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Since we are using a custom type for props that matches ComponentProps of NextThemesProvider
// we can simplify by just spreading props.
// However, next-themes types might need adjustment regarding React 19 children.

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
