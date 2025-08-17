import React, { useState, useEffect, useRef } from "react";

const Counter = ({ target = 1972, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          startCounting();
          setHasAnimated(true);
        }
      },
      { threshold: 0.4 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCounting = () => {
    let start = 0;
    const increment = target / (duration / 16); // 60fps approx.
    const step = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  };

  const formatNumber = (num) => {
    return num.toLocaleString(); // adds commas
  };

  return (
    <div
      ref={counterRef}
      className="text-6xl md:text-7xl font-extrabold text-gray-900"
    >
      {formatNumber(count)}
    </div>
  );
};

export default Counter;
