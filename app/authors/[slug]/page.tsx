// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-dark-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-bg to-dark-bg" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          {author.metadata?.profile_picture && (
            <img
              src={`${author.metadata.profile_picture.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-6 ring-4 ring-dark-border"
            />
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {author.title}
          </h1>
          {author.metadata?.bio && (
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
              {author.metadata.bio}
            </p>
          )}

          <div className="flex gap-4 justify-center flex-wrap">
            {author.metadata?.email && (
              <a
                href={`mailto:${author.metadata.email}`}
                className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-300 hover:text-accent-blue hover:border-accent-blue transition-all"
              >
                Email
              </a>
            )}
            {author.metadata?.twitter && (
              <a
                href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-300 hover:text-accent-blue hover:border-accent-blue transition-all"
              >
                Twitter
              </a>
            )}
            {author.metadata?.website && (
              <a
                href={author.metadata.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-300 hover:text-accent-blue hover:border-accent-blue transition-all"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">
          Posts by {author.title}
        </h2>
        {posts.length === 0 ? (
          <p className="text-gray-400">No posts yet.</p>
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