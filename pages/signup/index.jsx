import Link from "next/link"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-semibold">
          Shorty
        </Link>
      </header>
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
          <SignupForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </main>
      <footer className="text-center p-6 text-sm text-gray-500">© 2025 Shorty. All rights reserved.</footer>
    </div>
  )
}
