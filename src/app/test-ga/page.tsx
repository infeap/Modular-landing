"use client";

export default function TestGA() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "INTE SATT";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Google Analytics Test</h1>

        <div className="bg-slate-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3">Miljövariabel:</h2>
          <code className="text-green-400 text-lg">
            NEXT_PUBLIC_GA_MEASUREMENT_ID = {gaId}
          </code>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3">Gtag Status:</h2>
          <code className="text-blue-400">
            {typeof window !== "undefined" && (window as any).gtag
              ? "✅ gtag() är laddat"
              : "❌ gtag() är INTE laddat (godkänn cookies på startsidan först)"}
          </code>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Instruktioner:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Gå tillbaka till startsidan (länk nedan)</li>
            <li>Godkänn cookie-bannern</li>
            <li>Kom tillbaka hit</li>
            <li>Uppdatera sidan (F5)</li>
            <li>Gtag ska nu vara laddat ✅</li>
          </ol>
        </div>

        <div className="mt-6">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
          >
            ← Tillbaka till startsidan
          </a>
        </div>
      </div>
    </div>
  );
}
