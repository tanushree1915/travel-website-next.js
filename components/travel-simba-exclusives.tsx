"use client"

import { useRef, useState, useEffect } from "react"
import ExclusiveCard from "@/components/exclusive-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const exclusiveDeals = [
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
]

export default function TravelSimbaExclusives() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const cardWidth = container.querySelector("div")?.clientWidth || 1
      const newIndex = Math.round(container.scrollLeft / cardWidth)
      setActiveIndex(newIndex)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current
    if (!container) return

    const cardWidth = container.querySelector("div")?.clientWidth || 0

    container.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    })
  }

  const scrollLeft = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1)
  }

  const scrollRight = () => {
    if (activeIndex < exclusiveDeals.length - 1)
      scrollToIndex(activeIndex + 1)
  }

  return (
    <section className="w-full bg-background py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <h2 className="text-center md:text-left font-serif italic text-2xl sm:text-3xl lg:text-5xl text-foreground">
          Travel Simba Exclusives
        </h2>

        <div className="relative mt-6 sm:mt-8">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {exclusiveDeals.map((deal, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full snap-start sm:w-[320px] lg:w-[340px]"
              >
                <ExclusiveCard
                  name={deal.name}
                  location={deal.location}
                  price={deal.price}
                  badge={deal.badge}
                  imagePaths={deal.imagePaths}
                />
              </div>
            ))}
          </div>
        </div>



        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

      </div>
    </section>
  )
}
