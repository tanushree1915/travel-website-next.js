"use client"

import { MapPin, Calendar, Users, Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="hidden md:block w-full max-w-[843px] mx-auto">

      <div className="flex items-center justify-between rounded-[12px] border border-[#e5e7eb] bg-white h-[66px] pl-[40px] pr-[8px]">

        {/* Fields group */}
        <div className="flex items-center gap-6">

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-[#1a1a2e]" />
            <div>
              <p className="text-sm font-semibold text-[#1a1a2e]">Where To?</p>
              <p className="text-sm text-[#6b7280]">Destinations & Hotels</p>
            </div>
          </div>

          <div className="h-8 w-px bg-[#e5e7eb]" />

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#1a1a2e]" />
            <div>
              <p className="text-sm font-semibold text-[#1a1a2e]">Check in - Check out</p>
              <p className="text-sm text-[#6b7280]">Add dates</p>
            </div>
          </div>

          <div className="h-8 w-px bg-[#e5e7eb]" />

          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-[#1a1a2e]" />
            <div>
              <p className="text-sm font-semibold text-[#1a1a2e]">Travelers</p>
              <p className="text-sm text-[#6b7280]">Add guests</p>
            </div>
          </div>

        </div>

        {/* Search button — sits separately, pinned to the right */}
        <button className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#0ea5e9] text-white hover:bg-[#0284c7]">
          <Search className="h-5 w-5" />
        </button>

      </div>

    </div>
  )
}