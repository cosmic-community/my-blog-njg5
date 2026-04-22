import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from './CategoryBadge'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-accent-blue transition-all duration-300 h-full flex flex-col">
        {post.metadata?.featured_image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          {post.metadata?.category && (
            <div className="mb-3">
              <CategoryBadge category={post.metadata.category} />
            </div>
          )}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.metadata?.excerpt && (
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
              {post.metadata.excerpt}
            </p>
          )}
          {post.metadata?.author && (
            <div className="flex items-center gap-2 pt-4 border-t border-dark-border mt-auto">
              {post.metadata.author.metadata?.profile_picture && (
                <img
                  src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {post.metadata.author.title}
                </p>
                {post.metadata?.published_date && (
                  <p className="text-gray-500 text-xs">
                    {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}