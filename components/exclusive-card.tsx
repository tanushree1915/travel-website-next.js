"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"

interface ExclusiveCardProps {
  name: string
  location: string
  price: string
  badge?: string
  imagePaths: string[]
}

export default function ExclusiveCard({
  name,
  location,
  price,
  badge,
  imagePaths,
}: ExclusiveCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const totalImages = imagePaths.length

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? totalImages - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === totalImages - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="flex min-w-[280px] flex-shrink-0 flex-col md:min-w-[300px] lg:min-w-[320px]">

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">

        <Image
          src={imagePaths[currentSlide]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover"
        />

        {badge && (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-[#e53935] px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsFavorited(!isFavorited)
          }}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorited
                ? "fill-[#1a9fd4] text-[#1a9fd4]"
                : "fill-transparent text-[#1a9fd4]"
            }`}
          />
        </button>

        {totalImages > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            className="absolute left-0 top-1/2 z-10 flex h-[28px] w-[28px] -translate-y-1/2 items-center justify-center bg-white"
            style={{ borderRadius: "0 16px 16px 0" }}
          >
            <ChevronLeft className="h-4 w-4 text-gray-900" />
          </button>
        )}

        {totalImages > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-0 top-1/2 z-10 flex h-[28px] w-[28px] -translate-y-1/2 items-center justify-center bg-white"
            style={{ borderRadius: "16px 0 0 16px" }}
          >
            <ChevronRight className="h-4 w-4 text-gray-900" />
          </button>
        )}

        {totalImages > 1 && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {imagePaths.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentSlide(idx)
                }}
                className={`h-2 w-2 rounded-full ${
                  idx === currentSlide
                    ? "bg-white"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

      </div>

      <div className="flex flex-col gap-0.5 pt-3">
        <h3 className="truncate text-base font-bold text-foreground">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {location}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Starting from
        </p>
        <p className="text-base font-bold text-foreground">
          {price}
        </p>
      </div>

    </div>
  )
}
