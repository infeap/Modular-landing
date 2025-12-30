"use client";

import { useCallback } from "react";

// Track custom events
export function useAnalytics() {
  const trackEvent = useCallback((
    eventName: string,
    params?: Record<string, any>
  ) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, params);
    }
  }, []);

  const trackClick = useCallback((
    elementName: string,
    category: string = "engagement"
  ) => {
    trackEvent("click", {
      event_category: category,
      event_label: elementName,
    });
  }, [trackEvent]);

  const trackFormSubmit = useCallback((
    formName: string,
    success: boolean = true
  ) => {
    trackEvent(success ? "form_submit_success" : "form_submit_error", {
      event_category: "form",
      event_label: formName,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackClick,
    trackFormSubmit,
  };
}
