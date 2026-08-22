import Image from "next/image"
import { Info } from "lucide-react"

interface PromoBannerProps {
  tag: string
  title: string
  subtitle: string
  imagePath: string
  lightVariant?: boolean
}

export default function PromoBanner({
  tag,
  title,
  subtitle,
  imagePath,
  lightVariant = false,
}: PromoBannerProps) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* IMAGE */}
      <Image
        src={imagePath}
        alt={tag}
        fill
        className="object-cover"
      />

 
      <div className="absolute inset-0 bg-black/40" />


      <div className="relative z-10 flex aspect-[16/9] w-full flex-col justify-between p-6 text-white">

        <div>
        
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {tag}
          </span>

    
          <h3 className="mt-3 text-2xl font-bold leading-tight lg:text-3xl">
            {title}
          </h3>

      
          <p className="mt-1 text-sm lg:text-base text-white/90">
            {subtitle}
          </p>
        </div>

       
        <div className="flex items-center gap-1.5 text-xs text-white/70">
          <Info className="h-3.5 w-3.5" />
          <span>T&c*</span>
        </div>

      </div>
    </div>
  )
}
