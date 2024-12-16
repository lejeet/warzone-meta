import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#0F0F10] text-gray-400 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Warzone Meta. All rights reserved.
          </p>
          <p className="text-sm text-center md:text-right">
            Activision has not endorsed and is not responsible for this site or its content.
          </p>
        </div>
      </div>
    </footer>
  )
};