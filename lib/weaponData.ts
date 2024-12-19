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

async function fetchAllWeaponData() {
  const urls = [
    "https://app.wzstats.gg/wz2/weapons/meta/weapons-and-tier-lists/?streamerProfileId=wzstats&weaponGames[]=mw3&weaponGames[]=mw2&weaponGames[]=bo6&addConversionKit=true&weaponAttributes[]=game&weaponAttributes[]=name&weaponAttributes[]=type&weaponAttributes[]=isNew&weaponAttributes[]=updateMW2&weaponAttributes[]=updateWZ2&weaponAttributes[]=displayType&weaponAttributes[]=sniperSupportRank",
    "https://app.wzstats.gg/wz2/weapons/builds/wzstats/with-attachments/?game=wz2&language=en&addConversionKit=true",
    "https://app.wzstats.gg/wz2/weapons/loadouts/full?addConversionKit=true&games[]=warzone&language=en&map=rankedResurgence"
  ];

  try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    if (!responses.every(response => response.ok)) {
      throw new Error('One or more HTTP requests failed');
    }
    const [weaponMetaData, weaponBuildsData, weaponLoadoutsData] = await Promise.all(responses.map(response => response.json()));
    return { weaponMetaData, weaponBuildsData, weaponLoadoutsData };
  } catch (error) {
    console.error("Error fetching weapon data:", error);
    throw error; // Rethrow or handle as needed
  }
}

function mapTierToWeapons(
  tierList: Record<string, string[]>, 
  weaponMetaData: { weapons: any[], wzStatsTierList: any },
  weaponBuildsData: { builds: any[] },
  weaponLoadoutsData: { weapons: any[] }
): Record<string, Weapon[]> {
  const output: any = {};
  Object.entries(tierList).forEach(([tier, ids]) => {
    output[tier] = ids.map(id => {
      const weapon = weaponMetaData.weapons.find((w: any) => w.id === id);
      if (!weapon) return null;

      const builds = weaponBuildsData.builds.filter((build: any) => build.weaponId === weapon.id);
      builds.sort((a: any, b: any) => Math.abs(a.position - 1) - Math.abs(b.position - 1));
      const bestBuild = builds[0];

      const bestAttachments = bestBuild ? Object.entries(bestBuild)
        .filter(([key, value]: [string, any]) => value && typeof value === 'object' && 'name' in value)
        .map(([key, value]: [string, any]) => ({ slot: key as string, name: value.name })) : [];

      const loadoutData = weaponLoadoutsData.weapons.find((l: any) => l.weaponId === weapon.id);
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
        loadout: getTopLoadouts(weaponLoadoutsData) // Make sure this function also receives necessary data
      };
    }).filter((weapon: any) => weapon);
  });
  return output;
}

export async function getRankedWeapons(): Promise<RankedWeapons> {
  const { weaponMetaData, weaponBuildsData, weaponLoadoutsData } = await fetchAllWeaponData();
  return {
    rankedResurgence: mapTierToWeapons(weaponMetaData?.wzStatsTierList.rankedResurgence || {}, weaponMetaData, weaponBuildsData, weaponLoadoutsData),
    alMazrah: mapTierToWeapons(weaponMetaData?.wzStatsTierList.alMazrah || {}, weaponMetaData, weaponBuildsData, weaponLoadoutsData),
    ashikaIsland: mapTierToWeapons(weaponMetaData?.wzStatsTierList.ashikaIsland || {}, weaponMetaData, weaponBuildsData, weaponLoadoutsData)
  };
}

export function getTopWeapons() {
  const rankedWeapons = getRankedWeapons();
  return rankedWeapons; // Assuming you want the top META weapons
}

// Function to get and format a specific loadout
export function getTopLoadouts(weaponLoadoutsData) {
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