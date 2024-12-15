import { motion, AnimatePresence } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Attachment {
  slot: string;
  name: string;
}

interface Weapon {
  id: string;
  name: string;
  type: string;
  displayType: string;
  typeRankFormatted: string;
  typeRank: number;
  bestAttachments: Attachment[];
  isNew: boolean;
  updateWZ2: string;
  loadout?: {
    tactical: string;
    lethal: string;
    perks: string[];
    melee: string;
    wildcard: string;
  };
  game: string;
}

interface WeaponCardsProps {
  weapons: Weapon[];
}
export function WeaponCards({ weapons }: WeaponCardsProps) {
  console.log(weapons, 'weapons');

  const getRankBadgeColor = (rank: string) => {
    if (rank.includes('#1')) return 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-yellow-900 shadow-md relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shine';
    if (rank.includes('#2')) return 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 text-gray-800 shadow-md relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shine';
    if (rank.includes('#3')) return 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-amber-100 shadow-md relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shine';
    return 'bg-[#1A1A1A] text-white';
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-4"
      >
        {weapons.map((weapon, index) => (
          <motion.div
            key={weapon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden"
          >
            <Accordion type="single" collapsible>
              <AccordionItem value={weapon.id} className="border-0">
                <Card className="bg-[#0F0F10] border border-[#1d2433] hover:border-[#3B82F6]/20 transition-all duration-300">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                    <div className="flex items-start gap-6 w-full">
                      <div className="w-16 h-16 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold mb-3 text-white transition-colors duration-300">{weapon.name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge 
                            variant="secondary" 
                            className="bg-[#1A1A1A] text-white hover:bg-[#252525] border border-[#1d2433]"
                          >
                            {weapon.game.toUpperCase()}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className="bg-[#1A1A1A] text-white hover:bg-[#252525] border border-[#1d2433]"
                          >
                            {weapon.displayType.replace('_', ' ')}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={`${getRankBadgeColor(weapon.typeRankFormatted)} hover:opacity-90 transition-opacity duration-300`}
                          >
                            {weapon.typeRankFormatted.toUpperCase()}
                          </Badge>
                          {weapon.isNew && (
                            <Badge variant="secondary" className="bg-green-700 text-white hover:bg-green-600 transition-colors duration-300">
                              NEW
                            </Badge>
                          )}
                          {weapon.updateWZ2 && (
                            <Badge 
                              variant="secondary" 
                              className={`${weapon.updateWZ2 === 'buff' ? 'bg-blue-700 hover:bg-blue-600' : 'bg-red-700 hover:bg-red-600'} text-white transition-colors duration-300`}
                            >
                              {weapon.updateWZ2.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-6 border-t border-[#1d2433] grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#1d2433]">
                        <h4 className="text-lg font-bold mb-4 uppercase border-b border-[#1d2433] pb-2">Best Attachments</h4>
                        <ul className="space-y-2 text-gray-300">
                          {weapon.bestAttachments.map((attachment, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-center py-1 hover:bg-[#252525] rounded transition-colors duration-300 px-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <span className="w-1/3 text-gray-400 text-sm">{attachment.slot.toUpperCase()}:</span>
                              <span className="w-2/3 font-medium">{attachment.name}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      {weapon.loadout && (
                        <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#1d2433]">
                          <h4 className="text-lg font-bold mb-4 uppercase border-b border-[#1d2433] pb-2">Loadout</h4>
                          <ul className="space-y-2 text-gray-300">
                            {Object.entries(weapon.loadout).map(([key, value], index) => (
                              <motion.li 
                                key={key} 
                                className="flex items-center py-1 hover:bg-[#252525] rounded transition-colors duration-300 px-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <span className="w-1/3 text-gray-400 text-sm">{key.toUpperCase()}:</span>
                                <span className="w-2/3 font-medium">{Array.isArray(value) ? value.join(', ') : value}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            </Accordion>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

