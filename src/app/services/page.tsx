import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold leading-tight text-brand-cobalt">
        Services
      </h1>
      <p className="mt-6">This page is being rebuilt. Check back soon.</p>
    </main>
  );
}
