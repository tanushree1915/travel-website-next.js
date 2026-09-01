import { Star } from "lucide-react"

interface Testimonial {
  id?: number
  name: string
  location: string
  star_rating?: number
  review_text: string
}

interface TestimonialsSectionProps {
  data?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Mark Roberts",
    location: "USA",
    star_rating: 5,
    review_text:
      "Working with DigitX was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
  },
  {
    name: "Mark Roberts",
    location: "India",
    star_rating: 5,
    review_text:
      "Working with DigitX was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
  },
  {
    name: "Mark Roberts",
    location: "Kenya",
    star_rating: 5,
    review_text:
      "Working with DigitX was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
  },
  {
    name: "Mark Roberts",
    location: "Tanzania",
    star_rating: 5,
    review_text:
      "Working with DigitX was a pleasure. Their web design team created a stunning website that perfectly captured our brand's essence. The feedback from our customers has been overwhelmingly positive.",
  },
]

function TestimonialCard({
  text,
  name,
  location,
  rating,
  featured,
}: {
  text: string
  name: string
  location: string
  rating: number
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
        {Array.from({ length: rating }).map((_, i) => (
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

export default function TestimonialsSection({
  data = [],
}: TestimonialsSectionProps) {
  const testimonials = [
    ...defaultTestimonials,
    ...data,
  ]

  return (
    <section className="bg-white px-6 pt-0 pb-0 mb-[28px] lg:px-20 lg:pt-0 lg:pb-0 lg:mb-[100px]">
      <div className="mx-auto max-w-7xl flex flex-col gap-16 lg:flex-row">

        <div className="lg:w-[38%]">
          <h2 className="font-serif text-5xl italic leading-tight text-[#1a1a2e]">
            Trusted By Many,
            <br />
            loved by All
          </h2>

          <p className="mt-6 text-[16px] leading-relaxed text-gray-500">
            Our Clients success stories reflect our commitment to excellence.
            See how weâ€™ve helped them find their dream homes, sustainable
            investments and perfect getaways.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:w-[62%]">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={
                testimonial.id
                  ? `cms-${testimonial.id}`
                  : `default-${index}`
              }
              text={testimonial.review_text}
              name={testimonial.name}
              location={testimonial.location}
              rating={testimonial.star_rating ?? 5}
              featured={index === 0}
            />
          ))}
        </div>

      </div>
    </section>
  )
}