"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right" | "none";

interface Options {
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  childSelector?: string;
}

/**
 * Attach to a container ref. On scroll into view, animates the container
 * (or its children if `childSelector` is given) into place.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  opts: Options = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      direction = "up",
      distance = 40,
      duration = 0.7,
      delay = 0,
      stagger = 0.1,
      childSelector,
    } = opts;

    const from: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: "power3.out",
    };

    if (direction === "up") from.y = distance;
    else if (direction === "down") from.y = -distance;
    else if (direction === "left") from.x = distance;
    else if (direction === "right") from.x = -distance;

    const targets = childSelector ? el.querySelectorAll(childSelector) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { ...from, opacity: 0 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          stagger: childSelector ? stagger : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
