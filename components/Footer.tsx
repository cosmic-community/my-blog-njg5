export default function Footer() {
  return (
    <footer className="border-t border-dark-border mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-white">My Blog</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}