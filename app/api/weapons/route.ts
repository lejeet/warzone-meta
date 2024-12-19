import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      'https://app.wzstats.gg/wz2/weapons/meta/weapons-and-tier-lists/?streamerProfileId=wzstats&weaponGames[]=mw3&weaponGames[]=mw2&weaponGames[]=bo6&addConversionKit=true&weaponAttributes[]=game&weaponAttributes[]=name&weaponAttributes[]=type&weaponAttributes[]=isNew&weaponAttributes[]=updateMW2&weaponAttributes[]=updateWZ2&weaponAttributes[]=displayType&weaponAttributes[]=sniperSupportRank',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching weapon data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weapon data' },
      { status: 500 }
    )
  }
}

