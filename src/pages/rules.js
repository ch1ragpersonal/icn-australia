// src/pages/rules.js
import React, { useMemo, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Seo from "../components/seo";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import hero1 from "../images/hero1.png"

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
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-a/90 text-white shrink-0">
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
            ICN may sanction events although not conducted by ICN or part of the ICN calendar. Affiliate Members are
            bound by ICN rules and doping policy from the date they join and terminate when event placings are Official -
            after the return of the drug test results and finalised placings. A positive drug test by an Affiliate Member at a
            sanctioned event will have all penalties outlined in the current ICN Doping Policy applied.
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
You are required to enter prior to the event. No entries are accepted on the day unless approved by the
Promoter. This policy is necessary because iCompete gives each entrant a competitor trophy. Furthermore,
the appropriate drug testing has to be planned, competitor details entered into the computer scoring
program and we like to have all competitor names and details printed in the event worksheet and public
information.
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
To compete in the Australian titles, members must be an Australian citizen or have a working or residency visa
for Australia. However, only Australian citizens or aliens who have lived in Australia for the past five years can
win and receive the title of Overall ICN Mr/Ms Australia and represent Australia. If a non-Australian citizen
possessing the work/residency visa required to compete does win the Australian championship, they will be
given the Overall Australian Title and the runner up will be awarded the Mr/Ms Australia title and represent
Australia.
          </p>
        ),
      },
      {
        title: "AUSTRALIAN INVITATION",
        body: (
          <p>
To receive an ICN Invitation to compete at the Australian Titles the competitor must satisfy two criteria.
Invitations are rarely granted:
<br />
i) The competitor must be of Australian standard.
<br />
ii) Have a reason why the competitor is unable to compete and qualify.
<br />
It is considered that if a competitor avoids competing in order to qualify, they have an unfair advantage - they
only have to peak once. Reasons accepted in the past, include they were needed to act in an official capacity -
i.e. a judge, or they were competing elsewhere on the same day
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
        title: "PRO QUALIFIER (PQ) CARD",
        body: (
          <>
            <p className="mb-3">
              ICN’s Pro Qualifier (PQ) card gives top amateurs the opportunity to step onto a PRO stage
              in the year they receive it, while <span className="font-semibold">retaining amateur status</span> until they win a PRO division.
              It’s designed to deepen PRO line-ups and make earning a full PRO Card more prestigious.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Invitation to PRO Shows:</span> A PQ card is an exclusive invite to PRO shows and must be used by
                <span className="whitespace-nowrap"> 31 December</span> of the award year.
              </li>
              <li>
                <span className="font-semibold">Enter via your portal:</span> PQ status unlocks access in your iCompete portal to view and enter eligible PRO events.
              </li>
              <li>
                <span className="font-semibold">Win your PRO Card:</span> Place in a PRO division (typically Top&nbsp;3 — check the Event PDF for specifics).
              </li>
              <li>
                <span className="font-semibold">Dual eligibility:</span> Until you win a PRO division, you remain an amateur and may compete in all amateur divisions, including international amateur events.
              </li>
              <li>
                <span className="font-semibold">Flexible by country:</span> PQ cards help promoters build local PRO divisions without relying on overseas athletes.
              </li>
            </ul>
            <p className="mt-3">
              PQ makes the path to ICN PRO status clearer and more meaningful by limiting full PRO cards while
              enabling strong, competitive PRO fields.
            </p>
          </>
        ),
      },
      {
        title: "JUDGING",
        body: (
          <p>
Every event will have an odd number of judges, the head judge is known as the ‘Head Judges’. Judging is
subjective based on the guidelines and personal preferences of the judges. Judging can vary from location to
location and over time according to the prevailing popularity of certain looks and trends. Judging is executed
based on the competitors on stage. The Head Judge can ask any competitor to do any reasonable action,
whether it’s a regulation pose or not, so that the panel of judges can see the bodies better in an effort to
adjudicate more fairly. Athletes should be cognizant of the fact that they may be requested to perform
walking, standing and posing that they may not have practised.
          </p>
        ),
      },
      {
        title: "MEMBERSHIP",
        body: (
          <p>
You must be a Premium Member of ICN and agree to our Random Drug Testing Program (ICN 365) to compete
and receive ICN benefits. Join online at <a className="underline decoration-a/90" href="https://www.icompetenatural.com" target="_blank" rel="noopener noreferrer">www.icompetenatural.com</a> Membership is via annual subscription for
365 days.
          </p>
        ),
      },
      {
        title: "MEMBERSHIP REFUNDS",
        body: (
          <p>
            Membership refunds are rarely given and only apply to those people who have not competed yet. Once you
compete there is no refund. We can only consider a refund if you join and cancel prior to competing. A A$35
administration fee will be deducted on any refund apporved. You must make a written
application <a className="underline decoration-a/90" href="mailto:admin@icompetenatural.com">admin@icompetenatural.com</a>
stating the reason/s for a refund. The refund clause is for genuine hardships that can be documented by third
parties.
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
            Misconduct by an ICN competitor at an event will attract point deductions on their score. Misconduct by any
            ICN member, at any time, may incur a suspension from competing. Misconduct can also cover drug testing as
            ICN considers cheating by natural competitors as blatant Misconduct. Hence in addition to any penalty
            imposed under the ICN Anti-Doping Policy, the ICN may impose a second sanction under Misconduct. If a
            competitor fails to a request to supply a sample for testing, fails on more than one substance, fails for taking a
            substance that ICN considers a known bodybuilding drug, or fails for taking an anabolic substance, the ICN can
            impose a second sanction - which is usually a LIFE ban.
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
Competitors who fail to complete an event by not appearing on stage for the Trophy Presentation will be
considered a "No-Show" and given last place. ICN deems a competitor, who does not, or cannot make the
announcement of placings, has not completed the event. Circumstances within or outside the control of a
competitor may prevent them from making the Presentation. However, until the scores and placings have
been announced a competitor is still subject to the rules of competition requiring athletes to complete the
event. "Bad-luck" is part of sport. ICN cannot correct bad-luck. Like a competitor who falls sick the night 
before the event, will not be compensated by the promoters delaying the event until the following weekend,
if a competitor fails to make the Trophy Presentation due to illness, accident or circumstances outside their
control, ICN cannot correct the unfairness or bad-luck.
          </p>
        ),
      },
      {
        title: "ON STAGE",
        body: <p>The responsibility is yours to know when you are ready to go on stage and to be in the line up to all walk on
stage at the same time.</p>,
      },
      {
        title: "PRIZES",
        body: (
          <p>
ICN focuses on offering great prizes to competitors. Regional winners may receive a trip to compete at
National events. Nationals winners may receive Travel Awards to represent their Country at a major
international event.
          </p>
        ),
      },
      {
        title: "PROOF OF AGE",
        body: <p>Those competing in the Teenage, Junior or Senior division may be required to show provide proof of age,
drivers licence or birth certificate at the Event Check-in.</p>,
      },
      {
        title: "REFUSAL",
        body: (
          <p>
Members can refuse to participate in a drug test on the contest day or with the RDTP and incur no cost.
However, drug testing is the cornerstone behind Natural Bodybuilding, and as such a refusal is considered
gross Misconduct by an ICN Member and the Member will be subject to a lifetime ban.
          </p>
        ),
      },
      {
        title: "RESTRICTIONS",
        body: (
          <p>
At the promoter’s discretion division restrictions may be enforced at an event. Typical restrictions, meaning
competitors will not be able to enter the following combination:
<br />

Female: Bikini Model and Fitness Models
<br />

Female: Ms Figure and Bodybuilding
<br />

Male: Men’s Physique and Bodybuilding
          </p>
        ),
      },
      {
        title: "SCHEDULED DIVISIONS",
        body: (
          <p>
The promoters of any event have the right to alter the schedule of the event without notice. The schedule of
the event is only an estimate, neither the order of divisions nor the approximate times are guaranteed, they
are only a guide. The judging interpretation of divisions is subjective and under the control of the Head Judge,
neither the promoters nor sanctioning body can be held responsible for the subjective opinion of the judging
panel. All results are final except in the case of disqualification due to a breach of the banned substance code.
          </p>
        ),
      },
      {
        title: "SIGNS OF DRUG USE",
        body: (
          <p>
A Competitor who displays any sign of using drugs (i.e. bitch tits) is encouraged not to compete until they
have rectified the problem. This is regardless of their drug-free status. The credibility of the Naturals and the
competitor themselves is undermined when the audience see what they believe is the result of drug use on
stage in a natural contest. The judges will be notified to treat any sign of drug use as a substantial fault and
mark the competitor down.
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
            src={hero1}
            alt=""
            className="absolute inset-0 h-auto w-full object-cover opacity-30"
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
              className="inline-flex items-center gap-2 rounded-full border-2 border-a/90 px-6 py-3 font-bold text-a/90 hover:bg-a/90 hover:text-white transition"
            >
              Report Cheating
            </a>
            <a
              href="https://www.globaldro.com/AU/search"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-a/90 px-6 py-3 font-bold text-a/90 hover:bg-a/90 hover:text-white transition"
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
