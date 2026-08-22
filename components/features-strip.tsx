import { Calendar, HandCoins, Headset, Tags } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description:
      "We offer easy and convenient flight bookings with attractive offers",
  },
  {
    icon: HandCoins,
    title: "Smart Prices",
    description:
      "Get the Smart value for your money with guaranteed Best rates on hotel bookings.",
  },
  {
    icon: Headset,
    title: "Excellent Support",
    description:
      "Get assistance on any kind of travel related Query. We are happy to assist you",
  },
  {
    icon: Tags,
    title: "Exciting Deals",
    description:
      "Unlock exclusive discounts & offers on Travel Simba hotels for a more rewarding stay.",
  },
]

export default function FeaturesStrip() {
  return (
    <section className="px-6 py-0 sm:px-2 lg:px-8">

      <div className="w-full rounded-2xl bg-[#EEF3F8] px-6 py-10 sm:px-8 sm:py-12">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">

          {features.map((feature, index) => (
            <div key={feature.title} className="flex items-start relative lg:px-4">
              
              {/* Divider - Only visible on lg screens, not on the last item */}
              {index < features.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-28 bg-[#d1d5db]" />
              )}

              <div className="flex flex-1 flex-col items-center text-center">

                <feature.icon
                  className="mb-4 h-10 w-10 text-[#2C5AA0]"
                  strokeWidth={1.5}
                />

                <h3 className="mb-2 text-base font-semibold text-[#1a1a2e]">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#6b7280]">
                  {feature.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}