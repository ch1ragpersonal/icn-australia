const req = require.context(
  "../images/divisions",
  true,
  /\.(png|jpe?g|webp|avif|gif|svg)$/i
);

export function resolveImage(jsonPath) {
  if (!jsonPath) return null;
  const normalized = jsonPath.replace(/^\/?images\//, "./");
  try {
    const mod = req(normalized);
    // Webpack 5/asset modules may return { default: 'url' }
    return (mod && mod.default) ? mod.default : mod;
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("resolveImage: not found:", normalized);
    }
    return null;
  }
}