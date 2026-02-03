import Image from 'next/image'
import { MenuItem, formatPrice } from '@/data/menu'

interface FeaturedMenuCardProps {
    item: MenuItem
}

export default function FeaturedMenuCard({ item }: FeaturedMenuCardProps) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-500 ease-out group border border-neutral-100/80 cursor-pointer">
            {item.imageUrl ? (
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                        <h3 className="text-white font-display text-xl leading-tight drop-shadow-lg">
                            {item.name}
                        </h3>
                        <p className="text-white/90 text-sm font-medium mt-1.5 drop-shadow">
                            {formatPrice(item.price_ngn)}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="p-8 bg-gradient-to-br from-neutral-50 to-neutral-100/80 group-hover:from-neutral-100 group-hover:to-neutral-50 transition-colors duration-500">
                    <div className="h-36 flex flex-col justify-end">
                        <h3 className="text-neutral-900 font-display text-xl leading-tight group-hover:text-primary transition-colors duration-300">
                            {item.name}
                        </h3>
                        <p className="text-primary/80 font-medium mt-2">
                            {formatPrice(item.price_ngn)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
