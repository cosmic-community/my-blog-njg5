import { getAllAuthors } from '@/lib/cosmic'
import Link from 'next/link'

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Authors</h1>
        <p className="text-gray-400">Meet the writers behind the stories</p>
      </div>

      {authors.length === 0 ? (
        <p className="text-gray-400 text-center py-24">No authors available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="group bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-accent-blue transition-all duration-300 text-center"
            >
              {author.metadata?.profile_picture && (
                <img
                  src={`${author.metadata.profile_picture.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-2 ring-dark-border group-hover:ring-accent-blue transition-all"
                />
              )}
              <h2 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors mb-2">
                {author.title}
              </h2>
              {author.metadata?.bio && (
                <p className="text-gray-400 text-sm line-clamp-3">
                  {author.metadata.bio}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}