import { getAllCategories } from '@/lib/cosmic'
import Link from 'next/link'

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Categories</h1>
        <p className="text-gray-400">Explore posts by topic</p>
      </div>

      {categories.length === 0 ? (
        <p className="text-gray-400 text-center py-24">No categories available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const color = category.metadata?.color || '#3ba8ed'
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-accent-blue transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: color }}
                >
                  {category.title.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors mb-2">
                  {category.title}
                </h2>
                {category.metadata?.description && (
                  <p className="text-gray-400 text-sm">
                    {category.metadata.description}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}