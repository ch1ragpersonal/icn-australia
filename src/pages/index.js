import React from "react";
import Seo from "../components/seo";
import EventShowcase from "../components/EventShowcase";

function FullBleed({ children, className = "" }) {
  return (
    <div
      className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] ${className}`}
    >
      {children}
    </div>
  );
}

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
            <h1 className="text-a text-6xl sm:text-7xl font-extrabold drop-shadow-md mb-3">
              ICN is The Home of Australia’s Natural Bodybuilding Elite
            </h1>
            <p className="text-a text-lg sm:text-xl max-w-3xl drop-shadow">
              Compete at The Pinnacle of Natural Physique Competition.
            </p>
          </div>
        </div>
      </FullBleed>

      {/* Red background (a), black text (b), white CTA (c) */}
      <FullBleed className="bg-a text-b">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Find Your Division
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mb-8">
            Giant text block to test visual rhythm and spacing. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Integer luctus, velit
            at volutpat interdum, sem urna fermentum metus, ut tincidunt risus
            mauris non justo.
          </p>
          <button className="inline-flex items-center border-2 font-bold rounded-full px-6 py-3 transition-colors text-c border-c hover:bg-c hover:text-a">
            Placeholder CTA
          </button>
        </div>
      </FullBleed>

      {/* Black background (b), white text (c), red CTA (a) */}
      <FullBleed className="bg-b text-c">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Come to Australia's Biggest Bodybuilding Event of the Year
          </h1>
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
