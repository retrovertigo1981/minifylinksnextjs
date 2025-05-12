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
        try {
          const res = await fetch("/api/links", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ originalLink: url }),
          })
          const data = await res.json()
          if (!res.ok) {
            throw new Error(data.message || "Error al crear el enlace");
            
          }

          setShortUrl(data.Link)
          
        } catch (error) {
          console.error(error)          
          toast.error(error.message)
        } finally {
            setIsLoading(false)
        }

        
        
    }

    

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
        toast.success("URL copiada exitosamente")
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                    type="url"
                    placeholder="Ingrese su URL larga aquí"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-grow"
                    required
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Cortando..." : "Cortar"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </form>

            {shortUrl && (
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-500 p-3 rounded-md">
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
