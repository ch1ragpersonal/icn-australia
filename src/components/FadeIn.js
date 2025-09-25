import { motion, useReducedMotion } from "framer-motion";

export default function FadeIn({
  as: Tag = "div",
  y = 32,              // pixels to rise from
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,        // how much needs to be in view to trigger
  children,
  className = "",
}) {
  const prefersReduced = useReducedMotion();
  const initial = prefersReduced ? {} : { opacity: 0, y };
  const animate = prefersReduced ? {} : { opacity: 1, y: 0 };

  return (
    <motion.div
      as={Tag}
      className={className}
      initial={initial}
      whileInView={animate}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
