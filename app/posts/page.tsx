import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Posts</h1>
        <p className="text-gray-400">Browse our collection of articles</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-center py-24">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}