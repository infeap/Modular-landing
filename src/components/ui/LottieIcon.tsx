"use client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { useInView } from "framer-motion";

export interface LottieIconHandle {
  play: () => void;
}

interface LottieIconProps {
  src: string;
  className?: string;
  loop?: boolean;
  /** "hover" = play via ref from parent, "inView" = play once when scrolled into view, "auto" = default lottie behavior */
  trigger?: "auto" | "hover" | "inView";
  /** Playback speed (1 = normal, 0.5 = half speed) */
  speed?: number;
}

export const LottieIcon = forwardRef<LottieIconHandle, LottieIconProps>(
  function LottieIcon({ src, className, loop = true, trigger = "auto", speed = 1 }, ref) {
    const [animationData, setAnimationData] = useState<unknown>(null);
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // Always attach the ref so useInView works even before data loads
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });
    const hasPlayedInViewRef = useRef(false);

    useEffect(() => {
      fetch(src)
        .then((res) => res.json())
        .then(setAnimationData)
        .catch(() => {});
    }, [src]);

    // When animation data loads OR when element comes into view — handle setup + trigger
    useEffect(() => {
      if (!lottieRef.current || !animationData) return;

      if (speed !== 1) lottieRef.current.setSpeed(speed);

      if (trigger === "hover") {
        lottieRef.current.goToAndStop(0, true);
      }

      if (trigger === "inView") {
        if (isInView && !hasPlayedInViewRef.current) {
          // Already in view — play immediately (with a frame delay so stop doesn't override)
          hasPlayedInViewRef.current = true;
          lottieRef.current.goToAndStop(0, true);
          requestAnimationFrame(() => {
            lottieRef.current?.goToAndPlay(0, true);
          });
        } else if (!isInView) {
          // Not yet in view — just stop at frame 0
          lottieRef.current.goToAndStop(0, true);
        }
      }
    }, [animationData, trigger, speed, isInView]);

    // Expose play() to parent via ref
    useImperativeHandle(ref, () => ({
      play: () => {
        lottieRef.current?.goToAndPlay(0, true);
      },
    }));

    // Always render the container so the ref is attached for useInView
    return (
      <div ref={containerRef} className={className}>
        {animationData && (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={trigger === "auto" ? loop : false}
            autoplay={trigger === "auto"}
            className="w-full h-full"
          />
        )}
      </div>
    );
  }
);
