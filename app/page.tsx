import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ])

  const featuredPost = posts[0]
  const restPosts = posts.slice(1)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-dark-border">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            My <span className="text-accent-blue">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thoughts, stories and ideas from creators around the world
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <CategoryBadge category={category} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold text-white mb-6">Featured</h2>
          <Link href={`/posts/${featuredPost.slug}`} className="group block">
            <article className="relative overflow-hidden rounded-2xl bg-dark-card border border-dark-border hover:border-accent-blue transition-all duration-300">
              <div className="md:grid md:grid-cols-2 gap-0">
                {featuredPost.metadata?.featured_image && (
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  {featuredPost.metadata?.category && (
                    <div className="mb-4">
                      <CategoryBadge category={featuredPost.metadata.category} />
                    </div>
                  )}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors">
                    {featuredPost.title}
                  </h3>
                  {featuredPost.metadata?.excerpt && (
                    <p className="text-gray-400 text-lg mb-6">
                      {featuredPost.metadata.excerpt}
                    </p>
                  )}
                  {featuredPost.metadata?.author && (
                    <div className="flex items-center gap-3">
                      {featuredPost.metadata.author.metadata?.profile_picture && (
                        <img
                          src={`${featuredPost.metadata.author.metadata.profile_picture.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                          alt={featuredPost.metadata.author.title}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="text-white text-sm font-medium">
                          {featuredPost.metadata.author.title}
                        </p>
                        {featuredPost.metadata?.published_date && (
                          <p className="text-gray-500 text-xs">
                            {new Date(featuredPost.metadata.published_date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </Link>
        </section>
      )}

      {/* Posts Grid */}
      {restPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="text-gray-400">No posts available yet.</p>
        </div>
      )}
    </div>
  )
}