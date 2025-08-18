// src/templates/DivisionPage.js
import React from "react";
import { Link, withPrefix } from "gatsby";
import Seo from "../components/seo";

const imgReq = require.context("../images/divisions", false, /\.(png|jpe?g|webp|svg)$/);

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

  const { title, description, image, gender, pdf } = division;
  // If your JSON uses /images/... and the files live under /static/images or similar,
  // withPrefix keeps the path correct in dev & prod.
  let heroSrc = null;
  if (image) {
    try {
      // supports "womens-bikini.jpg"
      heroSrc = imgReq(`./${image}`);
    } catch {
      heroSrc = null;
    }
  }

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
        {/* Intro / Description */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-10 items-start">
          <article className="prose prose-lg max-w-none prose-headings:font-extrabold prose-p:text-neutral-700">
            <p className="text-lg leading-7 text-neutral-700">
              {description || "More information coming soon."}
            </p>

            {/* Placeholder for the detailed content you'll paste later.
                When you add long-form content from the PDFs, replace or extend here. */}
            {!description && (
              <p className="italic text-neutral-500">
                We’re preparing detailed criteria, divisions, and posing guides.
                Check back shortly.
              </p>
            )}

            {/* If you want a “Key Criteria” section, uncomment and populate later */}
            {/* <h2>Key Criteria</h2>
            <ul>
              <li>Symmetry & balance</li>
              <li>Stage presence & posing</li>
              <li>Conditioning appropriate to the division</li>
            </ul> */}
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

            {/* Optional photo tile if you want a second visual */}
            {heroSrc && (
              <img
                src={heroSrc}
                alt={`${title} example`}
                className="rounded-2xl border border-black/10 shadow-sm w-full object-cover"
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
