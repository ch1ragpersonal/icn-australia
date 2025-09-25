// src/components/Presidents.jsx
import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { FaEnvelope } from "react-icons/fa";
export { sortPresidentsForDisplay }; // the sorter with VP/priority rules
export { useUniformHeights };        // the ResizeObserver hook (SSR-safe)


/* ------------------------- helpers: state + sorting ------------------------- */

// Turn "ICN QLD President" → "Queensland", "ICN NSW President" → "New South Wales", etc.
const deriveStateName = (title = "", explicitStateName = "") => {
  const raw =
    (explicitStateName || title.match(/ICN\s+(.+?)\s+President/i)?.[1] || "")
      .trim()
      .replace(/^Co[-\s]?/i, ""); // drop "Co-" so it sorts with the state
  if (!raw) return "";

  // Normalise common abbreviations
  const map = {
    NSW: "New South Wales",
    QLD: "Queensland",
    VIC: "Victoria",
    "CO VICTORIAN": "Victoria",
    VICTORIAN: "Victoria",
    WA: "Western Australia",
    SA: "South Australia",
    TAS: "Tasmania",
    NT: "Northern Territory",
    ACT: "Australian Capital Territory",
  };

  const upper = raw.toUpperCase();
  if (map[upper]) return map[upper];

  // Fall back to capitalised raw
  return raw
    .toLowerCase()
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();
};

/**
 * Sort:
 * 1) Nick Boutzos always first
 * 2) Then everyone else alphabetically by state name
 * 3) The single president with priority === "No" goes LAST
 *
 * Expected fields per item:
 * - name (string)
 * - title (string like "ICN QLD President") OR stateName (string)
 * - priority (string | undefined) -> "Yes" | "No" | "" (Nick has "Yes", one person has "No")
 */
/* ---- helpers ---- */
const yes = (v) => String(v ?? "").trim().toLowerCase() === "yes";
const no  = (v) => String(v ?? "").trim().toLowerCase() === "no";
const getVP = (p) =>
  p?.vicePresident ?? p?.VicePresident ?? p?.vice_president ?? ""; // support various casings

const getPriority = (p) => String(p?.priority ?? "").trim().toLowerCase();
const isNick = (p) => /nick\s+boutzos/i.test(p?.name || "");

/* ---- state name normaliser (keep your existing deriveStateName) ---- */
// const deriveStateName = (title, explicitStateName) => { ... }

/* ---- final sorter ---- */
const sortPresidentsForDisplay = (arr = []) => {
  if (!arr.length) return [];

  // Pull Nick out first so nothing ever precedes him
  const nick = arr.find(isNick) || null;
  const restAll = nick ? arr.filter((p) => !isNick(p)) : [...arr];

  // Priority buckets
  const prYes = restAll.filter((p) => getPriority(p) === "yes");
  const prNo  = restAll.filter((p) => getPriority(p) === "no");
  const prMid = restAll.filter((p) => {
    const v = getPriority(p);
    return v !== "yes" && v !== "no";
  });

  // Within the mid bucket, split by VicePresident
  const vpNo  = prMid.filter((p) => !yes(getVP(p))); // Presidents (No)
  const vpYes = prMid.filter((p) =>  yes(getVP(p))); // Vice Presidents (Yes)

  // Sorting helper: by derived state name
  const byState = (a, b) => {
    const aState = deriveStateName(a?.title, a?.stateName);
    const bState = deriveStateName(b?.title, b?.stateName);
    return aState.localeCompare(bState, "en", { sensitivity: "base" });
  };

  // Sort each bucket
  prYes.sort(byState);
  vpNo.sort(byState);
  vpYes.sort(byState);
  prNo.sort(byState);

  // If Nick was in prYes originally, keep him first, then the rest of prYes
  // (If Nick wasn't priority:yes, he still stays first overall per spec.)
  const head = [];
  if (nick) head.push(nick);

  return [...head, ...prYes, ...vpNo, ...vpYes, ...prNo].filter(Boolean);
};


/* -------------------------- uniform height hook --------------------------- */

const useUniformHeights = (count) => {
  const refs = useRef([]);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const measure = () => {
      const max = Math.max(
        0,
        ...refs.current.map((el) => (el ? el.offsetHeight : 0))
      );
      setHeight(max || null);
    };

    const ro = new ResizeObserver(measure);
    refs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    measure();

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [count]);

  return [refs, height];
};

/* ---------------------------- Modal (with portal) --------------------------- */

const Modal = ({ open, onClose, children, title, avatar, subtitle }) => {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const denom = Math.max(1, el.scrollHeight - el.clientHeight);
      const pct = el.scrollTop / denom;
      setProgress(Math.min(1, Math.max(0, pct)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [open]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4 md:p-6">
        <div className="w-[min(1200px,92vw)] max-h-[90vh] overflow-hidden rounded-2xl bg-neutral-950 text-white shadow-2xl ring-1 ring-white/10">
          <div className="h-[3px] bg-a transition-[width]" style={{ width: `${progress * 100}%` }} />
          <div className="flex items-center gap-4 p-5 md:p-6">
            {avatar && (
              <img
                src={avatar}
                alt={title}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white/20"
              />
            )}
            <div className="min-w-0">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{title}</h3>
              {subtitle && <p className="text-white/70 text-sm md:text-base">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="ml-auto inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold bg-white text-black hover:bg-a/90 hover:text-white transition"
            >
              Close
            </button>
          </div>

          <div
            ref={scrollRef}
            className="relative overflow-y-auto px-5 pb-10 md:px-10 lg:pb-12 [mask-image:linear-gradient(to_bottom,transparent,black_14px,black_calc(100%-14px),transparent)]"
            style={{ maxHeight: "calc(90vh - 84px)" }}
          >
            <div className="mx-auto w-full max-w-3xl">{children}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ----------------------------- Bio renderer -------------------------------- */

const BioRenderer = ({ raw }) => {
  const options = useMemo(
    () => ({
      renderMark: {
        [MARKS.BOLD]: (text) => <strong className="font-semibold">{text}</strong>,
        [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
      },
      renderNode: {
        [BLOCKS.HEADING_1]: (_, children) => (
          <h2 className="mt-8 mb-3 text-2xl md:text-3xl font-extrabold">{children}</h2>
        ),
        [BLOCKS.HEADING_2]: (_, children) => (
          <h3 className="mt-8 mb-3 text-xl md:text-2xl font-extrabold">{children}</h3>
        ),
        [BLOCKS.HEADING_3]: (_, children) => (
          <h4 className="mt-6 mb-2 text-lg md:text-xl font-bold">{children}</h4>
        ),
        [BLOCKS.PARAGRAPH]: (_, children) => (
          <p className="mb-4 text-[17px] leading-7 tracking-tight text-white/90">{children}</p>
        ),
        [BLOCKS.QUOTE]: (_, children) => (
          <blockquote className="my-6 border-l-4 border-a/90 pl-4 text-white/90 italic">
            {children}
          </blockquote>
        ),
        [BLOCKS.UL_LIST]: (_, children) => (
          <ul className="mb-5 ml-5 list-disc space-y-2 marker:text-a/90">{children}</ul>
        ),
        [BLOCKS.OL_LIST]: (_, children) => (
          <ol className="mb-5 ml-5 list-decimal space-y-2 marker:text-a/90">{children}</ol>
        ),
        [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
        [INLINES.HYPERLINK]: (node, children) => {
          const url = node.data.uri;
          return (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-a/90 underline-offset-4 hover:text-a/90"
            >
              {children}
            </a>
          );
        },
      },
    }),
    []
  );

  if (!raw) return null;
  const doc = JSON.parse(raw);
  return <div className="text-balance">{documentToReactComponents(doc, options)}</div>;
};

/* ------------------------------ Card (ref) --------------------------------- */

export const PresidentCard = forwardRef(({ president, style }, ref) => {
  const { name, title, photo, bio, contact } = president;
  const [open, setOpen] = useState(false);

  return (
    <>
      <article
        ref={ref}
        style={style}
        className="h-full flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        {/* Photo (fixed height for consistency) */}
        {photo && (
          <img src={photo} alt={name} className="h-44 w-full object-cover" />
        )}

        {/* Content (flex so button sticks to bottom) */}
        <div className="flex grow flex-col p-4 md:p-5">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-black/10">
              <img src={photo} alt={name} className="h-full w-full object-cover" />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-extrabold tracking-tight text-black">
                {name}
              </h3>
              {/* Allow 2 lines max for subtitle to reduce height variance */}
              <p className="text-sm text-black/70 line-clamp-2">{title}</p>
            </div>

            {contact && (
              <a
                href={`mailto:${contact}`}
                className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-black text-black transition hover:bg-black hover:text-white"
                aria-label={`Email ${name}`}
                title={`Email ${name}`}
              >
                <FaEnvelope />
              </a>
            )}
          </div>

          {bio?.raw && (
            <div className="mt-3 text-sm text-black/80">Read bio →</div>
          )}

          <div className="mt-auto pt-4">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-black px-4 py-2 text-sm font-bold text-black transition hover:bg-black hover:text-white"
            >
              View Bio
            </button>
          </div>
        </div>
      </article>

      <Modal open={open} onClose={() => setOpen(false)} title={name} avatar={photo} subtitle={title}>
        <BioRenderer raw={bio?.raw} />
      </Modal>
    </>
  );
});

/* --------------------------- List with sorting ----------------------------- */

const Presidents = ({ items = [] }) => {
  // 1) Sort as requested
  const sorted = useMemo(() => sortPresidentsForDisplay(items), [items]);

  // 2) Make all cards the height of the tallest card
  const [refs, height] = useUniformHeights(sorted.length);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {sorted.map((p, i) => (
        <PresidentCard
          key={p.id || p.slug || p.name || i}
          president={p}
          ref={(el) => (refs.current[i] = el)}
          style={height ? { height } : undefined}
        />
      ))}
    </div>
  );
};

export default Presidents;
