"use client"
import Hero from "@/components/sections/hero"
import LogosSection from "@/components/sections/logos-section"
import FeaturesSection from "@/components/sections/features-section"
import InterfaceShowcase from "@/components/sections/interface-showcase"
import HowItWorks from "@/components/sections/how-it-works"
import Testimonials from "@/components/sections/testimonials"
import Pricing from "@/components/sections/pricing"
import FaqSection from "@/components/sections/faq-section"
import CtaSection from "@/components/sections/cta-section"
import Footer from "@/components/sections/footer"
import Header from "@/components/sections/header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <Hero />
        <LogosSection />
        <FeaturesSection />
        <InterfaceShowcase />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  )
}

