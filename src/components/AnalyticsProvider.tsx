"use client";

import { useState, useEffect, useCallback } from "react";
import CookieConsent, { ConsentStatus } from "./CookieConsent";
import GoogleAnalytics from "./GoogleAnalytics";

const CONSENT_KEY = "modular_cookie_consent";

export default function AnalyticsProvider() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");

  // Check for existing consent on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (savedConsent === "accepted" || savedConsent === "rejected") {
      setConsentStatus(savedConsent as ConsentStatus);
    }
  }, []);

  const handleConsentChange = useCallback((status: ConsentStatus) => {
    setConsentStatus(status);
  }, []);

  return (
    <>
      {/* Cookie Consent Banner */}
      <CookieConsent onConsentChange={handleConsentChange} />
      
      {/* Google Analytics - only loads if consent is given */}
      <GoogleAnalytics consentGiven={consentStatus === "accepted"} />
    </>
  );
}

