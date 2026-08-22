import { Star } from "lucide-react"

const testimonials = [
  {
    text: "Working with DigitX was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
    name: "Mark Roberts",
    location: "USA",
    featured: true,
  },
  {
    text: "Working with DigitX was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
    name: "Mark Roberts",
    location: "India",
    featured: false,
  },
  {
    text: "Working with DigitX was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
    name: "Mark Roberts",
    location: "Kenya",
    featured: false,
  },
  {
    text: "Working with DigitX was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
    name: "Mark Roberts",
    location: "Tanzania",
    featured: false,
  },
]

function TestimonialCard({
  text,
  name,
  location,
  featured,
}: {
  text: string
  name: string
  location: string
  featured: boolean
}) {
  return (
    <div
      className={`rounded-3xl p-7 transition-all ${
        featured
          ? "bg-[#1f6fa8] text-white shadow-lg"
          : "bg-white border border-gray-200 text-[#1a1a2e]"
      }`}
    >

      <div className="mb-5 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              featured
                ? "fill-white text-white"
                : "fill-[#1f6fa8] text-[#1f6fa8]"
            }`}
          />
        ))}
      </div>

 
      <p
        className={`text-[15px] leading-relaxed ${
          featured ? "text-white/90" : "text-gray-600"
        }`}
      >
        {text}
      </p>


      <div className="mt-6">
        <p
          className={`font-medium ${
            featured ? "text-white" : "text-[#1a1a2e]"
          }`}
        >
          {name}
        </p>
        <p
          className={`text-sm ${
            featured ? "text-white/70" : "text-gray-400"
          }`}
        >
          {location}
        </p>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="bg-white px-6 py-20 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-7xl flex flex-col gap-16 lg:flex-row">

        <div className="lg:w-[38%]">
          <h2 className="font-serif text-5xl italic leading-tight text-[#1a1a2e]">
            Trusted By Many,
            <br />
            loved by All
          </h2>

          <p className="mt-6 text-[16px] leading-relaxed text-gray-500">
            Our Clients success stories reflect our commitment to excellence.
            See how we’ve helped them find their dream homes, sustainable
            investments and perfect getaways.
          </p>
        </div>

       
        <div className="grid gap-6 sm:grid-cols-2 lg:w-[62%]">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              text={testimonial.text}
              name={testimonial.name}
              location={testimonial.location}
              featured={testimonial.featured}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
