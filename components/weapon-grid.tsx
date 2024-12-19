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
  weapons?: {
    META?: Weapon[];
    A?: Weapon[];
    B?: Weapon[];
    C?: Weapon[];
    D?: Weapon[];
  };
  selectedCategory?: string;
}

export function WeaponGrid({ weapons, selectedCategory: modeCategory }: WeaponGridProps) {
  const [hoveredWeapon, setHoveredWeapon] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('META TIER');
  const [isMounted, setIsMounted] = useState(false)

  const categories = [
    { 
      name: 'META TIER',
      description: 'Top-tier weapons dominating the current meta game'
    },
    { 
      name: 'A TIER',
      description: 'Strong, reliable weapons that perform well in most situations'
    },
    { 
      name: 'B TIER',
      description: 'Solid weapons that can be effective in the right hands'
    },
    { 
      name: 'C TIER',
      description: 'Niche weapons that may excel in specific scenarios but lack overall versatility'
    },
    { 
      name: 'D TIER',
      description: 'Underperforming weapons that need significant buffs or reworks'
    }
  ]

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
      case 'MUZZLE': return 'bg-red-500/20 text-red-300';
      case 'BARREL': return 'bg-green-500/20 text-green-300';
      case 'UNDERBARREL': return 'bg-yellow-500/20 text-yellow-300';
      case 'MAGAZINE': return 'bg-purple-500/20 text-purple-300';
      case 'REARGRIP': return 'bg-pink-500/20 text-pink-300';
      case 'STOCK': return 'bg-indigo-500/20 text-indigo-300';
      case 'LASER': return 'bg-cyan-500/20 text-cyan-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const attachmentOrder = ['OPTIC', 'MUZZLE', 'BARREL', 'UNDERBARREL', 'MAGAZINE', 'REARGRIP', 'STOCK', 'LASER'];

  const adjustRank = (weapons: Weapon[], category: string) => {
  const adjustedWeapons = [...weapons];
  const typeCounters: { [key: string]: number } = {};

  if (category === 'META TIER') {
    adjustedWeapons.forEach((weapon) => {
      if (weapon.typeRankFormatted.includes('#0')) {
        if (!typeCounters[weapon.type]) {
          typeCounters[weapon.type] = 1;
        }
          weapon.typeRankFormatted = `#${typeCounters[weapon.type]} ${weapon.displayType.replace('_', ' ')}`;
          typeCounters[weapon.type]++;
        }
      });
    } else {
      adjustedWeapons.forEach((weapon) => {
        if (weapon.typeRankFormatted.includes('#0')) {
          weapon.typeRankFormatted = '';
        }
      });
    }

    return adjustedWeapons;
  };

  const adjustedWeapons = adjustRank(selectedWeapons, selectedCategory);

  return (
    <>
      {isMounted && (
        <>
          <TierToggles 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <p className="text-sm text-gray-400 mb-6">
            {categories.find(cat => cat.name === selectedCategory)?.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
            {adjustedWeapons ? adjustedWeapons!.map((weapon: any, index: any) => (
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
                          {attachmentOrder.map((slot) => {
                            const attachment = weapon.bestAttachments.find(a => a.slot.toUpperCase() === slot);
                            if (attachment) {
                              return (
                                <div 
                                  key={slot}
                                  className={`p-3 rounded-lg ${getAttachmentColor(slot)} transition-all duration-300 hover:scale-105`}
                                >
                                  <span className="block text-xs font-semibold mb-1">{slot}</span>
                                  <span className="block text-sm text-white">{attachment.name}</span>
                                </div>
                              );
                            }
                            return null;
                          })}
                          {weapon.bestAttachments
                            .filter((attachment: { slot: string, name: string }) => !attachmentOrder.includes(attachment.slot.toUpperCase()))
                            .map((attachment: { slot: string, name: string }) => (
                              <div 
                                key={attachment.slot}
                                className={`p-3 rounded-lg ${getAttachmentColor(attachment.slot)} transition-all duration-300 hover:scale-105`}
                              >
                                <span className="block text-xs font-semibold mb-1">{attachment.slot.toUpperCase()}</span>
                                <span className="block text-sm text-white">{attachment.name}</span>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )}  
                      <div className="flex-grow"></div>
                    </div>
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                  </Card>
                </motion.div>
            )) : null}
          </div>
        </>
      )}
    </>
  )}