import { MenuItem, formatPrice } from '@/data/menu'

interface MenuItemRowProps {
    item: MenuItem
}

// Tag display config
const tagConfig: Record<string, { label: string; color: string }> = {
    veg: { label: 'V', color: 'text-green-600' },
    chicken: { label: '🍗', color: '' },
    seafood: { label: '🦐', color: '' },
    beef: { label: '🥩', color: '' },
}

export default function MenuItemRow({ item }: MenuItemRowProps) {
    // Filter to show only key dietary/protein tags
    const displayTags = item.tags.filter(tag => tagConfig[tag])

    return (
        <div className="group py-4 border-b border-neutral-100 last:border-0">
            <div className="flex items-baseline justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-neutral-800 font-medium group-hover:text-primary transition-colors">
                            {item.name}
                        </h3>
                        {displayTags.map(tag => (
                            <span
                                key={tag}
                                className={`text-xs ${tagConfig[tag].color}`}
                                title={tag}
                            >
                                {tagConfig[tag].label}
                            </span>
                        ))}
                    </div>
                    {item.notes && (
                        <p className="text-neutral-400 text-sm mt-0.5">{item.notes}</p>
                    )}
                </div>
                <span className="text-primary/80 font-medium text-sm whitespace-nowrap">
                    {formatPrice(item.price_ngn)}
                </span>
            </div>
        </div>
    )
}
