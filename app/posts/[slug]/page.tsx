// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CategoryBadge from '@/components/CategoryBadge'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Changed: Handle tags as array (from Cosmic CMS) instead of comma-separated string
  const tags = post.metadata?.tags 
    ? Array.isArray(post.metadata.tags) 
      ? post.metadata.tags 
      : post.metadata.tags.toString().split(',').map(t => t.trim())
    : []

  return (
    <article className="min-h-screen">
      {/* Hero */}
      {post.metadata?.featured_image && (
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-12 -mt-32 relative z-10">
        <div className="bg-dark-card border border-dark-border rounded-2xl p-8 md:p-12">
          {post.metadata?.category && (
            <div className="mb-6">
              <Link href={`/categories/${post.metadata.category.slug}`}>
                <CategoryBadge category={post.metadata.category} />
              </Link>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {post.title}
          </h1>

          {post.metadata?.excerpt && (
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}

          {/* Author + Date */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 mb-8 border-b border-dark-border">
            {post.metadata?.author && (
              <Link href={`/authors/${post.metadata.author.slug}`} className="flex items-center gap-3 group">
                {post.metadata.author.metadata?.profile_picture && (
                  <img
                    src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-dark-border group-hover:ring-accent-blue transition-all"
                  />
                )}
                <div>
                  <p className="text-white font-medium group-hover:text-accent-blue transition-colors">
                    {post.metadata.author.title}
                  </p>
                  {post.metadata?.published_date && (
                    <p className="text-gray-500 text-sm">
                      {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  )}
                </div>
              </Link>
            )}
          </div>

          {/* Content */}
          {post.metadata?.content && (
            <div
              className="prose prose-lg prose-dark max-w-none"
              dangerouslySetInnerHTML={{ __html: post.metadata.content }}
            />
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-dark-border">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-dark-bg border border-dark-border rounded-full text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-accent-blue hover:text-accent-blue-hover transition-colors">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  )
}