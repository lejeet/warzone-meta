import { motion } from 'framer-motion'

interface CategoryTogglesProps {
  categories: { name: string }[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export function CategoryToggles({ categories, selectedCategory, setSelectedCategory }: CategoryTogglesProps) {
  return (
    <div className="flex justify-start mb-8 overflow-x-auto">
      {categories.map((category) => (
        <motion.button
          key={category.name}
          className={`relative px-4 py-2 text-lg font-semibold transition-all duration-200 whitespace-nowrap ${
            selectedCategory === category.name ? 'text-white' : 'text-gray-400 hover:text-gray-300'
          } text-base sm:text-lg`}
          onClick={() => setSelectedCategory(category.name)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.name}
          {selectedCategory === category.name && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"
              layoutId="underline"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}

