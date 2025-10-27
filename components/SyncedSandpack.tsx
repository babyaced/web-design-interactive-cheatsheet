// components/SyncedSandpack.tsx
"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react"
import { sandpackDark } from "@codesandbox/sandpack-themes"

type Props = Omit<SandpackProps, "theme">

export default function SyncedSandpack(props: Props) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch: next-themes resolves on the client
  useEffect(() => setMounted(true), [])

  const current = theme === "system" ? resolvedTheme : theme
  const isDark = current === "dark"

  console.log("props:", props)

  // Until mounted, render a deterministic theme (light) or a skeleton
  if (!mounted) return <Sandpack {...props} theme="light" />

  return <Sandpack {...props} theme={isDark ? sandpackDark : "light"} />
}
