import Link from "next/link"
import PromoBanner from "@/components/promo-banner"

interface PromoBannerData {
  id?: number
  tag: string
  title: string
  subtitle?: string
  imagePath: string
  link?: string
}

interface PromoBannersSectionProps {
  data?: PromoBannerData[]
}

export default function PromoBannersSection({
  data = [],
}: PromoBannersSectionProps) {
  if (!data.length) return null

  return (
    <section className="px-6 py-0 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {data.map((promo, index) => {
          const card = (
            <PromoBanner
              tag={promo.tag}
              title={promo.title}
              subtitle={promo.subtitle || ""}
              imagePath={promo.imagePath}
            />
          )

          return promo.link ? (
            <Link key={promo.id ?? index} href={promo.link}>
              {card}
            </Link>
          ) : (
            <div key={promo.id ?? index}>{card}</div>
          )
        })}
      </div>
    </section>
  )
}