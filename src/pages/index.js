import React from "react";
import Seo from "../components/seo";
import FadeIn from "../components/FadeIn";
import { Stagger, StaggerItem } from "../components/Stagger";import DivisionTabs from "../components/DivisionTabs";
import EventShowcase from "../components/EventShowcase";
import MajorEventCountdown from "../components/MajorEventCountdown";

import mensFitness from "../data/divisions/images/mens-fitness.jpg";
import mensPhysique from "../data/divisions/images/mens-physique.jpg";
import mensClassicPhysique from "../data/divisions/images/mens-classic-physique.jpg";
import bodybuilding from "../data/divisions/images/bodybuilding.jpg";
import msWellness from "../data/divisions/images/ms-wellness.jpg";
import msSwimsuit from "../data/divisions/images/ms-swimsuit.jpg";
import msFitness from "../data/divisions/images/ms-fitness.jpg";
import msFigure from "../data/divisions/images/ms-figure.jpg";
import msSportsModel from "../data/divisions/images/ms-sports-model.jpg";
import msBikiniModel from "../data/divisions/images/ms-bikini-model.jpg";
import hero from "../images/hero.jpg";
import hero1 from "../images/hero1.png"


function FullBleed({ children, className = "", ...rest }) {
  return (
    <div
      {...rest}
      className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${className}`}
    >
      {children}
    </div>
  );
}

const slides = [
  {
    key: "mens-fitness",
    title: "Men's Fitness",
    headline: "Men's Fitness",
    body:
    "Athletic and lean with moderate muscle, visible abs, and balance between upper and lower body. Less extreme than Physique or Bodybuilding.",
    ctaText: "Learn More",
    ctaHref: "/divisions/mens-fitness",
    image: mensFitness,
    imageAlt: "Athlete jumping with lightning graphics",
    imageSide: "left",
  },
  {
    key: "mens-physique",
    title: "Men's Physique",
    headline: "Men's Physique",
    body:
     "Upper-body focused category with broad shoulders, small waist, and strong V-taper. Highly conditioned with visible abs, but no leg development required like in Bodybuilding.",
    ctaText: "Learn More",
    ctaHref: "/divisions/mens-physique",
    image: mensPhysique,
    imageAlt: "Athlete flipping with lightning graphics",
    imageSide: "left",
  },
  {
    key: "mens-classic-physique",
    title: "Men's Classic Physique",
    headline: "Men's Classic Physique",
    body:
      "Inspired by the Golden Era of bodybuilding. Emphasises symmetry, proportion, and classic lines over sheer size. Equal conditioning to Bodybuilding but less mass.",
    ctaText: "Learn More",
    ctaHref: "/divisions/mens-classic-physique",
    image: mensClassicPhysique,
    imageAlt: "Basketball player dunking with lightning graphics",
    imageSide: "left",
  },
  {
    key: "bodybuilding",
    title: "Bodybuilding",
    headline: "Bodybuilding",
    body:
      "Bodybuilding division, the most extreme and traditional category. Competitors must have visible definition on every muscle, with serious conditioning and top level aesthetics.",
    ctaText: "Learn More",
    ctaHref: "/divisions/bodybuilding",
    image: bodybuilding,
    imageAlt: "Game controller with lightning graphics",
    imageSide: "left",
  },
  {
    key: "ms-bikini-model",
    title: "Ms Bikini Model",
    headline: "Ms Bikini Model",
    body:
      "Entry-level female division emphasising beauty, balance, and a shapely, toned physique. Competitors should be lean but not overly muscular, with no visible six-pack abs but a flat midsection.",
    ctaText: "Learn More",
    ctaHref: "/divisions/ms-bikini-model",
    image: msBikiniModel,
    imageAlt: "Game controller with lightning graphics",
    imageSide: "left",
  },
  {
    key: "ms-swimsuit",
    title: "Ms Swimsuit",
    headline: "Ms Swimsuit",
    body:
      "Similar to Bikini but in a one-piece swimsuit. Emphasises toned condition, beauty, and stage confidence over muscularity.",
    ctaText: "Learn More",
    ctaHref: "/divisions/ms-swimsuit",
    image: msSwimsuit,
    imageAlt: "Game controller with lightning graphics",
    imageSide: "left",
  },
  {
      key: "ms-wellness",
      title: "Ms Wellness",
      headline: "Ms Wellness",
      body:
        "Ms Wellness is the perfect category for athletes with well developed lower bodies, showing clear disparity between upper and lower. This is the only category in ICN where the balance of the physique must favour the lower body over equal symmetry.",
      ctaText: "Learn More",
      ctaHref: "/divisions/ms-wellness",
      image: msWellness,
      imageAlt: "Game controller with lightning graphics",
      imageSide: "left",
    },
    {
      key: "ms-sports-model",
      title: "Ms Sports Model",
      headline: "Ms Sports Model",
      body:
        "Athletic, sporty look with more muscularity than Bikini, including visible abs, capped shoulders, and back/leg definition. Slightly softer than Fitness Model.",
      ctaText: "Learn More",
      ctaHref: "/divisions/ms-sports-model",
      image: msSportsModel,
      imageAlt: "Game controller with lightning graphics",
      imageSide: "left",
    },
    {
      key: "ms-fitness",
      title: "Ms Fitness",
      headline: "Ms Fitness",
      body:
        "Balanced muscularity with visible abs, capped shoulders, and back definition. More conditioned than Sports Model, less muscular than Figure.",
      ctaText: "Learn More",
      ctaHref: "/divisions/ms-fitness",
      image: msFitness,
      imageAlt: "Game controller with lightning graphics",
      imageSide: "left",
    },
    {
      key: "ms-figure",
      title: "Ms Figure",
      headline: "Ms Figure",
      body:
        "One of the most muscular female divisions, with high conditioning while keeping femininity. Requires wide back, capped shoulders, visible six-pack, and leg muscle separation.",
      ctaText: "Learn More",
      ctaHref: "/divisions/ms-figure",
      image: msFigure,
      imageAlt: "Game controller with lightning graphics",
      imageSide: "left",
    },

];

  // A thin, blurred gradient seam you can pin to the top or bottom edge
  const EdgeFade = ({
    position = "top",                  // "top" | "bottom"
    from = "from-black/95",           // use your design token e.g. "from-b/95"
    to = "to-transparent",
    height = "h-16",                  // tweak to taste: h-12, h-20, etc.
    blur = "blur-sm",                 // blur-none | blur-sm | blur
    className = "",
  }) => (
    <div
      className={[
        "pointer-events-none absolute inset-x-0",
        position === "top" ? "top-0 bg-gradient-to-b" : "bottom-0 bg-gradient-to-t",
        from, to, height, blur, className,
      ].join(" ")}
    />
  );



export default function App() {
  return (
    <>
      <Seo title="Home" description="Welcome to ICN Australia" />

      {/* Hero with overlay, cropped bottom, full width */}
      {/* Hero with centered image, blurred side fill, cropped from bottom */}
{/* Hero: centered image with blurred side fill, cropped from bottom */}
{/* Hero: centered image, blurred side fill, cropped from bottom (uses /static/hero.jpg) */}
<FullBleed className="relative overflow-hidden">
  <div className="relative">
    {/* Full width image */}
    <img
      src={hero1}
      alt="ICN Australia Hero"
      className="w-full h-auto md:h-[55vh] lg:h-[60vh] xl:h-[65vh] object-cover object-top"
      loading="eager"
      decoding="async"
    />
  </div>

  {/* Text section under image */}
  <div className="bg-white py-10 px-4 sm:px-6 lg:px-8 text-center">
    <FadeIn y={40}>
      <h1 className="text-a text-5xl sm:text-7xl font-extrabold">
        ICN is The Home of Australia’s Natural Bodybuilding and Modelling Elite
      </h1>
    </FadeIn>
  </div>
</FullBleed>






      {/* Red background (a), black text (b), white CTA (c) */}
      <FullBleed id="divisions" className="bg-a text-b">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans">
          <FadeIn y={40}>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
              Find Your Division
            </h1>
          </FadeIn>
          <FadeIn y={24} delay={0.08}>
            <p className="text-lg sm:text-xl max-w-3xl mb-8">
              Step on stage with confidence! Whether you’re chasing the
              golden-era look, showcasing a lean athletic physique, or making
              your debut in a beginner-friendly category, there’s a division for
              every athlete. Explore the options below and find the one that
              best fits your journey.
            </p>
          </FadeIn>
          <FadeIn y={24} delay={0.16} className="flex justify-center">
            <DivisionTabs items={slides} />
          </FadeIn>
          <FadeIn y={24} delay={0.24} className="flex justify-center">
            <a
              href="https://www.icompetenatural.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border-2 font-bold rounded-full px-6 py-3 transition-colors text-c border-c hover:bg-c hover:text-a mt-8"
            >
              Register Now
            </a>
          </FadeIn>
        </div>
      </FullBleed>

      {/* Black background (b), white text (c), red CTA (a) */}
      <FullBleed className="bg-b text-c">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans">
          <FadeIn y={40}>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
              Come to Australia's Biggest Bodybuilding Event of the Year
            </h1>
          </FadeIn>
        </div>
        <div className="relative">
          <MajorEventCountdown />
          <EdgeFade
            position="bottom"
            from="from-b/95"
            to="to-transparent"
            height="h-20"
            blur="blur"
          />
        </div>
      </FullBleed>

      {/* White background (c), red text (a), black CTA (b) */}
      <FullBleed className="bg-c text-a">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans">
          <FadeIn y={40}>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
              Compete at an Event, Wherever You Are
            </h1>
          </FadeIn>
          <FadeIn y={24} delay={0.08}>
            <p className="text-lg sm:text-xl max-w-3xl mb-8">
              From local classics to national showdowns, ICN events bring
              athletes together across Australia. Step onto the stage, showcase
              your hard work, and experience the energy of natural
              competition—no matter where you are.
            </p>
          </FadeIn>
          <EventShowcase />
        </div>
      </FullBleed>
    </>
  );
}

