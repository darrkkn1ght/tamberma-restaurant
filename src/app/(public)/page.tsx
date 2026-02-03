import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import SocialProof from '@/components/home/SocialProof'
import ChefsPicks from '@/components/home/ChefsPicks'
import PrivateDining from '@/components/home/PrivateDining'
import GalleryPreview from '@/components/home/GalleryPreview'
import HomeCTA from '@/components/home/HomeCTA'

export default function Home() {
    return (
        <>
            <Hero />

            <SocialProof />

            {/* ABOUT PREVIEW - "The Story" */}
            <section className="py-24 md:py-32 bg-background relative z-10">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                    <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-luxury group order-2 md:order-1">
                        <Image
                            src="/images/interior/interior-01.jpg"
                            alt="Dining Ambience"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>
                    <div className="space-y-8 order-1 md:order-2">
                        <SectionHeader
                            title="A Symphony of Spices"
                            subtitle="At Tamberma, we believe that food is an art form. Our chefs meticulously craft each dish using age-old recipes and the freshest locally sourced ingredients."
                            align="left"
                            light={false}
                        />

                        <p className="text-muted-foreground text-lg leading-relaxed font-light">
                            From the rich aromatic gravies of the North to the fiery coastal delicacies of the South, our menu is a curated journey through the diverse culinary landscape of India.
                        </p>

                        <div className="pt-4">
                            <Button href="/about" variant="outline">
                                Read Our Story
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <ChefsPicks />

            <PrivateDining />

            <GalleryPreview />

            <HomeCTA />
        </>
    )
}
