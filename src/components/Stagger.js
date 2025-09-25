import { motion, useReducedMotion } from "framer-motion";

export function Stagger({
  children,
  delayChildren = 0.1,
  staggerChildren = 0.08,
  once = true,
  amount = 0.25,
  className = "",
}) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced
    ? {}
    : {
        hidden: {},
        show: {
          transition: { staggerChildren, delayChildren },
        },
      };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 20,
  duration = 0.45,
  className = "",
}) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced
    ? {}
    : {
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: "easeOut" } },
      };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
