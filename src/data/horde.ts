/**
 * The horde, as data.
 *
 * Everything the site renders comes from this file. Adding a new piece of work
 * means adding one entry here — the rack, the case-study routes, the sitemap and
 * the hero motion sequence all read from it.
 *
 * NAMES TO CONFIRM (see README): the storefront screenshot brands itself
 * "Luma Dew" and the accounting app brands itself "Ledgerly", while the brief
 * called them "Lamadew Cosmetics" and "Mr. Mouse / PocketAccountant". The brief's
 * names are used below. Change `name` / `productName` here and it propagates
 * everywhere.
 */

export type PieceStatus = "Live" | "Running" | "In build";

export type SpecRow = { label: string; value: string };

export type Piece = {
  slug: string;
  /** Rack position. The armory keeps an inventory, so the numbering is real. */
  rack: string;
  name: string;
  /** In-product brand, where it differs from the piece name. */
  productName?: string;
  client: string;
  kind: string;
  status: PieceStatus;
  /** Pulled from the build's own interface, so each piece keeps its own identity. */
  accent: string;
  url?: string;
  urlLabel?: string;
  /** One line for the rack listing. */
  summary: string;
  /** Case study: what was actually wrong. */
  problem: string[];
  /** Case study: what was built, and why that shape. */
  solution: string[];
  /** Spec plate — facts, not adjectives. */
  spec: SpecRow[];
  /** Details observable in the shipped product. */
  proof: string[];
  /** Cross-reference to another piece in the horde. */
  pairedWith?: { slug: string; note: string };
  /** Internal page this piece owns, if any. */
  ownPage?: { href: string; label: string };
};

export const PIECES: Piece[] = [
  {
    slug: "divic-exclusive-hotels",
    rack: "01",
    name: "Divic Exclusive Hotels",
    client: "Divic Exclusive Hotels — Festac, Lagos",
    kind: "Hospitality site & stay-request flow",
    status: "Live",
    accent: "#9a4f1b",
    url: "https://divicexclusivehotels.com.ng",
    urlLabel: "divicexclusivehotels.com.ng",
    summary:
      "Two properties under one name, one site, and enquiries that file themselves into the hotel's own system.",
    problem: [
      "Divic runs two properties in Festac under a single name — Exclusive 1 and Urban — with different rooms, different floors and different rates. To a guest searching online, that read as either one confusing hotel or two unrelated ones.",
      "Every booking started as a phone call or a WhatsApp message. That works until two people take a request for the same room on the same night, and it leaves nothing behind: no record of who asked, for what, or whether anyone answered.",
    ],
    solution: [
      "One site carrying both properties behind a switcher, so a guest picks Exclusive 1 or Urban and the whole page — rooms, rates, floors — follows them. Nothing is duplicated and neither property is buried.",
      "Rooms are presented individually with the real nightly rate and the floors they sit on, because a guest deciding between ₦45,000 and ₦50,000 wants to know what the difference actually buys.",
      "“Request a stay” does not open a mail client. It writes into the hotel's own property management system, where it lands in a Website requests queue the front desk already works through.",
    ],
    spec: [
      { label: "Properties", value: "Two — Exclusive 1, Urban" },
      { label: "Enquiry model", value: "Request, confirmed by the desk" },
      { label: "Rates shown", value: "Live, per room, per property" },
      { label: "Requests land in", value: "Divic PMS — Website requests" },
    ],
    proof: [
      "Property switcher pinned in the header so guests never lose which hotel they are reading.",
      "Per-room request buttons — “Request this room” — rather than one generic contact form.",
      "Rates and floor assignments quoted per room: Classic Room from ₦50,000 per night, Floor 1 and Floor 2.",
      "Direct line published in the header for guests who would still rather call.",
    ],
    pairedWith: {
      slug: "divic-pms",
      note: "The system that receives every request this site takes.",
    },
  },
  {
    slug: "divic-pms",
    rack: "02",
    name: "Hotel Property Management System",
    client: "Divic Exclusive Hotels — Festac, Lagos",
    kind: "Multi-property operations system",
    status: "Running",
    accent: "#c8a951",
    summary:
      "Front desk, housekeeping, billing and point of sale for two properties, in one system with one truth.",
    problem: [
      "Two properties, fifteen rooms across the floors alone, and the state of each one lived in a different place: a paper register at the desk, a housekeeper's memory, a billing note written later.",
      "Nobody could answer “what is actually available tonight” without walking the building. A room could be cleaned and still be sold as dirty, or be occupied and still be offered.",
      "Requests coming in from the website had no home. They arrived as messages and left as messages.",
    ],
    solution: [
      "One operational system covering both properties, with a switcher at the top so staff work on Exclusive 1 or Urban without logging out of one and into the other.",
      "Room state is modelled honestly, with five states rather than a binary: available, occupied, needs cleaning, being cleaned, out of order. Housekeeping and the front desk read the same board, so a room that has just been turned over is sellable the moment it is marked, not the next time someone asks.",
      "Website requests are a first-class module, not an inbox. Anything the public site takes arrives here and gets worked through by the desk.",
      "Access is role-based, so an owner sees billing and takings across both properties while a desk or housekeeping user sees only the work in front of them.",
    ],
    spec: [
      { label: "Properties", value: "Two, switchable in place" },
      { label: "Modules", value: "Dashboard, Bookings, Front desk, Website requests, Housekeeping, Guests, Billing, Point of sale" },
      { label: "Room states", value: "Five, incl. being-cleaned in progress" },
      { label: "Access", value: "Role-based — owner, desk, housekeeping" },
    ],
    proof: [
      "Housekeeping board laid out floor by floor — ground floor at 6 rooms, first floor at 9 — with each room's type, rate and current state on its face.",
      "Room types and rates carried through the system: Standard ₦40,000, Deluxe ₦45,000, Superior ₦50,000.",
      "Live connection indicator, so staff know the board in front of them is current rather than a stale tab.",
      "Point of sale included alongside billing, because hotel revenue is not only room nights.",
      "An assistant — “Ask about your hotel” — for questions staff would otherwise have to build a report to answer.",
    ],
    pairedWith: {
      slug: "divic-exclusive-hotels",
      note: "The public site whose stay requests feed this system.",
    },
  },
  {
    slug: "lamadew-cosmetics",
    rack: "03",
    name: "Lamadew Cosmetics Shop",
    productName: "Luma Dew",
    client: "Lamadew Cosmetics",
    kind: "Storefront & self-serve admin",
    status: "Live",
    accent: "#6b4630",
    url: "https://lamadewcosmeticshopfrontend.vercel.app",
    urlLabel: "lamadewcosmeticshopfrontend.vercel.app",
    summary:
      "A skincare line that was selling through DMs, given a real catalogue, a real cart, and an admin the owner runs alone.",
    problem: [
      "The products existed; the shop did not. Selling happened in direct messages, which means answering the same questions about price and availability all day and losing the customers who asked at 2am.",
      "Any change to stock or pricing meant the owner going back to whoever built the last thing. A catalogue that needs a developer to update is a catalogue that stops being true within a week.",
    ],
    solution: [
      "A storefront that leads with the promise rather than the product grid, because skincare is bought on a feeling before it is bought on an ingredient list — the page opens on what the range is for, then shows what is in it.",
      "A working cart that survives navigation, so a customer can browse the range and still have their basket when they come back to it.",
      "An admin surface built into the same app. The owner edits the catalogue directly — no deploy, no developer, no waiting.",
    ],
    spec: [
      { label: "Surface", value: "Storefront + owner admin" },
      { label: "Cart", value: "Persistent across the session" },
      { label: "Catalogue", value: "Owner-editable, no deploy" },
      { label: "Hosting", value: "Vercel" },
    ],
    proof: [
      "Storefront opens on the range's actual proposition — “Skin that looks rested, even when you are not” — with the shop one tap away.",
      "Cart count persists in the header as the customer moves through the catalogue.",
      "Admin sits in the main navigation for the owner, not behind a separate tool or a second login journey.",
    ],
  },
  {
    slug: "mr-mouse",
    rack: "04",
    name: "Mr. Mouse",
    productName: "PocketAccountant",
    client: "Horde-M — our own product",
    kind: "Local-first, multi-tenant accounting",
    status: "Live",
    accent: "#4a6b4f",
    summary:
      "Double-entry books that keep themselves, for Nigerian businesses who were keeping them in a notebook.",
    problem: [
      "A small Nigerian business does not fail to keep books because it does not care. It fails because proper bookkeeping asks you to know which of seven ledgers an entry belongs in, and to do that consistently while also running a shop.",
      "The fallback is a notebook and a WhatsApp thread, reconciled by an accountant at month end — which means the owner spends eleven months of the year not knowing whether they are making money.",
      "Where software existed, it assumed a desk, a laptop, steady power and steady data. None of those are safe assumptions.",
    ],
    solution: [
      "Entries go in the way a person would say them, and the app routes each one into the right book — Cash Book, Sales Journal, Purchases Journal or Petty Cash — so the owner never has to hold the accounting model in their head.",
      "Trial Balance and Profit & Loss recalculate the moment an entry lands, and tracked inventory adjusts with it. The books are never a month behind.",
      "Multi-tenant by business, not by device, so a shop's records follow the business across every phone, tablet and desktop the team signs into.",
      "Logging works from Telegram and WhatsApp as well as the app, because the person who knows a sale happened is often not the person holding the laptop.",
      "Deadlines and outstanding balances are tracked and chased automatically, on a schedule the owner sets.",
    ],
    spec: [
      { label: "Books", value: "Cash, Sales, Purchases, Petty Cash, Inventory, Trial Balance, P&L" },
      { label: "Platforms", value: "Android APK, Windows desktop" },
      { label: "Tenancy", value: "Per business, multi-device" },
      { label: "Chat logging", value: "Telegram, WhatsApp" },
      { label: "Market", value: "Nigerian SMEs" },
    ],
    proof: [
      "Reminders track four positions at once: what needs attention, what is owed to you, what you owe, and pending orders.",
      "Reminder delivery is configurable per channel and per lead time — three days before, one day before, on the due date, and once overdue.",
      "Each business carries its own profile — trade, location, contact line — so the app is genuinely multi-tenant rather than one ledger with a label on it.",
      "Ships as a direct Android APK, so onboarding never depends on a Play Store account.",
    ],
    ownPage: { href: "/download", label: "Download Mr. Mouse" },
  },
];

export function getPiece(slug: string): Piece | undefined {
  return PIECES.find((p) => p.slug === slug);
}

/* ---------------------------------------------------------------
   The Armory — what you can pull down.
   --------------------------------------------------------------- */

export type Service = {
  id: string;
  name: string;
  line: string;
  body: string;
  includes: string[];
};

export const SERVICES: Service[] = [
  {
    id: "builds",
    name: "Software builds",
    line: "The thing itself, built and shipped.",
    body: "Storefronts, booking sites, internal systems, operations tooling, mobile apps. Scoped against what the business actually does rather than a feature list, and handed over running — not as a repository you now have to find someone to maintain.",
    includes: [
      "Web applications and storefronts",
      "Operations and back-office systems",
      "Android and desktop applications",
      "Handover, hosting and domain setup",
    ],
  },
  {
    id: "email",
    name: "Business email",
    line: "you@yourbusiness, not yourbusiness1234@gmail.",
    body: "Custom-domain email set up on your own name and sold with the domain, mailboxes and routing configured. It is the cheapest credibility a small business can buy, and the one most of them are missing when they first quote a customer.",
    includes: [
      "Domain registration and DNS",
      "Mailboxes for you and your staff",
      "Delivery records so mail lands in inboxes",
      "Migration from whatever you are on now",
    ],
  },
  {
    id: "contract",
    name: "Contract engineering",
    line: "Hands on your codebase, by the sprint or the month.",
    body: "For teams that already have software and need capacity rather than a vendor. We work inside your repository, your conventions and your review process, and leave the codebase in a state your own people can carry.",
    includes: [
      "Feature delivery against your backlog",
      "Rescue work on stalled or inherited builds",
      "Integrations and third-party plumbing",
      "Ongoing retainers",
    ],
  },
];

/* ---------------------------------------------------------------
   Contact
   --------------------------------------------------------------- */

export const SITE = {
  /* Single source for the domain — layout metadata, sitemap, robots and the
     promo video all read from here. */
  url: "https://horde-m.name.ng",
  display: "horde-m.name.ng",
};

export const CONTACT = {
  email: "info@horde-m.name.ng",
  emailDisplay: "info@horde-m.name.ng",
  /* Same digits as supplied (09027482958), grouped for legibility. */
  phoneDisplay: "0902 748 2958",
  phoneHref: "tel:+2349027482958",
};
