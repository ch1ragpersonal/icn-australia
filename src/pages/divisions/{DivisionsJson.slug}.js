// src/pages/divisions/{DivisionsJson.slug}.js
import { Link, graphql, withPrefix } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Seo from "../../components/seo";

export const Head = ({ data }) => {
  const d = data?.divisionsJson;
  return <Seo title={d?.title || "Division"} description={d?.description?.slice(0, 160)} />;
};

export default function DivisionPage({ data }) {
  const d = data.divisionsJson;

  const hero = getImage(d?.image);

  return (
    <>
      {/* HERO – same visual as your old template, but pinned so it can't drift */}
      <section className="relative h-[42vh] min-h-[320px] w-full bg-neutral-900 overflow-hidden">
        {hero ? (
          <GatsbyImage
            image={hero}
            alt={d.title}
            className="absolute inset-0 h-full w-full z-0"
            imgStyle={{ objectFit: "cover", objectPosition: "50% 20%" }}
          />
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-neutral-900 to-neutral-800" />
        )}

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />

        {/* Title + gender pill, styled like before */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="max-w-6xl mx-auto px-6 pb-10">
            <div>
              {d.gender && (
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur">
                  {d.gender === "male" ? "Men" : d.gender === "female" ? "Women" : "Open"}
                </span>
              )}
              <h1 className="mt-3 inline-block rounded-2xl bg-black/80 px-5 py-2 text-3xl sm:text-4xl font-extrabold text-white shadow-md">
                {d.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Soft shadow edge */}
        <div className="absolute bottom-0 left-0 right-0 h-8 z-20 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      </section>

      {/* BODY – mirrors your old layout */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-10 items-start">
          {/* Main content */}
          <article className="max-w-none">
            {/* Overview */}
            <section className="mb-10">
              <h2 className="text-2xl font-extrabold tracking-tight">Overview</h2>
              <p className="mt-3 text-lg leading-7 text-neutral-700">
                {d.description || "More information coming soon."}
              </p>
            </section>

            {/* Attire */}
            {d.attire && (
              <section className="mb-10">
                <h2 className="text-2xl font-extrabold tracking-tight">Attire</h2>
                <p className="mt-3 text-neutral-700">{d.attire}</p>
              </section>
            )}

            {/* Judging Criteria */}
            {Array.isArray(d.judgingCriteria) && d.judgingCriteria.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-extrabold tracking-tight">Judging Criteria</h2>
                <ul className="mt-4 space-y-2">
                  {d.judgingCriteria.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-a/90" />
                      <span className="text-neutral-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Stage Walk & Posing */}
            {d.stageWalkPosing && (
              <section className="mb-10">
                <h2 className="text-2xl font-extrabold tracking-tight">Stage Walk &amp; Posing</h2>
                <p className="mt-3 text-neutral-700">{d.stageWalkPosing}</p>
              </section>
            )}

            {/* Subdivisions */}
            {Array.isArray(d.subdivisions) && d.subdivisions.length > 0 && (
              <section className="mb-6">
                <h2 className="text-2xl font-extrabold tracking-tight">Subdivisions</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {d.subdivisions.map((s, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Side Card / Quick Facts */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-extrabold">Quick Facts</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-neutral-500">Division</dt>
                  <dd className="font-semibold">{d.title}</dd>
                </div>
                {d.gender && (
                  <div className="flex items-center justify-between">
                    <dt className="text-neutral-500">Category</dt>
                    <dd className="font-semibold capitalize">{d.gender}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to="/competitions"
                  className="inline-flex items-center justify-center rounded-full border-2 border-black px-4 py-2 font-bold text-black hover:bg-black hover:text-white transition"
                >
                  Find a Competition
                </Link>

                {/* If PDFs live under /static, keep withPrefix */}
                {d.pdf && (
                  <a
                    href={withPrefix(d.pdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border-2 border-a/90 px-4 py-2 font-bold text-a/90 hover:bg-a/90 hover:text-white transition"
                  >
                    Download Division PDF
                  </a>
                )}
              </div>
            </div>

            {/* Optional extra image (uses same hero) */}
            {hero && (
              <div className="flex justify-center">
                <GatsbyImage
                  image={hero}
                  alt={`${d.title} example`}
                  className="rounded-2xl border border-black/10 shadow-sm w-1/2"
                  imgStyle={{ objectFit: "cover" }}
                />
              </div>
            )}
          </aside>
        </div>

        {/* Back button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-a px-5 py-3 font-semibold text-white shadow hover:bg-a/90 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}

export const query = graphql`
  query DivisionBySlug($slug: String!) {
    divisionsJson(slug: { eq: $slug }) {
      slug
      title
      gender
      description
      attire
      judgingCriteria
      stageWalkPosing
      subdivisions
      image {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            width: 1600
            quality: 80
          )
        }
      }
    }
  }
`;
