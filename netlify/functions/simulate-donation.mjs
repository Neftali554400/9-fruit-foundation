import { loadState, saveState } from '../../lib/store-blobs.mjs';
import { processDonation } from '../../lib/matching-engine.mjs';

// Dev-only helper mirroring webhook-givebutter.mjs's logic, so the meters
// can be demoed without a live Givebutter account. Delete this function (or
// require an admin auth header) before this project goes to production —
// as shipped, anyone who finds this URL can move the matching allocation.

export default async (req) => {
  const body = await req.json();
  const state = await loadState();
  const { state: nextState, result } = processDonation(state, {
    campaignId: body.campaignId,
    amount: Number(body.amount),
    status: 'succeeded',
    timestamp: new Date().toISOString(),
  });

  if (result.matched) await saveState(nextState);

  return Response.json({ received: true, ...result });
};

export const config = { path: '/api/simulate-donation' };
