import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Weapon Not Found</h1>
        <p className="text-gray-400">The weapon you're looking for doesn't exist in our database.</p>
        <Button asChild>
          <Link href="/">
            Return to Homepage
          </Link>
        </Button>
      </div>
    </main>
  )
};