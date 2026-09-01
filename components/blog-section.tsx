"use client"

import { useState, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface BlogPost {
  id?: number
  title: string
  description: string
  image: string
  date: string
  categories: string[]
}

interface BlogSectionProps {
  data?: BlogPost[]
}

const defaultBlogPosts: BlogPost[] = [
  {
    categories: ["Market Insights"],
    date: "Jan 25, 2025",
    title: "Top 7 Things to Look for When Booking a Hotel",
    description:
      "A new premium residential complex opens with modern amenities and ocean views.",
    image: "/images/blog/blog-1.jpg",
  },
  {
    categories: ["Market Insights", "Hotel Booking"],
    date: "Jan 25, 2025",
    title: "Hidden Gems Near Our Hotel You Can't Miss",
    description:
      "Market trends show increased interest from both local and foreign investors.",
    image: "/images/blog/blog-2.jpg",
  },
  {
    categories: ["Market Insights"],
    date: "Jan 25, 2025",
    title: "What to Expect During Your Stay",
    description:
      "Office and retail spaces now open for lease in prime Masaki locations.",
    image: "/images/blog/blog-3.jpg",
  },
  {
    categories: ["Travel Tips"],
    date: "Feb 10, 2025",
    title: "Essential Packing Guide for Tropical Destinations",
    description:
      "Everything you need to know before heading to your dream beach getaway.",
    image: "/images/blog/blog-1.jpg",
  },
  {
    categories: ["Hotel Booking"],
    date: "Feb 18, 2025",
    title: "How to Get the Best Deals on Luxury Hotels",
    description:
      "Insider tips on scoring premium rooms at a fraction of the listed price.",
    image: "/images/blog/blog-2.jpg",
  },
  {
    categories: ["Travel Tips", "Market Insights"],
    date: "Mar 05, 2025",
    title: "Sustainable Travel: A Guide for Conscious Explorers",
    description:
      "How to enjoy world-class hospitality while minimizing your carbon footprint.",
    image: "/images/blog/blog-3.jpg",
  },
]

const CARDS_PER_PAGE = 3

export default function BlogSection({
  data = [],
}: BlogSectionProps) {
  const [mobilePage, setMobilePage] = useState(0)
  const [desktopPage, setDesktopPage] = useState(0)
  const mobileSliderRef = useRef<HTMLDivElement>(null)

  const blogPosts = [
    ...defaultBlogPosts,
    ...data,
  ]

  const totalMobilePages = blogPosts.length

  const totalDesktopPages = Math.max(
    1,
    Math.ceil(blogPosts.length / CARDS_PER_PAGE)
  )

  const scrollToMobilePage = useCallback((page: number) => {
    const slider = mobileSliderRef.current
    if (!slider) return

    slider.scrollTo({
      left: slider.clientWidth * page,
      behavior: "smooth",
    })

    setMobilePage(page)
  }, [])

  const goDesktopPrev = () =>
    setDesktopPage((p) => Math.max(0, p - 1))

  const goDesktopNext = () =>
    setDesktopPage((p) =>
      Math.min(totalDesktopPages - 1, p + 1)
    )

  const visiblePosts = blogPosts.slice(
    desktopPage * CARDS_PER_PAGE,
    desktopPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  )

  return (
    <section className="px-6 pt-0 pb-16 md:px-12 lg:px-20 lg:pt-0 lg:pb-16">

      <h2 className="mb-12 font-serif text-3xl italic text-[#1a1a2e] md:text-4xl lg:text-5xl">
        Latest Insights & Updates
      </h2>

      {/* Mobile */}
      <div className="block md:hidden">
        <div
          ref={mobileSliderRef}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        >
          {blogPosts.map((post, index) => (
            <div
              key={
                post.id
                  ? `cms-${post.id}`
                  : `default-${index}`
              }
              className="w-full flex-shrink-0 snap-start px-1"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">

          <span className="text-sm font-medium text-[#1a1a2e]">
            {String(mobilePage + 1).padStart(2, "0")} /{" "}
            {String(totalMobilePages).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                scrollToMobilePage(
                  Math.max(0, mobilePage - 1)
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9d1db]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() =>
                scrollToMobilePage(
                  Math.min(
                    totalMobilePages - 1,
                    mobilePage + 1
                  )
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9d1db]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">

        <div className="grid grid-cols-3 gap-8">
          {visiblePosts.map((post, index) => (
            <BlogCard
              key={
                post.id
                  ? `cms-${post.id}`
                  : `default-${index}`
              }
              post={post}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">

          <span className="text-sm font-medium text-[#1a1a2e]">
            {String(desktopPage + 1).padStart(2, "0")} /{" "}
            {String(totalDesktopPages).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-3">

            <button
              onClick={goDesktopPrev}
              disabled={desktopPage === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9d1db] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={goDesktopNext}
              disabled={
                desktopPage === totalDesktopPages - 1
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9d1db] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </section>
  )
}

function BlogCard({
  post,
}: {
  post: BlogPost
}) {
  return (
    <article>

      <div className="relative h-[260px] w-full overflow-hidden rounded-2xl">

        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 120vw, (max-width: 1200px) 50vw, 33vw"
        />

      </div>

      <div className="pt-4">

        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

          <div className="flex flex-wrap gap-2">

            {post.categories.map((cat, i) => (
              <span
                key={i}
                className="rounded-full border border-[#c9d1db] px-3 py-1 text-xs font-medium text-[#1a1a2e]"
              >
                {cat}
              </span>
            ))}

          </div>

          <span className="text-xs text-[#6b7280]">
            {post.date}
          </span>

        </div>

        <h3 className="mb-2 text-base font-semibold text-[#1a1a2e]">
          {post.title}
        </h3>

        <p className="text-sm leading-relaxed text-[#6b7280]">
          {post.description}
        </p>

      </div>

    </article>
  )
}