"use client"

import Image from "next/image"
import PromoBanner from "@/components/promo-banner"

interface DestinationProps {
  name: string
  imagePath: string
}

function DestinationCard({ name, imagePath }: DestinationProps) {
  return (
    <div
      className="
        relative
        w-full
        h-[80px]
        rounded-[12px]
        overflow-hidden
        sm:w-[210px]
        sm:h-[180px]
      "
    >
      <Image
        src={imagePath}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 33vw, 210px"
        priority
      />

      <div className="absolute bottom-1 left-2 text-white font-semibold text-[10px] sm:text-sm">
        {name}
      </div>
    </div>
  )
}

const destinations = [
  { name: "Dubai", imagePath: "/images/dubai.jpg" },
  { name: "Maldives", imagePath: "/images/maldives.jpg" },
  { name: "Maasai Mara", imagePath: "/images/maasai.jpg" },
  { name: "Vietnam", imagePath: "/images/vietnam.jpg" },
  { name: "Mumbai", imagePath: "/images/mumbai.jpg" },
  { name: "Rome", imagePath: "/images/rome.jpg" },
]

const promos = [
  {
    tag: "HSBCCC",
    title: "UP TO 12% Off",
    subtitle: "on Hotels Booking in Zanzibar and Bali",
    imagePath: "/images/promos/hsbc.jpg",
    lightVariant: false,
  },
  {
    tag: "TSFESTIVE",
    title: "UP TSh 2500 Off",
    subtitle: "on Hotels Booking",
    imagePath: "/images/promos/tsfestive.jpg",
    lightVariant: true,
  },
  {
    tag: "TRAVELSIMBA",
    title: "UP TO 40% Off",
    subtitle: "on Villa Booking in Zanzibar",
    imagePath: "/images/promos/travelsimba.jpg",
    lightVariant: false,
  },
]

export default function ExploreDestinations() {
  return (
    <section className="bg-background py-6 sm:py-16 px-2 sm:px-6 lg:px-16">
      <div className="mx-auto w-full max-w-[1400px]">

        <h1 className="font-serif italic text-lg sm:text-3xl md:text-4xl lg:text-5xl text-foreground px-1 sm:px-0">
          Explore Popular Destinations
        </h1>

        <div
          className="
            mt-4 sm:mt-10
            grid grid-cols-2 gap-3
            sm:grid-cols-3 sm:gap-5
            lg:grid-cols-6
          "
        >
          {destinations.map((dest) => (
            <DestinationCard
              key={dest.name}
              name={dest.name}
              imagePath={dest.imagePath}
            />
          ))}
        </div>

        <div className="mt-4 sm:mt-16">
          <div className="grid grid-cols-1 gap-2 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {promos.map((promo) => (
              <PromoBanner
                key={promo.tag}
                tag={promo.tag}
                title={promo.title}
                subtitle={promo.subtitle}
                imagePath={promo.imagePath}
                lightVariant={promo.lightVariant}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
