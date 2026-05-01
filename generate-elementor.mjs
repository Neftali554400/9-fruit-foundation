/**
 * Generates the Elementor JSON template for the 9 Fruit Foundation homepage.
 * Run: node generate-elementor.mjs
 *
 * Before importing to Elementor, open the output JSON in a text editor and
 * Find & Replace:  NINE_FRUIT_ASSETS
 * With:            https://your-site.com/wp-content/themes/9-fruit-child/assets
 */

import { writeFileSync } from 'fs';
import { randomBytes } from 'crypto';
import { dirname as _dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = _dirname(fileURLToPath(import.meta.url));

const A = 'NINE_FRUIT_ASSETS'; // placeholder for theme assets URL

const uid = () => randomBytes(4).toString('hex');

function wrap(html) {
  const sId = uid(), cId = uid(), wId = uid();
  return {
    id: sId,
    elType: 'section',
    isInner: false,
    settings: {
      layout: 'full_width',
      padding: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: false },
      margin:  { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: false },
    },
    elements: [{
      id: cId,
      elType: 'column',
      settings: {
        _column_size: 100,
        padding: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: false },
      },
      elements: [{
        id: wId,
        elType: 'widget',
        widgetType: 'html',
        settings: { html },
        elements: [],
      }],
    }],
  };
}

// ─── SECTION HTMLS ──────────────────────────────────────────────────────────

const heroHTML = `
<style>
  html,body{overflow-x:hidden}
  .arrow-right{font-size:1.25rem;color:var(--brand)}
  .nine-fruit-homepage .hero-section,
  .nine-fruit .hero-section { padding:5rem 1.5rem 4rem }
  @media(max-width:767px){
    .two-col-grid{grid-template-columns:1fr!important;gap:2rem!important}
    .hero-section{padding:3rem 1.25rem!important}
  }
</style>
<section class="hero-bg grain" style="position:relative;overflow:hidden;padding:5rem 1.5rem 4rem;">
  <div class="two-col-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
    <div style="position:relative;z-index:2;">
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.25rem;">
        <span style="display:inline-flex;align-items:center;font-size:0.6875rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--brand-dark);background:rgba(82,169,63,0.1);border:1px solid rgba(82,169,63,0.22);border-radius:100px;padding:0.3rem 0.8rem;">Christian, non-partisan nonprofit</span>
        <span style="display:inline-flex;align-items:center;font-size:0.6875rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--brand-dark);background:rgba(82,169,63,0.1);border:1px solid rgba(82,169,63,0.22);border-radius:100px;padding:0.3rem 0.8rem;">Built on matching</span>
      </div>
      <h1 style="font-size:clamp(2.5rem,5vw,3.75rem);font-weight:800;color:var(--ink);margin-bottom:1.25rem;max-width:520px;">9 Fruit: simple, fruitful giving for <span style="color:var(--brand);">children</span></h1>
      <p style="font-size:1.125rem;color:var(--ink-soft);line-height:1.75;margin-bottom:2rem;max-width:460px;">Give to your vetted charity of choice.<br>Eligible donations receive a 9% match.</p>
      <div style="display:flex;flex-wrap:wrap;gap:0.875rem;margin-bottom:1rem;">
        <a href="#donate" class="btn-primary" style="padding:0.9rem 2.25rem;font-size:1rem;background:#3D8F2C;box-shadow:0 6px 16px rgba(61,143,44,0.4),0 2px 4px rgba(61,143,44,0.3);">Give Now <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        <a href="#how-it-works" class="btn-outline">Learn More</a>
      </div>
      <p style="font-size:0.75rem;color:var(--ink-muted);line-height:1.6;">100% pass-through for designated gifts &nbsp;&bull;&nbsp; Transparent reporting &nbsp;&bull;&nbsp; Annual independent auditing</p>
    </div>
    <div style="position:relative;z-index:2;border-radius:28px;overflow:hidden;box-shadow:0 8px 16px rgba(0,0,0,0.1),0 32px 64px rgba(0,0,0,0.15);">
      <img src="${A}/hero.jpeg" alt="Children smiling and reaching out together" style="width:100%;height:460px;object-fit:cover;display:block;" />
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.55) 100%);"></div>
      <div style="position:absolute;bottom:2.25rem;left:2rem;background:rgba(255,255,255,0.96);backdrop-filter:blur(12px);border-radius:16px;padding:1rem 1.25rem;box-shadow:0 8px 24px rgba(0,0,0,0.18);min-width:160px;">
        <div style="font-size:1.5rem;font-weight:800;font-family:'Playfair Display',serif;color:var(--ink);">$109</div>
        <div style="font-size:0.75rem;color:var(--ink-muted);font-weight:500;margin-top:0.125rem;">for every $100 you give</div>
        <div style="font-size:0.6875rem;color:var(--brand);font-weight:700;margin-top:0.3rem;">+9% MATCHED</div>
      </div>
    </div>
  </div>
  <div style="position:absolute;top:-120px;right:-80px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(82,169,63,0.1) 0%,transparent 70%);pointer-events:none;z-index:1;"></div>
  <div style="position:absolute;bottom:-80px;left:-60px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(251,191,36,0.08) 0%,transparent 70%);pointer-events:none;z-index:1;"></div>
</section>`;

const badgesHTML = `
<section style="background:var(--surface-3);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:2rem 1.5rem;">
  <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:0;">
    <div style="display:flex;align-items:center;gap:0.875rem;padding:1rem 1.5rem;flex:1;min-width:200px;border-right:1px solid var(--border);">
      <div style="width:36px;height:36px;border-radius:8px;background:var(--brand-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3L13.9 8.26L19.5 8.27L15.1 11.45L16.8 16.73L12 13.77L7.2 16.73L8.9 11.45L4.5 8.27L10.1 8.26L12 3Z" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div><p style="font-size:0.875rem;font-weight:700;color:var(--ink);line-height:1.2;margin-bottom:0.2rem;">Verified Nonprofit</p><p style="font-size:0.75rem;color:var(--ink-muted);line-height:1.3;">501(c)(3) certified</p></div>
    </div>
    <div style="display:flex;align-items:center;gap:0.875rem;padding:1rem 1.5rem;flex:1;min-width:200px;border-right:1px solid var(--border);">
      <div style="width:36px;height:36px;border-radius:8px;background:var(--brand-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div><p style="font-size:0.875rem;font-weight:700;color:var(--ink);line-height:1.2;margin-bottom:0.2rem;">100% Transparent</p><p style="font-size:0.75rem;color:var(--ink-muted);line-height:1.3;">Open financial reports</p></div>
    </div>
    <div style="display:flex;align-items:center;gap:0.875rem;padding:1rem 1.5rem;flex:1;min-width:200px;border-right:1px solid var(--border);">
      <div style="width:36px;height:36px;border-radius:8px;background:var(--brand-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 17H15M9 13H15M9 9H11M13 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V11L13 3Z" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div><p style="font-size:0.875rem;font-weight:700;color:var(--ink);line-height:1.2;margin-bottom:0.2rem;">Proven Results</p><p style="font-size:0.75rem;color:var(--ink-muted);line-height:1.3;">Measurable impact</p></div>
    </div>
    <div style="display:flex;align-items:center;gap:0.875rem;padding:1rem 1.5rem;flex:1;min-width:200px;">
      <div style="width:36px;height:36px;border-radius:8px;background:var(--brand-light);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div><p style="font-size:0.875rem;font-weight:700;color:var(--ink);line-height:1.2;margin-bottom:0.2rem;">Community Focused</p><p style="font-size:0.75rem;color:var(--ink-muted);line-height:1.3;">Serving children globally</p></div>
    </div>
  </div>
</section>`;

const howItWorksHTML = `
<section id="how-it-works" style="padding:6rem 1.5rem;">
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <p class="section-label" style="margin-bottom:0.75rem;">Simple Process</p>
      <h2 style="font-size:clamp(2rem,4vw,3rem);color:var(--ink);margin-bottom:1rem;">How It Works</h2>
      <p style="font-size:1.0625rem;color:var(--ink-soft);max-width:520px;margin:0 auto;line-height:1.75;">A simple, transparent way to give with confidence.</p>
    </div>
    <div class="three-col-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;position:relative;">
      <div class="step-card" tabindex="0">
        <div style="width:56px;height:56px;border-radius:16px;background:var(--brand-tint);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M7 15V9L12 6L17 9V15L12 18L7 15Z" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linejoin="round"/></svg></div>
        <div style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--brand);color:#fff;font-size:0.75rem;font-weight:700;margin-bottom:1rem;">1</div>
        <h3 style="font-size:1.375rem;margin-bottom:0.75rem;color:var(--ink);">Choose your vetted charity</h3>
        <p style="color:var(--ink-soft);font-size:0.9375rem;line-height:1.7;">Support an organization you trust and believe in.</p>
      </div>
      <div class="step-card" tabindex="0" style="border-color:var(--brand);box-shadow:0 4px 12px rgba(82,169,63,0.12),0 16px 40px rgba(0,0,0,0.08);">
        <div style="width:56px;height:56px;border-radius:16px;background:var(--brand-tint);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 2L13.5 8.5H20L14.5 12.5L16.5 19L12 15L7.5 19L9.5 12.5L4 8.5H10.5L12 2Z" fill="var(--brand)" stroke="var(--brand)" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
        <div style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--brand);color:#fff;font-size:0.75rem;font-weight:700;margin-bottom:1rem;">2</div>
        <h3 style="font-size:1.375rem;margin-bottom:0.75rem;color:var(--ink);">Give</h3>
        <p style="color:var(--ink-soft);font-size:0.9375rem;line-height:1.7;">Make your donation securely. Eligible gifts receive a 9% match.</p>
        <div style="margin-top:1.25rem;padding:1rem 1.25rem;background:var(--brand-tint);border-radius:10px;display:flex;align-items:center;justify-content:center;gap:1rem;">
          <span style="font-weight:700;color:var(--ink);font-size:1.25rem;">$100</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="var(--brand)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span style="font-weight:800;color:var(--brand);font-size:1.5rem;">$109</span>
        </div>
      </div>
      <div class="step-card" tabindex="0">
        <div style="width:56px;height:56px;border-radius:16px;background:var(--brand-tint);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--brand)" stroke-width="2"/><path d="M8 12L10.5 14.5L16 9" stroke="var(--brand)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--brand);color:#fff;font-size:0.75rem;font-weight:700;margin-bottom:1rem;">3</div>
        <h3 style="font-size:1.375rem;margin-bottom:0.75rem;color:var(--ink);">We deliver</h3>
        <p style="color:var(--ink-soft);font-size:0.9375rem;line-height:1.7;">Funds are distributed in alignment with your intent and the charity's mission, with full transparency.</p>
      </div>
    </div>
  </div>
</section>`;

const walkAlongsideHTML = `
<section style="padding:5.5rem 1.5rem;background:var(--brand-tint);border-top:1px solid rgba(82,169,63,0.18);border-bottom:1px solid rgba(82,169,63,0.18);position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 80% at 50% 50%,rgba(82,169,63,0.08) 0%,transparent 70%);pointer-events:none;"></div>
  <div style="max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1;">
    <span style="display:inline-block;font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--brand-dark);background:rgba(82,169,63,0.12);border:1px solid rgba(82,169,63,0.25);border-radius:100px;padding:0.3rem 0.875rem;margin-bottom:1.5rem;">Our Approach</span>
    <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3.5vw,2.4rem);font-weight:700;color:var(--ink);line-height:1.25;letter-spacing:-0.02em;margin-bottom:1.5rem;">Working alongside trusted organizations</h2>
    <div style="display:flex;flex-direction:column;gap:0.75rem;max-width:620px;margin:0 auto 3rem;">
      <p style="font-size:1.0625rem;color:var(--ink-soft);line-height:1.8;">We walk alongside established, reputable charities already serving communities.</p>
      <p style="font-size:1.0625rem;color:var(--ink-soft);line-height:1.8;">9 Fruit raises awareness and funding for organizations with a proven history of impact and fiscal responsibility.</p>
      <p style="font-size:1.0625rem;color:var(--ink-soft);line-height:1.8;">All giving is fully aligned with the donor's intent and the charity's mission.</p>
    </div>
    <div class="alongside-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;">
      <div style="background:rgba(255,255,255,0.7);border:1px solid rgba(82,169,63,0.2);border-radius:16px;padding:1.5rem 1.25rem;backdrop-filter:blur(8px);">
        <div style="width:40px;height:40px;border-radius:10px;background:var(--brand);display:flex;align-items:center;justify-content:center;margin:0 auto 0.875rem;box-shadow:0 4px 10px rgba(82,169,63,0.3);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M12 3L13.9 8.26L19.5 8.27L15.1 11.45L16.8 16.73L12 13.77L7.2 16.73L8.9 11.45L4.5 8.27L10.1 8.26L12 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <p style="font-size:0.875rem;font-weight:700;color:var(--ink);margin-bottom:0.375rem;">Vetted &amp; Trusted</p>
        <p style="font-size:0.8125rem;color:var(--ink-soft);line-height:1.6;">Every partner charity meets rigorous standards for accountability and proven impact.</p>
      </div>
      <div style="background:rgba(255,255,255,0.7);border:1px solid rgba(82,169,63,0.2);border-radius:16px;padding:1.5rem 1.25rem;backdrop-filter:blur(8px);">
        <div style="width:40px;height:40px;border-radius:10px;background:var(--brand);display:flex;align-items:center;justify-content:center;margin:0 auto 0.875rem;box-shadow:0 4px 10px rgba(82,169,63,0.3);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22C12 22 4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <p style="font-size:0.875rem;font-weight:700;color:var(--ink);margin-bottom:0.375rem;">Fiscal Responsibility</p>
        <p style="font-size:0.8125rem;color:var(--ink-soft);line-height:1.6;">Partners are independently evaluated for sound financial stewardship before listing.</p>
      </div>
      <div style="background:rgba(255,255,255,0.7);border:1px solid rgba(82,169,63,0.2);border-radius:16px;padding:1.5rem 1.25rem;backdrop-filter:blur(8px);">
        <div style="width:40px;height:40px;border-radius:10px;background:var(--brand);display:flex;align-items:center;justify-content:center;margin:0 auto 0.875rem;box-shadow:0 4px 10px rgba(82,169,63,0.3);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 21V19C17 16.79 15.21 15 13 15H5C2.79 15 1 16.79 1 19V21M23 21V19C22.99 17.11 21.7 15.49 20 15.13M16 3.13C17.74 3.57 19 5.15 19 7C19 8.85 17.74 10.43 16 10.87M9 11C11.21 11 13 9.21 13 7C13 4.79 11.21 3 9 3C6.79 3 5 4.79 5 7C5 9.21 6.79 11 9 11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <p style="font-size:0.875rem;font-weight:700;color:var(--ink);margin-bottom:0.375rem;">Community-First</p>
        <p style="font-size:0.8125rem;color:var(--ink-soft);line-height:1.6;">We amplify organizations already embedded and trusted in the communities they serve.</p>
      </div>
    </div>
  </div>
</section>`;

const whatWeFundHTML = `
<section id="what-we-fund" style="padding:6rem 1.5rem;background:var(--surface-2);">
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <p class="section-label" style="margin-bottom:0.75rem;">Where It Goes</p>
      <h2 style="font-size:clamp(2rem,4vw,3rem);color:var(--ink);margin-bottom:1rem;">What We Fund</h2>
      <p style="font-size:1.0625rem;color:var(--ink-soft);max-width:560px;margin:0 auto;line-height:1.75;">We support giving to children and young adults through trusted organizations focused on health and education.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;">
      <article class="fund-card" tabindex="0">
        <div style="position:relative;overflow:hidden;">
          <img src="${A}/health.jpeg" alt="Healthcare professional with stethoscope and laptop" style="width:100%;height:280px;object-fit:cover;display:block;" />
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.6) 100%);"></div>
          <div style="position:absolute;inset:0;background:rgba(82,169,63,0.15);mix-blend-mode:multiply;"></div>
          <div style="position:absolute;top:1.25rem;left:1.25rem;"><span style="background:rgba(255,255,255,0.9);color:var(--brand);font-size:0.75rem;font-weight:700;padding:0.3rem 0.75rem;border-radius:9999px;letter-spacing:0.05em;">HEALTH</span></div>
        </div>
        <div style="background:var(--surface);padding:2rem;">
          <h3 style="font-size:1.5rem;margin-bottom:1rem;color:var(--ink);">Health Initiatives</h3>
          <ul style="list-style:none;padding:0;margin:0 0 1.5rem;display:flex;flex-direction:column;gap:0.625rem;">
            <li style="display:flex;align-items:flex-start;gap:0.625rem;color:var(--ink-soft);font-size:0.9375rem;line-height:1.5;"><span style="width:6px;height:6px;border-radius:50%;background:var(--brand);flex-shrink:0;margin-top:0.45rem;"></span>Physical, mental, and psychological health</li>
            <li style="display:flex;align-items:flex-start;gap:0.625rem;color:var(--ink-soft);font-size:0.9375rem;line-height:1.5;"><span style="width:6px;height:6px;border-radius:50%;background:var(--brand);flex-shrink:0;margin-top:0.45rem;"></span>Food scarcity and nutrition</li>
            <li style="display:flex;align-items:flex-start;gap:0.625rem;color:var(--ink-soft);font-size:0.9375rem;line-height:1.5;"><span style="width:6px;height:6px;border-radius:50%;background:var(--brand);flex-shrink:0;margin-top:0.45rem;"></span>Exercise and healthy living</li>
          </ul>
          <a href="#donate" style="color:var(--brand);font-weight:600;font-size:0.875rem;text-decoration:none;display:inline-flex;align-items:center;gap:0.375rem;">Support Health Programs <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </div>
      </article>
      <article class="fund-card" tabindex="0">
        <div style="position:relative;overflow:hidden;">
          <img src="${A}/education.jpeg" alt="Books, apple and ABC blocks on a school desk" style="width:100%;height:280px;object-fit:cover;display:block;" />
          <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.6) 100%);"></div>
          <div style="position:absolute;inset:0;background:rgba(82,169,63,0.15);mix-blend-mode:multiply;"></div>
          <div style="position:absolute;top:1.25rem;left:1.25rem;"><span style="background:rgba(255,255,255,0.9);color:var(--brand);font-size:0.75rem;font-weight:700;padding:0.3rem 0.75rem;border-radius:9999px;letter-spacing:0.05em;">EDUCATION</span></div>
        </div>
        <div style="background:var(--surface);padding:2rem;">
          <h3 style="font-size:1.5rem;margin-bottom:1rem;color:var(--ink);">Education Programs</h3>
          <ul style="list-style:none;padding:0;margin:0 0 1.5rem;display:flex;flex-direction:column;gap:0.625rem;">
            <li style="display:flex;align-items:flex-start;gap:0.625rem;color:var(--ink-soft);font-size:0.9375rem;line-height:1.5;"><span style="width:6px;height:6px;border-radius:50%;background:var(--brand);flex-shrink:0;margin-top:0.45rem;"></span>Mentorship and development</li>
            <li style="display:flex;align-items:flex-start;gap:0.625rem;color:var(--ink-soft);font-size:0.9375rem;line-height:1.5;"><span style="width:6px;height:6px;border-radius:50%;background:var(--brand);flex-shrink:0;margin-top:0.45rem;"></span>Research and advancement</li>
            <li style="display:flex;align-items:flex-start;gap:0.625rem;color:var(--ink-soft);font-size:0.9375rem;line-height:1.5;"><span style="width:6px;height:6px;border-radius:50%;background:var(--brand);flex-shrink:0;margin-top:0.45rem;"></span>Books, teachers, and learning resources</li>
          </ul>
          <a href="#donate" style="color:var(--brand);font-weight:600;font-size:0.875rem;text-decoration:none;display:inline-flex;align-items:center;gap:0.375rem;">Support Education Programs <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        </div>
      </article>
    </div>
  </div>
</section>`;

const ourImpactHTML = `
<section id="our-impact" style="padding:6rem 1.5rem;">
  <div class="two-col-grid" style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
    <div style="position:relative;">
      <div style="position:relative;border-radius:28px;overflow:hidden;box-shadow:0 8px 16px rgba(0,0,0,0.1),0 32px 64px rgba(0,0,0,0.12);">
        <img src="${A}/impact.jpeg" alt="Children smiling and playing together in a community" style="width:100%;height:480px;object-fit:cover;display:block;" />
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 50%,rgba(0,0,0,0.55) 100%);"></div>
        <div style="position:absolute;inset:0;background:rgba(82,169,63,0.1);mix-blend-mode:multiply;"></div>
        <div style="position:absolute;bottom:1.75rem;right:1.75rem;background:rgba(255,255,255,0.96);backdrop-filter:blur(12px);border-radius:16px;padding:1rem 1.25rem;box-shadow:0 8px 24px rgba(0,0,0,0.18);min-width:150px;">
          <div style="font-size:1.375rem;font-weight:800;font-family:'Playfair Display',serif;color:var(--brand);">+9%</div>
          <div style="font-size:0.75rem;color:var(--ink-soft);font-weight:500;line-height:1.4;margin-top:0.2rem;">more impact<br>every single gift</div>
        </div>
      </div>
    </div>
    <div>
      <p class="section-label" style="margin-bottom:0.75rem;">The Power of Matching</p>
      <h2 style="font-size:clamp(1.875rem,3.5vw,2.75rem);color:var(--ink);margin-bottom:1rem;">Built on <span style="color:var(--brand);">matching</span></h2>
      <p style="font-size:1.0625rem;color:var(--ink-soft);line-height:1.75;margin-bottom:0.875rem;">Eligible donations receive a 9% match through a dedicated matching pool, increasing impact at the point of giving.</p>
      <p style="font-size:1.0625rem;color:var(--ink-soft);line-height:1.75;margin-bottom:2rem;">Matching is applied subject to available funds and program limits.</p>
      <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:2rem;">
        <div class="match-row"><div><div style="font-size:0.75rem;color:var(--ink-muted);font-weight:500;margin-bottom:0.125rem;">You give</div><div style="font-size:1.125rem;font-weight:700;color:var(--ink);">$50</div></div><span class="arrow-right">→</span><div style="text-align:right;"><div style="font-size:0.75rem;color:var(--brand);font-weight:600;margin-bottom:0.125rem;">Children receive</div><div style="font-size:1.25rem;font-weight:800;color:var(--brand);">$54.50</div></div></div>
        <div class="match-row"><div><div style="font-size:0.75rem;color:var(--ink-muted);font-weight:500;margin-bottom:0.125rem;">You give</div><div style="font-size:1.125rem;font-weight:700;color:var(--ink);">$100</div></div><span class="arrow-right">→</span><div style="text-align:right;"><div style="font-size:0.75rem;color:var(--brand);font-weight:600;margin-bottom:0.125rem;">Children receive</div><div style="font-size:1.25rem;font-weight:800;color:var(--brand);">$109.00</div></div></div>
        <div class="match-row"><div><div style="font-size:0.75rem;color:var(--ink-muted);font-weight:500;margin-bottom:0.125rem;">You give</div><div style="font-size:1.125rem;font-weight:700;color:var(--ink);">$500</div></div><span class="arrow-right">→</span><div style="text-align:right;"><div style="font-size:0.75rem;color:var(--brand);font-weight:600;margin-bottom:0.125rem;">Children receive</div><div style="font-size:1.25rem;font-weight:800;color:var(--brand);">$545.00</div></div></div>
      </div>
      <a href="#donate" class="btn-primary">See Your Impact</a>
    </div>
  </div>
</section>`;

const donateHTML = `
<section id="donate" class="impact-bg" style="padding:6rem 1.5rem;">
  <div style="max-width:640px;margin:0 auto;text-align:center;">
    <p class="section-label" style="margin-bottom:0.75rem;">Make a Difference</p>
    <h2 style="font-size:clamp(2rem,4vw,3rem);color:var(--ink);margin-bottom:1rem;">Choose Your Gift</h2>
    <p style="font-size:1.0625rem;color:var(--ink-soft);line-height:1.75;margin-bottom:2.5rem;">Every donation is matched by 9%. Pick an amount below and watch your impact grow.</p>
    <div style="display:inline-flex;background:var(--surface);border:1px solid var(--border);border-radius:9999px;padding:0.25rem;margin-bottom:2rem;">
      <button class="toggle-btn active" id="toggle-onetime" onclick="setToggle('onetime')" aria-pressed="true">One-Time</button>
      <button class="toggle-btn inactive" id="toggle-monthly" onclick="setToggle('monthly')" aria-pressed="false">Monthly</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-bottom:1.5rem;" role="group" aria-label="Select donation amount">
      <button class="amount-btn selected" id="amt-25" onclick="selectAmount(25)" aria-pressed="true"><div style="font-size:1.5rem;font-weight:800;font-family:'Playfair Display',serif;color:var(--ink);">$25</div><div style="font-size:0.75rem;color:var(--brand);font-weight:600;margin-top:0.25rem;">&#8594; $27.25 matched</div></button>
      <button class="amount-btn" id="amt-50" onclick="selectAmount(50)" aria-pressed="false"><div style="font-size:1.5rem;font-weight:800;font-family:'Playfair Display',serif;color:var(--ink);">$50</div><div style="font-size:0.75rem;color:var(--brand);font-weight:600;margin-top:0.25rem;">&#8594; $54.50 matched</div></button>
      <button class="amount-btn" id="amt-100" onclick="selectAmount(100)" aria-pressed="false"><div style="font-size:1.5rem;font-weight:800;font-family:'Playfair Display',serif;color:var(--ink);">$100</div><div style="font-size:0.75rem;color:var(--brand);font-weight:600;margin-top:0.25rem;">&#8594; $109.00 matched</div></button>
      <button class="amount-btn" id="amt-250" onclick="selectAmount(250)" aria-pressed="false"><div style="font-size:1.5rem;font-weight:800;font-family:'Playfair Display',serif;color:var(--ink);">$250</div><div style="font-size:0.75rem;color:var(--brand);font-weight:600;margin-top:0.25rem;">&#8594; $272.50 matched</div></button>
    </div>
    <a href="#" id="nf-donate-cta" class="btn-primary" style="width:100%;justify-content:center;padding:1rem 2rem;font-size:1rem;border-radius:14px;">
      Donate $25 Now &#8212; $27.25 Reaches Children
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
    <p style="font-size:0.8125rem;color:var(--ink-muted);margin-top:1rem;">Secure donation &middot; 501(c)(3) tax-deductible &middot; Open financial reports</p>
  </div>
  <script>
    (function(){
      var amounts=[25,50,100,250];
      var matched={25:'27.25',50:'54.50',100:'109.00',250:'272.50'};
      var selected=25;
      window.selectAmount=function(amt){
        selected=amt;
        amounts.forEach(function(a){
          var btn=document.getElementById('amt-'+a);
          if(!btn)return;
          btn.classList.toggle('selected',a===amt);
          btn.setAttribute('aria-pressed',a===amt?'true':'false');
        });
        var cta=document.getElementById('nf-donate-cta');
        if(cta)cta.innerHTML='Donate $'+amt+' Now — $'+matched[amt]+' Reaches Children <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      };
      window.setToggle=function(type){
        var ot=document.getElementById('toggle-onetime');
        var mo=document.getElementById('toggle-monthly');
        if(!ot||!mo)return;
        if(type==='onetime'){
          ot.className='toggle-btn active';ot.setAttribute('aria-pressed','true');
          mo.className='toggle-btn inactive';mo.setAttribute('aria-pressed','false');
        }else{
          mo.className='toggle-btn active';mo.setAttribute('aria-pressed','true');
          ot.className='toggle-btn inactive';ot.setAttribute('aria-pressed','false');
        }
      };
      document.addEventListener('DOMContentLoaded',function(){
        document.querySelectorAll('a[href^="#"]').forEach(function(a){
          a.addEventListener('click',function(e){
            var t=document.querySelector(a.getAttribute('href'));
            if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
          });
        });
      });
    })();
  </script>
</section>`;

const foundationHTML = `
<section style="padding:6rem 1.5rem;background:var(--surface-2);">
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <p class="section-label" style="margin-bottom:0.75rem;">Trust &amp; Transparency</p>
      <h2 style="font-size:clamp(2rem,4vw,3rem);color:var(--ink);margin-bottom:1rem;">Clarity and accountability</h2>
    </div>
    <div style="max-width:720px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
      <div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1.5rem;">
        <div style="width:36px;height:36px;border-radius:10px;background:var(--brand-tint);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <p style="font-size:0.9375rem;color:var(--ink-soft);line-height:1.6;font-weight:500;">Clear separation of funds</p>
      </div>
      <div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1.5rem;">
        <div style="width:36px;height:36px;border-radius:10px;background:var(--brand-tint);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <p style="font-size:0.9375rem;color:var(--ink-soft);line-height:1.6;font-weight:500;">Independent financial oversight</p>
      </div>
      <div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1.5rem;">
        <div style="width:36px;height:36px;border-radius:10px;background:var(--brand-tint);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <p style="font-size:0.9375rem;color:var(--ink-soft);line-height:1.6;font-weight:500;">Transparent reporting of funds received and distributed</p>
      </div>
      <div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1.5rem;">
        <div style="width:36px;height:36px;border-radius:10px;background:var(--brand-tint);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <p style="font-size:0.9375rem;color:var(--ink-soft);line-height:1.6;font-weight:500;">Annual independent auditing</p>
      </div>
    </div>
  </div>
</section>`;

const ctaHTML = `
<section style="position:relative;overflow:hidden;padding:7rem 1.5rem;">
  <div style="position:absolute;inset:0;z-index:0;">
    <img src="${A}/hero.jpeg" alt="" aria-hidden="true" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block;" />
    <div style="position:absolute;inset:0;background:rgba(18,28,60,0.72);"></div>
  </div>
  <div style="max-width:720px;margin:0 auto;text-align:center;position:relative;z-index:2;">
    <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:0.875rem;">Make a Difference Today</p>
    <h2 style="font-size:clamp(2rem,4.5vw,3.25rem);font-family:'Playfair Display',serif;font-weight:800;letter-spacing:-0.03em;color:#fff;line-height:1.15;margin-bottom:1.25rem;">Ready to Make a Difference?</h2>
    <p style="font-size:1.125rem;color:rgba(255,255,255,0.78);line-height:1.75;margin-bottom:2.5rem;max-width:540px;margin-left:auto;margin-right:auto;">Your generosity, combined with our matching commitment, creates lasting change for children around the world.</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
      <a href="#donate" style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--brand);color:#fff;font-family:'Inter',sans-serif;font-weight:700;font-size:1rem;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;box-shadow:0 4px 20px rgba(82,169,63,0.4);transition:transform 0.2s cubic-bezier(0.34,1.56,0.64,1),background 0.15s ease;">Give Now <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      <a href="#how-it-works" style="display:inline-flex;align-items:center;gap:0.5rem;background:transparent;color:#fff;font-family:'Inter',sans-serif;font-weight:600;font-size:1rem;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.4);transition:border-color 0.2s ease,transform 0.2s cubic-bezier(0.34,1.56,0.64,1);">Learn How It Works</a>
    </div>
    <p style="font-size:0.8125rem;color:rgba(255,255,255,0.45);margin-top:1.5rem;">501(c)(3) Tax-deductible &middot; 100% Transparent &middot; Verified Nonprofit</p>
  </div>
</section>`;

// ─── BUILD & WRITE ───────────────────────────────────────────────────────────

const template = {
  version: '0.4',
  title: '9 Fruit Foundation — Homepage',
  type: 'page',
  content: [
    wrap(heroHTML),
    wrap(badgesHTML),
    wrap(howItWorksHTML),
    wrap(walkAlongsideHTML),
    wrap(whatWeFundHTML),
    wrap(ourImpactHTML),
    wrap(donateHTML),
    wrap(foundationHTML),
    wrap(ctaHTML),
  ],
  page_settings: {
    hide_title: 'yes',
  },
};

const outPath = join(__dirname, '9-fruit-child', 'homepage-template.json');
writeFileSync(outPath, JSON.stringify(template, null, 2), 'utf8');
console.log('✓ Written to', outPath);
