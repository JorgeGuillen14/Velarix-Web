'use client'

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { cn } from "@/lib/utils"
import { MeshGradient } from "@paper-design/shaders-react"
import {
  Zap,
  Shield,
  BarChart3,
  Layers,
  ArrowRight,
} from "lucide-react"

// ─── LAZY SPLINE (loads after page renders) ──────────────────
function LazySpline() {
  const [showSpline, setShowSpline] = useState(false)

  useEffect(() => {
    // Delay loading the heavy 3D scene so the rest of the page renders first
    const timer = setTimeout(() => setShowSpline(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!showSpline) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  // Dynamic import to avoid blocking initial render
  const { SplineScene } = require("@/components/ui/splite")
  return (
    <SplineScene
      scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
      className="w-full h-full"
    />
  )
}

// ─── ANIMATED SHADER BACKGROUND ──────────────────────────────
function ShaderBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <MeshGradient
        className="w-full h-full"
        colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
        speed={0.6}
        distortion={0.8}
        swirl={0.1}
      />
      {/* Subtle ambient glow overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "3.3s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/[0.03] rounded-full blur-xl animate-pulse"
          style={{ animationDuration: "6.6s", animationDelay: "0.5s" }}
        />
      </div>
    </div>
  )
}

// ─── HERO SECTION ─────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative w-full">
      <Card className="w-full min-h-[600px] md:min-h-[700px] bg-black/60 backdrop-blur-sm border-0 rounded-none overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="flex flex-col md:flex-row h-full min-h-[600px] md:min-h-[700px]">
          {/* Left content */}
          <div className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center">
            <p className="text-sm uppercase tracking-widest text-neutral-400 mb-4">
              Welcome to Velarix
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
              Build the Future
            </h1>
            <p className="mt-6 text-neutral-300 max-w-lg text-lg leading-relaxed">
              {/* Placeholder — replace with your copy */}
              Empowering teams to ship faster with next-generation tools.
              Placeholder text for your value proposition.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
              <button className="px-8 py-3 rounded-full border border-neutral-700 text-white font-medium hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Right — 3D scene (lazy loaded) */}
          <div className="flex-1 relative min-h-[300px] md:min-h-0">
            <LazySpline />
          </div>
        </div>
      </Card>
    </section>
  )
}

// ─── FEATURES SECTION (Glowing Grid) ──────────────────────────
interface GridItemProps {
  area: string
  icon: React.ReactNode
  title: string
  description: string
}

function GridItem({ area, icon, title, description }: GridItemProps) {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-black/70 backdrop-blur-md p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-white/5 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

function FeaturesSection() {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Everything you need
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            {/* Placeholder — replace with your copy */}
            Placeholder description for your features section. Describe what makes Velarix special.
          </p>
        </div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Zap className="h-4 w-4" />}
            title="Feature One"
            description="Placeholder text — describe your first feature here."
          />
          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Shield className="h-4 w-4" />}
            title="Feature Two"
            description="Placeholder text — describe your second feature here."
          />
          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<BarChart3 className="h-4 w-4" />}
            title="Feature Three"
            description="Placeholder text — describe your third feature here."
          />
          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<Layers className="h-4 w-4" />}
            title="Feature Four"
            description="Placeholder text — describe your fourth feature here."
          />
          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<Zap className="h-4 w-4" />}
            title="Feature Five"
            description="Placeholder text — describe your fifth feature here."
          />
        </ul>
      </div>
    </section>
  )
}

// ─── CTA SECTION ──────────────────────────────────────────────
function CTASection() {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-20 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Ready to get started?
        </h2>
        <p className="mt-6 text-neutral-400 text-lg max-w-xl mx-auto">
          {/* Placeholder — replace with your copy */}
          Placeholder CTA description. Tell your visitors why they should take action now.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2 mx-auto sm:mx-0">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </button>
          <button className="px-10 py-4 rounded-full border border-neutral-700 text-white font-semibold hover:bg-white/10 transition-colors mx-auto sm:mx-0">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="dark min-h-screen bg-black relative">
      {/* Animated mesh gradient background — fixed behind all sections */}
      <ShaderBackground />

      {/* Page content layered on top */}
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </div>
    </main>
  )
}
