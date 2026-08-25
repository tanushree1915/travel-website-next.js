"use client"

import { useRef, useState, useEffect } from "react"
import ExclusiveCard from "@/components/exclusive-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ExclusiveDeal {
  id?: number
  name: string
  location?: string
  price?: string
  badge?: string
  image?: string
  imagePath?: string
  imagePaths?: string[]
}

interface TravelSimbaExclusivesProps {
  data?: ExclusiveDeal[]
}
const defaultExclusiveDeals: ExclusiveDeal[] = [
  {
    name: "Royal Rawal - Luxury Boutique Hotel",
    location: "Zanzibar, Tanzania",
    price: "TSh 64,500",
    badge: "Limited time deal",
    imagePaths: ["/images/royal-rawal-1.jpg"],
  },
  {
    name: "Two Seas Residence",
    location: "Jaipur, India",
    price: "TSh 64,500",
    badge: "Secret Deal",
    imagePaths: ["/images/two-seas-jaipur-1.jpg"],
  },
  {
    name: "Two Seas Residence",
    location: "Mumbai, India",
    price: "TSh 64,500",
    imagePaths: ["/images/two-seas-mumbai-1.jpg"],
  },
  {
    name: "Two Seas Residence",
    location: "Arusha, Tanzania",
    price: "TSh 64,500",
    imagePaths: ["/images/two-seas-arusha-1.jpg"],
  },
  {
    name: "Vesta Avatar",
    location: "Banglore, India",
    price: "TSh 64,500",
    badge: "35% off",
    imagePaths: ["/images/tags/vesta-avatar-1.jpg"],
  },
]

export default function TravelSimbaExclusives({
  data = [],
}: TravelSimbaExclusivesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

 const exclusiveDeals = [
  ...defaultExclusiveDeals,
  ...data,
]

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const firstCard = container.querySelector(
        "[data-exclusive-card]"
      ) as HTMLElement | null

      if (!firstCard) return

      const cardWidth =
        firstCard.offsetWidth +
        parseInt(getComputedStyle(container).gap || "0")

      const newIndex = Math.round(
        container.scrollLeft / cardWidth
      )

      setActiveIndex(
        Math.max(
          0,
          Math.min(newIndex, exclusiveDeals.length - 1)
        )
      )
    }

    container.addEventListener("scroll", handleScroll)

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [exclusiveDeals.length])

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current
    if (!container) return

    const firstCard = container.querySelector(
      "[data-exclusive-card]"
    ) as HTMLElement | null

    if (!firstCard) return

    const cardWidth =
      firstCard.offsetWidth +
      parseInt(getComputedStyle(container).gap || "0")

    container.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    })

    setActiveIndex(index)
  }

  const scrollLeft = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1)
    }
  }

  const scrollRight = () => {
    if (activeIndex < exclusiveDeals.length - 1) {
      scrollToIndex(activeIndex + 1)
    }
  }

  return (
    <section className="w-full bg-background py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <h2 className="text-center md:text-left font-serif italic text-2xl sm:text-3xl lg:text-5xl text-foreground">
          Travel Simba Exclusives
        </h2>

        <div className="relative mt-6 sm:mt-8">

          {activeIndex > 0 && (
            <button
              type="button"
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md sm:flex"
              aria-label="Previous exclusive deal"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:gap-6"
          >
            {exclusiveDeals.map((deal, index) => {
              const imagePaths =
                deal.imagePaths?.length
                  ? deal.imagePaths
                  : deal.imagePath
                    ? [deal.imagePath]
                    : deal.image
                      ? [deal.image]
                      : []

              return (
                <div
                  key={
                    deal.id ??
                    `${deal.name}-${deal.location}-${index}`
                  }
                  data-exclusive-card
                  className="flex-shrink-0 w-full snap-start sm:w-[320px] lg:w-[340px]"
                >
                  <ExclusiveCard
                    name={deal.name}
                    location={deal.location || ""}
                    price={deal.price || ""}
                    badge={deal.badge || ""}
                    imagePaths={imagePaths}
                  />
                </div>
              )
            })}
          </div>

          {activeIndex < exclusiveDeals.length - 1 && (
            <button
              type="button"
              onClick={scrollRight}
              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md sm:flex"
              aria-label="Next exclusive deal"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

      </div>
    </section>
  )
}