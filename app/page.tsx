import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import DiscoverStays from "@/components/discover-stays"
import TravelSimbaExclusives from "@/components/travel-simba-exclusives"
import ExploreDestinations from "@/components/explore-destinations"
import ExperiencesSection from "@/components/experiences-section"
import FeaturesStrip from "@/components/features-strip"
import TestimonialsSection from "@/components/testimonials-section"
import BlogSection from "@/components/blog-section"
import CtaSection from "@/components/cta-section"
import Footer from "@/components/footer"


export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <DiscoverStays />
      <TravelSimbaExclusives />
      <ExploreDestinations />
      <ExperiencesSection />
      <FeaturesStrip />
      <TestimonialsSection />
      <BlogSection />
      <CtaSection />
      <Footer />
     
    </main>
  )
}
