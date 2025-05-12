import Link from "next/link"
import { LoginForm } from "@/components/login-form"

// export const metadata = {
//   title: "Login - Shorty",
//   description: "Login to your Shorty account",
// }

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-semibold">
          Shorty
        </Link>
      </header>
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Bienvenido Nuevamente</h1>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </main>
      <footer className="text-center p-6 text-sm text-gray-500">© 2025 Shorty. All rights reserved.</footer>
    </div>
  )
}
