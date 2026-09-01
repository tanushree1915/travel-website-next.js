"use client"

import Image from "next/image"

interface StayCardProps {
  label: string
  imagePath: string
  className?: string
}

export default function StayCard({
  label,
  imagePath,
  className,
}: StayCardProps) {
  return (
        <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={imagePath}
        alt={label}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg sm:text-xl font-semibold">
          {label}
        </h3>
      </div>
    </div>
  )
}
