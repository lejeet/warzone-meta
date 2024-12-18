import { motion } from 'framer-motion'

interface TierTogglesProps {
  categories: { name: string }[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export function TierToggles({ categories, selectedCategory, setSelectedCategory }: TierTogglesProps) {
  return (
    <div className="flex space-x-1 mb-4">
      {categories.map((category) => (
        <motion.button
          key={category.name}
          className={`px-2 py-1 text-xs font-semibold rounded transition-all duration-200 ${
            selectedCategory === category.name
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
          }`}
          onClick={() => setSelectedCategory(category.name)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  )
}