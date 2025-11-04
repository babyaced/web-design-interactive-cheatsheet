"use client"
import React, { useEffect, useState } from "react"
import SyncedSandpack from "./SyncedSandpack"

const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '')

async function getText(filePath: string) {
  const url = `${base}${filePath}` // filePath like "/demos/button/index.html"
  const res = await fetch(url, { cache: "no-cache" })
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`)
  return res.text()
}

export default function HtmlCssJsPlayground({ folderPath, includeJavascript = false, activeFile = '/styles.css' }: { folderPath: string, includeJavascript: boolean, activeFile: string }) {
  const [files, setFiles] = useState<Record<string, { code: string }> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const [html, css, js, baseCss] = await Promise.all([
          getText(`/demos/${folderPath}/index.html`),
          getText(`/demos/${folderPath}/styles.css`),
          includeJavascript ? getText(`/demos/${folderPath}/script.js`) : Promise.resolve(""),
          getText(`/demos/${folderPath}/base.css`),
        ])
        setFiles({
          "/index.html": { code: html },
          "/styles.css": { code: css },
          "/script.js": { code: js },
          "/base.css": { code: baseCss },
        })
      } catch (e: any) {
        setError(e.message || String(e))
      }
    })()
  }, [])



  if (error) return <pre style={{ color: "crimson" }}>{error}</pre>
  if (!files) return <div>Loading…</div>

  const visibleFiles = includeJavascript ? ["/index.html", "/styles.css", "/script.js"] : ["/index.html", "/styles.css"]

  return (
    <div style={{ margin: "2em 0" }}>
    <SyncedSandpack
      template={"static"}
      files={files} // ⬅️ disables Sandpack’s default JS file
      options={{ showTabs: true, editorHeight: 380, resizablePanels: true, visibleFiles: visibleFiles, activeFile: activeFile }}
    />
    </div>
  )
}