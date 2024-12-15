import weaponLoadoutsData from '../data/weapon-loadouts.json';
import weaponMetaData from '../data/weapon-meta.json';
import weaponBuildsData from '../data/weapon-builds.json';

// Interfaces
export interface Attachment {
  slot: string;
  name: string;
}

export interface WeaponRanking {
  position: string;
  category: string;
}

export interface Weapon {
  id: string;
  name: string;
  type: string;
  game: string;
  displayType: string;
  rankings: WeaponRanking[];
  bestAttachments: Attachment[];
  tier: string;
  position: number;
  categoryRank: number;
  typeRank: number;
}

export interface Loadout {
  position: number;
  primaryWeapon: Weapon & { attachments: Attachment[] };
  secondaryWeapon: Weapon & { attachments: Attachment[] };
  tactical: string;
  lethal: string;
  perks: string[];
}

export function getRankedWeapons() {
    const { weapons, wzStatsTierList } = weaponMetaData;
    const { rankedResurgence, alMazrah, ashikaIsland } = wzStatsTierList;

    // Helper function to map tier names to weapons
    const mapTierToWeapons = (tierList) => {
        const output = {};
        for (const tier in tierList) {
            output[tier] = tierList[tier].map(id => {
                const weapon = weapons.find(w => w.id === id);
                if (!weapon) return null;

                // Find all builds for this weapon
                const builds = weaponBuildsData.builds.filter(build => build.weaponId === weapon.id);
                // Sort builds by position, aiming to get the closest to 1
                builds.sort((a, b) => Math.abs(a.position - 1) - Math.abs(b.position - 1));
                // Select the best build (closest to position 1)
                const bestBuild = builds[0];

                // Map attachments from the best build
                const bestAttachments: Attachment[] = bestBuild ? Object.entries(bestBuild)
                    .filter(([key, value]) => value && typeof value === 'object' && 'name' in value)
                    .map(([key, value]) => ({ slot: key, name: value.name })) : [];

                // Find corresponding loadout data to get ranks
                const loadoutData = weaponLoadoutsData?.weapons.find(l => l.weaponId === weapon.id);
                const categoryRank = loadoutData?.categoryRank || 0;

                // Format type rank description
                const typeRankFormatted = `#${categoryRank} ` + ({
                    'ASSAULT_RIFLE': 'Long range',
                    'SMG': 'Close range',
                    'LMG': 'Long range',
                    'SNIPER': 'Sniper'
                }[weapon.type] || '');

                return {
                    ...weapon,
                    bestAttachments,
                    typeRankFormatted,
                    categoryRank
                };
            }).filter(weapon => weapon); // Filter out null entries
        }
        return output;
    };

    return {
        rankedResurgence: mapTierToWeapons(rankedResurgence),
        alMazrah: mapTierToWeapons(alMazrah),
        ashikaIsland: mapTierToWeapons(ashikaIsland)
    };
}

// Example usage:
const allRankedWeapons = getRankedWeapons();
console.log(allRankedWeapons);

// Utilize the ranked weapons data for top weapons function
export function getTopWeapons() {
  const rankedWeapons = getRankedWeapons();
  return rankedWeapons.META; // Assuming you want the top META weapons
}

// Function to get and format a specific loadout
export function getTopLoadouts() {
  const loadout = weaponLoadoutsData?.loadouts.find(loadout => loadout.id === "resurgence_ranked-1-warzone");

  if (!loadout) return null;

  const formatField = (field: any) => field.replace(/-/g, ' ').replace('warzone', '').replace('bo6', '').trim().toUpperCase();

  const formattedLoadout = {
    TACTICAL: formatField(loadout.equipment1Id),
    LETHAL: formatField(loadout.equipment2Id),
    PERKS: [
      formatField(loadout.perk1Id),
      formatField(loadout.perk2Id),
      formatField(loadout.perk3Id)
    ],
    MELEE: formatField(loadout.meleeId),
    WILDCARD: formatField(loadout.wildcardId)
  };

  return {
    tactical: formattedLoadout.TACTICAL,
    lethal: formattedLoadout.LETHAL,
    perks: formattedLoadout.PERKS,
    melee: formattedLoadout.MELEE,
    wildcard: formattedLoadout.WILDCARD
  };
}