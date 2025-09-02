// src/components/Footer.js
import React from "react";
import Counter from "./Counter";
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
  SiLinkedin,
  SiTiktok,
} from "react-icons/si";


const Footer = () => {
  return (
    <footer className="w-full">
      {/* === Top Grid Section === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {/* Box 1 */}
        <div className="bg-c p-8 md:p-12 lg:col-span-2 flex items-start">
          <h2 className="uppercase font-extrabold tracking-tight leading-tight text-xl md:text-2xl lg:text-3xl">
            ICN AUSTRALIA – NATURAL BODYBUILDING AT ITS BEST
          </h2>
          <div className="flex flex-col items-center justify-center gap-4">
            <Counter target={1972} duration={1400} stagger={70} />
            <h3 className="text-lg md:text-xl lg:text-xl">
              Athletes registered to compete!
            </h3>
          </div>
        </div>
        {/* Box 2 */}
        <div className="bg-a p-8 md:p-12">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-4">
            EVENTS NATIONWIDE
          </h3>
          <p>
            From state qualifiers to national titles, ICN Australia runs shows across the country, giving every athlete the chance to shine.
          </p>
        </div>
        {/* Box 3 */}
        <div className="bg-c p-8 md:p-12">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-4">
            NO QUALIFIER REQUIRED
          </h3>
          <p>Many of our events are open-entry. Step on stage without needing prior qualification and experience the thrill of competition.</p>
        </div>
        {/* Box 4 */}
        <div className="bg-a p-8 md:p-12 flex flex-col">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-6">
            CLEAN SPORT GUARANTEED
          </h3>
          <p>
            We are committed to 100% natural bodybuilding. Rigorous drug-testing protocols keep our sport fair, transparent, and credible
          </p>
        </div>
        {/* Box 5 */}
        <div className="bg-c p-8 md:p-12">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-4">
            SUPPORTIVE COMMUNITY
          </h3>
          <p>
            Whether you’re an athlete, coach, or supporter, ICN Australia provides a welcoming community where everyone can achieve their best.
          </p>
        </div>
        {/* Box 6 */}
        <div className="bg-a p-8 md:p-12">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-4">
            REGISTRATION & MEMBERSHIP
          </h3>
          <p>
            Competing with ICN Australia requires membership and registration. Sign up easily online to access all events and benefits.
          </p>
        </div>
        {/* Box 7 */}
        <div className="bg-c p-8 md:p-12">
          <h3 className="uppercase font-extrabold tracking-wide text-xl md:text-2xl mb-4">
            PARTNERS & SPONSORS
          </h3>
          <p>
            ICN Australia works with trusted partners who share our vision of health, performance, and integrity.
          </p>
        </div>
      </div>

{/* === Contact & Socials Row (no newsletter) === */}
<section className="bg-white p-8 md:p-12">
  <div className="mx-auto max-w-7xl">
    {/* glossy card with gradient border */}
    <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-blue-500 via-sky-400 to-red-500">
      <div className="rounded-[calc(1.5rem-1px)] bg-slate-900 px-6 py-8 md:px-10 md:py-10">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left */}
          <div>
            <h3 className="text-2xl font-bold text-white">
              Find us on socials
            </h3>
            <p className="mt-2 text-slate-300">
              Follow <span className="font-semibold text-white">ICN Australia</span> for
              competition news, athlete stories, and community updates.
            </p>
          </div>

          {/* Right — animated icon row */}
          <div className="flex flex-wrap items-center justify-start md:justify-end gap-3">
            {[
              { href: "https://www.facebook.com/icn.act/", label: "Facebook", Icon: SiFacebook },
              { href: "https://instagram.com/icnaustralia", label: "Instagram", Icon: SiInstagram },
              { href: "https://www.youtube.com/@icnact1477", label: "YouTube", Icon: SiYoutube },
            ].map(({ href, label, Icon }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="
                  group relative grid h-12 w-12 place-items-center rounded-full
                  bg-white/5 ring-1 ring-white/10
                  transition
                  hover:-translate-y-0.5 hover:scale-105 hover:bg-white/10
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                "
                style={{ transitionDelay: `${i * 30}ms` }}  // subtle stagger
              >
                {/* glow ring on hover */}
                <span
                  className="
                    absolute -z-10 inset-0 rounded-full opacity-0 blur-sm
                    group-hover:opacity-100
                    bg-gradient-to-r from-blue-500 to-red-500
                    transition-opacity
                  "
                />
                <Icon className="h-5 w-5 text-slate-200 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* divider & micro copy */}
        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
          <p>Tag your posts with <span className="font-semibold text-white">#ICNAustralia</span> for a chance to be featured.</p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* === Sitemap Row === */}
      <div className="bg-white p-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side */}
          <div className="flex items-center space-x-4 flex-wrap">
            {[
              "Information & documents to provide",
              "Sponsorship",
              "Partners",
              "Regulations",
              "Credits",
              "Terms and Conditions",
              "Legal notices",
            ].map((link, idx) => (
              <a key={idx} href="#" className="text-sm hover:underline">
                {link}
              </a>
            ))}
          </div>

          {/* Right side - Mars Rouge */}
          <div className="text-lg font-extrabold tracking-wide uppercase">
            ICN AUSTRALIA
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
