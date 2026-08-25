import Image from "next/image"
import SearchBar from "@/components/search-bar"

interface HeroData {
  id: number
  heading: string
  subheading: string
  background_image: string
}

interface HeroSectionProps {
  data: HeroData[]
}

export default function HeroSection({
  data,
}: HeroSectionProps) {
  const hero = data[0]

  return (
    <div className="px-3 pt-3 sm:px-4 lg:px-6 lg:pt-6">
      <section className="relative aspect-[2.5/1] w-full overflow-hidden rounded-[12px]">
        <Image
          src={hero?.background_image || "/images/hero-bg.jpg"}
          alt="Luxury hotel with pool and ocean view"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#0F75BC] to-transparent" />
        <div className="relative z-10 flex h-full items-start sm:items-center pt-24 sm:pt-0">
          <div className="max-w-6xl px-4 sm:px-6 lg:px-16">

            <h1 className="max-w-xl font-serif italic font-medium leading-none text-white text-[40px]">
              {hero?.heading || (
                <>
                  Chase elegance, <br />
                  Reserve your dream stay now
                </>
              )}
            </h1>

            <p className="mt-4 sm:mt-6 font-sans font-medium text-[16px] leading-none tracking-[0.01em] text-white">
  {hero?.subheading || "Discover the finest hotels from all over the world."}
</p>

            <div className="mt-6 sm:mt-8 lg:mt-12 w-full max-w-4xl">
              <SearchBar />
            </div>

          </div>
        </div>

      </section>
    </div>
  )
}