// src/templates/DivisionPage.js
import React from "react";
import { Link, withPrefix } from "gatsby";
import Seo from "../components/seo";
import { resolveImage } from "../utils/ResolveImage";

export default function DivisionPage({ pageContext }) {
  const division = pageContext?.division;

  if (!division) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Division not found. Check your data/divisions.json.
        </p>
      </main>
    );
  }

  const {
    title,
    description,
    image,            // e.g. "/images/divisions/mens-classic-physique.jpg"
    gender,           // "male" | "female" | "open"
    pdf,              // optional (keep in /static if you want a public URL)
    attire,           // string
    judgingCriteria,  // string[]
    stageWalkPosing,  // string
    subdivisions,     // string[]
  } = division;

  // IMPORTANT:
  // - Images now live in src/images, so we bundle them (no withPrefix here).
  // - resolveImage turns "/images/..." into a bundled URL.
const heroSrc = resolveImage(image);
// heroSrc should be a URL string now

  return (
    <>
      <Seo title={title} description={description?.slice(0, 160)} />

      {/* HERO */}
      <section className="relative h-[42vh] min-h-[320px] w-full bg-neutral-900">
        {heroSrc ? (
          <>
            <img
  src={heroSrc}
  alt={title}
  className="absolute inset-0 h-full w-full object-cover"
  style={{ objectPosition: "50% 20%" }} 
/>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-neutral-800" />
        )}

        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end pb-10">
          <div>
            {gender && (
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
                {gender === "male" ? "Men" : gender === "female" ? "Women" : "Open"}
              </span>
            )}
            <h1 className="mt-3 inline-block rounded-2xl bg-black/80 px-5 py-2 text-3xl sm:text-4xl font-extrabold text-white shadow-md">
              {title}
            </h1>
          </div>
        </div>

        {/* Soft shadow edge */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      </section>

      {/* BODY */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-10 items-start">
          {/* Main content */}
          <article className="max-w-none">
            {/* Overview */}
            <section className="mb-10">
              <h2 className="text-2xl font-extrabold tracking-tight">Overview</h2>
              <p className="mt-3 text-lg leading-7 text-neutral-700">
                {description || "More information coming soon."}
              </p>
            </section>

            {/* Attire */}
            {attire && (
              <section className="mb-10">
                <h2 className="text-2xl font-extrabold tracking-tight">Attire</h2>
                <p className="mt-3 text-neutral-700">{attire}</p>
              </section>
            )}

            {/* Judging Criteria */}
            {Array.isArray(judgingCriteria) && judgingCriteria.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Judging Criteria
                </h2>
                <ul className="mt-4 space-y-2">
                  {judgingCriteria.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-red-600" />
                      <span className="text-neutral-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Stage Walk & Posing */}
            {stageWalkPosing && (
              <section className="mb-10">
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Stage Walk &amp; Posing
                </h2>
                <p className="mt-3 text-neutral-700">{stageWalkPosing}</p>
              </section>
            )}

            {/* Subdivisions */}
            {Array.isArray(subdivisions) && subdivisions.length > 0 && (
              <section className="mb-6">
                <h2 className="text-2xl font-extrabold tracking-tight">Subdivisions</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {subdivisions.map((s, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Side Card / Quick Facts */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-extrabold">Quick Facts</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-neutral-500">Division</dt>
                  <dd className="font-semibold">{title}</dd>
                </div>
                {gender && (
                  <div className="flex items-center justify-between">
                    <dt className="text-neutral-500">Category</dt>
                    <dd className="font-semibold capitalize">{gender}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to="/competitions"
                  className="inline-flex items-center justify-center rounded-full border-2 border-black px-4 py-2 font-bold text-black hover:bg-black hover:text-white transition"
                >
                  Find a Competition
                </Link>

                {/*
                  PDFs should live under /static (e.g. /static/pdfs/guide.pdf),
                  so withPrefix(pdf) is appropriate for them.
                */}
                {pdf && (
                  <a
                    href={withPrefix(pdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border-2 border-red-600 px-4 py-2 font-bold text-red-600 hover:bg-red-600 hover:text-white transition"
                  >
                    Download Division PDF
                  </a>
                )}
              </div>
            </div>

            {/* Optional extra image */}
            {heroSrc && (
              <img
  src={heroSrc}
  alt={`${title} example`}
  className="rounded-2xl border border-black/10 shadow-sm w-1/2 object-cover mx-auto"
/>
            )}
          </aside>
        </div>

        {/* Back button */}
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-3 font-semibold text-black shadow hover:bg-amber-400 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
