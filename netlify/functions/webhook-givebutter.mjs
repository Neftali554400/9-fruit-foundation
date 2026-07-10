import crypto from 'crypto';
import { loadState, saveState } from '../../lib/store-blobs.mjs';
import { processDonation } from '../../lib/matching-engine.mjs';

// Configure this URL in Givebutter under Settings → Developers → Webhooks:
//   https://<your-domain>/webhook/givebutter
// Subscribe it to the "transaction.succeeded" event only — that's the only
// event this system needs.
//
// IMPORTANT — verify before going live:
// Givebutter signs each request with a per-webhook secret, sent in a
// `Signature` header (see MATCHING-SYSTEM.md). Their public docs don't
// publish the exact signing algorithm, so this handler assumes the common
// "hex HMAC-SHA256 of the raw request body" scheme. Create a test webhook
// in the Givebutter dashboard, fire the built-in test event, log the raw
// header value, and confirm it matches `computeSignature()` below before
// relying on this check in production. Set GIVEBUTTER_WEBHOOK_SECRET in
// Netlify site environment variables once confirmed.

function computeSignature(rawBody, secret) {
  return crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
}

function isValidSignature(rawBody, header, secret) {
  if (!secret) return true; // no secret configured yet — see note above
  if (!header) return false;
  const expected = computeSignature(rawBody, secret);
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async (req) => {
  const rawBody = await req.text();
  const secret = process.env.GIVEBUTTER_WEBHOOK_SECRET;

  if (!isValidSignature(rawBody, req.headers.get('signature'), secret)) {
    return Response.json({ error: 'invalid signature' }, { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: 'invalid JSON body' }, { status: 400 });
  }

  // Only transaction.succeeded is subscribed to, but ignore anything else
  // defensively in case the webhook config ever gets more events added.
  if (payload.event && payload.event !== 'transaction.succeeded') {
    return Response.json({ received: true, ignored: payload.event });
  }

  const data = payload.data || payload;
  const state = await loadState();
  const { state: nextState, result } = processDonation(state, {
    campaignId: data.campaign_id,
    amount: typeof data.amount === 'number' ? data.amount : Number(data.amount),
    status: data.status,
    timestamp: data.transacted_at,
  });

  if (result.matched) await saveState(nextState);

  return Response.json({ received: true, ...result });
};

export const config = { path: '/webhook/givebutter' };
