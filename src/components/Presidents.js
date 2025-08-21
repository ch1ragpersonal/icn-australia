// src/components/Presidents.jsx
import React, { useMemo, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";                // ⬅️ NEW
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { FaEnvelope } from "react-icons/fa";
import { GatsbyImage, getImage } from "gatsby-plugin-image";


/* ---------------------------- Modal (with portal) --------------------------- */
const Modal = ({ open, onClose, children, title, avatar, subtitle }) => {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // portal target
  useEffect(() => {
    setMounted(true);
  }, []);

  // lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prev;
    };
  }, [open]);

  // progress bar based on inner scrollable area
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
    onScroll(); // init
    return () => el.removeEventListener("scroll", onScroll);
  }, [open]);

  if (!open || !mounted) return null;

  // Render outside Swiper (prevents clipping)
  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Centering layer */}
      <div className="absolute inset-0 grid place-items-center p-4 md:p-6">
        {/* Modal */}
        <div
          className="
            w-[min(1200px,92vw)] max-h-[90vh]
            overflow-hidden rounded-2xl bg-neutral-950 text-white
            shadow-2xl ring-1 ring-white/10
          "
        >
          {/* Progress bar */}
          <div
            className="h-[3px] bg-red-600 transition-[width]"
            style={{ width: `${progress * 100}%` }}
          />

          {/* Header */}
          <div className="flex items-center gap-4 p-5 md:p-6">
            {avatar && (
              <img
                src={avatar}
                alt={title}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-white/20"
              />
            )}
            <div className="min-w-0">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-white/70 text-sm md:text-base">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="ml-auto inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold
                         bg-white text-black hover:bg-red-600 hover:text-white transition"
            >
              Close
            </button>
          </div>

          {/* Body (scrollable) */}
          <div
            ref={scrollRef}
            className="
              relative overflow-y-auto px-5 pb-10 md:px-10
              /* give extra breathing room at bottom so last line never hides */
              lg:pb-12
              /* soft fade on very top/bottom edges (not clipping) */
              [mask-image:linear-gradient(to_bottom,transparent,black_14px,black_calc(100%-14px),transparent)]
            "
            style={{ maxHeight: "calc(90vh - 84px)" }} /* header ~84px */
          >
            <div className="mx-auto w-full max-w-3xl">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
/* -------------------------------------------------------------------------- */

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
          <blockquote className="my-6 border-l-4 border-red-600 pl-4 text-white/90 italic">
            {children}
          </blockquote>
        ),
        [BLOCKS.UL_LIST]: (_, children) => (
          <ul className="mb-5 ml-5 list-disc space-y-2 marker:text-red-500">{children}</ul>
        ),
        [BLOCKS.OL_LIST]: (_, children) => (
          <ol className="mb-5 ml-5 list-decimal space-y-2 marker:text-red-500">{children}</ol>
        ),
        [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
        [INLINES.HYPERLINK]: (node, children) => {
          const url = node.data.uri;
          return (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-red-600 underline-offset-4 hover:text-red-400"
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

const PresidentCard = ({ president }) => {
  const { name, title, photo, bio, contact } = president;
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card */}
      <article
        className="
          group relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-sm
          hover:shadow-lg transition hover:-translate-y-0.5
        "
      >
        {/* Photo */}
        {photo && (
          <img src={photo} alt={name} className="h-44 w-full object-cover" />
        )}

        {/* Content */}
        <div className="p-4 md:p-5">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-black/10">
              <img src={photo} alt={name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-extrabold tracking-tight text-black">{name}</h3>
              <p className="text-sm text-black/70">{title}</p>
            </div>

            {/* Contact */}
            {contact && (
              <a
                href={`mailto:${contact}`}
                className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full
                           border-2 border-black text-black hover:bg-black hover:text-white transition"
                aria-label={`Email ${name}`}
                title={`Email ${name}`}
              >
                <FaEnvelope />
              </a>
            )}
          </div>

          {/* Bio teaser */}
          {bio?.raw && (
            <div className="mt-3 text-sm text-black/80 line-clamp-2">Read bio →</div>
          )}

          <div className="mt-4">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-black
                         px-4 py-2 text-sm font-bold text-black hover:bg-black hover:text-white transition"
            >
              View Bio
            </button>
          </div>
        </div>
      </article>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={name}
        avatar={photo}
        subtitle={title}
      >
        <BioRenderer raw={bio?.raw} />
      </Modal>
    </>
  );
};

export default PresidentCard;
