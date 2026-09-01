"use client"

import { MapPin, Calendar, Users, Search } from "lucide-react"

export default function SearchBar() {
  return (
    <>
      {/* Mobile: fields stacked vertically in one card (Figma "Frame 155": 284px wide, 20px gap) */}
      <div className="flex md:hidden w-full max-w-[284px] flex-col gap-5 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 shrink-0 text-[#1a1a2e]" />
          <div>
            <p className="text-sm font-semibold text-[#1a1a2e]">Where To?</p>
            <p className="text-xs text-[#6b7280]">Destinations & Hotels</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 shrink-0 text-[#1a1a2e]" />
          <div>
            <p className="text-sm font-semibold text-[#1a1a2e]">Check in - Check out</p>
            <p className="text-xs text-[#6b7280]">Add dates</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 shrink-0 text-[#1a1a2e]" />
          <div>
            <p className="text-sm font-semibold text-[#1a1a2e]">Travelers</p>
            <p className="text-xs text-[#6b7280]">Add guests</p>
          </div>
        </div>

        {/* Round 48x48 button — same "Component 9" used on desktop */}
        <button className="flex h-[48px] w-[48px] shrink-0 items-center justify-center self-end rounded-full bg-[#0ea5e9] text-white hover:bg-[#0284c7]">
          <Search className="h-5 w-5" />
        </button>

      </div>

      {/* Desktop / tablet: single-row search bar */}
      <div className="hidden md:block w-full max-w-[843px] mx-auto">

        <div className="flex items-center justify-between rounded-[12px] border border-[#e5e7eb] bg-white h-[66px] pl-[20px] pr-[8px] lg:pl-[40px]">

          {/* Fields group */}
          <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-6">

            <div className="flex min-w-0 items-center gap-2 lg:gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-[#1a1a2e]" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1a1a2e]">Where To?</p>
                <p className="truncate text-sm text-[#6b7280]">Destinations & Hotels</p>
              </div>
            </div>

            <div className="h-8 w-px shrink-0 bg-[#e5e7eb]" />

            <div className="flex min-w-0 items-center gap-2 lg:gap-3">
              <Calendar className="h-5 w-5 shrink-0 text-[#1a1a2e]" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1a1a2e]">Check in - Check out</p>
                <p className="truncate text-sm text-[#6b7280]">Add dates</p>
              </div>
            </div>

            <div className="h-8 w-px shrink-0 bg-[#e5e7eb]" />

            <div className="flex min-w-0 items-center gap-2 lg:gap-3">
              <Users className="h-5 w-5 shrink-0 text-[#1a1a2e]" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1a1a2e]">Travelers</p>
                <p className="truncate text-sm text-[#6b7280]">Add guests</p>
              </div>
            </div>

          </div>

          {/* Search button — sits separately, pinned to the right */}
          <button className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#0ea5e9] text-white hover:bg-[#0284c7] ml-2">
            <Search className="h-5 w-5" />
          </button>

        </div>

      </div>
    </>
  )
}