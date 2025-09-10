// src/pages/pro.js
// Pro Winners showcase page for ICN Australia (Gatsby + Tailwind)
// Uses site theme colours only: a (blue), b (black), c (white). No GraphQL yet.

import React, { useMemo, useState } from "react";
import { Link } from "gatsby";
import Seo from "../components/seo";

// 🧪 Mock data to visualise the page now
const MOCK_DATA = [
  { id: "1", athleteName: "Alex Carter", divisionKey: "PRO_MENS_BODYBUILDING", divisionLabel: "Pro Men's Bodybuilding Champion", year: 2024, state: "NSW", eventName: "ICN Australian Nationals", eventDate: "2024-10-12", instagram: "alexcarter_ifbb", profileSlug: "/athletes/alex-carter" },
  { id: "2", athleteName: "Maya Singh", divisionKey: "PRO_BIKINI", divisionLabel: "Pro Bikini Champion", year: 2024, state: "VIC", eventName: "ICN Australian Nationals", eventDate: "2024-10-12", instagram: "maya.fit", profileSlug: "/athletes/maya-singh" },
  { id: "3", athleteName: "Ethan Nguyen", divisionKey: "PRO_MENS_PHYSIQUE", divisionLabel: "Pro Men's Physique Champion", year: 2023, state: "QLD", eventName: "ICN Pro League Finals", eventDate: "2023-11-05", instagram: "ethanphysique", profileSlug: "/athletes/ethan-nguyen" },
  { id: "4", athleteName: "Zara Haddad", divisionKey: "PRO_FIGURE", divisionLabel: "Pro Figure Champion", year: 2022, state: "SA", eventName: "ICN Pro League Finals", eventDate: "2022-11-06", instagram: "zarah.figure", profileSlug: "/athletes/zara-haddad" },
  { id: "5", athleteName: "Liam O'Connor", divisionKey: "PRO_CLASSIC_PHYSIQUE", divisionLabel: "Pro Classic Physique Champion", year: 2024, state: "WA", eventName: "ICN Australian Nationals", eventDate: "2024-10-12", instagram: "liamclassic", profileSlug: "/athletes/liam-oconnor" },
  { id: "6", athleteName: "Sofia Rodriguez", divisionKey: "PRO_SPORTS_MODEL", divisionLabel: "Pro Sports Model Champion", year: 2023, state: "NSW", eventName: "ICN Pro League Finals", eventDate: "2023-11-05", instagram: "sofiarodriguez.fit", profileSlug: "/athletes/sofia-rodriguez" },
];

const DIVISION_META = [
  { key: "PRO_MENS_BODYBUILDING", label: "Pro Men's Bodybuilding" },
  { key: "PRO_CLASSIC_PHYSIQUE", label: "Pro Classic Physique" },
  { key: "PRO_MENS_PHYSIQUE", label: "Pro Men's Physique" },
  { key: "PRO_FIGURE", label: "Pro Figure" },
  { key: "PRO_BIKINI", label: "Pro Bikini" },
  { key: "PRO_SPORTS_MODEL", label: "Pro Sports Model" },
];

const STATE_ORDER = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"];

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-b">{title}</h1>
        {subtitle && <p className="text-sm sm:text-base text-b/70 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border transition shadow-sm text-sm
        ${active ? "bg-a text-c border-a" : "bg-c text-b border-b/20 hover:bg-c/80"}
      `}
    >
      {children}
    </button>
  );
}

function DivisionTabs({ divisions, activeKey, setActiveKey }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="inline-flex gap-2 sm:gap-3 py-2">
        {divisions.map((d) => (
          <Chip key={d.key} active={activeKey === d.key} onClick={() => setActiveKey(d.key)}>
            {d.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search athletes, events, years…"
      className="w-full sm:max-w-md rounded-xl border border-b/20 bg-c text-b px-4 py-2 focus:outline-none focus:ring-2 focus:ring-a"
    />
  );
}

function StateFilter({ value, onChange, availableStates }) {
  const states = STATE_ORDER.filter((s) => availableStates.has(s));
  return (
    <div className="flex flex-wrap gap-2">
      <Chip active={value === "ALL"} onClick={() => onChange("ALL")}>All states</Chip>
      {states.map((s) => (
        <Chip key={s} active={value === s} onClick={() => onChange(s)}>{s}</Chip>
      ))}
    </div>
  );
}

function YearFilter({ years, activeYear, setActiveYear }) {
  const sorted = Array.from(years).sort((a, b) => b - a);
  return (
    <div className="flex flex-wrap gap-2">
      <Chip active={activeYear === "ALL"} onClick={() => setActiveYear("ALL")}>All years</Chip>
      {sorted.map((y) => (
        <Chip key={y} active={activeYear === y} onClick={() => setActiveYear(y)}>{y}</Chip>
      ))}
    </div>
  );
}

function ProCard({ winner }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-b/20 bg-c shadow-sm hover:shadow-md transition">
      {/* Media placeholder */}
      <div className="aspect-[16/9] bg-b/5 flex items-center justify-center overflow-hidden">
        <div className="text-b/50 text-sm">Photo coming soon</div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-b">{winner.athleteName}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-b text-c">{winner.state}</span>
        </div>
        <p className="text-b/80 text-sm mt-1">
          <span className="font-medium text-b">{winner.divisionLabel || labelFromKey(winner.divisionKey)}</span>{" · "}
          {winner.year}
        </p>
        {winner.eventName && <p className="text-b/60 text-xs mt-1">{winner.eventName}</p>}

        <div className="mt-3 flex items-center gap-3">
          {winner.profileSlug && (
            <Link to={winner.profileSlug} className="text-sm text-a underline underline-offset-4 hover:no-underline">
              View profile
            </Link>
          )}
          {winner.instagram && (
            <a
              href={`https://instagram.com/${formatInstagram(winner.instagram)}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-a underline underline-offset-4 hover:no-underline"
            >
              Instagram
            </a>
          )}
        </div>
      </div>

      {/* Corner badge */}
      <div className="absolute right-3 top-3">
        <span className="rounded-md bg-c/95 backdrop-blur px-2 py-0.5 text-xs border border-b/20 text-b">
          {winner.year}
        </span>
      </div>
    </div>
  );
}

function labelFromKey(key) {
  const match = DIVISION_META.find((d) => d.key === key);
  return match?.label || key;
}
function formatInstagram(handle) {
  return handle.startsWith("http") ? handle.replace(/https?:\/\//, "") : handle.replace(/^@/, "");
}
function groupByYear(list) {
  return list.reduce((acc, item) => {
    (acc[item.year] ||= []).push(item);
    return acc;
  }, {});
}

export default function ProWinnersPage() {
  const winners = MOCK_DATA;

  const availableDivisions = useMemo(() => {
    const keysPresent = new Set(winners.map((w) => w.divisionKey));
    return DIVISION_META.filter((d) => keysPresent.has(d.key));
  }, [winners]);

  const [activeDivision, setActiveDivision] = useState(availableDivisions[0]?.key || DIVISION_META[0].key);
  const [query, setQuery] = useState("");
  const allStates = useMemo(() => new Set(winners.map((w) => w.state).filter(Boolean)), [winners]);
  const [stateFilter, setStateFilter] = useState("ALL");
  const allYears = useMemo(() => new Set(winners.map((w) => w.year).filter(Boolean)), [winners]);
  const [yearFilter, setYearFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return winners
      .filter((w) => w.divisionKey === activeDivision)
      .filter((w) => (stateFilter === "ALL" ? true : w.state === stateFilter))
      .filter((w) => (yearFilter === "ALL" ? true : w.year === yearFilter))
      .filter((w) =>
        query.trim() === ""
          ? true
          : [w.athleteName, w.eventName, String(w.year)].filter(Boolean).some((v) => v.toLowerCase().includes(query.toLowerCase()))
      )
      .sort((a, b) => b.year - a.year);
  }, [winners, activeDivision, stateFilter, yearFilter, query]);

  const grouped = useMemo(() => groupByYear(filtered), [filtered]);
  const groupedYears = useMemo(() => Object.keys(grouped).map(Number).sort((a, b) => b - a), [grouped]);

  return (
    <>
      <Seo
        title="Pro Champions"
        description="Every ICN Australia Pro division champion by year and state. Explore Pro Men's Bodybuilding, Pro Bikini, Pro Figure, and more."
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <SectionHeader
          title="ICN Australia – Pro Champions"
          subtitle="Showcasing every ICN Pro division winner in Australia. Use the filters to browse by division, state, and year."
        />

        {/* Controls */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <DivisionTabs
            divisions={availableDivisions.length ? availableDivisions : DIVISION_META}
            activeKey={activeDivision}
            setActiveKey={setActiveDivision}
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <SearchBar value={query} onChange={setQuery} />
            <div className="flex-1" />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wide text-b/60">State</div>
              <StateFilter value={stateFilter} onChange={setStateFilter} availableStates={allStates} />
            </div>
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wide text-b/60">Year</div>
              <YearFilter years={allYears} activeYear={yearFilter} setActiveYear={setYearFilter} />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 sm:mt-12">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-b/30 p-8 text-center text-b/60">
              No champions found. Try different filters.
            </div>
          ) : (
            groupedYears.map((yr) => (
              <section key={yr} className="mb-10 sm:mb-12">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-b">{yr}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {grouped[yr].map((w) => (
                    <ProCard key={w.id} winner={w} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>

        <div className="mt-10 sm:mt-16 text-xs text-b/50">
          * A “Pro” athlete is defined here as the winner of a Pro division class in an Australian ICN event.
        </div>
      </main>
    </>
  );
}
