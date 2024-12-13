"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div  onClick={toggleTheme}>
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-blue-600 rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-6 w-6 text-blue-600 rotate-0 scale-100 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </div>
  )
}