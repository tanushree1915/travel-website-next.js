"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const experiences = [
  {
    id: 1,
    number: "01",
    title: "Rooftop Breakfasts",
    description: "Start your day above the city, where gourmet meets the sky.",
    imagePath: "/images/experience-rooftop.jpg",
  },
  {
    id: 2,
    number: "02",
    title: "Infinity Pool Moments",
    description:
      "Soak in breathtaking panoramic views while floating in luxury.",
    imagePath: "/images/experience-infinity-pool.jpg",
  },
  {
    id: 3,
    number: "03",
    title: "Private Chef Dining",
    description:
      "Savor exquisite meals crafted by world-class chefs in your private villa.",
    imagePath: "/images/experience-private-chef.jpg",
  },
  {
    id: 4,
    number: "04",
    title: "Desert Stargazing",
    description:
      "Witness the cosmos unfold above the endless desert horizon.",
    imagePath: "/images/experience-stargazing.jpg",
  },
  {
    id: 5,
    number: "05",
    title: "Spa Escapes",
    description:
      "Rejuvenate your body and soul with exclusive wellness treatments.",
    imagePath: "/images/experience-spa.jpg",
  },
  {
    id: 6,
    number: "06",
    title: "Local Culture Tours",
    description:
      "Immerse yourself in authentic local traditions and heritage.",
    imagePath: "/images/experience-culture.jpg",
  },
]

export default function ExperiencesSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        <div className="mb-10 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-start">
          <h2 className="font-serif text-3xl italic text-foreground md:text-4xl lg:text-5xl">
            Experiences That Speak
            <br />
            for Themselves
          </h2>


        </div>

        <div className="hidden h-[580px] gap-3 lg:flex">

          {experiences.map((exp, index) => {

            const isActive = activeIndex === index
            const shouldAnimate = index % 2 === 0

            return (
              <motion.div
                key={exp.id}
                className={`relative overflow-hidden rounded-2xl ${
                  index === 3 ? "text-right" : "text-left"
                }`}

                animate={
                  shouldAnimate
                    ? { flex: isActive ? 6 : 1 }
                    : { flex: 2 }
                }

                transition={{
                  duration: shouldAnimate ? 1.4 : 0.2,
                  delay: index * 0.15,
                  ease: "linear",
                }}

                onHoverStart={() => {
                  if (shouldAnimate) setActiveIndex(index)
                }}
                onHoverEnd={() => {
                  if (index !== 2) setActiveIndex(0)
                }}
              >

                <Image
                  src={exp.imagePath}
                  alt={exp.title}
                  fill
                  className={`object-cover ${
                    index === 4 ? "scale-125" : ""
                  }`}
                />

                <motion.div
                  className="absolute inset-0 bg-black"
                  animate={{
                    opacity: shouldAnimate
                      ? isActive
                        ? 0.1
                        : 0.8
                      : 0.5,
                  }}
                />

                <motion.div
                  className={`absolute inset-0 flex flex-col ${
                    index % 3 === 0
                      ? "justify-center items-end pr-10"
                      : "justify-end pl-3 pb-3"
                  }`}
                  animate={{
                    opacity: shouldAnimate ? (isActive ? 1 : 0.3) : 1,
                  }}
                >
                  <span className="text-6xl text-white/20 tracking-widest">
                    {exp.number}
                  </span>

                  <h3 className="text-xl text-white uppercase tracking-[6px]">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-white/60 w-[120px] leading-tight">
                    {exp.description.slice(0, 40)}...
                  </p>
                </motion.div>

              </motion.div>
            )
          })}

        </div>

        <div className="flex flex-col gap-4 lg:hidden">

          {experiences.map((exp) => (

            <div
              key={exp.id}
              className="relative h-[220px] overflow-hidden rounded-2xl"
            >
              <Image
                src={exp.imagePath}
                alt={exp.title}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-0 p-5">

                <span className="text-4xl text-white/40">
                  {exp.number}
                </span>

                <h3 className="text-lg text-white font-serif">
                  {exp.title}
                </h3>

                <p className="text-sm text-white/80">
                  {exp.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  )
}
