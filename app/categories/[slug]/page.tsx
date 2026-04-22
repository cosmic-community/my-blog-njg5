// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({ slug: category.slug }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const color = category.metadata?.color || '#3ba8ed'

  return (
    <div className="min-h-screen">
      <section className="relative border-b border-dark-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-bg to-dark-bg" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: color }}
        />
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div
            className="inline-block px-4 py-2 rounded-full text-white text-sm font-medium mb-4"
            style={{ backgroundColor: color }}
          >
            Category
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {category.title}
          </h1>
          {category.metadata?.description && (
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-24">No posts in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}