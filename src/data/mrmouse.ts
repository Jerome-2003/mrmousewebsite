/**
 * Mr. Mouse — the original product content, carried over from the previous
 * single-page site. Copy is preserved as written; only its home has changed.
 */

export const DOWNLOADS = [
  {
    id: "android",
    platform: "Android",
    meta: "Direct APK — no Play Store account needed. Version 1.0 · ~7 MB",
    points: [
      "Installs straight from the link on this page",
      "Log sales and purchases from your phone or tablet",
      "Syncs live with every other device on your business account",
    ],
    href: "https://drive.google.com/uc?export=download&id=1ebZoLvy4n1jV9pTLrUil4PGBHk7cX2vm",
    cta: "Download APK",
  },
  {
    id: "desktop",
    platform: "Desktop",
    meta: "Windows installer. Version 1.0 · ~250 MB",
    points: [
      "Best for the back office or a fixed till computer",
      "Full access to every book, report, and setting",
      "Syncs live with your Android devices",
    ],
    href: "https://drive.google.com/uc?export=download&id=1lNzt8On34Gc1dCxTw-LGb34GXeI9TaOv",
    cta: "Download for Desktop",
  },
] as const;

export const STEPS = [
  {
    title: "Create your account",
    body: "Sign up with your email or phone number and verify it. This becomes the login for every device you connect afterward.",
  },
  {
    title: "Set up your business",
    body: "Enter your business name and choose a plan — Solo, Duo, or Company — based on how many devices your team needs connected at the same time. You can change this later as you grow.",
  },
  {
    title: "Add your team's devices",
    body: "Sign in to Mr. Mouse on your other phones, tablets, or the desktop app. Each one joins your business's live sync automatically — no manual exporting or emailing spreadsheets around.",
  },
  {
    title: "Log your first entry",
    body: "Tap Add Entry, record a sale or a purchase, and pick a category. Mr. Mouse routes it into the right book for you — Cash Book, Sales Journal, Purchases Journal, or Petty Cash — so you never have to decide where something belongs.",
  },
  {
    title: "Watch your books update themselves",
    body: "Your Trial Balance and Profit & Loss recalculate the moment a new entry lands. If the entry involves a tracked item, your Inventory count adjusts automatically too.",
  },
  {
    title: "Connect WhatsApp or Telegram (optional)",
    body: "Link your business to the Mr. Mouse Telegram bot or WhatsApp number. From then on you or your staff can log entries, check today's totals, or ask for a report straight from a chat — nothing to install for whoever's texting it in.",
  },
  {
    title: "Set up reminders",
    body: "Add payment deadlines and recurring bills. Mr. Mouse notifies you in-app, and through WhatsApp or Telegram if you've connected them, before anything is due.",
  },
] as const;

export const FEATURE_GROUPS = [
  {
    name: "Core Books",
    note: "the accounts themselves",
    rows: [
      ["Cash Book", "Tracks every naira in and out of your business as it happens, with a running balance that recalculates automatically after each entry."],
      ["Sales Journal", "Every sale is recorded with the customer, item, amount, and payment status, so you can see at a glance what's been paid for and what's still owed."],
      ["Purchases Journal", "Every purchase from a supplier is logged the same way — item, amount, and payment status — kept separate from sales so the two never get muddled."],
      ["Petty Cash Book", "A dedicated ledger for small day-to-day expenses (transport, snacks, minor repairs) so they don't clutter your main Cash Book but are still fully accounted for."],
      ["Inventory", "Stock counts that adjust automatically whenever a sale or purchase references a tracked item, so what the app shows matches what's actually on the shelf."],
      ["Trial Balance", "A live snapshot of every account's debit and credit balance, generated instantly from your entries rather than compiled by hand at month-end."],
      ["Profit & Loss Statement", "Revenue minus costs, recalculated the moment a new entry is added, so you always know where the business stands without waiting for a report to be pulled."],
    ],
  },
  {
    name: "Team & Sync",
    note: "one set of books, everywhere",
    rows: [
      ["Real-time multi-device sync", "Every device connected to your business sees the same numbers the instant an entry is made — no refreshing, no re-exporting, no waiting for someone to send an update."],
      ["Plan-based device limits", "Choose Solo, Duo, or Company depending on how many devices your team needs connected at once. Upgrade any time your team grows."],
      ["Consistent records across staff", "Because every device reads and writes to the same live business account, there's no version of the books that only exists on one person's phone."],
    ],
  },
  {
    name: "AI Assistant",
    note: "bookkeeping in plain English",
    rows: [
      ["In-app chat assistant", "Type things the way you'd say them — “I sold 20 pieces of gold” or “how much silver do I have” — right inside the app, and Mr. Mouse records it or answers back. It'll ask for anything it's missing and always confirms before saving."],
      ["Smart automation", "Behind the scenes, the assistant helps categorize entries and match them to the right product, party, or book, so less of the bookkeeping is manual data entry."],
      ["Same assistant, on Telegram too", "The AI assistant isn't limited to the app — connect Telegram and you get the exact same natural-language logging and lookups from a chat window. (Separate ₦1,000/month add-on — subscribe from Settings → AI.)"],
    ],
  },
  {
    name: "WhatsApp & Telegram",
    note: "bookkeeping from a chat window",
    rows: [
      ["Telegram bot", "Log a sale, check today's totals, or pull a quick report without opening the app — all from a Telegram chat."],
      ["WhatsApp document delivery", "Receive receipts, statements, and reports sent directly to your WhatsApp, ready to forward to a customer, supplier, or accountant."],
      ["Two-way sync", "Anything logged through the bot appears in the app instantly, and anything logged in the app is reflected the next time you check in on chat."],
    ],
  },
  {
    name: "Reminders & Deadlines",
    note: "nothing falls through",
    rows: [
      ["Payment deadlines", "Set a due date for a bill or a customer's outstanding balance and Mr. Mouse tracks it for you."],
      ["Automated nudges", "Reminders arrive in-app, and through WhatsApp or Telegram too if you've connected them, ahead of the actual due date."],
      ["Add-on renewal tracking", "Telegram and WhatsApp add-ons renew automatically on schedule, so your integrations don't quietly lapse mid-month."],
    ],
  },
  {
    name: "Security",
    note: "your books, protected",
    rows: [
      ["Verified sessions", "Every request is checked against a secure, cookie-based login token, so data can't be accessed without a verified sign-in."],
      ["Locked-down business data", "Business records are tied to verified accounts rather than to whatever ID a device happens to send, closing off a whole class of data-leak risks."],
      ["Sanitized inputs", "Incoming data is cleaned before it ever touches the database, guarding against common injection-style attacks."],
    ],
  },
  {
    name: "Platforms",
    note: "work from wherever you are",
    rows: [
      ["Android", "Installs directly as an APK — no Play Store account required to get started."],
      ["Desktop", "A native installer for your main till or back-office computer, with full access to every book, report, and setting."],
    ],
  },
] as const;

export const FAQS = [
  {
    q: "Is there a free trial?",
    a: "Yes. You can start using Mr. Mouse without a card, and decide on a plan once you've had a chance to try it on your own books.",
  },
  {
    q: "Do I need the Play Store to install the Android version?",
    a: "No. The Android app is distributed as a direct APK download, so you can install it straight from the link on this page.",
  },
  {
    q: "Can my whole team use it at once?",
    a: "Yes. Choose the Solo, Duo, or Company plan based on how many devices need to be connected at the same time, and every device stays in live sync.",
  },
  {
    q: "Do I have to use WhatsApp or Telegram?",
    a: "No — they're optional. You can run everything from the app alone, or connect either (or both) if you'd rather log entries from a chat window.",
  },
] as const;
