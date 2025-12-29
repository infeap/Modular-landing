"use client";

import { Github, Twitter, Linkedin, Mail, Heart, Cookie } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { resetCookieConsent } from "./CookieConsent";

const navigation = {
  product: [
    { name: "Funktioner", href: "#features" },
    { name: "FAQ", href: "#faq" },
    { name: "Early Access", href: "#early-access" },
  ],
  company: [
    { name: "Om oss", href: "#" },
    { name: "Kontakt", href: "#" },
    { name: "Karriär", href: "#" },
  ],
  legal: [
    { name: "Integritetspolicy", href: "/integritetspolicy" },
    { name: "Användarvillkor", href: "#" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "GitHub",
      href: "#",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
    {
      name: "Email",
      href: "mailto:kontakt@modular.se",
      icon: Mail,
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleCookieSettings = () => {
    resetCookieConsent();
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/assets/Modular_logo_icon.png"
                alt="Modular"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Modular
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Produktivitetsverktyg för installationsbranschen. Dokumentmallar, kabeldimensioneringar, effektberäkningar och mycket mer.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produkt</h3>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Företag</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Juridiskt</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith("/") ? (
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
              {/* Cookie Settings Button */}
              <li>
                <button
                  onClick={handleCookieSettings}
                  className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Cookie className="w-4 h-4" />
                  Cookie-inställningar
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © {currentYear} Modular. Alla rättigheter förbehållna.
            </p>
            <p className="text-sm text-slate-400 flex items-center gap-1">
              Gjord med <Heart className="w-4 h-4 text-red-500 fill-red-500" /> i Sverige
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
