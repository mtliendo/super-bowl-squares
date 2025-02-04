import { Toaster } from "@/components/ui/toaster"
import type React from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

