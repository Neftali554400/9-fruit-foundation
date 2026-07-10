import { loadState } from '../../lib/store-blobs.mjs';
import { charityView } from '../../lib/matching-engine.mjs';

export default async (req, context) => {
  const { id } = context.params;
  const state = await loadState();
  const charity = state.charities.find((c) => c.id === id);
  if (!charity) return Response.json({ error: 'charity not found' }, { status: 404 });
  return Response.json(charityView(charity));
};

export const config = { path: '/api/matching/charities/:id' };
