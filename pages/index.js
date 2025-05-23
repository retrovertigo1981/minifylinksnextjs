// pages/index.js
import Head from 'next/head'
import { UrlShortener } from "@/components/UrlShortener"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <Head>
        <title>Shorty - Elegant Link Shortener</title>
        <meta name="description" content="Shorten and manage your links with style" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between p-6">
          <Link href="/" className="text-2xl font-semibold">
            Shorty
          </Link>
          <nav>
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="default" asChild className="ml-2">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </header>
        <main className="flex-grow flex items-center justify-center px-6">
          <div className="max-w-3xl w-full">
            <h1 className="text-4xl font-bold text-center mb-8">
              Acorta tus Links con Elegancia
            </h1>
            <UrlShortener />
          </div>
        </main>
        <footer className="text-center p-6 text-sm text-gray-500">
          © 2025 Shorty. Todos los derechos reservados.
        </footer>
      </div>
    </>
  )
}
