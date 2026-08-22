import StayCard from "@/components/stay-card"

export default function DiscoverStays() {
  return (
    <section className="w-full bg-background py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[40px]">

        <div className="mb-8 sm:mb-12 flex items-end justify-between">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl italic text-foreground">
            Discover your Favorite Stay
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[28px]">

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-[28px] w-full">

            <StayCard
              label="Hotel"
              imagePath="/images/hotel.jpg"
              className="w-full h-[160px] sm:h-[244px]"
            />

            <StayCard
              label="Resort"
              imagePath="/images/resort.jpg"
              className="w-full h-[160px] sm:h-[244px]"
            />

            <StayCard
              label="Lodge"
              imagePath="/images/lodge.jpg"
              className="w-full h-[160px] sm:h-[244px]"
            />

            <StayCard
              label="Villa"
              imagePath="/images/villa.jpg"
              className="w-full h-[160px] sm:h-[244px]"
            />

          </div>

          <StayCard
            label="AirBnb"
            imagePath="/images/airbnb.jpg"
            className="w-full h-[200px] sm:h-[300px] lg:w-[380px] lg:h-[516px] flex-shrink-0"
          />

        </div>

      </div>
    </section>
  )
}
