// Pure matching-logic core, shared by the local demo server (serve.mjs)
// and the production Netlify Functions (netlify/functions/*). No I/O here —
// callers load state from a store, pass it in, and persist the result.

export const MAX_MATCHABLE_DONATION = 100; // dollars — rule from spec section 4
export const BADGE_THRESHOLD_AVAILABLE = 0.20; // >20% remaining -> green
export const BADGE_THRESHOLD_LIMITED = 0; // >0% and <=20% -> yellow, ===0 -> gray

export function percentRemaining(remaining, annual) {
  if (!annual || annual <= 0) return 0;
  const pct = (remaining / annual) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

export function badgeStatus(remaining, annual) {
  const pct = annual > 0 ? remaining / annual : 0;
  if (remaining <= 0) return 'exhausted';
  if (pct > BADGE_THRESHOLD_AVAILABLE) return 'available';
  return 'limited';
}

export function formatTimestamp(isoString, timeZone = 'America/New_York') {
  const date = new Date(isoString);
  const datePart = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone,
  }).format(date);
  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true, timeZone,
  }).format(date);
  return `${datePart} • ${timePart} ET`;
}

export function foundationView(state) {
  const { annualAllocation, remainingAllocation, lastUpdated } = state.foundation;
  return {
    percentRemaining: percentRemaining(remainingAllocation, annualAllocation),
    lastUpdated,
    lastUpdatedFormatted: formatTimestamp(lastUpdated),
  };
}

export function charityView(charity) {
  return {
    id: charity.id,
    campaignId: charity.campaignId,
    name: charity.name,
    active: charity.active,
    percentRemaining: percentRemaining(charity.remainingAllocation, charity.annualAllocation),
    badge: charity.active ? badgeStatus(charity.remainingAllocation, charity.annualAllocation) : 'exhausted',
    lastUpdated: charity.lastUpdated,
    lastUpdatedFormatted: formatTimestamp(charity.lastUpdated),
  };
}

export function findCharityByCampaignId(state, campaignId) {
  const needle = String(campaignId);
  return state.charities.find((c) => String(c.campaignId) === needle);
}

/**
 * Applies one qualifying Givebutter donation to the in-memory state.
 * Returns { state, result } — result.matched tells the caller whether
 * anything changed (and state is returned unmodified when it didn't,
 * so callers can skip an unnecessary write).
 */
export function processDonation(state, donation) {
  const { campaignId, amount, status, timestamp } = donation;
  const now = timestamp || new Date().toISOString();

  const reject = (reason) => ({ state, result: { matched: false, reason } });

  const normalizedStatus = String(status || '').toLowerCase();
  if (!['succeeded', 'successful', 'success', 'completed'].includes(normalizedStatus)) {
    return reject(`donation status "${status}" is not a completed/successful transaction`);
  }

  if (typeof amount !== 'number' || !(amount > 0)) {
    return reject('donation amount missing or invalid');
  }

  if (amount > MAX_MATCHABLE_DONATION) {
    return reject(`donation of $${amount} exceeds the $${MAX_MATCHABLE_DONATION} matching cap`);
  }

  const charity = findCharityByCampaignId(state, campaignId);
  if (!charity) {
    return reject(`no Featured Charity is mapped to campaign_id "${campaignId}"`);
  }
  if (!charity.active) {
    return reject(`charity "${charity.name}" is inactive`);
  }
  if (charity.remainingAllocation <= 0) {
    return reject(`charity "${charity.name}" has fully allocated its matching fund`);
  }
  if (state.foundation.remainingAllocation <= 0) {
    return reject('the Foundation-wide matching fund is fully allocated');
  }

  const matchAmount = Math.min(
    amount,
    charity.remainingAllocation,
    state.foundation.remainingAllocation,
  );

  const nextState = {
    foundation: {
      ...state.foundation,
      remainingAllocation: round2(state.foundation.remainingAllocation - matchAmount),
      lastUpdated: now,
    },
    charities: state.charities.map((c) => (
      c.id === charity.id
        ? { ...c, remainingAllocation: round2(c.remainingAllocation - matchAmount), lastUpdated: now }
        : c
    )),
  };

  return {
    state: nextState,
    result: { matched: true, charityId: charity.id, matchAmount, donationAmount: amount },
  };
}

function round2(n) {
  return Math.round(n * 100) / 100;
}
