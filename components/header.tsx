// import { Button } from "@/components/ui/button"
// import { Clock, ChevronDown, Users, Edit, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function Header() {
  const tabs = ['24h', '7D', '30D', 'Seasonal']
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg shadow-lg mb-8 overflow-hidden"
    >
      {/* Main Header Section */}
      <div className="gradient-banner">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">WARZONE META</h1>
            <p className="text-gray-400 text-sm">
              Decrypting the battlefield: Your source for Warzone's winning formulas
            </p>
          </div>
          {/* <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Button variant="outline" size="icon" className="btn bg-[#1A1A1A] hover:bg-[#252525] text-white border-[#1d2433] text-sm sm:text-base">
              <Clock className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="btn bg-[#1A1A1A] hover:bg-[#252525] text-white border-[#1d2433] text-sm sm:text-base">
              <Zap className="mr-2 h-4 w-4" /> Upgrade data
            </Button>
            <Button variant="outline" className="btn bg-[#1A1A1A] hover:bg-[#252525] text-white border-[#1d2433] text-sm sm:text-base">
              <Edit className="mr-2 h-4 w-4" /> Edit club
            </Button>
            <Button className="bg-white text-[#0F0F10] hover:bg-gray-100 font-semibold text-sm sm:text-base hover:bg-opacity-90">
              <Users className="mr-2 h-4 w-4" /> Invite friends
            </Button>
          </div> */}
          {/* Last Updated Section */}
          <div className="gradient-banner self-start">
            <p className="text-gray-400 text-sm">
              Last Updated: <span className="text-white font-semibold">{today}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      {/* <div className=" py-4 border-t border-[#7F1C1D]/10">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="btn bg-[#1A1A1A] hover:bg-[#252525] text-white border-[#1d2433] text-sm sm:text-base">Rank</Button>
            <Button variant="outline" className="btn bg-[#1A1A1A] hover:bg-[#252525] text-white border-[#1d2433] text-sm sm:text-base">Win Rate</Button>
            <Button variant="outline" className="btn bg-[#1A1A1A] hover:bg-[#252525] text-white border-[#1d2433] text-sm sm:text-base">KDA</Button>
          </div>
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={tab === '24h' ? 'secondary' : 'outline'}
                className={`btn min-w-[60px] text-sm sm:text-base ${tab === '24h' ? 'bg-[#3C82F6] text-white' : 'bg-[#1A1A1A] hover:bg-[#252525] text-white border-[#1d2433]'}`}
              >
                {tab}
              </Button>
            ))}
            <Button variant="outline" className="btn bg-[#1A1A1A] hover:bg-[#252525] text-white border-[#1d2433] flex items-center gap-2 text-sm sm:text-base">
              Queue <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="secondary" className="btn bg-[#3C82F6] text-white text-sm sm:text-base hover-glow">Show my place</Button>
          </div>
        </div>
      </div> */}
    </motion.div>
  )
}

