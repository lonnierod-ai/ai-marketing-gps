import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* REMOVED DUPLICATE HEADER - layout.tsx already has the main header */}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          About AI Marketing GPS
        </h1>

        <div className="bg-white rounded-lg shadow-sm border p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What is AI Marketing GPS?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              AI Marketing GPS is a goal-first AI marketing tool finder that
              helps content marketers discover the right AI tools for their
              specific needs. Instead of browsing endless tool lists, simply
              describe what you want to achieve, and we'll guide you to the
              tools that help you get there.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our application uses Claude AI to understand your marketing goals
              in natural language and matches them to our curated database of AI
              marketing tools. You receive:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Tool recommendations tailored to your specific goal</li>
              <li>Step-by-step workflows showing how to use the tools</li>
              <li>Example prompts to get you started quickly</li>
              <li>Pro tips from marketing experts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Data Source
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All tool information is curated from{" "}
              <strong>
                Q'dUp Content Marketing Agency's AI Toolkit (November 2025)
              </strong>
              . The toolkit provides comprehensive, verified information about AI
              tools for content marketing, including descriptions, use cases,
              pricing, and expert recommendations.
            </p>
          </section>

          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Important Disclaimer
            </h3>
            <p className="text-sm text-yellow-700 mb-2">
              This application does not endorse or recommend any specific tools.
              We provide information to help you make informed decisions, but:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700 ml-4">
              <li>
                Tool features, pricing, and availability change frequently
              </li>
              <li>
                Always verify current information directly with tool vendors
              </li>
              <li>Test tools yourself before purchasing or implementing</li>
              <li>We receive no compensation from any tool vendors</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Built With
            </h2>
            <p className="text-gray-700 leading-relaxed">
              AI Marketing GPS is built with Next.js 16, TypeScript, and Tailwind
              CSS. It uses Anthropic's Claude API to parse user queries and match
              them to relevant marketing goals and tools.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p className="mb-2">
            Data curated from Q'dUp Content Marketing Agency's AI Toolkit
            (November 2025)
          </p>
          <p className="text-sm">
            AI tools and features are subject to change. Always verify current
            information with vendors.
          </p>
        </div>
      </footer>
    </div>
  );
}
