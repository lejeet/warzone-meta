import Link from 'next/link'

export function WeaponTiers() {
  const metaGuns = [
    { id: 'xm4', name: 'XM4' },
    { id: 'jackal-pdw', name: 'JACKAL PDW' },
    { id: 'gpr-91', name: 'GPR 91' },
    { id: 'kompakt-92', name: 'KOMPAKT 92' },
    { id: 'xmg', name: 'XMG' },
    { id: 'pp-919', name: 'PP-919' },
    { id: 'katt-amr', name: 'KATT-AMR' },
    { id: 'lr-762', name: 'LR 7.62' }
  ]

  const aTierGuns = [
    { id: 'model-l', name: 'MODEL L' },
    { id: 'c9', name: 'C9' },
    { id: 'ames-85', name: 'AMES 85' },
    { id: 'ksv', name: 'KSV' },
    { id: 'krig-c', name: 'KRIG C' },
    { id: 'saug', name: 'SAUG' },
    { id: 'ak-74', name: 'AK-74' },
    { id: 'victus-xmr', name: 'Victus XMR' },
    { id: 'lw3a1-frostline', name: 'LW3A1 FROSTLINE' },
    { id: 'striker', name: 'Striker' },
    { id: 'kar98k', name: 'Kar98k' },
    { id: 'goblin-mk-2', name: 'GOBLIN MK 2' },
    { id: 'bp50', name: 'BP50' },
    { id: 'lockwood-mk2', name: 'Lockwood MK2' },
    { id: 'rival-9', name: 'RIVAL-9' },
    { id: 'fjx-horus', name: 'FJX Horus' },
    { id: 'mors', name: 'MORS' },
    { id: 'superi-46', name: 'Superi 46' },
    { id: 'renetti', name: 'Renetti' },
    { id: 'sirin-9mm', name: 'SIRIN 9mm' },
    { id: 'xrk-stalker', name: 'XRK Stalker' },
    { id: 'lachmann-shroud', name: 'Lachmann Shroud' },
    { id: 'mtz-556', name: 'MTZ-556' },
    { id: 'kastov-762', name: 'Kastov 762' },
    { id: 'mcw', name: 'MCW' },
    { id: 'mx9', name: 'MX9' },
    { id: 'ram-9', name: 'RAM-9' },
    { id: 'tanto-22', name: 'TANTO .22' },
    { id: 'fjx-imperium', name: 'FJX Imperium' },
    { id: 'as-val', name: 'AS VAL' },
    { id: 'pulemyot-762', name: 'Pulemyot 762' },
    { id: 'marine-sp', name: 'Marine SP' },
    { id: 'asg-89', name: 'ASG-89' },
    { id: 'bal-27', name: 'BAL-27' },
    { id: '556-icarus', name: '556 Icarus' },
    { id: 'stg44', name: 'STG44' },
    { id: 'holger-556', name: 'Holger 556' },
    { id: 'holger-26', name: 'Holger 26' },
    { id: 'sakin-mg38', name: 'Sakin MG38' },
    { id: 'taq-eradicator', name: 'TAQ Eradicator' },
    { id: 'taq-evolvere', name: 'TAQ Evolvere' },
    { id: 'stb-556', name: 'STB 556' },
    { id: 'taq-56', name: 'TAQ-56' },
    { id: 'm13b', name: 'M13B' },
    { id: 'kastov-545', name: 'Kastov 545' },
    { id: 'taq-v', name: 'TAQ-V' }
  ]

  return (
    <div className="w-full text-center mt-8 mb-8 p-6 bg-[#0F0F10] rounded-lg">
      <div className="mb-8">
        <h3 className="text-gray-400 text-2xl font-medium mb-4">
          META Guns
        </h3>
        <p className="text-white text-lg font-medium leading-relaxed">
          {metaGuns.map((gun, index) => (
            <span key={gun.id}>
              <Link 
                href={`/weapon/${gun.id}`}
                className="hover:text-[#F5B041] transition-colors duration-200"
              >
                {gun.name}
              </Link>
              {index < metaGuns.length - 1 && <span className="mx-2">•</span>}
            </span>
          ))}
        </p>
      </div>

      <div>
        <h3 className="text-gray-400 text-2xl font-medium mb-4">
          A Tier Guns
        </h3>
        <p className="text-white text-lg font-medium leading-relaxed">
          {aTierGuns.map((gun, index) => (
            <span key={gun.id}>
              <Link 
                href={`/weapon/${gun.id}`}
                className="hover:text-[#F5B041] transition-colors duration-200"
              >
                {gun.name}
              </Link>
              {index < aTierGuns.length - 1 && <span className="mx-2">•</span>}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

