import { loadState } from '../../lib/store-blobs.mjs';
import { foundationView } from '../../lib/matching-engine.mjs';

export default async () => {
  const state = await loadState();
  return Response.json(foundationView(state));
};

export const config = { path: '/api/matching/foundation' };
