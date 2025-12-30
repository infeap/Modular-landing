"use client";

import { useEffect, useRef } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function ScrollTracking() {
  const { trackEvent } = useAnalytics();
  const scrollThresholds = useRef({
    25: false,
    50: false,
    75: false,
    100: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercent = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      // Track scroll milestones
      Object.entries(scrollThresholds.current).forEach(([threshold, tracked]) => {
        const thresholdNum = parseInt(threshold);
        if (scrollPercent >= thresholdNum && !tracked) {
          scrollThresholds.current[thresholdNum as keyof typeof scrollThresholds.current] = true;
          trackEvent("scroll_depth", {
            event_category: "engagement",
            event_label: `${threshold}%`,
            value: thresholdNum,
          });
        }
      });
    };

    // Add scroll listener with throttling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [trackEvent]);

  // This component doesn't render anything
  return null;
}
