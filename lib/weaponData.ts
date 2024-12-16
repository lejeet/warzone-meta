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
  isNew: boolean;
  updateWZ2: string;
  rankings: WeaponRanking[];
  bestAttachments: Attachment[];
  tier: string;
  position: number;
  categoryRank: number;
  typeRank: number;
  typeRankFormatted: string;
}

export interface Loadout {
  position: number;
  primaryWeapon: Weapon & { attachments: Attachment[] };
  secondaryWeapon: Weapon & { attachments: Attachment[] };
  tactical: string;
  lethal: string;
  perks: string[];
}

interface WeaponTier {
  META?: Weapon[];
  A?: Weapon[];
  B?: Weapon[];
  C?: Weapon[];
  D?: Weapon[];
}

interface RankedWeapons {
  rankedResurgence: WeaponTier;
  alMazrah: WeaponTier;
  ashikaIsland: WeaponTier;
}

function mapTierToWeapons(tierList: Record<string, string[]>): Record<string, Weapon[]> {
  const output: any = {};
  Object.entries(tierList).forEach(([tier, ids]) => {
    output[tier] = ids.map(id => {
      const weapon = weaponMetaData.weapons.find(w => w.id === id);
      if (!weapon) return null;

      const builds = weaponBuildsData.builds.filter(build => build.weaponId === weapon.id);
      builds.sort((a, b) => Math.abs(a.position - 1) - Math.abs(b.position - 1));
      const bestBuild = builds[0];

      const bestAttachments = bestBuild ? Object.entries(bestBuild)
        .filter(([key, value]) => value && typeof value === 'object' && 'name' in value)
        .map(([key, value]) => ({ slot: key as string, name: value.name })) : [];

      const loadoutData = weaponLoadoutsData.weapons.find(l => l.weaponId === weapon.id);
      const categoryRank = loadoutData?.categoryRank || 0;

      return {
        ...weapon,
        bestAttachments,
        typeRankFormatted: `#${categoryRank} ` + ({
          'ASSAULT_RIFLE': 'Long range',
          'SMG': 'Close range',
          'LMG': 'Long range',
          'SNIPER': 'Sniper'
        }[weapon.type] || ''),
        categoryRank,
        loadout: getTopLoadouts()
      };
    }).filter(weapon => weapon);
  });
  return output;
}

export function getRankedWeapons(): RankedWeapons {
  const { rankedResurgence, alMazrah, ashikaIsland } = weaponMetaData.wzStatsTierList;
  return {
    rankedResurgence: mapTierToWeapons(rankedResurgence || {}),
    alMazrah: mapTierToWeapons(alMazrah || {}),
    ashikaIsland: mapTierToWeapons(ashikaIsland || {})
  };
}


export function getTopWeapons() {
  const rankedWeapons = getRankedWeapons();
  return rankedWeapons; // Assuming you want the top META weapons
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