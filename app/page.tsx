'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { CategoryToggles } from '@/components/category-toggles';
import { WeaponCards } from '@/components/weapon-cards';
import { NewsSection } from '@/components/news-section';
import { motion } from 'framer-motion';
import { getRankedWeapons } from '@/lib/weaponData';

export default function LeaderboardPage() {
  const [selectedCategory, setSelectedCategory] = useState('RANKED');
  const categories = [
    { name: 'BATTLE ROYALE' },
    { name: 'RESURGENCE' },
    { name: 'RANKED' },
    { name: 'NEWS' },
  ];

  const weaponsData = useMemo(() => getRankedWeapons(), []);
  const { rankedResurgence, alMazrah: battleRoyale, ashikaIsland: resurgence } = weaponsData;

  const selectedWeapons = useMemo(() => {
    let weaponsCategory;
    switch (selectedCategory) {
      case 'BATTLE ROYALE':
        weaponsCategory = battleRoyale.META;
        break;
      case 'RESURGENCE':
        weaponsCategory = resurgence.META;
        break;
      case 'RANKED':
        weaponsCategory = rankedResurgence.META;
        break;
      default:
        weaponsCategory = {};
    }
    // Ensure that we always have a META property available
    return weaponsCategory || [];
  }, [selectedCategory, battleRoyale, resurgence, rankedResurgence]);

  return (
    <div className="min-h-screen bg-[#121212] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <Header />
        <CategoryToggles 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {selectedCategory === 'NEWS' ? (
          <NewsSection />
        ) : (
          <WeaponCards weapons={selectedWeapons} />
        )}
      </motion.div>
    </div>
  );
}