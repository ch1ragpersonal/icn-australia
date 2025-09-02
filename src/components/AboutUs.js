import React from "react";
import { Link } from "gatsby"; // remove if not using Gatsby's <Link>

const AboutUs = () => {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-24 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              About <span className="text-a/100">ICN Australia</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">
              We’re Australia’s home of natural bodybuilding—championing clean,
              drug-free competition and a community that values discipline,
              integrity, and long-term health.
            </p>

            <div className="mt-8 flex gap-3">
              <Link
                to="/competitions"
                className="inline-flex items-center rounded-2xl px-5 py-3 text-sm font-semibold text-white bg-a/100 hover:bg-a/100 transition"
              >
                View Competitions
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-100 ring-1 ring-white/20 hover:bg-white/10 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        {/* Subtle diagonal shape */}
        <svg
          className="absolute right-0 top-1/2 -z-0 h-[120%] -translate-y-1/2 opacity-20"
          viewBox="0 0 400 800"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <path d="M0,0 L400,120 400,800 0,680 Z" fill="url(#g)" />
        </svg>
      </section>

      {/* Intro copy */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <div className="prose prose-slate max-w-none prose-p:leading-7">
          <p className="text-lg text-slate-700">
            At <strong>ICN Australia</strong>, our mission is to empower
            athletes to reach their full potential while maintaining the
            integrity of the sport. As part of the global{" "}
            <em>I&nbsp;Compete Natural</em> family, we exist to provide fair,
            transparent, and inspiring stages for natural athletes across the
            country.
          </p>
          <p className="text-slate-700">
            We believe in the hard work, discipline, and passion that natural
            bodybuilding demands. Our community is dedicated to training smart,
            competing fair, and living a lifestyle that values health, strength,
            and perseverance—on and off the stage.
          </p>
          <p className="text-slate-700">
            Whether you’re a seasoned competitor or just beginning your journey,
            ICN Australia is here to champion your achievements and help you
            push your limits—naturally.
          </p>
        </div>
      </section>

      {/* Pillars / Values */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <h2 className="text-2xl font-bold text-slate-900">
            What We Stand For
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Drug-Free Integrity",
                body:
                  "Strict testing and a zero-tolerance stance to safeguard fair, clean competition.",
              },
              {
                title: "Athlete-First",
                body:
                  "Clear categories, supportive staff, and professional staging so athletes can shine.",
              },
              {
                title: "Community",
                body:
                  "From first-timers to pros—mentorship, encouragement, and lifelong friendships.",
              },
              {
                title: "Education & Support",
                body:
                  "Resources for posing, preparation, wellbeing, and sustainable performance.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / How it works */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <h2 className="text-2xl font-bold text-slate-900">Your ICN Path</h2>
        <ol className="mt-8 space-y-6">
          {[
            {
              step: "1",
              title: "Join the Community",
              body:
                "Create your profile and get familiar with divisions, categories, and rules.",
            },
            {
              step: "2",
              title: "Choose Your Show",
              body:
                "Pick a state event or national series that aligns with your prep timeline.",
            },
            {
              step: "3",
              title: "Prepare & Learn",
              body:
                "Use our guides, posing tips, and community support to dial in your stage package.",
            },
            {
              step: "4",
              title: "Compete Natural",
              body:
                "Step on stage with confidence—celebrating discipline, health, and integrity.",
            },
          ].map((t) => (
            <li
              key={t.step}
              className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[3rem_1fr]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-a/100 text-white font-bold">
                {t.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {t.title}
                </h3>
                <p className="mt-1 text-slate-600">{t.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/rules"
            className="inline-flex items-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-300 hover:bg-slate-50 transition"
          >
            Read the Rules
          </Link>
          <Link
            to="/divisions"
            className="inline-flex items-center rounded-2xl px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition"
          >
            Explore Divisions
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
          <div className="rounded-3xl bg-gradient-to-r from-red-600 to-blue-500 p-1">
            <div className="rounded-[1.35rem] bg-slate-900 p-8 sm:p-10">
              <div className="grid items-center gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-white">
                    Ready to compete—naturally?
                  </h3>
                  <p className="mt-2 text-slate-200">
                    Create your athlete profile and register for an upcoming
                    show in your state.
                  </p>
                </div>
                <div className="flex md:justify-end">
                  <Link
                    to="/members"
                    className="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Member’s Portal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
