// The consulting offers (spec section 8). The homepage's "How I can help"
// shows them as cards linking to their sections on /services, which uses
// the same ids as anchors. Card copy is final; no em dashes.

export type Offer = {
  // Anchor id of the offer's section on /services
  id: string;
  title: string;
  card: string;
};

export const offerHref = (offer: Offer) => `/services#${offer.id}`;

// The front door
export const AUDIT: Offer = {
  id: "audit",
  title: "Audit",
  card: "Not sure where AI fits yet? Start with an audit. A structured look at your business: where time goes, where money leaks, where AI does the most work. You leave with a clear roadmap.",
};

export const OFFER_GROUPS: { label: string; offers: Offer[] }[] = [
  {
    label: "Done for you",
    offers: [
      {
        id: "custom-tool-building",
        title: "Custom Tool Building",
        card: "CRMs, pipelines, dashboards, and AI workflows, built around your business instead of the other way around. You approve the blueprint before I build a thing.",
      },
      {
        id: "workflow-architecture",
        title: "Workflow Architecture",
        card: "Connecting the tools you already use, with AI where it helps, inside encrypted, confidential sandboxes when your data calls for it.",
      },
    ],
  },
  {
    label: "Done with you",
    offers: [
      {
        id: "coaching",
        title: "Coaching",
        card: "Ready to start learning? One-on-one coaching built around your actual workflow. Real tools, real tasks, your business. At your pace, in your language, until it's actually working.",
      },
      {
        id: "advisory",
        title: "Advisory",
        card: "Already moving and want to stay ahead? Some clients keep me in their corner as the tools evolve and the business grows. Not a contract. Just a conversation that doesn't end.",
      },
    ],
  },
];
