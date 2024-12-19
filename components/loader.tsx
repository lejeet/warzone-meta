import { Loader2 } from 'lucide-react'

export function Loader() {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  )
}