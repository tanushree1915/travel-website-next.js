"use client"

import { MapPin, Calendar, Users, Search } from "lucide-react"

export default function SearchBar() {
  return (

    /* hidden on mobile, visible on tablet and desktop */
    <div className="hidden md:block w-full max-w-[920px] mx-auto">

      <div className="rounded-2xl bg-white shadow-xl">

        <div className="flex items-center">

          {/* Where To */}
          <div className="flex flex-1 items-center gap-3 px-6 py-6">
            <MapPin className="h-5 w-5 text-[#1a1a2e]" />

            <div>
              <p className="text-sm font-semibold text-[#1a1a2e]">
                Where To?
              </p>
              <p className="text-sm text-[#6b7280]">
                Destinations & Hotels
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-12 w-px bg-[#e5e7eb]" />

          {/* Dates */}
          <div className="flex flex-1 items-center gap-3 px-6 py-6">
            <Calendar className="h-5 w-5 text-[#1a1a2e]" />

            <div>
              <p className="text-sm font-semibold text-[#1a1a2e]">
                Check in - Check out
              </p>
              <p className="text-sm text-[#6b7280]">
                Add dates
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-12 w-px bg-[#e5e7eb]" />

          {/* Travelers */}
          <div className="flex flex-1 items-center gap-3 px-6 py-6">
            <Users className="h-5 w-5 text-[#1a1a2e]" />

            <div>
              <p className="text-sm font-semibold text-[#1a1a2e]">
                Travelers
              </p>
              <p className="text-sm text-[#6b7280]">
                Add guests
              </p>
            </div>
          </div>

          {/* Search button */}
          <div className="px-4">
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0ea5e9] text-white hover:bg-[#0284c7]">
              <Search className="h-6 w-6" />
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}
