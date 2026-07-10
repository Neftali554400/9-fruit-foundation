# Matching Availability System — architecture & handoff

This implements the "Matching Availability Meters" spec: a Foundation-wide
meter on the homepage, a per-charity meter on Our Charity Partners, and
directory badges — all driven by Givebutter webhooks, no manual updates.

It's built and running as a local demo today. Production needs the steps in
**"Going to production"** below before it's safe to point a real Givebutter
webhook at it.

## How to run the demo

```
npm install
node serve.mjs
```

Open `http://localhost:3000`. The homepage hero shows the Foundation meter;
Our Charity Partners shows a badge + expandable meter per charity. Use the
black "Dev Test Tool" panel (bottom-right of Our Charity Partners) to fire a
simulated donation and watch both meters update within a few seconds — no
page reload.

## Architecture

```
lib/matching-engine.mjs   Pure business logic: matching rules, percentages,
                           badge thresholds, timestamp formatting. No I/O —
                           shared verbatim by the local server and Netlify.

lib/store-file.mjs         Local storage backend: reads/writes
                           data/matching-data.json. Used by serve.mjs.

lib/store-blobs.mjs        Production storage backend: Netlify Blobs.
                           Used by netlify/functions/*.

data/matching-data.json    The "database" — one Foundation record + an
                           array of charity records. This is the file you
                           edit (or, in production, the Blobs store you
                           write to) to add/adjust charities.

serve.mjs                  Local dev server: static files + the API/webhook
                           routes below, backed by store-file.mjs.

netlify/functions/*.mjs    Production equivalents of the same routes,
                           backed by store-blobs.mjs. Deploy these to
                           Netlify and they replace serve.mjs's job.

assets/js/matching-meters.js
                           Frontend: finds every .matching-meter and
                           .matching-badge element on the page, fetches its
                           current status, renders it, and polls every 15s.
```

The reason the logic is split into a pure `matching-engine.mjs` with two
swappable storage backends is so the local demo and the real Netlify
deployment run identical matching logic — the only thing that differs is
where state is persisted.

## Data model

One JSON document with this shape (see `data/matching-data.json`):

```json
{
  "foundation": {
    "annualAllocation": 250000,
    "remainingAllocation": 217500,
    "lastUpdated": "2026-07-08T18:14:00.000Z"
  },
  "charities": [
    {
      "id": "unicef-usa",
      "campaignId": "101",
      "name": "UNICEF USA",
      "active": true,
      "annualAllocation": 30000,
      "remainingAllocation": 23400,
      "lastUpdated": "2026-07-08T18:14:00.000Z"
    }
  ]
}
```

**Adding a new Featured Charity requires no code changes** — append a new
object to the `charities` array (locally: edit the JSON file; in
production: write the updated document via Blobs, e.g. from a small admin
script or dashboard you build later). `campaignId` is the bridge between
Givebutter and this record — see below.

`id` is the internal slug used in page markup (`data-charity-id="..."`).
`campaignId` must match the `campaign_id` Givebutter sends in the webhook
for that charity's Givebutter campaign.

**The 10 charities currently seeded use placeholder `campaignId` values
(101–110)** matching this site's existing Our Charity Partners cards. You
must replace these with the real Givebutter campaign IDs before going live
— see "Going to production" step 2.

## API contract

| Route | Method | Purpose |
|---|---|---|
| `/api/matching/foundation` | GET | `{ percentRemaining, lastUpdated, lastUpdatedFormatted }` |
| `/api/matching/charities` | GET | Array of charity views (includes `badge`, used by the listing badges) |
| `/api/matching/charities/:id` | GET | Single charity view |
| `/webhook/givebutter` | POST | Givebutter webhook target |
| `/api/simulate-donation` | POST | Dev-only — same logic as the webhook, no signature check |

Charity view shape:
```json
{
  "id": "unicef-usa",
  "campaignId": "101",
  "name": "UNICEF USA",
  "active": true,
  "percentRemaining": 78,
  "badge": "available",
  "lastUpdated": "2026-07-08T18:14:00.000Z",
  "lastUpdatedFormatted": "July 8, 2026 • 2:14 PM ET"
}
```
`badge` is one of `available` (🟢 >20% remaining), `limited` (🟡 1–20%
remaining), or `exhausted` (⚪ 0% remaining) — thresholds are constants at
the top of `lib/matching-engine.mjs`, adjust there if the org wants
different cutoffs.

No dollar amounts are ever returned by these endpoints, per spec section 1/2.

## Matching rules (lib/matching-engine.mjs → processDonation)

On each qualifying event:
1. Transaction status must be a completed/successful state.
2. Donation amount must be > $0 and ≤ $100 (spec section 4).
3. The `campaign_id` must map to an **active** charity record.
4. That charity's `remainingAllocation` must be > 0.
5. The Foundation's `remainingAllocation` must be > 0.
6. Match amount = `min(donationAmount, charityRemaining, foundationRemaining)`.
7. Both the charity's and the Foundation's `remainingAllocation` are reduced
   by the match amount; both `lastUpdated` timestamps are set to the
   donation's timestamp.

Any rejected donation returns `{ matched: false, reason: "..." }` — nothing
is written to storage, so a bad/duplicate webhook can't corrupt state.

## Givebutter webhook setup

1. Givebutter dashboard → **Settings → Developers → Webhooks → New webhook**.
2. URL: `https://<your-domain>/webhook/givebutter`
3. Subscribe to **`transaction.succeeded`** only.
4. Copy the signing secret Givebutter shows you and set it as the
   `GIVEBUTTER_WEBHOOK_SECRET` environment variable on your Netlify site
   (Site settings → Environment variables).

Payload shape this system expects (per Givebutter's docs):
```json
{
  "event": "transaction.succeeded",
  "data": {
    "id": "459oGBTylHk8laDF",
    "campaign_id": 39,
    "amount": 100,
    "status": "succeeded",
    "transacted_at": "2026-07-08T18:14:00+00:00"
  }
}
```

**Verify before relying on this in production:**
- **Signature algorithm.** Givebutter's public docs confirm a `Signature`
  header exists but don't publish the exact signing scheme.
  `netlify/functions/webhook-givebutter.mjs` assumes hex HMAC-SHA256 of the
  raw body. Send yourself a real test webhook (Givebutter's dashboard has a
  "send test event" button), log the actual header value, and confirm it
  matches `computeSignature()` in that file — adjust if it doesn't.
- **Amount units.** Givebutter's own webhook example shows `"amount": 250`
  for what appears to be a $250 donation (i.e. dollars, not cents) — but
  double-check against a real transaction from your account, since some
  Givebutter API responses use cents elsewhere. If it turns out to be
  cents, divide by 100 where `data.amount` is read in
  `webhook-givebutter.mjs`.

## Going to production

1. **Deploy to Netlify** (this repo already has `netlify.toml` +
   `netlify/functions/`). `npm install` pulls in `@netlify/blobs`, which
   Netlify Functions use automatically — no extra credentials needed for
   same-site access.
2. **Replace the placeholder `campaignId` values** in
   `data/matching-data.json` with real Givebutter campaign IDs (this file
   is only the *seed* — see next point).
3. **Seed production storage once.** `lib/store-blobs.mjs` auto-seeds from
   `data/matching-data.json` the first time it's read in a fresh
   environment, so a correct `data/matching-data.json` at deploy time is
   enough — no separate migration step.
4. **Set `GIVEBUTTER_WEBHOOK_SECRET`** in Netlify env vars once you've
   confirmed the signature scheme (see above).
5. **Delete the dev test tool**: the `#dev-matching-panel` block at the
   bottom of `our-charity-partners.html`, `netlify/functions/simulate-
   donation.mjs`, and the `/api/simulate-donation` branch in `serve.mjs`.
   As shipped, anyone who finds that URL can move the matching allocation —
   fine for a demo, not for production.
6. **Decide on a real admin path for adding charities.** Spec section 5/8
   asks for "just add a database record" — right now that means hand-
   editing JSON. If the org wants a non-technical person to add charities,
   build a small authenticated admin page that reads/writes via
   `lib/store-blobs.mjs`, or swap Blobs for a proper DB (Postgres/Supabase)
   with an admin UI. The engine and API layer don't need to change either
   way — only the storage backend.

## Design decision: per-charity "page"

The spec asks for a matching meter on "each Featured Charity page." This
site currently lists all Featured Charities as cards on one page
(`our-charity-partners.html`) rather than giving each charity its own URL.
Rather than invent new routes, each card got a **"View Matching Status"**
expandable toggle (native `<details>`, so it's keyboard/screen-reader
accessible for free) that reveals the full meter — badge-only in the
collapsed/listing state, full meter on expand. If the org later wants true
per-charity pages, `assets/js/matching-meters.js` and the
`/api/matching/charities/:id` endpoint already support that with no backend
changes — just move the same `.matching-meter` markup onto a real per-
charity page template.
