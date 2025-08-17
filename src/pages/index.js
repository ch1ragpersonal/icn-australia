import React from "react";
import Seo from "../components/seo";
import EventShowcase from "../components/EventShowcase";
import DivisionTabs from "../components/DivisionTabs";
import mensFitness from "../images/divisions/mens-fitness.jpg"
import mensPhysique from "../images/divisions/mens-physique.jpg"
import mensClassicPhysique from "../images/divisions/mens-classic-physique.jpg"
import bodybuilding from "../images/divisions/bodybuilding.jpg"
import msWellness from "../images/divisions/ms-wellness.jpg"
import msSwimsuit from "../images/divisions/ms-swimsuit.jpg"
import msFitness from "../images/divisions/ms-fitness.jpg"
import msFigure from "../images/divisions/ms-figure.jpg"
import msSportsModel from "../images/divisions/ms-sports-model.jpg"
import msBikiniModel from "../images/divisions/ms-bikini-model.jpg"
import FadeIn from "../components/FadeIn";
import { Stagger, StaggerItem } from "../components/Stagger";
import MajorEventCountdown from "../components/MajorEventCountdown";

function FullBleed({ children, className = "" }) {
  return (
    <div
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
    headline: "JUMPS AND ACROBATICS FOR BEGINNERS AND EXPERTS",
    body:
      "Trampolining is the ideal sport for letting off steam, whether you're an adult or a child. When you feel the need to expend energy, head to the Men's Fitness at Xperience Park to practice somersaults and other somersaults in complete safety!",
    ctaText: "Learn More",
    ctaHref: "/mens-fitness",
    image: mensFitness,
    imageAlt: "Athlete jumping with lightning graphics",
    imageSide: "left",
  },
  {
    key: "mens-physique",
    title: "Men's Phyique",
    headline: "OBSTACLE COURSE: BECOME A WARRIOR",
    body:
      "Challenges to complete solo, or challenge friends and family, for an ever-faster time. The Ninja Warrior course is for all jumpers aged 7 and up.",
    ctaText: "Learn More",
    ctaHref: "/mens-physique",
    image: mensPhysique,
    imageAlt: "Athlete flipping with lightning graphics",
    imageSide: "left",
  },
  {
    key: "mens-classic-physique",
    title: "Men's Classic Physique",
    headline: "THE BASKETBALL VERSION OF CONNECT 4",
    body:
      "The Connect 4 board game takes on a new dimension here. This game involves chaining basketball shots to try to form a line of 4 balls of the same color.",
    ctaText: "Learn More",
    ctaHref: "/mens-classic-physique",
    image: mensClassicPhysique,
    imageAlt: "Basketball player dunking with lightning graphics",
    imageSide: "left",
  },
  {
    key: "bodybuilding",
    title: "Bodybuilding",
    headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
    body:
      "Xperience Park is also an arcade and puck games area with free access.",
    ctaText: "Learn More",
    ctaHref: "/bodybuilding",
    image: bodybuilding,
    imageAlt: "Game controller with lightning graphics",
    imageSide: "left",
  },
  {
      key: "ms-wellness",
      title: "Ms Wellness",
      headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
      body:
        "Xperience Park is also an arcade and puck games area with free access.",
      ctaText: "Learn More",
      ctaHref: "/ms-wellness",
      image: msWellness,
      imageAlt: "Game controller with lightning graphics",
      imageSide: "left",
    },
    {
      key: "ms-swimsuit",
      title: "Ms Swimsuit",
      headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
      body:
        "Xperience Park is also an arcade and puck games area with free access.",
      ctaText: "Learn More",
      ctaHref: "/ms-swimsuit",
      image: msSwimsuit,
      imageAlt: "Game controller with lightning graphics",
      imageSide: "left",
    },
    {
      key: "ms-fitness",
      title: "Ms Fitness",
      headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
      body:
        "Xperience Park is also an arcade and puck games area with free access.",
      ctaText: "Learn More",
      ctaHref: "/ms-fitness",
      image: msFitness,
      imageAlt: "Game controller with lightning graphics",
      imageSide: "left",
    },
    {
      key: "ms-figure",
      title: "Ms Figure",
      headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
      body:
        "Xperience Park is also an arcade and puck games area with free access.",
      ctaText: "Learn More",
      ctaHref: "/ms-figure",
      image: msFigure,
      imageAlt: "Game controller with lightning graphics",
      imageSide: "left",
    },
    {
      key: "ms-sports-model",
      title: "Ms Sports Model",
      headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
      body:
        "Xperience Park is also an arcade and puck games area with free access.",
      ctaText: "Learn More",
      ctaHref: "/ms-sports-model",
      image: msSportsModel,
      imageAlt: "Game controller with lightning graphics",
      imageSide: "left",
    },
    {
      key: "ms-bikini-model",
      title: "Ms Bikini Model",
      headline: "COME AND HAVE FUN WITH OUR DIFFERENT GAMES",
      body:
        "Xperience Park is also an arcade and puck games area with free access.",
      ctaText: "Learn More",
      ctaHref: "/ms-bikini-model",
      image: msBikiniModel,
      imageAlt: "Game controller with lightning graphics",
      imageSide: "left",
    },
];

export default function App() {
  return (
    <>
      <Seo title="Home" description="Welcome to ICN Australia" />

      {/* Hero */}
      <FullBleed className="min-h-[70vh] sm:min-h-[80vh]">
        <div
          className="min-h-[70vh] sm:min-h-[80vh] bg-cover bg-center flex items-end"
          style={{ backgroundImage: "url(/images/placeholder-hero.jpg)" }}
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Stagger>
              <StaggerItem>
                <h1 className="text-a text-6xl sm:text-7xl font-extrabold drop-shadow-md mb-3">
                  ICN is The Home of Australia’s Natural Bodybuilding Elite
                </h1>
              </StaggerItem>
            </Stagger>
            <Stagger>
              <StaggerItem>
                <p className="text-a text-lg sm:text-xl max-w-3xl drop-shadow">
                  Compete at The Pinnacle of Natural Physique Competition.
                </p>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </FullBleed>

      {/* Red background (a), black text (b), white CTA (c) */}
      <FullBleed className="bg-a text-b">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans">
          <FadeIn y={40}>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
              Find Your Division
            </h1>
          </FadeIn>
          <FadeIn y={24} delay={0.08}>
            <p className="text-lg sm:text-xl max-w-3xl mb-8">
            Giant text block to test visual rhythm and spacing. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Integer luctus, velit
            at volutpat interdum, sem urna fermentum metus, ut tincidunt risus
            mauris non justo.
          </p>
          </FadeIn>
          <FadeIn y={24} delay={0.16} className="flex justify-center">
            <DivisionTabs items={slides}/>
          </FadeIn>
          <FadeIn y={24} delay={0.24} className="flex justify-center">
            <a
              href="https:/ /www.icompetenatural.com/"
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

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Come to Australia's Biggest Bodybuilding Event of the Year
          </h1>

                <MajorEventCountdown />

          <p className="text-lg sm:text-xl max-w-3xl mb-8">
            Another large heading with filler paragraphs to see contrast and
            flow. Suspendisse potenti. Cras tincidunt arcu in feugiat gravida.
            Nibh tortor hendrerit massa, quis vehicula justo sem sit amet ipsum.
          </p>
          <button className="inline-flex items-center border-2 font-bold rounded-full px-6 py-3 transition-colors text-a border-a hover:bg-a hover:text-c">
            Placeholder CTA
          </button>
        </div>
      </FullBleed>

      {/* White background (c), red text (a), black CTA (b) */}
      <FullBleed className="bg-c text-a">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Compete at an Event, Wherever You Are
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mb-8">
            One more layout so you can compare alternating sections quickly.
            Proin iaculis, ligula vitae lacinia pharetra, mi justo pharetra
            velit, a tristique nunc enim non nunc. Maecenas placerat felis a
            aliquet pulvinar.
          </p>
          <button className="inline-flex items-center border-2 font-bold rounded-full px-6 py-3 transition-colors text-b border-b hover:bg-b hover:text-c">
            Placeholder CTA
          </button>
        </div>
      </FullBleed>

      {/* Upcoming Competitions */}
      <FullBleed className="bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            ICN Season B 2025
          </h1>
          <EventShowcase />
        </div>
      </FullBleed>
    </>
  );
}
