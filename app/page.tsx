
import HeroSection from "@/components/hero-section"
import DiscoverStays from "@/components/discover-stays"
import TravelSimbaExclusives from "@/components/travel-simba-exclusives"
import ExploreDestinations from "@/components/explore-destinations"
import PromoBannersSection from "@/components/promo-banners-section"
import ExperiencesSection from "@/components/experiences-section"
import FeaturesStrip from "@/components/features-strip"
import TestimonialsSection from "@/components/testimonials-section"
import BlogSection from "@/components/blog-section"
import CtaSection from "@/components/cta-section"
import Footer from "@/components/footer"

import {
  getHeroData,
  getDealsData,
  getDestinationsData,
  getTestimonialsData,
  getInsightsData,
  getPromosData,
} from "@/lib/cms-data"

export const revalidate = 0

export default async function Page() {
  const [
    heroData,
    dealsData,
    destinationsData,
    testimonialsData,
    insightsData,
    promosData,
  ] = await Promise.all([
    getHeroData(),
    getDealsData(),
    getDestinationsData(),
    getTestimonialsData(),
    getInsightsData(),
    getPromosData(),
  ])

  return (
    <main>
      

      <HeroSection data={heroData} />

      <DiscoverStays />

      <TravelSimbaExclusives data={dealsData} />

      <ExploreDestinations data={destinationsData} />

      <PromoBannersSection data={promosData} />

      <ExperiencesSection />

      <FeaturesStrip />

      <TestimonialsSection data={testimonialsData} />

      <BlogSection data={insightsData} />

      <CtaSection />

      <Footer />
    </main>
  )
}