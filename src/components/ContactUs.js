// src/components/ContactUs.jsx
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

// NEW: one source of truth for presidents (order preserved)
const PRESIDENTS = [
  { title: "Oceania President", name: "Tony Lanciano", emails: ["tony.lanciano@icompetenatural.com"], phone: "" },

  { title: "NSW President", name: "Rab Mahajer", emails: ["info@theedge.com.au"], phone: "" },
  { title: "WA President", name: "Ryan Fredericks", emails: ["ryan@academyhealthstyle.com"], phone: "" },
  { title: "SA President", name: "Kim Tanska", emails: ["kimtanska62@gmail.com"], phone: "" },
  { title: "ACT President", name: "Vivek Bhattacharjee", emails: ["vivek@vivkb.com"], phone: "" },
  { title: "NT President", name: "Vanessa O'grady", emails: ["info@wickednrg.com.au"], phone: "" },
  {
    title: "VIC Presidents",
    name: "Bowen McDonald & Orlando Lanciano",
    emails: ["bowen.mcdonald@icompetenatural.com", "orlandolanciano@gmail.com"],
    phone: "",
  },
  { title: "QLD President", name: "Jay Acharya", emails: ["jayacharyaofficial@gmail.com"], phone: "" },
];

const ContactUs = () => {
  return (
    <section className="relative overflow-hidden">
      {/* subtle red line accent */}
      <div className="h-1 w-full bg-a" />

      {/* backdrop */}
      <div className="bg-neutral-950 text-c">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
          {/* Eyebrow + Title */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-a/15 px-4 py-1.5 text-xs font-semibold tracking-wider text-a/90 ring-1 ring-a/30">
              We’d love to hear from you
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Contact <span className="text-a/90">ICN Australia</span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-c/80">
              Questions about events, registrations or the federation? Reach out
              and we’ll get back to you as soon as possible.
            </p>
          </div>

          {/* Primary cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Email card */}
            <div className="group rounded-2xl border border-c/10 bg-c/5 p-6 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-c/[0.08]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-a/20 text-a/90 ring-1 ring-a/30">
                  <FaEnvelope />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Email</h3>
              </div>
              <p className="mt-3 text-c/80">
                Prefer writing? We’ll respond quickly.
              </p>
              <a
                href="mailto:icnaustralia@icompetenatural.com"
                className="mt-5 inline-flex items-center justify-center rounded-full border-2 border-c px-4 py-2 font-bold text-c transition hover:bg-c hover:text-b focus:outline-none focus-visible:ring-2 focus-visible:ring-a/90"
              >
                icnaustralia@icompetenatural.com
              </a>
            </div>

            {/* Address card */}
            <div className="group rounded-2xl border border-c/10 bg-c/5 p-6 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-c/[0.08]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-a/20 text-a/90 ring-1 ring-a/30">
                  <FaMapMarkerAlt />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Address</h3>
              </div>
              <p className="mt-3 text-c/80">
                1/18 Norman Lindsay St, Conder ACT 2906
              </p>
            </div>
          </div>

          {/* NEW: State & Territory Presidents */}
          <div className="mt-10">
            <h2 className="text-2xl font-extrabold tracking-tight">State &amp; Territory Presidents</h2>
            <p className="mt-2 text-c/70 text-[15px]">
              Contact your local president directly.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRESIDENTS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-c/10 bg-c/5 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-c/80 ring-1 ring-white/10">
                        <span className="inline-block h-2 w-2 rounded-full bg-a/90" />
                        {p.title}
                      </div>
                      <h3 className="mt-2 text-lg font-bold">{p.name}</h3>
                    </div>

                    {/* Optional phone */}
                    {!!p.phone && (
                      <a
                        href={`tel:${p.phone.replace(/\s+/g, "")}`}
                        className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-c/20 text-c transition hover:bg-c hover:text-b"
                        aria-label={`Call ${p.name}`}
                      >
                        <FaPhoneAlt />
                      </a>
                    )}
                  </div>

                  {/* Emails */}
                  <div className="mt-3 flex flex-col gap-2">
                    {p.emails.map((e) => (
                      <a
                        key={e}
                        href={`mailto:${e}`}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-c px-3 py-1.5 text-sm font-semibold text-c transition hover:bg-c hover:text-b"
                      >
                        <FaEnvelope className="opacity-80" />
                        <span className="truncate">{e}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Row */}
          <div className="mt-10 flex items-center justify-center gap-5">
            <a
              href="https://www.facebook.com/iCompete.Australia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ICN Australia on Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-c/20 text-c transition hover:bg-c hover:text-b"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/icn_ang/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ICN Australia on Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-c/20 text-c transition hover:bg-c hover:text-b"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:icnaustralia@icompetenatural.com"
              aria-label="Email ICN Australia"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-c/20 text-c transition hover:bg-c hover:text-b"
            >
              <FaEnvelope />
            </a>
          </div>

          {/* CTA Bar */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-a to-a/90 p-1">
            <div className="rounded-2xl bg-neutral-950/90 px-6 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-center text-lg font-semibold sm:text-left">
                  Ready to compete or host an event? Let’s make it happen.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:icnaustralia@icompetenatural.com"
                    className="inline-flex items-center justify-center rounded-full bg-c px-5 py-2.5 font-bold text-b transition hover:bg-b hover:text-c border-2 border-c"
                  >
                    Email Us
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="inline-flex items-center justify-center rounded-full border-2 border-c px-5 py-2.5 font-bold text-c transition hover:bg-c hover:text-b"
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
