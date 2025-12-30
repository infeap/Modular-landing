"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

// IMPORTANT: Replace this with your actual Google Analytics Measurement ID
// Get it from: Google Analytics > Admin > Data Streams > Your Stream > Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-L2K6QSQQ41";

interface GoogleAnalyticsProps {
  consentGiven: boolean;
}

export default function GoogleAnalytics({ consentGiven }: GoogleAnalyticsProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only load GA if consent has been given
    if (consentGiven) {
      setShouldLoad(true);
    }
  }, [consentGiven]);

  // Don't render anything if consent hasn't been given or if GA ID is not configured
  if (!shouldLoad || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Configure GA with privacy-focused settings
          gtag('config', '${GA_MEASUREMENT_ID}', {
            // Anonymize IP addresses
            'anonymize_ip': true,
            // Disable advertising features
            'allow_google_signals': false,
            'allow_ad_personalization_signals': false,
            // Cookie settings
            'cookie_flags': 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}

// Helper function to track page views (for use in other components if needed)
export function trackPageView(url: string) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

// Helper function to track events (for use in other components if needed)
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

