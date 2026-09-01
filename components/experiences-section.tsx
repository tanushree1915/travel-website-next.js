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
    <section className="bg-background pt-0 pb-[60px] sm:pb-[60px] lg:pt-0 lg:pb-[100px]">
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

            return (
              <motion.div
                key={exp.id}
                className="relative overflow-hidden rounded-2xl"

                animate={{ flex: isActive ? 6 : 1 }}

                transition={{
                  duration: 1.4,
                  ease: "linear",
                }}

                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(0)}
              >

                <Image
                  src={exp.imagePath}
                  alt={exp.title}
                  fill
                  className="object-cover"
                />

                <motion.div
                  className="absolute inset-0 bg-black"
                  animate={{ opacity: isActive ? 0.1 : 0.8 }}
                />

                <motion.div
                  className="absolute inset-0 flex items-end justify-start p-4"
                  animate={{ opacity: isActive ? 1 : 0.3 }}
                >
                  {isActive ? (
                    <div className="flex flex-col items-start">
                      <span className="text-6xl text-white/20 tracking-widest">
                        {exp.number}
                      </span>

                      <h3 className="mt-2 text-xl text-white uppercase tracking-[6px]">
                        {exp.title}
                      </h3>

                      <p className="mt-2 max-w-[320px] text-xs text-white/60 leading-tight">
                        {exp.description}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-end gap-3 [writing-mode:vertical-rl] rotate-180">
                      <span className="text-4xl text-white/20 tracking-widest">
                        {exp.number}
                      </span>

                      <h3 className="whitespace-nowrap text-sm text-white uppercase tracking-[4px]">
                        {exp.title}
                      </h3>
                    </div>
                  )}
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