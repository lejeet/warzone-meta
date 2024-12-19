import { NextResponse } from 'next/server'

async function fetchWeaponMetaData() {
  const response = await fetch(
    'https://app.wzstats.gg/wz2/weapons/meta/weapons-and-tier-lists/?streamerProfileId=wzstats&weaponGames[]=mw3&weaponGames[]=mw2&weaponGames[]=bo6&addConversionKit=true&weaponAttributes[]=game&weaponAttributes[]=name&weaponAttributes[]=type&weaponAttributes[]=isNew&weaponAttributes[]=updateMW2&weaponAttributes[]=updateWZ2&weaponAttributes[]=displayType&weaponAttributes[]=sniperSupportRank'
  )
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

async function fetchWeaponBuildsData() {
  const response = await fetch(
    'https://app.wzstats.gg/wz2/weapons/builds/wzstats/with-attachments/?game=wz2&language=en&addConversionKit=true'
  )
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

async function fetchWeaponLoadoutsData() {
  const response = await fetch(
    'https://app.wzstats.gg/wz2/weapons/loadouts/full?addConversionKit=true&games[]=warzone&language=en&map=rankedResurgence'
  )
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export async function GET() {
  try {
    const [weaponMetaData, weaponBuildsData, weaponLoadoutsData] = await Promise.all([
      fetchWeaponMetaData(),
      fetchWeaponBuildsData(),
      fetchWeaponLoadoutsData()
    ])
    
    return NextResponse.json({
      weaponMetaData,
      weaponBuildsData,
      weaponLoadoutsData
    })
  } catch (error) {
    console.error('Error fetching weapon data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weapon data' },
      { status: 500 }
    )
  }
}