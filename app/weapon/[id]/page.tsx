import { notFound } from 'next/navigation'
import { getRankedWeapons } from '@/lib/weaponData';
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WeaponPageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Define type for a single weapon
interface Weapon {
  id: string;
  name: string;
  type: string;
  isNew?: boolean;
  updateMW2?: string;
  updateWZ2?: string;
  displayType: string;
  sniperSupportRank?: { [key: string]: number };
  game: string;
  conversionKitId?: string | null;
  baseWeaponId?: string | null;
  bestAttachments: { slot: string; name: string }[];
  typeRankFormatted?: string;
  categoryRank?: number;
  loadout?: {
    tactical: string;
    lethal: string;
    perks: string[];
    melee: string;
    wildcard: string;
  };
}


function getWeaponData(id: string): Weapon | undefined {
  const weaponData: any = getRankedWeapons();
  for (const map in weaponData) {
    for (const tier in weaponData[map]) {
      const weapon = weaponData[map][tier].find(
        (w: Weapon) => w.id.toLowerCase() === id.toLowerCase()
      );
      if (weapon) {
        return weapon;
      }
    }
  }
  return undefined;
}

export async function generateMetadata({ params }: WeaponPageProps) {
  const weapon = getWeaponData(params.id)
  
  if (!weapon) {
    return {
      title: 'Weapon Not Found - Warzone Meta',
      description: 'The requested weapon could not be found.'
    }
  }

  return {
    title: `${weapon.name} Meta Loadout - Warzone Meta`,
    description: `Best ${weapon.name} loadout and attachments for Warzone. View detailed stats, attachments, and strategies.`
  }
}

export default function WeaponPage({ params }: WeaponPageProps) {
  const weapon = getWeaponData(params.id)
  
  if (!weapon) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        <Card className="bg-[#0F0F10] border border-[#1d2433]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">{weapon.name}</h1>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-[#1A1A1A] text-white">
                  {weapon.game.toUpperCase()}
                </Badge>
                <Badge variant="secondary" className="bg-[#1A1A1A] text-white">
                  {weapon.displayType.replace('_', ' ')}
                </Badge>
                {weapon.typeRankFormatted && (
                  <Badge variant="secondary" className="bg-[#F5B041] text-black">
                    {weapon.typeRankFormatted}
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Best Attachments</h2>
                  <ul className="space-y-2">
                    {weapon.bestAttachments.map((attachment, index) => (
                      <li key={index} className="flex justify-between items-center bg-[#1A1A1A] p-3 rounded">
                        <span className="text-gray-400">{attachment.slot.toUpperCase()}</span>
                        <span className="text-white">{attachment.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {weapon.loadout && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Recommended Loadout</h2>
                    <ul className="space-y-2">
                      {Object.entries(weapon.loadout).map(([key, value]) => (
                        <li key={key} className="flex justify-between items-center bg-[#1A1A1A] p-3 rounded">
                          <span className="text-gray-400">{key.toUpperCase()}</span>
                          <span className="text-white">
                            {Array.isArray(value) ? value.join(', ') : value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {weapon.isNew || weapon.updateMW2 && (
                <div className="space-y-6">
                    <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Weapon Status</h2>
                    <div className="space-y-2">
                        {weapon.isNew && (
                        <Badge className="bg-green-600 text-white">NEW</Badge>
                        )}
                        {weapon.updateWZ2 && (
                        <Badge className={weapon.updateWZ2 === 'buff' ? 'bg-blue-600' : 'bg-red-600'}>
                            {weapon.updateWZ2.toUpperCase()}
                        </Badge>
                        )}
                    </div>
                    </div>
                </div>
              )}
              {weapon.sniperSupportRank && (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">Map Rankings</h2>
                        <ul className="space-y-2">
                        {Object.entries(weapon.sniperSupportRank).map(([map, rank]) => (
                            <li key={map} className="flex justify-between items-center bg-[#1A1A1A] p-3 rounded">
                            <span className="text-gray-400">{map.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</span>
                            <span className="text-white">#{rank}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

