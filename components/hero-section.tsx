import Image from "next/image"
import SearchBar from "@/components/search-bar"

export default function HeroSection() {
  return (
    <div className="px-3 pt-3 sm:px-4 lg:px-6 lg:pt-6">
      <section className="relative h-[85vh] sm:h-[90vh] lg:h-[92vh] w-full overflow-hidden rounded-2xl lg:rounded-3xl">
        
        <Image
          src="/images/hero-bg.jpg"
          alt="Luxury hotel with pool and ocean view"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#2c5f7a]/85 via-[#2c5f7a]/55 to-transparent" />

        <div className="relative z-10 flex h-full items-start sm:items-center pt-24 sm:pt-0">
          <div className="max-w-6xl px-4 sm:px-6 lg:px-16">

            <h1 className="max-w-xl font-serif italic leading-tight text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
              Chase elegance, <br />
              Reserve your dream stay now
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white/90">
              Discover the finest hotels from all over the world.
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
