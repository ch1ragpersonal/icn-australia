// src/components/ContactUs.jsx
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="relative overflow-hidden">
      {/* subtle red line accent */}
      <div className="h-1 w-full bg-a" />

      {/* backdrop */}
      <div className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
          {/* Eyebrow + Title */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-a/15 px-4 py-1.5 text-xs font-semibold tracking-wider text-red-400 ring-1 ring-a/30">
              We’d love to hear from you
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Contact <span className="text-red-500">ICN Australia</span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-white/80">
              Questions about events, registrations or the federation? Reach out
              and we’ll get back to you as soon as possible.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Email card */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-a/20 text-red-400 ring-1 ring-a/30">
                  <FaEnvelope />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Email</h3>
              </div>
              <p className="mt-3 text-white/80">
                Prefer writing? We’ll respond quickly.
              </p>
              <a
                href="mailto:icnaustralia@icompetenatural.com"
                className="mt-5 inline-flex items-center justify-center rounded-full border-2 border-white px-4 py-2 font-bold text-white transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                icnaustralia@icompetenatural.com
              </a>
            </div>

            {/* Phone card */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-a/20 text-red-400 ring-1 ring-a/30">
                  <FaPhoneAlt />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Phone</h3>
              </div>
              <p className="mt-3 text-white/80">
                Talk to the team weekdays (AEST).
              </p>
              <a
                href="tel:+1234567890"
                className="mt-5 inline-flex items-center justify-center rounded-full border-2 border-white px-4 py-2 font-bold text-white transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                +1 (234) 567-890
              </a>
            </div>

            {/* Address card */}
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-a/20 text-red-400 ring-1 ring-a/30">
                  <FaMapMarkerAlt />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Address</h3>
              </div>
              <p className="mt-3 text-white/80">
                123 Innovation Road, Sydney, Australia
              </p>
              <a
                href="https://maps.google.com/?q=123 Innovation Road, Sydney"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full border-2 border-white px-4 py-2 font-bold text-white transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                View on Maps
              </a>
            </div>
          </div>

          {/* Social Row */}
          <div className="mt-10 flex items-center justify-center gap-5">
            <a
              href="https://www.facebook.com/iCompete.Australia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ICN Australia on Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/icn_ang/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ICN Australia on Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:icnaustralia@icompetenatural.com"
              aria-label="Email ICN Australia"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black"
            >
              <FaEnvelope />
            </a>
          </div>

          {/* CTA Bar */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-a to-red-500 p-1">
            <div className="rounded-2xl bg-neutral-950/90 px-6 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-center text-lg font-semibold sm:text-left">
                  Ready to compete or host an event? Let’s make it happen.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:icnaustralia@icompetenatural.com"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 font-bold text-black transition hover:bg-black hover:text-white border-2 border-white"
                  >
                    Email Us
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="inline-flex items-center justify-center rounded-full border-2 border-white px-5 py-2.5 font-bold text-white transition hover:bg-white hover:text-black"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;
