// Production storage backend — Netlify Blobs. Netlify Functions get a
// fresh, ephemeral filesystem on every invocation, so lib/store-file.mjs
// (used by the local demo) cannot hold state in production. Blobs is
// Netlify's built-in persistent key/value store and needs no extra
// infrastructure to set up.
//
// Requires the `@netlify/blobs` package (already in package.json) and runs
// automatically inside any Netlify Function / Netlify Dev context — no
// manual store credentials needed for same-site access.

import { getStore } from '@netlify/blobs';
import seed from '../data/matching-data.json' with { type: 'json' };

const KEY = 'matching-data';

function store() {
  return getStore('matching-system');
}

export async function loadState() {
  const existing = await store().get(KEY, { type: 'json' });
  if (existing) return existing;
  // First run in a fresh environment: seed from the checked-in JSON so the
  // meters aren't empty before the first webhook arrives.
  await store().setJSON(KEY, seed);
  return seed;
}

export async function saveState(state) {
  await store().setJSON(KEY, state);
}
