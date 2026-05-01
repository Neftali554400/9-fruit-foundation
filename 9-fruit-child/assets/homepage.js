/* 9 Fruit Foundation — Homepage interactions */

// Donation amount selection
const amounts = [25, 50, 100, 250];
const matched = { 25: '27.25', 50: '54.50', 100: '109.00', 250: '272.50' };
let selected = 25;

function selectAmount(amt) {
  selected = amt;
  amounts.forEach(a => {
    const btn = document.getElementById('amt-' + a);
    if (!btn) return;
    btn.classList.toggle('selected', a === amt);
    btn.setAttribute('aria-pressed', a === amt ? 'true' : 'false');
  });
  const cta = document.querySelector('#donate .btn-primary');
  if (cta) {
    cta.innerHTML = 'Donate $' + amt + ' Now — $' + matched[amt] + ' Reaches Children <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
}

// Frequency toggle
function setToggle(type) {
  const ot = document.getElementById('toggle-onetime');
  const mo = document.getElementById('toggle-monthly');
  if (!ot || !mo) return;
  if (type === 'onetime') {
    ot.classList.replace('inactive', 'active'); ot.setAttribute('aria-pressed', 'true');
    mo.classList.replace('active', 'inactive'); mo.setAttribute('aria-pressed', 'false');
  } else {
    mo.classList.replace('inactive', 'active'); mo.setAttribute('aria-pressed', 'true');
    ot.classList.replace('active', 'inactive'); ot.setAttribute('aria-pressed', 'false');
  }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});
