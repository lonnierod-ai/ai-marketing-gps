import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold leading-tight text-brand-cobalt">
        Resources
      </h1>
      <p className="mt-6">
        This page is being rebuilt. In the meantime, you can still{" "}
        <Link href="/tools" className="underline">
          browse the AI tool directory
        </Link>{" "}
        or{" "}
        <Link href="/goals" className="underline">
          explore tools by marketing goal
        </Link>
        .
      </p>
    </main>
  );
}
