"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Heart, Menu, X, ArrowRight } from "lucide-react"

const navLinks = [
  { label: "Exclusive Club Deals", href: "#" },
  { label: "Become A Partner", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Free VIP ZNZ Ferry", href: "#" },
  { label: "Bookings4Education", href: "#" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="absolute inset-x-0 top-0 z-50 w-full px-6 pt-5">
      


 
      <div className="flex w-full items-center justify-between">

  
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Travel Simba"
            width={160}
            height={60}
            priority
            className="object-contain"
          />
        </Link>


        <div className="hidden xl:flex items-center gap-10 rounded-none border border-white/20 bg-white/10 px-2 py-3 backdrop-blur-md">

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white whitespace-nowrap transition hover:text-white/80"
            >
              {link.label}
            </Link>
          ))}

        </div>


    
        <div className="hidden xl:flex items-center gap-4">

          <button className="flex items-center gap-2 rounded-none border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md transition hover:bg-white/20">

            <Image
              src="/flags/flag.png"
              alt="US Flag"
              width={24}
              height={16}
              className="object-cover"
            />

            <span className="text-sm font-medium text-white">
              USD
            </span>

            <ChevronDown className="h-4 w-4 text-white" />

          </button>



          <button
            aria-label="Wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-none border border-white/20 bg-white/10 backdrop-blur-md transition hover:bg-white/20"
          >
            <Heart className="h-5 w-5 text-white" />
          </button>

          <Link
            href="#"
            className="flex items-center gap-4 rounded-none bg-[#2E86AB] px-3 py-2 font-medium text-white transition hover:bg-[#256b8a]"
          >

            SIGN IN NOW

            <span className="flex h-8 w-8 items-center justify-center rounded-none bg-white">

              <ArrowRight className="h-4 w-4 text-[#2E86AB]" />

            </span>

          </Link>

        </div>


      
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden text-white"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>


      {mobileOpen && (

        <div className="absolute left-0 right-0 top-full mt-4 rounded-none border border-white/10 bg-[#1a1a2e]/95 p-6 backdrop-blur-md xl:hidden">

          <div className="flex flex-col gap-4">

            {navLinks.map((link) => (

              <Link
                key={link.label}
                href={link.href}
                className="text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>

            ))}


            <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4">

              <button className="flex items-center gap-2 text-white">

                <Image
                  src="/flags/flag.png"
                  alt="US Flag"
                  width={24}
                  height={16}
                  className="object-cover"
                />

                USD
              </button>

              <Heart className="h-5 w-5 text-white" />

            </div>

          </div>

        </div>

      )}

    </nav>
  )
}
