import { loadState } from '../../lib/store-blobs.mjs';
import { charityView } from '../../lib/matching-engine.mjs';

export default async () => {
  const state = await loadState();
  return Response.json(state.charities.map(charityView));
};

export const config = { path: '/api/matching/charities' };
