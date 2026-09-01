"use client"

import PromoBanner from "@/components/promo-banner"

interface Destination {
  id?: number
  name: string
  image?: string
  imagePath?: string
}

interface Promo {
  id?: number
  tag?: string
  title?: string
  subtitle?: string
  image?: string
  imagePath?: string
  lightVariant?: boolean
}

interface ExploreDestinationsProps {
  data?: Destination[]
  promos?: Promo[]
}

interface DestinationCardProps {
  name: string
  imagePath: string
}

function DestinationCard({
  name,
  imagePath,
}: DestinationCardProps) {
  return (
    <div className="relative w-full h-[180px] rounded-[12px] overflow-hidden">
      <img
        src={imagePath}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-10 pb-3 px-3">
        <span className="text-white font-semibold text-sm sm:text-base">
          {name}
        </span>
      </div>
    </div>
  )
}

const defaultDestinations: Destination[] = [
  {
    name: "Dubai",
    imagePath: "/images/dubai.jpg",
  },
  {
    name: "Maldives",
    imagePath: "/images/maldives.jpg",
  },
  {
    name: "Maasai Mara",
    imagePath: "/images/maasai.jpg",
  },
  {
    name: "Vietnam",
    imagePath: "/images/vietnam.jpg",
  },
  {
    name: "Mumbai",
    imagePath: "/images/mumbai.jpg",
  },
  {
    name: "Rome",
    imagePath: "/images/rome.jpg",
  },
]

const defaultPromos: Promo[] = [
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

export default function ExploreDestinations({
  data,
  promos,
}: ExploreDestinationsProps) {
  const cmsDestinations: Destination[] = (data ?? [])
    .filter(
      (dest) =>
        Boolean(dest.name) &&
        Boolean(dest.image || dest.imagePath)
    )
    .map((dest) => ({
      ...dest,
      imagePath: dest.image || dest.imagePath || "",
    }))

  const destinationsMap = new Map<string, Destination>()

  defaultDestinations.forEach((destination) => {
    destinationsMap.set(
      destination.name.trim().toLowerCase(),
      destination
    )
  })

  cmsDestinations.forEach((destination) => {
    destinationsMap.set(
      destination.name.trim().toLowerCase(),
      destination
    )
  })

  const destinations = Array.from(destinationsMap.values())

  const cmsPromos: Promo[] = (promos ?? [])
    .filter(
      (promo) =>
        Boolean(promo.title) &&
        Boolean(promo.image || promo.imagePath)
    )
    .map((promo) => ({
      ...promo,
      imagePath: promo.image || promo.imagePath || "",
    }))

  const promosMap = new Map<string, Promo>()

  defaultPromos.forEach((promo, index) => {
    const key =
      promo.tag?.trim().toLowerCase() ||
      `default-promo-${index}`

    promosMap.set(key, promo)
  })

  cmsPromos.forEach((promo, index) => {
    const key =
      promo.tag?.trim().toLowerCase() ||
      `cms-promo-${index}`

    promosMap.set(key, promo)
  })

  const allPromos = Array.from(promosMap.values())

  return (
   <section className="bg-background pt-0 pb-0 mb-[60px] lg:mb-[80px] px-4 sm:px-6 lg:px-16">
      <div className="mx-auto w-full max-w-[1400px]">

        <h1 className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
          Explore Popular Destinations
        </h1>

        <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {destinations.map((dest, index) => (
            <DestinationCard
              key={dest.id ?? `${dest.name}-${index}`}
              name={dest.name}
              imagePath={dest.imagePath || ""}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {allPromos.map((promo, index) => (
              <PromoBanner
                key={promo.id ?? `${promo.tag}-${index}`}
                tag={promo.tag || ""}
                title={promo.title || ""}
                subtitle={promo.subtitle || ""}
                imagePath={promo.imagePath || ""}
                lightVariant={promo.lightVariant ?? false}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}