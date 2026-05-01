<?php
/**
 * Header — 9 Fruit Foundation child theme
 * Renders the <html>, <head>, and sticky navbar on every page.
 */
$theme = get_stylesheet_directory_uri();
$home  = home_url( '/' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/png" href="<?php echo esc_url( $theme ); ?>/assets/logo.png" />
  <?php wp_head(); ?>
  <style>
    html, body { overflow-x: hidden; }
    .arrow-right { font-size: 1.25rem; color: var(--brand); }
    #nf-mobile-menu {
      display: none;
      flex-direction: column;
      gap: .25rem;
      padding: 1rem 1.5rem 1.5rem;
      border-top: 1px solid var(--border);
    }
    #nf-mobile-menu.open { display: flex !important; }
    #nf-mobile-menu a {
      font-size: 1rem;
      font-weight: 500;
      color: var(--ink-soft);
      text-decoration: none;
      padding: .5rem 0;
    }
    #nf-mobile-menu a:hover { color: var(--brand); }
  </style>
</head>
<body <?php body_class( 'nine-fruit' ); ?>>
<?php wp_body_open(); ?>

<header style="position:sticky;top:0;z-index:9999;background:rgba(255,255,255,0.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--border);">
  <nav style="max-width:1200px;margin:0 auto;padding:0 1.5rem;height:68px;display:flex;align-items:center;justify-content:space-between;">
    <a href="<?php echo esc_url( $home ); ?>" style="display:flex;align-items:center;gap:0.75rem;text-decoration:none;flex-shrink:0;" aria-label="9 Fruit home">
      <img src="<?php echo esc_url( $theme ); ?>/assets/logo.png" alt="9 Fruit logo" style="width:42px;height:42px;object-fit:contain;border-radius:8px;" />
      <div style="display:flex;flex-direction:column;gap:0;">
        <span style="font-family:'Playfair Display',serif;font-size:1.125rem;font-weight:700;color:var(--ink);letter-spacing:-0.02em;line-height:1.2;">9 Fruit</span>
        <span style="font-family:'Inter',sans-serif;font-size:0.6875rem;font-weight:500;color:var(--ink-muted);letter-spacing:0.02em;line-height:1;">With Love, by Faith</span>
      </div>
    </a>
    <div class="desktop-nav" style="display:flex;align-items:center;gap:2rem;">
      <a href="<?php echo esc_url( $home ); ?>#how-it-works" class="nav-link">How It Works</a>
      <a href="<?php echo esc_url( $home ); ?>#what-we-fund" class="nav-link">What We Fund</a>
      <a href="<?php echo esc_url( $home ); ?>#our-impact" class="nav-link">Our Impact</a>
      <a href="<?php echo esc_url( $home ); ?>#donate" class="btn-primary" style="padding:0.6rem 1.375rem;font-size:0.875rem;">Donate Now</a>
    </div>
    <button class="hamburger" aria-label="Open menu"
      style="background:none;border:none;cursor:pointer;padding:0.5rem;display:none;flex-direction:column;gap:5px;"
      onclick="document.getElementById('nf-mobile-menu').classList.toggle('open')">
      <span style="display:block;width:22px;height:2px;background:var(--ink);border-radius:2px;"></span>
      <span style="display:block;width:22px;height:2px;background:var(--ink);border-radius:2px;"></span>
      <span style="display:block;width:22px;height:2px;background:var(--ink);border-radius:2px;"></span>
    </button>
  </nav>
  <div id="nf-mobile-menu">
    <a href="<?php echo esc_url( $home ); ?>#how-it-works">How It Works</a>
    <a href="<?php echo esc_url( $home ); ?>#what-we-fund">What We Fund</a>
    <a href="<?php echo esc_url( $home ); ?>#our-impact">Our Impact</a>
    <a href="<?php echo esc_url( $home ); ?>#donate" class="btn-primary" style="margin-top:0.5rem;justify-content:center;">Donate Now</a>
  </div>
</header>
