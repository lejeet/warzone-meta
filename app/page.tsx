'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { CategoryToggles } from '@/components/category-toggles';
import { WeaponCards } from '@/components/weapon-cards';
import { NewsSection } from '@/components/news-section';
import { motion } from 'framer-motion';
import { getRankedWeapons } from '@/lib/weaponData';
import Head from 'next/head';
import { FAQSection } from '@/components/faq-section';
import { WeaponTiers } from '@/components/weapon-tiers';

export default function LeaderboardPage() {
  const [selectedCategory, setSelectedCategory] = useState('RANKED');
  const categories = [
    { name: 'BATTLE ROYALE' },
    { name: 'RESURGENCE' },
    { name: 'RANKED' },
    // { name: 'NEWS' },
  ];

  const weaponsData = useMemo(() => getRankedWeapons(), []);
  const { rankedResurgence, alMazrah: battleRoyale, ashikaIsland: resurgence } = weaponsData;

  console.log(weaponsData, 'WEAPONS DATA');

  const selectedWeapons = useMemo(() => {
    switch (selectedCategory) {
      case 'BATTLE ROYALE':
        return battleRoyale || [];
      case 'RESURGENCE':
        return resurgence || [];
      case 'RANKED':
        return rankedResurgence || [];
      default:
        return [];
    }
  }, [selectedCategory, battleRoyale, resurgence, rankedResurgence]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Warzone Meta",
    "description": "Stay ahead in Warzone with our up-to-date meta analysis, weapon stats, and pro strategies.",
    "url": "https://wzmeta.io"
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <div className="min-h-screen bg-[#121212] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <Header />
          <nav>
            <CategoryToggles 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </nav>
          {selectedCategory === 'NEWS' ? (
            <NewsSection />
          ) : (
            <>
              <WeaponCards weapons={selectedWeapons} />
              <WeaponTiers />
            </>
          )}
          <FAQSection />
        </motion.div>
      </div>
    </>
  );
}