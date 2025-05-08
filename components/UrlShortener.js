"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ArrowRight, Copy, CheckCircle } from "lucide-react"

export function UrlShortener() {
    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        // TODO: Implement actual URL shortening logic
        // try {
        //   const res = await fetch("/api/links", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ originalUrl: url }),
        //   })
        //   const data = await res.json()
        //   setShortUrl(data.shortUrl)
        // } catch (error) {
        //   console.error(error)
        //   toast.error("Something went wrong.")
        // }

        await new Promise((resolve) => setTimeout(resolve, 1000)) // simulación
        setShortUrl(`https://shorty.io/${Math.random().toString(36).substr(2, 6)}`)
        setIsLoading(false)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
        toast.success("Short URL copied to clipboard!")
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                    type="url"
                    placeholder="Enter your long URL here"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-grow"
                    required
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Shortening..." : "Shorten"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </form>

            {shortUrl && (
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <Input value={shortUrl} readOnly className="flex-grow bg-transparent border-none" />
                    <Button variant="ghost" size="icon" onClick={handleCopy} className="flex-shrink-0">
                        {isCopied ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            )}
        </div>
    )
}
