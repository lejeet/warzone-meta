export interface WeaponResponse {
  meta: WeaponMeta[]
  a: WeaponData[]
  b: WeaponData[]
  c: WeaponData[]
  d: WeaponData[]
}

export interface WeaponData {
  id: string
  name: string
  type: string
  isNew: boolean
  updateMW2: string
  updateWZ2: string
  displayType: string
  sniperSupportRank?: {
    alMazrah?: number
    ashikaIsland?: number
    rankedResurgence?: number
  }
  game: string
}

export interface WeaponMeta extends WeaponData {
  typeRankFormatted: string
  typeRank: number
}