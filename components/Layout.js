"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export function Layout({ children }) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            {children}
        </div>
    )
}
