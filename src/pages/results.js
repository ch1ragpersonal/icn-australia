// src/pages/results.js 
import React, { useMemo, useState } from "react";
import { Link } from "gatsby";
import Seo from "../components/seo";
import hero1 from "../images/hero1.png";

// --- Mock data ---------------------------------------------------------------
const MOCK_RESULTS = [
  {
    id: "evt-NSW-Autumn-24",
    title: "ICN NSW Autumn Classic",
    date: "2024-04-21",
    season: "A",
    state: "NSW",
    venue: "Sydney Olympic Park",
    divisions: [
      {
        name: "Men's Physique",
        results: [
          { place: 1, athlete: "Liam Carter", team: "Team Apex", number: 34 },
          { place: 2, athlete: "Ethan Wu", team: "", number: 17 },
          { place: 3, athlete: "Noah Singh", team: "Iron DNA", number: 52 },
          { place: 4, athlete: "Oliver Grant", team: "", number: 28 },
        ],
      },
      {
        name: "Ms Bikini Model",
        results: [
          { place: 1, athlete: "Sofia Nguyen", team: "GlowFit", number: 12 },
          { place: 2, athlete: "Ava Thompson", team: "", number: 19 },
          { place: 3, athlete: "Mia Robinson", team: "Peak Physique", number: 23 },
        ],
      },
    ],
  },
  {
    id: "evt-VIC-Autumn-24",
    title: "ICN Victoria State Championships",
    date: "2024-05-04",
    season: "A",
    state: "VIC",
    venue: "Melbourne Convention Centre",
    divisions: [
      {
        name: "Bodybuilding",
        results: [
          { place: 1, athlete: "James Russo", team: "MuscleLab", number: 88 },
          { place: 2, athlete: "Harrison Cole", team: "", number: 63 },
          { place: 3, athlete: "Daniel Chen", team: "Apex", number: 71 },
        ],
      },
      {
        name: "Ms Figure",
        results: [
          { place: 1, athlete: "Aria Patel", team: "", number: 11 },
          { place: 2, athlete: "Isla Brooks", team: "Iron DNA", number: 27 },
          { place: 3, athlete: "Zara Lewis", team: "Peak Physique", number: 39 },
        ],
      },
    ],
  },
  {
    id: "evt-QLD-Spring-23",
    title: "ICN QLD Spring Show",
    date: "2023-09-10",
    season: "B",
    state: "QLD",
    venue: "Brisbane City Hall",
    divisions: [
      {
        name: "Ms Sports Model",
        results: [
          { place: 1, athlete: "Layla Ward", team: "GlowFit", number: 6 },
          { place: 2, athlete: "Chloe Adams", team: "", number: 15 },
          { place: 3, athlete: "Emily King", team: "", number: 21 },
        ],
      },
    ],
  },
];

// --- Tiny helpers ------------------------------------------------------------
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });

const states = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"];

// medal for place
const Medal = ({ place }) => (
  <span
    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold
      ${place === 1 ? "bg-yellow-400/90 text-black" : place === 2 ? "bg-gray-300 text-black" : place === 3 ? "bg-amber-700/80 text-white" : "bg-black/5 text-neutral-700"}
    `}
    title={place === 1 ? "Gold" : place === 2 ? "Silver" : place === 3 ? "Bronze" : `Place ${place}`}
  >
    {place}
  </span>
);

// --- Reusable UI bits --------------------------------------------------------
const Chevron = ({ open }) => (
  <svg className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
  </svg>
);

const Chip = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-full px-3 py-1 text-sm font-semibold transition border
      ${active ? "bg-a/90 text-white border-a/90" : "bg-black/5 text-neutral-900 border-black/10 hover:bg-black/10"}`}
  >
    {children}
  </button>
);

// --- Results page ------------------------------------------------------------
export default function ResultsPage() {
  const [year, setYear] = useState("All");
  const [stateSel, setStateSel] = useState("All");
  const [divisionSel, setDivisionSel] = useState("All");
  const [q, setQ] = useState("");

  // derive filter options
  const allYears = useMemo(() => {
    const ys = Array.from(new Set(MOCK_RESULTS.map((e) => new Date(e.date).getFullYear()))).sort((a, b) => b - a);
    return ["All", ...ys];
  }, []);

  const allDivisions = useMemo(() => {
    const set = new Set();
    MOCK_RESULTS.forEach((e) => e.divisions.forEach((d) => set.add(d.name)));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return MOCK_RESULTS.filter((evt) => {
      const yOk = year === "All" || new Date(evt.date).getFullYear().toString() === year.toString();
      const sOk = stateSel === "All" || evt.state === stateSel;
      const dOk =
        divisionSel === "All" || evt.divisions.some((d) => d.name.toLowerCase() === divisionSel.toLowerCase());
      const qOk =
        !q ||
        evt.title.toLowerCase().includes(q.toLowerCase()) ||
        evt.divisions.some((d) =>
          d.results.some((r) => r.athlete.toLowerCase().includes(q.toLowerCase()))
        );
      return yOk && sOk && dOk && qOk;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [year, stateSel, divisionSel, q]);

  // group by year then state
  const grouped = useMemo(() => {
    const byYear = {};
    filtered.forEach((evt) => {
      const y = new Date(evt.date).getFullYear();
      byYear[y] ??= {};
      byYear[y][evt.state] ??= [];
      byYear[y][evt.state].push(evt);
    });
    return byYear; // {2024:{NSW:[..],VIC:[..]}, 2023:{QLD:[..]}}
  }, [filtered]);

  return (
    <>
      <Seo title="Results" description="Official ICN Australia competition results by year, state and division." />
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative h-[34vh] min-h-[260px] w-full bg-black">
          <img src={hero1} alt="" className="absolute inset-0 h-auto w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex h-full items-end">
            <div className="max-w-6xl mx-auto w-full px-6 pb-8">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
                Results & History
              </span>
              <h1 className="mt-3 inline-block rounded-2xl bg-black/80 px-5 py-2 text-3xl sm:text-4xl font-extrabold text-white shadow-lg">
                Results
              </h1>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* BODY */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Filter bar */}
        <div className="sticky top-[64px] z-40 bg-white/90 backdrop-blur rounded-2xl border border-black/10 shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* Year */}
            <div>
              <label className="block text-xs font-semibold text-neutral-500 mb-1">Year</label>
              <select
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {allYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            {/* State */}
            <div>
              <label className="block text-xs font-semibold text-neutral-500 mb-1">State</label>
              <select
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2"
                value={stateSel}
                onChange={(e) => setStateSel(e.target.value)}
              >
                {["All", ...states].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            {/* Division */}
            <div>
              <label className="block text-xs font-semibold text-neutral-500 mb-1">Division</label>
              <select
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2"
                value={divisionSel}
                onChange={(e) => setDivisionSel(e.target.value)}
              >
                {allDivisions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            {/* Search */}
            <div>
              <label className="block text-xs font-semibold text-neutral-500 mb-1">Search events or athletes</label>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2"
                placeholder="E.g. 'Bikini', 'Liam Carter'…"
              />
            </div>
          </div>

          {/* Active filter chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {year !== "All" && <Chip active onClick={() => setYear("All")}>Year: {year} ✕</Chip>}
            {stateSel !== "All" && <Chip active onClick={() => setStateSel("All")}>State: {stateSel} ✕</Chip>}
            {divisionSel !== "All" && <Chip active onClick={() => setDivisionSel("All")}>Division: {divisionSel} ✕</Chip>}
            {q && <Chip active onClick={() => setQ("")}>“{q}” ✕</Chip>}
            {(year !== "All" || stateSel !== "All" || divisionSel !== "All" || q) && (
              <button
                className="text-sm font-semibold underline decoration-a/90"
                onClick={() => { setYear("All"); setStateSel("All"); setDivisionSel("All"); setQ(""); }}
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Grouped results */}
        {Object.keys(grouped).length === 0 && (
          <p className="text-neutral-600">No results match your filters.</p>
        )}

        {Object.entries(grouped)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([yr, byState]) => (
          <section key={yr} className="mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight">{yr}</h2>

            {states.filter((s) => byState[s]).map((s) => (
              <div key={s} className="mt-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-sm font-semibold">
                  <span className="inline-block h-2 w-2 rounded-full bg-a/90" />
                  {s}
                </div>

                <div className="mt-4 grid gap-4">
                  {byState[s]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((evt) => (
                    <EventCard key={evt.id} evt={evt} highlightDivision={divisionSel} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </main>
    </>
  );
}

// --- Event + Division Accordions --------------------------------------------
const EventCard = ({ evt, highlightDivision }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-3">
          <span className="inline-flex items-center rounded-full bg-white/60 border border-black/10 px-2 py-0.5 text-xs font-semibold text-neutral-700">
            {evt.state} • Season {evt.season}
          </span>
          <h3 className="mt-1 sm:mt-0 font-extrabold tracking-tight text-black truncate">{evt.title}</h3>
          <div className="text-sm text-neutral-500 truncate">{formatDate(evt.date)} • {evt.venue}</div>
        </div>
        <Chevron open={open} />
      </button>

      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0">
          <div className="px-4 sm:px-6 pb-5">
            <div className="grid gap-3">
              {evt.divisions.map((d) => (
                <DivisionCard
                  key={d.name}
                  division={d}
                  defaultOpen={highlightDivision !== "All" && d.name.toLowerCase() === highlightDivision.toLowerCase()}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DivisionCard = ({ division, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-black/10 bg-white/90 shadow-sm overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-3 sm:px-4 py-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-extrabold text-black">{division.name}</span>
        <Chevron open={open} />
      </button>

      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0">
          <div className="px-3 sm:px-4 pb-4">
            <table className="w-full text-sm">
              <thead className="text-neutral-500">
                <tr>
                  <th className="py-2 pr-2 text-left">Place</th>
                  <th className="py-2 pr-2 text-left">Athlete</th>
                  <th className="py-2 pr-2 text-left">Team</th>
                  <th className="py-2 text-left">#</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {division.results.map((r) => (
                  <tr key={`${division.name}-${r.number}-${r.athlete}`}>
                    <td className="py-2 pr-2"><Medal place={r.place} /></td>
                    <td className="py-2 pr-2 font-semibold">{r.athlete}</td>
                    <td className="py-2 pr-2 text-neutral-700">{r.team || "-"}</td>
                    <td className="py-2">{r.number ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Optional: link row for PDFs/photos */}
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to="/photos" className="underline decoration-a/90 text-sm">Event Photos</Link>
              <Link to="/rules" className="underline decoration-a/90 text-sm">Rules</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
