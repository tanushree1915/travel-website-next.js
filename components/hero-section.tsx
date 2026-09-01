import Image from "next/image"
import SearchBar from "@/components/search-bar"
import Navbar from "@/components/navbar"

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
    <div className="pl-[18px] pr-[17px] pt-[18px] pb-[122px] md:pl-[19px] md:pr-[20px] md:pt-[20px] md:pb-[80px] lg:pl-[19px] lg:pr-[20px] lg:pt-[20px] lg:pb-[80px]">
      <section className="relative aspect-[328/650] w-full overflow-hidden rounded-xl md:aspect-[2.5/1]">
        <Image
          src={hero?.background_image || "/images/hero-bg.jpg"}
          alt="Luxury hotel with pool and ocean view"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0F75BC] to-transparent" />

        <Navbar />

                <div className="relative z-10 flex h-full flex-col items-start justify-start px-5 pt-[180px] md:pt-[135px] md:px-6 lg:px-16">
          <div className="w-full max-w-6xl">

            <div className="max-w-[284px] md:max-w-[506px]">
              <h1 className="font-serif italic font-normal leading-tight text-white text-[24px] md:font-medium md:text-[32px] md:leading-none lg:text-[40px]">
                {hero?.heading || (
                  <>
                    Chase elegance, <br />
                    Reserve your dream stay now
                  </>
                )}
              </h1>

              <p className="mt-3 font-sans font-normal text-[12px] leading-4 tracking-normal text-white md:font-medium md:text-[16px] md:leading-none md:tracking-[0.01em]">
                {hero?.subheading ||
                  "Discover the finest hotels from all over the world."}
              </p>
            </div>

            <div className="mt-[107px] w-full max-w-[284px] md:mt-[29px] md:max-w-none lg:mt-[29px]">
              <SearchBar />
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}