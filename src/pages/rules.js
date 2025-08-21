// src/pages/rules.js
import React, { useMemo, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Seo from "../components/seo";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// Simple chevron icon
const Chevron = ({ open }) => (
  <svg
    className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
      clipRule="evenodd"
    />
  </svg>
);

// Reusable accordion section
const RuleItem = ({ title, children, open, onToggle }) => (
  <div className="rounded-xl border border-black/10 bg-white/90 shadow-sm overflow-hidden">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center gap-3 px-4 sm:px-6 py-4 text-left"
      aria-expanded={open}
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shrink-0">
        !
      </span>
      <span className="flex-1 font-extrabold tracking-tight text-black text-base sm:text-lg">
        {title}
      </span>
      <Chevron open={open} />
    </button>

    <div
      className={`grid transition-all duration-300 ease-out ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0">
        <div className="px-4 sm:px-6 pb-5 text-[15px] leading-7 text-neutral-800">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const RulesPage = () => {
  const data = useStaticQuery(graphql`
    query RulesAndPdfsTailwind {
      allContentfulLongText(filter: { title: { eq: "Rules" } }) {
        nodes {
          title
          content {
            raw
          }
        }
      }
      allContentfulPdfInfo {
        nodes {
          title
          pdf {
            file {
              url
            }
          }
        }
      }
    }
  `);

  // Contentful text
  const longText = data.allContentfulLongText.nodes?.[0];
  const title = longText?.title || "Rules";
  const contentRaw = longText?.content?.raw;

  // PDF links
  const pdfs = data.allContentfulPdfInfo.nodes || [];
  const antiDopingPdf = pdfs.find((n) => n.title === "Anti Doping Policy");
  const therapeuticPdf = pdfs.find((n) => n.title === "Therapeutic Use");

  // Your rule sections (content lifted from your previous page)
  const SECTIONS = useMemo(
    () => [
      {
        title: "AFFILIATE MEMBER",
        body: (
          <p>
            ICN may sanction events although not conducted by ICN or part of the ICN
            calendar. Affiliate Members are bound by ICN rules and doping policy from the
            date they join and terminate when event placings are Official - after the
            return of the drug test results and finalised placings. A positive drug test
            by an Affiliate Member at a sanctioned event will have all penalties outlined
            in the current ICN Doping Policy applied.
          </p>
        ),
      },
      {
        title: "CANCELLATIONS",
        body: <p>A division may be amalgamated with another if less than three competitors register.</p>,
      },
      {
        title: "DIVISIONS",
        body: <p>Please see the Divisions pages via the main menu.</p>,
      },
      {
        title: "DRESS – Posing Bikini and Men’s Trunk",
        body: <p>No restriction on colour or design.</p>,
      },
      {
        title: "ENTRIES",
        body: (
          <p>
            You are required to enter prior to the event. No entries are accepted on the
            day unless approved by the Promoter. This is necessary for trophies, drug
            testing planning, scoring, and event materials preparation.
          </p>
        ),
      },
      {
        title: "ENTRY",
        body: (
          <p>
            An ICN Online Entry through the Members ICN Portal constitutes an application
            to compete. ICN reserve the right to refuse or withdraw any Application at
            their discretion and at any time, prior to the athlete competing.
          </p>
        ),
      },
      {
        title: "AUSTRALIAN ELIGIBILITY",
        body: (
          <p>
            To compete in the Australian titles, members must be an Australian citizen or
            have a working or residency visa for Australia. Only Australian citizens or
            aliens who have lived in Australia for the past five years can win and receive
            the title of Overall ICN Mr/Ms Australia and represent Australia. If a
            non-citizen wins, they may be given the Overall Australian Title while the
            runner-up receives the Mr/Ms Australia title.
          </p>
        ),
      },
      {
        title: "AUSTRALIAN INVITATION",
        body: (
          <p>
            To receive an ICN Invitation, the competitor must be of Australian standard
            and have a reason for being unable to qualify. Reasons accepted in the past
            include acting in an official capacity (e.g. judge) or competing elsewhere on
            the same day.
          </p>
        ),
      },
      {
        title: "FEEDBACK",
        body: <p>Competitors will be made aware how to obtain judges feedback prior to the event.</p>,
      },
      {
        title: "PHOTOGRAPHY",
        body: <p>A professional photographer will be contracted to take pictures that you can purchase.</p>,
      },
      {
        title: "INTERNATIONAL",
        body: (
          <p>
            The Pinnacle Season A and Season B events require qualifying. Contact your ICN
            President for details. Members from countries without a qualifying event can
            enter directly via the Members Portal.
          </p>
        ),
      },
      {
        title: "JUDGING",
        body: (
          <p>
            Judging is subjective and based on guidelines and personal preferences. Head
            Judges may request reasonable actions to better assess competitors. Athletes
            should be prepared for walking, standing, and posing that they may not have
            practiced.
          </p>
        ),
      },
      {
        title: "MEMBERSHIP",
        body: (
          <p>
            You must be a Premium Member of ICN and agree to our Random Drug Testing
            Program (ICN 365) to compete and receive ICN benefits. Membership is an
            annual subscription for 365 days.
          </p>
        ),
      },
      {
        title: "MEMBERSHIP REFUNDS",
        body: (
          <p>
            Refunds are rarely given and not after competing. A A$35 admin fee applies to
            any approved refund. Apply in writing to{" "}
            <a className="underline decoration-red-600" href="mailto:admin@icompetenatural.com">
              admin@icompetenatural.com
            </a>
            .
          </p>
        ),
      },
      {
        title: "MINIMUM AGE",
        body: <p>ICN accepts Membership from individuals once they turn 15 years of age.</p>,
      },
      {
        title: "MISCONDUCT",
        body: (
          <p>
            Misconduct may incur point deductions or suspension. Drug cheating is treated
            as gross Misconduct and can result in a life ban in addition to any Anti-Doping
            penalty.
          </p>
        ),
      },
      {
        title: "MUSCLE IMPLANTS",
        body: <p>Athletes with muscle implants/injections are not eligible to compete.</p>,
      },
      {
        title: "NO SHOW",
        body: (
          <p>
            Competitors who fail to appear for Trophy Presentation are given last place.
            ICN cannot correct unfairness due to circumstances or “bad luck”.
          </p>
        ),
      },
      {
        title: "ON STAGE",
        body: <p>Know your stage time and be ready to walk on with your line-up.</p>,
      },
      {
        title: "PRIZES",
        body: (
          <p>
            ICN focuses on great prizes. Regional winners may receive a trip to Nationals.
            National winners may receive Travel Awards for international events.
          </p>
        ),
      },
      {
        title: "PROOF OF AGE",
        body: <p>Teenage, Junior or Senior competitors may need to show ID at Check-in.</p>,
      },
      {
        title: "REFUSAL",
        body: (
          <p>
            Members can refuse drug tests but refusal is considered gross Misconduct and
            can result in a lifetime ban.
          </p>
        ),
      },
      {
        title: "RESTRICTIONS",
        body: (
          <p>
            At promoter’s discretion some combinations may be restricted (e.g. Female:
            Bikini + Fitness Models; Ms Figure + Bodybuilding. Male: Physique + Bodybuilding).
          </p>
        ),
      },
      {
        title: "SCHEDULED DIVISIONS",
        body: (
          <p>
            Schedules may change without notice. Times and order are guides only. All
            results are final except disqualification for banned substances.
          </p>
        ),
      },
      {
        title: "SIGNS OF DRUG USE",
        body: (
          <p>
            Visible signs of drug use are treated as a substantial fault and marked down,
            regardless of drug-free status.
          </p>
        ),
      },
      {
        title: "TROPHIES",
        body: <p>All competitors receive a trophy. Positive drug tests require returning the trophy.</p>,
      },
    ],
    []
  );

  // Accordion state
  const [openMap, setOpenMap] = useState(() => SECTIONS.map(() => false));
  const allOpen = openMap.every(Boolean);

  const toggleOne = (idx) =>
    setOpenMap((prev) => prev.map((v, i) => (i === idx ? !v : v)));

  const toggleAll = () =>
    setOpenMap((prev) => prev.map(() => !allOpen));

  return (
    <>
      <Seo title={title} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative h-[36vh] min-h-[260px] w-full bg-black">
          <img
            src="/images/placeholder-hero.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex h-full items-end">
            <div className="max-w-6xl mx-auto w-full px-6 pb-8">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
                Policy & Guidance
              </span>
              <h1 className="mt-3 inline-block rounded-2xl bg-black/80 px-5 py-2 text-3xl sm:text-4xl font-extrabold text-white shadow-lg">
                {title}
              </h1>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* BODY */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Optional Contentful intro
        {contentRaw && (
          <article className="prose prose-lg max-w-none prose-headings:font-extrabold prose-p:text-neutral-700">
            {documentToReactComponents(JSON.parse(contentRaw))}
          </article>
        )} */}

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-black">
            Competition Rules
          </h2>
          <button
            onClick={toggleAll}
            className="inline-flex items-center gap-2 rounded-full border-2 border-black px-4 py-2 text-sm font-bold text-black hover:bg-black hover:text-white transition"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        {/* Accordion */}
        <div className="mt-5 grid gap-4">
          {SECTIONS.map((sec, i) => (
            <RuleItem
              key={sec.title}
              title={sec.title}
              open={openMap[i]}
              onToggle={() => toggleOne(i)}
            >
              {sec.body}
            </RuleItem>
          ))}
        </div>

        {/* Quick Links */}
        <section className="mt-12">
          <h3 className="text-center text-xl sm:text-2xl font-extrabold tracking-tight text-black">
            Drug Testing Quick Links
          </h3>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {antiDopingPdf?.pdf?.file?.url && (
              <a
                href={antiDopingPdf.pdf.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-black px-6 py-3 font-bold text-black hover:bg-black hover:text-white transition"
              >
                Anti Doping Policy
              </a>
            )}
            {therapeuticPdf?.pdf?.file?.url && (
              <a
                href={therapeuticPdf.pdf.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-black px-6 py-3 font-bold text-black hover:bg-black hover:text-white transition"
              >
                Therapeutic Use
              </a>
            )}
            <a
              href="https://www.icompetenatural.com/report-cheating"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-red-600 px-6 py-3 font-bold text-red-600 hover:bg-red-600 hover:text-white transition"
            >
              Report Cheating
            </a>
            <a
              href="https://www.globaldro.com/AU/search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-red-600 px-6 py-3 font-bold text-red-600 hover:bg-red-600 hover:text-white transition"
            >
              Check your Substance
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default RulesPage;
