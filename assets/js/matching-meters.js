/**
 * Renders + auto-refreshes every ".matching-meter" element on the page.
 * Each meter is fully data-driven — no percentages/copy are hardcoded here
 * or in the HTML, so adding a new Featured Charity server-side is enough
 * for its meter to work with zero markup changes.
 *
 * Markup contract:
 *   <div class="matching-meter" data-meter-scope="foundation"></div>
 *   <div class="matching-meter" data-meter-scope="charity" data-charity-id="unicef-usa"></div>
 *   <span class="matching-badge" data-charity-id="unicef-usa"></span>   (listing view — badge only, no %)
 *
 * "Live" here means polling — the browser has no open connection to the
 * webhook. Every REFRESH_MS the meter re-fetches its endpoint, so any
 * webhook-driven update lands within one poll interval, with no page
 * reload and no manual site update.
 */
(function () {
  const REFRESH_MS = 15000;

  function endpointFor(el) {
    return el.dataset.meterScope === 'charity'
      ? `/api/matching/charities/${encodeURIComponent(el.dataset.charityId)}`
      : '/api/matching/foundation';
  }

  function badgeMeta(badge) {
    switch (badge) {
      case 'available': return { dot: '🟢', label: 'Matching Available' };
      case 'limited': return { dot: '🟡', label: 'Limited Matching' };
      default: return { dot: '⚪', label: 'Fully Allocated' };
    }
  }

  function render(el, data) {
    const pct = Math.max(0, Math.min(100, data.percentRemaining));
    const badge = data.badge || (pct > 0 ? 'available' : 'exhausted');
    const meta = badgeMeta(badge);

    if (!el.dataset.rendered) {
      el.innerHTML = `
        <div class="meter-status-line">
          <span class="meter-dot" aria-hidden="true"></span>
          <span class="meter-status-label"></span>
        </div>
        <div class="meter-percent" role="text"></div>
        <div class="meter-track" role="progressbar" aria-valuemin="0" aria-valuemax="100">
          <div class="meter-fill"></div>
        </div>
        <div class="meter-updated">
          <span class="meter-updated-label">Last Updated</span>
          <span class="meter-updated-time"></span>
        </div>
      `;
      el.dataset.rendered = 'true';
    }

    const fill = el.querySelector('.meter-fill');
    const track = el.querySelector('.meter-track');
    const percentEl = el.querySelector('.meter-percent');
    const timeEl = el.querySelector('.meter-updated-time');

    el.querySelector('.meter-dot').textContent = meta.dot;
    el.querySelector('.meter-status-label').textContent = meta.label;
    fill.style.transform = `scaleX(${pct / 100})`;
    track.setAttribute('aria-valuenow', String(pct));
    track.setAttribute('aria-valuetext', pct + '% of matching funds remaining');
    percentEl.textContent = pct + '% Remaining';
    timeEl.textContent = data.lastUpdatedFormatted || '';
    el.classList.toggle('meter-fully-allocated', pct === 0);
  }

  function renderBadge(el, data) {
    const meta = badgeMeta(data.badge);
    el.innerHTML = `<span class="meter-dot" aria-hidden="true">${meta.dot}</span> ${meta.label}`;
  }

  function renderError(el) {
    if (el.dataset.rendered) return; // keep last good render on a transient failure
    el.innerHTML = '<div class="meter-error">Matching status is temporarily unavailable.</div>';
  }

  async function refreshMeter(el) {
    try {
      const res = await fetch(endpointFor(el), { cache: 'no-store' });
      if (!res.ok) throw new Error('bad response');
      render(el, await res.json());
    } catch {
      renderError(el);
    }
  }

  async function refreshBadge(el) {
    try {
      const res = await fetch(`/api/matching/charities/${encodeURIComponent(el.dataset.charityId)}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('bad response');
      renderBadge(el, await res.json());
    } catch {
      // leave last-rendered badge in place on a transient failure
    }
  }

  function refreshAll() {
    document.querySelectorAll('.matching-meter').forEach(refreshMeter);
    document.querySelectorAll('.matching-badge').forEach(refreshBadge);
  }

  function init() {
    document.querySelectorAll('.matching-meter').forEach((el) => {
      refreshMeter(el);
      setInterval(() => refreshMeter(el), REFRESH_MS);
    });
    document.querySelectorAll('.matching-badge').forEach((el) => {
      refreshBadge(el);
      setInterval(() => refreshBadge(el), REFRESH_MS);
    });
    // Lets the dev "simulate donation" test tool force an immediate re-render
    // instead of waiting up to REFRESH_MS for the next poll.
    window.addEventListener('matching:refresh', refreshAll);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
