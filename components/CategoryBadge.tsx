import { Category } from '@/types'

export default function CategoryBadge({ category }: { category: Category }) {
  const color = category.metadata?.color || '#3ba8ed'
  
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {category.title}
    </span>
  )
}