import Image from "next/image"

export default function CtaSection() {
  return (
    <section className="hidden md:block relative h-[300px] w-full overflow-hidden md:h-[550px]">

      <Image
        src="/images/cta-beach.jpg"
        alt="Beautiful beach destination"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />

      <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-9">
        <h2 className="select-none text-center font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[175px] font-bold uppercase tracking-widest text-white/80">
          TRAVEL SIMBA
        </h2>
      </div>
    </section>
  )
}
