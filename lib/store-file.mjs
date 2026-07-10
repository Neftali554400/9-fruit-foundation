// Local demo storage backend — reads/writes data/matching-data.json on disk.
// Used by serve.mjs so the whole system runs with `node serve.mjs`, no
// external services required. NOT for production: Netlify Functions get a
// fresh, read-only filesystem per invocation, so this backend won't persist
// there. Production uses lib/store-blobs.mjs (Netlify Blobs) instead — see
// MATCHING-SYSTEM.md.

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '..', 'data', 'matching-data.json');

let writeQueue = Promise.resolve();

export async function loadState() {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

export async function saveState(state) {
  // Serialize writes so two near-simultaneous webhook calls can't clobber
  // each other (this is a plain JSON file, not a transactional DB).
  writeQueue = writeQueue.then(() => fs.writeFile(DATA_FILE, JSON.stringify(state, null, 2)));
  return writeQueue;
}
