'use client'

import { useState, useLayoutEffect, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crosshair } from 'lucide-react'
import { TierToggles } from './tier-toggles'

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
  game: string;
  sniperSupportRank?: {
    rankedResurgence?: number;
    alMazrah?: number;
    ashikaIsland?: number;
  };
}

interface WeaponGridProps {
  weapons: Weapon[];
  selectedCategory: string;
}

export function WeaponGrid({ weapons, selectedCategory: modeCategory }: WeaponGridProps) {
  const [hoveredWeapon, setHoveredWeapon] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('META TIER');
  const [isMounted, setIsMounted] = useState(false)

  const categories = [
    { name: 'META TIER' },
    { name: 'A TIER' },
    { name: 'B TIER' },
    { name: 'C TIER' },
    { name: 'D TIER' },
  ];

  const selectedWeapons = useMemo(() => {
    switch (selectedCategory) {
      case 'META TIER':
        return weapons?.META || [];
      case 'A TIER':
        return weapons?.A || [];
      case 'B TIER':
        return weapons?.B || [];
      case 'C TIER':
        return weapons?.C || [];
      case 'D TIER':
        return weapons?.D || [];
      default:
        return [];
    }
  }, [selectedCategory, weapons?.META, weapons?.A, weapons?.B, weapons?.C, weapons?.D]);

  useEffect(() => {
    setSelectedCategory('META TIER');
  }, [modeCategory])

  useLayoutEffect(() => {
    setIsMounted(true)
  }, [])

  const getRankBadgeColor = (rank: string) => {
    if (rank.includes('#1')) return 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-yellow-900 shadow-md relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shine';
    if (rank.includes('#2')) return 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 text-gray-800 shadow-md relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shine';
    if (rank.includes('#3')) return 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-amber-100 shadow-md relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shine';
    return 'bg-[#1A1A1A] text-white';
  };

  const getAttachmentColor = (slot: string) => {
    switch (slot.toUpperCase()) {
      case 'OPTIC': return 'bg-blue-500/20 text-blue-300';
      case 'BARREL': return 'bg-green-500/20 text-green-300';
      case 'MUZZLE': return 'bg-red-500/20 text-red-300';
      case 'UNDERBARREL': return 'bg-yellow-500/20 text-yellow-300';
      case 'MAGAZINE': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <>
      {isMounted && (
        <>
          <TierToggles 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {selectedWeapons ? selectedWeapons!.map((weapon: any, index: any) => (
                <motion.div
                key={weapon.id}
                initial={{ opacity: 0, rotateX: -15, y: 50 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                }}
                whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    transition: { duration: 0.2 }
                }}
                className="relative preserve-3d h-full"
                >
                <Card 
                    className={`
                    bg-gradient-to-br from-[#1A1A1A] to-[#0F0F10] 
                    border border-white/10 hover:border-white/20 
                    transition-all duration-300
                    ${hoveredWeapon === weapon.id ? 'shadow-xl shadow-blue-500/20' : ''}
                    overflow-hidden h-full flex flex-col
                    `}
                    onMouseEnter={() => setHoveredWeapon(weapon.id)}
                    onMouseLeave={() => setHoveredWeapon(null)}
                >
                    <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                        <h3 className="text-xl font-bold text-white mb-2">{weapon.name}</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-[#2A2A2A] text-white">
                            {weapon.displayType.replace('_', ' ')}
                            </Badge>
                            {weapon.isNew && (
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                                NEW
                            </Badge>
                            )}
                            {weapon.updateWZ2 && (
                            <Badge className={weapon.updateWZ2 === 'buff' ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' : 'bg-red-500/20 text-red-300 border-red-500/50'}>
                                {weapon.updateWZ2.toUpperCase()}
                            </Badge>
                            )}
                        </div>
                        </div>
                        <div className="flex flex-col items-end">
                        <span className="text-2xl font-bold text-white">#{index + 1}</span>
                        <Badge 
                            variant="secondary" 
                            className={`${getRankBadgeColor(weapon.typeRankFormatted)} hover:opacity-90 transition-opacity duration-300 mt-1`}
                        >
                            {weapon.typeRankFormatted.toUpperCase()}
                        </Badge>
                        </div>
                    </div>

                    {weapon.sniperSupportRank && (
                        <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Sniper Support Rank</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {weapon.sniperSupportRank.rankedResurgence && (
                            <Badge variant="outline" className="justify-between">
                                <span>Ranked:</span>
                                <span>#{weapon.sniperSupportRank.rankedResurgence}</span>
                            </Badge>
                            )}
                            {weapon.sniperSupportRank.alMazrah && (
                            <Badge variant="outline" className="justify-between">
                                <span>Al Mazrah:</span>
                                <span>#{weapon.sniperSupportRank.alMazrah}</span>
                            </Badge>
                            )}
                            {weapon.sniperSupportRank.ashikaIsland && (
                            <Badge variant="outline" className="justify-between">
                                <span>Ashika Island:</span>
                                <span>#{weapon.sniperSupportRank.ashikaIsland}</span>
                            </Badge>
                            )}
                        </div>
                        </div>
                    )}

                    {/* Best Attachments */}
                    {weapon.bestAttachments.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                        <Crosshair className="w-4 h-4 mr-2" />
                        BEST ATTACHMENTS
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                        {weapon.bestAttachments.map((attachment: any, index: number) => (
                            <div 
                            key={index}
                            className={`p-3 rounded-lg ${getAttachmentColor(attachment.slot)} transition-all duration-300 hover:scale-105`}
                            >
                            <span className="block text-xs font-semibold mb-1">{attachment.slot.toUpperCase()}</span>
                            <span className="block text-sm text-white">{attachment.name}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
                      {/* Flexible space at the bottom */}
                      <div className="flex-grow"></div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                </Card>
                </motion.div>
            )) : null
        }
        </div>
        </>
      )}
    </>
  )
}