import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold text-white">My Blog</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-300 hover:text-accent-blue transition-colors text-sm font-medium">
            Home
          </Link>
          <Link href="/posts" className="text-gray-300 hover:text-accent-blue transition-colors text-sm font-medium">
            Posts
          </Link>
          <Link href="/categories" className="text-gray-300 hover:text-accent-blue transition-colors text-sm font-medium">
            Categories
          </Link>
          <Link href="/authors" className="text-gray-300 hover:text-accent-blue transition-colors text-sm font-medium">
            Authors
          </Link>
        </nav>
      </div>
    </header>
  )
}